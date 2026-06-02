"use client"

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useSchoolStore } from '@/lib/store'
import useRequireRole from '@/lib/auth'

export default function ChangePasswordPage() {
  useRequireRole(['student'])
  const { updateAccountSetting } = useSchoolStore()
  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleChange = () => {
    if (!newPass || !confirmPass) { toast.error('সব ঘর পূরণ করুন'); return }
    if (newPass !== confirmPass) { toast.error('নতুন পাসওয়ার্ড মিলছে না'); return }
    // This app uses client-side mock; update accountSetting so admin panel can also see
    updateAccountSetting({ password: newPass })
    toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে')
    setCurrent(''); setNewPass(''); setConfirmPass('')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Change Password</h1>
        <p className="text-muted-foreground">আপনি আপনার পাসওয়ার্ড এখানে পরিবর্তন করতে পারবেন।</p>
        <div className="mt-4 bg-card p-4 rounded max-w-md">
          <div className="space-y-3">
            <div>
              <label className="text-sm">Current Password</label>
              <Input value={current} onChange={e => setCurrent(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">New Password</label>
              <Input value={newPass} onChange={e => setNewPass(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Confirm Password</label>
              <Input value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
            </div>
            <Button onClick={handleChange}>Change Password</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
