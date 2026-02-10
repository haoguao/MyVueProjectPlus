import api from "../api";

//请求头中携带有包含refreshtoken的cookie(在全局配置的)
//cookie的name为refreshtoken
export const tokenReq = async (params = {}) => {
  const response = await api.post('/refreshToken', params)
  return response
}
