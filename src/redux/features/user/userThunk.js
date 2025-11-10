import { createAsyncThunk } from "@reduxjs/toolkit";
import { obtenerUsuariosService } from "../../../services/userServices.js";

export const getUsersSlice = createAsyncThunk(
  "users/getUsersSlice",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const { signal } = thunkAPI;

    signal.addEventListener("abort", () => {
      console.log("Petición cancelada: users");
      controller.abort();
    });

    try {
      console.log("Iniciando fetch de usuarios...");
      const result = await obtenerUsuariosService(controller);
      console.log("Usuarios obtenidos:", result);
      return result; // devuelve el array de usuarios
    } catch (err) {
      if (err.name === "AbortError") {
        return thunkAPI.rejectWithValue("Petición cancelada");
      }
      return thunkAPI.rejectWithValue("Error al obtener usuarios");
    }
  }
);