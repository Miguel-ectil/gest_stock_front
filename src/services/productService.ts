import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";

const Url = "/api/products";

export const ProductService = () => {
  const listProducts = async (): Promise<AxiosResponse<any>> => {
    return await httpClient.get(Url);
  };
  
  const getProduct = async (id: number): Promise<AxiosResponse<any>> => {
    return await httpClient.get(`${Url}/${id}`);
  };

    const createProduct = async (data: any): Promise<AxiosResponse<any>> => {
    return await httpClient.post(Url, data);
  };

    const updateProduct = async (id: number, data: any): Promise<AxiosResponse<any>> => {
    return await httpClient.put(`${Url}/${id}`, data);
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