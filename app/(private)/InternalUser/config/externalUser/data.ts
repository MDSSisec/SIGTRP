export type StatusUsuario = "Ativo" | "Inativo" | "Pendente"
export type PerfilUsuario = "Proponente" | "Parceiro" | "Consultor"

export type UsuarioExterno = {
  id: number
  nome: string
  email: string
  status: StatusUsuario
  perfil: PerfilUsuario
}

export const dadosUsuariosExternos: UsuarioExterno[] = [
  { id: 1, nome: "Roberto Souza", email: "roberto.souza@org.com", status: "Ativo", perfil: "Proponente" },
  { id: 2, nome: "Carla Mendes", email: "carla.mendes@parceiro.org", status: "Ativo", perfil: "Parceiro" },
  { id: 3, nome: "Paulo Ferreira", email: "paulo.ferreira@email.com", status: "Inativo", perfil: "Consultor" },
  { id: 4, nome: "Juliana Rocha", email: "juliana.rocha@projeto.org", status: "Pendente", perfil: "Proponente" },
  { id: 5, nome: "Marcos Almeida", email: "marcos@consultor.com", status: "Ativo", perfil: "Consultor" },
]

export const statusOptions: { label: string; value: StatusUsuario }[] = [
  { label: "Ativo", value: "Ativo" },
  { label: "Inativo", value: "Inativo" },
  { label: "Pendente", value: "Pendente" },
]

export const perfilOptions: { label: string; value: PerfilUsuario }[] = [
  { label: "Proponente", value: "Proponente" },
  { label: "Parceiro", value: "Parceiro" },
  { label: "Consultor", value: "Consultor" },
]
