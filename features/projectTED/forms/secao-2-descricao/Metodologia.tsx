"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useCronograma } from "./CronogramaContext"
import { cn } from "@/lib/utils"
import type {
  QuadroConteudoProgramatico,
  QuadroInsumoCurso,
} from "./etapas-cronograma/types"

const classeDoTextarea =
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] min-h-[6rem] resize-y md:text-sm text-gray-900"

const linhaConteudoVazia = (): QuadroConteudoProgramatico => ({
  curso: "",
  cargaHoraria: "",
  quantidadeAlunosTurmas: "",
  conteudosBasicos: "",
  conteudosEspecificos: "",
  aulasPraticas: "",
})

const linhaInsumoVazia = (): QuadroInsumoCurso => ({
  descricaoItem: "",
  unidade: "",
  quantidade: "",
  formasComprovação: "",
})

type Props = { projectId?: string }

export function Metodologia({ projectId: _projectId }: Props) {
  const { data, updateMeta } = useCronograma()
  const metas = data.metas

  if (metas.length === 0) {
    return (
      <div className="space-y-8 rounded-xl bg-gray-50 dark:bg-black p-6 border border-gray-100 dark:border-neutral-800">
        <h2 className="text-base font-semibold text-foreground border-b pb-2">
          9. Metodologia
        </h2>
        <p className="text-muted-foreground text-sm">
          Adicione metas na seção 7 (Metas) ou na seção 8 (Etapas e cronograma)
          para preencher a metodologia aqui.
        </p>
        <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
          <GenericButton variant="editar" onClick={() => {}} />
          <GenericButton variant="salvar" onClick={() => {}} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 rounded-xl bg-gray-50 dark:bg-black p-6 border border-gray-100 dark:border-neutral-800">
      <h2 className="text-base font-semibold text-foreground border-b pb-2">
        9. Metodologia
      </h2>

      <div className="space-y-10">
        {metas.map((meta, metaIndex) => {
          const quadrosConteudos =
            meta.quadrosConteudosProgramaticos ?? []
          const quadrosInsumos = meta.quadroInsumosPorCurso ?? []

          return (
            <section key={metaIndex} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor={`metodologia-meta-${metaIndex}`}
                  className="font-semibold text-foreground"
                >
                  9.{metaIndex + 1}. Metodologia da Meta {metaIndex + 1}
                </Label>
                <textarea
                  id={`metodologia-meta-${metaIndex}`}
                  value={meta.titulo}
                  onChange={(e) =>
                    updateMeta(metaIndex, { ...meta, titulo: e.target.value })
                  }
                  placeholder="Ex: Realizar capacitações técnicas na área de xxxxx para xxx pessoas em situação de vulnerabilidade social."
                  rows={3}
                  className={cn(classeDoTextarea)}
                />
              </div>

              {meta.etapas.length > 0 && (
                <div className="ml-4 space-y-4 border-l-2 border-muted pl-4">
                  {meta.etapas.map((etapa, etapaIndex) => (
                    <div key={etapaIndex} className="space-y-2">
                      <Label
                        htmlFor={`metodologia-etapa-${metaIndex}-${etapaIndex}`}
                        className="font-medium text-foreground text-sm"
                      >
                        9.{metaIndex + 1}.{etapaIndex + 1}. Etapa {metaIndex + 1}
                        .{etapaIndex + 1}
                      </Label>
                      <textarea
                        id={`metodologia-etapa-${metaIndex}-${etapaIndex}`}
                        value={etapa.descricao}
                        onChange={(e) => {
                          const novasEtapas = [...meta.etapas]
                          novasEtapas[etapaIndex] = {
                            ...etapa,
                            descricao: e.target.value,
                          }
                          updateMeta(metaIndex, {
                            ...meta,
                            etapas: novasEtapas,
                          })
                        }}
                        placeholder="Ex: Planejamento, execução e monitoramento das ações/atividades do Projeto..."
                        rows={2}
                        className={cn(classeDoTextarea, "min-h-[4rem]")}
                      />
                    </div>
                  ))}
                </div>
              )}

              {meta.etapas.length === 0 && (
                <p className="ml-4 text-muted-foreground text-sm">
                  Nenhuma etapa nesta meta. Adicione etapas na seção 8 (Etapas e
                  cronograma).
                </p>
              )}

              {/* QUADROS DOS CONTEÚDOS PROGRAMATICOS */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground text-sm">
                  QUADROS DOS CONTEÚDOS PROGRAMÁTICOS
                </h3>
                <div className="overflow-x-auto rounded-lg border border-input bg-white">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/60">
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Curso
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Carga horária
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Quantidade de alunos/Turmas/carga horária diária
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Conteúdos básicos
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Conteúdos específicos
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Aulas práticas
                        </th>
                        <th className="border border-input px-1 w-8" />
                      </tr>
                    </thead>
                    <tbody>
                      {quadrosConteudos.map((linha, rowIndex) => (
                        <tr key={rowIndex} className="bg-white">
                          {(
                            [
                              "curso",
                              "cargaHoraria",
                              "quantidadeAlunosTurmas",
                              "conteudosBasicos",
                              "conteudosEspecificos",
                              "aulasPraticas",
                            ] as const
                          ).map((campo) => (
                            <td key={campo} className="border border-input p-1">
                              <Input
                                value={linha[campo]}
                                onChange={(e) => {
                                  const novas = [...quadrosConteudos]
                                  novas[rowIndex] = {
                                    ...linha,
                                    [campo]: e.target.value,
                                  }
                                  updateMeta(metaIndex, {
                                    ...meta,
                                    quadrosConteudosProgramaticos: novas,
                                  })
                                }}
                                placeholder="—"
                                className="h-8 bg-white border-input text-sm text-gray-900"
                              />
                            </td>
                          ))}
                          <td className="border border-input p-1">
                            <GenericButton
                              variant="ghost"
                              size="icon-xs"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                const novas = quadrosConteudos.filter(
                                  (_, i) => i !== rowIndex
                                )
                                updateMeta(metaIndex, {
                                  ...meta,
                                  quadrosConteudosProgramaticos: novas,
                                })
                              }}
                            >
                              ✕
                            </GenericButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateMeta(metaIndex, {
                      ...meta,
                      quadrosConteudosProgramaticos: [
                        ...quadrosConteudos,
                        linhaConteudoVazia(),
                      ],
                    })
                  }
                >
                  + Linha (conteúdos programáticos)
                </GenericButton>
              </div>

              {/* QUADRO DE INSUMOS POR CURSO */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground text-sm">
                  QUADRO DE INSUMOS POR CURSO
                </h3>
                <div className="overflow-x-auto rounded-lg border border-input bg-white">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/60">
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Descrição do Item
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Unidade
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Quantidade
                        </th>
                        <th className="border border-input px-2 py-1.5 text-left font-medium text-foreground">
                          Formas de comprovação de entregas
                        </th>
                        <th className="border border-input px-1 w-8" />
                      </tr>
                    </thead>
                    <tbody>
                      {quadrosInsumos.map((linha, rowIndex) => (
                        <tr key={rowIndex} className="bg-white">
                          {(
                            [
                              "descricaoItem",
                              "unidade",
                              "quantidade",
                              "formasComprovação",
                            ] as const
                          ).map((campo) => (
                            <td key={campo} className="border border-input p-1">
                              <Input
                                value={linha[campo]}
                                onChange={(e) => {
                                  const novas = [...quadrosInsumos]
                                  novas[rowIndex] = {
                                    ...linha,
                                    [campo]: e.target.value,
                                  }
                                  updateMeta(metaIndex, {
                                    ...meta,
                                    quadroInsumosPorCurso: novas,
                                  })
                                }}
                                placeholder="—"
                                className="h-8 bg-white border-input text-sm text-gray-900"
                              />
                            </td>
                          ))}
                          <td className="border border-input p-1">
                            <GenericButton
                              variant="ghost"
                              size="icon-xs"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                const novas = quadrosInsumos.filter(
                                  (_, i) => i !== rowIndex
                                )
                                updateMeta(metaIndex, {
                                  ...meta,
                                  quadroInsumosPorCurso: novas,
                                })
                              }}
                            >
                              ✕
                            </GenericButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateMeta(metaIndex, {
                      ...meta,
                      quadroInsumosPorCurso: [
                        ...quadrosInsumos,
                        linhaInsumoVazia(),
                      ],
                    })
                  }
                >
                  + Linha (insumos por curso)
                </GenericButton>
              </div>
            </section>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}
