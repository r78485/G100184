import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen, Edit, Trash2 } from "lucide-react"

const subjects = [
  { id: 1, name: "বাংলা", code: "BAN", classes: ["Class 1-10"], type: "Compulsory" },
  { id: 2, name: "English", code: "ENG", classes: ["Class 1-10"], type: "Compulsory" },
  { id: 3, name: "গণিত", code: "MATH", classes: ["Class 1-10"], type: "Compulsory" },
  { id: 4, name: "বিজ্ঞান", code: "SCI", classes: ["Class 3-8"], type: "Compulsory" },
  { id: 5, name: "পদার্থবিজ্ঞান", code: "PHY", classes: ["Class 9-10"], type: "Group" },
  { id: 6, name: "রসায়ন", code: "CHE", classes: ["Class 9-10"], type: "Group" },
  { id: 7, name: "জীববিজ্ঞান", code: "BIO", classes: ["Class 9-10"], type: "Group" },
  { id: 8, name: "সমাজ বিজ্ঞান", code: "SOC", classes: ["Class 3-10"], type: "Compulsory" },
  { id: 9, name: "ধর্ম ও নৈতিক শিক্ষা", code: "REL", classes: ["Class 1-10"], type: "Compulsory" },
  { id: 10, name: "তথ্য ও যোগাযোগ প্রযুক্তি", code: "ICT", classes: ["Class 6-10"], type: "Compulsory" },
  { id: 11, name: "কৃষি শিক্ষা", code: "AGR", classes: ["Class 9-10"], type: "Optional" },
  { id: 12, name: "গার্হস্থ্য বিজ্ঞান", code: "HOM", classes: ["Class 9-10"], type: "Optional" },
]

const typeColors: Record<string, string> = {
  Compulsory: "bg-primary/10 text-primary",
  Group: "bg-chart-2/10 text-chart-2",
  Optional: "bg-chart-3/10 text-chart-3",
}

export default function SubjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
            <p className="text-muted-foreground">বিষয় ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন বিষয় যুক্ত করুন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">42</p>
            <p className="text-sm text-muted-foreground">মোট বিষয়</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">আবশ্যিক বিষয়</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">14</p>
            <p className="text-sm text-muted-foreground">ঐচ্ছিক বিষয়</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিষয়ের নাম</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">কোড</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্লাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ধরন</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{subject.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{subject.code}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{subject.classes.join(", ")}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${typeColors[subject.type]}`}>
                      {subject.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
    </DashboardLayout>
  )
}
