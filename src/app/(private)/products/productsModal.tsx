import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, Typography, TextField, Button, Box, Switch, FormControlLabel } from "@mui/material";
import { displayMessage } from "@/components/displayMessage";
import { ProductService } from "@/services/productService";
import { ProductInput } from "@/interfaces/produtoInterface"
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();

  // Estado dos campos
  const [loading, setLoading] = useState(false);
  const [currentProdutoId, setCurrentProdutoId] = useState(produtoId);

  const [name, setName] = useState("");
  const [preco, setPreco] = useState<number | "">(""); 
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [sku, setSku] = useState("");
  const [desconto, setDesconto] = useState<number | "">("");

  // Estados do switch
  const [checked, setChecked] = React.useState(true);

  const buscarProduto = async (id: number) => {
    setLoading(true);
    try {
      const resp = await productService.getProduct(id);
      setName(resp.name);
      setPreco(resp.preco);
      setQuantidade(resp.quantidade);
      setChecked(resp.status);
      setDescricao(resp.descricao || "");
      setCategoria(resp.categoria || "");
      setSku(resp.sku || "");
      setDesconto(resp.desconto || "");
    } catch {
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
        setImgFile(null);
        setImgPreview(null);
        setDescricao("");
        setCategoria("");
        setSku("");
        setDesconto("");
      }
    }
  }, [open, produtoId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data: ProductInput = {
        id_vendedor: user?.id,
        name,
        preco: Number(preco),
        quantidade,
        status: checked,
        imagem: null,
        descricao,
        categoria,
        sku,
        desconto: desconto === "" ? 0 : Number(desconto)
      };
      if (currentProdutoId) {
        await productService.updateProduct(currentProdutoId, data);
        displayMessage("Sucesso", "Produto atualizado com sucesso!", "success", false, false, false, 3000);
      } else {
        await productService.createProduct(data);
        displayMessage("Sucesso", "Produto cadastrado com sucesso!", "success", false, false, false, 3000);
      }

      onSuccess?.();
      onClose();
    } catch (_error) {
      displayMessage("Erro", "Falha ao salvar o produto.", "error", false, false, false, 3000);
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
          <strong>{currentProdutoId ? "Editar Produto" : "Cadastrar Novo Produto"}</strong>
        </Typography>
      </DialogTitle>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {/* Imagem */}
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

        {/* Nome */}
        <TextField label="Nome do Produto" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" />

        {/* Preço e Quantidade */}
        <Box display="flex" gap={2}>
          <TextField
            label="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            fullWidth
            size="small"
          />
          <TextField label="Quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} fullWidth size="small" />
        </Box>

        {/* Descrição */}
        <TextField label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} fullWidth size="small" multiline rows={2} />

        {/* Categoria */}
        <TextField label="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} fullWidth size="small" />

        {/* SKU e Desconto */}
        <Box display="flex" gap={2}>
          <TextField label="código produto" value={sku} onChange={(e) => setSku(e.target.value)} fullWidth size="small" />
          <TextField label="Desconto (%)" type="number" value={desconto} onChange={(e) => setDesconto(Number(e.target.value))} fullWidth size="small" />
        </Box>

        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} color="success" />}
          label={checked ? "Ativo" : "Inativo"}
        />

        {/* Botões */}
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} color="error" variant="outlined" sx={{ mr: 2 }} size="small">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} size="small" color="success" variant="contained" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
