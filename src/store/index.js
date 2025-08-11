import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import productReducer from "./reducers/productReducer.js";
import cartReducer from "./slices/cartSlice.js";

const rootReducer = combineReducers({
  auth: userReducer,
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
