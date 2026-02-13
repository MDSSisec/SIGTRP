"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FolderPlus, FolderOpen, ClipboardList, CheckCircle, Search, Clock, LayoutGrid } from "lucide-react"
import ActionCard from "@/components/shared/ActionCard/actionCard"
import TotalCard from "@/components/shared/Totais/TotalCard/totalCard"
import PopupNovoProjeto from "@/components/shared/PopUps/Generico/popupNovoProjeto"

const totaisHome = [
  { title: "Projetos", total: 20, icon: LayoutGrid, description: "Total de projetos" },
  { title: "Aprovados", total: 12, icon: CheckCircle, description: "Projetos aprovados" },
  { title: "Em Análise", total: 5, icon: Search, description: "Projetos em análise" },
  { title: "Pendências", total: 3, icon: Clock, description: "Projetos com pendências" },
  { title: "Concluídos", total: 10, icon: CheckCircle, description: "Projetos concluídos" },
]

export function InternalUserHome() {
  const router = useRouter()
  const [isNovoProjetoOpen, setIsNovoProjetoOpen] = useState(false)

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Bem-vindo ao SIGTRP
        </h1>
        <p className="text-muted-foreground mt-1">
          Área do usuário interno. Escolha uma ação abaixo para continuar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 w-full min-w-0">
        {totaisHome.map((item) => (
          <TotalCard
            key={item.title}
            title={item.title}
            totalCad={item.total}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full min-w-0">
        <ActionCard
          icon={FolderPlus}
          title="Novo Projeto"
          subtitle="Iniciar um novo projeto"
          onClick={() => setIsNovoProjetoOpen(true)}
        />
        <ActionCard
          icon={FolderOpen}
          title="Projetos"
          subtitle="Visualize todos os projetos"
          onClick={() => router.push("/InternalUser/projects")}
        />
        <ActionCard
          icon={ClipboardList}
          title="Análise Pendentes"
          subtitle="Visualize todas as análises pendêntes"
          onClick={() => router.push("/InternalUser/projects")}
        />
      </div>

      <PopupNovoProjeto 
        open={isNovoProjetoOpen} 
        onClose={() => setIsNovoProjetoOpen(false)} 
      />
    </div>
  )
}
