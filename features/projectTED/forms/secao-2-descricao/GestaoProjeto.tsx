"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/contexts/project-data-context"
import { cn } from "@/lib/utils"

const classeTextarea =
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] min-h-[6rem] resize-y md:text-sm text-gray-900"

interface GestaoProjetoProps {
  projectId?: string
}

export default function GestaoProjeto({ projectId }: GestaoProjetoProps) {
  const projectData = useProjectData()
  const g = projectData?.gestao_projeto
  const [dimensionamentoEquipe, setDimensionamentoEquipe] = useState(
    projectId === "2" && g?.dimensionamento_equipe ? g.dimensionamento_equipe : ""
  )
  const [necessidade, setNecessidade] = useState(
    projectId === "2" && g?.dimensionamento_contratacoes?.necessidade
      ? g.dimensionamento_contratacoes.necessidade
      : ""
  )
  const [servicosOuBens, setServicosOuBens] = useState(
    projectId === "2" && g?.dimensionamento_contratacoes?.servicos_ou_bens
      ? g.dimensionamento_contratacoes.servicos_ou_bens
      : ""
  )
  const [formaSelecao, setFormaSelecao] = useState(
    projectId === "2" && g?.dimensionamento_contratacoes?.forma_selecao
      ? g.dimensionamento_contratacoes.forma_selecao
      : ""
  )

  return (
    <div className="space-y-8 rounded-xl bg-gray-50 dark:bg-black p-6 border border-gray-100 dark:border-neutral-800">
      <h2 className="text-base font-semibold text-foreground border-b pb-2">
        11. Gestão do Projeto
      </h2>

      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gestao-dimensionamento-equipe" className="font-medium text-foreground">
            11.1. Dimensionamento da equipe
          </Label>
          <textarea
            id="gestao-dimensionamento-equipe"
            value={dimensionamentoEquipe}
            onChange={(e) => setDimensionamentoEquipe(e.target.value)}
            placeholder="Descreva o dimensionamento da equipe..."
            rows={4}
            className={cn(classeTextarea)}
          />
        </div>

        <div className="space-y-3 rounded-lg border border-input bg-white p-4">
          <h3 className="font-semibold text-foreground text-sm">
            11.2. Dimensionamento de contratações
          </h3>
          <div className="space-y-2">
            <Label htmlFor="gestao-necessidade" className="font-medium text-foreground text-sm">
              Necessidade
            </Label>
            <textarea
              id="gestao-necessidade"
              value={necessidade}
              onChange={(e) => setNecessidade(e.target.value)}
              placeholder="Ex: Realização dos Cursos"
              rows={2}
              className={cn(classeTextarea, "min-h-[4rem]")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gestao-servicos-bens" className="font-medium text-foreground text-sm">
              Serviços ou bens
            </Label>
            <textarea
              id="gestao-servicos-bens"
              value={servicosOuBens}
              onChange={(e) => setServicosOuBens(e.target.value)}
              placeholder="Descreva os serviços ou bens a serem contratados..."
              rows={3}
              className={cn(classeTextarea)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gestao-forma-selecao" className="font-medium text-foreground text-sm">
              Forma de seleção
            </Label>
            <textarea
              id="gestao-forma-selecao"
              value={formaSelecao}
              onChange={(e) => setFormaSelecao(e.target.value)}
              placeholder="Ex: Processo Licitatório"
              rows={2}
              className={cn(classeTextarea, "min-h-[4rem]")}
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
