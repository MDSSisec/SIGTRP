"use client"

import { useEffect, useState } from "react"
import { HomeTotal } from "../types/home.types"
import { getHomeMetrics } from "../services/home.service"

/** Hook que carrega as métricas da home (UI não conhece o service). */
export function useHomeMetrics() {
  const [totais, setTotais] = useState<HomeTotal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getHomeMetrics()
        setTotais(data)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { totais, loading }
}
