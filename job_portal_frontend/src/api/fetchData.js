import axios from "axios";

const FetchData = async (key) => {
  return await axios.get(`${key.queryKey[1]}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};
export default FetchData;
