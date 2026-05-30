import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, School, Bell, Shield, Database, Globe, Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">General Settings</h1>
          <p className="text-muted-foreground">সিস্টেম সেটিংস ব্যবস্থাপনা</p>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <School className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">স্কুল তথ্য</h3>
                  <p className="text-sm text-muted-foreground">School Information</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">স্কুলের নাম</label>
                  <Input defaultValue="ABC High School" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">স্কুল কোড</label>
                  <Input defaultValue="SCH001" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">ফোন</label>
                  <Input defaultValue="+880 1711-111111" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">ইমেইল</label>
                  <Input defaultValue="info@school.edu.bd" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-2 block">ঠিকানা</label>
                  <Input defaultValue="১২৩ স্কুল রোড, ঢাকা, বাংলাদেশ" />
                </div>
              </div>
            </div>

            {/* Academic Settings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">একাডেমিক সেটিংস</h3>
                  <p className="text-sm text-muted-foreground">Academic Settings</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">শিক্ষাবর্ষ</label>
                  <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">সেশন</label>
                  <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                    <option>January - December</option>
                    <option>July - June</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">গ্রেডিং সিস্টেম</label>
                  <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                    <option>GPA (5.0)</option>
                    <option>GPA (4.0)</option>
                    <option>Percentage</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">পাস মার্কস</label>
                  <Input defaultValue="33" type="number" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">দ্রুত অ্যাকশন</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Bell className="w-4 h-4" />
                  নোটিফিকেশন সেটিংস
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Shield className="w-4 h-4" />
                  সিকিউরিটি সেটিংস
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Database className="w-4 h-4" />
                  ব্যাকআপ ও রিস্টোর
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Globe className="w-4 h-4" />
                  ভাষা সেটিংস
                </Button>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">সিস্টেম তথ্য</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ভার্সন</span>
                  <span className="text-foreground">2.5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">সর্বশেষ আপডেট</span>
                  <span className="text-foreground">25 মে, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">লাইসেন্স</span>
                  <span className="text-primary">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            সেটিংস সংরক্ষণ করুন
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
