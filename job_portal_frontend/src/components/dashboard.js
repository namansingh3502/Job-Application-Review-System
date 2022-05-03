import CandidateList from "./candidateList";

const Dashboard = () => {
  return (
    <div className={"mx-auto w-full lg:w-3/4 xl:w-3/5 min-h-full pt-4 px-1"}>
      <h1 className={"text-slate-300 text-4xl text font-bold"}>
        Job Application Review System
      </h1>
      <div className={"bg-slate-200 lg:p-4 mt-4 rounded-xl min-h-full"}>
        <CandidateList />
      </div>
    </div>
  );
};

export default Dashboard;
