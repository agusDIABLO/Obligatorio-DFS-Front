import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlBackend } from "../../../constants/constants";
import { getAllServiciosService } from "../../../services/serviceService.js";

export const getAllServiciosThunk = createAsyncThunk(
  "servicios/getAll",
async (_, { rejectWithValue }) => {
    try {
      const response = await getAllServiciosService();
      console.log("Servicios obtenidos:", response);

      // Si el backend devuelve un objeto con Services dentro, tomamos eso
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