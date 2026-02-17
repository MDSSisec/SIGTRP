// ================================
// USUÁRIO - STATUS E PERFIL
// ================================

export const STATUS_USUARIO_LIST = ["Ativo", "Inativo", "Pendente"] as const

export type StatusUsuario = (typeof STATUS_USUARIO_LIST)[number]

export const STATUS_USUARIO_OPTIONS: { label: string; value: StatusUsuario }[] = [
  { label: "Ativo", value: "Ativo" },
  { label: "Inativo", value: "Inativo" },
  { label: "Pendente", value: "Pendente" },
]

export const PERFIL_USUARIO_LIST = ["Administrador", "Usuário", "Gestor"] as const

export type PerfilUsuario = (typeof PERFIL_USUARIO_LIST)[number]

export const PERFIL_USUARIO_OPTIONS: { label: string; value: PerfilUsuario }[] = [
  { label: "Administrador", value: "Administrador" },
  { label: "Usuário", value: "Usuário" },
  { label: "Gestor", value: "Gestor" },
]
