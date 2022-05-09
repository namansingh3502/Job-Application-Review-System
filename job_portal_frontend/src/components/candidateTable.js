import { useQuery } from "react-query";
import FetchData from "../api/fetchData";
import Table from "./table";
import { useState } from "react";

function FilterButton(props) {
  return (
    <button
      className={`py-1 px-2 rounded-lg ${props.data.color}`}
      onClick={() => {
        props.setApplicationStatus(props.data.name);
      }}
      disabled={props.disabledButton === props.data.name}
    >
      {props.data.name}
    </button>
  );
}

const BUTTONS = [
  { name: "All", color: "bg-slate-400" },
  { name: "Applied", color: "bg-yellow-400" },
  { name: "Accepted", color: "bg-green-500" },
  { name: "Rejected", color: "bg-red-600" },
];

function CandidateTable() {
  const [page, setPage] = useState(1);
  const [applicationStatus, setApplicationStatus] = useState("All");

  const { status, data } = useQuery(
    [`candidate-list`, `applications/${page}/${applicationStatus}`],
    FetchData,
    { keepPreviousData: true, retry: 1, cacheTime: 3600000 }
  );

  return (
    <div>
      <div className={"flex inline-block px-2 space-x-2 font-medium my-2"}>
        {BUTTONS.map((button) => (
          <FilterButton
            setApplicationStatus={(status) => {
              setApplicationStatus(status);
              setPage(1);
            }}
            data={button}
            disabledButton={applicationStatus}
            key={button.name}
          />
        ))}
      </div>
      <div className={"text-black"}>
        {status === "loading" && <span>Loading......</span>}
        {status === "error" && <span>Something went wrong...... </span>}
        {status === "success" && data?.data.length !== 0 ? (
          <div className={"overflow-auto"}>
            <Table data={data.data.data} />
          </div>
        ) : null}
        {status === "success" && data.data.length === 0 && (
          <div>No candidates present.</div>
        )}
      </div>

      <div className={"w-full py-4 flex justify-center space-x-2 items-center"}>
        <button
          className={
            "py-1 px-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
          }
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous Page
        </button>
        <div>Page {page}</div>
        <button
          className={
            "py-1 px-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
          }
          onClick={() => setPage(page + 1)}
          disabled={!data?.data["has_next"]}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default CandidateTable;
