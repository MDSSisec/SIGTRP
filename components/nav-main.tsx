"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"

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

type NavSubItem = {
  title: string
  url: string
  slug?: string
}

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavSubItem[]
}

export function NavMain({
  items,
  onMenuItemClick,
  spaciousMenu,
}: {
  items: NavItem[]
  onMenuItemClick?: (parentTitle: string, childTitle: string) => void
  /** Maior espaçamento entre itens (ex.: página de edição do projeto). */
  spaciousMenu?: boolean
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const secao = searchParams.get("secao")

  const projectId = useMemo(() => {
    const m = pathname.match(/^\/InternalUser\/projects\/([^/]+)/)
    return m?.[1] ?? null
  }, [pathname])

  const getOpenKeyFromPath = useCallback(() => {
    if (projectId) {
      if (secao) {
        const item = items.find((i) =>
          i.items?.some((sub) => "slug" in sub && sub.slug === secao)
        )
        return item?.title ?? null
      }
      return items[0]?.title ?? null
    }
    const item = items.find((i) =>
      i.items?.some((sub) => sub.url === pathname)
    )
    return item?.title ?? null
  }, [items, pathname, projectId, secao])

  const getSubItemHref = useCallback(
    (sub: NavSubItem) => {
      if (projectId && sub.slug) {
        return `/InternalUser/projects/${projectId}?secao=${sub.slug}`
      }
      return sub.url
    },
    [projectId]
  )

  const isSubItemActive = useCallback(
    (sub: NavSubItem) => {
      if (projectId && sub.slug) {
        const currentSecao = secao ?? "identificacao-projeto"
        return currentSecao === sub.slug
      }
      return pathname === sub.url
    },
    [projectId, pathname, secao]
  )

  const [openKey, setOpenKey] = useState<string | null>(() =>
    getOpenKeyFromPath()
  )

  useEffect(() => {
    const key = getOpenKeyFromPath()
    if (key !== null) setOpenKey(key)
  }, [getOpenKeyFromPath])

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
                          isActive={isSubItemActive(subItem)}
                        >
                          <Link
                            href={getSubItemHref(subItem)}
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
