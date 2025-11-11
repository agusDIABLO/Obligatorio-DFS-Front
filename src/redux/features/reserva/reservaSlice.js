import {createSlice} from '@reduxjs/toolkit';
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
        return reservasIniciales;
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

export const { cargarReservasIniciales } = reservasSlice.actions;
export default reservasSlice.reducer;
        