export interface EtapaCronograma {
  id: string
  titulo: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
}

export interface MetaCronograma {
  id: string
  titulo: string
  etapas: EtapaCronograma[]
}

export type ProjectFormSectionProps = { projectId?: string }
