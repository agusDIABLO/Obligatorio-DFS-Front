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
      state.servicios = action.payload;
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

export const { setServicios } = serviciosSlice.actions;
export default serviciosSlice.reducer;