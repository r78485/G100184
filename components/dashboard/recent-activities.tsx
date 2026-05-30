"use client"

import { UserPlus, Receipt, FileText, Calendar } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"

const activitiesBn = [
  {
    id: 1,
    icon: UserPlus,
    title: "নতুন ছাত্র ভর্তি",
    description: "Class 5-এ রাহাত হোসেন ভর্তি হয়েছে",
    time: "2 মিনিট আগে",
  },
  {
    id: 2,
    icon: Receipt,
    title: "ফি জমা হয়েছে",
    description: "মোঃ আব্দুল্লাহ ৫,০০০ টাকা ফি জমা দিয়েছে",
    time: "15 মিনিট আগে",
  },
  {
    id: 3,
    icon: FileText,
    title: "পরীক্ষার ফলাফল প্রকাশ",
    description: "Class 10 এর অর্ধবার্ষিক ফলাফল প্রকাশিত",
    time: "1 ঘণ্টা আগে",
  },
  {
    id: 4,
    icon: Calendar,
    title: "টাইমটেবিল আপডেট",
    description: "Class 8 এর রুটিন পরিবর্তন করা হয়েছে",
    time: "3 ঘণ্টা আগে",
  },
]

const activitiesEn = [
  {
    id: 1,
    icon: UserPlus,
    title: "New Student Admission",
    description: "Rahat Hossain enrolled in Class 5",
    time: "2 mins ago",
  },
  {
    id: 2,
    icon: Receipt,
    title: "Fee Collected",
    description: "Md. Abdullah paid 5,000 BDT fee",
    time: "15 mins ago",
  },
  {
    id: 3,
    icon: FileText,
    title: "Exam Results Published",
    description: "Class 10 Half-yearly results published",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: Calendar,
    title: "Timetable Updated",
    description: "Class 8 routine has been changed",
    time: "3 hours ago",
  },
]

export function RecentActivities() {
  const { t, lang } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const activities = lang === 'bn' ? activitiesBn : activitiesEn

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t("Recent Activities")}</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <activity.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
