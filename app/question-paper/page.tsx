import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileQuestion, Download, Eye, Edit, Trash2, Printer } from "lucide-react"
import { useSchoolStore, GeneratedPaper } from "@/lib/store"
import Link from "next/link"

const statusColors: Record<string, string> = {
  Ready: "bg-primary/10 text-primary",
  Draft: "bg-chart-3/10 text-chart-3",
  Printed: "bg-chart-2/10 text-chart-2",
}

export default function QuestionPaperPage() {
  const { generatedPapers, subjects, classes, deleteGeneratedPaper } = useSchoolStore()

  // Calculate stats
  const totalPapers = generatedPapers.length
  const readyPapers = generatedPapers.filter(p => p.status === 'Ready').length
  const draftPapers = generatedPapers.filter(p => p.status === 'Draft').length
  const printedPapers = generatedPapers.filter(p => p.status === 'Printed').length

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || id
  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || id

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Question Paper</h1>
            <p className="text-muted-foreground">প্রশ্নপত্র ব্যবস্থাপনা (অটো-জেনারেটেড)</p>
          </div>
          <Link href="/question-paper/generate">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              নতুন প্রশ্নপত্র তৈরি করুন
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">{totalPapers}</p>
            <p className="text-sm text-muted-foreground">মোট প্রশ্নপত্র</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">{readyPapers}</p>
            <p className="text-sm text-muted-foreground">প্রস্তুত</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">{draftPapers}</p>
            <p className="text-sm text-muted-foreground">ড্রাফট</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-3xl font-bold text-foreground">{printedPapers}</p>
            <p className="text-sm text-muted-foreground">মুদ্রিত</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল ক্লাস</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল বিষয়</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
            <option>সকল পরীক্ষা</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিষয়</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্লাস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">পরীক্ষা</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">মার্কস</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">সময়</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {generatedPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileQuestion className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{getSubjectName(paper.subjectId)}</p>
                        <p className="text-xs text-muted-foreground">{paper.createdBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{getClassName(paper.classId)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{paper.examName}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{paper.totalMarks}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{paper.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[paper.status]}`}>
                      {paper.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/question-paper/print/cq/${paper.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" title="Print Creative (CQ)">
                          <Printer className="w-3 h-3" /> সৃজনশীল
                        </Button>
                      </Link>
                      <Link href={`/question-paper/print/mcq/${paper.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" title="Print MCQ">
                          <Printer className="w-3 h-3" /> বহুনির্বাচনী
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => {
                        if(confirm('Are you sure?')) deleteGeneratedPaper(paper.id)
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {generatedPapers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    কোনো প্রশ্নপত্র জেনারেট করা হয়নি। "নতুন প্রশ্নপত্র তৈরি করুন" বাটনে ক্লিক করুন।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
