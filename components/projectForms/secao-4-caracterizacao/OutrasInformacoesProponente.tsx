"use client"

type Props = { projectId?: string }

export function OutrasInformacoesProponente({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">12. Outras informações julgadas apropriadas sobre o(a) proponente</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
