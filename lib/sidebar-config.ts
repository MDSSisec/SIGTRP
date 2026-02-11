import type { SidebarConfig, UserRole } from "./sidebar-types"
import { dashboardMenuConfig, internalUserHomeMenuConfig } from "./internal-user"
import { externalUserHomeMenuConfig } from "./external-user"

export type {
  NavMainItem,
  SidebarConfig,
  SidebarUser,
  SidebarTeam,
  UserRole,
  PrivateArea,
} from "./sidebar-types"
export { getPrivateAreaFromPath } from "./sidebar-types"

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
 */
export function getSidebarConfig(pathname: string, _userRole?: UserRole): SidebarConfig {
  const segments = pathname.split("/").filter(Boolean)
  const pathKey = segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : `/${segments[0] ?? ""}`

  return (
    routeMenuMap[pathKey] ??
    routeMenuMap[`/${segments[0]}`] ??
    internalUserHomeMenuConfig
  )
}
