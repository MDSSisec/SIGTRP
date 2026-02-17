// Importa o tipo de status do usuário do domínio central de tipagem.
// Garante consistência entre UI, regras de negócio e dados.
import type { StatusUsuario } from "@/types/user"


// ======================================================
// ESTILO BASE DO BADGE DE STATUS DO USUÁRIO
// ======================================================
//
// Classes comuns aplicadas a todos os badges.
// Define layout, espaçamento, tamanho mínimo e tipografia.
const baseBadge =
  "inline-flex items-center justify-center min-w-[5rem] px-2 py-1 rounded-full text-xs font-medium"


// ======================================================
// ESTILO VISUAL DO STATUS DO USUÁRIO
// ======================================================
//
// Retorna as classes Tailwind usadas para exibir o status do usuário
// em formato de badge colorida.
//
// Usado principalmente em:
// - tabelas de usuários
// - listagens administrativas
// - painéis de controle
//
// Cores por status:
// - Ativo → verde (ok / habilitado)
// - Inativo → vermelho (bloqueado / desativado)
// - Pendente → amarelo (aguardando ação)
export function getUsuarioStatusStyle(status: StatusUsuario): string {

  // Mapeia cada status para seu esquema de cores
  const colors = {
    Ativo: "bg-green-100 text-green-800",
    Inativo: "bg-red-100 text-red-800",
    Pendente: "bg-amber-100 text-amber-800",
  }[status]

  // Combina o estilo base com a cor específica do status
  return `${baseBadge} ${colors}`
}
