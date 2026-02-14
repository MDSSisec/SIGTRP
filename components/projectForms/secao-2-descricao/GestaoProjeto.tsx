"use client"

interface GestaoProjetoProps {
  projectId?: string
}

export default function GestaoProjeto({ projectId }: GestaoProjetoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">11. Gestão do Projeto</h2>
      <p className="text-muted-foreground text-sm">
        Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}
      </p>
    </div>
  )
}
