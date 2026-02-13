"use client"

type Props = { projectId?: string }

export function IdentificacaoRepresentanteLegal({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">3. Identificação do representante legal do(a) proponente</h2>
      <p className="text-muted-foreground text-sm">
        Formulário do representante legal {projectId ? `(projeto #${projectId})` : ""}. Conteúdo a ser implementado.
      </p>
    </div>
  )
}
