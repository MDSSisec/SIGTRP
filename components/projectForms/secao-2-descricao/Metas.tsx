"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/components/shared/Buttons/genericButton"

interface DadosMetas {
  metas: string[]
}

interface PropsFormularioMetas {
  onChange?: (dados: DadosMetas) => void
  projectId?: string
}

function FormularioMetas({ onChange }: PropsFormularioMetas) {
  const [dadosFormulario, setDadosFormulario] = useState<DadosMetas>({
    metas: [""],
  })

  const aoAlterarMeta = (indice: number, valor: string) => {
    const metasAtualizadas = [...dadosFormulario.metas]
    metasAtualizadas[indice] = valor
    const dadosAtualizados = { metas: metasAtualizadas }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const adicionarMeta = () => {
    const dadosAtualizados = {
      metas: [...dadosFormulario.metas, ""],
    }
    setDadosFormulario(dadosAtualizados)
  }

  const removerMeta = (indice: number) => {
    const metasAtualizadas = dadosFormulario.metas.filter((_, i) => i !== indice)
    const dadosAtualizados = { metas: metasAtualizadas }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Metas
          </h2>
          <GenericButton variant="outline" size="sm" onClick={adicionarMeta}>
            Adicionar meta
          </GenericButton>
        </div>

        <div className="space-y-4">
          {dadosFormulario.metas.map((meta, indice) => (
            <div
              key={indice}
              className="space-y-2 rounded-lg border border-input bg-white p-4"
            >
              <Label
                htmlFor={`meta-${indice}`}
                className="font-medium text-foreground"
              >
                Meta {indice + 1}
              </Label>
              <Input
                id={`meta-${indice}`}
                value={meta}
                onChange={(e) => aoAlterarMeta(indice, e.target.value)}
                placeholder="Ex: Atender 500 famílias no território"
                className="bg-white"
              />
              <div className="flex justify-end">
                {dadosFormulario.metas.length > 1 && (
                  <GenericButton
                    variant="destructive"
                    size="sm"
                    onClick={() => removerMeta(indice)}
                  >
                    Excluir
                  </GenericButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioMetas
