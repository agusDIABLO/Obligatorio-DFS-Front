import axios from "axios";
const urlBackend = import.meta.env.VITE_URL_BACKEND;

console.log("VITE_URL_BACKEND desde import.meta.env:", import.meta.env.VITE_URL_BACKEND);

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