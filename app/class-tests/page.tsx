import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, ClipboardCheck, Eye, Edit, Trash2 } from "lucide-react"

const classTests = [
  { id: 1, subject: "বাংলা", class: "Class 10", section: "A", topic: "গদ্য - আত্মচরিত", marks: 20, date: "27/05/2026", teacher: "ফাতেমা সুলতানা", status: "Completed" },
  { id: 2, subject: "গণিত", class: "Class 10", section: "A", topic: "ত্রিকোণমিতি", marks: 20, date: "26/05/2026", teacher: "করিম উদ্দিন", status: "Completed" },
  { id: 3, subject: "English", class: "Class 9", section: "B", topic: "Tense", marks: 15, date: "28/05/2026", teacher: "নাজমা বেগম", status: "Scheduled" },
  { id: 4, subject: "বিজ্ঞান", class: "Class 8", section: "A", topic: "আলো", marks: 20, date: "29/05/2026", teacher: "সাইফুল ইসলাম", status: "Scheduled" },
  { id: 5, subject: "ICT", class: "Class 7", section: "A", topic: "MS Word", marks: 10, date: "25/05/2026", teacher: "আলী আহমেদ", status: "Completed" },
]

const statusColors: Record<string, string> = {
  Completed: "bg-primary/10 text-primary",
  Scheduled: "bg-chart-2/10 text-chart-2",
  Ongoing: "bg-chart-3/10 text-chart-3",
}

export default function ClassTestsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Class Tests</h1>
            <p className="text-muted-foreground">ক্লাস টেস্ট ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন ক্লাস টেস্ট নির্ধারণ করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">মোট ক্লাস টেস্ট</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">এই সপ্তাহে</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">8</p>
            <p className="text-sm text-muted-foreground">নির্ধারিত</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">148</p>
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
          <input type="date" className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground" />
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিষয়</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্লাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">টপিক</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">মার্কস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">তারিখ</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">শিক্ষক</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classTests.map((test) => (
                <tr key={test.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ClipboardCheck className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{test.subject}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{test.class} - {test.section}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{test.topic}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{test.marks}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{test.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{test.teacher}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[test.status]}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
