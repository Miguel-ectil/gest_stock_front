"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const service = AuthService();

  useEffect(() => {
    // Verifica token no cookie ao iniciar
    const token = Cookies.get("token");
    if (token) {
      // Se tiver token, podemos buscar dados do usuário se necessário
      setUser({ token }); // aqui poderia buscar do backend se quiser
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (data: any) => {
    setLoading(true);
    try {
      const response = await service.login(data);
      const token = response?.token;

      Cookies.set("token", token, { expires: 1 }); // 1 dia
      setUser({ token });
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao logar:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
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
