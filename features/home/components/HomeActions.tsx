"use client"

import { useRouter } from "next/navigation"
import styles from "../styles/home.module.css"
import ActionCard from "@/components/shared/ActionCard/actionCard"
import { HOME_ACTIONS } from "../config/home.actions"

/** Grid de ações da home */
export function HomeActions() {
  const router = useRouter()

  return (
    <div className={styles.gridActions}>
      {HOME_ACTIONS.map((action) => (
        <ActionCard
          key={action.title}
          icon={action.icon}
          title={action.title}
          subtitle={action.subtitle}
          onClick={() => router.push(action.route)}
        />
      ))}
    </div>
  )
}
