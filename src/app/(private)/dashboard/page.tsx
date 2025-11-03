"use client";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { DashboardCard } from "@/interfaces/dashInterface";


export default function DashboardPage() {
  const { user, logout } = useAuth();

  const dashboardCards: DashboardCard[] = [
    { id: "1", title: "Lucro Anual", value: "R$ 250.000" },
    { id: "2", title: "Lucro Mensal", value: "R$ 20.000" },
    { id: "3", title: "Mais Vendido", value: "Produto X" },
    { id: "4", title: "Perdas Anual", value: "R$ 5.000" },
  ];

  return (
    <main>
      {/* Cabeçalho */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-200 dark:text-gray-600">
          Bem-vindo, {user?.name ?? "Usuário"}!
        </h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {user?.token && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Seu token: <span className="font-mono text-gray-200 dark:text-gray-600">{user.token}</span>
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardCards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {card.title}
            </h2>
            {card.value && (
              <p className="mt-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {card.value}
              </p>
            )}
            {card.description && (
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
