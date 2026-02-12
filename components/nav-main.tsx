"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
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

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: { title: string; url: string }[]
}

export function NavMain({
  items,
  onMenuItemClick,
}: {
  items: NavItem[]
  onMenuItemClick?: (parentTitle: string, childTitle: string) => void
}) {
  const pathname = usePathname()

  const getOpenKeyFromPath = useCallback(() => {
    const item = items.find((i) =>
      i.items?.some((sub) => sub.url === pathname)
    )
    return item?.title ?? null
  }, [items, pathname])

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
              <SidebarMenuItem className="mb-1">
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
                          isActive={pathname === subItem.url}
                        >
                          <Link
                            href={subItem.url}
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
