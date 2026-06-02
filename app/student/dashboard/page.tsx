"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import StudentPanelMenu from "@/components/student-panel-menu"
import StudentSearchBar from "@/components/student-search-bar"
import { useSchoolStore } from "@/lib/store"
import Link from 'next/link'

export default function StudentDashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userRole } = useSchoolStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    if (userRole !== 'student') {
      router.push('/unauthorized')
    }
  }, [isLoggedIn, userRole, router])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex gap-6">
          <div className="hidden md:block">
            <StudentPanelMenu />
          </div>
          <div className="flex-1">
            <StudentSearchBar />
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Student access: view profile, results, notices and pay fees.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/student/profile" className="bg-card p-4 rounded hover:shadow">
                <h3 className="font-semibold">Profile</h3>
                <p className="text-sm text-muted-foreground">View your profile (read-only)</p>
              </Link>
              <Link href="/student/password" className="bg-card p-4 rounded hover:shadow">
                <h3 className="font-semibold">Change Password</h3>
                <p className="text-sm text-muted-foreground">Update your password</p>
              </Link>
              <Link href="/student/results" className="bg-card p-4 rounded hover:shadow">
                <h3 className="font-semibold">View Results</h3>
                <p className="text-sm text-muted-foreground">View and download your exam results</p>
              </Link>
              <Link href="/student/report-cards" className="bg-card p-4 rounded hover:shadow">
                <h3 className="font-semibold">Report Cards</h3>
                <p className="text-sm text-muted-foreground">View and download report cards</p>
              </Link>
              <Link href="/student/notices" className="bg-card p-4 rounded hover:shadow">
                <h3 className="font-semibold">School Notices</h3>
                <p className="text-sm text-muted-foreground">View school notices</p>
              </Link>
              <Link href="/student/pay-fees" className="bg-card p-4 rounded hover:shadow">
                <h3 className="font-semibold">Pay Fees</h3>
                <p className="text-sm text-muted-foreground">Pay fees via bKash (mock)</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
