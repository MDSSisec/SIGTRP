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

// ================================
// STATUS DE PROJETO
// ================================

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
