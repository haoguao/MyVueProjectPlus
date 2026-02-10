import { useTokenStore } from "@/stores/tokenStore";
import router from "@/router";
import axios from "axios";
import { tokenAPI } from ".";
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 7000,
  withCredentials: true, // 关键：允许携带Cookie（跨域时必须）
  headers: {}
})

//定义可放行的白名单(api接口)
const whiteList = [
  '/login',
  '/register'
]
//定义access为空的请求等待队列
const waitQueue = []
//定义当前是否在发起请求
let isRequestNow = false

api.interceptors.request.use(
  (config) => {
    const tokenStore = useTokenStore()
    if (whiteList.includes(config.url)) {//若为可放行API
      return config
    }
    if (!tokenStore.isEmptyAccessToken) {//accesstoken不空直接放行
      config.headers.Authorization = tokenStore.concatAccessToken(tokenStore.accessToken)
    }
    //对于仅access为空，或两个token均为空的由后端返回401状态码，在相应拦截器处理

    return config
  },

  (error) => {
    return Promise.reject(error);
  }

)

api.interceptors.response.use(
  (response) => {//这里的response.data为后端返回的Result对象
    return response;
  },

  async (error) => {
    //这里的error.response需要由后端返回，否则 error.response 为undefined
    if(!error.response) return Promise.reject(new Error("网络异常"))
    const status = error.response.status
    const tokenStore = useTokenStore()
    const originalRequest = error.config

    //console.log(originalRequest);

    if (status === 401) {
      if(originalRequest._reject) {//拦截重试失败的请求
        return Promise.reject(new Error("Token刷新失败"))
      }
      originalRequest._reject = true//标记该请求已重试

      if (isRequestNow) {//如果正在请求刷新token
        return new Promise((resolve) => {
          waitQueue.push((newToken) => {//将当前请求函数添加到等待队列，只会请求一遍便清空
            originalRequest.headers.Authorization = tokenStore.concatAccessToken(newToken)
            resolve(api(originalRequest))//api(originalRequest)会重新触发拦截链
          })
        })
      } else {//尚未刷新，accessToken空，refreshToken不空 和 两个token均空都可走该条件
        try {
          isRequestNow = true//标记正在请求
          //在全局配置非同源可携带cookie之后，请求自动携带refreshToken的cookie
          const res = await tokenAPI.tokenReq()
          const {newAccessToken} = res.data
          tokenStore.accessToken = newAccessToken

          //重试并清空队列中请求
          waitQueue.forEach(req => req(newAccessToken))//req为请求重试函数
          waitQueue.length = 0

          //使用新的accessToken重试当前请求
          originalRequest.headers.Authorization = tokenStore.concatAccessToken(newAccessToken)
          return api(originalRequest)

        } catch (error) {//包含refresh的cookie为空,请求时返回Promise.reject，直接到该catch中处理
          tokenStore.clearAccessToken()
          localStorage.setItem("isLogin", false)
          router.push({name: 'signInUp'})
          return Promise.reject(error)
        } finally {
          isRequestNow = false//重置标记
        }
      }
    }
  //   if (status === 404) {//处理其他错误
  //     ...
  //   }
    return Promise.reject(error)
  }
)



export default api




