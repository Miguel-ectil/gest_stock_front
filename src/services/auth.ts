import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";
import { LoginRequest, LoginResponse, CadastroResponse, CadastroRequest } from "../interfaces/interfaceAuth";

const Url = "/user";

export const AuthService = () => {
  const login = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    const url = `${Url}/login`;
    const resposta: AxiosResponse<LoginResponse> = await httpClient.post(url, data);
    return resposta;
  };
  
  const cadastrar = async (data: CadastroRequest): Promise<AxiosResponse<CadastroResponse>> => {
    const url = `${Url}`;
    const resposta: AxiosResponse<CadastroResponse> = await httpClient.post(url, data);
    return resposta;
  };

  return {
    login,
    cadastrar,
  };
};
