import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, Banknote, Download, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"

const salaryRecords = [
  { id: "SAL001", employee: "মোঃ আলী আহমেদ", designation: "প্রধান শিক্ষক", salary: 45000, bonus: 5000, deduction: 0, net: 50000, status: "Paid", month: "মে ২০২৬" },
  { id: "SAL002", employee: "ফাতেমা সুলতানা", designation: "সহকারী শিক্ষক", salary: 28000, bonus: 0, deduction: 1000, net: 27000, status: "Paid", month: "মে ২০২৬" },
  { id: "SAL003", employee: "করিম উদ্দিন", designation: "সহকারী শিক্ষক", salary: 28000, bonus: 0, deduction: 0, net: 28000, status: "Pending", month: "মে ২০২৬" },
  { id: "SAL004", employee: "নাজমা বেগম", designation: "সহকারী শিক্ষক", salary: 28000, bonus: 0, deduction: 2000, net: 26000, status: "On Hold", month: "মে ২০২৬" },
  { id: "SAL005", employee: "সাইফুল ইসলাম", designation: "অফিস সহকারী", salary: 18000, bonus: 0, deduction: 0, net: 18000, status: "Paid", month: "মে ২০২৬" },
]

const statusColors: Record<string, string> = {
  Paid: "bg-primary/10 text-primary",
  Pending: "bg-chart-3/10 text-chart-3",
  "On Hold": "bg-destructive/10 text-destructive",
}

export default function SalaryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Salary</h1>
            <p className="text-muted-foreground">বেতন ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            বেতন প্রদান করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳18.5L</p>
                <p className="text-sm text-muted-foreground">মোট বেতন</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳15.2L</p>
                <p className="text-sm text-muted-foreground">প্রদত্ত</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳3.3L</p>
                <p className="text-sm text-muted-foreground">বাকি</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">85</p>
                <p className="text-sm text-muted-foreground">কর্মচারী</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>মে ২০২৬</option>
            <option>এপ্রিল ২০২৬</option>
            <option>মার্চ ২০২৬</option>
          </select>
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল স্ট্যাটাস</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>On Hold</option>
          </select>
          <Button variant="outline" className="gap-2 ml-auto">
            <Download className="w-4 h-4" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">কর্মচারী</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">পদবি</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বেতন</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বোনাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">কর্তন</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">মোট</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {salaryRecords.map((record) => (
                <tr key={record.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{record.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{record.employee}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{record.designation}</td>
                  <td className="px-6 py-4 text-sm text-foreground">৳{record.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-primary">৳{record.bonus.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-destructive">৳{record.deduction.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">৳{record.net.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
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
