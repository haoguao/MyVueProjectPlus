import router from "@/router";
import { useTokenStore } from "@/stores/tokenStore";
import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 7000,
  headers: {}
})


api.interceptors.request.use(
  (config)=> {
    const tokenStore = useTokenStore()
    if(config.url !== '/login' && config.url !== '/register'){
      if (tokenStore.isEmptyToken) {
        return Promise.reject(new Error("请求需要token"))
      } else {
        //获取拼接后的token参数
        const tokenParam = tokenStore.concatTokenParam(tokenStore.token)
        //请求头添加token参数
        config.headers.Authorization = tokenParam
      }
    }
    //如果是登录或者注册直接放行
    return config;
  },

  (error)=> {
    return Promise.reject(error);
  }

)

api.interceptors.response.use(
  (response)=> {//这里的response.data为后端返回的Result对象
    return response;
  },

  (error)=> {
    //这里的error.response需要由后端返回，否则 error.response 为undefined
    const status = error.response.status
    if(status === 403) {
      router.push({name: 'signInUp'})
    } else if (status === 404) {
      router.push({name: '404'})
    }
    return Promise.reject(error);
  }
)



export default api
