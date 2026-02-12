"use client"

import { createContext, useCallback, useContext, useState } from "react"

type BreadcrumbContextValue = {
  projectName: string | null
  setProjectName: (name: string | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null)

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [projectName, setProjectName] = useState<string | null>(null)
  const setter = useCallback((name: string | null) => setProjectName(name), [])
  return (
    <BreadcrumbContext.Provider value={{ projectName, setProjectName: setter }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext)
  if (!ctx) {
    throw new Error("useBreadcrumb must be used within BreadcrumbProvider")
  }
  return ctx
}
