"use client"

import React from "react"
import type { EtapaCronograma } from "./types"

interface EtapaItemProps {
  etapa: EtapaCronograma
  onEdit?: (etapa: EtapaCronograma) => void
  onRemove?: (id: string) => void
}

export function EtapaItem({ etapa, onEdit, onRemove }: EtapaItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-input bg-white p-3">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground">{etapa.titulo}</p>
        {etapa.descricao && (
          <p className="text-muted-foreground text-sm">{etapa.descricao}</p>
        )}
        {(etapa.dataInicio || etapa.dataFim) && (
          <p className="text-muted-foreground mt-1 text-xs">
            {etapa.dataInicio && `Início: ${etapa.dataInicio}`}
            {etapa.dataInicio && etapa.dataFim && " · "}
            {etapa.dataFim && `Fim: ${etapa.dataFim}`}
          </p>
        )}
      </div>
    </div>
  )
}
