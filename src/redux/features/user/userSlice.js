import { createSlice } from "@reduxjs/toolkit";
import { getUsersSlice, getUsersByRole } from "./userThunk";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    list: [],          // todos los usuarios
    listByRole: [],    // usuarios filtrados por rol
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ------------ getUsersSlice ------------
      .addCase(getUsersSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getUsersSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ------------ getUsersByRoleThunk ------------
      .addCase(getUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.listByRole = action.payload;
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;