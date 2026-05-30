import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, ClipboardList, Calendar, Eye, Edit, Trash2 } from "lucide-react"

const homework = [
  { id: 1, subject: "বাংলা", class: "Class 10", section: "A", title: "রচনা লিখো: বাংলাদেশের মুক্তিযুদ্ধ", dueDate: "30/05/2026", teacher: "ফাতেমা সুলতানা", status: "Active" },
  { id: 2, subject: "গণিত", class: "Class 10", section: "A", title: "Exercise 5.2 - সব অংক সমাধান করো", dueDate: "29/05/2026", teacher: "করিম উদ্দিন", status: "Active" },
  { id: 3, subject: "English", class: "Class 9", section: "B", title: "Write a paragraph on Climate Change", dueDate: "28/05/2026", teacher: "নাজমা বেগম", status: "Due Today" },
  { id: 4, subject: "বিজ্ঞান", class: "Class 8", section: "A", title: "Chapter 3 - প্রশ্নোত্তর লিখো", dueDate: "25/05/2026", teacher: "সাইফুল ইসলাম", status: "Completed" },
]

const statusColors: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  "Due Today": "bg-chart-3/10 text-chart-3",
  Completed: "bg-chart-2/10 text-chart-2",
  Overdue: "bg-destructive/10 text-destructive",
}

export default function HomeworkPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Homework</h1>
            <p className="text-muted-foreground">হোমওয়ার্ক ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন হোমওয়ার্ক দিন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">24</p>
            <p className="text-sm text-muted-foreground">মোট হোমওয়ার্ক</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">সক্রিয়</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground">আজকে শেষ</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">9</p>
            <p className="text-sm text-muted-foreground">সম্পন্ন</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল ক্লাস</option>
            <option>Class 10</option>
            <option>Class 9</option>
            <option>Class 8</option>
          </select>
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল বিষয়</option>
            <option>বাংলা</option>
            <option>English</option>
            <option>গণিত</option>
          </select>
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল স্ট্যাটাস</option>
            <option>Active</option>
            <option>Due Today</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Homework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {homework.map((hw) => (
            <div key={hw.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 text-xs bg-secondary rounded text-muted-foreground">{hw.subject}</span>
                    <p className="text-sm text-muted-foreground mt-1">{hw.class} - Section {hw.section}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[hw.status]}`}>
                  {hw.status}
                </span>
              </div>
              <h3 className="font-medium text-foreground mb-3">{hw.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  জমার তারিখ: {hw.dueDate}
                </div>
                <span>শিক্ষক: {hw.teacher}</span>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
