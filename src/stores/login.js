import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLoginStore = defineStore('login',()=>{
  const userName = ref('');
  const password = ref('');





  return {
    userName,
    password
  }

})
