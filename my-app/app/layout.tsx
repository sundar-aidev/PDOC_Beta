import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/layout/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Wealth Treatment",
  description: "Wealth Treatment Portfolio Management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <main className="flex-1">
            <div className="max-w-[1200px] mx-auto p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}

