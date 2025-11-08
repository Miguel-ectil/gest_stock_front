import { useEffect, useState } from "react";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import { displayMessage } from "@/utils/displayMessage";

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
  // Estado dos campos
  const [loading, setLoading] = useState(true);
  const [currentProdutoId, setCurrentProdutoId] = useState<number | null>(null);
  const [name, setName] = useState(true);
  const [preco, setPreco] = useState(true);
  const [quantidade, setQuantidade] = useState(true);
  const [status, setStatus] = useState(true);


  const buscarProduto = async (id: number) => {
    setLoading(true);
    try {
      // const detalhes = await regrasService.obterRegra(id);

    } catch (error) {
      displayMessage("Erro", "Falha ao buscar detalhes da regra.", "error", false, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentProdutoId(produtoId ?? null);
  }, [produtoId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle>
        <Typography>
          <strong>
            {currentProdutoId ? "Editar Regra" : "Cadastrar Nova Regra"}
          </strong>
        </Typography>
      </DialogTitle>
      {/* Aqui você pode adicionar o formulário */}
    </Dialog>
  );
}
