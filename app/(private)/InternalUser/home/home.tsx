"use client"

import { useRouter } from "next/navigation"
import { FolderPlus, FolderOpen, ClipboardList } from "lucide-react"
import ActionCard from "@/components/shared/ActionCard/actionCard"

export function InternalUserHome() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Bem-vindo ao SIGTRP
        </h1>
        <p className="text-muted-foreground mt-1">
          Área do usuário interno. Escolha uma ação abaixo para continuar.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          icon={FolderPlus}
          title="Novo Projeto"
          subtitle="Iniciar um novo projeto"
          onClick={() => router.push("/InternalUser/projects")}
        />
        <ActionCard
          icon={FolderOpen}
          title="Projetos"
          subtitle="Visualize todos os projetos"
          onClick={() => router.push("/InternalUser/dashboard")}
        />
        <ActionCard
          icon={ClipboardList}
          title="Análise Pendêntes"
          subtitle="Visualize todas as análises pendêntes"
          onClick={() => router.push("/InternalUser/settings")}
        />
      </div>
    </div>
  )
}
