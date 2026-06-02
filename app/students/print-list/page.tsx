"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSchoolStore } from "@/lib/store"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PrintBasicListPage() {
  const { students, classes, instituteProfile } = useSchoolStore()
  const [selectedClass, setSelectedClass] = useState<string>("all")

  const filteredStudents = students.filter(
    (s) => selectedClass === "all" || s.classId === selectedClass
  )

  const handlePrint = () => {
    window.print()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 print:hidden">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Printer className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">বেসিক লিস্ট প্রিন্ট</h1>
            <p className="text-muted-foreground">শিক্ষার্থীদের প্রাথমিক তথ্যের তালিকা প্রিন্ট করুন</p>
          </div>
        </div>

        <Card className="print:shadow-none print:border-none">
          <CardHeader className="print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>শিক্ষার্থীর তালিকা</CardTitle>
                <CardDescription>প্রিন্ট করার জন্য শ্রেণি নির্বাচন করুন</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
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
                <Button onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  প্রিন্ট
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="print:p-0">
            {/* Print Header */}
            <div className="hidden print:block text-center mb-6">
              <h1 className="text-2xl font-bold">{instituteProfile?.name || "EduManage School"}</h1>
              <p>শিক্ষার্থীর তালিকা</p>
              <p className="text-sm mt-1">
                শ্রেণি: {selectedClass === "all" ? "সকল শ্রেণি" : classes.find(c => c.id === selectedClass)?.name}
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table className="print:border text-[12px] print:text-[14px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">ক্রমিক</TableHead>
                    <TableHead>ছবি</TableHead>
                    <TableHead>নাম ও জন্ম তারিখ</TableHead>
                    <TableHead>পিতা, NID ও জন্ম তারিখ</TableHead>
                    <TableHead>মাতা, NID ও জন্ম তারিখ</TableHead>
                    <TableHead>জন্ম নিবন্ধন</TableHead>
                    {selectedClass === "all" && <TableHead>শ্রেণি</TableHead>}
                    <TableHead>রোল</TableHead>
                    <TableHead>মোবাইল</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {student.photo ? (
                          <img src={student.photo} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500">N/A</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-muted-foreground">DOB: {student.dateOfBirth}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student.fatherName}</p>
                        <p className="text-muted-foreground">NID: {student.fatherNid || 'N/A'}</p>
                        <p className="text-muted-foreground">DOB: {student.fatherDob || 'N/A'}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student.motherName}</p>
                        <p className="text-muted-foreground">NID: {student.motherNid || 'N/A'}</p>
                        <p className="text-muted-foreground">DOB: {student.motherDob || 'N/A'}</p>
                      </TableCell>
                      <TableCell>{student.nidOrBirthCert}</TableCell>
                      {selectedClass === "all" && <TableCell>{student.classId}</TableCell>}
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>
                        <p>পিতা: {student.guardianPhone || 'N/A'}</p>
                        <p>মাতা: {student.motherPhone || 'N/A'}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                কোনো শিক্ষার্থী পাওয়া যায়নি
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
