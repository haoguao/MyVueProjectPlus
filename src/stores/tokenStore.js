import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore('token', () => {
  // 初始化时直接从localStorage读取
  const storedToken = localStorage.getItem('accessToken');
  const accessToken = ref(storedToken || '')

  //设置token
  const setAccessToken = (token) => {
    accessToken.value = token;
    localStorage.setItem('accessToken', token);
  };

  //判断是否为空
  const isEmptyAccessToken = () => {
    return accessToken.value === '';
  }

  //拼接产生可用的token参数
  const concatAccessToken = () => {
    return 'Bearer ' + accessToken.value
  }

  //清除token
  const clearAccessToken = () => {
    accessToken.value = '';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogin');
  }

  return {
    accessToken,
    isEmptyAccessToken,
    concatAccessToken,
    clearAccessToken,
    setAccessToken
  }
})
