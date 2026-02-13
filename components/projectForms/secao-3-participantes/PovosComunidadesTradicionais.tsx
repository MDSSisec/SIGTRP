"use client"

type Props = { projectId?: string }

export function PovosComunidadesTradicionais({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">15. Informe se o público faz parte de algum destes povos ou comunidades tradicionais</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
