import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllServiciosService } from "../../../services/serviceService.js";

export const getAllServiciosThunk = createAsyncThunk(
  "servicios/getAll",
async (_, { rejectWithValue }) => {
    try {
      const response = await getAllServiciosService();
      
      const servicios = Array.isArray(response)
        ? response
        : response.Services || response.services || [];

      return servicios;
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);