export type StatusUsuario = "Ativo" | "Inativo" | "Pendente"
export type PerfilUsuario = "Administrador" | "Usuário" | "Gestor"

export type Usuario = {
  id: number
  nome: string
  email: string
  status: StatusUsuario
  perfil: PerfilUsuario
}

export const dadosIniciais: Usuario[] = [
  { id: 1, nome: "Maria Silva", email: "maria.silva@email.com", status: "Ativo", perfil: "Administrador" },
  { id: 2, nome: "João Santos", email: "joao.santos@email.com", status: "Ativo", perfil: "Usuário" },
  { id: 3, nome: "Ana Costa", email: "ana.costa@email.com", status: "Inativo", perfil: "Usuário" },
  { id: 4, nome: "Carlos Lima", email: "carlos.lima@email.com", status: "Pendente", perfil: "Gestor" },
  { id: 5, nome: "Fernanda Oliveira", email: "fernanda@email.com", status: "Ativo", perfil: "Gestor" },
]

export const statusOptions: { label: string; value: StatusUsuario }[] = [
  { label: "Ativo", value: "Ativo" },
  { label: "Inativo", value: "Inativo" },
  { label: "Pendente", value: "Pendente" },
]

export const perfilOptions: { label: string; value: PerfilUsuario }[] = [
  { label: "Administrador", value: "Administrador" },
  { label: "Usuário", value: "Usuário" },
  { label: "Gestor", value: "Gestor" },
]
