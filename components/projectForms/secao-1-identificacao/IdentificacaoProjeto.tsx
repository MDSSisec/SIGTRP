"use client"

type Props = { projectId?: string }

export function IdentificacaoProjeto({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">1. Identificação do Projeto</h2>
      <p className="text-muted-foreground text-sm">
        Formulário de identificação do projeto {projectId ? `(#${projectId})` : ""}. Conteúdo a ser implementado.
      </p>
    </div>
  )
}
