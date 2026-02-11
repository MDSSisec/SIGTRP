"use client"

import Link from "next/link"

export function ExternalUserProjects() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Projetos</h1>
      <p className="text-muted-foreground">
        Listagem de projetos disponíveis para o usuário externo.
      </p>
      <p className="text-sm text-muted-foreground">
        <Link href="/ExternalUser/home" className="underline hover:no-underline">
          Voltar ao início
        </Link>
      </p>
    </div>
  )
}
