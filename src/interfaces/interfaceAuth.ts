export interface Usuario {
  id: number;
  nome: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  mensagem: string;
  token: string;
  usuario: Usuario;
}
