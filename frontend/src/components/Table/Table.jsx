import { useState, useEffect, useMemo } from "react"; // Import only what is needed
import { useTable } from "react-table";
import { fetchAPI } from "../../utils/index.js";
import "./Table.css";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI({
      method: "get",
      url: "/calendar",
    })
      .then((response) => {
        setData(response.data); // Group data by date after receiving it
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date", // Display date on the right
        Cell: ({ value }) => {
          // Format the date
          const formattedDate = new Date(value).toLocaleDateString(); // Format the date for a more readable version
          return <div>{formattedDate}</div>;
        },
      },
      {
        Header: "Event",
        accessor: "title", // This will display the event name and time
        Cell: ({ row }) => {
          // Extract time and display it next to the title
          const time = row.original.date.split("T")[1].split("-")[0]; // Get the time
          return <div>{time}</div>;
        },
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Impact",
        accessor: "impact",
      },
      {
        Header: "Forecast",
        accessor: "forecast",
      },
      {
        Header: "Previous",
        accessor: "previous",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || index}>
              {headerGroup.headers.map((column, colIndex) => (
                <th {...column.getHeaderProps()} key={column.id || colIndex}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id || rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} key={cell.column.id || `${rowIndex}-${cellIndex}`}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
