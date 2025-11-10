import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0, // cantidad de cargas activas
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.count += 1;
        },
        stopLoading: (state) => {
            if (state.count > 0) state.count -= 1;
        },
        resetLoading: (state) => {
            state.count = 0;
        },
    },
});

export const { startLoading, stopLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
