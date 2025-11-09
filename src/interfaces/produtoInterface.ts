export interface Product {
    id: number;
    name: string;
    preco: string;
    quantidade: number;
    status: boolean
    imagem?: string;
}

export interface ProductResponse {
    data: Product[];
    total: number;
}

export interface ProductInput {
    id_vendedor?: number;
    name: string;
    preco: string;
    quantidade: number | "";
    status: boolean;
    imagem?: string | null;
}

export interface ApiResponse {
    mensagem: string;
}
