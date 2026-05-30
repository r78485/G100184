import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Mail, Send, Users, Clock, CheckCircle, XCircle } from "lucide-react"

const messages = [
  { id: 1, subject: "অভিভাবক সভার বিজ্ঞপ্তি", recipients: "সকল অভিভাবক", sent: "27/05/2026", status: "Delivered", delivered: 1180, failed: 5 },
  { id: 2, subject: "পরীক্ষার রুটিন", recipients: "Class 9-10", sent: "25/05/2026", status: "Delivered", delivered: 420, failed: 2 },
  { id: 3, subject: "ফি জমার অনুস্মারক", recipients: "বকেয়া অভিভাবক", sent: "22/05/2026", status: "Delivered", delivered: 70, failed: 0 },
  { id: 4, subject: "স্কুল বন্ধের নোটিশ", recipients: "সকল", sent: "20/05/2026", status: "Delivered", delivered: 1250, failed: 8 },
]

export default function MessagingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messaging</h1>
            <p className="text-muted-foreground">বার্তা প্রেরণ ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন বার্তা পাঠান
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">মোট বার্তা</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2,920</p>
                <p className="text-sm text-muted-foreground">ডেলিভারড</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">15</p>
                <p className="text-sm text-muted-foreground">ব্যর্থ</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">নির্ধারিত</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compose Message */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">নতুন বার্তা তৈরি করুন</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">প্রাপক</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>সকল অভিভাবক</option>
                  <option>নির্দিষ্ট ক্লাস</option>
                  <option>নির্দিষ্ট ছাত্র</option>
                  <option>শিক্ষকবৃন্দ</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">বিষয়</label>
                <Input placeholder="বার্তার বিষয় লিখুন..." />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">বার্তা</label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground min-h-[120px] resize-none"
                placeholder="আপনার বার্তা লিখুন..."
              />
            </div>
            <div className="flex justify-end">
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                বার্তা পাঠান
              </Button>
            </div>
          </div>
        </div>

        {/* Message History */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">পাঠানো বার্তা</h3>
          </div>
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিষয়</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">প্রাপক</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">তারিখ</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">ডেলিভারড</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">ব্যর্থ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{msg.subject}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{msg.recipients}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{msg.sent}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-primary font-medium">{msg.delivered}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-destructive font-medium">{msg.failed}</span>
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
