"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Typography, Divider, TextField, Button, Grid } from "@mui/material";
import { Product } from "@/interfaces/produtoInterface";
import { ProductService } from "@/services/productService";
import { AxiosError } from "axios";
import { displayMessage } from "@/components/displayMessage";

export default function ItensVendas() {
    const productService = ProductService();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState("");

    const getProdutos = async () => {
        setLoading(true);
        try {
            const resp = await productService.listProducts();
            setProducts(resp);
        } catch (err: unknown) {
            let errorMsg = "Falha ao buscar produtos.";

            if (err instanceof AxiosError) {
                errorMsg = err.response?.data?.erro ?? errorMsg;
            }

            displayMessage("Erro", errorMsg, "info", false, false, false, 3000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProdutos();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <Typography>Carregando produtos...</Typography>;
    if (products.length === 0) return <Typography>Nenhum produto disponível.</Typography>;

    return (
        <Box>
            {/* Campo de filtro */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <TextField
                    label="Filtrar produtos"
                    variant="outlined"
                    fullWidth
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    size="small"
                />
                {/* <Button variant="contained" onClick={() => setFilter("")} size="small">
                    Limpar
                </Button> */}
            </Box>

            <Grid container spacing={3}>
                {filteredProducts.map((produto) => (
                    
                    <Card
                        key={produto.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                opacity: produto.quantidade === 0 ? 0.5 : 1,
                                pointerEvents: produto.quantidade === 0 ? 'none' : 'auto',
                                cursor: "pointer"
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={produto.imagem || '/imgs/tenis-air-jordan-4.jpg'}
                                alt={produto.name}
                                sx={{
                                    width: '100%',
                                    height: 200,
                                    objectFit: 'cover',
                                }}
                            />

                            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" gutterBottom>
                                    {produto.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    R$ {produto.preco}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                                    {produto.quantidade > 0 ? `Em estoque: ${produto.quantidade}` : "Indisponível"}
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={produto.quantidade === 0}
                                >
                                    Comprar
                                </Button>
                            </Box>
                        </Card>
                ))}
            </Grid>
        </Box>
    );
}
