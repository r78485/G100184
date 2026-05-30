"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, ArrowRight } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

export default function PromoteStudentPage() {
  const { students, classes, updateStudent } = useSchoolStore()
  const [currentClass, setCurrentClass] = useState<string>("")
  const [targetClass, setTargetClass] = useState<string>("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const classStudents = students.filter(s => s.classId === currentClass)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(classStudents.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, id])
    } else {
      setSelectedStudents(prev => prev.filter(studentId => studentId !== id))
    }
  }

  const handlePromote = () => {
    if (!targetClass) {
      alert("উত্তীর্ণ করার জন্য একটি নতুন শ্রেণি নির্বাচন করুন।")
      return
    }

    selectedStudents.forEach(id => {
      updateStudent(id, { classId: targetClass })
    })

    alert(`${selectedStudents.length} জন শিক্ষার্থীকে সফলভাবে উত্তীর্ণ করা হয়েছে।`)
    setSelectedStudents([])
    setCurrentClass("")
    setTargetClass("")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">শিক্ষার্থী প্রমোশন</h1>
            <p className="text-muted-foreground">শিক্ষার্থীদের এক শ্রেণি থেকে পরবর্তী শ্রেণিতে উত্তীর্ণ করুন</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>প্রমোশন সেটিংস</CardTitle>
              <CardDescription>বর্তমান এবং পরবর্তী শ্রেণি নির্বাচন করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-end gap-6">
                <div className="flex-1 space-y-2 w-full">
                  <Label>বর্তমান শ্রেণি</Label>
                  <Select value={currentClass} onValueChange={(val) => { setCurrentClass(val); setSelectedStudents([]) }}>
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
                
                <div className="hidden md:flex mb-2">
                  <ArrowRight className="text-muted-foreground" />
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <Label>নতুন শ্রেণি (উত্তীর্ণ হওয়ার পর)</Label>
                  <Select value={targetClass} onValueChange={setTargetClass}>
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

                <Button 
                  onClick={handlePromote} 
                  disabled={selectedStudents.length === 0 || !targetClass}
                  className="w-full md:w-auto"
                >
                  প্রমোট করুন ({selectedStudents.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {currentClass && (
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>শিক্ষার্থীর তালিকা</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    মোট শিক্ষার্থী: {classStudents.length} জন
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectedStudents.length === classStudents.length && classStudents.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>রেজিঃ নং</TableHead>
                      <TableHead>নাম</TableHead>
                      <TableHead>রোল</TableHead>
                      <TableHead>বর্তমান শ্রেণি</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-mono">{student.registrationNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.roll}</TableCell>
                        <TableCell>{classes.find(c => c.id === student.classId)?.name || student.classId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {classStudents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    এই শ্রেণিতে কোনো শিক্ষার্থী নেই
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
