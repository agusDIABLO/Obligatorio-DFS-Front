import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllServiciosService } from "../../../services/serviceService";

export const getAllServiciosThunk = createAsyncThunk(
  "servicios/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllServiciosService();
      console.log("Servicios obtenidos:", response);
      return response; // debería ser un array de servicios
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);