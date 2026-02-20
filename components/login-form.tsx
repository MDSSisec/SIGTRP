"use client"

import { cn } from "@/lib/utils"
import { LaserFlow } from "@/components/shared/LaserFlow/LaserFlow"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push("/InternalUser/home")
  }

  return (
    <div
      className={cn("relative min-h-svh w-full overflow-hidden bg-black", className)}
      {...props}
    >
      {/* Fundo LaserFlow — mesma config do site oficial, verticalBeamOffset -0.5 para o feixe na parte de baixo */}
      <div className="absolute inset-0 min-h-full w-full">
        <LaserFlow
          className="h-full w-full"
          color="#9c9c9c"
          wispDensity={1}
          flowSpeed={0.35}
          verticalSizing={2}
          horizontalSizing={0.5}
          fogIntensity={0.45}
          fogScale={0.3}
          wispSpeed={15}
          wispIntensity={5}
          flowStrength={0.25}
          decay={1.1}
          horizontalBeamOffset={0}
          verticalBeamOffset={-0.5}
        />
      </div>

      {/* Conteúdo do login em cima do fundo — max-width em telas grandes para manter proporção */}
      <div className="relative z-10 flex min-h-svh w-full justify-center">
        <div className="grid w-full min-h-svh max-w-screen-2xl grid-cols-1 lg:grid-cols-2">
          {/* Coluna esquerda: marca — mesmo nível do topo do card */}
          <div className="flex flex-col items-start justify-start px-6 py-10 sm:px-8 sm:py-12 lg:justify-start lg:px-12 lg:pt-12 lg:pb-12 xl:px-16 2xl:px-20">
            <div className="mt-6 max-w-md sm:mt-8 lg:mt-12">
              <h1 className="font-orbitron text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl">
                SIGTRP
              </h1>
              <p className="font-orbitron mt-3 text-base text-white/80 sm:mt-4 sm:text-lg md:text-xl">
                Sistema Integrado de Gestão do TRP
              </p>
            </div>
          </div>

          {/* Coluna direita: card de login */}
          <div className="flex items-start justify-center px-6 py-10 sm:px-8 sm:py-12 lg:justify-start lg:px-12 lg:pt-12 lg:pb-12 xl:px-16 2xl:px-20">
            <div className="mt-6 w-full max-w-md sm:mt-8 lg:mt-12 lg:ml-12 xl:ml-20 2xl:ml-28">
            <Card className="relative overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_60px_rgba(156,156,156,0.12)] backdrop-blur-xl rounded-2xl py-8">
              {/* Faixa de brilho sutil no topo */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
              <CardHeader className="space-y-1 border-none pb-2">
                <CardTitle className="font-orbitron text-center text-4xl font-semibold tracking-tight text-white">
                  Entrar
                </CardTitle>
                <CardDescription className="text-center text-white/70">
                  Use seu email e senha para acessar o sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-0">
                  <FieldGroup className="gap-5">
                    <Field>
                      <FieldLabel htmlFor="email" className="text-white/90">Email</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.gov.br"
                        autoComplete="email"
                        required
                        className="h-10 border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30 focus-visible:border-white/30"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="password" className="text-white/90">Senha</FieldLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="h-10 border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30 focus-visible:border-white/30"
                      />
                    </Field>

                    <div className="flex flex-col gap-3 pt-1">
                      <Button
                        type="submit"
                        className="w-full h-10 bg-white/90 text-black font-medium hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all duration-200"
                      >
                        Entrar
                      </Button>
                      <div className="flex justify-center pt-2">
                        <a
                          href="#"
                          className="text-sm text-white/60 hover:text-white hover:underline transition-colors"
                        >
                          Esqueceu a senha?
                        </a>
                      </div>
                    </div>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
