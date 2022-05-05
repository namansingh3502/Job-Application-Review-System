import axios from "axios";

const FetchData = async (key) => {
  return await axios.get(`${key.queryKey[1]}`, {});
};
export default FetchData;
