import { useQuery } from "react-query";
import FetchData from "../api/fetchData";
import { BsPencilSquare } from "react-icons/all";
import CandidateTable from "./candidateTable";

const CandidateList = () => {
  const { data, status, error } = useQuery(
    [`candidate-list`, `applications`],
    FetchData,
    { retry: 1, cacheTime: 3600000 }
  );

  return (
    <div className={"overflow-auto"}>
      <div className={"p-2"}>
        <div className={"text-3xl font-bold mx-2 sm:hidden"}>
          All Candidates
        </div>
        <button
          className={
            "sm:float-right p-2 bg-blue-600 hover:bg-blue-900 rounded-lg flex items-center text-white"
          }
          type={"button"}
          onClick={() => alert("Add new candidate button")}
        >
          <BsPencilSquare className={"text-md mx-2"} />
          Add New Candidate
        </button>
        <div className={"text-3xl font-bold mx-2  hidden sm:block"}>
          All Candidates
        </div>
      </div>
      {status === "success" && <CandidateTable data={data} />}
      {status === "loading" && <span>Loading......</span>}
      {status === "error" && <span>Error...... {error.message}</span>}
    </div>
  );
};

export default CandidateList;
