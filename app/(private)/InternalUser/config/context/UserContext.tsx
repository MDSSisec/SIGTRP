"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { Usuario, dadosIniciais } from "../internalUser/data"
import { UsuarioExterno, dadosUsuariosExternos } from "../externalUser/data"

type UserContextType = {
  internalUsers: Usuario[]
  setInternalUsers: React.Dispatch<React.SetStateAction<Usuario[]>>
  externalUsers: UsuarioExterno[]
  setExternalUsers: React.Dispatch<React.SetStateAction<UsuarioExterno[]>>
  updateInternalUser: (id: number, data: Partial<Usuario>) => void
  updateExternalUser: (id: number, data: Partial<UsuarioExterno>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [internalUsers, setInternalUsers] = useState<Usuario[]>(dadosIniciais)
  const [externalUsers, setExternalUsers] = useState<UsuarioExterno[]>(dadosUsuariosExternos)

  const updateInternalUser = (id: number, data: Partial<Usuario>) => {
    setInternalUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...data } : user))
    )
  }

  const updateExternalUser = (id: number, data: Partial<UsuarioExterno>) => {
    setExternalUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...data } : user))
    )
  }

  return (
    <UserContext.Provider
      value={{
        internalUsers,
        setInternalUsers,
        externalUsers,
        setExternalUsers,
        updateInternalUser,
        updateExternalUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
