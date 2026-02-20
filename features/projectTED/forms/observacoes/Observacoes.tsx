"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { getSidebarConfig } from "@/services/sidebar.service"
import { cn } from "@/lib/utils"

export type StatusObservacao = "aberto" | "concluido"

export interface ItemObservacao {
  usuario: string
  observacao: string
  status: StatusObservacao
  resolucao: string
}

interface DadosObservacoes {
  itens: ItemObservacao[]
}

interface PropsFormularioObservacoes {
  onChange?: (dados: DadosObservacoes) => void
  projectId?: string
}

const classeInput =
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm text-gray-900"

const classeTextarea = cn(
  classeInput,
  "min-h-[6rem] resize-y"
)

const classeSelect = cn(
  "border-input w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm cursor-pointer text-gray-900"
)

function FormularioObservacoes({ onChange }: PropsFormularioObservacoes) {
  const pathname = usePathname()
  const usuarioAtual = getSidebarConfig(pathname)?.user?.name ?? "adm"

  const [dadosFormulario, setDadosFormulario] = useState<DadosObservacoes>({
    itens: [],
  })

  const aoAlterarItem = (
    indice: number,
    campo: keyof ItemObservacao,
    valor: string | StatusObservacao
  ) => {
    const atualizados = [...dadosFormulario.itens]
    atualizados[indice] = { ...atualizados[indice], [campo]: valor }
    const novos = { itens: atualizados }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const adicionarObservacao = () => {
    const novoItem: ItemObservacao = {
      usuario: usuarioAtual,
      observacao: "",
      status: "aberto",
      resolucao: "",
    }
    const novos = { itens: [...dadosFormulario.itens, novoItem] }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const itens = dadosFormulario.itens

  return (
    <div className="space-y-8 rounded-xl bg-gray-50 dark:bg-black p-6 border border-gray-100 dark:border-neutral-800">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-2">
          <h2 className="text-base font-semibold text-foreground">
            Observações
          </h2>
          <GenericButton
            variant="outline"
            size="sm"
            onClick={adicionarObservacao}
          >
            Adicionar observação
          </GenericButton>
        </div>

        <p className="text-muted-foreground text-sm">
          Itens registrados pelos funcionários do MDS ao longo do projeto.
        </p>

        <div className="space-y-4">
          {itens.length === 0 ? (
            <p className="rounded-lg border border-dashed border-input bg-white/50 py-8 text-center text-sm text-muted-foreground">
              Nenhuma observação cadastrada. Clique em &quot;Adicionar observação&quot; para incluir.
            </p>
          ) : (
            itens.map((item, indice) => (
              <div
                key={indice}
                className="space-y-4 rounded-lg border border-input bg-white p-4"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  Observação {indice + 1}
                </span>

                <div className="grid gap-4 sm:grid-cols-1">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`observacao-usuario-${indice}`}
                      className="font-medium text-foreground"
                    >
                      Usuário
                    </Label>
                    <Input
                      id={`observacao-usuario-${indice}`}
                      value={item.usuario}
                      readOnly
                      placeholder="Usuário do sistema"
                      className="bg-muted/50 cursor-default"
                      title="Usuário preenchido automaticamente pelo sistema"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`observacao-texto-${indice}`}
                      className="font-medium text-foreground"
                    >
                      Observação
                    </Label>
                    <textarea
                      id={`observacao-texto-${indice}`}
                      value={item.observacao}
                      onChange={(e) =>
                        aoAlterarItem(indice, "observacao", e.target.value)
                      }
                      placeholder="Descreva a observação..."
                      className={classeTextarea}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`observacao-status-${indice}`}
                      className="font-medium text-foreground"
                    >
                      Status
                    </Label>
                    <select
                      id={`observacao-status-${indice}`}
                      value={item.status}
                      onChange={(e) =>
                        aoAlterarItem(
                          indice,
                          "status",
                          e.target.value as StatusObservacao
                        )
                      }
                      className={classeSelect}
                    >
                      <option value="aberto">Aberto</option>
                      <option value="concluido">Concluído</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`observacao-resolucao-${indice}`}
                      className="font-medium text-foreground"
                    >
                      Resolução
                    </Label>
                    <textarea
                      id={`observacao-resolucao-${indice}`}
                      value={item.resolucao}
                      onChange={(e) =>
                        aoAlterarItem(indice, "resolucao", e.target.value)
                      }
                      placeholder={
                        item.status === "concluido"
                          ? "Descreva como foi resolvido..."
                          : "Preencha ao concluir a observação."
                      }
                      className={classeTextarea}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

type Props = { projectId?: string; onChange?: (dados: DadosObservacoes) => void }

export function Observacoes({ projectId, onChange }: Props) {
  return <FormularioObservacoes projectId={projectId} onChange={onChange} />
}
