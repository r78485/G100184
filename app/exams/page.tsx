import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Download, Eye, Printer } from "lucide-react"

const exams = [
  { id: 1, name: "অর্ধবার্ষিক পরীক্ষা ২০২৬", startDate: "01/06/2026", endDate: "15/06/2026", classes: "Class 1-10", status: "Upcoming" },
  { id: 2, name: "১ম সাময়িক পরীক্ষা ২০২৬", startDate: "01/03/2026", endDate: "10/03/2026", classes: "Class 1-10", status: "Completed" },
  { id: 3, name: "বার্ষিক পরীক্ষা ২০২৫", startDate: "15/11/2025", endDate: "30/11/2025", classes: "Class 1-10", status: "Completed" },
  { id: 4, name: "মডেল টেস্ট ২০২৬", startDate: "20/07/2026", endDate: "25/07/2026", classes: "Class 10", status: "Scheduled" },
]

const statusColors: Record<string, string> = {
  Upcoming: "bg-chart-3/10 text-chart-3",
  Completed: "bg-primary/10 text-primary",
  Scheduled: "bg-chart-2/10 text-chart-2",
  Ongoing: "bg-chart-4/10 text-chart-4",
}

export default function ExamsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Exams</h1>
            <p className="text-muted-foreground">পরীক্ষা ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন পরীক্ষা তৈরি করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">4</p>
            <p className="text-sm text-muted-foreground">মোট পরীক্ষা</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">1</p>
            <p className="text-sm text-muted-foreground">আসন্ন</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">সম্পন্ন</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">1</p>
            <p className="text-sm text-muted-foreground">নির্ধারিত</p>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{exam.name}</h3>
                    <p className="text-sm text-muted-foreground">{exam.classes}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[exam.status]}`}>
                  {exam.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">শুরু</p>
                  <p className="font-medium text-foreground">{exam.startDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">শেষ</p>
                  <p className="font-medium text-foreground">{exam.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
