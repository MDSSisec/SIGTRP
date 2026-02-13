"use client"

import { Pencil, Save, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type GenericButtonVariant =
  | "editar"
  | "salvar"
  | "default"
  | "outline"
  | "secondary"
  | "destructive"
  | "ghost"
  | "link"

export type GenericButtonSize = "default" | "sm" | "lg" | "icon" | "xs" | "icon-sm" | "icon-lg" | "icon-xs"

type GenericButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
> & {
  variant?: GenericButtonVariant
  size?: GenericButtonSize
  /** Ícone à esquerda do texto (usado automaticamente em editar/salvar se não informado). */
  icon?: LucideIcon
}

const variantMap: Record<
  "editar" | "salvar",
  { variant: React.ComponentProps<typeof Button>["variant"]; icon: LucideIcon; label: string }
> = {
  editar: { variant: "outline", icon: Pencil, label: "Editar" },
  salvar: { variant: "default", icon: Save, label: "Salvar" },
}

export function GenericButton({
  variant = "default",
  size = "default",
  icon: IconProp,
  children,
  className,
  ...props
}: GenericButtonProps) {
  const isEditar = variant === "editar"
  const isSalvar = variant === "salvar"
  const preset = isEditar
    ? variantMap.editar
    : isSalvar
      ? variantMap.salvar
      : null

  const buttonVariant = preset?.variant ?? (variant as React.ComponentProps<typeof Button>["variant"])
  const Icon = IconProp ?? preset?.icon
  const label = children ?? preset?.label

  return (
    <Button
      type={isSalvar && !props.onClick ? "submit" : "button"}
      variant={buttonVariant}
      size={size}
      className={cn(className)}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {label}
    </Button>
  )
}
