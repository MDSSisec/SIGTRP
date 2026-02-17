"use client"

import styles from "@/features/home/styles/home.module.css"
import { HomeHeader } from "@/features/home/components/HomeHeader"
import { HomeTotals } from "@/features/home/components/HomeTotals"
import { HomeActions } from "@/features/home/components/HomeActions"
import { useHomeMetrics } from "@/features/home/hooks/useHomeMetrics"

/** Página principal da home do usuário interno */
export default function InternalUserHomePage() {
  const { totais, loading } = useHomeMetrics()

  if (loading) {
    return <div className={styles.container}>Carregando...</div>
  }

  return (
    <div className={styles.container}>
      <HomeHeader />
      <HomeTotals totais={totais} />
      <HomeActions />
    </div>
  )
}
