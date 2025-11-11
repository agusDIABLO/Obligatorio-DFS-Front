import axios from "axios";

import { urlBackend } from "../constants/constants";

const api = axios.create({
    baseURL: urlBackend,
});

export const getAllServiciosService = async () => {
    return api.get('/services/all')
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener servicios en service:', error);
            throw error;
        });
}