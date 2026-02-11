import { GalleryVerticalEnd, type LucideIcon } from "lucide-react"

export type NavMainItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: { title: string; url: string }[]
}

export type SidebarUser = {
  name: string
  email: string
  avatar: string
}

export type SidebarTeam = {
  name: string
  logo: LucideIcon
  plan: string
}

export type SidebarConfig = {
  user: SidebarUser
  teams: SidebarTeam[]
  navMain: NavMainItem[]
}

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
      items: [
        { title: "12. Outras informações julgadas apropiadas sobre o(a) proponente", url: "#" },
      ],
    },
    {
      title: "V - Dados Físicos-Financeiros: Planilhas Orçamentárias",
      url: "#",
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
      items: [
        { title: "23. Procedimentos de monitoramento e avaliação da execução e resultados", url: "#" },
        { title: "24. Indicadores de eficiência e eficácia", url: "#" },
      ],
    },
  ],
}

/**
 * Menu da Home (navegação geral).
 * Use para a página inicial ou quando o usuário não está em um projeto.
 */
export const homeMenuConfig: SidebarConfig = {
  user: {
    name: "UserName",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" },
  ],
  navMain: [
    { title: "Início", url: "/InternalUser/home", isActive: true, items: [{ title: "Página inicial", url: "/InternalUser/home" }] },
    { title: "Dashboard", url: "/InternalUser/dashboard", items: [{ title: "Painel", url: "/InternalUser/dashboard" }] },
    { title: "Meus Projetos", url: "#", items: [{ title: "Listar projetos", url: "/InternalUser/projects" }] },
    { title: "Configurações", url: "#", items: [{ title: "Ajustes", url: "#" }] },
  ],
}

/**
 * Mapa rota -> config do menu.
 * Rotas privadas seguem o padrão /{tipoUsuario}/{pagina}, ex.: /InternalUser/dashboard.
 */
const routeMenuMap: Record<string, SidebarConfig> = {
  "/InternalUser/dashboard": dashboardMenuConfig,
  "/InternalUser/home": homeMenuConfig,
  "/InternalUser": homeMenuConfig,
}

/** Tipos de usuário para variar o menu por perfil (ex.: admin vê mais itens). */
export type UserRole = "admin" | "user"

/**
 * Retorna a config do sidebar para a rota e o usuário atuais.
 * Rotas privadas: /InternalUser/dashboard, /InternalUser/home, etc.
 */
export function getSidebarConfig(pathname: string, _userRole?: UserRole): SidebarConfig {
  const segments = pathname.split("/").filter(Boolean)
  const pathKey = segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : `/${segments[0] ?? ""}`

  const baseConfig = routeMenuMap[pathKey] ?? routeMenuMap[`/${segments[0]}`] ?? homeMenuConfig

  // Por usuário: sobrescreva itens conforme o role se precisar.
  // Ex.: if (userRole === "admin") return { ...baseConfig, navMain: [...baseConfig.navMain, adminItem] }
  return baseConfig
}

/** Tipos de área privada (segmento da URL). */
export type PrivateArea = "InternalUser" | "ExternalUser" | string

/**
 * Lê o tipo de usuário/área a partir do pathname (ex.: /InternalUser/dashboard -> "InternalUser").
 */
export function getPrivateAreaFromPath(pathname: string): PrivateArea | null {
  const segment = pathname.split("/").filter(Boolean)[0]
  return segment ?? null
}
