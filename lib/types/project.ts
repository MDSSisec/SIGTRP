/** Re-exporta o tipo de status de projeto (definido em constants/project.ts). */
export type { StatusProjeto } from "@/constants/project"

/**
 * Tipo mínimo do projeto modelo.
 * Usado para preencher formulários quando um projeto modelo é carregado (ex.: id === 2).
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

/**
 * Estrutura esperada pelo contexto de cronograma do formulário (preenchimento automático).
 */
export interface CronogramaDataMapped {
  metas: Array<{
    titulo: string
    etapas: Array<{
      descricao: string
      valor: number
      inicio: string
      termino: string
    }>
    quadrosConteudosProgramaticos?: unknown[]
    quadroInsumosPorCurso?: unknown[]
  }>
}
