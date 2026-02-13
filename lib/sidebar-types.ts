import type { LucideIcon } from "lucide-react"

export type NavMainSubItem = {
  title: string
  url: string
  /** Slug para formulário do projeto (ex.: identificacao-projeto). Usado em /InternalUser/projects/[id]?secao= */
  slug?: string
}

export type NavMainItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavMainSubItem[]
}

export type SidebarUser = {
  name: string
  email: string
  avatar: string
}

export type SidebarTeam = {
  name: string
  logo: LucideIcon
  plan: string
}

export type SidebarConfig = {
  user: SidebarUser
  teams: SidebarTeam[]
  navMain: NavMainItem[]
}

export type UserRole = "admin" | "user"

export type PrivateArea = "InternalUser" | "ExternalUser" | string

/**
 * Lê o tipo de usuário/área a partir do pathname (ex.: /InternalUser/dashboard -> "InternalUser").
 */
export function getPrivateAreaFromPath(pathname: string): PrivateArea | null {
  const segment = pathname.split("/").filter(Boolean)[0]
  return segment ?? null
}
