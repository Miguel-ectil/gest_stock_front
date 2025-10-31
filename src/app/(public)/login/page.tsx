"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function LoginPage() {
    const router = useRouter();

    function handleLogin() {
        localStorage.setItem("user", "true");
        router.push("/");
    }
    return (
        <div className="flex min-h-screen items-center justify-center">{/*bg-zinc-50 dark:bg-zinc-950*/}
            <main
                className="
          flex w-full max-w-md flex-col items-center 
          rounded-xl border border-zinc-200 bg-white 
          p-10 shadow-xl
          dark:border-zinc-800 dark:bg-zinc-900
          transition-colors
        "
            >                {/* <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Bem-vindo de volta!
                </h1> */}
                <div className="bg-white mb-6 flex items-center justify-center rounded-lg p-2 shadow-md dark:bg-zinc-800">
                    <Image alt="Logo da empresa" src="/imgs/logo_gestao.png" width={240} height={140} />
                </div>
                {/* Formulário */}
                <form className="w-full space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Entrar
                    </button>
                </form>

                {/* Links de ajuda */}
                <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="mx-1.5">Não tem conta?</span>
                    <a href="/register" className="hover:underline text-blue-400">
                      Criar uma conta
                    </a>
                </div>
            </main>
        </div>
    );
}