"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import OpenPopUpButton from "@/components/shared/Buttons/openPopUpButton"
import FiltroGenerico, { type FiltroConfig } from "@/components/shared/GenericFilter/genericFilter"
import {
  DataTable,
  type TableColumn,
} from "@/components/shared/Tables/GenericTable/genericTable"
import { getStatusStyle, STATUS_PROJETO_LIST, type StatusProjeto } from "@/lib/project-status"
import projetosData from "./dataProjetos.json"

type Projeto = {
  id: number
  nome: string
  responsavel: string
  status: StatusProjeto
  tipo: string
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
        className={`inline-flex min-w-[7.5rem] items-center justify-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(row.status)}`}
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
    render: (row) => (
      <div className="flex justify-center gap-2">
        <Link
          href={`/InternalUser/projects/${row.id}`}
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

const filtrosProjetos: FiltroConfig[] = [
  { name: "nome", placeholder: "Buscar por nome...", type: "text" },
  {
    name: "status",
    type: "select",
    options: [
      { label: "Todos", value: "" },
      ...STATUS_PROJETO_LIST.map((s) => ({ label: s, value: s })),
    ],
  },
  {
    name: "tipo",
    type: "select",
    options: [
      { label: "Todos", value: "" },
      { label: "TED", value: "TED" },
      { label: "Convênio", value: "Convenio" },
      { label: "Emenda", value: "Emenda" },
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

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Todos os Projetos</h1>
        <OpenPopUpButton title="+ Adicionar projeto" onClick={() => {}} />
      </div>
      <FiltroGenerico
        filtros={filtrosProjetos}
        valores={filtrosValores}
        onChange={(name, value) =>
          setFiltrosValores((prev) => ({ ...prev, [name]: value }))
        }
        onLimpar={() => setFiltrosValores({})}
      />
      <DataTable<Projeto>
        columns={columns}
        data={projetosFiltrados}
        getRowKey={(row) => row.id}
      />
    </div>
  )
}
