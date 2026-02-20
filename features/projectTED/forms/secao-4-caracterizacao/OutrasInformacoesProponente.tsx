"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/contexts/project-data-context"
import { cn } from "@/lib/utils"

interface DadosOutrasInformacoesProponente {
  texto: string
}

const TITULO_PADRAO = "18. Outras informações julgadas apropriadas sobre a entidade proponente"

function getInicialFromModel(projectData: ReturnType<typeof useProjectData>): string {
  const data = (projectData as { caracterizacao_proponente?: { pergunta?: string; outras_informacoes?: string } } | null)?.caracterizacao_proponente
  if (!data || typeof data !== "object") return ""
  return typeof data.outras_informacoes === "string" ? data.outras_informacoes : ""
}

function getPerguntaFromModel(projectData: ReturnType<typeof useProjectData>): string {
  const data = (projectData as { caracterizacao_proponente?: { pergunta?: string } } | null)?.caracterizacao_proponente
  if (!data?.pergunta) return TITULO_PADRAO
  return data.pergunta
}

interface PropsFormularioOutrasInformacoesProponente {
  onChange?: (dados: DadosOutrasInformacoesProponente) => void
  projectId?: string
  readOnlyView?: boolean
}

const classeDoTextarea =
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] min-h-[8rem] resize-y md:text-sm"

function FormularioOutrasInformacoesProponente({
  onChange,
  projectId,
  readOnlyView,
}: PropsFormularioOutrasInformacoesProponente) {
  const projectData = useProjectData()
  const [texto, setTexto] = useState<string>(() =>
    projectId === "2" && projectData ? getInicialFromModel(projectData) : ""
  )
  const pergunta = projectId === "2" && projectData ? getPerguntaFromModel(projectData) : TITULO_PADRAO

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setTexto(getInicialFromModel(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTexto(value)
    onChange?.({ texto: value })
  }

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          {pergunta}
        </h2>

        <div className="space-y-2">
          <Label
            htmlFor="outras-informacoes-proponente"
            className="font-medium text-foreground"
          >
            Informações adicionais
          </Label>
          <textarea
            id="outras-informacoes-proponente"
            name="texto"
            value={texto}
            onChange={aoAlterar}
            placeholder="Descreva outras informações relevantes sobre a entidade proponente..."
            rows={8}
            disabled={readOnlyView}
            readOnly={readOnlyView}
            tabIndex={readOnlyView ? -1 : undefined}
            className={cn(
              classeDoTextarea,
              readOnlyView && "cursor-default resize-none bg-muted/30"
            )}
          />
        </div>
      </section>

      {!readOnlyView && (
        <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
          <GenericButton variant="editar" onClick={() => {}} />
          <GenericButton variant="salvar" onClick={() => {}} />
        </div>
      )}
    </div>
  )
}

export function OutrasInformacoesProponente(
  props: PropsFormularioOutrasInformacoesProponente
) {
  return <FormularioOutrasInformacoesProponente {...props} />
}
