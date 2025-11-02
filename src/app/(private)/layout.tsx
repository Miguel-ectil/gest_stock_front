"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ui/theme-toggle";
import Header from "@/layout/Header";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

//   if (loading) {
//     return <div className="p-8 text-center">Verificando autenticação...</div>;
//   }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
