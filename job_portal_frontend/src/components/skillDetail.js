const SkillDetails = (props) => (
  <div>
    <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
      Skills
    </div>
    <div className={"py-2 space-y-1 px-2"}>
      {props.data.length === 0 && <span>No skills given.</span>}
      {props.data.length !== 0 &&
        props.data.map((skill, index) => (
          <div key={index}>
            Skill : {skill.skill} ( {skill.skill_level} ){" "}
          </div>
        ))}
    </div>
  </div>
);

export default SkillDetails;
