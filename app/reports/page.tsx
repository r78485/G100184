import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, Download, TrendingUp, TrendingDown, Users, GraduationCap, Receipt, CalendarCheck } from "lucide-react"

const reports = [
  { id: 1, name: "ছাত্র রিপোর্ট", description: "সকল ছাত্রছাত্রীদের বিস্তারিত তথ্য", icon: Users, count: "1,250" },
  { id: 2, name: "পরীক্ষার ফলাফল", description: "পরীক্ষার ফলাফল ও গ্রেড রিপোর্ট", icon: GraduationCap, count: "4" },
  { id: 3, name: "ফি রিপোর্ট", description: "ফি সংগ্রহ ও বকেয়া রিপোর্ট", icon: Receipt, count: "৳5.2L" },
  { id: 4, name: "উপস্থিতি রিপোর্ট", description: "দৈনিক ও মাসিক উপস্থিতি", icon: CalendarCheck, count: "94%" },
]

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">বিভিন্ন রিপোর্ট ও বিশ্লেষণ</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            কাস্টম রিপোর্ট তৈরি করুন
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ছাত্র বৃদ্ধি</p>
                <p className="text-2xl font-bold text-foreground">+12%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ফি সংগ্রহ</p>
                <p className="text-2xl font-bold text-foreground">+8%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-1" />
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">অনুপস্থিতি</p>
                <p className="text-2xl font-bold text-foreground">-5%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">পাশের হার</p>
                <p className="text-2xl font-bold text-foreground">96%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-chart-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <report.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{report.count}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Report
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Downloads */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">সাম্প্রতিক ডাউনলোড</h3>
          <div className="space-y-3">
            {[
              { name: "মাসিক উপস্থিতি রিপোর্ট - মে ২০২৬", date: "27/05/2026", size: "245 KB" },
              { name: "ফি সংগ্রহ রিপোর্ট - মে ২০২৬", date: "25/05/2026", size: "180 KB" },
              { name: "১ম সাময়িক পরীক্ষার ফলাফল", date: "15/03/2026", size: "520 KB" },
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.date} • {file.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
