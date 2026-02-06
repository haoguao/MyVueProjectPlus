import { defineStore } from "pinia";
import { ref } from "vue";


export const useTokenStore = defineStore('token', () => {
  const token = ref('')


  const isEmptyToken = () => {
    if (token.value === '') {
      return true;
    } else {
      return false;
    }
  }

  //拼接产生可用的token参数
  const concatTokenParam = (token) => {
    return 'Bearer ' + token
  }

  const clearToken = () => {
    token.value = ''
  }


  return {
    token,
    isEmptyToken,
    concatTokenParam,
    clearToken
  }
})
