import axios from "axios";

//instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
});
export default axiosInstance;
