import { BsPencilSquare } from "react-icons/all";
import CandidateTable from "./candidateTable";
import NewCandidate from "./newCandidate";
import { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={"mx-auto w-full lg:w-3/4 xl:w-3/5 min-h-full pt-4 px-1"}>
      <h1 className={"text-slate-300 text-4xl text font-bold"}>
        Job Application Review System
      </h1>
      <div className={"bg-slate-200 lg:p-4 mt-4 rounded-xl min-h-full"}>
        <div className={"overflow-auto"}>
          <div className={"py-2"}>
            <div className={"text-3xl font-bold sm:hidden"}>Candidates</div>
            <button
              className={
                "sm:float-right p-2 bg-blue-600 hover:bg-blue-800 rounded-lg flex items-center text-white"
              }
              type={"button"}
              onClick={() => setIsOpen(true)}
            >
              <BsPencilSquare className={"text-md mx-2"} />
              Add New Candidate
            </button>
            <div className={"text-3xl font-bold mx-2  hidden sm:block"}>
              All Candidates
            </div>
          </div>
          <CandidateTable
            isOpen={isOpen}
            setIsOpen={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </div>
      <NewCandidate setIsOpen={() => setIsOpen(false)} isOpen={isOpen} />
    </div>
  );
};

export default Dashboard;
