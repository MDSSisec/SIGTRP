"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import styles from "./ProjectTEDEdit.module.css"

import {
  DEFAULT_FORM_SECTION,
  PROJECT_FORM_SECTIONS,
} from "@/features/projectTED/forms"

import type { CronogramaData } from "@/features/projectTED/forms/secao-2-descricao/etapas-cronograma/types"
import { CronogramaProvider } from "@/features/projectTED/forms/secao-2-descricao/CronogramaContext"

import { useBreadcrumb } from "@/lib/contexts/breadcrumb-context"
import { ProjectDataProvider } from "@/lib/contexts/project-data-context"

import {
  mapModeloCronogramaToForm,
  type ProjectModelData,
} from "@/features/projectTED/services/projectTED.service"

import type { StatusProjeto } from "@/constants/project"

import projetosData from "@/data/projetos.json"
import projetoModelo from "@/features/projectTED/model/projetoModelo.json"

// Página de edição do projeto TED (formulário TRP I a VI).
export function ProjectTEDEditContent() {
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

  useEffect(() => {
    if (projeto?.nome) setProjectName(projeto.nome)
    return () => setProjectName(null)
  }, [projeto?.nome, setProjectName])

  const projectData = projectId === "2" ? (projetoModelo as ProjectModelData) : null

  const initialCronograma: CronogramaData | undefined = projectData
    ? (mapModeloCronogramaToForm(projectData.etapas_cronograma) as CronogramaData)
    : undefined

  return (
    <ProjectDataProvider projectId={projectId} projectData={projectData}>
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>
          <CronogramaProvider initialData={initialCronograma}>
            <FormSection projectId={projectId} />
          </CronogramaProvider>
        </div>
      </div>
    </ProjectDataProvider>
  )
}