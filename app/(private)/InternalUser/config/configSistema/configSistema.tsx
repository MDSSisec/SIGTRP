"use client"

import { Settings, Bell, Shield, Wrench } from "lucide-react"

const sections = [
  {
    icon: Settings,
    title: "Geral",
    description: "Nome do sistema, fuso horário, idioma e parâmetros gerais.",
    href: "#",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "E-mail do sistema, alertas e notificações para usuários.",
    href: "#",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Tempo de sessão, política de senha e autenticação.",
    href: "#",
  },
  {
    icon: Wrench,
    title: "Manutenção",
    description: "Modo manutenção, backup e log do sistema.",
    href: "#",
  },
]

export function ConfigSistemaContent() {
  return (
    <div className="px-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Configurações do Sistema</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Gerencie parâmetros gerais, notificações, segurança e manutenção do SIGTRP.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <a
              key={section.title}
              href={section.href}
              className="flex gap-4 p-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1e2938] text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-medium text-foreground">{section.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {section.description}
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
