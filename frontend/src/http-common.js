import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8800/",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-type": "application/json",
  // },
  // withCredentials: true,
});
