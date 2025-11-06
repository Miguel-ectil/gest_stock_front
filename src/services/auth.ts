import { Axios, AxiosResponse } from "axios"
import { httpClient } from "../config/axios"

const Url = "/api"

export const AuthService = () => {
  const login = async (data: any,): Promise<AxiosResponse<any>> => {
    const url = `${Url}/user/login`
    const resposta: AxiosResponse<any> = await httpClient.post(url, data);
    return resposta;
  };

  return {
    login,
  };
}