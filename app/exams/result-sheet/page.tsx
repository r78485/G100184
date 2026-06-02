"use client"

import DashboardLayout from '@/components/dashboard-layout'
import useRequireRole from '@/lib/auth'
import { useSchoolStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function ResultSheetPage() {
  useRequireRole(['admin'])
  const { results } = useSchoolStore()

  const downloadSheet = () => {
    const txt = results.map(r => `${r.studentId},${r.subjectId},${r.obtainedMarks}`).join('\n')
    const blob = new Blob([txt], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `result_sheet.csv`; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Result Sheet</h1>
        <p className="text-muted-foreground">Download consolidated result sheet (CSV).</p>
        <div className="mt-4">
          <Button onClick={downloadSheet}>Download CSV</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
