"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import StatusStepper from "@/components/shared/StatusStepper/statusStepper"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import {
  PROJECT_TYPE_OPTIONS,
  STATUS_PROJETO_LIST,
  type ProjectTipo,
  type StatusProjeto,
} from "@/constants/project"
import type { ProjectFormSectionProps } from "../sections-map"
import { SESSOES_VISAO_GERAL_TITLE } from "@/constants/visaoGeral"
import projetosData from "@/data/projetos.json"
import styles from "./informacoesDoProjeto.module.css"
import { STATUS_PROJETO_STEPS, statusToStepIndex } from "@/features/projectTED/services/projectTED.service"

type ProjetoJson = { id: number; nome?: string; responsavel?: string; status?: string; tipo?: string }
const projetosJson = projetosData as ProjetoJson[]

interface UsuarioOption {
  id: number
  nome: string
}

/** Usuários internos (fonte futura: API/config). */
const USUARIOS_INTERNOS: UsuarioOption[] = [
  { id: 1, nome: "Maria Silva" },
  { id: 2, nome: "Itala Renata" },
  { id: 3, nome: "Ana Costa" },
  { id: 4, nome: "Bruno Carvalho" },
  { id: 5, nome: "Adm" },
]

/** Usuários externos (fonte futura: API/config). */
const USUARIOS_EXTERNOS: UsuarioOption[] = [
  { id: 1, nome: "Roberto Souza" },
  { id: 2, nome: "Carla Mendes" },
  { id: 3, nome: "Paulo Ferreira" },
  { id: 4, nome: "Juliana Rocha" },
  { id: 5, nome: "Marcos Almeida" },
]

interface DadosInformacoesProjeto {
  tipoProjeto: ProjectTipo
  status: StatusProjeto
  responsavelInternoId: string
  responsavelExternoId: string
}

const STATUS_OPTIONS = STATUS_PROJETO_LIST.map((s) => ({ value: s, label: s }))

const TIPO_PROJETO_OPTIONS = PROJECT_TYPE_OPTIONS.filter((o) => o.value !== "")

function getDadosIniciais(projectId: string | undefined): DadosInformacoesProjeto | null {
  if (!projectId) return null
  const p = projetosJson.find((x) => String(x.id) === projectId)
  if (!p) return null
  const interno = USUARIOS_INTERNOS.find((u) => u.nome === p.responsavel)
  const externo = USUARIOS_EXTERNOS.find((u) => u.nome === p.responsavel)
  return {
    tipoProjeto: (p.tipo as ProjectTipo) ?? "TED",
    status: (p.status as StatusProjeto) ?? "TRP em Elaboração",
    responsavelInternoId: interno ? String(interno.id) : "",
    responsavelExternoId: externo ? String(externo.id) : "",
  }
}

const VAZIO: DadosInformacoesProjeto = {
  tipoProjeto: "TED",
  status: "TRP em Elaboração",
  responsavelInternoId: "",
  responsavelExternoId: "",
}

export function InformacoesDoProjeto({ projectId, readOnlyView }: ProjectFormSectionProps) {
  const [dados, setDados] = useState<DadosInformacoesProjeto>(() =>
    getDadosIniciais(projectId) ?? VAZIO
  )

  useEffect(() => {
    const iniciais = getDadosIniciais(projectId)
    if (iniciais) setDados(iniciais)
    else setDados(VAZIO)
  }, [projectId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setDados((prev) => ({ ...prev, [name]: value }))
  }

  const isReadOnly = Boolean(readOnlyView)

  const projeto = useMemo(
    () => projetosJson.find((p) => String(p.id) === projectId),
    [projectId]
  )
  const currentStep = useMemo(
    () => statusToStepIndex((dados?.status as StatusProjeto) ?? "TRP em Elaboração"),
    [dados?.status]
  )

  /** Chaves das seções que o sistema marca como concluídas (preenchidas). Pode ser preenchido por API/regra de negócio. */
  const [itensConcluidos] = useState<Set<string>>(() => new Set())

  return (
    <div className={styles.container}>
      {projeto && (
        <div className={styles.statusCard}>
          <StatusStepper
            steps={STATUS_PROJETO_STEPS}
            currentStep={currentStep}
            collapsible
            collapsibleLabel="Status do projeto"
          />
        </div>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações do Projeto</h2>

        <div className={styles.formGrid}>
          {/* Tipo do projeto */}
          <div className={styles.field}>
            <Label htmlFor="tipoProjeto" className={styles.label}>
              Tipo do projeto
            </Label>
            <select
              id="tipoProjeto"
              name="tipoProjeto"
              value={dados.tipoProjeto}
              onChange={handleChange}
              className={styles.select}
              disabled={isReadOnly}
              aria-readonly={isReadOnly}
            >
              {TIPO_PROJETO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className={styles.field}>
            <Label htmlFor="status" className={styles.label}>
              Status
            </Label>
            <select
              id="status"
              name="status"
              value={dados.status}
              onChange={handleChange}
              className={styles.select}
              disabled={isReadOnly}
              aria-readonly={isReadOnly}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Responsáveis</h2>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <Label htmlFor="responsavelInternoId" className={styles.label}>
              Usuário interno
            </Label>
            <select
              id="responsavelInternoId"
              name="responsavelInternoId"
              value={dados.responsavelInternoId}
              onChange={handleChange}
              className={styles.select}
              disabled={isReadOnly}
              aria-readonly={isReadOnly}
            >
              <option value="">Selecione...</option>
              {USUARIOS_INTERNOS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <Label htmlFor="responsavelExternoId" className={styles.label}>
              Usuário externo
            </Label>
            <select
              id="responsavelExternoId"
              name="responsavelExternoId"
              value={dados.responsavelExternoId}
              onChange={handleChange}
              className={styles.select}
              disabled={isReadOnly}
              aria-readonly={isReadOnly}
            >
              <option value="">Selecione...</option>
              {USUARIOS_EXTERNOS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!isReadOnly && (
          <div className={styles.actions}>
            <GenericButton variant="editar" onClick={() => {}} />
            <GenericButton variant="salvar" onClick={() => {}} />
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Itens Preenchidos</h2>
        <div className={styles.itensList}>
          {(() => {
            const entries = Object.entries(SESSOES_VISAO_GERAL_TITLE).filter(
              ([key]) => key !== "TITLE_SESSAO_OBSERVACOES"
            )
            const half = Math.ceil(entries.length / 2)
            const col1 = entries.slice(0, half)
            const col2 = entries.slice(half)
            const renderCol = (items: [string, string][]) => (
              <ul className={styles.itensCol}>
                {items.map(([key, title]) => (
                  <li key={key} className={styles.itensListItem}>
                    <input
                      type="checkbox"
                      checked={itensConcluidos.has(key)}
                      readOnly
                      tabIndex={-1}
                      aria-label={`${title} ${itensConcluidos.has(key) ? "concluído" : "pendente"}`}
                      className={styles.itensCheckbox}
                    />
                    <span className={styles.itensLabel}>{title}</span>
                  </li>
                ))}
              </ul>
            )
            return (
              <>
                {renderCol(col1)}
                {renderCol(col2)}
              </>
            )
          })()}
        </div>
      </section>
    </div>
  )
}

