import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import confirmReducer from "./confirm";

export default configureStore({
  reducer: { auth, confirm: confirmReducer },
});
