import { configureStore } from "@reduxjs/toolkit";
import tutorialReducer from "./src/slice/tutorialSlice";

export const store = configureStore({
  reducer: {
    tutorials: tutorialReducer,
  },
});

export default store;
