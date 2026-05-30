import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactions = [
  { id: 1, type: "income", description: "ফি সংগ্রহ - Class 10", amount: 25000, date: "27/05/2026", category: "Fees" },
  { id: 2, type: "expense", description: "বিদ্যুৎ বিল", amount: 8500, date: "26/05/2026", category: "Utilities" },
  { id: 3, type: "income", description: "ফি সংগ্রহ - Class 9", amount: 18000, date: "26/05/2026", category: "Fees" },
  { id: 4, type: "expense", description: "স্টেশনারি ক্রয়", amount: 3200, date: "25/05/2026", category: "Supplies" },
  { id: 5, type: "expense", description: "বেতন - মে মাস", amount: 185000, date: "25/05/2026", category: "Salary" },
  { id: 6, type: "income", description: "বই বিক্রয়", amount: 12000, date: "24/05/2026", category: "Sales" },
]

export default function AccountsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground">আয়-ব্যয় হিসাব ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন লেনদেন যুক্ত করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳12.5L</p>
                <p className="text-sm text-muted-foreground">বর্তমান ব্যালেন্স</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳5.5L</p>
                <p className="text-sm text-muted-foreground">এই মাসে আয়</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳2.1L</p>
                <p className="text-sm text-muted-foreground">এই মাসে ব্যয়</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳3.4L</p>
                <p className="text-sm text-muted-foreground">নেট সঞ্চয়</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">সাম্প্রতিক লেনদেন</h3>
            <div className="flex items-center gap-2">
              <select className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
                <option>সকল ধরন</option>
                <option>আয়</option>
                <option>ব্যয়</option>
              </select>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ধরন</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিবরণ</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্যাটাগরি</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">তারিখ</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === "income" ? "bg-primary/10" : "bg-destructive/10"
                    }`}>
                      {tx.type === "income" ? (
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-secondary rounded text-muted-foreground">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                  <td className={`px-6 py-4 text-sm font-medium text-right ${
                    tx.type === "income" ? "text-primary" : "text-destructive"
                  }`}>
                    {tx.type === "income" ? "+" : "-"}৳{tx.amount.toLocaleString()}
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
