import { FolderPlus, FolderOpen, ClipboardList } from "lucide-react"
import { HomeAction } from "../types/home.types"
import { ROUTE_PROJECTS_PAGE } from "@/constants/routes"
import {
  CONST_HOME_ACTIONS_CARDS_TITLES,
  CONST_HOME_ACTIONS_CARDS_SUBTITLES,
} from "@/constants/home"

/** Configuração central das ações da home */
export const HOME_ACTIONS: HomeAction[] = [
  {
    title: CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_NOVO_PROJETO,
    subtitle: CONST_HOME_ACTIONS_CARDS_SUBTITLES.DESCRIPTION_ACTION_CARD_NOVO_PROJETO,
    icon: FolderPlus,
    route: ROUTE_PROJECTS_PAGE.INTERNAL_USER,
  },
  {
    title: CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_PROJETOS,
    subtitle: CONST_HOME_ACTIONS_CARDS_SUBTITLES.DESCRIPTION_ACTION_CARD_PROJETOS,
    icon: FolderOpen,
    route: ROUTE_PROJECTS_PAGE.INTERNAL_USER,
  },
  {
    title: CONST_HOME_ACTIONS_CARDS_TITLES.TITLE_ACTION_CARD_ANALISE_PENDENTES,
    subtitle: CONST_HOME_ACTIONS_CARDS_SUBTITLES.DESCRIPTION_ACTION_CARD_ANALISE_PENDENTES,
    icon: ClipboardList,
    route: ROUTE_PROJECTS_PAGE.INTERNAL_USER,
  },
]
