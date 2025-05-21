import { useLocalStorage } from "@vueuse/core";
import type { Product, Rating } from "~/types/products";
import Fuse from "fuse.js";

export const useProducts = () => {
  const products = useLocalStorage<Product[]>("products", []);
  const searchQuery = ref("");
  const results = ref<Product[]>([]);
  let fuse: Fuse<Product>;

  const initializeSearch = () => {
    fuse = new Fuse(products.value, {
      keys: ["title", "category", "description"],
      threshold: 0.3,
    });
  };

  const generateProducts = async () => {
    // Clear existing products and cart
    products.value = [];
    localStorage.removeItem("cart");

    try {
      const newProducts = await $fetch("/api/products");
      products.value = newProducts;
      initializeSearch();
    } catch (error) {
      console.error("Error generating products:", error);
    }
  };

  const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;
    const query = searchQuery.value.toLowerCase();
    return products.value.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  });

  watch(searchQuery, () => {
    if (fuse) {
      results.value = fuse
        .search(searchQuery.value)
        .map((result) => result.item);
    }
  });

  if (products.value.length > 0) {
    initializeSearch();
  }

  return {
    products,
    generateProducts,
    searchQuery,
    filteredProducts,
  };
};
