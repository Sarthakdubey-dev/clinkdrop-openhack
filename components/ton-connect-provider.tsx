"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  const manifestUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/tonconnect-manifest.json`
  
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  )
}