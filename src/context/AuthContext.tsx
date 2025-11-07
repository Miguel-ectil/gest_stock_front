"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { AxiosResponse } from "axios";

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
    const token = Cookies.get("token");

    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = async (data: any) => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ token: string }> = await service.login(data);

      const token = response.data.token;

      Cookies.set("token", token, { expires: 1 });

      setUser({ token });

      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Erro ao logar:", err);
      alert("Falha no login. Verifique suas credenciais.");
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
