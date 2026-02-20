import {
  GalleryVerticalEnd,
  Fingerprint,
  FileText,
  Users,
  Building2,
  Calculator,
  BarChart3,
  Home,
  FolderOpen,
  Settings,
  MessageCircle,
} from "lucide-react"
import type { SidebarConfig, UserRole } from "@/types/sidebar"

export type { NavMainItem, SidebarConfig, SidebarUser, SidebarTeam, UserRole, PrivateArea } from "@/types/sidebar"
export { getPrivateAreaFromPath } from "@/types/sidebar"

/** Menu do Projeto (formulário TRP - seções I a VI). */
export const dashboardMenuConfig: SidebarConfig = {
  user: { name: "adm", email: "m@example.com", avatar: "" },
  teams: [{ name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" }],
  navMain: [
    { title: "Visão Geral do Projeto", 
      url: "#", 
      icon: Home, 
      isActive: true,
      items: [
        { title: "Informações do Projeto", url: "#", slug: "informacoes-projeto" },
        { title: "Visão Geral do Projeto", url: "#", slug: "visao-geral" },
        
        ],
    },
    { title: "Observações", 
      url: "#", 
      icon: MessageCircle, 
      items: [
        { title: "Observações", url: "#", slug: "observacoes" },
        { title: "Andamento do Projeto", url: "#", slug: "andamento-projeto" },
      ] 
    },
    {
      title: "I - Identificação",
      url: "#",
      icon: Fingerprint,
      isActive: true,
      items: [
        { title: "1. Identificação do Projeto", url: "#", slug: "identificacao-projeto" },
        { title: "2. Identificação do(a) proponente", url: "#", slug: "identificacao-proponente" },
        { title: "3. Identificação do representante legal do(a) proponente", url: "#", slug: "identificacao-representante-legal" },
        { title: "4. Identificação do responsável técnico", url: "#", slug: "identificacao-responsavel-tecnico" },
      ],
    },
    {
      title: "II - Descrição do Projeto",
      url: "#",
      icon: FileText,
      items: [
        { title: "5.Justificativa e Motivação para celebração do instrumento", url: "#", slug: "justificativa" },
        { title: "6. Objetivos", url: "#", slug: "objetivos" },
        { title: "7. Metas", url: "#", slug: "metas" },
        { title: "8. Etapas e cronograma de execução", url: "#", slug: "etapas-cronograma" },
        { title: "9. Metodologia", url: "#", slug: "metodologia" },
        { title: "10. Resultados Esperados", url: "#", slug: "resultados-esperados" },
        { title: "11. Gestão do Projeto", url: "#", slug: "gestao-projeto" },
      ],
    },
    {
      title: "III - Participantes e Abrangência do Projeto",
      url: "#",
      icon: Users,
      items: [
        { title: "12. Histórico e situação socioeconômica do território e da população a ser beneficiada", url: "#", slug: "historico-situacao-territorio" },
        { title: "13. Detalhamento da base territorial do projeto", url: "#", slug: "base-territorial" },
        { title: "14. Público beneficiário do projeto", url: "#", slug: "publico-beneficiario" },
        { title: "15. Informe se o público faz parte de algum destes povos ou comunidades tradicionais", url: "#", slug: "povos-comunidades-tradicionais" },
        { title: "16. Informe o perfil sócio-ocupacional predominante do público beneficiário", url: "#", slug: "perfil-socio-ocupacional" },
        { title: "17. Informe se o público beneficiário está acessando alguns dos seguintes serviços", url: "#", slug: "servicos-acessados" },
      ],
    },
    {
      title: "IV - Caracterização do(a) proponente",
      url: "#",
      icon: Building2,
      items: [{ title: "12. Outras informações julgadas apropiadas sobre o(a) proponente", url: "#", slug: "outras-informacoes-proponente" }],
    },
    {
      title: "V - Dados Financeiros",
      url: "#",
      icon: Calculator,
      items: [
        { title: "19. Valor total do projeto", url: "#", slug: "valor-total" },
        { title: "20. Cronograma de desembolso", url: "#", slug: "cronograma-desembolso" },
        { title: "21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa", url: "#", slug: "detalhamento-orcamento" },
        { title: "22. Resumo do plano de aplicação por elemento de despesa", url: "#", slug: "resumo-plano-aplicacao" },
      ],
    },
    {
      title: "VI - Monitoramento e Avaliação",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "23. Procedimentos de monitoramento e avaliação da execução e resultados", url: "#", slug: "procedimentos-monitoramento" },
        { title: "24. Indicadores de eficiência e eficácia", url: "#", slug: "indicadores-eficiencia" },
      ],
    },
  ],
}

/** Menu da Home do usuário interno (navegação geral). */
export const internalUserHomeMenuConfig: SidebarConfig = {
  user: { name: "UserName", email: "m@example.com", avatar: "" },
  teams: [{ name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" }],
  navMain: [
    { title: "Início", url: "/InternalUser/home", icon: Home, isActive: true, items: [{ title: "Página inicial", url: "/InternalUser/home" }] },
    { title: "Projetos", url: "#", icon: FolderOpen, items: [{ title: "Todos os projetos", url: "/InternalUser/projects" }] },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      items: [
        { title: "Usuários Internos", url: "/InternalUser/config/internalUser" },
        { title: "Usuários Externos", url: "/InternalUser/config/externalUser" },
        { title: "Configurações do Sistema", url: "/InternalUser/config/configSistema" },
      ],
    },
  ],
}

/** Menu do usuário externo (apenas Projetos). */
export const externalUserHomeMenuConfig: SidebarConfig = {
  user: { name: "UserName", email: "m@example.com", avatar: "" },
  teams: [{ name: "SIGTRP", logo: GalleryVerticalEnd, plan: "MDS" }],
  navMain: [
    { title: "Projetos", url: "/ExternalUser/projects", isActive: true, items: [{ title: "Ver projetos", url: "/ExternalUser/projects" }] },
  ],
}

const routeMenuMap: Record<string, SidebarConfig> = {
  "/InternalUser/dashboard": dashboardMenuConfig,
  "/InternalUser/home": internalUserHomeMenuConfig,
  "/InternalUser": internalUserHomeMenuConfig,
  "/ExternalUser/home": externalUserHomeMenuConfig,
  "/ExternalUser/projects": externalUserHomeMenuConfig,
  "/ExternalUser": externalUserHomeMenuConfig,
}

/**
 * Retorna a config do sidebar para a rota (e opcionalmente o role do usuário).
 * Em /InternalUser/projects/ted|convenio|emenda/:id usa o menu do formulário (TRP para TED).
 */
export function getSidebarConfig(pathname: string, _userRole?: UserRole): SidebarConfig {
  if (/^\/InternalUser\/projects\/(ted|convenio|emenda)\/[^/]+$/.test(pathname)) return dashboardMenuConfig
  const segments = pathname.split("/").filter(Boolean)
  const pathKey = segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : `/${segments[0] ?? ""}`
  return routeMenuMap[pathKey] ?? routeMenuMap[`/${segments[0]}`] ?? internalUserHomeMenuConfig
}
