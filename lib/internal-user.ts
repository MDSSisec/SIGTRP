import {
  GalleryVerticalEnd,
  Fingerprint,
  FileText,
  Users,
  Building2,
  Calculator,
  BarChart3,
  Home,
  LayoutDashboard,
  FolderOpen,
  Settings,
} from "lucide-react"
import type { SidebarConfig } from "./sidebar-types"

/**
 * Menu do Dashboard (formulário TRP - seções I a VI).
 * Use para páginas de edição/gestão do projeto.
 */
export const dashboardMenuConfig: SidebarConfig = {
  user: {
    name: "UserName",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" },
  ],
  navMain: [
    {
      title: "I - Identificação",
      url: "#",
      icon: Fingerprint,
      isActive: true,
      items: [
        { title: "1. Identificação do Projeto", url: "#" },
        { title: "2. Identificação do(a) proponente", url: "#" },
        { title: "3. Identificação do representante legal do(a) proponente", url: "#" },
      ],
    },
    {
      title: "II - Descrição do Projeto",
      url: "#",
      icon: FileText,
      items: [
        { title: "5.Justificativa e Motivação para celebração do instrumento", url: "#" },
        { title: "6. Objetivos", url: "#" },
        { title: "7. Metas", url: "#" },
        { title: "8. Etapas e cronograma de execução", url: "#" },
        { title: "9. Metodologia", url: "#" },
        { title: "10. Resultados Esperados", url: "#" },
        { title: "11. Gestão do Projeto", url: "#" },
      ],
    },
    {
      title: "III - Participantes e Abrangência do Projeto",
      url: "#",
      icon: Users,
      items: [
        { title: "12. Histórico e situação socioeconômica do território e da população a ser beneficiada", url: "#" },
        { title: "13. Detalhamento da base territorial do projeto", url: "#" },
        { title: "14. Público beneficiário do projeto", url: "#" },
        { title: "15. Informe se o público faz parte de algum destes povos ou comunidades tradicionais", url: "#" },
        { title: "16. Informe o perfil sócio-ocupacional predominante do público beneficiário", url: "#" },
        { title: "17. Informe se o público beneficiário está acessando alguns dos seguintes serviços", url: "#" },
      ],
    },
    {
      title: "IV - Caracterização do(a) proponente",
      url: "#",
      icon: Building2,
      items: [
        { title: "12. Outras informações julgadas apropiadas sobre o(a) proponente", url: "#" },
      ],
    },
    {
      title: "V - Dados Físicos-Financeiros: Planilhas Orçamentárias",
      url: "#",
      icon: Calculator,
      items: [
        { title: "19. Valor total do projeto", url: "#" },
        { title: "20. Cronograma de desembolso", url: "#" },
        { title: "21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa", url: "#" },
        { title: "22. Resumo do plano de aplicação por elemento de despesa", url: "#" },
      ],
    },
    {
      title: "VI - Monitoramento e Avaliação",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "23. Procedimentos de monitoramento e avaliação da execução e resultados", url: "#" },
        { title: "24. Indicadores de eficiência e eficácia", url: "#" },
      ],
    },
  ],
}

/**
 * Menu da Home do usuário interno (navegação geral).
 */
export const internalUserHomeMenuConfig: SidebarConfig = {
  user: {
    name: "UserName",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" },
  ],
  navMain: [
    {
      title: "Início",
      url: "/InternalUser/home",
      icon: Home,
      isActive: true,
      items: [{ title: "Página inicial", url: "/InternalUser/home" }],
    },
    {
      title: "Dashboard",
      url: "/InternalUser/dashboard",
      icon: LayoutDashboard,
      items: [{ title: "Painel", url: "/InternalUser/dashboard" }],
    },
    {
      title: "Projetos",
      url: "#",
      icon: FolderOpen,
      items: [
        { title: "Todos os projetos", url: "/InternalUser/projects" },
        { title: "Projetos Pendentes", url: "#" },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      items: [{ title: "Ajustes", url: "#" }],
    },
  ],
}
