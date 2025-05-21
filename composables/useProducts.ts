import { useLocalStorage } from "@vueuse/core";
import type { Product } from "~/types/products";

export const useProducts = () => {
  const products = useLocalStorage<Product[]>("products", []);
  const isGenerated = useLocalStorage<boolean>("products-generated", false);

  const generateProducts = async () => {
    if (isGenerated.value) return;

    // We'll implement the actual product generation later
    // This is just a placeholder for now
    const response = await fetch("https://fakestoreapi.com/products?limit=200");
    const data = await response.json();
    products.value = data;
    isGenerated.value = true;
  };

  return {
    products,
    isGenerated,
    generateProducts,
  };
};
