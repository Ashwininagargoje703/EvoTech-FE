import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import formSlice from "./formSlice";

const rootReducer = combineReducers({
  user: userSlice,
  form: formSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
