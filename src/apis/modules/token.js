import api from "../api";

//后端应该能判断前端发送的请求头中是assessToken还是refreshToken
//该方法在refreshToken不空，assessToken为空时，将refreshToken添加到请求头发送给后端来请求新Token的
//其他时候直接由请求拦截器添加assessToken请求头
export const tokenReq = async (params={}, refreshToken) => {

  const response = await api.post(
    '/refreshToken',
    params,
    {
      headers: {
        Authorization: refreshToken
      }
    }
  )
  return response

}
