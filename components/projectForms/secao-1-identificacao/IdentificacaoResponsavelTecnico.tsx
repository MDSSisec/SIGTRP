"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"

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

function FormularioIdentificacaoResponsavelTecnico({
  onChange,
}: PropsFormularioIdentificacaoResponsavelTecnico) {
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosIdentificacaoResponsavelTecnico>({
      nome: "",
      cargo: "",
      telefone: "",
      celular: "",
      email: "",
    })

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
          4. Identificação do Responsável Técnico pelo Projeto
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
              placeholder="Nome completo do responsável técnico"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo" className="font-medium text-foreground">
              Cargo
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={dadosFormulario.cargo}
              onChange={aoAlterar}
              placeholder="Ex: Coordenador do projeto"
              className="bg-white"
            />
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
                placeholder="(79) 3333-3333"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="celular" className="font-medium text-foreground">
                Número de Celular com DDD
              </Label>
              <Input
                id="celular"
                name="celular"
                value={dadosFormulario.celular}
                onChange={aoAlterar}
                placeholder="(79) 99999-9999"
                className="bg-white"
              />
            </div>
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
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoResponsavelTecnico
