"use client"

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { useSchoolStore } from '@/lib/store'
import useRequireRole from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PayFeesPage() {
  useRequireRole(['student'])
  const { fees, currentUserId, payFee } = useSchoolStore()
  const [myFees, setMyFees] = useState<any[]>([])

  useEffect(() => {
    setMyFees(fees.filter(f => f.studentId === currentUserId && f.status !== 'paid'))
  }, [fees, currentUserId])

  const handleBkashPayment = (feeId: string, amount: number) => {
    // Mock bKash flow: in production integrate bKash checkout
    const txId = `bkash_${Math.random().toString(36).slice(2,9)}`
    // call store.payFee
    if (payFee) payFee(feeId, amount, 'bKash', txId)
    toast.success('Payment successful via bKash: ' + txId)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Pay Fees</h1>
        <p className="text-muted-foreground">bKash payment (mock) — production requires gateway integration.</p>
        <div className="mt-4 space-y-3">
          {myFees.length === 0 && <div className="text-muted-foreground">You have no pending fees.</div>}
          {myFees.map(f => (
            <div key={f.id} className="bg-card p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{f.type}</div>
                <div className="text-sm text-muted-foreground">Amount: ৳{f.amount}</div>
              </div>
              <div>
                <Button onClick={() => handleBkashPayment(f.id, f.amount)}>Pay with bKash</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
