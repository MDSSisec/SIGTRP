"use client"

import { useRouter } from "next/navigation"
import { FolderOpen, LayoutDashboard } from "lucide-react"
import { FaFolderPlus, FaRegFolderOpen } from "react-icons/fa"
import { LuFolderClock } from "react-icons/lu"
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
          Área do usuário interno. Gerencie seus projetos e dashboards abaixo.
        </p>
      </div>

      <div className="flex flex-row gap-6 overflow-x-auto pb-4">
        <div className="min-w-[300px] w-[300px]">
          <ActionCard
            icon={FolderOpen}
            title="Projetos"
            subtitle="Visualize todos os projetos"
            onClick={() => router.push("/InternalUser/projects")}
          />
        </div>
        <div className="min-w-[300px] w-[300px]">
          <ActionCard
            icon={FaRegFolderOpen}
            title="Meus Projetos"
            subtitle="Visualize e gerencie seus projetos"
            onClick={() => router.push("/InternalUser/dashboard")}
          />
        </div>
        <div className="min-w-[300px] w-[300px]">
          <ActionCard
            icon={LuFolderClock}
            title="Novo Card"
            subtitle="Descrição do novo card"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
