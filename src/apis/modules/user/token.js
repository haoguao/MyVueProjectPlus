import api from "@/apis/api";

//请求头中携带有包含refreshtoken的cookie(在全局配置的)
//cookie的name为refreshtoken
export const tokenReq = async () => {
  const response = await api.get('/refreshToken')
  return response
}
