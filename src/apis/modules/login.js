import api from "../api";

export const loginReq = async (params) => {
  const response = await api.post(
    '/login',
    params,
  )
  return response//统一返回response，其中response.data为Result对象
}
