"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type { CronogramaData, MetaCronograma } from "./etapas-cronograma/types"

interface CronogramaContextValue {
  data: CronogramaData
  setData: React.Dispatch<React.SetStateAction<CronogramaData>>
  addMeta: (meta?: MetaCronograma) => void
  updateMeta: (index: number, meta: MetaCronograma) => void
  removeMeta: (index: number) => void
}

const CronogramaContext = createContext<CronogramaContextValue | null>(null)

interface CronogramaProviderProps {
  children: React.ReactNode
  /** Dados iniciais (ex.: do projeto modelo quando id === 2) */
  initialData?: CronogramaData
}

export function CronogramaProvider({ children, initialData }: CronogramaProviderProps) {
  const [data, setData] = useState<CronogramaData>(initialData ?? { metas: [] })

  const addMeta = useCallback((meta?: MetaCronograma) => {
    setData((prev) => ({
      metas: [
        ...prev.metas,
        meta ?? {
          titulo: "",
          etapas: [],
          quadrosConteudosProgramaticos: [],
          quadroInsumosPorCurso: [],
        },
      ],
    }))
  }, [])

  const updateMeta = useCallback((index: number, updatedMeta: MetaCronograma) => {
    setData((prev) => {
      const novasMetas = [...prev.metas]
      novasMetas[index] = updatedMeta
      return { metas: novasMetas }
    })
  }, [])

  const removeMeta = useCallback((index: number) => {
    setData((prev) => ({
      metas: prev.metas.filter((_, i) => i !== index),
    }))
  }, [])

  const value: CronogramaContextValue = {
    data,
    setData,
    addMeta,
    updateMeta,
    removeMeta,
  }

  return (
    <CronogramaContext.Provider value={value}>
      {children}
    </CronogramaContext.Provider>
  )
}

export function useCronograma() {
  const ctx = useContext(CronogramaContext)
  if (!ctx) {
    throw new Error("useCronograma deve ser usado dentro de CronogramaProvider")
  }
  return ctx
}
