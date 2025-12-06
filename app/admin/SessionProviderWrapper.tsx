"use client"

import { SessionProvider } from "next-auth/react"

/**
 * So that we don't have to wrap the whole app in a session provider and keep
 * @param children
 * @constructor
 */
export default function SessionProviderWrapper({ children } : {children: React.ReactNode}) {
  return <SessionProvider>{children}</SessionProvider>
}