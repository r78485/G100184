"use client"

import DashboardLayout from '@/components/dashboard-layout'
import { useSchoolStore } from '@/lib/store'
import useRequireRole from '@/lib/auth'

export default function StudentNoticesPage() {
  useRequireRole(['student'])
  const { notices } = useSchoolStore()

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">School Notices</h1>
        <p className="text-muted-foreground">শিক্ষা প্রতিষ্ঠানের ঘোষণাগুলি এখানে দেখুন।</p>
        <div className="mt-4 space-y-3">
          {notices.map(n => (
            <div key={n.id} className="bg-card p-3 rounded">
              <div className="font-semibold">{n.title}</div>
              <div className="text-sm text-muted-foreground">{n.date}</div>
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: n.content }} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
