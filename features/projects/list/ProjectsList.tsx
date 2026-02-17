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

import { getStatusStyle, STATUS_PROJETO_LIST, type StatusProjeto } from "@/features/projects/services/project.service"
import projetosDataJson from "@/features/projects/model/dataProjetos.json"

import styles from "./styles/projetos.module.css"

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
        className={`${styles.statusBadge} ${getStatusStyle(row.status)}`}
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
      <div className={styles.actionsCell}>
        <Link
          href={`/InternalUser/projects/${row.id}`}
          className={styles.actionLink}
          aria-label="Editar"
        >
          <Pencil size={16} />
        </Link>

        <button
          type="button"
          className={styles.deleteButton}
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
  const projetosBase = useMemo(() => projetosDataJson as Projeto[], [])

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todos os Projetos</h1>
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
