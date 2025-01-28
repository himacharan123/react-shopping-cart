import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItems {
  [id: number]: number;
}

interface ShopContextType {
  products: Product[];
  cartItems: CartItems;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearItemFromCart: (id: number) => void;
  getTotalCartPrice: () => number;
}

export const ShopContext = createContext<ShopContextType | null>(null);

export const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItems>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (id: number) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) updatedCart[id]--;
      else delete updatedCart[id];
      return updatedCart;
    });
  };

  const clearItemFromCart = (id: number) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  const getTotalCartPrice = () =>
    Object.entries(cartItems).reduce((total, [id, quantity]) => {
      const product = products.find((p) => p.id === Number(id));
      return total + (product ? product.price * quantity : 0);
    }, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        clearItemFromCart,
        getTotalCartPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
