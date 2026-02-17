import type { LucideIcon } from "lucide-react"

export type NavMainSubItem = {
  title: string
  url: string
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

export function getPrivateAreaFromPath(pathname: string): PrivateArea | null {
  const segment = pathname.split("/").filter(Boolean)[0]
  return segment ?? null
}
