"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { AxiosResponse } from "axios";
import { displayMessage } from "@/utils/displayMessage";

interface User {
  id: number;
  nome: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const service = AuthService();

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = async (data: any) => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ token: string; usuario: { id: number; nome: string } }> = await service.login(data);

      const { token, usuario } = response.data;

      Cookies.set("token", token, { expires: 1 });
      const loggedUser: User = { ...usuario, token };
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      displayMessage("Sucesso", "Login efetuado com sucesso.", "success", false, false, false, 3000);
      router.push("/dashboard");
    } catch (err) {
      displayMessage("Erro", "Falha no login. Verifique suas credenciais.", "error", false, false, false, 3000);

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
