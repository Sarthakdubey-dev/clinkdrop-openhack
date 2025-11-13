"use client"

import { useState, useEffect } from "react"
import WalletConnection from "@/components/wallet-connection"
import QuizDashboard from "@/components/quiz-dashboard"
import QuizInterface from "@/components/quiz-interface"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { useTelegramWebApp } from "@/components/telegram-provider"

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
  const tg = useTelegramWebApp()

  // Handle Telegram back button
  useEffect(() => {
    if (tg?.backButton) {
      const handleBack = () => {
        if (appState === "quiz") {
          setAppState("dashboard")
        } else if (appState === "dashboard") {
          setAppState("wallet")
        }
      }

      if (appState !== "wallet") {
        tg.backButton.show()
        tg.backButton.onClick(handleBack)
      } else {
        tg.backButton.hide()
      }

      return () => {
        if (tg.backButton) {
          tg.backButton.offClick(handleBack)
        }
      }
    }
  }, [appState, tg])

  // Initialize Telegram Web App
  useEffect(() => {
    if (tg) {
      tg.ready()
      tg.expand()
    }
  }, [tg])

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setWalletConnected(true)
    setAppState("dashboard")
    
    // Send data to bot if in Telegram
    if (tg?.sendData) {
      tg.sendData(JSON.stringify({ action: "wallet_connected", address }))
    }
  }

  const handleWalletDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
      setWalletConnected(false)
      setWalletAddress("")
      setAppState("wallet")
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
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
    const reward = score * 10
    setTotalRewards((prev) => prev + reward)
    setUserScores((prev) => ({
      ...prev,
      [selectedQuiz!]: score,
    }))
    setAppState("dashboard")
    
    // Send quiz completion data to bot
    if (tg?.sendData) {
      tg.sendData(JSON.stringify({ 
        action: "quiz_completed", 
        quizId: selectedQuiz, 
        score,
        reward 
      }))
    }
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
          telegramUser={tg?.user || null}
        />
      )}
      {appState === "quiz" && selectedQuiz !== null && (
        <QuizInterface quizId={selectedQuiz} onComplete={handleQuizComplete} onBack={() => setAppState("dashboard")} />
      )}
    </main>
  )
}
