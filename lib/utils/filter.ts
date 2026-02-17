import type { Usuario } from "@/types/user"

/**
 * Filtra lista de usuários por nome, status e perfil (valores do filtro genérico).
 */
export function filterUsuarios(
  usuarios: Usuario[],
  filtros: Record<string, string>
): Usuario[] {
  return usuarios.filter((u) => {
    const nome = (filtros.nome ?? "").trim().toLowerCase()
    if (nome && !u.nome.toLowerCase().includes(nome)) return false
    const status = filtros.status ?? ""
    if (status && u.status !== status) return false
    const perfil = filtros.perfil ?? ""
    if (perfil && u.perfil !== perfil) return false
    return true
  })
}
