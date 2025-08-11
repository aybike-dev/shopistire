// Mock cart data for different users
export const cartData = {
  1: [
    // User ID 1
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "₺45.999",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592910061451-2a2d9071f68f?w=200",
      category: "Elektronik",
      addedAt: new Date().toISOString(),
    },
    {
      id: 15,
      name: "Nike Air Max 270",
      price: "₺2.499",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
      category: "Spor",
      addedAt: new Date().toISOString(),
    },
  ],
  2: [
    // User ID 2
    {
      id: 8,
      name: "MacBook Pro M2",
      price: "₺32.999",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200",
      category: "Elektronik",
      addedAt: new Date().toISOString(),
    },
  ],
  3: [
    // User ID 3
    {
      id: 3,
      name: "Samsung Galaxy S23",
      price: "₺28.999",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200",
      category: "Elektronik",
      addedAt: new Date().toISOString(),
    },
    {
      id: 12,
      name: "Levi's 501 Jean",
      price: "₺399",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200",
      category: "Giyim",
      addedAt: new Date().toISOString(),
    },
    {
      id: 20,
      name: "Kitchenaid Mikser",
      price: "₺1.899",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
      category: "Ev & Yaşam",
      addedAt: new Date().toISOString(),
    },
  ],
};

// Helper functions for cart operations
export const getCartByUserId = (userId) => {
  return cartData[userId] || [];
};

export const addToCart = (userId, product) => {
  if (!cartData[userId]) {
    cartData[userId] = [];
  }

  const existingItemIndex = cartData[userId].findIndex(
    (item) => item.id === product.id
  );

  if (existingItemIndex > -1) {
    // If item already exists, increase quantity
    cartData[userId][existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cartData[userId].push({
      ...product,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });
  }

  return cartData[userId];
};

export const removeFromCart = (userId, productId) => {
  if (!cartData[userId]) return [];

  cartData[userId] = cartData[userId].filter((item) => item.id !== productId);
  return cartData[userId];
};

export const updateCartQuantity = (userId, productId, quantity) => {
  if (!cartData[userId]) return [];

  const itemIndex = cartData[userId].findIndex((item) => item.id === productId);
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cartData[userId].splice(itemIndex, 1);
    } else {
      cartData[userId][itemIndex].quantity = quantity;
    }
  }

  return cartData[userId];
};

export const clearCart = (userId) => {
  if (cartData[userId]) {
    cartData[userId] = [];
  }
  return [];
};
