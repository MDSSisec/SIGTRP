"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/project-data-context"

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

/** Converte DD/MM/YYYY para YYYY-MM-DD (input type="date") */
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
    <div className="space-y-8">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          2. Identificação do(a) Proponente
        </h2>

        <div className="grid gap-5 sm:grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="nome" className="font-medium text-foreground">
              Nome
            </Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder="Nome do proponente"
              className="bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cnpj" className="font-medium text-foreground">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={dadosFormulario.cnpj}
                onChange={aoAlterar}
                placeholder="00.000.000/0000-00"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataFundacao" className="font-medium text-foreground">
                Data da Fundação
              </Label>
              <Input
                id="dataFundacao"
                name="dataFundacao"
                type="date"
                value={dadosFormulario.dataFundacao}
                onChange={aoAlterar}
                className="bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registroCnpj" className="font-medium text-foreground">
              Registro no CNPJ
            </Label>
            <Input
              id="registroCnpj"
              name="registroCnpj"
              value={dadosFormulario.registroCnpj}
              onChange={aoAlterar}
              placeholder="Número do registro"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enderecoCompleto" className="font-medium text-foreground">
              Endereço Completo
            </Label>
            <Input
              id="enderecoCompleto"
              name="enderecoCompleto"
              value={dadosFormulario.enderecoCompleto}
              onChange={aoAlterar}
              placeholder="Rua, número, complemento"
              className="bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cep" className="font-medium text-foreground">
                CEP
              </Label>
              <Input
                id="cep"
                name="cep"
                value={dadosFormulario.cep}
                onChange={aoAlterar}
                placeholder="00000-000"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uf" className="font-medium text-foreground">
                UF
              </Label>
              <Input
                id="uf"
                name="uf"
                value={dadosFormulario.uf}
                onChange={aoAlterar}
                placeholder="SE"
                maxLength={2}
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bairro" className="font-medium text-foreground">
                Bairro
              </Label>
              <Input
                id="bairro"
                name="bairro"
                value={dadosFormulario.bairro}
                onChange={aoAlterar}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipio" className="font-medium text-foreground">
                Município
              </Label>
              <Input
                id="municipio"
                name="municipio"
                value={dadosFormulario.municipio}
                onChange={aoAlterar}
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="telefoneFax" className="font-medium text-foreground">
                Telefone / Fax (com DDD)
              </Label>
              <Input
                id="telefoneFax"
                name="telefoneFax"
                value={dadosFormulario.telefoneFax}
                onChange={aoAlterar}
                placeholder="(79) 99999-9999"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-foreground">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={dadosFormulario.email}
                onChange={aoAlterar}
                placeholder="exemplo@email.com"
                className="bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paginaWeb" className="font-medium text-foreground">
              Página na WEB (site)
            </Label>
            <Input
              id="paginaWeb"
              name="paginaWeb"
              value={dadosFormulario.paginaWeb}
              onChange={aoAlterar}
              placeholder="https://..."
              className="bg-white"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoProponente
