import moment from "moment"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  return {
    title: {
      template: "% | MosqueScreen Project by MosqueOS",
      default: "MosqueScreen Project by MosqueOS",
    },
    description: {
      template: "% | MosqueScreen Project by MosqueOS",
      default: "MosqueScreen Project by MosqueOS",
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="300" />
        <meta httpEquiv="cache-control" content="public" />
        <meta
          httpEquiv="expires"
          content={`${moment().format("ddd, DD MMM YYYY")} 23:59:59 GMT`}
        />
      </head>
      <body
        className={`${inter.className} max-w-full bg-mosqueGreen min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
