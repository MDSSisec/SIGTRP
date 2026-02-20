"use client"

import React, { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/components/shared/Buttons/genericButton"
import { useCronograma } from "../CronogramaContext"
import type { CronogramaData, Etapa } from "./types"

interface CronogramaFormProps {
  projectId?: string
  onChange?: (data: CronogramaData) => void
  /** Oculta a coluna Ações (ex.: na visão geral do projeto). */
  readOnlyView?: boolean
}

const novaEtapaVazia = (): Etapa => ({
  descricao: "",
  valor: 0,
  inicio: "",
  termino: "",
})

/** Máscara DD/MM/AAAA: só dígitos, formata com barras. */
function maskDataBr(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/** Formata número para exibição em R$ (BR): 100906.07 → "100.906,07" */
function formatValorBr(num: number): string {
  if (num === 0 || Number.isNaN(num)) return ""
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Converte string em formato BR para número: "100.906,07" → 100906.07 */
function parseValorBr(str: string): number {
  const s = str.replace(/\./g, "").replace(",", ".").trim()
  if (s === "") return 0
  const num = parseFloat(s)
  return Number.isNaN(num) ? 0 : num
}

type EditingValor = { metaIndex: number; etapaIndex: number; value: string }

const CronogramaForm: React.FC<CronogramaFormProps> = ({
  projectId: _projectId,
  onChange,
  readOnlyView = false,
}) => {
  const { data, addMeta, updateMeta, removeMeta } = useCronograma()
  const [editingValor, setEditingValor] = useState<EditingValor | null>(null)

  useEffect(() => {
    onChange?.(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- propagar apenas quando data mudar
  }, [data])

  const totalGeral = data.metas.reduce((acc, meta) => {
    const totalMeta = meta.etapas.reduce(
      (soma, etapa) => soma + (etapa.valor || 0),
      0
    )
    return acc + totalMeta
  }, 0)

  const addLinha = (metaIndex: number) => {
    const meta = data.metas[metaIndex]
    if (!meta) return
    updateMeta(metaIndex, {
      ...meta,
      etapas: [...meta.etapas, novaEtapaVazia()],
    })
  }

  const updateEtapa = (
    metaIndex: number,
    etapaIndex: number,
    field: keyof Etapa,
    value: string | number
  ) => {
    const meta = data.metas[metaIndex]
    if (!meta) return
    const etapas = [...meta.etapas]
    etapas[etapaIndex] = {
      ...etapas[etapaIndex],
      [field]: field === "valor" ? Number(value) : value,
    }
    updateMeta(metaIndex, { ...meta, etapas })
  }

  const removeEtapa = (metaIndex: number, etapaIndex: number) => {
    const meta = data.metas[metaIndex]
    if (!meta) return
    const etapas = meta.etapas.filter((_, i) => i !== etapaIndex)
    updateMeta(metaIndex, { ...meta, etapas })
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <h2 className="text-base font-semibold text-foreground border-b pb-2">
        8. Etapas e cronograma de execução
      </h2>

      <div className="w-full max-w-full overflow-x-auto rounded-lg border border-input bg-muted">
        <table className="w-full min-w-[640px] border-collapse text-sm table-auto" style={{ width: "100%" }}>
          <colgroup>
            <col className="w-0" />
            <col className="min-w-[200px]" />
            <col style={{ minWidth: "10rem", width: "auto" }} />
            <col style={{ minWidth: "7.5rem", width: "auto" }} />
            <col style={{ minWidth: "7.5rem", width: "auto" }} />
            {!readOnlyView && <col className="w-[52px]" />}
          </colgroup>
          <thead>
            <tr className="bg-muted">
              <th className="border border-input px-3 py-2 text-left font-semibold text-foreground whitespace-nowrap">
                Meta nº
              </th>
              <th className="border border-input px-3 py-2 text-left font-semibold text-foreground">
                Etapa
              </th>
              <th className="border border-input px-3 py-2 text-left font-semibold text-foreground whitespace-nowrap min-w-[10rem]">
                Valor (R$)
              </th>
              <th className="border border-input px-3 py-2 text-left font-semibold text-foreground whitespace-nowrap min-w-[7.5rem]">
                Início
              </th>
              <th className="border border-input px-3 py-2 text-left font-semibold text-foreground whitespace-nowrap min-w-[7.5rem]">
                Término
              </th>
              {!readOnlyView && (
                <th className="border border-input px-2 py-2 text-center whitespace-nowrap font-semibold text-foreground">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.metas.map((meta, metaIndex) => {
              const totalMeta = meta.etapas.reduce(
                (s, e) => s + (e.valor || 0),
                0
              )
              const rowSpan = meta.etapas.length + 1 // etapas + linha total

              return (
                <React.Fragment key={metaIndex}>
                  {meta.etapas.length === 0 ? (
                    <>
                      <tr className="bg-background dark:bg-card">
                        <td
                          className="border border-input px-3 py-2 align-top bg-muted/30"
                          rowSpan={2}
                        >
                          <span className="font-medium">Meta {metaIndex + 1}</span>
                        </td>
                        <td className="border border-input px-3 py-2 text-muted-foreground">
                          Nenhuma etapa.
                        </td>
                        <td colSpan={3} className="border border-input px-3 py-2" />
                        {!readOnlyView && (
                          <td className="border border-input px-2 py-2 text-right">
                            <GenericButton
                              variant="outline"
                              size="xs"
                              onClick={() => addLinha(metaIndex)}
                            >
                              + Linha
                            </GenericButton>
                          </td>
                        )}
                      </tr>
                      <tr className="bg-muted/40 font-medium">
                        <td className="border border-input px-3 py-2 text-foreground align-middle">
                          Total da Meta {metaIndex + 1}
                        </td>
                        <td className="border border-input px-3 py-2 align-middle">R$ 0,00</td>
                        <td className="border border-input p-1 align-middle">
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={meta.inicio ?? ""}
                            onChange={(e) =>
                              updateMeta(metaIndex, { ...meta, inicio: maskDataBr(e.target.value) })
                            }
                            className="h-8 bg-background dark:bg-input/30 border-input"
                          />
                        </td>
                        <td className="border border-input p-1 align-middle">
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={meta.termino ?? ""}
                            onChange={(e) =>
                              updateMeta(metaIndex, { ...meta, termino: maskDataBr(e.target.value) })
                            }
                            className="h-8 bg-background dark:bg-input/30 border-input"
                          />
                        </td>
                        {!readOnlyView && <td className="border border-input px-2 py-2 align-middle" />}
                      </tr>
                    </>
                  ) : (
                    meta.etapas.map((etapa, etapaIndex) => (
                      <tr key={etapaIndex} className="bg-background dark:bg-card">
                        {etapaIndex === 0 && (
                          <td
                            className="border border-input px-3 py-2 align-top bg-muted/30 font-medium"
                            rowSpan={rowSpan}
                          >
                            Meta {metaIndex + 1}
                          </td>
                        )}
                        <td className="border border-input p-2 align-top w-full min-w-0">
                          <div className="flex items-start gap-2 w-full min-w-0">
                            <span className="text-xs font-medium text-foreground shrink-0 pt-2">
                              Etapa:
                            </span>
                            <textarea
                              value={etapa.descricao}
                              onChange={(e) =>
                                updateEtapa(
                                  metaIndex,
                                  etapaIndex,
                                  "descricao",
                                  e.target.value
                                )
                              }
                              placeholder="Descrição da etapa"
                              rows={2}
                              className="flex-1 min-w-0 w-full rounded-md border border-input bg-background dark:bg-input/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-y min-h-[2.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                          </div>
                        </td>
                        <td className="border border-input p-1 align-top">
                          <Input
                            type="text"
                            inputMode="decimal"
                            placeholder="0,00"
                            value={
                              editingValor?.metaIndex === metaIndex &&
                              editingValor?.etapaIndex === etapaIndex
                                ? editingValor.value
                                : etapa.valor === 0
                                  ? ""
                                  : formatValorBr(etapa.valor)
                            }
                            onFocus={() =>
                              setEditingValor({
                                metaIndex,
                                etapaIndex,
                                value:
                                  etapa.valor === 0
                                    ? ""
                                    : formatValorBr(etapa.valor),
                              })
                            }
                            onChange={(e) =>
                              setEditingValor((prev) =>
                                prev &&
                                prev.metaIndex === metaIndex &&
                                prev.etapaIndex === etapaIndex
                                  ? { ...prev, value: e.target.value }
                                  : {
                                      metaIndex,
                                      etapaIndex,
                                      value: e.target.value,
                                    }
                              )
                            }
                            onBlur={() => {
                              setEditingValor((prev) => {
                                if (
                                  prev &&
                                  prev.metaIndex === metaIndex &&
                                  prev.etapaIndex === etapaIndex
                                ) {
                                  const num = parseValorBr(prev.value)
                                  updateEtapa(metaIndex, etapaIndex, "valor", num)
                                  return null
                                }
                                return prev
                              })
                            }}
                            className="h-8 bg-background dark:bg-input/30 border-input"
                          />
                        </td>
                        <td className="border border-input p-1 align-top">
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={etapa.inicio}
                            onChange={(e) =>
                              updateEtapa(
                                metaIndex,
                                etapaIndex,
                                "inicio",
                                maskDataBr(e.target.value)
                              )
                            }
                            className="h-8 bg-background dark:bg-input/30 border-input"
                          />
                        </td>
                        <td className="border border-input p-1 align-top">
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={etapa.termino}
                            onChange={(e) =>
                              updateEtapa(
                                metaIndex,
                                etapaIndex,
                                "termino",
                                maskDataBr(e.target.value)
                              )
                            }
                            className="h-8 bg-background dark:bg-input/30 border-input"
                          />
                        </td>
                        {!readOnlyView && (
                          <td className="border border-input px-2 py-1 align-top text-center">
                            <GenericButton
                              variant="ghost"
                              size="icon-sm"
                              icon={Trash2}
                              title="Excluir etapa"
                              className="bg-black text-white hover:bg-black/90 hover:text-white rounded-md transition-colors"
                              onClick={() => removeEtapa(metaIndex, etapaIndex)}
                            />
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                  {/* Linha Total da Meta (1ª coluna já coberta pelo rowSpan de "Meta X") */}
                  {meta.etapas.length > 0 && (
                    <tr className="bg-muted/40 font-medium">
                      <td className="border border-input px-3 py-2 text-foreground align-middle">
                        Total da Meta {metaIndex + 1}
                      </td>
                      <td className="border border-input px-3 py-2 text-foreground align-middle">
                        R$ {totalMeta.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-input p-1 align-middle">
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="00/00/0000"
                          value={meta.inicio ?? ""}
                          onChange={(e) =>
                            updateMeta(metaIndex, { ...meta, inicio: maskDataBr(e.target.value) })
                          }
                          className="h-8 bg-background dark:bg-input/30 border-input"
                        />
                      </td>
                      <td className="border border-input p-1 align-middle">
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="00/00/0000"
                          value={meta.termino ?? ""}
                          onChange={(e) =>
                            updateMeta(metaIndex, { ...meta, termino: maskDataBr(e.target.value) })
                          }
                          className="h-8 bg-background dark:bg-input/30 border-input"
                        />
                      </td>
                      {!readOnlyView && (
                        <td className="border border-input px-2 py-2 text-center align-middle">
                          <GenericButton
                            variant="outline"
                            size="xs"
                            onClick={() => addLinha(metaIndex)}
                          >
                            + Linha
                          </GenericButton>
                        </td>
                      )}
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <GenericButton variant="outline" size="sm" onClick={() => addMeta()}>
          Adicionar meta
        </GenericButton>
        <div className="font-semibold text-foreground">
          Total Geral: R$ {totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  )
}

export default CronogramaForm
export { CronogramaForm as EtapasCronograma }
