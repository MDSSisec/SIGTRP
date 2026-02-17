/**
 * Serviços globais (compartilhados por várias features).
 * Serviços de domínio ficam nas features (ex.: features/projects/services).
 */

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
