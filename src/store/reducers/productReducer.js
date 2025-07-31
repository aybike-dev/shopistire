import {
  PRODUCTS_SET_LOADING,
  PRODUCTS_SET_ERROR,
  PRODUCTS_SET_PRODUCTS,
  PRODUCTS_FILTER_BY_CATEGORY,
  PRODUCTS_SEARCH,
  PRODUCTS_CLEAR_FILTERS,
} from "../types";

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  selectedCategory: "All",
  searchQuery: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case PRODUCTS_SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case PRODUCTS_SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };

    case PRODUCTS_FILTER_BY_CATEGORY:
      const category = action.payload;
      let filteredByCategory = state.products;

      if (category !== "All") {
        filteredByCategory = state.products.filter(
          (product) => product.category === category
        );
      }

      // Apply search query if exists
      let finalFiltered = filteredByCategory;
      if (state.searchQuery) {
        finalFiltered = filteredByCategory.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
        );
      }

      return {
        ...state,
        selectedCategory: category,
        filteredProducts: finalFiltered,
      };

    case PRODUCTS_SEARCH:
      const query = action.payload.toLowerCase();
      let filteredBySearch = state.products;

      // Apply category filter
      if (state.selectedCategory !== "All") {
        filteredBySearch = filteredBySearch.filter(
          (product) => product.category === state.selectedCategory
        );
      }

      // Apply search filter
      if (query) {
        filteredBySearch = filteredBySearch.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
      }

      return {
        ...state,
        searchQuery: action.payload,
        filteredProducts: filteredBySearch,
      };

    case PRODUCTS_CLEAR_FILTERS:
      return {
        ...state,
        selectedCategory: "All",
        searchQuery: "",
        filteredProducts: state.products,
      };

    default:
      return state;
  }
};

export default productReducer;
