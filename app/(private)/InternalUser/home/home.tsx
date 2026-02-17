"use client"

import styles from "./home.module.css"
import { useRouter } from "next/navigation"
import { ROUTE_PROJECTS_PAGE } from "@/constants/routes"
import ActionCard from "@/components/shared/ActionCard/actionCard"
import TotalCard from "@/components/shared/Totais/TotalCard/totalCard"
import { FolderPlus, FolderOpen, ClipboardList, CheckCircle, Search, Clock, LayoutGrid } from "lucide-react"
import { CONST_HOME_ACTIONS_CARDS_SUBTITLES, CONST_HOME_ACTIONS_CARDS_TITLES, CONST_HOME_DESCRIPTION, CONST_HOME_SUBTITLES, CONST_HOME_TITLES } from "@/constants/home"


// Remover os totais no futuro para puxar do banco
const totaisHome = [
  {
    title: CONST_HOME_TITLES.TITLE_TOTAL_PROJETOS,
    description: CONST_HOME_DESCRIPTION.DESCRIPTION_TOTAL_PROJETOS,
    icon: LayoutGrid,
    total: 20,
  },
  { title: CONST_HOME_TITLES.TITLE_APROVADOS,
    description: CONST_HOME_DESCRIPTION.DESCRIPTION_APROVADOS,
    icon: CheckCircle,
    total: 12,
  },
  { title: CONST_HOME_TITLES.TITLE_EM_ANALISE,
    description: CONST_HOME_DESCRIPTION.DESCRIPTION_EM_ANALISE,
    icon: Search,
    total: 5,
  },
  { title: CONST_HOME_TITLES.TITLE_COM_PENDENCIAS,
    description: CONST_HOME_DESCRIPTION.DESCRIPTION_COM_PENDENCIAS,
    icon: Clock,
    total: 3,
  },
  { title: CONST_HOME_TITLES.TITLE_CONCLUIDOS,
    description: CONST_HOME_DESCRIPTION.DESCRIPTION_CONCLUIDOS,
    icon: CheckCircle,
    total: 10,
  },
]

export function InternalUserHome() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {CONST_HOME_TITLES.TITLE_BEM_VINDO}
        </h1>

        <p className={styles.subtitle}>
          {CONST_HOME_SUBTITLES.SUBTITLE_TITLE}
        </p>
      </div>

      <div className={styles.gridTotals}>
        {totaisHome.map((item) => (
          <TotalCard
            key={item.title}
            title={item.title}
            totalCad={item.total}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>

      <div className={styles.gridActions}>
        <ActionCard
          icon={FolderPlus}
          title={CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_NOVO_PROJETO}
          subtitle={CONST_HOME_ACTIONS_CARDS_SUBTITLES.DESCRIPTION_ACTION_CARD_NOVO_PROJETO}
          onClick={() => router.push(ROUTE_PROJECTS_PAGE.INTERNAL_USER)}
        />

        <ActionCard
          icon={FolderOpen}
          title={CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_PROJETOS}
          subtitle={CONST_HOME_ACTIONS_CARDS_SUBTITLES.DESCRIPTION_ACTION_CARD_PROJETOS}
          onClick={() => router.push(ROUTE_PROJECTS_PAGE.INTERNAL_USER)}
        />

        <ActionCard
          icon={ClipboardList}
          title={CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_ANALISE_PENDENTES}
          subtitle={CONST_HOME_ACTIONS_CARDS_SUBTITLES.DESCRIPTION_ACTION_CARD_ANALISE_PENDENTES}
          onClick={() => router.push(ROUTE_PROJECTS_PAGE.INTERNAL_USER)}
        />
      </div>
    </div>
  )
}
