"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { useSchoolStore } from "@/lib/store"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userRole } = useSchoolStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    if (userRole !== 'admin') {
      router.push('/unauthorized')
    }
  }, [isLoggedIn, userRole, router])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Only users with the <strong>admin</strong> role can access this page.</p>
      </div>
    </DashboardLayout>
  )
}
