import ThemeToggle from "@/components/ui/theme-toggle";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  // Função para gerar iniciais do nome
  const getInitials = (name?: string) => {
    if (!name) return "U"; // Usuário padrão
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="flex justify-between w-full p-4 border-b border-gray-50 dark:border-gray-700 items-center bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <Image
          src="/imgs/logo_gestao_encur.png"
          alt="Logo"
          width={40}
          height={40}
        />
        <h1 className="hidden md:block text-xl font-bold text-gray-900 dark:text-white">
          Gestão de Estoque
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-gray-500 dark:text-gray-400">
          Olá, <strong>{user?.nome || "Usuário"}</strong>
        </p>

        {/* Avatar com iniciais */}
        <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white font-bold">
          {getInitials(user?.nome)}
        </div>
      </div>
    </header>
  );
}
