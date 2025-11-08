"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ProductService } from "@/services/productService";
import { Product } from "@/interfaces/produtoInterface";

import {
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Stack,
  Divider,
  useMediaQuery,
  TextField
} from "@mui/material";
import { displayMessage } from "@/utils/displayMessage";

export default function ProdutosPage() {
  const theme = useTheme();
  const productService = ProductService();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // Estados de paginação e filtro
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filter, setFilter] = useState("");

  const getProdutos = async () => {
    setLoading(true)
    try {
      const resp = await productService.listProducts();
      setProducts(resp.data);
    } catch (error) {
      displayMessage("Erro", "Ocorreu algum erro ao tentar trazer os produtos.", "error", false, false, false, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdutos()
  }, [])

  return (
    <Box>
      <Card
        sx={{
          border: '2px solid #e0e0e0',
          borderRadius: 2.5,
          mt: 1,
          backgroundColor: "#f4f6f8",
          boxShadow: 0,
          p: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h4" color="text.secondary">Produtos</Typography>
          <Stack>
            <Button variant="contained" color="success" component={Link} href="/product/22">
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
            sx={{ width: '300px' }}
          />
        </Box>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '16%' }}>Nome</TableCell>
                <TableCell align="center" sx={{ width: '16%' }}>Preço</TableCell>
                <TableCell align="center" sx={{ width: '16%' }}>Quantidade</TableCell>
                <TableCell align="center" sx={{ width: '16%' }}>Status</TableCell>
                <TableCell align="center" sx={{ width: '16%' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">R$ {product.preco.toFixed(2)}</TableCell>
                  <TableCell align="center">{product.quantidade}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={product.status ? "Ativo" : "Inativo"}
                      color={product.status ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        component={Link}
                        href={`/produtos/${product.id}/editar`}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        component={Link}
                        href={`/produtos/${product.id}`}
                      >
                        Detalhes
                      </Button>
                      {product.status === "Ativo" && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                        // onClick={() => handleInactivate(product.id)}
                        >
                          Inativar
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
