const Resume = (props) => {
  return (
    <>
      <div className={"w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"}>
        Resume
      </div>

      {props.data !== null ? (
        <div className={"px-2 space-x-2 py-2"}>
          <a href={props.data} target="_blank" rel="noopener noreferrer">
            <button
              className={
                "rounded-lg text-md font-normal text-white bg-blue-600 hover:bg-blue-800 px-2 py-1"
              }
              type={"button"}
            >
              View Resume
            </button>
          </a>
          <a href={props.data} download="Nice Name of Document.pdf">
            <button
              className={
                "rounded-lg text-md font-normal text-white bg-blue-600 hover:bg-blue-800 px-2 py-1"
              }
              type={"button"}
            >
              Download Resume
            </button>
          </a>
        </div>
      ) : (
        <p>Resume not given.</p>
      )}
    </>
  );
};

export default Resume;
