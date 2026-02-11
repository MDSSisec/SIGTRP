import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-xl font-semibold text-neutral-800">SIGTRP</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/InternalUser/home">Internal User</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/ExternalUser/home">External User</Link>
        </Button>
      </div>
    </div>
  )
}
