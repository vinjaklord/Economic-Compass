/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { fetchAPI } from '../../utils/index.js';
import moment from 'moment-timezone';
import './Table.css';

function Table() {
  const [data, setData] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [memberProfile, setMemberProfile] = useState(() =>
    JSON.parse(localStorage.getItem('lh_member') || '{}')
  );
  // A lot of filters are present for the table component, that's why there is a function to handle all the filters
  const fetchAndFilterData = () => {
    fetchAPI({
      method: 'get',
      url: '/calendar',
    })
      .then((response) => {
        const lhMember = memberProfile;

        const favCurrencies = Array.isArray(lhMember.favCurrencies)
          ? lhMember.favCurrencies
          : lhMember.favCurrencies
          ? lhMember.favCurrencies.split(',').filter(Boolean)
          : [];

        const favImpact = Array.isArray(lhMember.impact)
          ? lhMember.impact
          : lhMember.impact
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

  // Fetch data when memberProfile fields change
  useEffect(() => {
    fetchAndFilterData();
  }, [
    memberProfile.favCurrencies,
    memberProfile.impact,
    memberProfile.timeZone,
  ]);

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = () => {
      const updatedMember = JSON.parse(
        localStorage.getItem('lh_member') || '{}'
      );
      setMemberProfile(updatedMember); // Update state to trigger re-fetch
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () =>
      window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  const groupedData = useMemo(() => {
    // Creates an object to group events by date and country
    const groups = {};
    const timeZone = (memberProfile.timeZone || 'UTC').replace(/\\/g, '/');

    data.forEach((event) => {
      // Convert event date to local time zone and format it as a readable string
      const dateKey = moment
        .utc(event.date)
        .tz(timeZone)
        .toDate()
        .toLocaleDateString();
      const countryKey = event.country;

      // Initialize date and country groups if they don't exist
      if (!groups[dateKey]) {
        groups[dateKey] = {};
      }
      if (!groups[dateKey][countryKey]) {
        groups[dateKey][countryKey] = [];
      }

      // Add event to the corresponding date and country group
      groups[dateKey][countryKey].push(event);
    });

    return groups;
  }, [data, memberProfile.timeZone]); // Recomputes only when data or time zone changes

  return (
    <div className="table-container">
      <div className="table-title">Economic Calendar - This Week</div>

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
                      const timeZone = (
                        memberProfile.timeZone || 'UTC'
                      ).replace(/\\/g, '/');
                      return (
                        <tr
                          key={`event-${dateIndex}-${countryIndex}-${eventIndex}`}
                          data-date={date}
                          data-country={country}
                          className={
                            (hoveredDate === date ? 'highlight-date' : '') +
                            ' ' +
                            (hoveredCountry === country
                              ? 'highlight-country'
                              : '') +
                            ' ' +
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
