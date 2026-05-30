"use client"

import { useState, useRef } from "react"
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
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { EmployeeIdCardFront, EmployeeIdCardBack } from "@/components/employee-id-card-template"

export default function EmployeeIdCardsPage() {
  const { employees } = useSchoolStore()
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const idCardsRef = useRef<HTMLDivElement>(null)

  const departments = [...new Set(employees.map(e => e.department))]

  const filteredEmployees = employees.filter(
    (e) => selectedDepartment === "all" || e.department === selectedDepartment
  )

  const cardsPerPage = 9
  const pageCount = Math.ceil(filteredEmployees.length / cardsPerPage)
  const a4Pages = Array.from({ length: pageCount }, (_, i) => 
    filteredEmployees.slice(i * cardsPerPage, (i + 1) * cardsPerPage)
  )

  const downloadIdCards = async () => {
    if (!idCardsRef.current) return
    
    setIsGeneratingPdf(true)
    try {
      const pages = idCardsRef.current.querySelectorAll('.a4-page')
      if (pages.length === 0) return

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage()
        
        const canvas = await html2canvas(pages[i] as HTMLElement, { 
          scale: 2,
          useCORS: true,
          logging: false
        })
        
        const imgData = canvas.toDataURL("image/png")
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297)
      }

      pdf.save(`Employee_ID_Cards_${selectedDepartment}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 flex flex-col h-[calc(100vh-2rem)]">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <IdCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">স্টাফ আইডি কার্ড</h1>
            <p className="text-muted-foreground">শিক্ষক ও কর্মচারীদের আইডি কার্ড তৈরি ও প্রিন্ট করুন</p>
          </div>
        </div>
        
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="border-b shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>আইডি কার্ড তৈরি</CardTitle>
                <CardDescription>পিডিএফ ডাউনলোড করে প্রিন্ট করুন</CardDescription>
              </div>
              <div className="flex items-end gap-4">
                <div className="w-48">
                  <Label className="mb-2 block">বিভাগ নির্বাচন করুন</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকল বিভাগ</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={downloadIdCards} 
                  disabled={filteredEmployees.length === 0 || isGeneratingPdf}
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
          <CardContent className="flex-1 overflow-y-auto p-4 bg-slate-50 relative">
            {filteredEmployees.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground absolute inset-0">
                এই বিভাগে কোনো কর্মচারী নেই
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 pb-8" ref={idCardsRef}>
                {a4Pages.map((pageEmployees, pageIndex) => (
                  <div key={`page-${pageIndex}`} className="flex flex-col gap-8">
                    {/* Fronts Page */}
                    <div 
                      className="a4-page bg-white shadow-md mx-auto relative p-[10mm]"
                      style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
                    >
                      <div className="absolute top-2 left-0 w-full text-center text-[10px] text-slate-400">Page {pageIndex * 2 + 1} - Fronts</div>
                      <div className="grid grid-cols-3 gap-[5mm] place-items-center h-full content-start pt-4">
                        {pageEmployees.map(employee => (
                          <EmployeeIdCardFront key={`front-${employee.id}`} employee={employee} variant={employee.designation.includes('শিক্ষক') ? 'purple' : 'teal'} />
                        ))}
                      </div>
                    </div>
                    
                    {/* Backs Page */}
                    <div 
                      className="a4-page bg-white shadow-md mx-auto relative p-[10mm]"
                      style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
                    >
                      <div className="absolute top-2 left-0 w-full text-center text-[10px] text-slate-400">Page {pageIndex * 2 + 2} - Backs</div>
                      <div className="grid grid-cols-3 gap-[5mm] place-items-center h-full content-start pt-4" style={{ direction: 'rtl' }}>
                        {pageEmployees.map(employee => (
                          <div key={`back-${employee.id}`} style={{ direction: 'ltr' }}>
                            <EmployeeIdCardBack employee={employee} variant={employee.designation.includes('শিক্ষক') ? 'purple' : 'teal'} />
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
