"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"

const OPCOES = [
  { id: "centros_pop", label: "Centros de Referência Especializado para População em Situação de Rua (Centros POP)" },
  { id: "caps", label: "Centros de Atenção Psicossocial (CAPS)" },
  { id: "bolsa_familia", label: "Bolsa Família" },
  { id: "previdencia_bpc", label: "Previdência Social ou Benefício de Prestação Continuada" },
  { id: "outros", label: "Outros (Especificar):", comEspecificar: true as const },
]

function temEspecificar(op: (typeof OPCOES)[number]): op is (typeof OPCOES)[number] & { comEspecificar: true } {
  return "comEspecificar" in op && op.comEspecificar === true
}

type Props = { projectId?: string; onChange?: (dados: { selecoes: string[]; outrosEspecificar?: string }) => void }

export function ServicosAcessados({ projectId: _projectId, onChange }: Props) {
  const [selecoes, setSelecoes] = useState<string[]>([])
  const [outrosEspecificar, setOutrosEspecificar] = useState("")

  const toggle = (id: string) => {
    const next = selecoes.includes(id)
      ? selecoes.filter((s) => s !== id)
      : [...selecoes, id]
    setSelecoes(next)
    onChange?.({ selecoes: next, outrosEspecificar })
  }

  const handleOutrosChange = (value: string) => {
    setOutrosEspecificar(value)
    onChange?.({ selecoes, outrosEspecificar: value })
  }

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          17. Informe se o público beneficiário está acessando alguns dos seguintes serviços
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
                  value={outrosEspecificar}
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
