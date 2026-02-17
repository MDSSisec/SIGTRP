"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

import { DEFAULT_FORM_SECTION } from "@/features/projects/forms"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { NavMainItem, NavMainSubItem } from "@/types/sidebar"
import {
  getNavOpenKeyFromPath,
  getSubItemHref,
  isSubItemActive,
} from "@/lib/utils"

export function NavMain({
  items,
  onMenuItemClick,
  spaciousMenu,
}: {
  items: NavMainItem[]
  onMenuItemClick?: (parentTitle: string, childTitle: string) => void
  /** Maior espaçamento entre itens (ex.: página de edição do projeto). */
  spaciousMenu?: boolean
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const secao = searchParams.get("secao")

  const projectId = pathname.match(/^\/InternalUser\/projects\/([^/]+)/)?.[1] ?? null

  const getOpenKey = useCallback(
    () => getNavOpenKeyFromPath(items, pathname, secao, projectId),
    [items, pathname, projectId, secao]
  )

  const getSubItemHrefFor = useCallback(
    (sub: NavMainSubItem) => getSubItemHref(projectId, sub),
    [projectId]
  )

  const isSubItemActiveCheck = useCallback(
    (sub: NavMainSubItem) =>
      isSubItemActive(sub, pathname, secao, projectId, DEFAULT_FORM_SECTION),
    [pathname, projectId, secao]
  )

  const [openKey, setOpenKey] = useState<string | null>(getOpenKey)

  useEffect(() => {
    const key = getOpenKey()
    if (key !== null) setOpenKey(key)
  }, [getOpenKey])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Itens do Projeto</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openKey === item.title
          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={(open) => setOpenKey(open ? item.title : null)}
              className="group/collapsible"
            >
              <SidebarMenuItem className={spaciousMenu ? "mb-5" : "mb-1"}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isSubItemActiveCheck(subItem)}
                        >
                          <Link
                            href={getSubItemHrefFor(subItem)}
                            onClick={() =>
                              onMenuItemClick?.(item.title, subItem.title)
                            }
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
