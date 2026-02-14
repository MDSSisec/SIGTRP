"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
  DEFAULT_FORM_SECTION,
  PROJECT_FORM_SECTIONS,
} from "@/components/projectForms"
import { CronogramaProvider } from "@/components/projectForms/secao-2-descricao/CronogramaContext"
import StatusStepper from "@/components/shared/StatusStepper/statusStepper"
import { useBreadcrumb } from "@/lib/breadcrumb-context"
import {
  STATUS_PROJETO_STEPS,
  statusToStepIndex,
  type StatusProjeto,
} from "@/lib/project-status"
import projetosData from "../dataProjetos.json"

/**
 * Página de edição do projeto.
 * O sidebar exibe os itens do formulário TRP (I a VI) via dashboardMenuConfig.
 */
export function ProjectEditContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = (params?.id as string) ?? ""
  const secao = searchParams.get("secao") ?? DEFAULT_FORM_SECTION
  const { setProjectName } = useBreadcrumb()

  const FormSection = useMemo(
    () =>
      PROJECT_FORM_SECTIONS[secao] ??
      PROJECT_FORM_SECTIONS[DEFAULT_FORM_SECTION],
    [secao]
  )

  const projeto = (projetosData as { id: number; nome: string; status?: StatusProjeto }[]).find(
    (p) => String(p.id) === projectId
  )

  const currentStep = useMemo(
    () => statusToStepIndex(projeto?.status ?? "TRP em Elaboração"),
    [projeto?.status]
  )

  useEffect(() => {
    if (projeto?.nome) setProjectName(projeto.nome)
    return () => setProjectName(null)
  }, [projeto?.nome, setProjectName])

  return (
    <div className="px-6">
      {projeto && (
        <div className="mb-6 rounded-xl border bg-card p-6 shadow-sm">
          <StatusStepper steps={STATUS_PROJETO_STEPS} currentStep={currentStep} collapsible collapsibleLabel="Status do projeto" />
        </div>
      )}

      <div className="w-full min-h-[50vh] rounded-xl border bg-muted/40 p-6">
        <CronogramaProvider>
          <FormSection projectId={projectId} />
        </CronogramaProvider>
      </div>
    </div>
  )
}
