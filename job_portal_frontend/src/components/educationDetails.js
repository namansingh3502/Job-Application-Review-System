const EducationDetails = (props) => (
  <div>
    <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
      Educational Details
    </div>
    <div className={"py-2 space-y-2 px-2"}>
      {props.data.length === 0 && <span>No education details given.</span>}
      {props.data.length !== 0 &&
        props.data.map((education, index) => {
          return (
            <div key={index}>
              <p>Institute Name : {education.institute_name}</p>
              <p>Degree : {education.certificate_degree_name}</p>
              <p>Major : {education.major}</p>
              <p>Starting Date : {education.starting_date}</p>
              <p>Completion Date : {education.completion_date}</p>
              <p>Percentage/CGPA : {education.percentage}</p>
            </div>
          );
        })}
    </div>
  </div>
);

export default EducationDetails;
