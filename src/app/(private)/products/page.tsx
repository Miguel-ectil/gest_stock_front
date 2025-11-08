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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const productService = ProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Dados simulados
        const simulatedData: Product[] = [
          { id: 1, nome: "Produto A", preco: 100, quantidade: 10, status: "Ativo" },
          { id: 2, nome: "Produto B", preco: 50, quantidade: 5, status: "Inativo" },
          { id: 3, nome: "Produto C", preco: 75, quantidade: 7, status: "Ativo" },
        ];

        // Se quiser usar a API:
        // const res = await productService.listProducts();
        // setProducts(res.data);

        setProducts(simulatedData);
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
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "Inativo" } : p))
      );
      // await productService.inactivateProduct(id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Typography>Carregando produtos...</Typography>;

  return (
    <Box >
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.nome}</TableCell>
                  <TableCell>R$ {product.preco.toFixed(2)}</TableCell>
                  <TableCell>{product.quantidade}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.status}
                      color={product.status === "Ativo" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
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
                          onClick={() => handleInactivate(product.id)}
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
        </TableContainer>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card variant="outlined" sx={{ transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{product.nome}</Typography>
                  <Typography>Preço: R$ {product.preco.toFixed(2)}</Typography>
                  <Typography>Quantidade: {product.quantidade}</Typography>
                  <Chip
                    label={product.status}
                    color={product.status === "Ativo" ? "success" : "error"}
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
                        onClick={() => handleInactivate(product.id)}
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
    </Box>
  );
}
