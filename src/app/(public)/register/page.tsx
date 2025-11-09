"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Link,
} from "@mui/material";
import { AuthService } from "@/services/auth";

export default function CadastroPage() {
  const router = useRouter();
  const productService = AuthService();
  

  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    celular: "",
    senha: "",
    status: "Inativo",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCadastro() {
    setLoading(true);
    try {
      console.log("Dados enviados:", formData);
      // await AuthService.register(formData);
      router.push("/"); // redireciona após cadastro
    } catch (err) {
      console.error("Erro no cadastro:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #3f51b5 30%, #2196f3 90%)",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 2,
        }}
      >

        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Cadastro Usuário
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="CNPJ"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="00.000.000/0000-00"
            fullWidth
          />
          <TextField
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <Box display="flex" gap={2}>
            <TextField
              label="Celular"
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              fullWidth
              size="small"
            />
            <TextField
              label="Senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>

          <Button
            variant="contained"
            color="success"
            onClick={handleCadastro}
            disabled={loading}
            fullWidth
            sx={{ mt: 1 }}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Typography variant="body2" color="text.secondary" mt={3} textAlign="center">
            Já possui uma conta?{" "}
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer", fontWeight: 500 }}
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
