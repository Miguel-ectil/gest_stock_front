export interface Product {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    status: "Ativo" | "Inativo";
    img?: string;
}