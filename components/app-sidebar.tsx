"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { NavMainItem, SidebarConfig, SidebarTeam, SidebarUser } from "@/lib/sidebar-config"

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  /** Configuração do menu (itens, usuário, times). Se não passar, precisa passar user, teams e navMain. */
  config?: SidebarConfig
  user?: SidebarUser
  teams?: SidebarTeam[]
  navMain?: NavMainItem[]
  onMenuItemClick?: (parentTitle: string, childTitle: string) => void
}

export function AppSidebar({
  config,
  user,
  teams,
  navMain,
  onMenuItemClick,
  ...props
}: AppSidebarProps) {
  const u = user ?? config?.user
  const t = teams ?? config?.teams
  const n = navMain ?? config?.navMain

  if (!u || !t || !n) {
    console.warn("AppSidebar: informe config ou (user, teams e navMain).")
    return null
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={t} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={n} onMenuItemClick={onMenuItemClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={u} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
