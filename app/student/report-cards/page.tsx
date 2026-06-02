"use client"

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { useSchoolStore } from '@/lib/store'
import useRequireRole from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function ReportCardsPage() {
  useRequireRole(['student'])
  const { results, currentUserId, students } = useSchoolStore()
  const [student, setStudent] = useState<any>(null)
  const [myResults, setMyResults] = useState<any[]>([])

  useEffect(() => {
    const s = students.find(st => st.id === currentUserId) || students[0]
    setStudent(s)
    setMyResults(results.filter(r => r.studentId === currentUserId))
  }, [students, results, currentUserId])

  const calcGPA = () => {
    if (myResults.length === 0) return 0
    const total = myResults.reduce((sum, r) => sum + (r.obtainedMarks || 0), 0)
    return (total / myResults.length / 20).toFixed(2) // simple mock
  }

  const downloadReport = () => {
    const txt = `Report Card for ${student?.name}\nGPA: ${calcGPA()}\nResults:\n${myResults.map(r => `${r.subjectId}: ${r.obtainedMarks}`).join('\n')}`
    const blob = new Blob([txt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `report_${student?.registrationNo || 'student'}.txt`; a.click(); URL.revokeObjectURL(url)
  }

  if (!student) return null

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Report Card</h1>
        <p className="text-muted-foreground">আপনার রিপোর্ট কার্ড নীচে প্রদর্শিত আছে।</p>
        <div className="mt-4 bg-card p-4 rounded max-w-2xl">
          <h3 className="font-semibold">{student.name}</h3>
          <p>GPA (mock): {calcGPA()}</p>
          <div className="mt-2">
            {myResults.map(r => (
              <div key={r.id} className="flex justify-between py-1 border-b" >
                <div>{r.subjectId}</div>
                <div>{r.obtainedMarks}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={downloadReport}>Download Report Card</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
