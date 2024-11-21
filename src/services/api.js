import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(">>>>>",BACKEND_URL);
const api = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 120000,
});

export default api;
