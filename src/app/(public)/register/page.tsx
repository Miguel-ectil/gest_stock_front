"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, Stack, TextField, Typography, Modal } from "@mui/material";
import Link from "next/link";
import { AuthService } from "@/services/auth";
import { displayMessage } from "@/components/displayMessage";


export default function CadastroPage() {
  const router = useRouter();
  const authService = AuthService();

  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    celular: "",
    senha: "",
  });

  // controle do modal
  const [openModal, setOpenModal] = useState(false);
  const [userTempId, setUserTempId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const postUser = async () => {
    setLoading(true);
    try {
      const payload = {
        name: formData.nome,
        cnpj: formData.cnpj,
        email: formData.email,
        celular: formData.celular,
        password: formData.senha,
        status: false,
      };
      const resp = await authService.cadastrar(payload);

      displayMessage("Sucesso", "Usuário cadastrado com sucesso!", "success", false, false, false, 3000);
      setOpenModal(true);
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      displayMessage("Erro", "Falha ao cadastrar o usuário.", "error", false, false, false, 3000);
    } finally {
      setLoading(false);
    }
  }

  const confirmUser = async () => {
    try {
      // const resp = await authService.verificarCodigo({ userId: userTempId, codigo });
      displayMessage("Sucesso", "Login confirmado!", "success", false, false, false, 3000);
      setOpenModal(false);
      router.push("/login");
    } catch (err) {
      displayMessage("Erro", "Código inválido ou expirado.", "error", false, false, false, 3000);
    }
  }

  const [codigo, setCodigo] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChangeCode = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<any>) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

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
          backgroundColor: "rgba(255, 255, 255, 0.9)",

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
            onClick={postUser}
            disabled={loading}
            fullWidth
            sx={{ mt: 1 }}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={3}
            textAlign="center"
          >
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            p: 4,
            borderRadius: 2,
            width: 400,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" textAlign="center" mb={2}>
            Confirme seu código
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            {codigo.map((value, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputsRef.current[index] = el)}
                value={value}
                onChange={(e) => handleChangeCode(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "1rem",
                    height: "1rem",
                  },
                }}
              />
            ))}
          </Box>

          <Button variant="contained" color="success" fullWidth onClick={confirmUser}>
            Confirmar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
