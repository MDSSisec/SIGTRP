"use client"

type Props = { projectId?: string }

export function CronogramaDesembolso({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">20. Cronograma de desembolso</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
