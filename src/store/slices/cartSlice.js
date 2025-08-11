import { createSlice } from "@reduxjs/toolkit";
import {
  getCartByUserId,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../../mockData/cart";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setCartLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addItemToCart: (state, action) => {
      const { userId, product } = action.payload;
      const updatedCart = addToCart(userId, product);
      state.items = updatedCart;
    },
    removeItemFromCart: (state, action) => {
      const { userId, productId } = action.payload;
      const updatedCart = removeFromCart(userId, productId);
      state.items = updatedCart;
    },
    updateItemQuantity: (state, action) => {
      const { userId, productId, quantity } = action.payload;
      const updatedCart = updateCartQuantity(userId, productId, quantity);
      state.items = updatedCart;
    },
    clearUserCart: (state, action) => {
      const { userId } = action.payload;
      clearCart(userId);
      state.items = [];
    },
    loadUserCart: (state, action) => {
      const { userId } = action.payload;
      const userCart = getCartByUserId(userId);
      state.items = userCart;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setCartItems,
  setCartLoading,
  setCartError,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearUserCart,
  loadUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;
