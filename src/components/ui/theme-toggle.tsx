"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Carrega o tema salvo
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Atualiza o tema ao mudar o estado
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Alternar tema"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        shadow-lg
        bg-indigo-600 text-white
        hover:bg-indigo-700
        dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300
        transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-yellow-200
      "
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
