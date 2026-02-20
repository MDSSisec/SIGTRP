import { PrivateShell } from "./private-shell"
import { UserProvider } from "@/app/(private)/InternalUser/config/context/UserContext"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <PrivateShell>{children}</PrivateShell>
    </UserProvider>
  )
}
