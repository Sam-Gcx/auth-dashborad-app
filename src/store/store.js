import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./userSlice";

const store = configureStore({
  reducers: {
    userRole: useReducer,
  },
});

export default store;
