"use client"

import React from "react"
import { MetaCronogramaCard } from "./MetaCronogramaCard"
import type { ProjectFormSectionProps } from "./types"

export { EtapaItem } from "./EtapaItem"
export { MetaCronogramaCard } from "./MetaCronogramaCard"
export type { EtapaCronograma, MetaCronograma } from "./types"

export function EtapasCronograma({ projectId }: ProjectFormSectionProps) {
  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          8. Etapas e cronograma de execução
        </h2>
        <p className="text-muted-foreground text-sm">
          Conteúdo a ser implementado. {projectId && `Projeto #${projectId}`}
        </p>
      </section>
    </div>
  )
}
