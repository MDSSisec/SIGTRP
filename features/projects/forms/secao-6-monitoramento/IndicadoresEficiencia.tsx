"use client"

type Props = { projectId?: string }

export function IndicadoresEficiencia({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">24. Indicadores de eficiência e eficácia</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
