import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost',
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
    return response.data;
  },

  (error)=> {
    return Promise.reject(error);
  }
)
