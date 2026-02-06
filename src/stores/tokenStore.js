import { defineStore } from "pinia";
import { ref } from "vue";


export const useTokenStore = defineStore('token', () => {
  const accessToken = ref('')
  const refreshToken = ref('')

  //判断是否为空
  const isEmptyAccessToken = () => {
    if (accessToken.value === '') {
      return true;
    } else {
      return false;
    }
  }
    const isEmptyRefreshToken = () => {
    if (refreshToken.value === '') {
      return true;
    } else {
      return false;
    }
  }


  //拼接产生可用的token参数
  const concatAccessToken = (accessToken) => {
    return 'Bearer ' + accessToken
  }
  const concatRefreshToken = (refreshToken) => {
    return 'Bearer ' + refreshToken
  }

  //清除token
  const clearAccessToken = () => {
    accessToken.value = ''
  }

  const clearRefreshToken = () => {
    refreshToken.value = ''
  }



  return {
    accessToken,
    refreshToken,
    isEmptyAccessToken,
    isEmptyRefreshToken,
    concatAccessToken,
    concatRefreshToken,
    clearAccessToken,
    clearRefreshToken
  }
})
