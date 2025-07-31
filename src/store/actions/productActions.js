import {
  PRODUCTS_SET_LOADING,
  PRODUCTS_SET_ERROR,
  PRODUCTS_SET_PRODUCTS,
  PRODUCTS_FILTER_BY_CATEGORY,
  PRODUCTS_SEARCH,
  PRODUCTS_CLEAR_FILTERS,
} from "../types";

// Import mock data
import { mockProducts } from "../../mockData/products";

// Action Creators
export const setLoading = (loading) => ({
  type: PRODUCTS_SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: PRODUCTS_SET_ERROR,
  payload: error,
});

export const setProducts = (products) => ({
  type: PRODUCTS_SET_PRODUCTS,
  payload: products,
});

export const filterByCategory = (category) => ({
  type: PRODUCTS_FILTER_BY_CATEGORY,
  payload: category,
});

export const searchProducts = (query) => ({
  type: PRODUCTS_SEARCH,
  payload: query,
});

export const clearFilters = () => ({
  type: PRODUCTS_CLEAR_FILTERS,
});

// Async Actions (Thunks)
export const fetchProducts = () => (dispatch) => {
  dispatch(setLoading(true));

  // Simulate API call
  setTimeout(() => {
    dispatch(setProducts(mockProducts));
    dispatch(setLoading(false));
  }, 500);
};
