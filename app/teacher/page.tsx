"use client"

import React from 'react'
import RequireRole from '@/components/RequireRole'
import Link from 'next/link'

export default function TeacherDashboardPage() {
  return (
    <RequireRole allowedRoles={["teacher", "admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/teacher/attendance" className="p-4 border rounded">Attendance</Link>
          <Link href="/teacher/homework" className="p-4 border rounded">Homework</Link>
          <Link href="/teacher/timetable" className="p-4 border rounded">My Timetable</Link>
        </div>
      </div>
    </RequireRole>
  )
}
