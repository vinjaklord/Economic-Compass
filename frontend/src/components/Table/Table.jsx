import { useState, useEffect, useMemo } from 'react';
import { fetchAPI } from '../../utils/index.js';
import moment from 'moment-timezone';
import './Table.css';

function Table() {
  const [data, setData] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const fetchAndFilterData = () => {
    fetchAPI({
      method: 'get',
      url: '/calendar',
    })
      .then((response) => {
        const lhMember = JSON.parse(
          sessionStorage.getItem('lh_member') || '{}'
        );

        const favCurrencies = lhMember.favCurrencies
          ? lhMember.favCurrencies.split(',').filter(Boolean)
          : [];

        const favImpact = lhMember.impact
          ? lhMember.impact.split(',').filter(Boolean)
          : [];

        const timeZone = (lhMember.timeZone || 'UTC').replace(/\\/g, '/');

        let filteredData = response.data;

        if (favCurrencies.length > 0) {
          filteredData = filteredData.filter((event) =>
            favCurrencies.includes(event.country)
          );
        }

        if (favImpact.length > 0) {
          filteredData = filteredData.filter((event) =>
            favImpact.includes(event.impact)
          );
        }

        const adjustedData = filteredData.map((event) => ({
          ...event,
          date: moment.utc(event.date).tz(timeZone).format(),
        }));

        setData(adjustedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Initial fetch
  useEffect(() => {
    fetchAndFilterData();
  }, []);

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = () => {
      fetchAndFilterData();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () =>
      window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  const groupedData = useMemo(() => {
    const groups = {};
    const lhMember = JSON.parse(sessionStorage.getItem('lh_member') || '{}');
    const timeZone = (lhMember.timeZone || 'UTC').replace(/\\/g, '/');

    data.forEach((event) => {
      const dateKey = moment
        .utc(event.date)
        .tz(timeZone)
        .toDate()
        .toLocaleDateString();
      const countryKey = event.country;

      if (!groups[dateKey]) {
        groups[dateKey] = {};
      }
      if (!groups[dateKey][countryKey]) {
        groups[dateKey][countryKey] = [];
      }

      groups[dateKey][countryKey].push(event);
    });

    return groups;
  }, [data]);

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Country</th>
            <th>Time</th>
            <th>Event</th>
            <th>Impact</th>
            <th>Forecast</th>
            <th>Previous</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedData).map(([date, countries], dateIndex) => {
            const dateRowCount = Object.values(countries).reduce(
              (sum, events) => sum + events.length,
              0
            );

            return (
              <>
                {Object.entries(countries).map(
                  ([country, events], countryIndex) => {
                    return events.map((event, eventIndex) => {
                      const lhMember = JSON.parse(
                        sessionStorage.getItem('lh_member') || '{}'
                      );
                      const timeZone = (lhMember.timeZone || 'UTC').replace(
                        /\\/g,
                        '/'
                      );
                      return (
                        <tr
                          key={`event-${dateIndex}-${countryIndex}-${eventIndex}`}
                          data-date={date}
                          data-country={country}
                          className={
                            (hoveredDate === date ? 'highlight-date' : '') ||
                            (hoveredCountry === country
                              ? 'highlight-country'
                              : '') ||
                            (hoveredRow === `${date}-${country}-${eventIndex}`
                              ? 'highlight-row'
                              : '')
                          }
                          onMouseEnter={() => {
                            setHoveredDate(date);
                            setHoveredCountry(country);
                            setHoveredRow(`${date}-${country}-${eventIndex}`);
                          }}
                          onMouseLeave={() => {
                            setHoveredDate(null);
                            setHoveredCountry(null);
                            setHoveredRow(null);
                          }}
                        >
                          {countryIndex === 0 && eventIndex === 0 && (
                            <td rowSpan={dateRowCount} className="grouped-date">
                              {date}
                            </td>
                          )}
                          {eventIndex === 0 && (
                            <td
                              rowSpan={events.length}
                              className="grouped-country"
                            >
                              {country}
                            </td>
                          )}
                          <td>
                            {moment
                              .utc(event.date)
                              .tz(timeZone)
                              .format('HH:mm')}
                          </td>
                          <td>{event.title}</td>
                          <td>
                            <span
                              className={`impact-${event.impact.toLowerCase()}`}
                            >
                              {event.impact}
                            </span>
                          </td>
                          <td>{event.forecast || '-'}</td>
                          <td>{event.previous || '-'}</td>
                        </tr>
                      );
                    });
                  }
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
