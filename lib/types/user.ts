import type { PerfilUsuario, StatusUsuario } from "@/constants/user"

export type { PerfilUsuario, StatusUsuario } from "@/constants/user"

/** Usuário interno (listagem/cadastro na config). */
export interface Usuario {
  id: number
  nome: string
  email: string
  status: StatusUsuario
  perfil: PerfilUsuario
  [key: string]: number | string | StatusUsuario | PerfilUsuario
}
