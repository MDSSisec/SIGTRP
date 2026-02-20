"use client"

import React, { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/contexts/project-data-context"
import { cn } from "@/lib/utils"

const OPCOES = [
  { id: "indigenas", label: "Indígenas" },
  { id: "quilombolas", label: "Comunidades quilombolas" },
  { id: "terreiro", label: "Comunidades de terreiro" },
  { id: "caboclas", label: "Comunidades caboclas" },
  { id: "extrativistas", label: "Extrativistas" },
  { id: "ribeirinhos", label: "Ribeirinhos (as)" },
  { id: "pescadores", label: "Pescadores (as) artesanais" },
  { id: "outros", label: "Outros povos e comunidades tradicionais. Quais:", comEspecificar: true as const },
  { id: "nao_se_aplica", label: "Não se aplica" },
]

function temEspecificar(op: (typeof OPCOES)[number]): op is (typeof OPCOES)[number] & { comEspecificar: true } {
  return "comEspecificar" in op && op.comEspecificar === true
}

function getInicialFromModel(projectData: ReturnType<typeof useProjectData>): { selecoes: string[]; outrosQuais: string } {
  const data = (projectData as { participantes?: { povos_comunidades_tradicionais?: unknown } } | null)?.participantes?.povos_comunidades_tradicionais
  if (!data || typeof data !== "object" || !Array.isArray((data as { opcoes?: unknown }).opcoes)) {
    return { selecoes: [], outrosQuais: "" }
  }
  const opcoes = (data as { opcoes: { label: string; selecionado: boolean; especificar?: string | null }[] }).opcoes
  const selecoes = OPCOES.filter((op, i) => opcoes[i]?.selecionado).map((op) => op.id)
  const outrosOp = opcoes.find((o) => o.label.includes("Outros") && o.especificar != null)
  const outrosQuais = outrosOp && typeof outrosOp.especificar === "string" ? outrosOp.especificar : ""
  return { selecoes, outrosQuais }
}

type Props = {
  projectId?: string
  readOnlyView?: boolean
  onChange?: (dados: { selecoes: string[]; outrosQuais?: string }) => void
}

export function PovosComunidadesTradicionais({ projectId, readOnlyView, onChange }: Props) {
  const projectData = useProjectData()
  const [selecoes, setSelecoes] = useState<string[]>(() =>
    projectId === "2" && projectData ? getInicialFromModel(projectData).selecoes : []
  )
  const [outrosQuais, setOutrosQuais] = useState(() =>
    projectId === "2" && projectData ? getInicialFromModel(projectData).outrosQuais : ""
  )

  useEffect(() => {
    if (projectId === "2" && projectData) {
      const init = getInicialFromModel(projectData)
      setSelecoes(init.selecoes)
      setOutrosQuais(init.outrosQuais)
    }
  }, [projectId, projectData])

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

  const pergunta =
    ((projectData as { participantes?: { povos_comunidades_tradicionais?: { pergunta?: string } } } | null)?.participantes?.povos_comunidades_tradicionais as { pergunta?: string } | undefined)?.pergunta ??
    "15. Informe se o público beneficiário faz parte de algum destes povos ou comunidades tradicionais."

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          {pergunta}
        </h2>

        <div className="space-y-3">
          {OPCOES.map((op) => (
            <div key={op.id} className="flex flex-wrap items-center gap-3">
              {readOnlyView ? (
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-input bg-white",
                    selecoes.includes(op.id) && "border-[#0a0a0a]"
                  )}
                  aria-hidden
                >
                  {selecoes.includes(op.id) && (
                    <Check className="h-2.5 w-2.5 text-[#0a0a0a]" strokeWidth={3} />
                  )}
                </span>
              ) : (
                <input
                  type="checkbox"
                  id={op.id}
                  checked={selecoes.includes(op.id)}
                  onChange={() => toggle(op.id)}
                  className="h-4 w-4 rounded border-input bg-white text-primary focus:ring-2 focus:ring-primary/20"
                />
              )}
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
                  disabled={readOnlyView}
                  readOnly={readOnlyView}
                  className="max-w-xs bg-white border-input"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {!readOnlyView && (
        <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
          <GenericButton variant="editar" onClick={() => {}} />
          <GenericButton variant="salvar" onClick={() => {}} />
        </div>
      )}
    </div>
  )
}
