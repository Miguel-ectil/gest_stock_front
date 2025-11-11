
import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";
import { Product, ProductInput, ApiResponse } from "@/interfaces/produtoInterface";
import { VendasResponse } from "@/interfaces/vendasIterface";

const Url = "/api";

export const VendasService = () => {
    const listarVendas = async (): Promise<VendasResponse> => {
        const url = `${Url}/sales/my-sales`;
        const resp: AxiosResponse<VendasResponse> = await httpClient.get(url);
        return resp.data;
    };

    const createVenda = async (data: { id_produto: number; quantidade: number }): Promise<ApiResponse> => {
        const url = `${Url}/sales`;
        const resp = await httpClient.post(url, data);
        return resp.data;
    };

  return {
    listarVendas,
    createVenda,
  };
};
