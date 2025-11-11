export interface Product {
    id: number;
    id_vendedor: number;
    name: string;
    preco: number;
    quantidade: number;
    status: boolean;
    imagem?: string;
    descricao?: string;
    desconto?: number;
    sku?: string;
    categoria?: string;
}


export interface ProductResponse {
    data: Product[];
    total: number;
}

export interface ProductInput {
    id_vendedor?: number;
    name: string;
    preco: number; 
    quantidade: number | "";
    status: boolean;
    imagem?: string | null;
    descricao?: string;
    categoria?: string;
    sku?: string;
    desconto?: number | "";
}


export interface ApiResponse {
    mensagem: string;
}


export interface ProdutoType {
    id_produto: number;
    id_vendedor: number;
    imagem: string | null;
    name: string;
    preco: number;
    quantidade: number;
    status: boolean;
    descricao: string;
    categoria: string;
    sku: string;
    desconto: number;
}

