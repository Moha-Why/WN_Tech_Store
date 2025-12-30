"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("tech-store-cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
        localStorage.removeItem("tech-store-cart");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tech-store-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product, quantity) => {
    if (!product.isAvailable || product.stock < 1) {
      console.warn("Product is not available or out of stock");
      return false;
    }

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity > product.stock) {
          console.warn("Cannot add more than available stock");
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: product.stock }
              : item
          );
        }

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      const quantityToAdd = Math.min(quantity, product.stock);
      const effectivePrice = product.discountPrice && product.discountPrice > 0 
        ? product.discountPrice 
        : product.price;

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          discountPrice: product.discountPrice,
          effectivePrice,
          stock: product.stock,
          thumbnail: product.thumbnail,
          quantity: quantityToAdd
        }
      ];
    });

    return true;
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + 1;
          if (newQuantity > item.stock) {
            console.warn("Cannot exceed available stock");
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const validQuantity = Math.min(newQuantity, item.stock);
          return { ...item, quantity: validQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("tech-store-cart");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.effectivePrice * item.quantity);
  }, 0);

  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        getItemQuantity,
        isInCart,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;