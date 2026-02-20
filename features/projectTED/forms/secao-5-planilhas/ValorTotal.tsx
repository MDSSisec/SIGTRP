"use client"

import React, { useMemo } from "react"
import { DataTable, type TableColumn } from "@/components/shared/Tables/GenericTable/genericTable"
import { useProjectData } from "@/lib/contexts/project-data-context"

type Props = { projectId?: string }

interface ValorTotalRow extends Record<string, unknown> {
  fonteRecurso: string
  custeio: number | null
  investimento: number | null
  valorTotal: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function getValorTotalFromModel(projectData: ReturnType<typeof useProjectData>): ValorTotalRow[] | null {
  const dados = (projectData as { dados_fisico_financeiros?: { valor_total?: Record<string, unknown> } } | null)?.dados_fisico_financeiros?.valor_total
  if (!dados || typeof dados !== "object") return null
  const custeio = Number((dados as { custeio?: number }).custeio) || 0
  const investimento = Number((dados as { investimento?: number }).investimento) || 0
  const valorTotalMds = Number((dados as { valor_total_mds?: number }).valor_total_mds) || 0
  const contrapartida = Number((dados as { contrapartida?: number }).contrapartida) || 0
  const totalGeral = Number((dados as { total_geral?: number }).total_geral) || 0
  const percentual = totalGeral > 0 ? ((contrapartida / totalGeral) * 100).toFixed(4).replace(".", ",") : "0"
  return [
    {
      fonteRecurso: "Repasse MDS",
      custeio,
      investimento,
      valorTotal: valorTotalMds,
    },
    {
      fonteRecurso: `Contrapartida *(${percentual}%)`,
      custeio: null,
      investimento: contrapartida,
      valorTotal: contrapartida,
    },
    {
      fonteRecurso: "Total",
      custeio,
      investimento: investimento + contrapartida,
      valorTotal: totalGeral,
    },
  ]
}

const isTotalRow = (row: ValorTotalRow) => row.fonteRecurso === "Total"

const columns: TableColumn<ValorTotalRow>[] = [
  {
    id: "fonteRecurso",
    label: "Fonte do Recurso",
    align: "left",
    render: (row) =>
      isTotalRow(row) ? (
        <span className="font-bold uppercase">{row.fonteRecurso}</span>
      ) : (
        row.fonteRecurso
      ),
  },
  {
    id: "custeio",
    label: "Custeio",
    align: "right",
    render: (row) => {
      const value = row.custeio != null ? formatCurrency(row.custeio) : "—"
      return isTotalRow(row) ? <span className="font-bold">{value}</span> : value
    },
  },
  {
    id: "investimento",
    label: "Investimento",
    align: "right",
    render: (row) => {
      const value = row.investimento != null ? formatCurrency(row.investimento) : "—"
      return isTotalRow(row) ? <span className="font-bold">{value}</span> : value
    },
  },
  {
    id: "valorTotal",
    label: "Valor Total",
    align: "right",
    render: (row) => {
      const value = formatCurrency(row.valorTotal)
      return isTotalRow(row) ? <span className="font-bold">{value}</span> : value
    },
  },
]

const dadosPadrao: ValorTotalRow[] = [
  { fonteRecurso: "Repasse MDS", custeio: 1508710, investimento: 1102367.84, valorTotal: 2611077.84 },
  { fonteRecurso: "Contrapartida *(0,9937%)", custeio: null, investimento: 26208, valorTotal: 26208 },
  { fonteRecurso: "Total", custeio: 1508710, investimento: 1128575.84, valorTotal: 2637285.84 },
]

interface TotalProjetoRow extends Record<string, unknown> {
  descricao: string
  valor: string
}

const columnsTotalProjeto: TableColumn<TotalProjetoRow>[] = [
  { id: "descricao", label: "Descrição", align: "left" },
  { id: "valor", label: "Valor (R$)", align: "right" },
]

export function ValorTotal({ projectId }: Props) {
  const projectData = useProjectData()
  const data = useMemo(() => {
    if (projectId === "2" && projectData) {
      const fromModel = getValorTotalFromModel(projectData)
      if (fromModel?.length) return fromModel
    }
    return dadosPadrao
  }, [projectId, projectData])

  const totalProjeto = data.length > 0 ? data[data.length - 1].valorTotal : 0
  const tabelaTotalProjeto: TotalProjetoRow[] = [
    { descricao: "Valor total do projeto", valor: formatCurrency(totalProjeto) },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">19. Valor total do projeto</h2>
      <DataTable<ValorTotalRow>
        columns={columns}
        data={data}
        getRowKey={(row) => row.fonteRecurso}
      />
      <DataTable<TotalProjetoRow>
        columns={columnsTotalProjeto}
        data={tabelaTotalProjeto}
        getRowKey={(row) => row.descricao}
      />
    </div>
  )
}
