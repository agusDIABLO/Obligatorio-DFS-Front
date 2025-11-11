import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from "./features/loadingSlice.js";
import reservasSlice from "./features/reserva/reservaSlice.js";
import userSlice from "./features/user/userSlice.js";
import serviciosSlice from "./features/service/servicesSlice.js";

export const store = configureStore({
    reducer: {
        loadingSlice,
        reservasSlice,
        userSlice,
        serviciosSlice
    }
})