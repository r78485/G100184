"use client"

import { useState, useRef } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSchoolStore } from "@/lib/store"
import { Award, Download, FileText, User } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

type CertificateType = "character" | "transfer" | "testimonial"

export default function CertificatePage() {
  const { students, classes } = useSchoolStore()
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [certificateType, setCertificateType] = useState<CertificateType>("character")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const student = students.find((s) => s.id === selectedStudent)
  const studentClass = classes.find((c) => c.id === student?.classId)

  const openPreview = (studentId: string, type: CertificateType) => {
    setSelectedStudent(studentId)
    setCertificateType(type)
    setIsPreviewOpen(true)
  }

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210)
      pdf.save(`Certificate_${student?.registrationNo}_${certificateType}.pdf`)
    }
  }

  const certificateLabels: Record<CertificateType, string> = {
    character: "চারিত্রিক সনদপত্র",
    transfer: "ছাড়পত্র / TC",
    testimonial: "প্রশংসাপত্র",
  }

  const getClassName = (classId: string) => {
    const cls = classes.find((c) => c.id === classId)
    return cls ? `${cls.name} (${cls.section})` : "N/A"
  }

  const currentDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">সার্টিফিকেট জেনারেটর</h1>
            <p className="text-muted-foreground">চারিত্রিক সনদ, ছাড়পত্র ও প্রশংসাপত্র তৈরি করুন</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-sm text-muted-foreground">শিক্ষার্থী</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-lg font-bold">চারিত্রিক সনদ</p>
                  <p className="text-sm text-muted-foreground">Character Certificate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-lg font-bold">ছাড়পত্র</p>
                  <p className="text-sm text-muted-foreground">Transfer Certificate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>শিক্ষার্থী তালিকা</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>রেজিঃ নং</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>শ্রেণি</TableHead>
                  <TableHead>রোল</TableHead>
                  <TableHead className="text-right">সার্টিফিকেট</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono">{student.registrationNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{getClassName(student.classId)}</TableCell>
                    <TableCell>{student.roll}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPreview(student.id, "character")}
                        >
                          চারিত্রিক সনদ
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPreview(student.id, "transfer")}
                        >
                          ছাড়পত্র
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPreview(student.id, "testimonial")}
                        >
                          প্রশংসাপত্র
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {students.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                কোনো শিক্ষার্থী পাওয়া যায়নি
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certificate Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{certificateLabels[certificateType]} প্রিভিউ</DialogTitle>
            </DialogHeader>
            {student && (
              <div className="space-y-4">
                <div
                  ref={certificateRef}
                  className="bg-white text-black p-8 border-8 border-double border-amber-700"
                  style={{ width: "100%", minHeight: "500px" }}
                >
                  {/* Certificate Header */}
                  <div className="text-center border-b-2 border-amber-700 pb-4 mb-6">
                    <p className="text-sm">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
                    <p className="text-xs text-gray-600">মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর</p>
                    <h1 className="text-2xl font-bold mt-2">আংগারজুর উচ্চ বিদ্যালয়</h1>
                    <p className="text-sm">ডাকঘর: নিশানবাড়িয়া, বরগুনা সদর, বরগুনা</p>
                    <p className="text-sm">EIIN: 100184 | স্থাপিত: ১৯৮৩</p>
                  </div>

                  {/* Certificate Title */}
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold border-b-2 border-amber-700 inline-block px-8 pb-2">
                      {certificateLabels[certificateType]}
                    </h2>
                    <p className="text-sm mt-2">{certificateType === "character" ? "Character Certificate" : certificateType === "transfer" ? "Transfer Certificate" : "Testimonial"}</p>
                  </div>

                  {/* Certificate Body */}
                  <div className="space-y-4 text-justify leading-8">
                    {certificateType === "character" && (
                      <p>
                        এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <strong>{student.name}</strong> ({student.nameEn}),
                        পিতা: <strong>{student.fatherName}</strong>, মাতা: <strong>{student.motherName}</strong>,
                        গ্রাম/মহল্লা: {student.address}, এই বিদ্যালয়ের{" "}
                        <strong>{studentClass?.name} ({studentClass?.section})</strong> শ্রেণির রোল নং{" "}
                        <strong>{student.roll}</strong>, রেজিস্ট্রেশন নং: <strong>{student.registrationNo}</strong> একজন
                        নিয়মিত ছাত্র/ছাত্রী। সে এই বিদ্যালয়ে অধ্যয়নকালে সৎ, চরিত্রবান ও মেধাবী ছাত্র/ছাত্রী হিসেবে
                        পরিচিত ছিল। তার চরিত্র ও আচরণ সন্তোষজনক ছিল। আমি তার সর্বাঙ্গীন কল্যাণ কামনা করি।
                      </p>
                    )}

                    {certificateType === "transfer" && (
                      <p>
                        এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <strong>{student.name}</strong> ({student.nameEn}),
                        পিতা: <strong>{student.fatherName}</strong>, মাতা: <strong>{student.motherName}</strong>,
                        গ্রাম/মহল্লা: {student.address}, এই বিদ্যালয়ের{" "}
                        <strong>{studentClass?.name} ({studentClass?.section})</strong> শ্রেণিতে রোল নং{" "}
                        <strong>{student.roll}</strong>, রেজিস্ট্রেশন নং: <strong>{student.registrationNo}</strong>
                        হিসাবে অধ্যয়নরত ছিল। সে স্বীয় আবেদনক্রমে এই প্রতিষ্ঠান থেকে ছাড়পত্র গ্রহণ করছে। তার বিদ্যালয়ে
                        কোনো পাওনা নেই এবং তার বিরুদ্ধে কোনো শৃঙ্খলাজনিত অভিযোগ নেই। আমি তার উজ্জ্বল ভবিষ্যৎ কামনা করি।
                      </p>
                    )}

                    {certificateType === "testimonial" && (
                      <p>
                        এই মর্মে সানন্দে জানানো যাইতেছে যে, <strong>{student.name}</strong> ({student.nameEn}),
                        পিতা: <strong>{student.fatherName}</strong>, মাতা: <strong>{student.motherName}</strong>,
                        এই বিদ্যালয়ের <strong>{studentClass?.name} ({studentClass?.section})</strong> শ্রেণিতে রোল নং{" "}
                        <strong>{student.roll}</strong> একজন মেধাবী ও পরিশ্রমী ছাত্র/ছাত্রী। পাঠ্য বিষয়ে তার দক্ষতা
                        ও আগ্রহ প্রশংসনীয়। সহপাঠ্য কার্যক্রমেও তার অংশগ্রহণ উল্লেখযোগ্য। সে ভবিষ্যতে যেকোনো ক্ষেত্রে
                        সফল হবে বলে আমি দৃঢ়ভাবে বিশ্বাস করি।
                      </p>
                    )}
                  </div>

                  {/* Certificate Footer */}
                  <div className="mt-12 flex justify-between items-end">
                    <div className="text-center">
                      <p className="text-sm">তারিখ: {currentDate}</p>
                    </div>
                    <div className="text-center">
                      <div className="border-t border-black pt-2 mt-8">
                        <p className="font-bold">প্রধান শিক্ষক</p>
                        <p className="text-sm">আংগারজুর উচ্চ বিদ্যালয়</p>
                        <p className="text-xs">নিশানবাড়িয়া, বরগুনা</p>
                      </div>
                    </div>
                  </div>

                  {/* Seal Area */}
                  <div className="absolute bottom-20 left-20 opacity-20">
                    <div className="w-24 h-24 border-4 border-amber-700 rounded-full flex items-center justify-center">
                      <span className="text-xs text-center">সিল</span>
                    </div>
                  </div>
                </div>

                <Button onClick={downloadCertificate} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  PDF ডাউনলোড করুন
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
