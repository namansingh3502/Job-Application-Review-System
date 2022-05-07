import { useTable } from "react-table";
import Profile from "./Profile";
import { useEffect, useState } from "react";

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={"p-2 whitespace-nowrap"}
                  {...column.getHeaderProps()}
                >
                  <div className="font-semibold text-left">
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className={"text-sm divide-y divide-gray-100"}
          {...getTableBodyProps()}
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={"p-2 whitespace-nowrap"}
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
                        <div
                          className={
                            "text-md font-semibold text-white mx-auto flex flex-wrap space-x-1 md:space-x-2"
                          }
                        >
                          <button
                            className={
                              "rounded-lg bg-blue-600 hover:bg-blue-800 px-4 py-2 w-auto inline-block"
                            }
                            type={"button"}
                            onClick={() => {
                              setIsOpen(true);
                              setId(cell.row.original.id);
                            }}
                          >
                            View Profile
                          </button>
                        </div>
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
