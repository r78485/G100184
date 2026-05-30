import { Users, GraduationCap, UserCog, Banknote, CalendarCheck, BookOpen } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { FeeCollectionChart } from "@/components/dashboard/fee-collection-chart"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">স্কুল ম্যানেজমেন্ট সিস্টেমে স্বাগতম</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="মোট ছাত্রছাত্রী"
            value="1,250"
            change="+12 এই মাসে"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="মোট ক্লাস"
            value="24"
            change="Play - 10"
            changeType="neutral"
            icon={GraduationCap}
          />
          <StatCard
            title="শিক্ষক/কর্মচারী"
            value="85"
            change="+3 নতুন"
            changeType="positive"
            icon={UserCog}
          />
          <StatCard
            title="এই মাসের আয়"
            value="৳5.2L"
            change="+8% বৃদ্ধি"
            changeType="positive"
            icon={Banknote}
          />
          <StatCard
            title="আজকের উপস্থিতি"
            value="94%"
            change="1,175 জন"
            changeType="positive"
            icon={CalendarCheck}
          />
          <StatCard
            title="মোট বিষয়"
            value="42"
            change="সকল ক্লাসে"
            changeType="neutral"
            icon={BookOpen}
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
