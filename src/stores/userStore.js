import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userRole = ref("");

  const setUserRole = (role) => {
    userRole.value = role;
  };

  const clearUserRole = () => {
    userRole.value = "";
  };

  return {
    userRole,
    setUserRole,
    clearUserRole
  }
})
