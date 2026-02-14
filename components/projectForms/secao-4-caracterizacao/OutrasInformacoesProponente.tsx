"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { cn } from "@/lib/utils"

interface DadosOutrasInformacoesProponente {
  texto: string
}

interface PropsFormularioOutrasInformacoesProponente {
  onChange?: (dados: DadosOutrasInformacoesProponente) => void
  projectId?: string
}

const classeDoTextarea =
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] min-h-[8rem] resize-y md:text-sm"

function FormularioOutrasInformacoesProponente({
  onChange,
}: PropsFormularioOutrasInformacoesProponente) {
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosOutrasInformacoesProponente>({ texto: "" })

  const aoAlterar = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const dadosAtualizados = { texto: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          18. Outras informações julgadas apropriadas sobre o(a) proponente
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
            value={dadosFormulario.texto}
            onChange={aoAlterar}
            placeholder="Descreva outras informações relevantes sobre o(a) proponente..."
            rows={8}
            className={cn(classeDoTextarea)}
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

export function OutrasInformacoesProponente(
  props: PropsFormularioOutrasInformacoesProponente
) {
  return <FormularioOutrasInformacoesProponente {...props} />
}
