"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ProductService } from "@/services/productService";
import { Product } from "@/interfaces/produtoInterface";

export default function ProdutosPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productService = ProductService();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.listProducts();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProducts();
  }, [user]);

  const handleInactivate = async (id: number) => {
    try {
      await productService.inactivateProduct(id);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "Inativo" } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-400">Produtos</h1>
        <Link
          href="/product/22"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Novo Produto
        </Link>
      </div>

      <table className="w-full table-auto border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="text-gray-500 dark:text-gray-400">
            <th className="px-4 py-2 border-b">Nome</th>
            <th className="px-4 py-2 border-b">Preço</th>
            <th className="px-4 py-2 border-b">Quantidade</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-4 py-2 border-b">{product.nome}</td>
              <td className="px-4 py-2 border-b">R$ {product.preco.toFixed(2)}</td>
              <td className="px-4 py-2 border-b">{product.quantidade}</td>
              <td className="px-4 py-2 border-b">{product.status}</td>
              <td className="px-4 py-2 border-b flex gap-2">
                <Link
                  href={`/produtos/${product.id}/editar`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>
                <Link
                  href={`/produtos/${product.id}`}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Detalhes
                </Link>
                {product.status === "Ativo" && (
                  <button
                    onClick={() => handleInactivate(product.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Inativar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}