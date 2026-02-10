import { defineStore } from "pinia";
import { ref } from "vue";


export const useTokenStore = defineStore('token', () => {
  const accessToken = ref('')

  //判断是否为空
  const isEmptyAccessToken = () => {
    if (accessToken.value === '') {
      return true;
    } else {
      return false;
    }
  }

  //拼接产生可用的token参数
  const concatAccessToken = (accessToken) => {
    return 'Bearer ' + accessToken
  }

  //清除token
  const clearAccessToken = () => {
    accessToken.value = ''
  }


  return {
    accessToken,
    isEmptyAccessToken,
    concatAccessToken,
    clearAccessToken
  }
})
