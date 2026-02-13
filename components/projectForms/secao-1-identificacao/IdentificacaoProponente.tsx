"use client"

type Props = { projectId?: string }

export function IdentificacaoProponente({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">2. Identificação do(a) proponente</h2>
      <p className="text-muted-foreground text-sm">
        Formulário de identificação do proponente {projectId ? `(projeto #${projectId})` : ""}. Conteúdo a ser implementado.
      </p>
    </div>
  )
}
