import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MosqueScreen v2",
  description: "MosqueScreen version 2",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} max-w-full bg-mosqueGreen min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
