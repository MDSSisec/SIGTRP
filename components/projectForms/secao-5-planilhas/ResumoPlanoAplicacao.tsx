"use client"

type Props = { projectId?: string }

export function ResumoPlanoAplicacao({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">22. Resumo do plano de aplicação por elemento de despesa</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
