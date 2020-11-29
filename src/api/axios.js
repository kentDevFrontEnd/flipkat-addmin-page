import Axios from "axios";
import { apiURL } from "../urlConfig";

const token = localStorage.getItem("token");
console.log(token);
// BUG when you want to logout at first time after login you need refresh page

const axiosInstance = Axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
