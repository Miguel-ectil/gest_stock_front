"use client";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { DashboardCard } from "@/interfaces/dashInterface";
import { DashboardService } from "@/services/dashService";
import { Divider } from "@mui/material";
import { useState, useEffect } from "react";

interface DashboardData {
  dashboard: {
    categorias_mais_vendidas: Array<{
      categoria: string;
      total_vendido: number;
    }>;
    crescimento_mensal: number;
    estoque_baixo: number;
    lucro_anual: number;
    lucro_mensal: number;
    perdas_anuais: number;
    produto_mais_vendido: string;
    status_negocio: string;
    ticket_medio: number;
    total_produtos_ativos: number;
    total_vendas_ano: number;
    total_vendas_mes: number;
    total_vendas_produto_mais_vendido: number;
    valor_total_estoque: number;
    vendas_por_mes: Array<{
      ano: number;
      mes: number;
      mes_nome: string;
      total: number;
    }>;
    vendas_ultimos_7_dias: Array<{
      data: string;
      total: number;
    }>;
  };
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const dashboardService = DashboardService();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const dataDash = async () => {
    try {
      const data = await dashboardService.listDashboard();
      console.log(data);
      setDashboardData(data);
    } catch (error) {
      console.log("Erro ao buscar dados do dashboard", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    dataDash();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 dark:text-gray-400">Carregando dados...</p>
        </div>
      </main>
    );
  }

  if (!dashboardData) {
    return (
      <main className="min-h-screen p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600 dark:text-red-400">Erro ao carregar dados do dashboard</p>
        </div>
      </main>
    );
  }

  const { dashboard } = dashboardData;

  return (
    <main className="min-h-screen p-1"> {/*bg-gray-50 dark:bg-gray-900*/}
      {/* Status do Negócio */}
      {/* <div className="mb-2">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          dashboard.status_negocio === "Estável" 
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        }`}>
          Status: {dashboard.status_negocio}
        </div>
      </div>
      <Divider /> */}
      {/* Grid de Métricas Principais */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Lucro Mensal
          </h2>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ {dashboard.lucro_mensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Mês atual</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Total Vendas (Mês)
          </h2>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {dashboard.total_vendas_mes}
          </p>
          <p className="text-sm text-gray-500 mt-1">Vendas este mês</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Ticket Médio
          </h2>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            R$ {dashboard.ticket_medio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Valor médio por venda</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Produtos Ativos
          </h2>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {dashboard.total_produtos_ativos}
          </p>
          <p className="text-sm text-gray-500 mt-1">Em estoque</p>
        </div>
      </section>

      {/* Segunda Linha de Métricas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Estoque Baixo
          </h2>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {dashboard.estoque_baixo}
          </p>
          <p className="text-sm text-gray-500 mt-1">Produtos com estoque crítico</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Valor Total Estoque
          </h2>
          <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            R$ {dashboard.valor_total_estoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Investimento em estoque</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Crescimento Mensal
          </h2>
          <p className={`text-2xl font-bold ${
            dashboard.crescimento_mensal >= 0 
              ? "text-green-600 dark:text-green-400" 
              : "text-red-600 dark:text-red-400"
          }`}>
            {dashboard.crescimento_mensal >= 0 ? "+" : ""}{dashboard.crescimento_mensal}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Comparado ao mês anterior</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Produto Mais Vendido
          </h2>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate">
            {dashboard.produto_mais_vendido}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {dashboard.total_vendas_produto_mais_vendido} vendas
          </p>
        </div>
      </section>

      {/* Métricas Anuais */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Lucro Anual
          </h2>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ {dashboard.lucro_anual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total do ano</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Perdas Anuais
          </h2>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ {dashboard.perdas_anuais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Prejuízos do ano</p>
        </div>
      </section>

      {/* Categorias Mais Vendidas */}
      <section className="mb-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Categorias Mais Vendidas
          </h2>
          <div className="space-y-3">
            {dashboard.categorias_mais_vendidas.map((categoria, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <span className="text-gray-700 dark:text-gray-300">{categoria.categoria}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  R$ {categoria.total_vendido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendas Últimos 7 Dias */}
      <section className="mb-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Vendas Últimos 7 Dias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
            {dashboard.vendas_ultimos_7_dias.map((venda, index) => (
              <div key={index} className="text-center">
                <div className={`p-3 rounded-lg ${
                  venda.total > 0 
                    ? "bg-green-100 dark:bg-green-900" 
                    : "bg-gray-100 dark:bg-gray-700"
                }`}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {venda.data}
                  </p>
                  <p className={`text-lg font-bold ${
                    venda.total > 0 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    R$ {venda.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}