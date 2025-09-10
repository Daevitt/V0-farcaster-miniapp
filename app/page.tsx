"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Trophy, Users, ArrowRight, Star, Plus, BarChart3, Gift, Settings } from "lucide-react"
import { CreateListModal } from "@/components/create-list-modal"
import { useRouter } from "next/navigation"
import { FarcasterAuth, type FarcasterUser } from "@/lib/farcaster-auth"

export default function FarcasterMiniapp() {
  const [user, setUser] = useState<FarcasterUser | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [showCreateList, setShowCreateList] = useState(false)
  const router = useRouter()

  const farcasterAuth = FarcasterAuth.getInstance()

  useEffect(() => {
    const unsubscribe = farcasterAuth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  const connectFarcaster = async () => {
    setIsConnecting(true)
    try {
      await farcasterAuth.signIn()
    } catch (error) {
      console.error("Farcaster connection failed:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setWalletConnected(true)
        console.log("[v0] Wallet connected:", accounts[0])
      } catch (error) {
        console.error("Wallet connection failed:", error)
      }
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/600x400-alpha-RavgtJFrju45ZtDoxbYz2nrK09kZ3t.png"
                  alt="BPLUS Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Farcaster Rewards</CardTitle>
              <CardDescription className="text-gray-300">
                Connect your Farcaster account to start earning rewards for social actions
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Trophy className="w-6 h-6 mx-auto text-yellow-400" />
                  <p className="text-xs text-gray-400">Compete</p>
                </div>
                <div className="space-y-2">
                  <Star className="w-6 h-6 mx-auto text-purple-400" />
                  <p className="text-xs text-gray-400">Earn Points</p>
                </div>
                <div className="space-y-2">
                  <Wallet className="w-6 h-6 mx-auto text-green-400" />
                  <p className="text-xs text-gray-400">Get Rewards</p>
                </div>
              </div>

              <Button
                onClick={connectFarcaster}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Connect Farcaster
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              <p className="text-xs text-gray-400 text-center">Secure authentication via Farcaster protocol</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/600x400-alpha-RavgtJFrju45ZtDoxbYz2nrK09kZ3t.png"
                  alt="BPLUS Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-white">Farcaster Rewards</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.pfpUrl || "/placeholder.svg"}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border-2 border-purple-400"
                />
                <span className="text-white font-medium">{user.displayName}</span>
              </div>

              {farcasterAuth.isAdmin(user.fid) && (
                <Button
                  onClick={() => router.push("/admin")}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              )}

              {farcasterAuth.isSuperAdmin(user.fid) && (
                <Button
                  onClick={() => router.push("/super-admin")}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-300 hover:bg-red-500/20 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Super Admin
                </Button>
              )}

              {!walletConnected ? (
                <Button
                  onClick={connectWallet}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/50">
                  <Wallet className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Future of Social Rewards</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Complete social actions, climb leaderboards, and earn tokens & NFTs. Create your own reward lists or
            participate in existing challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Join Challenges
              </CardTitle>
              <CardDescription className="text-gray-300">
                Participate in active reward lists and compete for prizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/actions")}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
              >
                Browse Active Lists
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Leaderboards
              </CardTitle>
              <CardDescription className="text-gray-300">See rankings and compete with other users</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/leaderboard")}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                View Rankings
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-emerald-400" />
                My Rewards
              </CardTitle>
              <CardDescription className="text-gray-300">View and claim your earned tokens and NFTs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/rewards")}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                View Rewards
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Create List
              </CardTitle>
              <CardDescription className="text-gray-300">
                Launch your own reward campaign and distribute tokens/NFTs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowCreateList(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New List
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-300">
                Manage your lists, view analytics and track performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/admin")}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-sm text-gray-400">Active Lists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2.4K</div>
            <div className="text-sm text-gray-400">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">$12.5K</div>
            <div className="text-sm text-gray-400">Rewards Paid</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">856</div>
            <div className="text-sm text-gray-400">NFTs Minted</div>
          </div>
        </div>
      </main>

      {/* CreateListModal Component */}
      <CreateListModal
        isOpen={showCreateList}
        onClose={() => setShowCreateList(false)}
        userWallet={user?.walletAddress}
        isWalletConnected={walletConnected}
      />
    </div>
  )
}
