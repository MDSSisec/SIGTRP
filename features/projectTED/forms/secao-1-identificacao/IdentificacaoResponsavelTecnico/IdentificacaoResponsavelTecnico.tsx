"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/contexts/project-data-context"
import styles from "./IdentificacaoResponsavelTecnico.module.css"
import { SESSOES_VISAO_GERAL_TITLE } from "@/constants/visaoGeral"
import { IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS, IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS } from "@/constants/identificacaoResponsavelTecnico"
import { COMUNS_LABELS } from "@/constants/communs"

interface DadosIdentificacaoResponsavelTecnico {
  nome: string
  cargo: string
  telefone: string
  celular: string
  email: string
}

interface PropsFormularioIdentificacaoResponsavelTecnico {
  onChange?: (dados: DadosIdentificacaoResponsavelTecnico) => void
  projectId?: string
}

const VAZIO_RT: DadosIdentificacaoResponsavelTecnico = {
  nome: "",
  cargo: "",
  telefone: "",
  celular: "",
  email: "",
}

function getInicialResponsavelTecnico(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoResponsavelTecnico {
  const arr = projectData?.identificacao?.responsaveis_tecnicos
  const r = arr?.length ? arr[0] : undefined

  if (!r) return VAZIO_RT

  return {
    nome: r.nome ?? "",
    cargo: r.cargo ?? "",
    telefone: r.telefone ?? "",
    celular: r.telefone ?? "",
    email: r.email ?? "",
  }
}

function FormularioIdentificacaoResponsavelTecnico({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoResponsavelTecnico) {
  const projectData = useProjectData()

  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoResponsavelTecnico>(() =>
    projectId === "2" && projectData ? getInicialResponsavelTecnico(projectData) : VAZIO_RT
  )

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialResponsavelTecnico(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nome" className={styles.label}>
              {COMUNS_LABELS.LABEL_NAME}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="cargo" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_CARGO}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={dadosFormulario.cargo}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CARGO}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="telefone" className={styles.label}>{COMUNS_LABELS.LABEL_NUMERO_DE_TELEFONE}</Label>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="celular" className={styles.label}>{COMUNS_LABELS.LABEL_NUMERO_DE_CELULAR}</Label>
              <Input
                id="celular"
                name={COMUNS_LABELS.LABEL_CELULAR}
                value={dadosFormulario.celular}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CELULAR}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="email" className={styles.label}>{COMUNS_LABELS.LABEL_EMAIL}</Label>
            <Input
              id="email"
              name={COMUNS_LABELS.LABEL_EMAIL}
              type="email"
              value={dadosFormulario.email}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={styles.input}
            />
          </div>
        </div>
      </section>

      <div className={styles.actions}>
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoResponsavelTecnico