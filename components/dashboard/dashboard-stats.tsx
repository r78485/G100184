"use client"

import React, { useRef } from "react"
import { StatCard } from "./stat-card"
import { Users, BookOpen, UserCog, Wallet, CalendarCheck, Layers } from "lucide-react"

type DashboardStatsProps = {
  totals: {
    students: number
    classes: number
    staff: number
    revenue: number
    todayAttendance: number
    subjects: number
  }
}

export function DashboardStats({ totals }: DashboardStatsProps) {
  // Each card can point to a printable element (hidden) using refs
  const studentsPrintRef = useRef<HTMLElement>(null)
  const classesPrintRef = useRef<HTMLElement>(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="মোট ছাত্র-ছাত্রী" value={totals.students} icon={<Users />} href="/students" printableRef={studentsPrintRef} />
        <StatCard title="মোট ক্লাস" value={totals.classes} icon={<BookOpen />} href="/classes" printableRef={classesPrintRef} />
        <StatCard title="শিক্ষক/কর্মচারী" value={totals.staff} icon={<UserCog />} href="/employees" />
        <StatCard title="আয়/ব্যয়" value={totals.revenue} icon={<Wallet />} href="/accounts" />
        <StatCard title="আজকের উপস্থিতি" value={totals.todayAttendance} icon={<CalendarCheck />} href="/attendance" />
        <StatCard title="মোট বিষয়" value={totals.subjects} icon={<Layers />} href="/subjects" />
      </div>

      {/* Hidden print areas: these elements will be copied into a new window when printing */}
      <div className="sr-only" aria-hidden>
        <div ref={studentsPrintRef as any}>
          <h1>মোট ছাত্র-ছাত্রী: {totals.students}</h1>
          <p>এই অংশে আপনি ছাত্র-ছাত্রীদের সারসংক্ষেপ, তালিকা বা বিস্তারিত তথ্য রাখতে পারেন।</p>
        </div>

        <div ref={classesPrintRef as any}>
          <h1>মোট ক্লাস: {totals.classes}</h1>
          <p>ক্লাস-ভিত্তিক সারাংশ বা প্রিন্ট-ডেভিডেড কনটেন্ট এখানে রাখুন।</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
