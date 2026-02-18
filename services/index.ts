/**
 * Serviços globais (compartilhados por várias features).
 */

export {
  getStatusStyle,
  statusToStepIndex,
  STATUS_PROJETO_LIST,
  STATUS_PROJETO_STEPS,
} from "./project.service"
export type { StatusProjeto } from "./project.service"

export {
  getUsuarioStatusStyle,
} from "./user.service"

export {
  getSidebarConfig,
  dashboardMenuConfig,
  internalUserHomeMenuConfig,
  externalUserHomeMenuConfig,
  getPrivateAreaFromPath,
} from "./sidebar.service"
export type {
  NavMainItem,
  SidebarConfig,
  SidebarUser,
  SidebarTeam,
  UserRole,
  PrivateArea,
} from "./sidebar.service"
