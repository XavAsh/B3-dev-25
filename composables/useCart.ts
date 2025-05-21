import { useLocalStorage } from "@vueuse/core";
import type { Product } from "~/types/products";

interface CartItem extends Product {
  quantity: number;
}

export const useCart = () => {
  const cart = useLocalStorage<CartItem[]>("cart", []);

  const addToCart = (product: Product) => {
    const existingItem = cart.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cart.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
};
