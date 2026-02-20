"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BreadcrumbProvider, useBreadcrumb } from "@/lib/contexts/breadcrumb-context"
import { getSidebarConfig } from "@/services/sidebar.service"
import { ModeToggle } from "@/components/mode-toggle"

function HeaderBreadcrumb({
  menuBreadcrumb,
}: {
  menuBreadcrumb: { parent: string; child: string } | null
}) {
  const pathname = usePathname()
  const { projectName } = useBreadcrumb()

  const isProjectsList = pathname === "/InternalUser/projects"
  const isProjectEdit = /^\/InternalUser\/projects\/(ted|convenio|emenda)\/[^/]+$/.test(pathname)
  const showProjectsBreadcrumb = isProjectsList || isProjectEdit

  const breadcrumbContent = useMemo(() => {
    if (showProjectsBreadcrumb) {
      const projectsUrl = "/InternalUser/projects"
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={projectsUrl}>Projetos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isProjectEdit ? (
                <BreadcrumbLink asChild>
                  <Link href={projectsUrl}>Todos os projetos</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>Todos os projetos</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {isProjectEdit && projectName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{projectName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      )
    }
    if (menuBreadcrumb) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{menuBreadcrumb.parent}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{menuBreadcrumb.child}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    }
    return null
  }, [showProjectsBreadcrumb, isProjectEdit, projectName, menuBreadcrumb])

  return (
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      {breadcrumbContent}
    </div>
  )
}

function PrivateShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuBreadcrumb, setMenuBreadcrumb] = useState<{
    parent: string
    child: string
  } | null>(null)

  const sidebarConfig = useMemo(
    () => getSidebarConfig(pathname /* , userRole */),
    [pathname]
  )

  const isProjectEditPage = /^\/InternalUser\/projects\/(ted|convenio|emenda)\/[^/]+$/.test(pathname)

  const handleMenuItemClick = (parentTitle: string, childTitle: string) => {
    setMenuBreadcrumb({ parent: parentTitle, child: childTitle })
  }

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar
        config={sidebarConfig}
        onMenuItemClick={handleMenuItemClick}
        spaciousMenu={isProjectEditPage}
      />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex min-w-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 overflow-hidden pr-4 bg-background border-b border-border/40">
          <HeaderBreadcrumb menuBreadcrumb={menuBreadcrumb} />
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>
        <main className="flex min-h-0 flex-1 flex-col gap-4 p-4 pt-0 min-w-0 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

/**
 * Shell que aparece em todas as páginas privadas.
 * O menu lateral muda conforme a rota (e no futuro conforme o usuário).
 * Na área de projetos, o breadcrumb mostra "Projetos > Todos os projetos" e, na edição, o nome do projeto.
 */
export function PrivateShell({ children }: { children: React.ReactNode }) {
  return (
    <BreadcrumbProvider>
      <PrivateShellInner>{children}</PrivateShellInner>
    </BreadcrumbProvider>
  )
}
