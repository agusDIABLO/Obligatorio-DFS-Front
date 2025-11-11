import { createSlice } from "@reduxjs/toolkit";
import { getUsersSlice } from "./userThunk";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {

    
    //acciones sincrónicas
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default userSlice.reducer;