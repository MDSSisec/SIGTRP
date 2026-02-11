"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getSidebarConfig } from "@/lib/sidebar-config"

/**
 * Shell que aparece em todas as páginas privadas.
 * O menu lateral muda conforme a rota (e no futuro conforme o usuário).
 */
export function PrivateShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [breadcrumb, setBreadcrumb] = useState<{
    parent: string
    child: string
  } | null>(null)

  // Para variar o menu por usuário: use o role da sessão, ex.:
  // const { data: session } = useSession(); const userRole = session?.user?.role;
  const sidebarConfig = useMemo(
    () => getSidebarConfig(pathname /* , userRole */),
    [pathname]
  )

  const handleMenuItemClick = (parentTitle: string, childTitle: string) => {
    setBreadcrumb({ parent: parentTitle, child: childTitle })
  }

  return (
    <SidebarProvider>
      <AppSidebar
        config={sidebarConfig}
        onMenuItemClick={handleMenuItemClick}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {breadcrumb && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb.parent}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb.child}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
