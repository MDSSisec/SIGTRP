import type {
  CronogramaDataMapped,
  ProjectModelData,
  StatusProjeto,
} from "@/types/project"
import { parseValorModelo } from "@/lib/utils"
import { STATUS_PROJETO_LIST } from "@/constants/project"

export type {
  CronogramaDataMapped,
  ProjectModelData,
  StatusProjeto,
} from "@/types/project"
export { STATUS_PROJETO_LIST, STATUS_PROJETO_STEPS } from "@/constants/project"

export function mapModeloCronogramaToForm(
  etapasCronograma: ProjectModelData["etapas_cronograma"]
): CronogramaDataMapped {
  if (!etapasCronograma?.metas?.length) return { metas: [] }
  return {
    metas: etapasCronograma.metas.map((m) => ({
      titulo: m.meta ?? "",
      etapas: (m.etapas ?? []).map((e) => ({
        descricao: e.atividade ?? "",
        valor: parseValorModelo(e.valor),
        inicio: e.inicio ?? "",
        termino: e.termino ?? "",
      })),
      quadrosConteudosProgramaticos: [],
      quadroInsumosPorCurso: [],
    })),
  }
}

export function statusToStepIndex(status: StatusProjeto | string): number {
  const i = STATUS_PROJETO_LIST.indexOf(status as StatusProjeto)
  return i >= 0 ? i : 0
}

export function getStatusStyle(status: StatusProjeto): string {
  if (
    status === "TRP em Elaboração" ||
    status === "TRP Submetido à SISEC" ||
    status === "Prestação de Contas em Análise"
  ) {
    return "bg-amber-100 text-amber-800"
  }
  if (
    status === "TRP Aprovado" ||
    status === "Instrumento Celebrado" ||
    status === "Projeto em Execução"
  ) {
    return "bg-blue-100 text-blue-800"
  }
  if (
    status === "Projeto Concluído" ||
    status === "Prestação de Contas Aprovada" ||
    status === "Projeto Encerrado"
  ) {
    return "bg-green-100 text-green-800"
  }
  if (status === "Prestação de Contas com Glosa") {
    return "bg-orange-100 text-orange-800"
  }
  return "bg-gray-100 text-gray-700"
}
