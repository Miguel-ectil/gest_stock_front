"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    celular: "",
    senha: "",
    status: "Inativo",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCadastro() {
    setLoading(true);
    try {
      console.log("Dados enviados:", formData);
      // Aqui você poderia chamar: await AuthService.register(formData)
      // Por exemplo: const res = await AuthService.register(formData)
      router.push("/"); // redireciona após cadastro
    } catch (err) {
      console.error("Erro no cadastro:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center"> {/*bg-zinc-50 dark:bg-zinc-950*/}
      <main className="flex w-full max-w-md flex-col items-center rounded-xl border border-zinc-200 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Cadastro de Mini Mercado
        </h1>

        <p className="mb-8 text-center text-zinc-600 dark:text-zinc-400">
          Preencha os dados abaixo para criar sua conta
        </p>

        <div className="w-full space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome do mini mercado"
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              CNPJ
            </label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Celular
            </label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <button
            onClick={handleCadastro}
            disabled={loading}
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </main>
    </div>
  );
}
