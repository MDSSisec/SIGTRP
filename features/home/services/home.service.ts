import {
  CheckCircle,
  Search,
  Clock,
  LayoutGrid,
} from "lucide-react"
import { HomeTotal } from "../types/home.types"
import {
  CONST_HOME_TITLES,
  CONST_HOME_DESCRIPTION,
} from "@/constants/home"

/**
 * Busca métricas da home.
 * Futuramente: fetch / axios / Supabase.
 */
export async function getHomeMetrics(): Promise<HomeTotal[]> {
  // TODO: substituir por chamada real à API
  return [
    {
      title: CONST_HOME_TITLES.TITLE_TOTAL_PROJETOS,
      description: CONST_HOME_DESCRIPTION.DESCRIPTION_TOTAL_PROJETOS,
      icon: LayoutGrid,
      total: 20,
    },
    {
      title: CONST_HOME_TITLES.TITLE_APROVADOS,
      description: CONST_HOME_DESCRIPTION.DESCRIPTION_APROVADOS,
      icon: CheckCircle,
      total: 12,
    },
    {
      title: CONST_HOME_TITLES.TITLE_EM_ANALISE,
      description: CONST_HOME_DESCRIPTION.DESCRIPTION_EM_ANALISE,
      icon: Search,
      total: 5,
    },
    {
      title: CONST_HOME_TITLES.TITLE_COM_PENDENCIAS,
      description: CONST_HOME_DESCRIPTION.DESCRIPTION_COM_PENDENCIAS,
      icon: Clock,
      total: 3,
    },
    {
      title: CONST_HOME_TITLES.TITLE_CONCLUIDOS,
      description: CONST_HOME_DESCRIPTION.DESCRIPTION_CONCLUIDOS,
      icon: CheckCircle,
      total: 10,
    },
  ]
}
