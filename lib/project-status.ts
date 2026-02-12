import type { LucideIcon } from "lucide-react"
import {
  FileEdit,
  Send,
  ThumbsUp,
  FileSignature,
  PlayCircle,
  CheckCircle2,
  ClipboardCheck,
  CircleCheck,
  AlertCircle,
  Flag,
} from "lucide-react"

export const STATUS_PROJETO_LIST = [
  "TRP em Elaboração",
  "TRP Submetido à SISEC",
  "TRP Aprovado",
  "Instrumento Celebrado",
  "Projeto em Execução",
  "Projeto Concluído",
  "Prestação de Contas em Análise",
  "Prestação de Contas Aprovada",
  "Prestação de Contas com Glosa",
  "Projeto Encerrado",
] as const

export type StatusProjeto = (typeof STATUS_PROJETO_LIST)[number]

export const STATUS_PROJETO_STEPS: { title: StatusProjeto; icon: LucideIcon }[] = [
  { title: "TRP em Elaboração", icon: FileEdit },
  { title: "TRP Submetido à SISEC", icon: Send },
  { title: "TRP Aprovado", icon: ThumbsUp },
  { title: "Instrumento Celebrado", icon: FileSignature },
  { title: "Projeto em Execução", icon: PlayCircle },
  { title: "Projeto Concluído", icon: CheckCircle2 },
  { title: "Prestação de Contas em Análise", icon: ClipboardCheck },
  { title: "Prestação de Contas Aprovada", icon: CircleCheck },
  { title: "Prestação de Contas com Glosa", icon: AlertCircle },
  { title: "Projeto Encerrado", icon: Flag },
]

export function statusToStepIndex(status: StatusProjeto | string): number {
  const i = STATUS_PROJETO_LIST.indexOf(status as StatusProjeto)
  return i >= 0 ? i : 0
}

/** Estilo da badge de status na listagem (por etapa). */
export function getStatusStyle(status: StatusProjeto): string {
  if (
    status === "TRP em Elaboração" ||
    status === "TRP Submetido à SISEC" ||
    status === "Prestação de Contas em Análise"
  ) {
    return "bg-amber-100 text-amber-800"
  }
  if (
    status === "TRP Aprovado" ||
    status === "Instrumento Celebrado" ||
    status === "Projeto em Execução"
  ) {
    return "bg-blue-100 text-blue-800"
  }
  if (
    status === "Projeto Concluído" ||
    status === "Prestação de Contas Aprovada" ||
    status === "Projeto Encerrado"
  ) {
    return "bg-green-100 text-green-800"
  }
  if (status === "Prestação de Contas com Glosa") {
    return "bg-orange-100 text-orange-800"
  }
  return "bg-gray-100 text-gray-700"
}
