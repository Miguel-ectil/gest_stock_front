export interface DashboardCard {
  id: string;
  title: string;
  value?: string | number; 
  description?: string;
}

export interface DashboardData {
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}