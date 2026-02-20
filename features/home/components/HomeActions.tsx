"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../styles/home.module.css"
import ActionCard from "@/components/shared/ActionCard/actionCard"
import { HOME_ACTIONS } from "../config/home.actions"
import { CONST_HOME_ACTIONS_CARDS_TITLES } from "@/constants/home"
import PopupNovoProjeto from "@/components/shared/PopUps/Generico/popUpNovoProjeto"

/** Grid de ações da home */
export function HomeActions() {
  const router = useRouter()
  const [isNovoProjetoOpen, setIsNovoProjetoOpen] = useState(false)

  const handleActionClick = (action: typeof HOME_ACTIONS[0]) => {
    if (action.title === CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_NOVO_PROJETO) {
      setIsNovoProjetoOpen(true)
    } else {
      router.push(action.route)
    }
  }

  return (
    <>
      <div className={styles.gridActions}>
        {HOME_ACTIONS.map((action) => (
          <ActionCard
            key={action.title}
            icon={action.icon}
            title={action.title}
            subtitle={action.subtitle}
            onClick={() => handleActionClick(action)}
          />
        ))}
      </div>
      
      <PopupNovoProjeto 
        open={isNovoProjetoOpen} 
        onClose={() => setIsNovoProjetoOpen(false)} 
      />
    </>
  )
}
