import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllServiciosService } from "../../../redux/features/service/servicesSlice";

export const getAllServiciosThunk = createAsyncThunk(
  "servicios/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllServiciosService();
      return response; // debería ser un array de servicios
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);