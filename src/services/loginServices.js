import axios from 'axios';
//import { urlBackend } from '../constants/constants';
const urlBackend = import.meta.env.VITE_URL_BACKEND;

 
// Creamos la instancia axios local para este service
const api = axios.create({
    baseURL: urlBackend,
});

// Interceptor por si querés agregar token después
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

// Servicio de login usando api.post()
export const loginApiObligatorio = async (email, password) => {
    try {
        const response = await api.post(
            "/login",
            { email, password }
        );

        return response.data;

    } catch (error) {
        console.log("error loginService:", error);

        if (error.response) {
            const msg =
                error.response.data?.message ||
                JSON.stringify(error.response.data);

            const err = new Error(msg);
            err.status = error.response.status;
            err.responseData = error.response.data;
            throw err;
        }

        throw new Error(error.message || "Hubo un error en la red");
    }
};
