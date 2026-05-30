import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, GraduationCap, Users } from "lucide-react"

const classes = [
  { id: 1, name: "Play", sections: ["A", "B"], students: 45, teachers: 3 },
  { id: 2, name: "Nursery", sections: ["A", "B"], students: 52, teachers: 3 },
  { id: 3, name: "KG", sections: ["A", "B", "C"], students: 78, teachers: 4 },
  { id: 4, name: "Class 1", sections: ["A", "B"], students: 62, teachers: 4 },
  { id: 5, name: "Class 2", sections: ["A", "B"], students: 58, teachers: 4 },
  { id: 6, name: "Class 3", sections: ["A", "B"], students: 64, teachers: 4 },
  { id: 7, name: "Class 4", sections: ["A", "B"], students: 56, teachers: 4 },
  { id: 8, name: "Class 5", sections: ["A", "B"], students: 68, teachers: 5 },
  { id: 9, name: "Class 6", sections: ["A", "B", "C"], students: 82, teachers: 6 },
  { id: 10, name: "Class 7", sections: ["A", "B", "C"], students: 85, teachers: 6 },
  { id: 11, name: "Class 8", sections: ["A", "B", "C"], students: 88, teachers: 6 },
  { id: 12, name: "Class 9", sections: ["A", "B", "C"], students: 92, teachers: 7 },
  { id: 13, name: "Class 10", sections: ["A", "B", "C"], students: 95, teachers: 7 },
]

export default function ClassesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Classes</h1>
            <p className="text-muted-foreground">ক্লাস ও সেকশন ব্যবস্থাপনা</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন ক্লাস যুক্ত করুন
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{cls.name}</h3>
              <div className="flex flex-wrap gap-1 mb-4">
                {cls.sections.map((sec) => (
                  <span key={sec} className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground">
                    Section {sec}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {cls.students} Students
                </div>
                <div>{cls.teachers} Teachers</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
