import Axios from "axios";
import { apiURL } from "../urlConfig";

const axiosInstance = Axios.create({
  baseURL: apiURL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export default axiosInstance;
