"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useCronograma } from "./CronogramaContext"

interface PropsFormularioMetas {
  onChange?: (dados: { metas: string[] }) => void
  projectId?: string
}

function FormularioMetas({ onChange }: PropsFormularioMetas) {
  const { data, addMeta, updateMeta, removeMeta } = useCronograma()
  const metas = data.metas

  const aoAlterarTitulo = (indice: number, valor: string) => {
    updateMeta(indice, { ...metas[indice], titulo: valor })
    onChange?.({ metas: metas.map((m) => m.titulo) })
  }

  const adicionarMeta = () => {
    addMeta()
  }

  const removerMeta = (indice: number) => {
    removeMeta(indice)
  }

  if (metas.length === 0) {
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
          <p className="text-muted-foreground text-sm">
            Nenhuma meta cadastrada. Clique em &quot;Adicionar meta&quot; para
            começar.
          </p>
        </section>
        <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
          <GenericButton variant="editar" onClick={() => {}} />
          <GenericButton variant="salvar" onClick={() => {}} />
        </div>
      </div>
    )
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
          {metas.map((meta, indice) => (
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
                value={meta.titulo}
                onChange={(e) => aoAlterarTitulo(indice, e.target.value)}
                placeholder="Ex: Atender 500 famílias no território"
                className="bg-white"
              />
              <div className="flex justify-end">
                {metas.length > 1 && (
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
