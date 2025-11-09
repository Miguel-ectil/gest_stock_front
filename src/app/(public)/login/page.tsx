"use client";
import { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, Paper, Avatar, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading } = useAuthContext(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard"); 
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp =await login({ email, password }); 
  };
  // if (loading || user) return <p className="p-20"></p>;

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #3f51b5 30%, #2196f3 90%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          px: 5,
          py: 2.5,
          borderRadius: 3,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image src="/imgs/logo_gestao_encur.png" alt="Logo" width={100} height={60} />
        </Box>

        <Typography variant="h5" fontWeight={600} mt={1} mb={1}>
         Entre com os seus dados!
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.3,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
              transition: "0.3s",
              ":hover": {
                backgroundColor: "#1976d2",
                transform: "scale(1.02)",
              },
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <Typography variant="body2" color="text.secondary" mt={3}>
            Não tem conta?{" "}
            <Link href="/register">
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 500 }}
            >
              Cadastrar
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
