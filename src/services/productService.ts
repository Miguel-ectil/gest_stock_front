import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";

const Url = "/api/products";

export const ProductService = () => {
  const listarProdutos = async (): Promise<AxiosResponse<any>> => {
    return await httpClient.get(Url);
  };
    
  return {
   listarProdutos
  };
};