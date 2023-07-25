import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  text: "",
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    showConfirm: (state, action) => {
      state.show = true;
      state.text = action.payload.text;
    },
    hideConfirm: (state) => {
      state.show = false;
      state.text = "";
    },
  },
});

export const { showConfirm, hideConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
