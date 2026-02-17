import type { StatusUsuario } from "@/lib/types/user"

const baseBadge = "inline-flex items-center justify-center min-w-[5rem] px-2 py-1 rounded-full text-xs font-medium"

/** Retorna classes Tailwind para o badge de status do usuário. */
export function getUsuarioStatusStyle(status: StatusUsuario): string {
  const colors = {
    Ativo: "bg-green-100 text-green-800",
    Inativo: "bg-red-100 text-red-800",
    Pendente: "bg-amber-100 text-amber-800",
  }[status]
  return `${baseBadge} ${colors}`
}
