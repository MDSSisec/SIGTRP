"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { Etapa } from "./types"

interface Props {
  numeroMeta: number
  numeroEtapa: number
  etapa: Etapa
  onChange: (etapa: Etapa) => void
  onDelete: () => void
}

const EtapaItem: React.FC<Props> = ({
  numeroMeta,
  numeroEtapa,
  etapa,
  onChange,
  onDelete,
}) => {
  const handleChange = (field: keyof Etapa, value: string | number) => {
    onChange({
      ...etapa,
      [field]: field === "valor" ? Number(value) : value,
    })
  }

  return (
    <div className="w-full min-w-0 rounded-lg border border-input bg-muted/30 p-4 space-y-4">
      <div className="flex justify-between items-center gap-2 w-full min-w-0">
        <h4 className="font-medium text-foreground min-w-0 truncate">
          Etapa {numeroMeta}.{numeroEtapa}
        </h4>

        <GenericButton variant="destructive" size="sm" onClick={onDelete} className="shrink-0">
          Excluir
        </GenericButton>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-foreground">Descrição</Label>
        <textarea
          value={etapa.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          placeholder="Descrição da etapa"
          rows={3}
          className="w-full min-w-0 rounded-md border border-input bg-background dark:bg-input/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-y min-h-[4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="font-medium text-foreground">Valor (R$)</Label>
          <Input
            type="number"
            value={etapa.valor || ""}
            onChange={(e) =>
              handleChange("valor", e.target.value === "" ? 0 : e.target.value)
            }
            placeholder="0"
            className="bg-background dark:bg-input/30"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-foreground">Início (mês/ano)</Label>
          <Input
            type="month"
            value={etapa.inicio}
            onChange={(e) => handleChange("inicio", e.target.value)}
            className="bg-background dark:bg-input/30"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-foreground">
            Término (mês/ano)
          </Label>
          <Input
            type="month"
            value={etapa.termino}
            onChange={(e) => handleChange("termino", e.target.value)}
            className="bg-background dark:bg-input/30"
          />
        </div>
      </div>
    </div>
  )
}

export default EtapaItem
