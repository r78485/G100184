"use client"

import { Calendar, Clock } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"

const eventsBn = [
  {
    id: 1,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    date: "২৮ মে, ২০২৬",
    time: "সকাল ৯:০০",
    type: "sports",
  },
  {
    id: 2,
    title: "অভিভাবক সভা",
    date: "৩০ মে, ২০২৬",
    time: "বিকাল ৩:০০",
    type: "meeting",
  },
  {
    id: 3,
    title: "অর্ধবার্ষিক পরীক্ষা শুরু",
    date: "১ জুন, ২০২৬",
    time: "সকাল ১০:০০",
    type: "exam",
  },
  {
    id: 4,
    title: "বিজ্ঞান মেলা",
    date: "১০ জুন, ২০২৬",
    time: "সকাল ১১:০০",
    type: "event",
  },
]

const eventsEn = [
  {
    id: 1,
    title: "Annual Sports Competition",
    date: "May 28, 2026",
    time: "9:00 AM",
    type: "sports",
  },
  {
    id: 2,
    title: "Parents Meeting",
    date: "May 30, 2026",
    time: "3:00 PM",
    type: "meeting",
  },
  {
    id: 3,
    title: "Half-yearly Exam Starts",
    date: "June 1, 2026",
    time: "10:00 AM",
    type: "exam",
  },
  {
    id: 4,
    title: "Science Fair",
    date: "June 10, 2026",
    time: "11:00 AM",
    type: "event",
  },
]

const typeColors: Record<string, string> = {
  sports: "bg-chart-1",
  meeting: "bg-chart-2",
  exam: "bg-chart-3",
  event: "bg-chart-4",
}

export function UpcomingEvents() {
  const { t, lang } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const events = lang === 'bn' ? eventsBn : eventsEn

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t("Upcoming Events")}</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className={`w-1.5 h-12 rounded-full ${typeColors[event.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {event.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
