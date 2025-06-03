import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { flowReducer } from "./slices/flowSlice";

const rootReducer = combineReducers({
  flow: flowReducer,
});



export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
