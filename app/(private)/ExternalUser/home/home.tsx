"use client"

import { useRouter } from "next/navigation"
import { FolderOpen } from "lucide-react"
import ActionCard from "@/components/shared/ActionCard/actionCard"

export function ExternalUserHome() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Bem-vindo ao SIGTRP
        </h1>
        <p className="text-muted-foreground mt-1">
          Área do usuário externo. Acesse seus projetos abaixo.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          icon={FolderOpen}
          title="Projetos"
          subtitle="Visualize todos os seus projetos"
          onClick={() => router.push("/ExternalUser/projects")}
        />
      </div>
    </div>
  )
}
