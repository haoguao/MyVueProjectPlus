import api from "@/apis/api";

export const getUserInfoReq = async () => {
  const response = await api.get('/getUserInfo')
  return response
}
