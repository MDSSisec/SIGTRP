import { GalleryVerticalEnd } from "lucide-react"
import type { SidebarConfig } from "./sidebar-types"

/**
 * Menu do usuário externo (apenas Projetos).
 */
export const externalUserHomeMenuConfig: SidebarConfig = {
  user: {
    name: "UserName",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    { name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" },
  ],
  navMain: [
    {
      title: "Projetos",
      url: "/ExternalUser/projects",
      isActive: true,
      items: [{ title: "Ver projetos", url: "/ExternalUser/projects" }],
    },
  ],
}
