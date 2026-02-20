"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  statusOptions, 
  perfilOptions, 
  type UsuarioExterno, 
  type StatusUsuario, 
  type PerfilUsuario 
} from "../data"
import { useUser } from "../../context/UserContext"

export default function EditExternalUserPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { externalUsers, updateExternalUser } = useUser()
  
  const [user, setUser] = useState<UsuarioExterno | null>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    status: "" as StatusUsuario,
    perfil: "" as PerfilUsuario,
  })

  useEffect(() => {
    if (!id || externalUsers.length === 0) return

    const userId = parseInt(id)
    const foundUser = externalUsers.find((u) => u.id === userId)
    
    if (foundUser) {
      setUser(foundUser)
      setFormData({
        nome: foundUser.nome,
        email: foundUser.email,
        status: foundUser.status,
        perfil: foundUser.perfil,
      })
    }
    setLoading(false)
  }, [id, externalUsers])

  const handleSave = () => {
    if (!user) return
    console.log("Salvando alterações:", { id: user.id, ...formData })
    updateExternalUser(user.id, formData)
    alert("Usuário externo alterado com sucesso!")
    router.push("/InternalUser/config/externalUser")
  }

  if (loading) return <div className="p-6">Carregando...</div>
  
  if (!user) return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-red-600">Usuário não encontrado</h1>
      <Button variant="ghost" onClick={() => router.back()} className="mt-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
    </div>
  )

  return (
    <div className="p-6 w-full">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Alteração de Usuário Externo</h1>
      </div>

      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input 
              id="nome" 
              value={formData.nome} 
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={formData.email} 
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as StatusUsuario }))}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="perfil">Perfil</Label>
              <select
                id="perfil"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={formData.perfil}
                onChange={(e) => setFormData(prev => ({ ...prev, perfil: e.target.value as PerfilUsuario }))}
              >
                {perfilOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  )
}
