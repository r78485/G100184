"use client"

import DashboardLayout from '@/components/dashboard-layout'
import useRequireRole from '@/lib/auth'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CreateExamPage() {
  useRequireRole(['admin'])
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const handleCreate = () => {
    if (!name) { toast.error('Provide exam name'); return }
    // In production, call API to create exam
    toast.success('Exam created (mock): ' + name)
    setName(''); setDate('')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Create New Exam</h1>
        <p className="text-muted-foreground">Create exam records here.</p>
        <div className="mt-4 bg-card p-4 rounded max-w-lg">
          <div className="space-y-3">
            <div>
              <label className="text-sm">Exam Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Exam Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <Button onClick={handleCreate}>Create Exam</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
