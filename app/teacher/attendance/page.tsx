"use client"

import React, { useState } from 'react'
import RequireRole from '@/components/RequireRole'
import { useSchoolStore } from '@/lib/store'

export default function TeacherAttendancePage() {
  RequireRole({ allowedRoles: ["teacher", "admin"], children: null })
  const classes = useSchoolStore(s => s.classes)
  const students = useSchoolStore(s => s.students)
  const markAttendance = useSchoolStore(s => s.markAttendance)
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))

  const handleMark = (studentId: string, status: string) => {
    markAttendance({ studentId, date, status: status as any, remarks: '' })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Students Attendance</h1>
      <div className="mb-4">
        <label className="mr-2">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-1" />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Student</th>
            <th className="border p-2">Present</th>
            <th className="border p-2">Absent</th>
            <th className="border p-2">Leave</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2 text-center"><button onClick={() => handleMark(s.id, 'present')} className="px-3 py-1 bg-green-500 text-white rounded">P</button></td>
              <td className="border p-2 text-center"><button onClick={() => handleMark(s.id, 'absent')} className="px-3 py-1 bg-red-500 text-white rounded">A</button></td>
              <td className="border p-2 text-center"><button onClick={() => handleMark(s.id, 'leave')} className="px-3 py-1 bg-yellow-500 text-white rounded">L</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
