"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  // Automatically detect the current URL (works for both localhost and production)
  const getManifestUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/tonconnect-manifest.json`
    }
    // Fallback for SSR
    return process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`
      : 'http://localhost:3000/tonconnect-manifest.json'
  }
  
  return (
    <TonConnectUIProvider manifestUrl={getManifestUrl()}>
      {children}
    </TonConnectUIProvider>
  )
}