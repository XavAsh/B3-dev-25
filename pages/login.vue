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
    </form>
  </div>
</template>

<script setup lang="ts">
const password = ref("");

const handleLogin = () => {};
</script>
