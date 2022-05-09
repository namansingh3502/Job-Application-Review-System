const PersonalDetail = (props) => (
  <div>
    <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
      Personal Details
    </div>
    <div className={"py-2 px-2 w-full text-md"}>
      <p>Name : {props.data.fullName}</p>
      <p>Gender : {props.data.gender}</p>
      <p>Phone : {props.data.phone}</p>
      <p>Mail : {props.data.email}</p>
    </div>
  </div>
);

export default PersonalDetail;
