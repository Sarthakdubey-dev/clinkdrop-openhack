"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

interface QuizInterfaceProps {
  quizId: number
  onComplete: (score: number) => void
  onBack: () => void
}

const QUIZ_DATA: Record<number, { questions: QuizQuestion[]; category: string }> = {
  1: {
    category: "Blockchain Basics",
    questions: [
      {
        id: 1,
        question: "What is a blockchain?",
        options: [
          "A chain of blocks containing data",
          "A type of database software",
          "A programming language",
          "A cryptocurrency exchange",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What does decentralization mean?",
        options: [
          "Moving data to one location",
          "Distributing control across multiple nodes",
          "Encrypting all data",
          "Removing all security measures",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is a hash in blockchain?",
        options: [
          "A type of meal",
          "A unique identifier created by a cryptographic function",
          "A password",
          "A storage unit",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "How many confirmations ensure a Bitcoin transaction is secure?",
        options: ["1 confirmation", "3 confirmations", "6 confirmations", "10 confirmations"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "What is a smart contract?",
        options: [
          "A legal agreement",
          "Self-executing code on the blockchain",
          "A business contract",
          "A programming framework",
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "What does PoW stand for?",
        options: ["Proof of Work", "Power of Wealth", "Point of Web", "Protocol of Waste"],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: "What is a consensus mechanism?",
        options: [
          "A way to reach agreement on blockchain state",
          "A voting system",
          "A security password",
          "A type of contract",
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "What is an NFT?",
        options: [
          "A type of cryptocurrency",
          "Non-Fungible Token - unique digital asset",
          "A blockchain framework",
          "A smart contract tool",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "What does immutable mean?",
        options: ["Can be changed easily", "Cannot be changed or altered", "Is very large", "Is very secure"],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "What is the primary advantage of blockchain?",
        options: [
          "High speed processing",
          "Transparency and immutability",
          "Low cost operations",
          "Easy to use interface",
        ],
        correctAnswer: 1,
      },
    ],
  },
  2: {
    category: "TON Network",
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `TON Network Question ${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  },
  3: {
    category: "Smart Contracts",
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `Smart Contract Question ${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  },
  4: {
    category: "Cryptography",
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `Cryptography Question ${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  },
  5: {
    category: "DeFi Protocols",
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `DeFi Question ${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  },
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export default function QuizInterface({ quizId, onComplete, onBack }: QuizInterfaceProps) {
  const quizData = QUIZ_DATA[quizId]
  const questions = quizData.questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]
  const answeredCount = userAnswers.filter((a) => a !== null).length

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setUserAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    let calculatedScore = 0
    userAnswers.forEach((answer, index) => {
      if (answer !== null && answer === questions[index].correctAnswer) {
        calculatedScore += 1
      }
    })
    setScore(calculatedScore)
    setShowResults(true)
  }

  const handleCompleteQuiz = () => {
    onComplete(score)
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
            <h1 className="text-4xl font-bold text-foreground">Quiz Complete!</h1>
          </div>

          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 p-8 space-y-4">
            <div>
              <p className="text-muted-foreground mb-2">Your Score</p>
              <p className="text-6xl font-bold text-accent">{score}/10</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-muted-foreground mb-2">Rewards Earned</p>
              <p className="text-4xl font-bold text-green-400">+{score * 10} Jettons</p>
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              onClick={handleCompleteQuiz}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
              size="lg"
            >
              Continue to Dashboard
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full bg-transparent" size="lg">
              Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{quizData.category}</p>
            <p className="text-lg font-semibold text-foreground">Question {currentQuestionIndex + 1}/10</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index < currentQuestionIndex
                    ? "bg-gradient-to-r from-primary to-secondary"
                    : index === currentQuestionIndex
                      ? "bg-primary"
                      : userAnswers[index] !== null
                        ? "bg-secondary"
                        : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  userAnswers[currentQuestionIndex] === index
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-muted/30 text-foreground hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            Previous
          </Button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
            >
              Next
            </Button>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Answered: {answeredCount}/{questions.length}
        </div>
      </div>
    </div>
  )
}
