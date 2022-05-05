import { useQuery } from "react-query";
import FetchData from "../api/fetchData";
import Table from "./Table";
import { useState } from "react";

const CandidateTable = (props) => {
  const [page, setPage] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState("All");
  const [dataChanged, setDataChanged] = useState(false);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    [`candidate-list`, `applications/${page}/${applicationStatus}`],
    FetchData,
    { keepPreviousData: true, retry: 1, cacheTime: 3600000 }
  );

  return (
    <div>
      <div className={"flex inline-block px-2 space-x-2 font-medium my-2"}>
        <button
          className={"py-1 px-2 bg-slate-400 rounded-lg"}
          onClick={() => {
            setApplicationStatus("All");
            setPage(0);
          }}
          disabled={applicationStatus === "All" && page === 0}
        >
          All
        </button>
        <button
          className={"py-1 px-2 bg-yellow-400 rounded-lg"}
          onClick={() => {
            setApplicationStatus("Applied");
            setPage(0);
          }}
          disabled={applicationStatus === "Applied" && page === 0}
        >
          Applied
        </button>
        <button
          className={"py-1 px-2 bg-green-500 rounded-lg"}
          onClick={() => {
            setApplicationStatus("Accepted");
            setPage(0);
          }}
          disabled={applicationStatus === "Accepted" && page === 0}
        >
          Accepted
        </button>
        <button
          className={"py-1 px-2 bg-red-600 rounded-lg"}
          onClick={() => {
            setApplicationStatus("Rejected");
            setPage(0);
          }}
          disabled={applicationStatus === "Rejected" && page === 0}
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
