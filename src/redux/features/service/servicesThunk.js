import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlBackend } from "../../../constants/constants";

export const getAllServiciosThunk = createAsyncThunk(
  "servicios/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllServiciosService();
      console.log("Servicios obtenidos:", response);
      return response; // debería ser un array de servicios
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);