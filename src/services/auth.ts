import { Axios, AxiosResponse } from "axios"
import { httpClient } from "../config/axios"

const Url = "/api"
export const AuthService = () => {
    const login = async (data: string,): Promise<AxiosResponse<any>> => {
        const url = `${Url}/login`
        const resposta: AxiosResponse<any> = await httpClient.post(data);
        return resposta.data;
    };

    return {
        login,
    }
}