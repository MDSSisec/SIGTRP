import type { SidebarConfig, UserRole } from "@/types/sidebar"
import {
  dashboardMenuConfig,
  internalUserHomeMenuConfig,
  externalUserHomeMenuConfig,
} from "@/services/sidebar.service"

export type {
  NavMainItem,
  SidebarConfig,
  SidebarUser,
  SidebarTeam,
  UserRole,
  PrivateArea,
} from "@/types/sidebar"
export { getPrivateAreaFromPath } from "@/types/sidebar"

/**
 * Mapa rota -> config do menu.
 * Rotas privadas: /{tipoUsuario}/{pagina}
 */
const routeMenuMap: Record<string, SidebarConfig> = {
  "/InternalUser/dashboard": dashboardMenuConfig,
  "/InternalUser/home": internalUserHomeMenuConfig,
  "/InternalUser": internalUserHomeMenuConfig,
  "/ExternalUser/home": externalUserHomeMenuConfig,
  "/ExternalUser/projects": externalUserHomeMenuConfig,
  "/ExternalUser": externalUserHomeMenuConfig,
}

/**
 * Retorna a config do sidebar para a rota (e opcionalmente o role do usuário).
 * Em /InternalUser/projects/:id usa o menu do formulário TRP (I a VI).
 */
export function getSidebarConfig(pathname: string, _userRole?: UserRole): SidebarConfig {
  // Página de edição do projeto: menu com itens do formulário TRP
  if (/^\/InternalUser\/projects\/[^/]+$/.test(pathname)) {
    return dashboardMenuConfig
  }

  const segments = pathname.split("/").filter(Boolean)
  const pathKey = segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : `/${segments[0] ?? ""}`

  return (
    routeMenuMap[pathKey] ??
    routeMenuMap[`/${segments[0]}`] ??
    internalUserHomeMenuConfig
  )
}
