import type React from "react"
import { Sidebar } from "@/components/layout/sidebar/sidebar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <div className="max-w-[1200px] mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}

