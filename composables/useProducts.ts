import { useLocalStorage } from "@vueuse/core";
import type { Product } from "~/types/products";
import Fuse from "fuse.js";

export const useProducts = () => {
  const products = useLocalStorage<Product[]>("products", []);
  const searchQuery = ref("");
  const results = ref<Product[]>([]);
  let fuse: Fuse<Product>;

  const initializeSearch = () => {
    console.log("Initializing search with products:", products.value.length);
    fuse = new Fuse(products.value, {
      keys: ["title", "category", "description"],
      threshold: 0.3,
    });
  };

  const generateProducts = async () => {
    if (products.value.length > 0) {
      console.log("Products already exist:", products.value.length);
      return;
    }

    try {
      console.log("Fetching products from API...");
      const newProducts = await $fetch<Product[]>("/api/products");
      if (!newProducts || newProducts.length === 0) {
        throw new Error("No products were generated");
      }
      console.log("Received products from API:", newProducts.length);
      products.value = newProducts;
      initializeSearch();
    } catch (error) {
      console.error("Error in generateProducts:", error);
      throw error;
    }
  };

  const filteredProducts = computed(() => {
    return searchQuery.value.length > 0 ? results.value : products.value;
  });

  watch(searchQuery, () => {
    if (fuse) {
      results.value = fuse
        .search(searchQuery.value)
        .map((result) => result.item);
    }
  });

  // Initialize search if products exist
  if (products.value.length > 0) {
    console.log("Products exist on init:", products.value.length);
    initializeSearch();
  }

  return {
    products,
    generateProducts,
    searchQuery,
    filteredProducts,
  };
};
