"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/contexts/project-data-context"
import { cn } from "@/lib/utils"

interface DadosIdentificacaoProjeto {
  nomeProjeto: string
  localExecucao: string
  duracao: string
  resumoProjeto: string
}

interface PropsFormularioIdentificacaoProjeto {
  onChange?: (dados: DadosIdentificacaoProjeto) => void
  projectId?: string
}

function getInicialIdentificacao(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoProjeto {
  const p = projectData?.identificacao?.projeto
  if (!p) return { nomeProjeto: "", localExecucao: "", duracao: "", resumoProjeto: "" }
  return {
    nomeProjeto: p.nome ?? "",
    localExecucao: p.local_execucao ?? "",
    duracao: p.duracao ?? "",
    resumoProjeto: p.resumo ?? "",
  }
}

const VAZIO: DadosIdentificacaoProjeto = {
  nomeProjeto: "",
  localExecucao: "",
  duracao: "",
  resumoProjeto: "",
}

function FormularioIdentificacaoProjeto({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoProjeto) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProjeto>(() =>
    projectId === "2" && projectData ? getInicialIdentificacao(projectData) : VAZIO
  )

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialIdentificacao(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const classeDoInput =
    "border-input placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          1. Identificação do Projeto
        </h2>

        <div className="grid min-w-0 gap-5 grid-cols-1">
          <div className="space-y-2 min-w-0">
            <Label htmlFor="nomeProjeto" className="font-medium text-foreground">
              Nome do Projeto
            </Label>
            <Input
              id="nomeProjeto"
              type="text"
              name="nomeProjeto"
              placeholder="Ex: Programa Acredita no Primeiro Passo"
              value={dadosFormulario.nomeProjeto}
              onChange={aoAlterar}
              className="bg-white min-w-0"
            />
          </div>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 min-w-0">
            <div className="space-y-2 min-w-0">
              <Label htmlFor="localExecucao" className="font-medium text-foreground">
                Local de Execução
              </Label>
            <Input
              id="localExecucao"
              type="text"
              name="localExecucao"
              placeholder="Ex: Aracaju - SE"
              value={dadosFormulario.localExecucao}
              onChange={aoAlterar}
              className="bg-white min-w-0"
            />
            </div>
            <div className="space-y-2 min-w-0">
              <Label htmlFor="duracao" className="font-medium text-foreground">
                Duração
              </Label>
            <Input
              id="duracao"
              type="text"
              name="duracao"
              placeholder="Ex: 6 meses"
              value={dadosFormulario.duracao}
              onChange={aoAlterar}
              className="bg-white min-w-0"
            />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          Resumo do Projeto
        </h2>
        <div className="space-y-2">
          <Label htmlFor="resumoProjeto" className="font-medium text-foreground">
            Descreva de forma objetiva o projeto
          </Label>
          <textarea
            id="resumoProjeto"
            name="resumoProjeto"
            placeholder="Descreva de forma objetiva o projeto..."
            value={dadosFormulario.resumoProjeto}
            onChange={aoAlterar}
            rows={6}
            className={cn(
              classeDoInput,
              "min-h-[8rem] resize-y py-2 md:text-sm"
            )}
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoProjeto
