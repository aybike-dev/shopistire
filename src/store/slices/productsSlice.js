import { createSlice } from "@reduxjs/toolkit";

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999.99,
    description: "En yeni iPhone modeli, gelişmiş kamera ve performans",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
    stock: 50,
    rating: 4.8,
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1199.99,
    description: "Güçlü M2 çipli ultra ince dizüstü bilgisayar",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=MacBook+Air+M2",
    stock: 30,
    rating: 4.9,
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249.99,
    description: "Aktif gürültü engelleme özellikli kablosuz kulaklık",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=AirPods+Pro",
    stock: 100,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Nike Air Max",
    price: 129.99,
    description: "Rahat ve şık spor ayakkabı",
    category: "Fashion",
    image: "https://via.placeholder.com/300x300?text=Nike+Air+Max",
    stock: 75,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Samsung 4K TV",
    price: 799.99,
    description: "55 inç 4K Ultra HD Smart TV",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Samsung+4K+TV",
    stock: 25,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Adidas Hoodie",
    price: 59.99,
    description: "Konforlu ve şık kapüşonlu sweatshirt",
    category: "Fashion",
    image: "https://via.placeholder.com/300x300?text=Adidas+Hoodie",
    stock: 60,
    rating: 4.4,
  },
  {
    id: 7,
    name: "PlayStation 5",
    price: 499.99,
    description: "Son nesil oyun konsolu",
    category: "Gaming",
    image: "https://via.placeholder.com/300x300?text=PlayStation+5",
    stock: 15,
    rating: 4.9,
  },
  {
    id: 8,
    name: "Coffee Maker",
    price: 89.99,
    description: "Otomatik kahve makinesi",
    category: "Home",
    image: "https://via.placeholder.com/300x300?text=Coffee+Maker",
    stock: 40,
    rating: 4.3,
  },
];

const initialState = {
  products: mockProducts,
  filteredProducts: mockProducts,
  loading: false,
  error: null,
  selectedCategory: "All",
  searchQuery: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      const category = action.payload;

      if (category === "All") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category === category
        );
      }

      // Apply search query if exists
      if (state.searchQuery) {
        state.filteredProducts = state.filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
    },
    searchProducts: (state, action) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();

      let filtered = state.products;

      // Apply category filter
      if (state.selectedCategory !== "All") {
        filtered = filtered.filter(
          (product) => product.category === state.selectedCategory
        );
      }

      // Apply search filter
      if (query) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
      }

      state.filteredProducts = filtered;
    },
    clearFilters: (state) => {
      state.selectedCategory = "All";
      state.searchQuery = "";
      state.filteredProducts = state.products;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  filterByCategory,
  searchProducts,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
