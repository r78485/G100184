"use client"

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { useSchoolStore } from '@/lib/store'
import useRequireRole from '@/lib/auth'

export default function StudentProfilePage() {
  useRequireRole(['student'])
  const { students, currentUserId } = useSchoolStore()
  const [student, setStudent] = useState<any>(null)

  useEffect(() => {
    const s = students.find((st: any) => st.id === currentUserId) || students[0]
    setStudent(s)
  }, [students, currentUserId])

  if (!student) return null

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">আপনি শুধু দেখতে পারবেন, পরিবর্তন করতে পারবেন না।</p>
        <div className="mt-4 bg-card p-4 rounded">
          <p><strong>নাম:</strong> {student.name}</p>
          <p><strong>রেজিস্ট্রেশন নং:</strong> {student.registrationNo}</p>
          <p><strong>শ্রেণি/সেকশন:</strong> {student.classId} / {student.section}</p>
          <p><strong>জন্মতারিখ:</strong> {student.dateOfBirth}</p>
          <p><strong>ঠিকানা:</strong> {student.address}</p>
          <p><strong>গার্ডিয়ান ফোন:</strong> {student.guardianPhone}</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
