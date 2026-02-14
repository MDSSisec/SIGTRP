"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/project-data-context"

interface DadosIdentificacaoRepresentanteLegal {
  nome: string
  matriculaSiape: string
  profissao: string
  cargo: string
  estadoCivil: string
  telefone: string
  email: string
}

interface PropsFormularioIdentificacaoRepresentanteLegal {
  onChange?: (dados: DadosIdentificacaoRepresentanteLegal) => void
  projectId?: string
}

const VAZIO_REP: DadosIdentificacaoRepresentanteLegal = {
  nome: "",
  matriculaSiape: "",
  profissao: "",
  cargo: "",
  estadoCivil: "",
  telefone: "",
  email: "",
}

function getInicialRepresentanteLegal(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoRepresentanteLegal {
  const r = projectData?.identificacao?.representante_legal
  if (!r) return VAZIO_REP
  return {
    nome: r.nome ?? "",
    matriculaSiape: r.matricula ?? "",
    profissao: "",
    cargo: r.cargo ?? "",
    estadoCivil: r.estado_civil ?? "",
    telefone: r.telefone ?? "",
    email: r.email ?? "",
  }
}

function FormularioIdentificacaoRepresentanteLegal({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoRepresentanteLegal) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoRepresentanteLegal>(() =>
    projectId === "2" && projectData ? getInicialRepresentanteLegal(projectData) : VAZIO_REP
  )

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialRepresentanteLegal(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className="space-y-8 rounded-xl bg-muted/50 p-6">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          3. Identificação do Representante Legal do(a) Proponente
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
              placeholder="Nome completo do representante legal"
              className="bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="matriculaSiape" className="font-medium text-foreground">
                Matrícula SIAPE
              </Label>
              <Input
                id="matriculaSiape"
                name="matriculaSiape"
                value={dadosFormulario.matriculaSiape}
                onChange={aoAlterar}
                placeholder="Ex: 1234567"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profissao" className="font-medium text-foreground">
                Profissão
              </Label>
              <Input
                id="profissao"
                name="profissao"
                value={dadosFormulario.profissao}
                onChange={aoAlterar}
                placeholder="Ex: Advogado, Administrador"
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cargo" className="font-medium text-foreground">
                Cargo
              </Label>
              <Input
                id="cargo"
                name="cargo"
                value={dadosFormulario.cargo}
                onChange={aoAlterar}
                placeholder="Ex: Diretor presidente"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estadoCivil" className="font-medium text-foreground">
                Estado Civil
              </Label>
              <Input
                id="estadoCivil"
                name="estadoCivil"
                value={dadosFormulario.estadoCivil}
                onChange={aoAlterar}
                placeholder="Ex: Solteiro(a), Casado(a)"
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="telefone" className="font-medium text-foreground">
                Número de Telefone com DDD
              </Label>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
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
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoRepresentanteLegal
