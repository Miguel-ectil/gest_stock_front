import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";
import { Product, ProductInput, ApiResponse } from "@/interfaces/produtoInterface";

const Url = "/api";

export const DashboardService = () => {
  const listDashboard = async (): Promise<any> => {
    const url = `${Url}/dashboard`;
    const resp = await httpClient.get(url);
    return resp.data;
  };

  return {
    listDashboard,
  };
};
