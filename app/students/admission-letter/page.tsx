"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSchoolStore } from "@/lib/store"

export default function AdmissionLetterPage() {
  const { students, instituteProfile } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.includes(searchTerm)
  )

  const student = students.find(s => s.id === selectedStudent)

  const handlePrint = () => {
    window.print()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 print:hidden">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ভর্তির ছাড়পত্র</h1>
            <p className="text-muted-foreground">শিক্ষার্থীর ভর্তির ছাড়পত্র প্রিন্ট করুন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 print:hidden">
            <CardHeader>
              <CardTitle>শিক্ষার্থী নির্বাচন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudent(s.id)}
                      className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedStudent === s.id
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">Reg: {s.registrationNo}</p>
                    </div>
                  ))}
                  {filteredStudents.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-4">
                      কোনো শিক্ষার্থী পাওয়া যায়নি
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-none md:shadow-sm">
            <CardHeader className="print:hidden flex flex-row items-center justify-between">
              <CardTitle>ছাড়পত্র প্রিভিউ</CardTitle>
              {student && (
                <Button onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  প্রিন্ট করুন
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {student ? (
                <div className="p-8 border rounded-lg bg-white text-black min-h-[600px] print:border-none print:p-0">
                  <div className="text-center mb-8 border-b pb-6">
                    {instituteProfile?.logo && (
                      <img src={instituteProfile.logo} alt="Logo" className="h-20 mx-auto mb-4 object-contain" />
                    )}
                    <h1 className="text-3xl font-bold mb-2">{instituteProfile?.name || "EduManage School"}</h1>
                    <p className="text-sm">{instituteProfile?.address || "123 Education Street, Dhaka, Bangladesh"}</p>
                    <p className="text-sm">Phone: {instituteProfile?.phone || "01XXX-XXXXXX"} | Email: {instituteProfile?.email || "info@edumanage.com"}</p>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold underline">ADMISSION CONFIRMATION LETTER</h2>
                  </div>

                  <div className="space-y-6 text-base leading-relaxed">
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    
                    <p>
                      This is to certify that <strong>{student.nameEn || student.name}</strong>, 
                      son/daughter of <strong>{student.fatherName}</strong> and <strong>{student.motherName}</strong>, 
                      has been officially admitted to our institution.
                    </p>

                    <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-6 rounded-lg print:bg-transparent print:border">
                      <p><strong>Registration No:</strong> {student.registrationNo}</p>
                      <p><strong>Class:</strong> {student.classId}</p>
                      <p><strong>Section:</strong> {student.section}</p>
                      <p><strong>Roll No:</strong> {student.roll}</p>
                      <p><strong>Admission Date:</strong> {student.admissionDate}</p>
                      <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
                    </div>

                    <p>
                      We welcome the student to our educational community and wish them a successful academic journey.
                    </p>
                  </div>

                  <div className="mt-24 flex justify-between px-8">
                    <div className="text-center">
                      <div className="w-48 border-t border-black mb-2"></div>
                      <p>Guardian's Signature</p>
                    </div>
                    <div className="text-center">
                      <div className="w-48 border-t border-black mb-2"></div>
                      <p>Principal's Signature</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground border-2 border-dashed rounded-lg print:hidden">
                  বাম পাশ থেকে একজন শিক্ষার্থী নির্বাচন করুন
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
