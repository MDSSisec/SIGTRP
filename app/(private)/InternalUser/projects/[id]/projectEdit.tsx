"use client"

import { useParams } from "next/navigation"
import { useEffect, useMemo } from "react"
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
  const projectId = (params?.id as string) ?? ""
  const { setProjectName } = useBreadcrumb()

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

      <div className="bg-muted/50 min-h-[50vh] rounded-xl p-6">
        <p className="text-muted-foreground text-sm">
          Conteúdo da seção selecionada será exibido aqui. Navegue pelos itens do menu lateral: I - Identificação, II - Descrição do Projeto, III - Participantes e Abrangência, IV - Caracterização do proponente, V - Dados Físicos-Financeiros, VI - Monitoramento e Avaliação.
        </p>
      </div>
    </div>
  )
}
