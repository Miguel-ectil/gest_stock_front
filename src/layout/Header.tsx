import ThemeToggle from "@/components/ui/theme-toggle";
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
const { user, logout } = useAuth();

  return (
    <header className="flex justify-between w-full p-4 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <Image src="/imgs/logo_gestao_encur.png" alt="Logo" width={40} height={40} />
              <h1 className="text-xl font-bold text-white dark:bg-gray-900">Gestão de Estoque</h1>
      </div> 
          <button
              onClick={logout}
              className="mt-4 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
              Sair
          </button>
    </header>
  );
}