"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/project-data-context"
import { cn } from "@/lib/utils"

interface DadosJustificativa {
  caracterizacaoInteresses: string
  publicoAlvo: string
  problema: string
  resultadosEsperados: string
  relacaoPrograma: string
}

interface PropsFormularioJustificativa {
  onChange?: (dados: DadosJustificativa) => void
  projectId?: string
}

const VAZIO: DadosJustificativa = {
  caracterizacaoInteresses: "",
  publicoAlvo: "",
  problema: "",
  resultadosEsperados: "",
  relacaoPrograma: "",
}

function getInicialJustificativa(projectData: ReturnType<typeof useProjectData>): DadosJustificativa {
  const d = projectData?.descricao_projeto
  const j = d?.justificativa_motivacao
  if (!d && !j) return VAZIO
  return {
    caracterizacaoInteresses: j?.caracterizacao_interesses_reciprocos ?? "",
    publicoAlvo: d?.publico_alvo ?? j?.publico_alvo ?? "",
    problema: d?.problema ?? j?.problema ?? "",
    resultadosEsperados: d?.resultados_esperados ?? j?.resultados_esperados ?? "",
    relacaoPrograma: d?.relacao_proposta_programa ?? j?.relacao_proposta_programa ?? "",
  }
}

function FormularioJustificativa({ onChange, projectId }: PropsFormularioJustificativa) {
  const projectData = useProjectData()
  const iniciais =
    projectId === "2" && projectData ? getInicialJustificativa(projectData) : VAZIO
  const [dadosFormulario, setDadosFormulario] = useState<DadosJustificativa>(iniciais)

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialJustificativa(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const classeDoTextarea =
    "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] min-h-[8rem] resize-y md:text-sm"

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          5. Justificativa e motivação para celebração do instrumento
        </h2>

        <div className="grid gap-5 sm:grid-cols-1">
          <div className="space-y-2">
            <Label
              htmlFor="caracterizacaoInteresses"
              className="font-medium text-foreground"
            >
              5.1. Caracterização dos interesses recíprocos
            </Label>
            <textarea
              id="caracterizacaoInteresses"
              name="caracterizacaoInteresses"
              value={dadosFormulario.caracterizacaoInteresses}
              onChange={aoAlterar}
              rows={5}
              placeholder="Descreva os interesses recíprocos entre as partes..."
              className={cn(classeDoTextarea)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publicoAlvo" className="font-medium text-foreground">
              5.2. Público-alvo
            </Label>
            <textarea
              id="publicoAlvo"
              name="publicoAlvo"
              value={dadosFormulario.publicoAlvo}
              onChange={aoAlterar}
              rows={4}
              placeholder="Descreva o público-alvo da proposta..."
              className={cn(classeDoTextarea)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problema" className="font-medium text-foreground">
              5.3. Problema a ser resolvido
            </Label>
            <textarea
              id="problema"
              name="problema"
              value={dadosFormulario.problema}
              onChange={aoAlterar}
              rows={5}
              placeholder="Descreva o problema que a proposta busca resolver..."
              className={cn(classeDoTextarea)}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="resultadosEsperados"
              className="font-medium text-foreground"
            >
              5.4. Resultados esperados
            </Label>
            <textarea
              id="resultadosEsperados"
              name="resultadosEsperados"
              value={dadosFormulario.resultadosEsperados}
              onChange={aoAlterar}
              rows={4}
              placeholder="Descreva os resultados esperados..."
              className={cn(classeDoTextarea)}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="relacaoPrograma"
              className="font-medium text-foreground"
            >
              5.5. Relação entre a proposta e os objetivos e diretrizes do
              programa
            </Label>
            <textarea
              id="relacaoPrograma"
              name="relacaoPrograma"
              value={dadosFormulario.relacaoPrograma}
              onChange={aoAlterar}
              rows={5}
              placeholder="Descreva a relação da proposta com os objetivos do programa..."
              className={cn(classeDoTextarea)}
            />
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

export default FormularioJustificativa
