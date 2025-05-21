<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="max-w-md">
      <div class="mb-4">
        <label class="block mb-2">Password</label>
        <input
          type="password"
          v-model="password"
          class="w-full p-2 border rounded"
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";

definePageMeta({
  middleware: ["auth"],
});

const password = ref("");
const error = ref("");
const isAuthenticated = useLocalStorage<boolean>("is-authenticated", false);
const config = useRuntimeConfig();
const router = useRouter();

const handleLogin = () => {
  if (password.value === config.adminPassword) {
    isAuthenticated.value = true;
    router.push("/admin");
  } else {
    error.value = "Invalid password";
  }
};
</script>
