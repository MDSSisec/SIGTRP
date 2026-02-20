"use client"

import React, { useMemo } from "react"
import { DataTable, type TableColumn } from "@/components/shared/Tables/GenericTable/genericTable"
import { SECAO_SLUG_TO_TITLE } from "@/constants/visaoGeral"
import dadosAndamentoProjeto from "@/features/projectTED/model/dadosAndamentoProjeto.json"
import styles from "./andamentoDoProjeto.module.css"

type ProjectFormSectionProps = { projectId?: string; readOnlyView?: boolean }

export interface RegistroAndamento extends Record<string, unknown> {
  id: string
  dataHora: string
  usuario: string
  /** Slug da seção (ex.: identificacao-projeto). O título é resolvido via constants/visaoGeral. */
  secao: string
  descricao: string
}

/** Dados de teste do log de modificações. Em produção viriam de API/histórico do projeto (filtrar por projectId). */
function getLogAndamento(_projectId?: string): RegistroAndamento[] {
  return dadosAndamentoProjeto as RegistroAndamento[]
}

const columns: TableColumn<RegistroAndamento>[] = [
  { id: "dataHora", label: "Data e hora", align: "left" },
  { id: "usuario", label: "Usuário", align: "left" },
  {
    id: "secao",
    label: "Seção / Área",
    align: "left",
    render: (row) => SECAO_SLUG_TO_TITLE[row.secao] ?? row.secao,
  },
  { id: "descricao", label: "Descrição da alteração", align: "left" },
]

export function AndamentoDoProjeto({ projectId }: ProjectFormSectionProps) {
  const data = useMemo(() => getLogAndamento(projectId), [projectId])

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Andamento do Projeto</h2>
      <p className={styles.subtitle}>
        Registro das modificações (edições) realizadas no projeto, por data e usuário.
      </p>
      <DataTable<RegistroAndamento>
        columns={columns}
        data={data}
        getRowKey={(row) => row.id}
      />
    </section>
  )
}
