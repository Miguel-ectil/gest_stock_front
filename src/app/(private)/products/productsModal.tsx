import { useEffect, useState } from "react";
import { Dialog, DialogTitle, Typography } from "@mui/material";

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
  const [currentProdutoId, setCurrentProdutoId] = useState<number | null>(null);

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
