import api from "@/apis/api";

export const registerReq = async (params) => {

  const response = await api.post(
    '/register',
    params,
  )
  return response.data//统一返回response.data，其中response.data为Result对象

}
