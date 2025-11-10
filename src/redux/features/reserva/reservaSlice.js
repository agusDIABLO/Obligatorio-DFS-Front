import {createSlice} from '@reduxjs/toolkit';
import { getReservationsSlice,
         createReservationSlice,
         cancelReservationSlice,
         getAllReservationsSlice,
         modificarFechaReservaSlice,
         obtenerReservaPorIdCategorySlice
} from './reservaThunk.js';


const reservasSlice = createSlice({
    name: 'reservas',
     initialState: {
    list: [],
    loading: false,
    error: null,
  },
 reducers: {},
  extraReducers: (builder) => {
    builder
      //  GET
      .addCase(getReservationsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getReservationsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  CREATE
      .addCase(createReservationSlice.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      //  DELETE
      .addCase(deleteReservationSlice.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (r) => r._id !== action.payload
        );
      })

      //  UPDATE
      .addCase(updateReservationSlice.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export const {cargarReservasIniciales, agregarReserva, eliminarReserva, modificarReserva} = reservasSlice.actions;
export default reservasSlice.reducer;
        