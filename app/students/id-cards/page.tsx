"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { IdCard, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSchoolStore } from "@/lib/store"
import { IdCardFront, IdCardBack } from "@/components/id-card-template"

export default function IdCardsPage() {
  const { students, classes } = useSchoolStore()
  const [selectedClassForId, setSelectedClassForId] = useState<string>("all")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const classStudentsForId = students.filter(
    (s) => selectedClassForId === "all" || s.classId === selectedClassForId
  )

  // initialize selection to all students in class when class changes
  useEffect(() => {
    setSelectedIds(new Set(classStudentsForId.map(s => s.id)))
  }, [selectedClassForId, students])

  const effectiveStudents = classStudentsForId.filter(s => selectedIds.has(s.id))

  const cardsPerPage = 9
  const pageCount = Math.ceil(effectiveStudents.length / cardsPerPage)
  const a4Pages = Array.from({ length: pageCount }, (_, i) => 
    effectiveStudents.slice(i * cardsPerPage, (i + 1) * cardsPerPage)
  )

  const downloadClassIdCards = () => {
    // We use a small timeout to let the UI update if needed, but here we just call print.
    // The native print dialog allows saving as PDF perfectly.
    window.print()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 flex flex-col h-[calc(100vh-2rem)]">
        <div className="flex items-center gap-3 shrink-0 print:hidden">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <IdCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">শিক্ষার্থী আইডি কার্ড</h1>
            <p className="text-muted-foreground">শ্রেণিভিত্তিক শিক্ষার্থীদের আইডি কার্ড তৈরি ও প্রিন্ট করুন</p>
          </div>
        </div>
        
        <Card className="flex-1 flex flex-col overflow-hidden print:border-none print:shadow-none">
          <CardHeader className="border-b shrink-0 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>আইডি কার্ড তৈরি</CardTitle>
                <CardDescription>পিডিএফ ডাউনলোড করে প্রিন্ট করুন</CardDescription>
              </div>
              <div className="flex items-end gap-4">
                <div className="w-48">
                  <Label className="mb-2 block">শ্রেণি নির্বাচন করুন</Label>
                  <Select value={selectedClassForId} onValueChange={setSelectedClassForId}>
                    <SelectTrigger>
                      <SelectValue placeholder="শ্রেণি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকল শিক্ষার্থী</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} ({cls.section})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={downloadClassIdCards} 
                  disabled={classStudentsForId.length === 0 || isGeneratingPdf}
                  className="w-48"
                >
                  {isGeneratingPdf ? (
                    "PDF তৈরি হচ্ছে..."
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      PDF ডাউনলোড করুন
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 bg-slate-50 relative print:p-0 print:bg-white print:overflow-visible print:block">
            {classStudentsForId.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground absolute inset-0 print:hidden">
                এই শ্রেণিতে কোনো শিক্ষার্থী নেই
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 pb-8 print:block print:pb-0 print:gap-0">
                {a4Pages.map((pageStudents, pageIndex) => (
                  <div key={`page-${pageIndex}`} className="flex flex-col gap-8 print:block print:gap-0">
                    {/* Fronts Page */}
                    <div 
                      className="a4-page bg-white shadow-md mx-auto relative p-[10mm] print:shadow-none print:m-0 print:break-after-page"
                      style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
                    >
                      <div className="absolute top-2 left-0 w-full text-center text-[10px] text-slate-400 print:hidden">Page {pageIndex * 2 + 1} - Fronts</div>
                      <div className="grid grid-cols-3 gap-[5mm] place-items-center h-full content-start pt-4">
                        {pageStudents.map(student => (
                          <div key={`front-wrap-${student.id}`} className="relative">
                            <label className="absolute top-1 left-1 z-30 bg-white/80 rounded-full p-1 print:hidden">
                              <input type="checkbox" className="w-4 h-4" checked={selectedIds.has(student.id)} onChange={(e) => {
                                setSelectedIds(prev => {
                                  const next = new Set(prev)
                                  if (e.target.checked) next.add(student.id)
                                  else next.delete(student.id)
                                  return next
                                })
                              }} />
                            </label>
                            <IdCardFront student={student} variant={student.gender === 'female' ? 'red' : 'blue'} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Backs Page */}
                    <div 
                      className="a4-page bg-white shadow-md mx-auto relative p-[10mm] print:shadow-none print:m-0 print:break-after-page"
                      style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
                    >
                      <div className="absolute top-2 left-0 w-full text-center text-[10px] text-slate-400 print:hidden">Page {pageIndex * 2 + 2} - Backs</div>
                      <div className="grid grid-cols-3 gap-[5mm] place-items-center h-full content-start pt-4" style={{ direction: 'rtl' }}>
                        {pageStudents.map(student => (
                          <div key={`back-${student.id}`} style={{ direction: 'ltr' }}>
                            <IdCardBack student={student} variant={student.gender === 'female' ? 'red' : 'blue'} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
