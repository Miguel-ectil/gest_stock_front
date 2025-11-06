"use client";
import { Button, TextField, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { useState } from "react";

export default function LoginPage() {
  const authService = AuthService();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const data = { email, password };
      const resp = await authService.login(data);
      console.log("Olha o envio", data);
    } catch (error) {
      console.log("Erro no login", error);
    }
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
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
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
}
