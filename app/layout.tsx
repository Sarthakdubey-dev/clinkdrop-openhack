import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TonConnectProvider } from "@/components/ton-connect-provider"
import { TelegramProvider } from "@/components/telegram-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TON Quiz DApp",
  description: "Gamified learning platform integrated with Telegram Mini App",
  generator: "clinkdrop",
  icons: {
    icon: [
      {
        url: "/clinkdop_TON_light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/clinkdop_TON_dark.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/clinkdop_TON.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/clinkdop_TON.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className={`font-sans antialiased`}>
        <TelegramProvider>
          <TonConnectProvider>
            {children}
          </TonConnectProvider>
        </TelegramProvider>
        <Analytics />
      </body>
    </html>
  )
}