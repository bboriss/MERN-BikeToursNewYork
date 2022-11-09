import axios from "axios";

export default axios.create({
  baseURL: "https://mern-biketoursnewyork-production.up.railway.app/",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-type": "application/json",
  // },
  // withCredentials: true,
});
