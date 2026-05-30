"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { useSchoolStore } from "@/lib/store"
import { CalendarCheck, Check, X, UserCheck, UserX, Clock, Save, Download } from "lucide-react"

type AttendanceStatus = "present" | "absent" | "late" | "leave"

export default function AttendancePage() {
  const { students, classes, attendance, markAttendance } = useSchoolStore()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedClass, setSelectedClass] = useState("")
  const [localAttendance, setLocalAttendance] = useState<Record<string, AttendanceStatus>>({})
  const [remarks, setRemarks] = useState<Record<string, string>>({})

  const filteredStudents = students.filter((s) => {
    if (!selectedClass) return true
    return s.classId === selectedClass
  })

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setLocalAttendance((prev) => ({ ...prev, [studentId]: status }))
  }

  const setRemark = (studentId: string, remark: string) => {
    setRemarks((prev) => ({ ...prev, [studentId]: remark }))
  }

  const saveAttendance = () => {
    Object.entries(localAttendance).forEach(([studentId, status]) => {
      markAttendance({
        studentId,
        date: selectedDate,
        status,
        remarks: remarks[studentId] || "",
      })
    })
    alert("উপস্থিতি সফলভাবে সংরক্ষণ করা হয়েছে!")
  }

  const markAllPresent = () => {
    const newAttendance: Record<string, AttendanceStatus> = {}
    filteredStudents.forEach((s) => {
      newAttendance[s.id] = "present"
    })
    setLocalAttendance(newAttendance)
  }

  const presentCount = Object.values(localAttendance).filter((s) => s === "present").length
  const absentCount = Object.values(localAttendance).filter((s) => s === "absent").length
  const lateCount = Object.values(localAttendance).filter((s) => s === "late").length
  const leaveCount = Object.values(localAttendance).filter((s) => s === "leave").length

  const getClassName = (classId: string) => {
    const cls = classes.find((c) => c.id === classId)
    return cls ? `${cls.name} (${cls.section})` : "N/A"
  }

  // Get existing attendance for the selected date
  const existingAttendance = attendance.filter((a) => a.date === selectedDate)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">উপস্থিতি ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground">দৈনিক উপস্থিতি রেকর্ড করুন</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllPresent}>
              <Check className="w-4 h-4 mr-2" />
              সবাই উপস্থিত
            </Button>
            <Button onClick={saveAttendance}>
              <Save className="w-4 h-4 mr-2" />
              সংরক্ষণ করুন
            </Button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">তারিখ</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">শ্রেণি</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="শ্রেণি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল শ্রেণি</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name} ({cls.section})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{presentCount}</p>
                  <p className="text-sm text-muted-foreground">উপস্থিত</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <UserX className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{absentCount}</p>
                  <p className="text-sm text-muted-foreground">অনুপস্থিত</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{lateCount}</p>
                  <p className="text-sm text-muted-foreground">বিলম্বে</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{leaveCount}</p>
                  <p className="text-sm text-muted-foreground">ছুটিতে</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {filteredStudents.length - presentCount - absentCount - lateCount - leaveCount}
                  </p>
                  <p className="text-sm text-muted-foreground">বাকি</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">রোল</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>শ্রেণি</TableHead>
                  <TableHead className="text-center">উপস্থিতি</TableHead>
                  <TableHead>মন্তব্য</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono">{student.roll}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{getClassName(student.classId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant={localAttendance[student.id] === "present" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setStatus(student.id, "present")}
                          className="h-8 px-2"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={localAttendance[student.id] === "absent" ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => setStatus(student.id, "absent")}
                          className="h-8 px-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={localAttendance[student.id] === "late" ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setStatus(student.id, "late")}
                          className="h-8 px-2"
                        >
                          <Clock className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={localAttendance[student.id] === "leave" ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setStatus(student.id, "leave")}
                          className="h-8 px-2"
                        >
                          ছুটি
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="মন্তব্য..."
                        value={remarks[student.id] || ""}
                        onChange={(e) => setRemark(student.id, e.target.value)}
                        className="h-8"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                শ্রেণি নির্বাচন করুন অথবা শিক্ষার্থী যুক্ত করুন
              </div>
            )}
          </CardContent>
        </Card>

        {/* Existing Attendance Records */}
        {existingAttendance.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">আজকের সংরক্ষিত রেকর্ড ({existingAttendance.length})</h3>
              <div className="text-sm text-muted-foreground">
                এই তারিখে {existingAttendance.length} জন শিক্ষার্থীর উপস্থিতি রেকর্ড করা হয়েছে।
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
