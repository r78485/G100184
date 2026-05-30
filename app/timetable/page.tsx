"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useSchoolStore } from "@/lib/store"
import { Plus, Calendar, Clock, Edit, Trash2 } from "lucide-react"

const days = ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার"]
const periods = [1, 2, 3, 4, 5, 6, 7, 8]

const defaultTimes = [
  { start: "09:00", end: "09:45" },
  { start: "09:45", end: "10:30" },
  { start: "10:30", end: "11:15" },
  { start: "11:30", end: "12:15" },
  { start: "12:15", end: "13:00" },
  { start: "13:00", end: "13:45" },
  { start: "14:00", end: "14:45" },
  { start: "14:45", end: "15:30" },
]

export default function TimetablePage() {
  const { classes, subjects, employees, timetable, addTimetableSlot, updateTimetableSlot, deleteTimetableSlot } =
    useSchoolStore()
  const [selectedClass, setSelectedClass] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingSlot, setEditingSlot] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    classId: "",
    day: "",
    period: 1,
    startTime: "09:00",
    endTime: "09:45",
    subjectId: "",
    teacherId: "",
  })

  const resetForm = () => {
    setFormData({
      classId: selectedClass,
      day: "",
      period: 1,
      startTime: "09:00",
      endTime: "09:45",
      subjectId: "",
      teacherId: "",
    })
    setEditingSlot(null)
  }

  const handleSubmit = () => {
    if (editingSlot) {
      updateTimetableSlot(editingSlot, formData)
    } else {
      addTimetableSlot(formData)
    }
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = (slotId: string) => {
    const slot = timetable.find((t) => t.id === slotId)
    if (slot) {
      setFormData({
        classId: slot.classId,
        day: slot.day,
        period: slot.period,
        startTime: slot.startTime,
        endTime: slot.endTime,
        subjectId: slot.subjectId,
        teacherId: slot.teacherId,
      })
      setEditingSlot(slotId)
      setIsAddOpen(true)
    }
  }

  const handlePeriodChange = (period: number) => {
    const time = defaultTimes[period - 1] || defaultTimes[0]
    setFormData({ ...formData, period, startTime: time.start, endTime: time.end })
  }

  const getSlot = (day: string, period: number) => {
    return timetable.find((t) => t.classId === selectedClass && t.day === day && t.period === period)
  }

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId)
    return subject?.name || "N/A"
  }

  const getTeacherName = (teacherId: string) => {
    const teacher = employees.find((e) => e.id === teacherId)
    return teacher?.name || "N/A"
  }

  const getClassName = (classId: string) => {
    const cls = classes.find((c) => c.id === classId)
    return cls ? `${cls.name} (${cls.section})` : "N/A"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ক্লাস রুটিন</h1>
            <p className="text-muted-foreground">শ্রেণি ভিত্তিক সময়সূচী পরিচালনা করুন</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} disabled={!selectedClass}>
                <Plus className="mr-2 h-4 w-4" />
                নতুন স্লট যুক্ত করুন
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSlot ? "স্লট সম্পাদনা" : "নতুন স্লট যুক্ত করুন"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>শ্রেণি</Label>
                  <Select
                    value={formData.classId}
                    onValueChange={(v) => setFormData({ ...formData, classId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="শ্রেণি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} ({cls.section})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>দিন</Label>
                  <Select
                    value={formData.day}
                    onValueChange={(v) => setFormData({ ...formData, day: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="দিন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>পিরিয়ড</Label>
                  <Select
                    value={formData.period.toString()}
                    onValueChange={(v) => handlePeriodChange(parseInt(v))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((p) => (
                        <SelectItem key={p} value={p.toString()}>
                          পিরিয়ড {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>শুরুর সময়</Label>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>শেষের সময়</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>বিষয়</Label>
                  <Select
                    value={formData.subjectId}
                    onValueChange={(v) => setFormData({ ...formData, subjectId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>শিক্ষক</Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(v) => setFormData({ ...formData, teacherId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="শিক্ষক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees
                        .filter((e) => e.designation.includes("শিক্ষক"))
                        .map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name} - {teacher.designation}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSubmit}>{editingSlot ? "আপডেট করুন" : "যুক্ত করুন"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Class Selection */}
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">শ্রেণি নির্বাচন করুন</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="শ্রেণি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name} ({cls.section})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Timetable Grid */}
        {selectedClass ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {getClassName(selectedClass)} - সাপ্তাহিক রুটিন
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-border p-3 bg-secondary text-left">দিন/পিরিয়ড</th>
                    {periods.map((p) => (
                      <th key={p} className="border border-border p-3 bg-secondary text-center min-w-[140px]">
                        <div>পিরিয়ড {p}</div>
                        <div className="text-xs text-muted-foreground font-normal">
                          {defaultTimes[p - 1]?.start} - {defaultTimes[p - 1]?.end}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td className="border border-border p-3 font-medium bg-secondary/50">{day}</td>
                      {periods.map((p) => {
                        const slot = getSlot(day, p)
                        return (
                          <td key={p} className="border border-border p-2 text-center">
                            {slot ? (
                              <div className="bg-primary/10 rounded-lg p-2 space-y-1">
                                <div className="font-medium text-primary text-sm">
                                  {getSubjectName(slot.subjectId)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {slot.startTime} - {slot.endTime}
                                </div>
                                <div className="text-xs font-medium">{getTeacherName(slot.teacherId)}</div>
                                <div className="flex justify-center gap-1 mt-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleEdit(slot.id)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive"
                                    onClick={() => deleteTimetableSlot(slot.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    classId: selectedClass,
                                    day,
                                    period: p,
                                    startTime: defaultTimes[p - 1]?.start || "09:00",
                                    endTime: defaultTimes[p - 1]?.end || "09:45",
                                  })
                                  setIsAddOpen(true)
                                }}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>রুটিন দেখতে উপরে থেকে একটি শ্রেণি নির্বাচন করুন</p>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">নির্দেশিকা:</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/10 rounded"></div>
                <span>ক্লাস নির্ধারিত</span>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>নতুন ক্লাস যুক্ত করুন</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>টিফিন: ১১:১৫ - ১১:৩০ | দুপুরের বিরতি: ১৩:৪৫ - ১৪:০০</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
