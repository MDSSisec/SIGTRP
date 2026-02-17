import type { LucideIcon } from "lucide-react"

/** Card de total exibido na home */
export type HomeTotal = {
  title: string
  description: string
  icon: LucideIcon
  total: number
}

/** Ação clicável da home */
export type HomeAction = {
  title: string
  subtitle: string
  icon: LucideIcon
  route: string
}
