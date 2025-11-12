"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ProductService } from "@/services/productService";
import { Product } from "@/interfaces/produtoInterface";
import {
  Box, Button, Tooltip, IconButton, Card, Chip, Typography, TextField,
  Table,
  TableBody, TableCell, TableHead, TableRow,
  useTheme,
  Stack,
  Divider,
  useMediaQuery,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { } from "@mui/material";
import { displayMessage } from "@/components/displayMessage";
import { ModalAdicionarProduto } from "./productsModal";
import { AxiosError } from "axios";

export default function ProdutosPage() {
  const theme = useTheme();
  const productService = ProductService();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Estados do modal
  const [openModal, setOpenModal] = useState(false);
  const [produtoIdSelecionado, setProdutoIdSelecionado] = useState<number | null>(null);

  // Estados de paginação e filtro
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filter, setFilter] = useState("");

  const getProdutos = async () => {
    setLoading(true)
    try {
      const resp = await productService.listProducts();
      setProducts(resp);
    } catch (err: unknown) {
          let errorMsg = "Falha no login. Verifique suas credenciais.";
    
          if (err instanceof AxiosError) {
            errorMsg = err.response?.data?.erro ?? errorMsg;
          }
    
          displayMessage("Erro", errorMsg, "info", false, false, false, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdutos()
  }, [])

  const handleOpenModal = (id?: number | null) => {
    setProdutoIdSelecionado(id ?? null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setProdutoIdSelecionado(null);
  }
  return (
    <Box>
      <Box
        sx={{
          border: "1px solid #bbb",
          borderRadius: 2.5,
          mt: 1,
          boxShadow: 0,
          p: { xs: 1.5, sm: 2, md: 3 },
          backgroundColor: "rgba(128, 125, 125, 0.03)", 
          backdropFilter: "blur(10px)", 
          WebkitBackdropFilter: "blur(1px)",
        }}
      >

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h4" sx={{ color: 'var(--foreground)' }}>Produtos</Typography>
          <Stack>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOpenModal(null)}
            >
              Novo Produto
            </Button>
          </Stack>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box mb={2} display="flex" justifyContent={isMobile ? "center" : "flex-end"}>
          <TextField
            size="small"
            placeholder="Filtrar por Nome ou Peso Máximo"
            label="Filtrar"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
            sx={{
              width: '300px',
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
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
        </Box>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '16%', color: 'var(--foreground)' }} >
                  <strong>Nome</strong>
                </TableCell>
                <TableCell align="center" sx={{ width: '16%', color: 'var(--foreground)' }}>
                  <strong>Preço</strong>
                </TableCell>
                <TableCell align="center" sx={{ width: '16%', color: 'var(--foreground)' }}>
                  <strong>Quantidade</strong>
                </TableCell>
                <TableCell align="center" sx={{ width: '16%', color: 'var(--foreground)' }}>
                  <strong>Status</strong>
                </TableCell>

                <TableCell align="center" sx={{ width: '16%', color: 'var(--foreground)' }}>
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell align="center" sx={{ color: 'var(--foreground)' }}>
                    {product.name}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'var(--foreground)' }}>R$
                    {product.preco}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'var(--foreground)' }}>
                    {product.quantidade}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={product.status ? "Ativo" : "Inativo"}
                      color={product.status ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar" arrow>
                      <IconButton
                        color="default"
                        size="small"
                        onClick={() => handleOpenModal(product.id)}
                      >
                        <EditIcon sx={{ color: 'var(--foreground)' }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Detalhes" arrow>
                      <IconButton
                        color="info"
                        component={Link}
                        href={`/produtos/${product.id}`}
                        size="small"
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    {/* {product.status === true && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleInactivate(product.id)}
                      >
                        Inativar
                      </Button>
                    )} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <ModalAdicionarProduto
        open={openModal}
        onClose={handleCloseModal}
        produtoId={produtoIdSelecionado}
        onSuccess={() => {
          getProdutos();
        }}
      />
    </Box>
  );
}
