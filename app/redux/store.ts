import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/categories";
import useReducer2 from "./slices/products";
// import ""

const store = configureStore({
  reducer: {
    categories: useReducer,
    products: useReducer2,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
