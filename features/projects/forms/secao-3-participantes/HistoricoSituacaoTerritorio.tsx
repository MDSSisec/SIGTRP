"use client"

type Props = { projectId?: string }

export function HistoricoSituacaoTerritorio({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">12. Histórico e situação socioeconômica do território e da população a ser beneficiada</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
