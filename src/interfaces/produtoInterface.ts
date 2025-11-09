export interface Product {
    id: number;
    name: string;
    preco: string;
    quantidade: number;
    status: boolean
    img?: string;
}

export interface ProductResponse {
    data: Product[];
    total: number;
}