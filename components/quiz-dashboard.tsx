"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Coins, TrendingUp } from "lucide-react"
import QuizCard from "./quiz-card"

interface QuizDashboardProps {
  walletAddress: string
  totalRewards: number
  userScores: Record<number, number>
  onStartQuiz: (quizId: number) => void
  onDisconnect: () => void
}

const QUIZ_CATEGORIES = [
  {
    id: 1,
    title: "Blockchain Basics",
    description: "Learn the fundamentals of blockchain technology",
    icon: "⛓️",
    difficulty: "Beginner",
    rewards: 100,
  },
  {
    id: 2,
    title: "TON Network",
    description: "Explore The Open Network and its features",
    icon: "🌐",
    difficulty: "Intermediate",
    rewards: 200,
  },
  {
    id: 3,
    title: "Smart Contracts",
    description: "Understand smart contract development",
    icon: "📝",
    difficulty: "Advanced",
    rewards: 300,
  },
  {
    id: 4,
    title: "Cryptography",
    description: "Master the cryptography behind blockchain",
    icon: "🔐",
    difficulty: "Advanced",
    rewards: 250,
  },
  {
    id: 5,
    title: "DeFi Protocols",
    description: "Deep dive into decentralized finance",
    icon: "💰",
    difficulty: "Expert",
    rewards: 350,
  },
]

export default function QuizDashboard({
  walletAddress,
  totalRewards,
  userScores,
  onStartQuiz,
  onDisconnect,
}: QuizDashboardProps) {
  const completedQuizzes = Object.keys(userScores).length
  const completionPercentage = (completedQuizzes / QUIZ_CATEGORIES.length) * 100

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
          <Button onClick={onDisconnect} variant="outline" className="gap-2 w-full md:w-auto bg-transparent">
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Total Rewards</p>
              <p className="text-3xl font-bold text-accent">{totalRewards.toLocaleString()}</p>
            </div>
            <Coins className="w-10 h-10 text-accent/50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Quizzes Completed</p>
              <p className="text-3xl font-bold text-secondary">{completedQuizzes}/5</p>
            </div>
            <TrendingUp className="w-10 h-10 text-secondary/50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 p-6">
          <div>
            <p className="text-muted-foreground text-sm mb-4">Progress</p>
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-foreground">{completionPercentage.toFixed(0)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quiz Cards */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6">Available Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZ_CATEGORIES.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              isCompleted={quiz.id in userScores}
              score={userScores[quiz.id]}
              onStart={() => onStartQuiz(quiz.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
