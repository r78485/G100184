import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Percent } from "lucide-react"

export default function DiscountTypePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Discount Type</h1>
            <p className="text-muted-foreground">ছাত্রছাত্রীদের জন্য বিভিন্ন ডিসকাউন্ট বা বৃত্তির ধরন তৈরি করুন</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন ডিসকাউন্ট যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">ডিসকাউন্ট তৈরি করুন</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ডিসকাউন্টের নাম</label>
                <Input placeholder="যেমন: Sibling Discount" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ডিসকাউন্টের ধরন</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Percentage (%)</option>
                  <option>Fixed Amount (৳)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">পরিমাণ / শতাংশ</label>
                <Input type="number" placeholder="যেমন: 20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">স্ট্যাটাস</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <Button className="w-full mt-2">সংরক্ষণ করুন</Button>
            </div>
          </div>

          {/* List/Table */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">ডিসকাউন্টের তালিকা</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="খুঁজুন..." />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">ডিসকাউন্টের নাম</th>
                    <th className="px-4 py-3">ধরন</th>
                    <th className="px-4 py-3">পরিমাণ</th>
                    <th className="px-4 py-3">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: "Sibling Discount", type: "Percentage", amount: "50%", status: "Active" },
                    { id: 2, name: "Merit Scholarship", type: "Percentage", amount: "100%", status: "Active" },
                    { id: 3, name: "Employee Child", type: "Fixed Amount", amount: "500 ৳", status: "Active" },
                    { id: 4, name: "Special Waiver", type: "Fixed Amount", amount: "200 ৳", status: "Inactive" },
                  ].map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-medium flex items-center gap-2">
                        <Percent className="w-4 h-4 text-primary" />
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.type}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{item.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {item.status}
                        </span>
                      </td>
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
