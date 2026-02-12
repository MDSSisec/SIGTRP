"use client"

import { useMemo, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import OpenPopUpButton from "@/components/shared/Buttons/openPopUpButton"
import FiltroGenerico, { type FiltroConfig } from "@/components/shared/GenericFilter/genericFilter"
import {
  DataTable,
  type TableColumn,
} from "@/components/shared/Tables/genericTable"

type StatusUsuario = "Ativo" | "Inativo" | "Pendente"

type PerfilUsuario = "Administrador" | "Usuário" | "Gestor"

type Usuario = {
  id: number
  nome: string
  email: string
  status: StatusUsuario
  perfil: PerfilUsuario
}

const dadosUsuarios: Usuario[] = [
  { id: 1, nome: "Maria Silva", email: "maria.silva@email.com", status: "Ativo", perfil: "Administrador" },
  { id: 2, nome: "João Santos", email: "joao.santos@email.com", status: "Ativo", perfil: "Usuário" },
  { id: 3, nome: "Ana Costa", email: "ana.costa@email.com", status: "Inativo", perfil: "Usuário" },
  { id: 4, nome: "Carlos Lima", email: "carlos.lima@email.com", status: "Pendente", perfil: "Gestor" },
  { id: 5, nome: "Fernanda Oliveira", email: "fernanda@email.com", status: "Ativo", perfil: "Gestor" },
]

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
    render: () => (
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </button>
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
  const [filtrosValores, setFiltrosValores] = useState<Record<string, string>>({})

  const usuariosFiltrados = useMemo(() => {
    return dadosUsuarios.filter((u) => {
      const nome = (filtrosValores.nome ?? "").trim().toLowerCase()
      if (nome && !u.nome.toLowerCase().includes(nome)) return false
      const status = filtrosValores.status ?? ""
      if (status && u.status !== status) return false
      const perfil = filtrosValores.perfil ?? ""
      if (perfil && u.perfil !== perfil) return false
      return true
    })
  }, [filtrosValores])

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Usuários Internos</h1>
        <OpenPopUpButton
          title="+ Adicionar usuário"
          onClick={() => {}}
        />
      </div>
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
