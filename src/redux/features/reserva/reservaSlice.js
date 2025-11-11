import { createSlice } from '@reduxjs/toolkit';
import {
  getReservationsSlice,
  createReservationSlice,
  cancelReservationSlice,
  getAllReservationsSlice,
  modifyReservationDateSlice,
  getReservationsByCategorySlice,
} from './reservaThunk.js';



const reservasSlice = createSlice({
  name: 'reservas',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {

    cargarReservasIniciales: (state, action) => {
      const reservasIniciales = action.payload;
      // mantener la forma del slice: { list, loading, error }
      state.list = reservasIniciales;
    },

    borrarReserva: (state, action) => {
      const reservaId = action.payload;
      state.list = state.list.filter((reserva) => reserva._id !== reservaId);
    },

    updateReserva: (state, action) => {
      const reserva = action.payload;
      const index = state.list.findIndex((r) => r._id === reserva._id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...reserva };
      }
    }

  },
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
      .addCase(getAllReservationsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getReservationsByCategorySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      //  CREATE
      .addCase(createReservationSlice.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      //  DELETE (cancel)
      .addCase(cancelReservationSlice.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      })

      //  UPDATE (modify date)
      .addCase(modifyReservationDateSlice.fulfilled, (state, action) => {
        const index = state.list.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export const { cargarReservasIniciales, updateReserva, borrarReserva } = reservasSlice.actions;
export default reservasSlice.reducer;
