import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";

const Url = "/api";

export const ProductService = () => {
  const listProducts = async (): Promise<AxiosResponse<any>> => {
    const url = `${Url}/products`
    const resposta: AxiosResponse<any> = await httpClient.get(url);
    return resposta;

  };
  
  const getProduct = async (id: number): Promise<AxiosResponse<any>> => {
    const url = `${Url}/products/${id}`
    const resposta: AxiosResponse<any> = await httpClient.get(url);
    return resposta.data;
  };

    const createProduct = async (data: any): Promise<AxiosResponse<any>> => {
      const url = `${Url}/products`
      const resposta: AxiosResponse<any> = await httpClient.post(url, data);
      return resposta;
  };

  const updateProduct = async (id: number, data: any): Promise<AxiosResponse<any>> => {
    const url = `${Url}/products/${id}`
    const resposta: AxiosResponse<any> = await httpClient.put(url, data);
    return resposta;
  };

    const inactivateProduct = async (id: number): Promise<AxiosResponse<any>> => {
    return await httpClient.patch(`${Url}/${id}/inactivate`);
  };
  return {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    inactivateProduct
  };
};