import { AxiosResponse } from "axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Tipagem genérica do serviço de autenticação
export interface AuthServiceType {
  login: (data: LoginRequest) => Promise<LoginResponse>;
}
