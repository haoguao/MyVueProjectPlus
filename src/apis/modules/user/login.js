import api from "@/apis/api";

//返回的response.data中应当有accessToken，cookie中有refreshToken，还有用户role
export const loginReq = async (params) => {
  const response = await api.post(
    '/login',
    params,
  )
  return response.data//统一返回response.data，其中response.data为Result对象
}
