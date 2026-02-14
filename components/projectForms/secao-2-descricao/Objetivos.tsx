"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/project-data-context"
import { cn } from "@/lib/utils"

interface DadosObjetivos {
  objetivoGeral: string
  objetivosEspecificos: string[]
}

interface PropsFormularioObjetivos {
  onChange?: (dados: DadosObjetivos) => void
  projectId?: string
}

function getInicialObjetivos(projectData: ReturnType<typeof useProjectData>): DadosObjetivos {
  const o = projectData?.objetivos
  if (!o) return { objetivoGeral: "", objetivosEspecificos: [""] }
  const especificos = o.objetivos_especificos?.length ? o.objetivos_especificos : [""]
  return {
    objetivoGeral: o.objetivo_geral ?? "",
    objetivosEspecificos: especificos,
  }
}

function FormularioObjetivos({ onChange, projectId }: PropsFormularioObjetivos) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosObjetivos>({
    objetivoGeral: "",
    objetivosEspecificos: [""],
  })

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialObjetivos(projectData))
    }
  }, [projectId, projectData])

  const aoAlterarObjetivoGeral = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const dadosAtualizados = {
      ...dadosFormulario,
      objetivoGeral: e.target.value,
    }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const aoAlterarObjetivoEspecifico = (indice: number, valor: string) => {
    const objetivosAtualizados = [...dadosFormulario.objetivosEspecificos]
    objetivosAtualizados[indice] = valor
    const dadosAtualizados = {
      ...dadosFormulario,
      objetivosEspecificos: objetivosAtualizados,
    }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const adicionarObjetivoEspecifico = () => {
    const dadosAtualizados = {
      ...dadosFormulario,
      objetivosEspecificos: [...dadosFormulario.objetivosEspecificos, ""],
    }
    setDadosFormulario(dadosAtualizados)
  }

  const removerObjetivoEspecifico = (indice: number) => {
    const objetivosAtualizados = dadosFormulario.objetivosEspecificos.filter(
      (_, i) => i !== indice
    )
    const dadosAtualizados = {
      ...dadosFormulario,
      objetivosEspecificos: objetivosAtualizados,
    }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const classeDoTextarea =
    "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] min-h-[8rem] resize-y md:text-sm"

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          6. Objetivos
        </h2>

        <div className="grid gap-5 sm:grid-cols-1">
          <div className="space-y-2">
            <Label
              htmlFor="objetivoGeral"
              className="font-medium text-foreground"
            >
              6.1. Objetivo Geral
            </Label>
            <textarea
              id="objetivoGeral"
              name="objetivoGeral"
              value={dadosFormulario.objetivoGeral}
              onChange={aoAlterarObjetivoGeral}
              rows={4}
              placeholder="Descreva o objetivo geral do projeto..."
              className={cn(classeDoTextarea)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label className="font-medium text-foreground">
                6.2. Objetivos Específicos
              </Label>
              <GenericButton
                variant="outline"
                size="sm"
                onClick={adicionarObjetivoEspecifico}
              >
                Adicionar objetivo
              </GenericButton>
            </div>

            {dadosFormulario.objetivosEspecificos.map((objetivo, indice) => (
              <div
                key={indice}
                className="space-y-2 rounded-lg border border-input bg-white p-4"
              >
                <Label
                  htmlFor={`objetivo-especifico-${indice}`}
                  className="font-medium text-foreground"
                >
                  Objetivo específico {indice + 1}
                </Label>
                <Input
                  id={`objetivo-especifico-${indice}`}
                  value={objetivo}
                  onChange={(e) =>
                    aoAlterarObjetivoEspecifico(indice, e.target.value)
                  }
                  placeholder="Ex: Realizar 10 oficinas de capacitação"
                  className="bg-white"
                />
                <div className="flex justify-end">
                  {dadosFormulario.objetivosEspecificos.length > 1 && (
                    <GenericButton
                      variant="destructive"
                      size="sm"
                      onClick={() => removerObjetivoEspecifico(indice)}
                    >
                      Excluir
                    </GenericButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioObjetivos
