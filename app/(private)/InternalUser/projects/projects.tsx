"use client"

import { useMemo, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import OpenPopUpButton from "@/components/shared/Buttons/openPopUpButton"
import FiltroGenerico, {
  type FiltroConfig,
} from "@/components/shared/GenericFilter/genericFilter"
import {
  DataTable,
  type TableColumn,
} from "@/components/shared/Tables/projects"
import projetosData from "./dataProjetos.json"

type StatusProjeto = "Pendente" | "Em Andamento" | "Concluído" | "Suspenso"

type Projeto = {
  id: number
  nome: string
  responsavel: string
  status: StatusProjeto
  tipo: string
}

const getStatusStyle = (status: StatusProjeto) => {
  switch (status) {
    case "Concluído":
      return "bg-green-100 text-green-700"
    case "Em Andamento":
      return "bg-blue-100 text-blue-700"
    case "Pendente":
      return "bg-yellow-100 text-yellow-700"
    case "Suspenso":
      return "bg-red-100 text-red-700"
    default:
      return ""
  }
}

const columns: TableColumn<Projeto>[] = [
  { id: "id", label: "ID", align: "center" },
  { id: "nome", label: "Nome do Projeto", align: "left" },
  { id: "responsavel", label: "Responsável", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <span
        className={`inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(
          row.status
        )}`}
      >
        {row.status}
      </span>
    ),
  },
  { id: "tipo", label: "Tipo", align: "center" },
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

const filtrosProjetos: FiltroConfig[] = [
  {
    name: "nome",
    placeholder: "Buscar por nome...",
    type: "text",
  },
  {
    name: "status",
    placeholder: "Status",
    type: "select",
    options: [
      { label: "Todos", value: "" },
      { label: "Pendente", value: "Pendente" },
      { label: "Em Andamento", value: "Em Andamento" },
      { label: "Concluído", value: "Concluído" },
      { label: "Suspenso", value: "Suspenso" },
    ],
  },
  {
    name: "tipo",
    placeholder: "Tipo",
    type: "select",
    options: [
      { label: "Todos", value: "" },
      { label: "TED", value: "TED" },
    ],
  },
]

export function ProjectsContent() {
  const [filtrosValores, setFiltrosValores] = useState<Record<string, string>>({})
  const projetosBase = useMemo(() => projetosData as Projeto[], [])

  const projetosFiltrados = useMemo(() => {
    return projetosBase.filter((p) => {
      const nome = (filtrosValores.nome ?? "").trim().toLowerCase()
      if (nome && !p.nome.toLowerCase().includes(nome)) return false
      const status = filtrosValores.status ?? ""
      if (status && p.status !== status) return false
      const tipo = filtrosValores.tipo ?? ""
      if (tipo && p.tipo !== tipo) return false
      return true
    })
  }, [projetosBase, filtrosValores])

  const handleFiltroChange = (name: string, value: string) => {
    setFiltrosValores((prev) => ({ ...prev, [name]: value }))
  }

  const handleLimpar = () => {
    setFiltrosValores({})
  }

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Todos os Projetos</h1>
        <OpenPopUpButton
          title="+ Adicionar projeto"
          onClick={() => {}}
        />
      </div>
      <FiltroGenerico
        filtros={filtrosProjetos}
        valores={filtrosValores}
        onChange={handleFiltroChange}
        onLimpar={handleLimpar}
      />
      <DataTable<Projeto>
        columns={columns}
        data={projetosFiltrados}
        getRowKey={(row) => row.id}
      />
    </div>
  )
}
