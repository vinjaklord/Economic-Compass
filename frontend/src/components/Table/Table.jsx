import { useState, useEffect, useMemo } from "react";
import { fetchAPI } from "../../utils/index.js";
import "./Table.css";

function Table() {
  const [data, setData] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    fetchAPI({
      method: "get",
      url: "/calendar",
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Group data by Date and Country
  const groupedData = useMemo(() => {
    const groups = {};

    data.forEach((event) => {
      const dateKey = new Date(event.date).toLocaleDateString();
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
            const dateRowCount = Object.values(countries).reduce((sum, events) => sum + events.length, 0); // Total rows for this date

            return (
              <>
                {Object.entries(countries).map(([country, events], countryIndex) => {
                  return events.map((event, eventIndex) => (
                    <tr
                      key={`event-${dateIndex}-${countryIndex}-${eventIndex}`}
                      data-date={date}
                      data-country={country}
                      className={(hoveredDate === date ? "highlight-date" : "") || (hoveredCountry === country ? "highlight-country" : "") || (hoveredRow === `${date}-${country}-${eventIndex}` ? "highlight-row" : "")}
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
                      {/* Date column - Merged for all events on the same date */}
                      {countryIndex === 0 && eventIndex === 0 && (
                        <td rowSpan={dateRowCount} className="grouped-date">
                          {date}
                        </td>
                      )}

                      {/* Country column - Merged for all events under the same country */}
                      {eventIndex === 0 && (
                        <td rowSpan={events.length} className="grouped-country">
                          {country}
                        </td>
                      )}

                      {/* Time column */}
                      <td>{event.date.split("T")[1].split("-")[0].slice(0, 5)}</td>
                      <td>{event.title}</td>
                      <td>
                        <span className={`impact-${event.impact.toLowerCase()}`}>{event.impact}</span>
                      </td>
                      <td>{event.forecast || "-"}</td>
                      <td>{event.previous || "-"}</td>
                    </tr>
                  ));
                })}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
