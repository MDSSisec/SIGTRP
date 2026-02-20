"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useProjectData } from "@/lib/contexts/project-data-context"

interface DadosResultadosEsperados {
  resultados: string[]
}

interface PropsFormularioResultadosEsperados {
  onChange?: (dados: DadosResultadosEsperados) => void
  projectId?: string
}

const VAZIO: DadosResultadosEsperados = { resultados: [""] }

function FormularioResultadosEsperados({
  onChange,
  projectId,
}: PropsFormularioResultadosEsperados) {
  const projectData = useProjectData()
  const iniciais =
    projectId === "2" && projectData?.resultados_esperados?.itens?.length
      ? { resultados: projectData.resultados_esperados!.itens!.slice() }
      : VAZIO
  const [dadosFormulario, setDadosFormulario] = useState<DadosResultadosEsperados>(iniciais)

  const aoAlterarResultado = (indice: number, valor: string) => {
    const atualizados = [...dadosFormulario.resultados]
    atualizados[indice] = valor
    const novos = { resultados: atualizados }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const adicionarResultado = () => {
    const novos = {
      resultados: [...dadosFormulario.resultados, ""],
    }
    setDadosFormulario(novos)
  }

  const removerResultado = (indice: number) => {
    const atualizados = dadosFormulario.resultados.filter((_, i) => i !== indice)
    const novos = { resultados: atualizados }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const resultados = dadosFormulario.resultados

  return (
    <div className="space-y-8 rounded-xl bg-gray-50 dark:bg-black p-6 border border-gray-100 dark:border-neutral-800">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Resultados esperados
          </h2>
          <GenericButton variant="outline" size="sm" onClick={adicionarResultado}>
            Adicionar resultado
          </GenericButton>
        </div>

        <div className="space-y-4">
          {resultados.map((texto, indice) => (
            <div
              key={indice}
              className="space-y-2 rounded-lg border border-input bg-white p-4"
            >
              <Label
                htmlFor={`resultado-${indice}`}
                className="font-medium text-foreground"
              >
                Resultado {indice + 1}.
              </Label>
              <Input
                id={`resultado-${indice}`}
                value={texto}
                onChange={(e) => aoAlterarResultado(indice, e.target.value)}
                placeholder="Descreva o resultado esperado..."
                className="bg-white text-gray-900"
              />
              <div className="flex justify-end">
                {resultados.length > 1 && (
                  <GenericButton
                    variant="destructive"
                    size="sm"
                    onClick={() => removerResultado(indice)}
                  >
                    Excluir
                  </GenericButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export function ResultadosEsperados(props: PropsFormularioResultadosEsperados) {
  return <FormularioResultadosEsperados {...props} />
}
