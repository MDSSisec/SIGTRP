"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
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

function FormularioIdentificacaoProjeto({
  onChange,
}: PropsFormularioIdentificacaoProjeto) {
  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProjeto>({
    nomeProjeto: "",
    localExecucao: "",
    duracao: "",
    resumoProjeto: "",
  })

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
          Identificação do Projeto
        </h2>

        <div className="grid gap-5 sm:grid-cols-1">
          <div className="space-y-2">
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
              className="bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
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
              className="bg-white"
            />
            </div>
            <div className="space-y-2">
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
              className="bg-white"
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
