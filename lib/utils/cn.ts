import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Combina classes CSS com suporte a condicionais (tailwind). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
