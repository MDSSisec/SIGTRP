"use client"

import React, { createContext, useContext, useMemo } from "react"
import type { ProjectModelData } from "@/lib/types/project"

type ProjectDataContextValue = ProjectModelData | null

const ProjectDataContext = createContext<ProjectDataContextValue>(null)

export function ProjectDataProvider({
  projectId,
  projectData,
  children,
}: {
  projectId: string
  projectData: ProjectModelData | null
  children: React.ReactNode
}) {
  const value = useMemo<ProjectDataContextValue>(() => {
    if (projectId !== "2" || !projectData) return null
    return projectData
  }, [projectId, projectData])

  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  )
}

export function useProjectData(): ProjectDataContextValue {
  const ctx = useContext(ProjectDataContext)
  return ctx ?? null
}
