export interface Usuario {
  id: number;
  nome: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  mensagem: string;
  token: string;
  usuario: Usuario;
}


export interface CadastroRequest {
  name: string;
  cnpj: string;
  email: string;
  celular: string;
  password: string;
  status: boolean;
}

export interface CadastroResponse {
  id: string;
  name: string;
  email: string;
  status: boolean;
}
