"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import {
  PROJECT_TYPE_OPTIONS,
  STATUS_PROJETO_LIST,
  type ProjectTipo,
  type StatusProjeto,
} from "@/constants/project"
import type { ProjectFormSectionProps } from "../sections-map"
import projetosData from "@/data/projetos.json"
import styles from "./informacoesDoProjeto.module.css"

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

  return (
    <div className={styles.container}>
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
      </section>

      {!isReadOnly && (
        <div className={styles.actions}>
          <GenericButton variant="editar" onClick={() => {}} />
          <GenericButton variant="salvar" onClick={() => {}} />
        </div>
      )}
    </div>
  )
}

