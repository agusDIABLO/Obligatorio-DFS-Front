import {createSlice} from '@reduxjs/toolkit';
import { getAllServiciosThunk } from './servicesThunk.js';


const initialState = {
  servicios: [],
  loading: false,
  error: null,
};

const serviciosSlice = createSlice({
  name: "servicios",
  initialState,
  reducers: {
    // acción síncrona para establecer los servicios manualmente si se necesita
    setServicios: (state, action) => {
      const serviciosIniciales = action.payload;
      return serviciosIniciales;
      
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiciosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServiciosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.servicios = action.payload;
      })
      .addCase(getAllServiciosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setServicios, setLoading, setError } = serviciosSlice.actions;
export default serviciosSlice.reducer;