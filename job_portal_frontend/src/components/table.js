import { useTable } from "react-table";
import Profile from "./profile";
import { useState } from "react";

const columns = [
  {
    Header: "Name",
    accessor: "fullName",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
  },
];

const Table = (props) => {
  const data = props.data;
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className={"table w-full py-2 h-60 text-left"}>
      <table {...getTableProps} className={"table-auto w-full overflow-scroll"}>
        <thead
          className={
            "text-sm font-semibold uppercase text-gray-600 bg-gray-300"
          }
        >
          <tr>
            {headers.map((column) => (
              <th
                className={"p-2 whitespace-nowrap"}
                {...column.getHeaderProps()}
              >
                {column.Header !== "Action" ? (
                  <div className="font-semibold text-left">
                    {column.render("Header")}
                  </div>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={"text-md divide-y divide-gray-100"}
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={"px-2 py-1 whitespace-nowrap"}
                      {...cell.getCellProps()}
                    >
                      {cell.column.Header !== "Status" &&
                        cell.column.Header !== "Action" && (
                          <span>{cell.value}</span>
                        )}

                      {cell.column.Header === "Status" && (
                        <span
                          className={`font-medium ${
                            cell.value === "Accepted"
                              ? "text-green-600"
                              : cell.value === "Rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {cell.value}
                        </span>
                      )}

                      {cell.column.Header === "Action" && (
                        <button
                          className={
                            "rounded-lg text-md font-normal text-white bg-blue-600 hover:bg-blue-800 px-4 py-2"
                          }
                          type={"button"}
                          onClick={() => {
                            setIsOpen(true);
                            setId(cell.row.original.id);
                          }}
                        >
                          View Profile
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isOpen && (
        <Profile
          isOpen={isOpen}
          id={id}
          setIsOpen={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Table;
