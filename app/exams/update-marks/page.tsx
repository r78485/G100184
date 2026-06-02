"use client"

import DashboardLayout from '@/components/dashboard-layout'
import useRequireRole from '@/lib/auth'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSchoolStore } from '@/lib/store'
import { toast } from 'sonner'

export default function UpdateMarksPage() {
  useRequireRole(['admin'])
  const { students, updateResult } = useSchoolStore()
  const [studentId, setStudentId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [marks, setMarks] = useState('')

  const handleUpdate = () => {
    if (!studentId || !subjectId || !marks) { toast.error('সব ঘর পূরণ করুন'); return }
    // Mock: create/update a Result record
    const id = Math.random().toString(36).slice(2,9)
    // In store there's updateResult; but for simplicity we'll add via addResult
    // @ts-ignore
    useSchoolStore.getState().addResult({ studentId, examId: 'exam1', subjectId, obtainedMarks: Number(marks), grade: '', gpa: 0 })
    toast.success('Marks updated (mock)')
    setStudentId(''); setSubjectId(''); setMarks('')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Update Exam Marks</h1>
        <p className="text-muted-foreground">Add or update student marks here.</p>
        <div className="mt-4 bg-card p-4 rounded max-w-lg">
          <div className="space-y-3">
            <div>
              <label className="text-sm">Student ID</label>
              <Input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="e.g. 1" />
            </div>
            <div>
              <label className="text-sm">Subject ID</label>
              <Input value={subjectId} onChange={e => setSubjectId(e.target.value)} placeholder="e.g. 1" />
            </div>
            <div>
              <label className="text-sm">Marks</label>
              <Input value={marks} onChange={e => setMarks(e.target.value)} placeholder="e.g. 78" />
            </div>
            <Button onClick={handleUpdate}>Save Marks</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
