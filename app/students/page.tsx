"use client"

import { useState, useRef } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useSchoolStore, type Student } from "@/lib/store"
import { Plus, Search, Edit, Trash2, Eye, IdCard, Download, User, Users } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { IdCardFront, IdCardBack } from "@/components/id-card-template"

export default function StudentsPage() {
  const { students, classes, addStudent, updateStudent, deleteStudent } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isIdCardOpen, setIsIdCardOpen] = useState(false)
  const [isClassIdCardOpen, setIsClassIdCardOpen] = useState(false)
  const [selectedClassForId, setSelectedClassForId] = useState<string>("all")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const idCardRef = useRef<HTMLDivElement>(null)
  const classIdCardsRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    dateOfBirth: "",
    gender: "male",
    bloodGroup: "",
    religion: "Islam",
    nationality: "Bangladeshi",
    nidOrBirthCert: "",
    address: "",
    classId: "",
    section: "A",
    roll: 1,
    registrationNo: "",
    admissionDate: new Date().toISOString().split("T")[0],
    previousSchool: "",
    photo: "",
    status: "active" as "active" | "inactive",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      nameEn: "",
      fatherName: "",
      motherName: "",
      guardianPhone: "",
      dateOfBirth: "",
      gender: "male",
      bloodGroup: "",
      religion: "Islam",
      nationality: "Bangladeshi",
      nidOrBirthCert: "",
      address: "",
      classId: "",
      section: "A",
      roll: 1,
      registrationNo: "",
      admissionDate: new Date().toISOString().split("T")[0],
      previousSchool: "",
      photo: "",
      status: "active",
    })
    setEditingStudent(null)
  }

  const handleSubmit = () => {
    if (editingStudent) {
      updateStudent(editingStudent.id, formData)
    } else {
      addStudent(formData)
    }
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      nameEn: student.nameEn,
      fatherName: student.fatherName,
      motherName: student.motherName,
      guardianPhone: student.guardianPhone,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      religion: student.religion,
      nationality: student.nationality,
      nidOrBirthCert: student.nidOrBirthCert,
      address: student.address,
      classId: student.classId,
      section: student.section,
      roll: student.roll,
      registrationNo: student.registrationNo,
      admissionDate: student.admissionDate,
      previousSchool: student.previousSchool,
      photo: student.photo,
      status: student.status,
    })
    setIsAddOpen(true)
  }

  const handleView = (student: Student) => {
    setViewingStudent(student)
    setIsViewOpen(true)
  }

  const handleIdCard = (student: Student) => {
    setViewingStudent(student)
    setIsIdCardOpen(true)
  }

  const downloadIdCard = async () => {
    if (idCardRef.current) {
      const canvas = await html2canvas(idCardRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [54, 86],
      })
      pdf.addImage(imgData, "PNG", 0, 0, 54, 86)
      pdf.save(`ID_Card_${viewingStudent?.registrationNo}.pdf`)
    }
  }

  const downloadClassIdCards = async () => {
    if (!classIdCardsRef.current) return
    
    setIsGeneratingPdf(true)
    try {
      const pages = classIdCardsRef.current.querySelectorAll('.a4-page')
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
        // A4 size is 210 x 297 mm
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297)
      }

      const className = classes.find(c => c.id === selectedClassForId)?.name || 'All_Classes'
      pdf.save(`Class_${className}_ID_Cards.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const classStudentsForId = students.filter(
    (s) => selectedClassForId === "all" || s.classId === selectedClassForId
  )

  // Calculate A4 pages (9 cards per page: 3 columns x 3 rows)
  const cardsPerPage = 9
  const pageCount = Math.ceil(classStudentsForId.length / cardsPerPage)
  const a4Pages = Array.from({ length: pageCount }, (_, i) => 
    classStudentsForId.slice(i * cardsPerPage, (i + 1) * cardsPerPage)
  )

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.includes(searchTerm)
    const matchesClass = classFilter === "all" || student.classId === classFilter
    return matchesSearch && matchesClass
  })

  const getClassName = (classId: string) => {
    const cls = classes.find((c) => c.id === classId)
    return cls ? `${cls.name} (${cls.section})` : "N/A"
  }

  const maleCount = students.filter(s => s.gender === 'male').length
  const femaleCount = students.filter(s => s.gender === 'female').length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">শিক্ষার্থী ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground">সকল শিক্ষার্থীর তথ্য পরিচালনা করুন</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsClassIdCardOpen(true)} className="flex items-center gap-2">
              <IdCard className="h-4 w-4" />
              শ্রেণিভিত্তিক আইডি কার্ড
            </Button>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  নতুন শিক্ষার্থী ভর্তি
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingStudent ? "শিক্ষার্থী তথ্য সম্পাদনা" : "নতুন শিক্ষার্থী ভর্তি ফরম"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>নাম (বাংলা) *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="শিক্ষার্থীর নাম বাংলায়"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name (English) *</Label>
                  <Input
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Student name in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>পিতার নাম *</Label>
                  <Input
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="পিতার নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label>মাতার নাম *</Label>
                  <Input
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="মাতার নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label>অভিভাবকের মোবাইল *</Label>
                  <Input
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>জন্ম তারিখ *</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>লিঙ্গ</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(v) => setFormData({ ...formData, gender: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">পুরুষ</SelectItem>
                      <SelectItem value="female">মহিলা</SelectItem>
                      <SelectItem value="other">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>রক্তের গ্রুপ</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(v) => setFormData({ ...formData, bloodGroup: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>ধর্ম</Label>
                  <Select
                    value={formData.religion}
                    onValueChange={(v) => setFormData({ ...formData, religion: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Islam">ইসলাম</SelectItem>
                      <SelectItem value="Hindu">হিন্দু</SelectItem>
                      <SelectItem value="Christian">খ্রিস্টান</SelectItem>
                      <SelectItem value="Buddhist">বৌদ্ধ</SelectItem>
                      <SelectItem value="Other">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>জন্ম নিবন্ধন / NID নং</Label>
                  <Input
                    value={formData.nidOrBirthCert}
                    onChange={(e) => setFormData({ ...formData, nidOrBirthCert: e.target.value })}
                    placeholder="জন্ম নিবন্ধন নম্বর"
                  />
                </div>
                <div className="space-y-2">
                  <Label>শ্রেণি *</Label>
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
                  <Label>সেকশন</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(v) => setFormData({ ...formData, section: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>রোল নম্বর *</Label>
                  <Input
                    type="number"
                    value={formData.roll}
                    onChange={(e) => setFormData({ ...formData, roll: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>রেজিস্ট্রেশন নম্বর</Label>
                  <Input
                    value={formData.registrationNo}
                    onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                    placeholder="2024XXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ভর্তির তারিখ</Label>
                  <Input
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>পূর্ববর্তী স্কুল</Label>
                  <Input
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="পূর্ববর্তী শিক্ষা প্রতিষ্ঠান"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>ঠিকানা</Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ছবি (URL)</Label>
                  <Input
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="ছবির URL দিন"
                  />
                </div>
                <div className="space-y-2">
                  <Label>স্ট্যাটাস</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v: "active" | "inactive") => setFormData({ ...formData, status: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">সক্রিয়</SelectItem>
                      <SelectItem value="inactive">নিষ্ক্রিয়</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSubmit}>
                  {editingStudent ? "আপডেট করুন" : "ভর্তি করুন"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-sm text-muted-foreground">মোট শিক্ষার্থী</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{maleCount}</p>
                  <p className="text-sm text-muted-foreground">ছাত্র</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{femaleCount}</p>
                  <p className="text-sm text-muted-foreground">ছাত্রী</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">সক্রিয়</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="নাম বা রেজিস্ট্রেশন নম্বর দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="শ্রেণি ফিল্টার" />
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
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>রেজিঃ নং</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>শ্রেণি</TableHead>
                  <TableHead>রোল</TableHead>
                  <TableHead>অভিভাবক ফোন</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium font-mono">{student.registrationNo}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.nameEn}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getClassName(student.classId)}</TableCell>
                    <TableCell>{student.roll}</TableCell>
                    <TableCell>{student.guardianPhone}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>
                        {student.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleView(student)} title="বিস্তারিত">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleIdCard(student)} title="আইডি কার্ড">
                          <IdCard className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(student)} title="সম্পাদনা">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteStudent(student.id)}
                          title="মুছুন"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                কোনো শিক্ষার্থী পাওয়া যায়নি
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Student Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>শিক্ষার্থীর বিস্তারিত তথ্য</DialogTitle>
            </DialogHeader>
            {viewingStudent && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="col-span-2 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                    {viewingStudent.photo ? (
                      <img src={viewingStudent.photo} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">নাম (বাংলা)</Label>
                  <p className="font-medium">{viewingStudent.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Name (English)</Label>
                  <p className="font-medium">{viewingStudent.nameEn}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">পিতার নাম</Label>
                  <p className="font-medium">{viewingStudent.fatherName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">মাতার নাম</Label>
                  <p className="font-medium">{viewingStudent.motherName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">শ্রেণি</Label>
                  <p className="font-medium">{getClassName(viewingStudent.classId)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">রোল</Label>
                  <p className="font-medium">{viewingStudent.roll}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">রেজিস্ট্রেশন নম্বর</Label>
                  <p className="font-medium">{viewingStudent.registrationNo}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">অভিভাবকের ফোন</Label>
                  <p className="font-medium">{viewingStudent.guardianPhone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">জন্ম তারিখ</Label>
                  <p className="font-medium">{viewingStudent.dateOfBirth}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">রক্তের গ্রুপ</Label>
                  <p className="font-medium">{viewingStudent.bloodGroup || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground text-xs">ঠিকানা</Label>
                  <p className="font-medium">{viewingStudent.address}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* ID Card Dialog */}
        <Dialog open={isIdCardOpen} onOpenChange={setIsIdCardOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>আইডি কার্ড</DialogTitle>
            </DialogHeader>
            {viewingStudent && (
              <div className="space-y-4">
                <div
                  ref={idCardRef}
                  className="mx-auto"
                  style={{ width: "216px" }}
                >
                  <IdCardFront student={viewingStudent} variant={viewingStudent.gender === 'female' ? 'red' : 'blue'} />
                </div>
                <Button onClick={downloadIdCard} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  PDF ডাউনলোড করুন
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Class ID Cards Dialog */}
        <Dialog open={isClassIdCardOpen} onOpenChange={setIsClassIdCardOpen}>
          <DialogContent className="max-w-[90vw] w-[850px] max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>শ্রেণিভিত্তিক আইডি কার্ড তৈরি</DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center gap-4 py-4 border-b">
              <div className="flex-1">
                <Label>শ্রেণি নির্বাচন করুন</Label>
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
              <div className="flex items-end pb-0.5">
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

            <div className="flex-1 overflow-y-auto py-4 bg-slate-100 rounded-md">
              {classStudentsForId.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  এই শ্রেণিতে কোনো শিক্ষার্থী নেই
                </div>
              ) : (
                <div className="flex flex-col items-center gap-8 pb-8" ref={classIdCardsRef}>
                  {a4Pages.map((pageStudents, pageIndex) => (
                    <div key={`page-${pageIndex}`} className="flex flex-col gap-8">
                      {/* Fronts Page */}
                      <div 
                        className="a4-page bg-white shadow-md mx-auto relative p-[10mm]"
                        style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
                      >
                        <div className="absolute top-2 left-0 w-full text-center text-[10px] text-slate-400">Page {pageIndex * 2 + 1} - Fronts</div>
                        <div className="grid grid-cols-3 gap-[5mm] place-items-center h-full content-start pt-4">
                          {pageStudents.map(student => (
                            <IdCardFront key={`front-${student.id}`} student={student} variant={student.gender === 'female' ? 'red' : 'blue'} />
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
                          {/* We reverse the row order (using rtl and compensating) so fronts and backs align perfectly when printed double-sided */}
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
            </div>
            
            <div className="text-xs text-muted-foreground pt-2">
              * নোট: PDF জেনারেট হতে কিছু সময় লাগতে পারে। 
              <br />* ব্যাক পেজগুলো এমনভাবে সাজানো হয়েছে যাতে ডাবল-সাইডেড প্রিন্ট করলে সামনের কার্ডের ঠিক পেছনেই সঠিক ব্যাক পেজ থাকে।
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
