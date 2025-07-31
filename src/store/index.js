import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  products: productReducer,
});

export default rootReducer;
