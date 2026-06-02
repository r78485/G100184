"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { useSchoolStore } from "@/lib/store"
import Link from "next/link"

export default function TeacherDashboardPage() {
   const menu = [
    { title: 'Search Menu', href: '/teacher/dashboard' },
    { title: 'Dashboard', href: '/teacher/dashboard' },
    { title: 'Attendance - Students Attendance', href: '#' },
    { title: 'Attendance - Class wise Report', href: '#' },
    { title: 'Attendance - Students Attendance Report', href: '#' },
    { title: 'Homework', href: '#' },
    { title: 'My Timetable', href: '#' },
    { title: 'Behaviour & Skills', href: '#' },
    { title: 'Messaging', href: '#' },
    { title: 'Live Class', href: '#' },
    { title: 'Question Paper - Subject Chapters', href: '#' },
    { title: 'Question Paper - Question Bank', href: '#' },
    { title: 'Question Paper - Create Question Paper', href: '#' },
    { title: 'Exams - Update Exam Marks', href: '#' },
    { title: 'Exams - Result Card', href: '#' },
    { title: 'Exams - Result Sheet', href: '#' },
    { title: 'Class Tests - Manage Test Marks', href: '#' },
    { title: 'Class Tests - Test Result', href: '#' },
    { title: 'Reports - Student Report Card', href: '#' },
    { title: 'Reports - Monthly attendance Report Card', href: '#' },
    { title: 'Account Settings', href: '#' },
    { title: 'Log Out', href: '/teacher/login' },
  ]

  const router = useRouter()
  const school = useSchoolStore((s) => s.instituteProfile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('teacherToken')
    if (!token) {
      router.push('/teacher/login')
    } else {
      setLoading(false)
    }
  }, [router])
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome to {school?.name} Teacher Dashboard</h1>
        <p className="text-gray-700">This is your dashboard where you can manage attendance, homework, exams, and more.</p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="list-disc list-inside text-blue-600">
            <li><Link href="/teacher/dashboard/attendance" className="hover:underline">Manage Attendance</Link></li>
            <li><Link href="/teacher/dashboard/homework" className="hover:underline">Manage Homework</Link></li>
            <li><Link href="/teacher/dashboard/exams" className="hover:underline">Manage Exams</Link></li>
            <li><Link href="/teacher/dashboard/reports" className="hover:underline">View Reports</Link></li>
          </ul>
        </div>  
      </div>
    </DashboardLayout>
  )
} 