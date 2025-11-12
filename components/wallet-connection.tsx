"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Zap } from "lucide-react"
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"

interface WalletConnectionProps {
  onConnect: (address: string) => void
}

export default function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [tonConnectUI] = useTonConnectUI()
  const wallet = useTonWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (wallet?.account?.address) {
      onConnect(wallet.account.address)
    }
  }, [wallet, onConnect])

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      await tonConnectUI.openModal()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full">
        <div className="text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-balance text-foreground">TON Quiz DApp</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Learn and earn rewards through gamified quizzes. Connect your TON wallet to get started.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-accent mb-2">5</div>
              <div className="text-sm text-muted-foreground">Quiz Categories</div>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-accent mb-2">50</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-accent mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Rewards</div>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          {/* Connect Button */}
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
          >
            <Wallet className="w-5 h-5" />
            {isConnecting ? "Connecting..." : "Connect TON Wallet"}
          </Button>

          {/* Info text */}
          <p className="text-xs text-muted-foreground">
            Connect your TON wallet (Tonkeeper, TON Wallet, etc.) to continue.
          </p>
        </div>
      </div>
    </div>
  )
}