import type { LucideIcon } from "lucide-react"

// Representa um subitem do menu principal da navegação lateral.
// Normalmente usado para seções internas de uma página (ex.: seções do projeto).
export type NavMainSubItem = {
  // Texto exibido no menu
  title: string

  // URL de navegação ao clicar no item
  url: string

  // Identificador da seção do formulário do projeto.
  // Exemplo: "identificacao-projeto"
  // Usado em rotas como: /InternalUser/projects/[id]?secao=slug
  slug?: string
}

// Representa um item principal da navegação lateral.
export type NavMainItem = {
  // Texto exibido no menu principal
  title: string

  // URL principal do item
  url: string

  // Ícone exibido ao lado do título (opcional)
  icon?: LucideIcon

  // Define se o item está ativo/selecionado na interface
  isActive?: boolean

  // Lista de subitens vinculados ao item principal
  items?: NavMainSubItem[]
}

// Representa os dados do usuário exibidos na sidebar.
export type SidebarUser = {
  // Nome do usuário logado
  name: string

  // Email do usuário
  email: string

  // URL da imagem/avatar do usuário
  avatar: string
}

// Representa um time ou organização exibida na sidebar.
export type SidebarTeam = {
  // Nome do time ou organização
  name: string

  // Ícone ou logotipo do time
  logo: LucideIcon

  // Plano ou nível de acesso do time (ex.: Free, Pro, Enterprise)
  plan: string
}

// Configuração completa da sidebar da aplicação.
export type SidebarConfig = {
  // Dados do usuário logado
  user: SidebarUser

  // Lista de times disponíveis para o usuário
  teams: SidebarTeam[]

  // Estrutura principal de navegação da sidebar
  navMain: NavMainItem[]
}

// Define os papéis possíveis de usuário no sistema.
export type UserRole = "admin" | "user"

// Representa a área privada da aplicação baseada na rota.
// Ex.: InternalUser, ExternalUser ou qualquer outra área definida.
export type PrivateArea = "InternalUser" | "ExternalUser" | string

// Extrai a área privada a partir do pathname da URL.
// Exemplo:
// "/InternalUser/dashboard" -> "InternalUser"
// "/ExternalUser/home" -> "ExternalUser"
export function getPrivateAreaFromPath(pathname: string): PrivateArea | null {
  // Divide o caminho em segmentos e remove partes vazias
  const segment = pathname.split("/").filter(Boolean)[0]

  // Retorna o primeiro segmento ou null se não existir
  return segment ?? null
}
