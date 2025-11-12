import { AxiosResponse } from "axios";
import { httpClient } from "../config/axios";
import { DashboardData } from "@/interfaces/dashInterface";

const Url = "/api";

export const DashboardService = () => {
  const listDashboard = async (): Promise<DashboardData> => {
    const url = `${Url}/dashboard`;
    const resp: AxiosResponse<DashboardData> = await httpClient.get(url);
    return resp.data;
  };

  return {
    listDashboard,
  };
};
