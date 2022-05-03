const EducationDetails = (props) => {
  const data = props.data;
  return (
    <>
      <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
        Educational Details
      </div>
      {data.map((eduaction, index) => {
        return (
          <div className={"py-4 px-2 w-full"} key={index}>
            <p>
              <span className={""}>
                Institute : {eduaction.institute_name}{" "}
              </span>
            </p>
            <p>
              <span className={""}>
                Degree : {eduaction.certificate_degree_name}
              </span>
            </p>
            <p>
              <span className={""}>Major : {eduaction.major}</span>
            </p>
            <p>
              <span className={""}>
                Starting Date : {eduaction.starting_date}
              </span>
            </p>
            <p>
              <span className={""}>
                Completion Date : {eduaction.completion_date}
              </span>
            </p>
            <p>
              <span className={""}>Percentage : {eduaction.percentage}</span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default EducationDetails;
