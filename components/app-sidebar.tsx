"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "UserName",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SIGTRP",
      logo: GalleryVerticalEnd,
      plan: "MDS",
    },
  ],
  navMain: [
    {
      title: "I - Identificação",
      url: "#",
      // icon: SquareTerminal,
      isActive: true,
      items: [
        {title: "1. Identificação do Projeto", url: "#"},
        {title: "2. Identificação do(a) proponente", url: "#"},
        {title: "3. Identificação do representante legal do(a) proponente", url: "#"},
      ],
    },
    {
      title: "II - Descrição do Projeto",
      url: "#",
      // icon: Bot,
      items: [
        {title: "5.Justificativa e Motivação para celebração do instrumento", url: "#"},
        {title: "6. Objetivos", url: "#"},
        {title: "7. Metas",url: "#"},
        {title: "8. Etapas e cronograma de execução", url: "#"},
        {title: "9. Metodologia", url: "#"},
        {title: "10. Resultados Esperados", url: "#"},
        {title: "11. Gestão do Projeto", url: "#"},
      ],
    },
    {
      title: "III - Participantes e Abrangência do Projeto",
      url: "#",
      // icon: BookOpen,
      items: [
        {title: "12. Histórico e situação socioeconômica do território e da população a ser beneficiada", url: "#"},
        {title: "13. Detalhamento da base territorial do projeto", url: "#"},
        {title: "14. Público beneficiário do projeto", url: "#"},
        {title: "15. Informe se o público faz parte de algum destes povos ou comunidades tradicionais", url: "#"},
        {title: "16. Informe o perfil sócio-ocupacional predominante do público beneficiário", url: "#"},
        {title: "17. Informe se o público beneficiário está acessando alguns dos seguintes serviços", url: "#"},
      ],
    },
    {
      title: "IV - Caracterização do(a) proponente",
      url: "#",
      // icon: BookOpen,
      items: [
        {title: "12. Outras informações julgadas apropiadas sobre o(a) proponente", url: "#"},
      ],
    },
    {
      title: "V - Dados Físicos-Financeiros: Planilhas Orçamentárias",
      url: "#",
      // icon: BookOpen,
      items: [
        {title: "19. Valor total do projeto", url: "#"},
        {title: "20. Cronograma de desembolso", url: "#"},
        {title: "21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa", url: "#"},
        {title: "22. Resumo do plano de aplicação por elemento de despesa", url: "#"},
      ],
    },
    {
      title: "VI - Monitoramento e Avaliação",
      url: "#",
      // icon: BookOpen,
      items: [
        {title: "23. Procedimentos de monitoramento e avaliação da execução e resultados", url: "#"},
        {title: "24. Indicadores de eficiência e eficácia", url: "#"},
      ]  
    },
  ],
}

export function AppSidebar({ onMenuItemClick, ...props }: React.ComponentProps<typeof Sidebar> & { onMenuItemClick?: (parentTitle: string, childTitle: string) => void }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onMenuItemClick={onMenuItemClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
