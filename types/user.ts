import type { PerfilUsuario, StatusUsuario } from "@/constants/user"

export type { PerfilUsuario, StatusUsuario } from "@/constants/user"

export interface Usuario {
  id: number
  nome: string
  email: string
  status: StatusUsuario
  perfil: PerfilUsuario
  [key: string]: number | string | StatusUsuario | PerfilUsuario
}
