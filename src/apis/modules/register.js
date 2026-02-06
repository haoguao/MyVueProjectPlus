import api from "../api";

export const registerReq = async (params) => {

  const response = await api.post(
    '/register',
    params,
  )
  return response

}
