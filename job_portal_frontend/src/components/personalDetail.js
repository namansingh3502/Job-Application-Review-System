const PersonalDetail = (props) => {
  const data = props.data;
  return (
    <>
      <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
        Personal Details
      </div>
      <div className={"py-4 px-2 w-full"}>
        <p className={""}>Name : {data.fullName}</p>
        <p className={""}>Gender : {data.gender}</p>
        <p className={""}>Phone : {data.phone}</p>
        <p className={""}>Mail : {data.mail}</p>
      </div>
    </>
  );
};

export default PersonalDetail;
