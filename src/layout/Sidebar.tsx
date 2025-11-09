"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Home, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout, user } = useAuth();

    const menuItems = [
        { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
        { name: "Produtos", icon: <Package size={20} />, path: "/products" },
        { name: "Vendas", icon: <ShoppingCart size={20} />, path: "/vendas" },
        { name: "Configurações", icon: <Settings size={20} />, path: "/config" },
    ];

    return (
        <aside
            className={`${isOpen ? "w-64" : "w-20"
                } h-screen fixed top-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between transition-all duration-300`}
        >
            <div className="relative flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                <h1
                    className={`text-xl font-bold text-indigo-600 dark:text-indigo-400 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                        }`}
                >
                    Gest Stock
                </h1>

                <button
                    onClick={toggleSidebar}
                    className="absolute right-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer p-1 border rounded"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex-1 mt-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md transition-colors
              ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            {item.icon}
                            {isOpen && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {isOpen && (
                    <p className="text-sm text-gray-500 mb-2 truncate">
                        {user?.nome ?? "Usuário"}
                    </p>
                )}
                <button
                    onClick={() => {
                        logout();
                        router.push("/login");
                    }}
                    className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors w-full"
                >
                    <LogOut size={20} />
                    {isOpen && <span>Sair</span>}
                </button>
            </div>
        </aside>
    );
}
