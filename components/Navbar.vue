<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800">
          Store
        </NuxtLink>

        <div class="flex space-x-4 items-center">
          <NuxtLink
            to="/"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            active-class="text-blue-500 font-semibold"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/admin"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            active-class="text-blue-500 font-semibold"
          >
            Admin
          </NuxtLink>
          <NuxtLink
            to="/cart"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md relative"
            active-class="text-blue-500 font-semibold"
          >
            Cart
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";

const { cart } = useCart();

const cartItemCount = computed(() => {
  const count = cart.value.reduce((total, item) => {
    const quantity = "quantity" in item ? item.quantity : 1;
    return total + quantity;
  }, 0);

  return count;
});
</script>
