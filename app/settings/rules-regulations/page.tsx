import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, BookOpen, ChevronDown } from "lucide-react"

export default function RulesRegulationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rules & Regulations</h1>
            <p className="text-muted-foreground">প্রতিষ্ঠানের নিয়ম-কানুন ও নীতিমালা পরিচালনা করুন</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন নিয়ম যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">নিয়ম-কানুন তৈরি করুন</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">শিরোনাম (Title)</label>
                <Input placeholder="যেমন: উপস্থিতির নিয়ম" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ক্যাটাগরি</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Attendance</option>
                  <option>Uniform</option>
                  <option>Discipline</option>
                  <option>Exam Rules</option>
                  <option>General</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">বিস্তারিত বিবরণ</label>
                <textarea 
                  className="w-full min-h-[150px] bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="নিয়ম কানুন বিস্তারিত লিখুন..."
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">স্ট্যাটাস</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
              <Button className="w-full mt-2">সংরক্ষণ করুন</Button>
            </div>
          </div>

          {/* List */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">নিয়ম-কানুনের তালিকা</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="খুঁজুন..." />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { 
                  id: 1, 
                  title: "উপস্থিতি (Attendance)", 
                  category: "Attendance", 
                  content: "শিক্ষার্থীদের অবশ্যই সকাল ৮:০০ টার মধ্যে স্কুলে উপস্থিত হতে হবে। পরপর ৩ দিন অনুপস্থিত থাকলে অভিভাবককে লিখিত কারণ দর্শাতে হবে।",
                  status: "Published"
                },
                { 
                  id: 2, 
                  title: "স্কুল ইউনিফর্ম (School Uniform)", 
                  category: "Uniform", 
                  content: "সকল শিক্ষার্থীকে নির্ধারিত স্কুল ইউনিফর্ম, কালো জুতো এবং আইডি কার্ড পরিধান করে স্কুলে আসতে হবে।",
                  status: "Published"
                },
                { 
                  id: 3, 
                  title: "পরীক্ষার নিয়মাবলি", 
                  category: "Exam Rules", 
                  content: "পরীক্ষা শুরু হওয়ার ১৫ মিনিট আগে হলে প্রবেশ করতে হবে। কোনো ইলেকট্রনিক ডিভাইস সাথে রাখা যাবে না।",
                  status: "Draft"
                }
              ].map((item) => (
                <div key={item.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="bg-secondary/30 p-4 flex justify-between items-center cursor-pointer hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {item.status}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="p-4 border-t border-border bg-card">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/50">
                      <Button variant="outline" size="sm" className="h-8 text-xs text-blue-500 hover:text-blue-600">
                        <Edit className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs text-rose-500 hover:text-rose-600">
                        <Trash2 className="w-3 h-3 mr-1" /> Delete
                      </Button>
                    </div>
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
