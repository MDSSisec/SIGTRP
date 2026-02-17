"use client"

// ======================================================
// IMPORTS
// ======================================================

// Importa APIs do React para criação de contexto e otimização de valores.
import React, { createContext, useContext, useMemo } from "react"

// Importa o tipo do modelo de dados do projeto.
// Define a estrutura do projeto carregado no contexto.
import type { ProjectModelData } from "@/types/project"


// ======================================================
// TIPO DO CONTEXTO
// ======================================================
//
// Define o valor armazenado no contexto.
// Pode conter os dados do projeto modelo ou null quando não existir.
type ProjectDataContextValue = ProjectModelData | null


// ======================================================
// CRIAÇÃO DO CONTEXTO
// ======================================================
//
// Contexto responsável por disponibilizar os dados de um projeto modelo
// para qualquer componente da árvore React.
//
// Valor inicial = null (nenhum projeto carregado).
const ProjectDataContext = createContext<ProjectDataContextValue>(null)


// ======================================================
// PROVIDER DO CONTEXTO
// ======================================================
//
// Responsável por fornecer os dados do projeto para os componentes filhos.
//
// O contexto só será preenchido quando:
// - existir projectData
// - o projectId for "2" (regra atual do sistema)
//
// Caso contrário, o valor do contexto será null.
export function ProjectDataProvider({
  projectId,
  projectData,
  children,
}: {
  projectId: string
  projectData: ProjectModelData | null
  children: React.ReactNode
}) {

  // Memoiza o valor do contexto para evitar recriações desnecessárias.
  // Só recalcula quando projectId ou projectData mudarem.
  const value = useMemo<ProjectDataContextValue>(() => {

    // Regra de negócio atual:
    // Apenas o projeto modelo com id "2" pode preencher o contexto.
    if (projectId !== "2" || !projectData) return null

    // Retorna os dados do projeto modelo.
    return projectData
  }, [projectId, projectData])


  // Fornece o valor para todos os componentes filhos.
  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  )
}


// ======================================================
// HOOK DE ACESSO AO CONTEXTO
// ======================================================
//
// Hook customizado para acessar os dados do projeto modelo.
//
// Uso:
// const project = useProjectData()
//
// Retorna:
// - dados do projeto modelo
// - ou null se não houver projeto carregado
export function useProjectData(): ProjectDataContextValue {

  // Obtém o valor do contexto atual.
  const ctx = useContext(ProjectDataContext)

  // Garante retorno consistente (nunca undefined).
  return ctx ?? null
}
