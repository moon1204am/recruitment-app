import axios from "axios";
const instance =  axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});

export default instance;