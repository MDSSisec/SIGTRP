"use client"

import React, { createContext, useContext, useMemo } from "react"

/**
 * Tipo mínimo do projeto modelo (campos usados para preencher formulários).
 * Compatível com projetoModelo.json quando id === 2.
 */
export interface ProjectModelData {
  id?: number
  nome?: string
  responsavel?: string
  status?: string
  tipo?: string
  identificacao?: {
    projeto?: {
      nome?: string
      local_execucao?: string
      duracao?: string
      resumo?: string
    }
    entidade_proponente?: {
      nome?: string
      cnpj?: string
      data_fundacao?: string
      registro_cnpj?: string
      endereco?: {
        logradouro?: string
        bairro?: string
        municipio?: string
        uf?: string
        cep?: string
      }
      contato?: {
        telefone?: string
        emails?: string[]
        site?: string
      }
    }
    representante_legal?: {
      nome?: string
      matricula?: string
      cargo?: string
      estado_civil?: string
      telefone?: string
      email?: string
    }
    responsaveis_tecnicos?: Array<{
      area?: string
      nome?: string
      matricula?: string
      profissao?: string
      cargo?: string
      estado_civil?: string
      telefone?: string
      email?: string
    }>
  }
  descricao_projeto?: {
    justificativa_motivacao?: {
      caracterizacao_interesses_reciprocos?: string
      publico_alvo?: string
      problema?: string
      resultados_esperados?: string
      relacao_proposta_programa?: string
    }
    /** Campos no nível de descricao_projeto (projetoModelo.json) */
    publico_alvo?: string
    problema?: string
    resultados_esperados?: string
    relacao_proposta_programa?: string
  }
  objetivos?: {
    objetivo_geral?: string
    objetivos_especificos?: string[]
  }
  metas?: Array<{ meta?: string; descricao?: string }>
  etapas_cronograma?: {
    periodo_total?: { inicio?: string; termino?: string; valor_total?: string }
    metas?: Array<{
      meta?: string
      etapas?: Array<{
        codigo?: string
        atividade?: string
        valor?: string
        inicio?: string
        termino?: string
      }>
    }>
  }
  resultados_esperados?: { itens?: string[] }
  gestao_projeto?: {
    dimensionamento_equipe?: string
    dimensionamento_contratacoes?: {
      necessidade?: string
      servicos_ou_bens?: string
      forma_selecao?: string
    }
  }
}

type ProjectDataContextValue = ProjectModelData | null

const ProjectDataContext = createContext<ProjectDataContextValue>(null)

export function ProjectDataProvider({
  projectId,
  projectData,
  children,
}: {
  projectId: string
  projectData: ProjectModelData | null
  children: React.ReactNode
}) {
  const value = useMemo<ProjectDataContextValue>(() => {
    if (projectId !== "2" || !projectData) return null
    return projectData
  }, [projectId, projectData])

  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  )
}

export function useProjectData(): ProjectDataContextValue {
  return useContext(ProjectDataContext)
}

/** Converte "R$ 720.000,00" em número */
function parseValorModelo(s: string | undefined): number {
  if (!s || typeof s !== "string") return 0
  const limpo = s.replace(/R\$\s?/i, "").replace(/\./g, "").replace(",", ".").trim()
  const n = parseFloat(limpo)
  return Number.isNaN(n) ? 0 : n
}

/** Formato esperado pelo CronogramaContext (CronogramaData) */
export interface CronogramaDataMapped {
  metas: Array<{
    titulo: string
    etapas: Array<{ descricao: string; valor: number; inicio: string; termino: string }>
    quadrosConteudosProgramaticos?: unknown[]
    quadroInsumosPorCurso?: unknown[]
  }>
}

/**
 * Mapeia etapas_cronograma do projeto modelo para CronogramaData do formulário.
 * Usado para preencher o cronograma quando projectId === 2.
 */
export function mapModeloCronogramaToForm(
  etapasCronograma: ProjectModelData["etapas_cronograma"]
): CronogramaDataMapped {
  if (!etapasCronograma?.metas?.length) return { metas: [] }
  return {
    metas: etapasCronograma.metas.map((m) => ({
      titulo: m.meta ?? "",
      etapas: (m.etapas ?? []).map((e) => ({
        descricao: e.atividade ?? "",
        valor: parseValorModelo(e.valor),
        inicio: e.inicio ?? "",
        termino: e.termino ?? "",
      })),
      quadrosConteudosProgramaticos: [],
      quadroInsumosPorCurso: [],
    })),
  }
}
