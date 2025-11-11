import axios from "axios";
import { urlBackend } from "../constants/constants";

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

export const obtenerUsuariosService = async () => {
    return api.get('/users/all')
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener usuarios en service:', error);
            throw error;
        });
}

export const updatePlanUsuarioService = async (userId, nuevoPlan) => {
    return api.patch(`/users/${userId}/plan`, { plan: nuevoPlan })    
        .then(response => {
            console.log('Plan actualizado:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error al actualizar el plan del usuario:', error);
            throw error;
        });
}


export const obtenerUsuarioByIdService = async (userId) => {
    return api.get(`/users/user/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener el usuario por ID:', error);
            throw error;
        });
}