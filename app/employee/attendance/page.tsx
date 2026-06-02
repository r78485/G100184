"use client"

import React from 'react'
import RequireRole from '@/components/RequireRole'
import { useSchoolStore } from '@/lib/store'

export default function EmployeeAttendancePage() {
  RequireRole({ allowedRoles: ["employee", "admin"], children: null })
  const attendance = useSchoolStore(s => s.attendance)

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Attendance (Employee)</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Student/Employee</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(a => (
            <tr key={a.id}>
              <td className="border p-2">{a.studentId}</td>
              <td className="border p-2">{a.date}</td>
              <td className="border p-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
