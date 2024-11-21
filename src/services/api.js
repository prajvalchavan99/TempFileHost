import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;
const api = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 120000,
});

export default api;
