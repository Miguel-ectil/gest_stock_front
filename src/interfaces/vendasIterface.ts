export interface Venda {
    data_venda: string;
    id_produto: number;
    id_venda: number;
    id_vendedor: number;
    nome_produto: string;
    nome_vendedor: string;
    preco_unitario: number;
    quantidade: number;
    imagem: null;
}

export interface VendasResponse {
    vendas: Venda[];
}
