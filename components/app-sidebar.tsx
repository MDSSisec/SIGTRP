"use client"

import React, { Suspense } from "react"
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
import type { NavMainItem, SidebarConfig, SidebarTeam, SidebarUser } from "@/lib/services/sidebar"

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  /** Configuração do menu (itens, usuário, times). Se não passar, precisa passar user, teams e navMain. */
  config?: SidebarConfig
  user?: SidebarUser
  teams?: SidebarTeam[]
  navMain?: NavMainItem[]
  onMenuItemClick?: (parentTitle: string, childTitle: string) => void
  /** Maior espaçamento entre itens do menu (ex.: página de edição do projeto). */
  spaciousMenu?: boolean
}

export function AppSidebar({
  config,
  user,
  teams,
  navMain,
  onMenuItemClick,
  spaciousMenu,
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
      <SidebarContent className={spaciousMenu ? "gap-5" : "gap-1"}>
        <Suspense
          fallback={
            <div className="px-2 py-3 text-sidebar-foreground/70 text-sm">
              Carregando menu...
            </div>
          }
        >
          <NavMain items={n} onMenuItemClick={onMenuItemClick} spaciousMenu={spaciousMenu} />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={u} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
