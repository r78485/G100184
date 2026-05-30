import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Building, Landmark } from "lucide-react"

export default function AccountsForFeesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Accounts For Fees</h1>
            <p className="text-muted-foreground">ফি সংগ্রহের জন্য পেমেন্ট একাউন্ট বা ব্যাংক হিসাব যুক্ত করুন</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন একাউন্ট যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">একাউন্ট তৈরি করুন</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">একাউন্টের নাম</label>
                <Input placeholder="যেমন: DBBL School Account" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">একাউন্টের ধরন</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Bank Account</option>
                  <option>Mobile Banking (bKash/Nagad)</option>
                  <option>Cash</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">একাউন্ট নম্বর / মোবাইল নম্বর</label>
                <Input placeholder="যেমন: 123.456.789" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ব্যাংক ও ব্রাঞ্চ (ঐচ্ছিক)</label>
                <Input placeholder="যেমন: DBBL, Dhanmondi Branch" />
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
              <h3 className="font-semibold text-lg">একাউন্টের তালিকা</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="খুঁজুন..." />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 1, name: "Main Bank Account", type: "Bank Account", number: "192.100.83849", details: "DBBL, Main Branch", status: "Active" },
                { id: 2, name: "School bKash Agent", type: "Mobile Banking", number: "+880 1711-000000", details: "Merchant Account", status: "Active" },
                { id: 3, name: "Cash Counter 1", type: "Cash", number: "N/A", details: "Front Office", status: "Active" },
              ].map((item) => (
                <div key={item.id} className="border border-border rounded-xl p-4 hover:border-primary/50 transition-colors bg-secondary/10">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.type === 'Bank Account' ? <Building className="w-4 h-4" /> : <Landmark className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-foreground font-medium font-mono">{item.number}</p>
                    <p className="text-xs text-muted-foreground">{item.details}</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 text-xs">
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 text-xs">
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
