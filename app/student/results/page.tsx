"use client"

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { useSchoolStore } from '@/lib/store'
import useRequireRole from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function StudentResultsPage() {
  useRequireRole(['student'])
  const { results, currentUserId } = useSchoolStore()
  const [myResults, setMyResults] = useState<any[]>([])

  useEffect(() => {
    const r = results.filter(rt => rt.studentId === currentUserId)
    setMyResults(r)
  }, [results, currentUserId])

  const download = (text: string, fileName: string) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = fileName; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">View Results</h1>
        <p className="text-muted-foreground">এখানে আপনি আপনার রেজাল্ট দেখতে এবং ডাউনলোড করতে পারবেন।</p>
        <div className="mt-4 space-y-3">
          {myResults.length === 0 && <p className="text-muted-foreground">কোন রেজাল্ট নেই।</p>}
          {myResults.map(r => (
            <div key={r.id} className="bg-card p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{r.examName} - {r.subjectId}</div>
                <div className="text-sm text-muted-foreground">Marks: {r.obtainedMarks}</div>
              </div>
              <div>
                <Button onClick={() => download(JSON.stringify(r, null, 2), `result_${r.id}.txt`)}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
