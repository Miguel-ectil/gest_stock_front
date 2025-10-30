"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Bem-vindo!</h1>
      <p>Seu token: {user?.token}</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sair
      </button>
    </main>
  );
}
