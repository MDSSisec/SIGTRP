"use client"

type Props = { projectId?: string }

export function ServicosAcessados({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">17. Informe se o público beneficiário está acessando alguns dos seguintes serviços</h2>
      <p className="text-muted-foreground text-sm">Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}</p>
    </div>
  )
}
