import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, Typography, TextField, Button, MenuItem, Box, Switch, FormControlLabel } from "@mui/material";
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
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [status, setStatus] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  // Estados do switch
  const [checked, setChecked] = React.useState(true);


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
        setCurrentProdutoId(null);
        setName("");
        setPreco("");
        setQuantidade("");
        setStatus(false);
        setImgFile(null);
        setImgPreview(null);
      }
    }
  }, [open, produtoId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { id_vendedor: 1, name, preco, quantidade, status, imagem: null };

      if (currentProdutoId) {
        await productService.updateProduct(currentProdutoId, data);
        displayMessage("Sucesso", "Produto atualizado com sucesso!", "success", false, false, false, 3000);
      } else {
        const resp = await productService.createProduct(data);
        console.log(resp)
        displayMessage("Sucesso", "Produto cadastrado com sucesso!", "success", false, false, false, 3000);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "10px", padding: 2 } }}
    >
      <DialogTitle sx={{ pt: 2 }}>
        <Typography align="center" variant="h6" component="div">
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
          size="small"
        />

        <Box display="flex" gap={2}>
          <TextField
            label="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <TextField
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              color="success"
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Ativo"
        />

        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} color="secondary" variant="outlined" sx={{ mr: 2 }} size="small">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} size="small"
            color="success" variant="contained" disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
