import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileQuestion, Download, Eye, Edit, Trash2 } from "lucide-react"

const questionPapers = [
  { id: 1, subject: "বাংলা", class: "Class 10", exam: "অর্ধবার্ষিক ২০২৬", marks: 100, duration: "3 ঘণ্টা", status: "Ready", createdBy: "ফাতেমা সুলতানা" },
  { id: 2, subject: "English", class: "Class 10", exam: "অর্ধবার্ষিক ২০২৬", marks: 100, duration: "3 ঘণ্টা", status: "Ready", createdBy: "নাজমা বেগম" },
  { id: 3, subject: "গণিত", class: "Class 10", exam: "অর্ধবার্ষিক ২০২৬", marks: 100, duration: "3 ঘণ্টা", status: "Draft", createdBy: "করিম উদ্দিন" },
  { id: 4, subject: "বিজ্ঞান", class: "Class 9", exam: "অর্ধবার্ষিক ২০২৬", marks: 100, duration: "3 ঘণ্টা", status: "Ready", createdBy: "সাইফুল ইসলাম" },
  { id: 5, subject: "ICT", class: "Class 8", exam: "অর্ধবার্ষিক ২০২৬", marks: 50, duration: "1.5 ঘণ্টা", status: "Draft", createdBy: "আলী আহমেদ" },
]

const statusColors: Record<string, string> = {
  Ready: "bg-primary/10 text-primary",
  Draft: "bg-chart-3/10 text-chart-3",
  Printed: "bg-chart-2/10 text-chart-2",
}

export default function QuestionPaperPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Question Paper</h1>
            <p className="text-muted-foreground">প্রশ্নপত্র ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন প্রশ্নপত্র তৈরি করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">42</p>
            <p className="text-sm text-muted-foreground">মোট প্রশ্নপত্র</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">প্রস্তুত</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">10</p>
            <p className="text-sm text-muted-foreground">ড্রাফট</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">4</p>
            <p className="text-sm text-muted-foreground">মুদ্রিত</p>
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
            <option>অর্ধবার্ষিক ২০২৬</option>
            <option>১ম সাময়িক ২০২৬</option>
            <option>বার্ষিক ২০২৫</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিষয়</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্লাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">পরীক্ষা</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">মার্কস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">সময়</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {questionPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileQuestion className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{paper.subject}</p>
                        <p className="text-xs text-muted-foreground">{paper.createdBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{paper.class}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{paper.exam}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{paper.marks}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{paper.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[paper.status]}`}>
                      {paper.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
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
