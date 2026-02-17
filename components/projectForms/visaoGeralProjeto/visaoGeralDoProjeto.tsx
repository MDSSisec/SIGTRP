"use client"

import React, { useEffect, useRef } from "react"
import { PROJECT_FORM_SECTIONS } from "@/components/projectForms"
import type { ProjectFormSectionProps } from "@/components/projectForms"

/** Desabilita inputs e oculta botões para modo somente leitura. */
function ReadOnlyWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll("input, textarea, select").forEach((node) => {
      const n = node as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      n.setAttribute("readonly", "")
      n.setAttribute("disabled", "")
    })
    el.querySelectorAll("button").forEach((node) => {
      const btn = node as HTMLButtonElement
      btn.style.display = "none"
    })
  }, [])

  return (
    <div ref={ref} className="pointer-events-none select-text">
      {children}
    </div>
  )
}

/** Ordem e títulos das seções para a visão geral (mesma ordem do menu do projeto). */
const SECOES_VISAO_GERAL: { slug: string; title: string }[] = [
  { slug: "identificacao-projeto", title: "1. Identificação do Projeto" },
  { slug: "identificacao-proponente", title: "2. Identificação do(a) proponente" },
  { slug: "identificacao-representante-legal", title: "3. Identificação do representante legal do(a) proponente" },
  { slug: "identificacao-responsavel-tecnico", title: "4. Identificação do responsável técnico" },
  { slug: "justificativa", title: "5. Justificativa e motivação para celebração do instrumento" },
  { slug: "objetivos", title: "6. Objetivos" },
  { slug: "metas", title: "7. Metas" },
  { slug: "etapas-cronograma", title: "8. Etapas e cronograma de execução" },
  { slug: "metodologia", title: "9. Metodologia" },
  { slug: "resultados-esperados", title: "10. Resultados esperados" },
  { slug: "gestao-projeto", title: "11. Gestão do Projeto" },
  { slug: "historico-situacao-territorio", title: "12. Histórico e situação socioeconômica do território" },
  { slug: "base-territorial", title: "13. Detalhamento da base territorial do projeto" },
  { slug: "publico-beneficiario", title: "14. Público beneficiário do projeto" },
  { slug: "povos-comunidades-tradicionais", title: "15. Povos ou comunidades tradicionais" },
  { slug: "perfil-socio-ocupacional", title: "16. Perfil sócio-ocupacional do público beneficiário" },
  { slug: "servicos-acessados", title: "17. Serviços acessados pelo público beneficiário" },
  { slug: "outras-informacoes-proponente", title: "18. Outras informações sobre o(a) proponente" },
  { slug: "valor-total", title: "19. Valor total do projeto" },
  { slug: "cronograma-desembolso", title: "20. Cronograma de desembolso" },
  { slug: "detalhamento-orcamento", title: "21. Detalhamento do orçamento" },
  { slug: "resumo-plano-aplicacao", title: "22. Resumo do plano de aplicação" },
  { slug: "procedimentos-monitoramento", title: "23. Procedimentos de monitoramento e avaliação" },
  { slug: "indicadores-eficiencia", title: "24. Indicadores de eficiência e eficácia" },
  { slug: "observacoes", title: "25. Observações" },
]

export function VisaoGeralDoProjeto({ projectId }: ProjectFormSectionProps) {
  return (
    <div className="min-w-0 max-w-full space-y-6 sm:space-y-8">
      <div className="min-w-0 border-b pb-4">
        <h2 className="text-base font-semibold text-foreground sm:text-lg truncate">
          Visão geral do projeto
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Todas as seções do formulário TRP em uma única tela. Somente leitura — use o menu para editar cada seção.
        </p>
      </div>

      <div className="min-w-0 rounded-xl border border-input bg-card px-4 py-3 text-center">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          TERMO DE REFERÊNCIA DE PROJETO - TRP (Portaria MDS nº 1.131, de 25 de novembro de 2025)
        </h1>
      </div>

      <div className="min-w-0 max-w-full space-y-6 sm:space-y-8">
        {SECOES_VISAO_GERAL.map(({ slug, title }) => {
          const FormSection = PROJECT_FORM_SECTIONS[slug]
          if (!FormSection) return null

          return (
            <section
              key={slug}
              id={`secao-${slug}`}
              className="min-w-0 max-w-full rounded-xl border border-input bg-card shadow-sm overflow-hidden"
            >
              <div className="min-w-0 max-w-full overflow-x-auto p-4 bg-background">
                <ReadOnlyWrapper>
                  <FormSection projectId={projectId} readOnlyView />
                </ReadOnlyWrapper>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
