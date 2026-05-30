import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Video, Plus, Play, Users, Calendar, Clock } from "lucide-react"

const liveClasses = [
  { id: 1, subject: "গণিত", class: "Class 10", teacher: "করিম উদ্দিন", time: "10:00 AM", date: "আজ", status: "Live", participants: 45 },
  { id: 2, subject: "English", class: "Class 9", teacher: "নাজমা বেগম", time: "11:30 AM", date: "আজ", status: "Scheduled", participants: 0 },
  { id: 3, subject: "বিজ্ঞান", class: "Class 8", teacher: "সাইফুল ইসলাম", time: "2:00 PM", date: "আজ", status: "Scheduled", participants: 0 },
  { id: 4, subject: "বাংলা", class: "Class 10", teacher: "ফাতেমা সুলতানা", time: "9:00 AM", date: "গতকাল", status: "Completed", participants: 42 },
]

const statusColors: Record<string, string> = {
  Live: "bg-destructive text-destructive-foreground animate-pulse",
  Scheduled: "bg-chart-2/10 text-chart-2",
  Completed: "bg-primary/10 text-primary",
}

export default function LiveClassPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Class</h1>
            <p className="text-muted-foreground">লাইভ ক্লাস ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন লাইভ ক্লাস শুরু করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Video className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">চলমান ক্লাস</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">নির্ধারিত</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">মোট ক্লাস</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-sm text-muted-foreground">অনলাইনে আছে</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.map((lc) => (
            <div key={lc.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{lc.subject}</h3>
                    <p className="text-sm text-muted-foreground">{lc.class}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${statusColors[lc.status]}`}>
                  {lc.status === "Live" && "● "}{lc.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p>শিক্ষক: {lc.teacher}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {lc.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lc.time}
                  </span>
                </div>
                {lc.participants > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {lc.participants} জন অংশগ্রহণকারী
                  </div>
                )}
              </div>
              <Button
                className="w-full gap-2"
                variant={lc.status === "Live" ? "default" : "outline"}
                disabled={lc.status === "Completed"}
              >
                <Play className="w-4 h-4" />
                {lc.status === "Live" ? "ক্লাসে যোগ দিন" : lc.status === "Scheduled" ? "শুরু করুন" : "রেকর্ডিং দেখুন"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
