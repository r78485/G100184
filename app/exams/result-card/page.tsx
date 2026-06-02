"use client"

import DashboardLayout from '@/components/dashboard-layout'
import useRequireRole from '@/lib/auth'
import { useSchoolStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function ResultCardPage() {
  useRequireRole(['admin'])
  const { results, students } = useSchoolStore()

  const download = (studentId: string) => {
    const my = results.filter(r => r.studentId === studentId)
    const txt = `Result Card for ${studentId}\n` + my.map(m => `${m.subjectId}: ${m.obtainedMarks}`).join('\n')
    const blob = new Blob([txt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `resultcard_${studentId}.txt`; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Result Card</h1>
        <p className="text-muted-foreground">Generate and download individual result cards.</p>
        <div className="mt-4 space-y-3">
          {students.map(s => (
            <div key={s.id} className="bg-card p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-muted-foreground">Reg: {s.registrationNo}</div>
              </div>
              <div>
                <Button onClick={() => download(s.id)}>Download Card</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
