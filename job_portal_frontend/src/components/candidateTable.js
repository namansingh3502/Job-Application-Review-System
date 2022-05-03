import { useMemo } from "react";
import { useTable } from "react-table";

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
    Header: "Mail",
    accessor: "mail",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
  },
];

const CandidateTable = (props) => {
  const data = useMemo(() => props.data.data, []);

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
                      {cell.column.Header === "Action" && (
                        <div
                          className={
                            "text-md font-semibold text-white mx-auto flex flex-wrap space-x-1 md:space-x-2"
                          }
                        >
                          <button
                            className={
                              "rounded bg-blue-500 px-2 py-1 w-auto inline-block"
                            }
                            type={"button"}
                            onClick={() => {}}
                          >
                            View Profile
                          </button>
                        </div>
                      )}

                      {cell.column.Header === "Status" && (
                        <span
                          className={
                            cell.value === "Accepted"
                              ? "text-green-700"
                              : cell.value === "Rejected"
                              ? "text-red-600"
                              : "text-yellow-500"
                          }
                        >
                          {cell.value}
                        </span>
                      )}

                      {cell.column.Header !== "Status" &&
                        cell.column.Header !== "Action" && (
                          <span>{cell.value}</span>
                        )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
