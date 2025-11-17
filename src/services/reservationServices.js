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


export const obtenerMisReservasService = async () => {
    const userId = localStorage.getItem('userId');
    return api.get(`/reservations/user/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener mis reservas:', error);
            throw error;
        });
}

export const obtenerReservaByIdService = async (reservationId) => {
    return api.get(`/reservations/reservation/${reservationId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener la reserva por ID:', error);
            throw error;
        });
        
}


export const crearReservaService = async (nuevaReserva) => {
    return api.post('/reservations', nuevaReserva)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error al crear la reserva:', error);
            throw error;
        });
}


export const cancelarReservaService = async (reservationId) => {
    return api.delete(`/reservations/${reservationId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error al cancelar la reserva:', error);
            throw error;
        });
}

export const obtenerTodasLasReservasService = async () => {
    return api.get('/reservations/all')
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener todas las reservas:', error);
            throw error;
        });
}


export const modificarFechaReservaService = async (reservationId, reservationDateTime) => {
    return api.patch(`/reservations/${reservationId}`, reservationDateTime)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error al modificar la reserva:', error);
            throw error;
        });
}

export const obtenerReservaPorIdCategory = async (categoryId) => {
    return api.get(`/reservations/category/${categoryId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener reservas por categoría:', error);
            throw error;
        });
}