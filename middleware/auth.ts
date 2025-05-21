import { useLocalStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to) => {
  const isAuthenticated = useLocalStorage<boolean>("is-authenticated", false);
  const config = useRuntimeConfig();

  if (to.path === "/admin" && !isAuthenticated.value) {
    return navigateTo("/login");
  }

  if (to.path === "/login" && isAuthenticated.value) {
    return navigateTo("/admin");
  }
});
