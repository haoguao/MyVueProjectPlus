import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 7000,
  headers: {}
})


api.interceptors.request.use(
  (config)=> {
    return config;
  },

  (error)=> {
    return Promise.reject(error);
  }

)

api.interceptors.response.use(
  (response)=> {
    return response;//这里的response.data应该是后端返回的Result对象，应该直接在当前拦截器中进行判断并返回Result对象的data
  },

  (error)=> {
    return Promise.reject(error);
  }
)



export default api
