<template>
  <Navbar />
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>

    <div v-if="cart.length === 0" class="text-center py-8">
      <p class="text-gray-500">Ajouter des produits pour les voir ici</p>
    </div>

    <div v-else>
      <div class="grid gap-4">
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex items-center border rounded-lg p-4"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-24 h-24 object-contain bg-gray-100 rounded"
          />
          <div class="ml-4 flex-grow">
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-600">${{ item.price }}</p>
            <div class="flex items-center mt-2">
              <button
                @click="updateQuantity(item.id, (item.quantity || 1) - 1)"
                class="px-2 py-1 border rounded"
                :disabled="(item.quantity || 1) <= 1"
              >
                -
              </button>
              <span class="mx-4">{{ item.quantity || 1 }}</span>
              <button
                @click="updateQuantity(item.id, (item.quantity || 1) + 1)"
                class="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
          <button
            @click="removeFromCart(item.id)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="mt-8 border-t pt-4">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold"
            >Total Items: {{ totalItems }}</span
          >
          <span class="text-lg font-semibold"
            >Total: ${{ totalPrice.toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";

const { cart, removeFromCart, updateQuantity } = useCart();

// Calculate total items
const totalItems = computed(() => {
  return cart.value.reduce((total, item) => {
    const quantity = "quantity" in item ? item.quantity : 1;
    return total + quantity;
  }, 0);
});

// Calculate total price
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    const quantity = "quantity" in item ? item.quantity : 1;
    return total + item.price * quantity;
  }, 0);
});
</script>
