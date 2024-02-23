import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { user: {
  name: '',
  id: '',
  role: ''
} };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {
        name: '',
        id: '',
        role: ''
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
