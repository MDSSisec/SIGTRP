"use client"

import { createContext, useCallback, useContext, useState } from "react"

// Define o formato dos dados disponíveis no contexto do breadcrumb.
// Armazena o nome do projeto atual exibido na navegação
// e a função responsável por atualizar esse nome.
type BreadcrumbContextValue = {
  projectName: string | null
  setProjectName: (name: string | null) => void
}

// Cria o contexto global do breadcrumb.
// Inicialmente definido como null para permitir validação de uso correto do hook.
const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null)

// Provider responsável por disponibilizar o estado do breadcrumb
// para toda a árvore de componentes filhos.
export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {

  // Estado que armazena o nome do projeto exibido no breadcrumb.
  const [projectName, setProjectName] = useState<string | null>(null)

  // Função memoizada para atualizar o nome do projeto.
  // O useCallback evita recriação da função em cada render.
  const setter = useCallback((name: string | null) => setProjectName(name), [])

  // Fornece o estado e a função de atualização para os componentes descendentes.
  return (
    <BreadcrumbContext.Provider value={{ projectName, setProjectName: setter }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

// Hook customizado para acessar o contexto do breadcrumb.
// Garante que o hook seja utilizado apenas dentro do BreadcrumbProvider.
export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext)

  // Lança erro caso o hook seja usado fora do provider,
  // evitando comportamentos inesperados.
  if (!ctx) {
    throw new Error("useBreadcrumb must be used within BreadcrumbProvider")
  }

  // Retorna o contexto disponível.
  return ctx
}
