import axios from "axios";

//IN PRODuction, there is no localhost so i ahve to make this dynamic.
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:2000/api" : "/api";
//instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export default axiosInstance;
