export interface Product {
    id: number;
    name: string;
    preco: number;
    quantidade: number;
    status: "Ativo" | "Inativo";
    img?: string;
}