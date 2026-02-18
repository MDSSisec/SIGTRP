import type {
  CronogramaDataMapped,
  ProjectModelData,
} from "@/types/project"
import { parseValorModelo } from "@/lib/utils"
import { STATUS_PROJETO_STEPS } from "@/constants/project"

export type { CronogramaDataMapped, ProjectModelData } from "@/types/project"
export { STATUS_PROJETO_STEPS } from "@/constants/project"

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

export { statusToStepIndex } from "@/services/project.service"
