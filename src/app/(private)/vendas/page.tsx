"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Typography, TextField, Grid } from "@mui/material";
import { VendasService } from "@/services/vendasService";
import { AxiosError } from "axios";
import { displayMessage } from "@/components/displayMessage";
import { Venda, VendasResponse } from "@/interfaces/vendasIterface"


export default function ItensVendas() {
    const vendasService = VendasService();

    const [loading, setLoading] = useState(true);
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [filter, setFilter] = useState("");

    const getVendas = async () => {
        setLoading(true);
        try {
            const resp: VendasResponse = await vendasService.listarVendas();
            setVendas(Array.isArray(resp.vendas) ? resp.vendas : []);
        } catch (err: unknown) {
            let errorMsg = "Falha ao buscar vendas.";

            if (err instanceof AxiosError) {
                errorMsg = err.response?.data?.erro ?? errorMsg;
            }

            displayMessage("Erro", errorMsg, "info", false, false, false, 3000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVendas();
    }, []);

    const filteredVendas = vendas.filter(v =>
        v.nome_produto?.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <Typography>Carregando vendas...</Typography>;
    if (vendas.length === 0) return <Typography>Nenhuma venda registrada.</Typography>;

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <TextField
                    label="Filtrar produtos vendidos"
                    variant="outlined"
                    fullWidth
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    size="small"
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
            </Box>

            <Grid container spacing={3}>
                {filteredVendas.map((venda) => (
                    <Box
                        key={venda.id_venda}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                            },
                            border: "1px solid #bbb"
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={venda.imagem || '/imgs/tenis-air-jordan-4.jpg'}
                            alt={venda.nome_produto}
                            sx={{
                                width: '100%',
                                height: 220,
                                objectFit: 'cover',
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                        />

                        <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {venda.nome_produto}
                            </Typography>
                            <Typography variant="body2" >
                                Vendido por: <strong>{venda.nome_vendedor}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                R$ {venda.preco_unitario.toFixed(2)}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="caption">
                                    Quantidade: {venda.quantidade}
                                </Typography>
                                <Typography variant="caption">
                                    {new Date(venda.data_venda).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                ))}
            </Grid>
        </Box>
    );
}
