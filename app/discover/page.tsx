"use client"

import { PublicFeed } from "@/components/public-feed"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Compass } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DiscoverPage() {
  const router = useRouter()

  // Mock user data - in real app this would come from authentication
  const mockUser = {
    fid: "12345",
    username: "cryptouser",
    displayName: "Crypto User",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-purple-300 hover:text-white hover:bg-purple-500/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Discover Lists
                </h1>
                <p className="text-gray-400 text-sm">Find and join reward challenges</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <PublicFeed currentUserFid={mockUser.fid} />
      </main>
    </div>
  )
}
