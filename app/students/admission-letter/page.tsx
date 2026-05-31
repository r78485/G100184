"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Printer, Search, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSchoolStore } from "@/lib/store"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

function AdmissionLetterContent() {
  const { students, instituteProfile } = useSchoolStore()
  const searchParams = useSearchParams()
  const studentIdParam = searchParams.get('studentId')
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(studentIdParam || null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  useEffect(() => {
    if (studentIdParam) {
      setSelectedStudent(studentIdParam)
    }
  }, [studentIdParam])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.includes(searchTerm)
  )

  const student = students.find(s => s.id === selectedStudent)

  const handlePrint = () => {
    window.print()
  }

  const downloadPdf = async () => {
    const letterElement = document.getElementById('admission-letter-content')
    if (!letterElement) return

    setIsGeneratingPdf(true)
    try {
      const canvas = await html2canvas(letterElement, { 
        scale: 2,
        useCORS: true,
        logging: false
      })
      
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // A4 dimensions: 210 x 297 mm
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Admission_Letter_${student?.registrationNo || 'student'}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const DataField = ({ label, value, valueClass = "" }: { label: string, value: React.ReactNode, valueClass?: string }) => (
    <div className="flex flex-col">
      <span className="text-[10px] text-muted-foreground uppercase mb-0.5">{label}</span>
      <div className="flex items-center gap-1 text-sm font-medium">
        <span className="text-muted-foreground/50">↳</span>
        <span className={valueClass}>{value || "-"}</span>
      </div>
    </div>
  )

  const QrCodeBox = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center gap-1">
      <div className="border p-1 bg-white inline-block">
        <QrCode className="w-16 h-16" />
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ভর্তির ছাড়পত্র</h1>
            <p className="text-muted-foreground">শিক্ষার্থীর ভর্তির ছাড়পত্র প্রিন্ট করুন বা PDF ডাউনলোড করুন</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 print:hidden h-fit">
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
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
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
                    <p className="font-medium text-sm">{s.name}</p>
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

        <Card className="md:col-span-3 shadow-none md:shadow-sm">
          <CardHeader className="print:hidden flex flex-row items-center justify-between border-b">
            <CardTitle>ছাড়পত্র প্রিভিউ</CardTitle>
            <div className="flex gap-2">
              {student && (
                <>
                  <Button variant="outline" onClick={downloadPdf} disabled={isGeneratingPdf}>
                    {isGeneratingPdf ? "ডাউনলোড হচ্ছে..." : "PDF ডাউনলোড"}
                  </Button>
                  <Button onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    প্রিন্ট করুন (A4)
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto bg-slate-100 print:bg-transparent flex justify-center">
            {student ? (
              <div className="py-8 print:py-0 w-full max-w-[210mm]">
                <div 
                  id="admission-letter-content"
                  className="bg-white mx-auto print:mx-0"
                  style={{ 
                    width: "210mm", 
                    minHeight: "297mm", 
                    padding: "20mm 15mm",
                    boxSizing: "border-box",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                  }}
                >
                  <style>
                    {\`
                      @media print {
                        @page { size: A4; margin: 0; }
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        #admission-letter-content { box-shadow: none !important; }
                      }
                    \`}
                  </style>

                  {/* Header */}
                  <div className="text-center mb-6">
                    {instituteProfile?.logo && (
                      <img src={instituteProfile.logo} alt="Logo" className="h-20 mx-auto mb-2 object-contain" />
                    )}
                    <h1 className="text-2xl font-bold mb-1 leading-tight">{instituteProfile?.name || "গাজীমাহমুদ নিম্ন-মাধ্যমিক বিদ্যালয়"}</h1>
                    <p className="text-[11px] text-muted-foreground mb-1">
                      স্থাপিত-{instituteProfile?.establishedYear || "১৯৮৩"} খ্রিঃ, EIIN-{instituteProfile?.eiin || "100184"}, E-mail:{instituteProfile?.email || "school100184@gmail.com"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {instituteProfile?.phone || "01309100184"} | Bangladesh | www.gjhs.net
                    </p>
                    <h2 className="text-2xl font-bold text-indigo-700 uppercase tracking-widest mt-4">Admission Letter</h2>
                  </div>

                  <hr className="border-t border-slate-200 mb-6" />

                  {/* Top Section */}
                  <div className="flex gap-8 mb-6">
                    {/* Photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-slate-50 flex-shrink-0 flex items-center justify-center">
                      {student.photo ? (
                        <img src={student.photo} alt="Student" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-400 text-xs">Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Basic Info Grid */}
                    <div className="flex-1 grid grid-cols-3 gap-y-4 gap-x-2">
                      <DataField label="Serial No" value={student.id.slice(0, 7)} />
                      <DataField label="Date Of Birth" value={new Date(student.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} />
                      <DataField label="Date of Admission" value={new Date(student.admissionDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} />
                      
                      <DataField label="Registration No" value={student.registrationNo} valueClass="text-indigo-600 font-bold" />
                      <DataField label="Student Birth Form ID / NIC" value={student.nidOrBirthCert} />
                      <DataField label="Discount In Fee" value="0 %" />
                      
                      <DataField label="Student Name" value={student.nameEn || student.name} valueClass="font-bold uppercase" />
                      <DataField label="Gender" value={student.gender} />
                      <DataField label="Username" value={student.registrationNo?.toLowerCase() || "-"} />
                      
                      <DataField label="Class" value={student.classId} />
                      <DataField label="Religion" value={student.religion} />
                      <DataField label="Password" value={"***"} />
                    </div>
                  </div>

                  <hr className="border-t border-slate-200 mb-6" />

                  {/* Main Details Section */}
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-4 space-y-4">
                      <DataField label="Address" value={student.address} />
                      <div className="pt-2"></div>
                      <DataField label="Any Identification Mark?" value="-" />
                      <DataField label="Blood Group" value={student.bloodGroup} />
                      <DataField label="Disease If Any?" value="No" />
                      <DataField label="Cast" value="-" />
                      <DataField label="Orphan Student" value="No" valueClass="font-bold" />
                      <DataField label="OSC" value="No" valueClass="font-bold" />
                      <DataField label="Previous School" value={student.previousSchool} valueClass="font-bold" />
                      <DataField label="Previous ID / Board Roll No" value="-" />
                      <DataField label="Any Additional Note" value="-" />
                    </div>

                    {/* Middle Column */}
                    <div className="col-span-5 grid grid-cols-2 gap-x-4 gap-y-4">
                      <div className="col-span-1 space-y-4 border-r pr-4">
                        <DataField label="Father Name" value={student.fatherName} valueClass="font-bold uppercase" />
                        <DataField label="Father National ID" value="-" valueClass="font-bold" />
                        <DataField label="Education" value="-" valueClass="font-bold" />
                        <DataField label="Mobile No" value={student.guardianPhone} />
                        <DataField label="Occupation" value="-" valueClass="font-bold uppercase" />
                        <DataField label="Profession" value="-" valueClass="font-bold uppercase" />
                        <DataField label="Income" value="-" valueClass="font-bold" />
                      </div>
                      <div className="col-span-1 space-y-4">
                        <DataField label="Mother Name" value={student.motherName} valueClass="font-bold uppercase" />
                        <DataField label="Mother National ID" value="-" valueClass="font-bold" />
                        <DataField label="Education" value="-" valueClass="font-bold" />
                        <DataField label="Mobile No" value="-" />
                        <DataField label="Occupation" value="HOUSEWIFE" valueClass="font-bold uppercase" />
                        <DataField label="Profession" value="-" />
                        <DataField label="Income" value="-" />
                      </div>
                      <div className="col-span-1 border-t pt-4">
                        <DataField label="Total Siblings" value="0" valueClass="font-bold" />
                      </div>
                      <div className="col-span-1 border-t pt-4">
                        <DataField label="Family" value="-" />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-3 border-l pl-6 flex flex-col items-center">
                      <div className="text-center mb-4">
                        <h3 className="font-bold text-sm tracking-tight">SCAN QR CODE</h3>
                        <p className="text-[10px] text-muted-foreground uppercase">TO ACCESS PORTAL</p>
                      </div>
                      <div className="space-y-6">
                        <QrCodeBox label="Web Portal" />
                        <QrCodeBox label="Android App" />
                        <QrCodeBox label="iOS App" />
                      </div>
                    </div>
                  </div>

                  {/* Rules and Regulations */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-700">Rules And Regulations:</h3>
                    <div className="text-center text-sm font-medium mb-2">School Management Rules and Regulations:</div>
                    <div className="text-center text-xs text-muted-foreground">1. Admission Policies</div>
                  </div>

                  {/* Footer */}
                  <div className="mt-20">
                    <div className="text-center mb-16">
                      <p className="text-muted-foreground text-sm mb-1">Publisher:</p>
                      <p className="font-bold text-lg">School Authority</p>
                      <p className="text-muted-foreground mt-2">Date: _ _ _ _ _ _ _ _ _</p>
                    </div>
                    
                    <div className="flex justify-between items-end px-8">
                      <div className="w-64 border-t border-slate-400 pt-2 text-xs text-muted-foreground">
                        Signature of Authority
                      </div>
                      <div className="w-64 border-t border-slate-400 pt-2 text-xs text-muted-foreground text-right">
                        Institute Stamp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground w-full">
                বাম পাশ থেকে একজন শিক্ষার্থী নির্বাচন করুন
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdmissionLetterPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AdmissionLetterContent />
      </Suspense>
    </DashboardLayout>
  )
}

