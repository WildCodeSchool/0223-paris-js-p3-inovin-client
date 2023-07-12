import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: { user: null, isLogged: false },
  reducers: {
    login: (state, action) => {
      console.log({ ...state, user: action.payload, isLogged: true });
      return { ...state, user: action.payload, isLogged: true };
    },
    logout: (state, action) => {
      console.log({ ...state, user: null, isLogged: false });
      return { ...state, user: null, isLogged: false };
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
