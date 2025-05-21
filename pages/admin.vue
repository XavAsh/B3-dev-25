<template>
  <Navbar />
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Admin Page</h1>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="handleGenerate"
      :disabled="hasProducts || isLoading"
    >
      {{ buttonText }}
    </button>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { generateProducts, products } = useProducts();
const isLoading = ref(false);
const error = ref("");

const hasProducts = computed(() => products.value.length > 0);

const buttonText = computed(() => {
  if (isLoading.value) return "Generating...";
  if (hasProducts.value) return "Products Generated";
  return "Generate Products";
});

const handleGenerate = async () => {
  if (hasProducts.value || isLoading.value) return;

  isLoading.value = true;
  error.value = "";

  try {
    await generateProducts();
  } catch (e) {
    error.value = "Failed to generate products. Please try again.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
</script>
