"use client"

import { useState } from "react"
import WalletConnection from "@/components/wallet-connection"
import QuizDashboard from "@/components/quiz-dashboard"
import QuizInterface from "@/components/quiz-interface"
import { useTonConnectUI } from "@tonconnect/ui-react"

type AppState = "wallet" | "dashboard" | "quiz"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("wallet")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [totalRewards, setTotalRewards] = useState(0)
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null)
  const [userScores, setUserScores] = useState<Record<number, number>>({})
  const [tonConnectUI] = useTonConnectUI()

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setWalletConnected(true)
    setAppState("dashboard")
  }

  const handleWalletDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
      setWalletConnected(false)
      setWalletAddress("")
      setAppState("wallet")
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      // Fallback to manual disconnect
      setWalletConnected(false)
      setWalletAddress("")
      setAppState("wallet")
    }
  }
  const handleStartQuiz = (quizId: number) => {
    setSelectedQuiz(quizId)
    setAppState("quiz")
  }

  const handleQuizComplete = (score: number) => {
    const reward = score * 10 // Mock reward calculation
    setTotalRewards((prev) => prev + reward)
    setUserScores((prev) => ({
      ...prev,
      [selectedQuiz!]: score,
    }))
    setAppState("dashboard")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {appState === "wallet" && <WalletConnection onConnect={handleWalletConnect} />}
      {appState === "dashboard" && walletConnected && (
        <QuizDashboard
          walletAddress={walletAddress}
          totalRewards={totalRewards}
          userScores={userScores}
          onStartQuiz={handleStartQuiz}
          onDisconnect={handleWalletDisconnect}
        />
      )}
      {appState === "quiz" && selectedQuiz !== null && (
        <QuizInterface quizId={selectedQuiz} onComplete={handleQuizComplete} onBack={() => setAppState("dashboard")} />
      )}
    </main>
  )
}
