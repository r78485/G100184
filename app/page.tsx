"use client"

import { Users, GraduationCap, UserCog, Banknote, CalendarCheck, BookOpen } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { FeeCollectionChart } from "@/components/dashboard/fee-collection-chart"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const { t, lang } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("Dashboard")}</h1>
          <p className="text-muted-foreground">{t("Welcome to School Management System")}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title={t("Total Students")}
            value="1,250"
            change={lang === 'bn' ? "+12 এই মাসে" : "+12 this month"}
            changeType="positive"
            icon={Users}
              href="/students"
              showActions={false}
          />
          <StatCard
            title={t("Total Classes")}
            value="24"
            change="Play - 10"
            changeType="neutral"
            icon={GraduationCap}
            href="/classes"
            showActions={false}
          />
          <StatCard
            title={t("Teachers/Staff")}
            value="85"
            change={lang === 'bn' ? "+3 নতুন" : "+3 new"}
            changeType="positive"
            icon={UserCog}
            href="/employees"
            showActions={false}
          />
          <StatCard
            title={t("This Month's Income")}
            value="৳5.2L"
            change={lang === 'bn' ? "+8% বৃদ্ধি" : "+8% increase"}
            changeType="positive"
            icon={Banknote}
            href="/accounts"
            showActions={false}
          />
          <StatCard
            title={t("Today's Attendance")}
            value="94%"
            change={lang === 'bn' ? "1,175 জন" : "1,175 students"}
            changeType="positive"
            icon={CalendarCheck}
            href="/attendance"
            showActions={false}
          />
          <StatCard
            title={t("Total Subjects")}
            value="42"
            change={lang === 'bn' ? "সকল ক্লাসে" : "In all classes"}
            changeType="neutral"
            icon={BookOpen}
            href="/subjects"
            showActions={false}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart />
          <FeeCollectionChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <UpcomingEvents />
        </div>
      </div>
    </DashboardLayout>
  )
}
