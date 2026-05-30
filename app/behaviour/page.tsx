import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Star, Award, TrendingUp, Users } from "lucide-react"

const students = [
  { id: 1, name: "রাহাত হোসেন", class: "Class 10", behaviour: 95, skills: 88, attendance: 98, grade: "A+" },
  { id: 2, name: "ফাতেমা আক্তার", class: "Class 10", behaviour: 92, skills: 95, attendance: 96, grade: "A+" },
  { id: 3, name: "মোঃ আব্দুল্লাহ", class: "Class 9", behaviour: 78, skills: 82, attendance: 85, grade: "B+" },
  { id: 4, name: "সাবিনা খাতুন", class: "Class 9", behaviour: 88, skills: 75, attendance: 90, grade: "A" },
  { id: 5, name: "করিম মিয়া", class: "Class 8", behaviour: 65, skills: 70, attendance: 72, grade: "B" },
]

const skills = [
  "নেতৃত্ব", "যোগাযোগ দক্ষতা", "সৃজনশীলতা", "সমস্যা সমাধান", "টিমওয়ার্ক", "সময় ব্যবস্থাপনা"
]

export default function BehaviourPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Behaviour & Skills</h1>
            <p className="text-muted-foreground">ছাত্রদের আচরণ ও দক্ষতা মূল্যায়ন</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            মূল্যায়ন যুক্ত করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-sm text-muted-foreground">গড় আচরণ স্কোর</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">82%</p>
                <p className="text-sm text-muted-foreground">গড় দক্ষতা স্কোর</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">+5%</p>
                <p className="text-sm text-muted-foreground">উন্নতি</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1,250</p>
                <p className="text-sm text-muted-foreground">মূল্যায়িত ছাত্র</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">দক্ষতা ক্যাটাগরি</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ছাত্র</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্লাস</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">আচরণ</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">দক্ষতা</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">উপস্থিতি</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">গ্রেড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{student.name[0]}</span>
                      </div>
                      <span className="font-medium text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{student.class}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${student.behaviour}%` }} />
                      </div>
                      <span className="text-sm text-foreground">{student.behaviour}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-chart-1 rounded-full" style={{ width: `${student.skills}%` }} />
                      </div>
                      <span className="text-sm text-foreground">{student.skills}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-chart-2 rounded-full" style={{ width: `${student.attendance}%` }} />
                      </div>
                      <span className="text-sm text-foreground">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                      {student.grade}
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
