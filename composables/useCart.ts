import { useLocalStorage } from "@vueuse/core";
import type { Product } from "~/types/products";

export const useCart = () => {
  const cart = useLocalStorage<Product[]>("cart", []);

  const addToCart = (product: Product) => {
    cart.value.push(product);
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};
