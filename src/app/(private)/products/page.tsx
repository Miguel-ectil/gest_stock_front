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
  CardContent,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Stack
} from "@mui/material";

export default function ProdutosPage() {
  const { user } = useAuth();
  const productService = ProductService();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // Estados de paginação e filtro
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filter, setFilter] = useState("");

  const getProdutos = async () => {
    try {
      const resp = await productService.listProducts();
      setProducts(resp.data);
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdutos()
  }, [])

  if (loading) return <Typography>Carregando produtos...</Typography>;

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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" color="text.secondary">Produtos</Typography>
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="table">Tabela</ToggleButton>
              <ToggleButton value="card">Cards</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" color="success" component={Link} href="/product/22">
              Novo Produto
            </Button>
          </Stack>
        </Box>

        {viewMode === "table" ? (
          <Box >
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
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card variant="outlined" sx={{ transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    <Typography>Preço: R$ {product.preco.toFixed(2)}</Typography>
                    <Typography>Quantidade: {product.quantidade}</Typography>
                    <Chip
                      label={product.status ? "Ativo" : "Inativo"}
                      color={product.status ? "success" : "error"}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                    <Stack direction="row" spacing={1} mt={2}>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Card>
    </Box>
  );
}
