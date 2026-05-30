import { Calendar, Clock } from "lucide-react"

const events = [
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

const typeColors: Record<string, string> = {
  sports: "bg-chart-1",
  meeting: "bg-chart-2",
  exam: "bg-chart-3",
  event: "bg-chart-4",
}

export function UpcomingEvents() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">আসন্ন ইভেন্ট</h3>
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
