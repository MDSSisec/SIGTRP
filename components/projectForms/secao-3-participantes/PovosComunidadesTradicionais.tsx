"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
const OPCOES = [
  { id: "indigenas", label: "Indígenas" },
  { id: "quilombolas", label: "Comunidades quilombolas" },
  { id: "terreiro", label: "Comunidades de terreiro" },
  { id: "caboclas", label: "Comunidades caboclas" },
  { id: "extrativistas", label: "Extrativistas" },
  { id: "ribeirinhos", label: "Ribeirinhos (as)" },
  { id: "pescadores", label: "Pescadores (as) artesanais" },
  { id: "outros", label: "Outros povos e comunidades tradicionais; Quais:", comEspecificar: true as const },
  { id: "nao_se_aplica", label: "Não se aplica" },
]

function temEspecificar(op: (typeof OPCOES)[number]): op is (typeof OPCOES)[number] & { comEspecificar: true } {
  return "comEspecificar" in op && op.comEspecificar === true
}

type Props = { projectId?: string; onChange?: (dados: { selecoes: string[]; outrosQuais?: string }) => void }

export function PovosComunidadesTradicionais({ projectId: _projectId, onChange }: Props) {
  const [selecoes, setSelecoes] = useState<string[]>([])
  const [outrosQuais, setOutrosQuais] = useState("")

  const toggle = (id: string) => {
    const next = selecoes.includes(id)
      ? selecoes.filter((s) => s !== id)
      : [...selecoes, id]
    setSelecoes(next)
    onChange?.({ selecoes: next, outrosQuais })
  }

  const handleOutrosChange = (value: string) => {
    setOutrosQuais(value)
    onChange?.({ selecoes, outrosQuais: value })
  }

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          15. Informe se o público beneficiário faz parte de algum destes povos ou comunidades tradicionais
        </h2>

        <div className="space-y-3">
          {OPCOES.map((op) => (
            <div key={op.id} className="flex flex-wrap items-center gap-3">
              <input
                type="checkbox"
                id={op.id}
                checked={selecoes.includes(op.id)}
                onChange={() => toggle(op.id)}
                className="h-4 w-4 rounded border-input bg-white text-primary focus:ring-2 focus:ring-primary/20"
              />
              <Label
                htmlFor={op.id}
                className="font-medium text-foreground cursor-pointer"
              >
                {op.label}
              </Label>
              {temEspecificar(op) && selecoes.includes(op.id) && (
                <Input
                  value={outrosQuais}
                  onChange={(e) => handleOutrosChange(e.target.value)}
                  placeholder="Especificar"
                  className="max-w-xs bg-white border-input"
                />
              )}
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
