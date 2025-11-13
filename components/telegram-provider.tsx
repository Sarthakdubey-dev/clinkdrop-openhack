"use client"

import { useEffect, useState } from "react"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<TelegramUser | null>(null)

  useEffect(() => {
    // Initialize Telegram Web App
    if (typeof window !== "undefined") {
      // Check if running in Telegram
      const isTelegram = window.Telegram?.WebApp !== undefined
      
      if (isTelegram && window.Telegram) {
        // Telegram Web App is available
        const tg = window.Telegram.WebApp
        
        // Expand the app to full height
        tg.expand()
        
        // Enable closing confirmation
        tg.enableClosingConfirmation()
        
        // Get user data
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user as TelegramUser)
        }
        
        setIsReady(true)
        
        // Optional: Set theme colors
        tg.setHeaderColor("#1a1a1a")
        tg.setBackgroundColor("#1a1a1a")
      } else {
        // Not in Telegram, but still initialize for development
        setIsReady(true)
      }
    }
  }, [])

  return <>{children}</>
}

// Export a hook to use Telegram Web App
export function useTelegramWebApp() {
  if (typeof window === "undefined") {
    return null
  }

  const tg = window.Telegram?.WebApp

  if (!tg) {
    return null
  }

  return {
    initData: tg.initData,
    initDataUnsafe: tg.initDataUnsafe,
    user: tg.initDataUnsafe?.user || null,
    backButton: tg.BackButton,
    mainButton: tg.MainButton,
    viewport: {
      height: tg.viewportHeight,
      stableHeight: tg.viewportStableHeight,
      isExpanded: tg.isExpanded,
    },
    ready: tg.ready.bind(tg),
    expand: tg.expand.bind(tg),
    close: tg.close.bind(tg),
    sendData: tg.sendData.bind(tg),
    showAlert: tg.showAlert.bind(tg),
    showConfirm: tg.showConfirm.bind(tg),
    showPopup: tg.showPopup.bind(tg),
    openLink: tg.openLink.bind(tg),
    openTelegramLink: tg.openTelegramLink.bind(tg),
    openInvoice: tg.openInvoice.bind(tg),
    setHeaderColor: tg.setHeaderColor.bind(tg),
    setBackgroundColor: tg.setBackgroundColor.bind(tg),
    HapticFeedback: tg.HapticFeedback,
    CloudStorage: tg.CloudStorage,
  }
}