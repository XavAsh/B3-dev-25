<template>
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
      <p class="text-gray-500">Aucun produit trouvé</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border rounded p-4"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-48 object-contain mb-4"
        />
        <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-gray-600 mb-2">{{ product.description }}</p>
        <p class="text-lg font-bold mb-2">${{ product.price }}</p>
        <button
          @click="addToCart(product)"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";

const { products, searchQuery, filteredProducts } = useProducts();
const { addToCart } = useCart();

// Log products for debugging
console.log("Index page products:", products.value);
</script>
