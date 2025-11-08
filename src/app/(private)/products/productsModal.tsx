import { useEffect, useState } from "react";
import { Dialog, DialogTitle, Typography, TextField, Button, MenuItem, Box } from "@mui/material";
import { displayMessage } from "@/utils/displayMessage";
import { ProductService } from "@/services/productService";
import { Product } from "@/interfaces/produtoInterface"

interface ModalAdicionarProdutoProps {
  open: boolean;
  onClose: () => void;
  produtoId?: number | null;
  onSuccess?: () => void | Promise<void>;
}

export const ModalAdicionarProduto: React.FC<ModalAdicionarProdutoProps> = ({
  open,
  onClose,
  produtoId,
  onSuccess
}) => {
  const productService = ProductService();

  // Estado dos campos
  const [loading, setLoading] = useState(false);
  const [currentProdutoId, setCurrentProdutoId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [preco, setPreco] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [status, setStatus] = useState<string>("ativo");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  // Buscar produto caso seja edição
  const buscarProduto = async (id: number) => {
    setLoading(true);
    try {
      const resp = await productService.getProduct(id);
      console.log(resp)
      setName(resp.name);
      setPreco(resp.preco);
      setQuantidade(resp.quantidade);
      setStatus(resp.status);
    } catch (error) {
      displayMessage("Erro", "Falha ao tentar achar o produto.", "error", false, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      if (produtoId) {
        setCurrentProdutoId(produtoId);
        buscarProduto(produtoId);
      } else {
        // Resetar formulário
        setCurrentProdutoId(null);
        setName("");
        setPreco("");
        setQuantidade("");
        setStatus("ativo");
        setImgFile(null);
        setImgPreview(null);
      }
    }
  }, [open, produtoId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { name, preco, quantidade, status };

      if (currentProdutoId) {
        await productService.updateProduct(currentProdutoId, data);
        displayMessage("Sucesso", "Produto atualizado com sucesso!", "success", false, false);
      } else {
        await productService.createProduct(data);
        displayMessage("Sucesso", "Produto cadastrado com sucesso!", "success", false, false);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      displayMessage("Erro", "Falha ao salvar o produto.", "error", false, false);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImgFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "10px", padding: 3 } }}
    >
      <DialogTitle>
        <Typography>
          <strong>
            {currentProdutoId ? "Editar Produto" : "Cadastrar Novo Produto"}
          </strong>
        </Typography>
      </DialogTitle>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Button variant="outlined" component="label">
            {imgFile ? "Alterar Imagem" : "Adicionar Imagem"}
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {imgPreview && (
            <Box mt={1}>
              <Typography variant="caption">Pré-visualização:</Typography>
              <img src={imgPreview} alt="Prévia do produto" style={{ width: 150, marginTop: 5 }} />
            </Box>
          )}
        </Box>

        <TextField
          label="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="ativo">Ativo</MenuItem>
          <MenuItem value="inativo">Inativo</MenuItem>
        </TextField>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} color="secondary" variant="outlined" sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
