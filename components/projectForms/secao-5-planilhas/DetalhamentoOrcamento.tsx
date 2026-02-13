"use client"

type Props = { projectId?: string }

export function DetalhamentoOrcamento({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
