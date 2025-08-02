// Export all mock data
export { mockUsers } from "./users";
export { mockProducts, productCategories } from "./products";
export { mockSellers } from "./sellers";

// You can also export combined data if needed
export const mockData = {
  users: require("./users").mockUsers,
  products: require("./products").mockProducts,
  categories: require("./products").productCategories,
  sellers: require("./sellers").mockSellers,
};
