import axios from "axios";

const API = axios.create({
  baseURL: "https://recipi-backend-z2f8.onrender.com/api"
});

export default API;