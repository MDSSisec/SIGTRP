"use client"

type Props = { projectId?: string }

export function ValorTotal({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">19. Valor total do projeto</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
