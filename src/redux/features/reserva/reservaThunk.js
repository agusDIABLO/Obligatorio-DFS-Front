import { createAsyncThunk } from "@reduxjs/toolkit";
import { obtenerMisReservasService,
            crearReservaService,
            cancelarReservaService,
            obtenerTodasLasReservasService,
            modificarFechaReservaService,
            obtenerReservaPorIdCategory
 } from "../../../services/reservationServices.js";


 export const getReservationsSlice = createAsyncThunk(
    "reservations/user",
    
    async (_, thunkAPI) => {
    const controller = new AbortController();
    const { signal } = thunkAPI;

    signal.addEventListener("abort", () => controller.abort());

    try {
      const data = await obtenerMisReservasService(controller);
      return data;
    } catch (err) {
      if (err.name === "AbortError") {
        return thunkAPI.rejectWithValue("Petición cancelada");
      }
      return thunkAPI.rejectWithValue("Error al obtener reservas");
    }
  }
);

export const createReservationSlice = createAsyncThunk(
    "reservations/create",
    async (nuevaReserva, thunkAPI) => {
        try {
            const data = await crearReservaService(nuevaReserva);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error al crear la reserva");
        }
    }
);

export const cancelReservationSlice = createAsyncThunk(
    "reservations/cancel",
    async (reservationId, thunkAPI) => {
        try {
            const data = await cancelarReservaService(reservationId);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error al cancelar la reserva");
        }
    }
);

export const getAllReservationsSlice = createAsyncThunk(
    "reservations/all",
    async (_, thunkAPI) => {
        try {
            const data = await obtenerTodasLasReservasService();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error al obtener todas las reservas");
        }   
    }
);

export const modifyReservationDateSlice = createAsyncThunk(
    "reservations/modifyDate",
    async ({ reservationId, nuevaFecha }, thunkAPI) => {
        try {
            const data = await modificarFechaReservaService(reservationId, nuevaFecha);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error al modificar la fecha de la reserva");
        }
    }
);

export const getReservationsByCategorySlice = createAsyncThunk(
    "reservations/byCategory",
    async (categoryId, thunkAPI) => {   
        try {
            const data = await obtenerReservaPorIdCategory(categoryId);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error al obtener reservas por categoría");
        }   
    }
);

