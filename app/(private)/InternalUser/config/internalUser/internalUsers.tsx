"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Pencil, Trash2, KeyRound } from "lucide-react"
import OpenPopUpButton from "@/components/shared/Buttons/openPopUpButton"
import Popup from "@/components/shared/PopUps/Generico/popUpGenerico"
import FiltroGenerico, { type FiltroConfig } from "@/components/shared/GenericFilter/genericFilter"
import {
  DataTable,
  type TableColumn,
} from "@/components/shared/Tables/GenericTable/genericTable"
import { 
  type Usuario, 
  type StatusUsuario, 
  type PerfilUsuario, 
  statusOptions,
  perfilOptions
} from "./data"
import { useUser } from "../context/UserContext"

const getStatusStyle = (status: StatusUsuario) => {
  switch (status) {
    case "Ativo":
      return "bg-green-100 text-green-700"
    case "Inativo":
      return "bg-red-100 text-red-700"
    case "Pendente":
      return "bg-yellow-100 text-yellow-700"
    default:
      return ""
  }
}

const columns: TableColumn<Usuario>[] = [
  { id: "nome", label: "Nome", align: "left" },
  { id: "email", label: "Email", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <span
        className={`inline-flex min-w-[5rem] items-center justify-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(row.status)}`}
      >
        {row.status}
      </span>
    ),
  },
  { id: "perfil", label: "Perfil", align: "center" },
  {
    id: "acoes",
    label: "Ações",
    align: "center",
    render: (row) => (
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300 text-amber-600 hover:text-amber-800"
          aria-label="Redefinir Senha"
          title="Redefinir Senha"
          onClick={() => alert(`Solicitação de redefinição de senha para: ${row.nome}`)}
        >
          <KeyRound size={16} />
        </button>
        <Link
          href={`/InternalUser/config/internalUser/${row.id}`}
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300 inline-flex items-center justify-center"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </Link>
        <button
          type="button"
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300 text-red-600 hover:text-red-800"
          aria-label="Excluir"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
]

const filtrosUsuarios: FiltroConfig[] = [
  { name: "nome", placeholder: "Buscar por nome...", type: "text" },
  {
    name: "status",
    type: "select",
    options: [
      { label: "Todos", value: "" },
      { label: "Ativo", value: "Ativo" },
      { label: "Inativo", value: "Inativo" },
      { label: "Pendente", value: "Pendente" },
    ],
  },
  {
    name: "perfil",
    type: "select",
    options: [
      { label: "Todos", value: "" },
      { label: "Administrador", value: "Administrador" },
      { label: "Usuário", value: "Usuário" },
      { label: "Gestor", value: "Gestor" },
    ],
  },
]

export function InternalUsersContent() {
  const { internalUsers, setInternalUsers } = useUser()
  const [filtrosValores, setFiltrosValores] = useState<Record<string, string>>({})
  const [popupAberto, setPopupAberto] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    status: "Ativo" as StatusUsuario,
    perfil: "Usuário" as PerfilUsuario,
  })

  const usuariosFiltrados = useMemo(() => {
    return internalUsers.filter((u) => {
      const nome = (filtrosValores.nome ?? "").trim().toLowerCase()
      if (nome && !u.nome.toLowerCase().includes(nome)) return false
      const status = filtrosValores.status ?? ""
      if (status && u.status !== status) return false
      const perfil = filtrosValores.perfil ?? ""
      if (perfil && u.perfil !== perfil) return false
      return true
    })
  }, [filtrosValores, internalUsers])

  const abrirPopup = () => {
    setForm({ nome: "", email: "", status: "Ativo", perfil: "Usuário" })
    setPopupAberto(true)
  }

  const fecharPopup = () => setPopupAberto(false)

  const handleSalvarUsuario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome.trim() || !form.email.trim()) return
    const novoId = Math.max(0, ...internalUsers.map((u) => u.id)) + 1
    setInternalUsers((prev) => [
      ...prev,
      { id: novoId, nome: form.nome.trim(), email: form.email.trim(), status: form.status, perfil: form.perfil },
    ])
    fecharPopup()
  }

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Usuários Internos</h1>
        <OpenPopUpButton title="+ Adicionar usuário" onClick={abrirPopup} />
      </div>

      <Popup open={popupAberto} title="Cadastrar usuário" onClose={fecharPopup}>
        <form onSubmit={handleSalvarUsuario} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-sidebar-accent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              placeholder="Nome completo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-sidebar-accent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              placeholder="email@exemplo.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as StatusUsuario }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-sidebar-accent text-gray-900 dark:text-gray-100"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="dark:bg-gray-800">{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perfil</label>
            <select
              value={form.perfil}
              onChange={(e) => setForm((f) => ({ ...f, perfil: e.target.value as PerfilUsuario }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-sidebar-accent text-gray-900 dark:text-gray-100"
            >
              {perfilOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="dark:bg-gray-800">{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={fecharPopup}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#1e2938] text-white text-sm hover:opacity-90"
            >
              Salvar
            </button>
          </div>
        </form>
      </Popup>

      <FiltroGenerico
        filtros={filtrosUsuarios}
        valores={filtrosValores}
        onChange={(name, value) =>
          setFiltrosValores((prev) => ({ ...prev, [name]: value }))
        }
        onLimpar={() => setFiltrosValores({})}
      />

      <DataTable<Usuario>
        columns={columns}
        data={usuariosFiltrados}
        getRowKey={(row) => row.id}
      />
    </div>
  )
}
