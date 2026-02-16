import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userRole = ref("")



  return {
    userRole
  }
})
