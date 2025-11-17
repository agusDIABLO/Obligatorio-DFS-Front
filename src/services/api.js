import axios from "axios";
//import { urlBackend } from "../constants/constants";
const urlBackend = import.meta.env.VITE_URL_BACKEND;


const api = axios.create({
  baseURL: urlBackend,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;