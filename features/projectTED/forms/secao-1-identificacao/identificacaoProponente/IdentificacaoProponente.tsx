"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import styles from "./IdentificacaoProponente.module.css"
import { useProjectData } from "@/lib/contexts/project-data-context"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { 
  IDENTIFICACAO_PROPONENTE_LABELS, 
  IDENTIFICACAO_PROPONENTE_PLACEHOLDERS
} from "@/constants/identificacaoProponente"

interface DadosIdentificacaoProponente {
  nome: string
  cnpj: string
  dataFundacao: string
  registroCnpj: string
  enderecoCompleto: string
  bairro: string
  municipio: string
  cep: string
  uf: string
  telefoneFax: string
  email: string
  paginaWeb: string
}

interface PropsFormularioIdentificacaoProponente {
  onChange?: (dados: DadosIdentificacaoProponente) => void
  projectId?: string
}

const VAZIO_Proponente: DadosIdentificacaoProponente = {
  nome: "",
  cnpj: "",
  dataFundacao: "",
  registroCnpj: "",
  enderecoCompleto: "",
  bairro: "",
  municipio: "",
  cep: "",
  uf: "",
  telefoneFax: "",
  email: "",
  paginaWeb: "",
}

function dataBrParaInput(d: string | undefined): string {
  if (!d) return ""
  const parts = d.trim().split(/[/-]/)
  if (parts.length !== 3) return d
  const [a, b, c] = parts
  if (a.length === 4) return d
  return `${c}-${b.padStart(2, "0")}-${a.padStart(2, "0")}`
}

function getInicialProponente(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoProponente {
  const e = projectData?.identificacao?.entidade_proponente
  if (!e) return VAZIO_Proponente

  const end = e.endereco
  const contato = e.contato
  const email = contato?.emails?.length ? contato.emails[0] ?? "" : ""

  return {
    nome: e.nome ?? "",
    cnpj: e.cnpj ?? "",
    dataFundacao: dataBrParaInput(e.data_fundacao) || (e.data_fundacao ?? ""),
    registroCnpj: e.registro_cnpj ?? "",
    enderecoCompleto: end?.logradouro ?? "",
    bairro: end?.bairro ?? "",
    municipio: end?.municipio ?? "",
    cep: end?.cep ?? "",
    uf: end?.uf ?? "",
    telefoneFax: contato?.telefone ?? "",
    email,
    paginaWeb: contato?.site ?? "",
  }
}

function FormularioIdentificacaoProponente({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoProponente) {
  const projectData = useProjectData()

  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProponente>(() =>
    projectId === "2" && projectData ? getInicialProponente(projectData) : VAZIO_Proponente
  )

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialProponente(projectData))
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
        <h2 className={styles.title}>2. Identificação do(a) Proponente</h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nome" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_NOME}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="cnpj" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CNPJ}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={dadosFormulario.cnpj}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CNPJ}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="dataFundacao" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_DATA_FUNDACAO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="dataFundacao"
                name="dataFundacao"
                type="date"
                value={dadosFormulario.dataFundacao}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="registroCnpj" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_REGISTRO_CNPJ}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="registroCnpj"
              name="registroCnpj"
              value={dadosFormulario.registroCnpj}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_REGISTRO_CNPJ}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="enderecoCompleto" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_ENDERECO_COMPLETO}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="enderecoCompleto"
              name="enderecoCompleto"
              value={dadosFormulario.enderecoCompleto}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_ENDERECO_COMPLETO}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="cep" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CEP}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="cep"
                name="cep"
                value={dadosFormulario.cep}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CEP}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="uf" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_UF}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="uf"
                name="uf"
                value={dadosFormulario.uf}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_UF}
                maxLength={2}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="bairro" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_BAIRRO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="bairro"
                name="bairro"
                value={dadosFormulario.bairro}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="municipio" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_MUNICIPIO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="municipio"
                name="municipio"
                value={dadosFormulario.municipio}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="telefoneFax" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_TELEFONE_FAX}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="telefoneFax"
                name="telefoneFax"
                value={dadosFormulario.telefoneFax}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_TELEFONE_FAX}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="email" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_EMAIL}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={dadosFormulario.email}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_EMAIL}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="paginaWeb" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_PAGINA_WEB}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="paginaWeb"
              name="paginaWeb"
              value={dadosFormulario.paginaWeb}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_PAGINA_WEB}
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

export default FormularioIdentificacaoProponente