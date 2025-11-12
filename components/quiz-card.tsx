"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface Quiz {
  id: number
  title: string
  description: string
  icon: string
  difficulty: string
  rewards: number
}

interface QuizCardProps {
  quiz: Quiz
  isCompleted: boolean
  score?: number
  onStart: () => void
}

const difficultyColors = {
  Beginner: "text-green-400",
  Intermediate: "text-yellow-400",
  Advanced: "text-orange-400",
  Expert: "text-red-400",
}

export default function QuizCard({ quiz, isCompleted, score, onStart }: QuizCardProps) {
  return (
    <Card
      className={`relative overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/20 cursor-pointer group ${
        isCompleted
          ? "bg-card/50 border-green-500/30"
          : "bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50"
      }`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-6 space-y-4">
        {/* Icon and Header */}
        <div className="flex items-start justify-between">
          <div className="text-4xl">{quiz.icon}</div>
          {isCompleted && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-full p-1">
              <Check className="w-4 h-4 text-green-400" />
            </div>
          )}
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="space-y-1">
            <p
              className={`text-xs font-semibold ${difficultyColors[quiz.difficulty as keyof typeof difficultyColors]}`}
            >
              {quiz.difficulty}
            </p>
            <p className="text-xs text-muted-foreground">10 Questions</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-accent">+{quiz.rewards}</p>
            <p className="text-xs text-muted-foreground">rewards</p>
          </div>
        </div>

        {/* Score if completed */}
        {isCompleted && score !== undefined && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground">Your Score</p>
            <p className="text-lg font-bold text-green-400">{score}/10</p>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={onStart}
          className={`w-full gap-2 ${
            isCompleted
              ? "bg-muted text-muted-foreground hover:bg-muted"
              : "bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
          }`}
          disabled={isCompleted}
        >
          {isCompleted ? "Completed ✓" : "Start Quiz"}
        </Button>
      </div>
    </Card>
  )
}
