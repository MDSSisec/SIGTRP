import type { ComponentType } from "react"

/**
 * Formulários específicos do tipo Emenda.
 * Serão implementados conforme definição do modelo.
 */
export const DEFAULT_FORM_SECTION = "identificacao"
export const PROJECT_FORM_SECTIONS: Record<string, ComponentType<{ projectId?: string }>> = {}
