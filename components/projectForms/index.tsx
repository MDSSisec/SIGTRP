"use client"

import type { ComponentType } from "react"
import { IdentificacaoProjeto } from "./secao-1-identificacao/IdentificacaoProjeto"
import { IdentificacaoProponente } from "./secao-1-identificacao/IdentificacaoProponente"
import { IdentificacaoRepresentanteLegal } from "./secao-1-identificacao/IdentificacaoRepresentanteLegal"
import { Justificativa } from "./secao-2-descricao/Justificativa"
import { Objetivos } from "./secao-2-descricao/Objetivos"
import { Metas } from "./secao-2-descricao/Metas"
import { EtapasCronograma } from "./secao-2-descricao/EtapasCronograma"
import { Metodologia } from "./secao-2-descricao/Metodologia"
import { ResultadosEsperados } from "./secao-2-descricao/ResultadosEsperados"
import { GestaoProjeto } from "./secao-2-descricao/GestaoProjeto"
import { HistoricoSituacaoTerritorio } from "./secao-3-participantes/HistoricoSituacaoTerritorio"
import { BaseTerritorial } from "./secao-3-participantes/BaseTerritorial"
import { PublicoBeneficiario } from "./secao-3-participantes/PublicoBeneficiario"
import { PovosComunidadesTradicionais } from "./secao-3-participantes/PovosComunidadesTradicionais"
import { PerfilSocioOcupacional } from "./secao-3-participantes/PerfilSocioOcupacional"
import { ServicosAcessados } from "./secao-3-participantes/ServicosAcessados"
import { OutrasInformacoesProponente } from "./secao-4-caracterizacao/OutrasInformacoesProponente"
import { ValorTotal } from "./secao-5-planilhas/ValorTotal"
import { CronogramaDesembolso } from "./secao-5-planilhas/CronogramaDesembolso"
import { DetalhamentoOrcamento } from "./secao-5-planilhas/DetalhamentoOrcamento"
import { ResumoPlanoAplicacao } from "./secao-5-planilhas/ResumoPlanoAplicacao"
import { ProcedimentosMonitoramento } from "./secao-6-monitoramento/ProcedimentosMonitoramento"
import { IndicadoresEficiencia } from "./secao-6-monitoramento/IndicadoresEficiencia"
import { Observacoes } from "./observacoes/Observacoes"

export type ProjectFormSectionProps = { projectId?: string }

/** Mapeamento slug (query ?secao=) → componente do formulário TRP */
export const PROJECT_FORM_SECTIONS: Record<string, ComponentType<ProjectFormSectionProps>> = {
  "identificacao-projeto": IdentificacaoProjeto,
  "identificacao-proponente": IdentificacaoProponente,
  "identificacao-representante-legal": IdentificacaoRepresentanteLegal,
  justificativa: Justificativa,
  objetivos: Objetivos,
  metas: Metas,
  "etapas-cronograma": EtapasCronograma,
  metodologia: Metodologia,
  "resultados-esperados": ResultadosEsperados,
  "gestao-projeto": GestaoProjeto,
  "historico-situacao-territorio": HistoricoSituacaoTerritorio,
  "base-territorial": BaseTerritorial,
  "publico-beneficiario": PublicoBeneficiario,
  "povos-comunidades-tradicionais": PovosComunidadesTradicionais,
  "perfil-socio-ocupacional": PerfilSocioOcupacional,
  "servicos-acessados": ServicosAcessados,
  "outras-informacoes-proponente": OutrasInformacoesProponente,
  "valor-total": ValorTotal,
  "cronograma-desembolso": CronogramaDesembolso,
  "detalhamento-orcamento": DetalhamentoOrcamento,
  "resumo-plano-aplicacao": ResumoPlanoAplicacao,
  "procedimentos-monitoramento": ProcedimentosMonitoramento,
  "indicadores-eficiencia": IndicadoresEficiencia,
  observacoes: Observacoes,
}

/** Slug padrão quando nenhuma seção é informada (primeira tela) */
export const DEFAULT_FORM_SECTION = "identificacao-projeto"
