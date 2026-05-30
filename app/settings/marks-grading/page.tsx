import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Award } from "lucide-react"

export default function MarksGradingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marks Grading</h1>
            <p className="text-muted-foreground">পরীক্ষার ফলাফলের জন্য গ্রেডিং সিস্টেম এবং পয়েন্ট নির্ধারণ করুন</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন গ্রেড যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">গ্রেড সেটআপ</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">গ্রেড নাম (Grade Name)</label>
                <Input placeholder="যেমন: A+" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">গ্রেড পয়েন্ট (Grade Point)</label>
                <Input type="number" step="0.01" placeholder="যেমন: 5.00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">সর্বনিম্ন নম্বর</label>
                  <Input type="number" placeholder="80" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">সর্বোচ্চ নম্বর</label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">মন্তব্য (Remarks)</label>
                <Input placeholder="যেমন: Outstanding" />
              </div>
              <Button className="w-full mt-2">সংরক্ষণ করুন</Button>
            </div>
          </div>

          {/* List/Table */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">গ্রেডিং স্কেল</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">গ্রেড</th>
                    <th className="px-4 py-3">পয়েন্ট</th>
                    <th className="px-4 py-3">নম্বর সীমা (Marks Range)</th>
                    <th className="px-4 py-3">মন্তব্য</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, grade: "A+", point: "5.00", range: "80 - 100", remark: "Outstanding", color: "text-emerald-500" },
                    { id: 2, grade: "A", point: "4.00", range: "70 - 79", remark: "Excellent", color: "text-blue-500" },
                    { id: 3, grade: "A-", point: "3.50", range: "60 - 69", remark: "Very Good", color: "text-indigo-500" },
                    { id: 4, grade: "B", point: "3.00", range: "50 - 59", remark: "Good", color: "text-purple-500" },
                    { id: 5, grade: "C", point: "2.00", range: "40 - 49", remark: "Satisfactory", color: "text-orange-500" },
                    { id: 6, grade: "D", point: "1.00", range: "33 - 39", remark: "Pass", color: "text-amber-500" },
                    { id: 7, grade: "F", point: "0.00", range: "0 - 32", remark: "Fail", color: "text-rose-500" },
                  ].map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-bold text-lg flex items-center gap-2">
                        <Award className={`w-4 h-4 ${item.color}`} />
                        <span className={item.color}>{item.grade}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{item.point}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.range}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.remark}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
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
        </div>
      </div>
    </DashboardLayout>
  )
}
