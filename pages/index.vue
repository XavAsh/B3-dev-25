<template>
  <Navbar />
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Store</h1>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full p-2 border rounded"
      />
    </div>
    <div v-if="products.length === 0" class="text-center py-8">
      <p class="text-gray-500">
        Aucun produit disponible. Veuillez générer des produits depuis la page
        d'admin
        <br />
        (-dev note remove this super important admin password that can delete
        all the database PASSWORD: 123soleil).
      </p>
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border rounded-lg p-4 flex flex-col h-full max-w-[400px] max-h-[400px] mx-auto"
      >
        <div
          class="relative w-full h-[200px] mb-4 bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="absolute inset-0 w-full h-full object-contain"
            @load="onImageLoad(product.id)"
            @error="onImageError(product.id)"
          />
        </div>
        <h2 class="text-lg font-semibold mb-2 line-clamp-2">
          {{ product.title }}
        </h2>
        <p class="text-gray-600 mb-2 line-clamp-2">{{ product.description }}</p>
        <p class="text-lg font-bold mb-2">${{ product.price }}</p>
        <button
          @click="handleAddToCart(product)"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import type { Product } from "~/types/products";

const { products, searchQuery, filteredProducts } = useProducts();
const { addToCart, cart } = useCart();

console.log("Initial cart state:", cart.value);

const handleAddToCart = (product: Product) => {
  addToCart(product);
};

const onImageLoad = (productId: number) => {};

const onImageError = (productId: number) => {
  console.error(`Error loading image for product ${productId}`);
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
