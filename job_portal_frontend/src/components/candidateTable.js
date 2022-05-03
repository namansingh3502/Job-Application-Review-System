import { useQuery } from "react-query";
import FetchData from "../api/fetchData";
import Table from "./Table";
import { useState } from "react";

const CandidateTable = (props) => {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("All");

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    [`candidate-list`, `applications`],
    //   [`candidate-list`, `applications/${page}/${filter}`],
    FetchData,
    { keepPreviousData: true, retry: 1, cacheTime: 3600000 }
  );

  return (
    <div>
      <div className={"flex inline-block px-2 space-x-2 font-medium my-2"}>
        <button
          className={"py-1 px-2 bg-slate-400 rounded-lg"}
          onClick={() => {
            setStatusFilter("all");
            setPage(0);
          }}
          disabled={statusFilter === "All" && page === 0}
        >
          All
        </button>
        <button
          className={"py-1 px-2 bg-yellow-400 rounded-lg"}
          onClick={() => {
            setStatusFilter("Applied");
            setPage(0);
          }}
          disabled={statusFilter === "Applied" && page === 0}
        >
          Applied
        </button>
        <button
          className={"py-1 px-2 bg-green-500 rounded-lg"}
          onClick={() => {
            setStatusFilter("Accepted");
            setPage(0);
          }}
          disabled={statusFilter === "Accepted" && page === 0}
        >
          Accepted
        </button>
        <button
          className={"py-1 px-2 bg-red-600 rounded-lg"}
          onClick={() => {
            setStatusFilter("Rejected");
            setPage(0);
          }}
          disabled={statusFilter === "Rejected" && page === 0}
        >
          Rejected
        </button>
      </div>
      {status === "loading" && <span>Loading......</span>}
      {status === "error" && <span>Error...... {error.message}</span>}
      {status === "success" && <Table data={data.data} />}
    </div>
  );
};

export default CandidateTable;
