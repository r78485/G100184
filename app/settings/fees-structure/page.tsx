import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react"

export default function FeesStructurePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fees Structure</h1>
            <p className="text-muted-foreground">শ্রেণী এবং সেশন অনুযায়ী ফি এর পরিমাণ নির্ধারণ করুন</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন ফি কাঠামো যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">ফি কাঠামো নির্ধারণ</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">শ্রেণী (Class)</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ফি এর ধরন</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Tuition Fee</option>
                  <option>Admission Fee</option>
                  <option>Exam Fee</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">পরিমাণ (Amount)</label>
                <Input type="number" placeholder="যেমন: 500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ফ্রিকোয়েন্সি (Frequency)</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>মাসিক (Monthly)</option>
                  <option>বাৎসরিক (Yearly)</option>
                  <option>এককালীন (One-time)</option>
                </select>
              </div>
              <Button className="w-full mt-2">সংরক্ষণ করুন</Button>
            </div>
          </div>

          {/* List/Table */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="font-semibold text-lg">বিদ্যমান ফি কাঠামো</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="w-4 h-4" />
                </Button>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-9" placeholder="খুঁজুন..." />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">শ্রেণী</th>
                    <th className="px-4 py-3">ফি এর ধরন</th>
                    <th className="px-4 py-3">পরিমাণ</th>
                    <th className="px-4 py-3">ফ্রিকোয়েন্সি</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, class: "Class 6", feeType: "Tuition Fee", amount: "500 ৳", freq: "Monthly" },
                    { id: 2, class: "Class 6", feeType: "Admission Fee", amount: "2000 ৳", freq: "One-time" },
                    { id: 3, class: "Class 7", feeType: "Tuition Fee", amount: "600 ৳", freq: "Monthly" },
                    { id: 4, class: "Class 8", feeType: "Exam Fee", amount: "300 ৳", freq: "Term wise" },
                  ].map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{item.class}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.feeType}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{item.amount}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.freq}</td>
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
