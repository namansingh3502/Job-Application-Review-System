const SkillDetails = (props) => {
  const data = props.data;
  return (
    <>
      <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
        Skills
      </div>
      <div className={"py-4"}>
        {data.map((skill, index) => {
          return (
            <div className={"py-1 px-2 w-full"} key={index}>
              <span className={""}>Skill : {skill.skill} </span>
              <span className={""}> ( {skill.skill_level} ) </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SkillDetails;
