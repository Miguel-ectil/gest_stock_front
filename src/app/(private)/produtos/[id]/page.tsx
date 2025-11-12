"use client";
import { useEffect, useState } from "react";
import { displayMessage } from "@/components/displayMessage";
import { useParams, useRouter } from "next/navigation";
import { ProductService } from "@/services/productService";
import { Box, Button, Typography, CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import { ProdutoType }  from "@/interfaces/produtoInterface"
import { VendasService } from "@/services/vendasService";

export default function Produto() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as unknown as number;
  const productService = ProductService();
  const vendasService = VendasService();

  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState<ProdutoType | null>(null);
  const [quantidadeVenda, setQuantidadeVenda] = useState(1);

  const buscarProduto = async (id: number) => {
    setLoading(true);
    try {
      const resp = await productService.getProduct(id);

      const produtoFormatado: ProdutoType = {
        id_produto: resp.id || 0,
        id_vendedor: resp.id_vendedor || 0,
        imagem: resp.imagem || null,
        name: resp.name,
        preco: resp.preco,
        quantidade: resp.quantidade,
        status: resp.status,
        descricao: resp.descricao || "",
        categoria: resp.categoria || "",
        sku: resp.sku || "",
        desconto: resp.desconto || 0,
      };

      setProduto(produtoFormatado);
    } catch {
      displayMessage("Erro", "Falha ao tentar achar o produto.", "error", false, false, false, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleVenda = async (qtd: number) => {
    if (!produto) return;

    try {
      setLoading(true);
      const data = {
        id_produto: Number(id),
        quantidade: qtd,
      };
      const resp = await vendasService.createVenda(data);

      displayMessage("Sucesso", resp.mensagem || "Venda registrada com sucesso!", "success", false, false, false, 3000);

      setTimeout(() => {
        router.push("/vendas");
      }, 3500);

      setProduto({ ...produto, quantidade: produto.quantidade - qtd });

    } catch (error: unknown) {
      const err = error as { response?: { data?: { erro?: string } } };
      console.error(err);

      displayMessage(
        "Erro",
        err.response?.data?.erro || "Falha ao registrar venda.",
        "error",
        false,
        false
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    buscarProduto(id);
  }, [id]);

  if (loading)
    return (
      <Box className="flex justify-center items-center mt-20">
        <CircularProgress />
      </Box>
    );

  if (!produto)
    return (
      <Typography variant="h6" className="text-center mt-20">
        Produto não encontrado.
      </Typography>
    );

  return (
    <Box className="lg:px-10 xl:px-20 mt-20 relative">
      <Box className="flex flex-col lg:flex-row shadow-lg overflow-hidden border border-[#bbb] rounded-lg">
        <Box className="lg:w-1/2 flex justify-center items-center p-6 bg-gray-100">
          <Image
            src={produto.imagem || "/imgs/tenis-air-jordan-4.jpg"}
            alt={produto.name}
            width={400}
            height={400}
            style={{ width: "400px", height: "auto" }}
            className="object-contain rounded-lg"
          />
        </Box>

        <Box className="lg:w-1/2 p-10 flex flex-col justify-between min-h-[500px]">
          <Box className="space-y-4">
            <Typography variant="h3" fontWeight="bold" className="text-blue-800">
              {produto.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              {produto.desconto > 0 ? (
                <>
                  <Typography variant="body1"  sx={{ textDecoration: 'line-through' }}>
                    R$ {produto.preco.toFixed(2)}
                  </Typography>
                  <Typography variant="h5" className="text-green-600 font-extrabold">
                    R$ {(produto.preco * (1 - produto.desconto / 100)).toFixed(2)}
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" className="text-blue-600 font-extrabold">
                  R$ {produto.preco.toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Informações adicionais */}
            <Box mt={2} className="space-y-1">
              <Typography variant="body1">
                <strong>Quantidade disponível:</strong> {produto.quantidade}
              </Typography>
              <Typography variant="body1" display='flex' alignItems="center" gap={1}>
                <strong>Status:</strong> <Box className={`px-3 w-15 py-1 rounded-full font-medium ${produto.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {produto.status ? "Ativo" : "Inativo"}
                </Box>
              </Typography>
              <Typography variant="body1">
                <strong>Categoria:</strong> {produto.categoria}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                <strong>Código do Produto (SKU):</strong> {produto.sku}
              </Typography>
              {produto.desconto > 0 && (
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  <strong>Desconto:</strong> {produto.desconto.toFixed(2)}%
                </Typography>
              )}
            </Box>

            <TextField
              label="Quantidade a vender"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{ inputProps: { min: 0, max: produto.quantidade } }}
              value={quantidadeVenda}
              onChange={(e) =>
                setQuantidadeVenda(
                  Math.min(Math.max(Number(e.target.value), 1), produto.quantidade)
                )
              }
              className="mt-4"
              sx={{
                borderRadius: 6,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 6,
                  backgroundColor: "transparent", 
                  "& fieldset": {
                    borderColor: "#bbb",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4ade80", 
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555", 
                },
                "& .MuiInputBase-input": {
                  color: "#8a8080ff", 
                },
              }}
            />

            <Typography variant="body1" sx={{mt: 1}}>
              {produto.descricao}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="success"
            disabled={!produto.status || produto.quantidade === 0 || quantidadeVenda < 1}
            sx={{borderRadius: 2}}
            onClick={() => handleVenda(quantidadeVenda)}
          >
            Vender Produto
            {/* {quantidadeVenda} {quantidadeVenda === 1 ? "unidade" : "unidades"} */}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
