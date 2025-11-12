import { createAsyncThunk } from "@reduxjs/toolkit";
import { obtenerUsuariosService, obtenerUsuariosPorRolService } from "../../../services/userServices.js";

export const getUsersSlice = createAsyncThunk(
  "users/getUsersSlice",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const { signal } = thunkAPI;

    signal.addEventListener("abort", () => {
      controller.abort();
    });

    try {
      const result = await obtenerUsuariosService(controller);
      return result;
    } catch (err) {
      if (err.name === "AbortError") {
        return thunkAPI.rejectWithValue("Petición cancelada");
      }
      return thunkAPI.rejectWithValue("Error al obtener usuarios");
    }
  }
);

export const getUsersByRole = createAsyncThunk(
  "users/getUsersByRole",
  async (rol, thunkAPI) => {
    try {
      const data = await obtenerUsuariosPorRolService(rol);
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.Users)) return data.Users;
      return data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue("Error al obtener usuarios por rol");
    }
  }
);