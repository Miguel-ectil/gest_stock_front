import { AxiosResponse } from "axios"
import { httpClient } from "../config/axios"

const Url = "/user"

export const AuthService = () => {
  const login = async (data: any,): Promise<AxiosResponse<any>> => {
    const url = `${Url}/login`
    const resposta: AxiosResponse<any> = await httpClient.post(url, data);
    return resposta;
  };

  return {
    login,
  };
}