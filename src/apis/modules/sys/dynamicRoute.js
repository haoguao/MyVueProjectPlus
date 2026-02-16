import api from "@/apis/api";


export const dynameicRouteReq = async () => {
  const response = await api.get(
    '/dynamicRoute'
  )

  return response.data//统一返回response.data，其中response.data为Result对象
}
