import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MessageSquare, Send, CheckCircle, XCircle, Clock } from "lucide-react"

const smsHistory = [
  { id: 1, message: "আপনার সন্তান আজ স্কুলে উপস্থিত আছে।", recipients: 1180, sent: "27/05/2026 9:30 AM", cost: "৳590", status: "Delivered" },
  { id: 2, message: "অর্ধবার্ষিক পরীক্ষা ১ জুন থেকে শুরু হবে।", recipients: 1250, sent: "25/05/2026 10:00 AM", cost: "৳625", status: "Delivered" },
  { id: 3, message: "ফি জমার শেষ তারিখ ৩০ মে।", recipients: 70, sent: "22/05/2026 11:00 AM", cost: "৳35", status: "Delivered" },
]

export default function SMSPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SMS Services</h1>
            <p className="text-muted-foreground">SMS পাঠানো ও ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন SMS পাঠান
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5,420</p>
                <p className="text-sm text-muted-foreground">মোট SMS পাঠানো</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">98.5%</p>
                <p className="text-sm text-muted-foreground">ডেলিভারি রেট</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2,500</p>
                <p className="text-sm text-muted-foreground">বাকি ক্রেডিট</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳1,250</p>
                <p className="text-sm text-muted-foreground">এই মাসে খরচ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compose SMS */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">নতুন SMS পাঠান</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">প্রাপক</label>
              <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                <option>সকল অভিভাবক</option>
                <option>নির্দিষ্ট ক্লাস</option>
                <option>উপস্থিত ছাত্র</option>
                <option>অনুপস্থিত ছাত্র</option>
                <option>বকেয়া অভিভাবক</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">বার্তা (160 অক্ষর)</label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground min-h-[100px] resize-none"
                placeholder="আপনার SMS লিখুন..."
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">0/160 অক্ষর</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">আনুমানিক খরচ: ৳590 (1,180 প্রাপক)</p>
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                SMS পাঠান
              </Button>
            </div>
          </div>
        </div>

        {/* SMS History */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">SMS ইতিহাস</h3>
          </div>
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বার্তা</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">প্রাপক</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">তারিখ</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">খরচ</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {smsHistory.map((sms) => (
                <tr key={sms.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">{sms.message}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sms.recipients}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sms.sent}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{sms.cost}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {sms.status}
                    </span>
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
