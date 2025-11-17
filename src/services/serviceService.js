import axios from "axios";


const urlBackend = import.meta.env.VITE_URL_BACKEND;



const api = axios.create({
    baseURL: urlBackend,
});

api.interceptors.request.use((config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}), error => {
    return Promise.reject(error);
});

export const getAllServiciosService = async () => {
    return api.get('/services/all')
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener servicios en service:', error);
            throw error;
        });
}