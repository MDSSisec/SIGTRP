"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"

const OPCOES = [
  { id: "artesaos", label: "Artesãos (ãs)" },
  { id: "catadores", label: "Catadores (as) de materiais recicláveis" },
  { id: "garimpeiros", label: "Garimpeiros (as), mineiros (as)" },
  { id: "pescadores_extrativistas", label: "Pescadores (as), extrativistas" },
  { id: "empresa_recuperada", label: "Trabalhadores (as) de empresa recuperada" },
  { id: "saude_mental", label: "Usuários do sistema de saúde mental" },
  { id: "outros", label: "Outros (Especificar): CadÚnico", comEspecificar: true as const },
  { id: "nao_se_aplica", label: "Não se aplica" },
]

function temEspecificar(op: (typeof OPCOES)[number]): op is (typeof OPCOES)[number] & { comEspecificar: true } {
  return "comEspecificar" in op && op.comEspecificar === true
}

type Props = { projectId?: string; onChange?: (dados: { selecoes: string[]; outrosEspecificar?: string }) => void }

export function PerfilSocioOcupacional({ projectId: _projectId, onChange }: Props) {
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
    <div className="space-y-8">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          16. Informe o perfil sócio-ocupacional predominante do público beneficiário
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
