import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import productsReducer from "./productsReducer";

const store = configureStore({ reducer: combineReducers({ productsReducer: productsReducer }) });
export default store;