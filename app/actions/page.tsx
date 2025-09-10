"use client"

import { useState, useEffect } from "react"
import { ActionTracker } from "@/components/action-tracker"
import { ActionNotifications } from "@/components/action-notifications"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "success" | "pending" | "error" | "info"
  title: string
  message: string
  actionUrl?: string
  timestamp: Date
  autoHide?: boolean
}

export default function ActionsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Mock user data - in real app this would come from authentication
  const mockUser = {
    fid: "12345",
    username: "cryptouser",
    displayName: "Crypto User",
  }

  const addNotification = (
    type: Notification["type"],
    title: string,
    message: string,
    actionUrl?: string,
    autoHide = false,
  ) => {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      actionUrl,
      timestamp: new Date(),
      autoHide,
    }

    setNotifications((prev) => [...prev, notification])
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleNotificationAction = (notification: Notification) => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl, "_blank")
    }
  }

  // Demo notifications on mount
  useEffect(() => {
    setTimeout(() => {
      addNotification("info", "Welcome!", "Complete actions to earn points and climb the leaderboards", undefined, true)
    }, 1000)

    setTimeout(() => {
      addNotification("pending", "Action Verification", "Checking your recent Farcaster activity...", undefined, false)
    }, 3000)
  }, [])

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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Action Tracker
                </h1>
                <p className="text-gray-400 text-sm">Complete actions to earn rewards</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <ActionTracker userFid={mockUser.fid} username={mockUser.username} />
      </main>

      {/* Notifications */}
      <ActionNotifications
        notifications={notifications}
        onDismiss={dismissNotification}
        onAction={handleNotificationAction}
      />
    </div>
  )
}
