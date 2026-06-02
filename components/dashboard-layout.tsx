"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useSchoolStore } from "@/lib/store"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const isLoggedIn = useSchoolStore((state) => state.isLoggedIn)
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Wait for Zustand hydration to finish (since it rehydrates on mount)
    // and check the login state
    const checkAuth = () => {
      // Small timeout to allow rehydration to populate the state
      setTimeout(() => {
        const state = useSchoolStore.getState()
        if (!state.isLoggedIn) {
          router.replace("/login")
        } else {
          setCheckingAuth(false)
        }
      }, 100)
    }
    checkAuth()
  }, [isLoggedIn, router])

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">লোডিং হচ্ছে...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"} print:pl-0`}>
        <Header />
        <main className="p-6 print:p-0">{children}</main>
      </div>
    </div>
  )
}
