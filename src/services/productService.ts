// src/services/productService.ts
import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";
import { Product, ProductResponse } from "@/interfaces/produtoInterface";

const Url = "/api";

export const ProductService = () => {
  const listProducts = async (): Promise<Product[]> => {
    const url = `${Url}/products`;
    const resp = await httpClient.get<Product[]>(url);
    return resp.data;
  };

  const getProduct = async (id: number): Promise<Product> => {
    const url = `${Url}/products/${id}`;
    const resposta: AxiosResponse<Product> = await httpClient.get(url);
    return resposta.data;
  };

  const createProduct = async (data: Product): Promise<AxiosResponse<Product>> => {
    const url = `${Url}/products`;
    return await httpClient.post<Product>(url, data);
  };

  const updateProduct = async (id: number, data: Product): Promise<AxiosResponse<Product>> => {
    const url = `${Url}/products/${id}`;
    return await httpClient.put<Product>(url, data);
  };

  const inactivateProduct = async (id: number): Promise<AxiosResponse<void>> => {
    return await httpClient.patch<void>(`${Url}/products/${id}/inactivate`);
  };

  return {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    inactivateProduct,
  };
};
