import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, Typography, TextField, Button, Box, Switch, FormControlLabel, IconButton } from "@mui/material";
import { displayMessage } from "@/components/displayMessage";
import { ProductService } from "@/services/productService";
import { ProductInput } from "@/interfaces/produtoInterface"
import { useAuth } from "@/hooks/useAuth";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

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
      displayMessage("Erro", "Falha ao tentar achar o produto.", "error", false, false, false, 3000);
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
  PaperProps={{ 
    sx: { 
      borderRadius: "16px", 
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      overflow: "hidden"
    } 
  }}
>
  <Box
    sx={{
      background: "linear-gradient(135deg, #1c5b15 0%, #4ba298 100%)",
      color: "white",
      py: 2,
      px: 2
    }}
  >
    <DialogTitle sx={{ p: 0, textAlign: "center" }}>
      <Typography variant="h5" component="div" fontWeight="bold">
        {currentProdutoId ? "Editar Produto" : "Cadastrar Novo Produto"}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        {currentProdutoId ? "Atualize as informações do produto" : "Preencha os dados do novo produto"}
      </Typography>
    </DialogTitle>
  </Box>

  <Box sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}>
    {/* Seção de Imagem */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
        IMAGEM DO PRODUTO
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button 
          variant="outlined" 
          component="label"
          startIcon={<PhotoCameraIcon />}
          sx={{
            borderStyle: "dashed",
            borderWidth: "2px",
            py: 1.5,
            flex: 1
          }}
        >
          {imgFile ? "Alterar Imagem" : "Adicionar Imagem"}
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        
        {imgPreview && (
          <Box sx={{ position: "relative" }}>
            <img 
              src={imgPreview} 
              alt="Prévia do produto" 
              style={{ 
                width: 80, 
                height: 80, 
                borderRadius: 8,
                objectFit: "cover",
                border: "2px solid #e0e0e0"
              }} 
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "error.main",
                color: "white",
                width: 24,
                height: 24,
                '&:hover': { backgroundColor: "error.dark" }
              }}
              onClick={() => {
                setImgPreview(null);
                setImgFile(null);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>

    <Box display="flex" flexDirection="column" gap={3}>
      {/* Nome do Produto */}
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
          INFORMAÇÕES BÁSICAS
        </Typography>
        <TextField 
          label="Nome do Produto" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          fullWidth 
          size="small"
          placeholder="Digite o nome do produto"
        />
      </Box>

      {/* Preço e Quantidade */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField 
            label="Quantidade" 
            type="number" 
            value={quantidade} 
            onChange={(e) => setQuantidade(Number(e.target.value))} 
            fullWidth 
            size="small" 
          />
        </Box>
      </Box>

      {/* Descrição */}
      <Box>
        <TextField 
          label="Descrição" 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
          fullWidth 
          size="small" 
          multiline 
          rows={3}
          placeholder="Descreva as características do produto..."
        />
      </Box>

      {/* Categoria */}
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
          CATEGORIA
        </Typography>
        <TextField 
          label="Categoria" 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)} 
          fullWidth 
          size="small"
          placeholder="Ex: Eletrônicos, Roupas, etc."
        />
      </Box>

      {/* SKU e Desconto */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField 
            label="Código do Produto" 
            value={sku} 
            onChange={(e) => setSku(e.target.value)} 
            fullWidth 
            size="small" 
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField 
            label="Desconto (%)" 
            type="number" 
            value={desconto} 
            onChange={(e) => setDesconto(Number(e.target.value))} 
            fullWidth 
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Box>
      </Box>

      {/* Status */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        p: 2,
        borderRadius: 2,
        backgroundColor: "grey.50",
        border: "1px solid",
        borderColor: "grey.200"
      }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Status do Produto
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {checked ? "Produto visível para venda" : "Produto oculto"}
          </Typography>
        </Box>
        <Switch 
          checked={checked} 
          onChange={handleChange} 
          color="success" 
          size="medium"
        />
      </Box>

      {/* Botões */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        gap: 2,
        pt: 2,
        borderTop: "1px solid",
        borderColor: "grey.200"
      }}>
        <Button 
          onClick={onClose} 
          color="inherit" 
          variant="outlined" 
          size="medium"
          sx={{ minWidth: 100 }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          size="medium" 
          color="success" 
          variant="contained" 
          disabled={loading}
          // sx={{ 
          //   minWidth: 120,
          //   background: "linear-gradient(135deg, #1e2939 0%, #925dc7 100%)",
          //   '&:hover': {
          //     background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
          //   }
          // }}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={16} color="inherit" />
              Salvando...
            </Box>
          ) : (
            "Salvar Produto"
          )}
        </Button>
      </Box>
    </Box>
  </Box>
</Dialog>
  );
};
