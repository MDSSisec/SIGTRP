"use client"

import React from "react"
import { EtapaItem } from "./EtapaItem"
import type { MetaCronograma } from "./types"

interface MetaCronogramaCardProps {
  meta: MetaCronograma
  onAddEtapa?: (metaId: string) => void
}

export function MetaCronogramaCard({ meta, onAddEtapa }: MetaCronogramaCardProps) {
  return (
    <div className="rounded-xl border border-input bg-muted/50 p-6">
      <h3 className="text-base font-semibold text-foreground border-b pb-2 mb-4">
        {meta.titulo}
      </h3>
      <div className="space-y-3">
        {meta.etapas.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhuma etapa cadastrada.</p>
        ) : (
          meta.etapas.map((etapa) => (
            <EtapaItem key={etapa.id} etapa={etapa} />
          ))
        )}
      </div>
    </div>
  )
}
