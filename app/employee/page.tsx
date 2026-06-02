"use client"

import React from 'react'
import RequireRole from '@/components/RequireRole'
import Link from 'next/link'

export default function EmployeeDashboardPage() {
  return (
    <RequireRole allowedRoles={["employee", "admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/employee/attendance" className="p-4 border rounded">Attendance</Link>
          <Link href="/messaging" className="p-4 border rounded">Messaging</Link>
          <Link href="/reports" className="p-4 border rounded">Reports</Link>
        </div>
      </div>
    </RequireRole>
  )
}
