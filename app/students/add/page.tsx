"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSchoolStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { UserPlus, Save, X } from "lucide-react"

export default function AddStudentPage() {
  const { classes, addStudent } = useSchoolStore()
  const router = useRouter()

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
    status: "active" as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addStudent(formData)
    router.push("/students")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">নতুন শিক্ষার্থী ভর্তি</h1>
            <p className="text-muted-foreground">প্রতিষ্ঠানে নতুন শিক্ষার্থীর তথ্য যুক্ত করুন</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>শিক্ষার্থীর ব্যক্তিগত তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>নাম (বাংলা) *</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="শিক্ষার্থীর নাম বাংলায়"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name (English) *</Label>
                  <Input
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Student name in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>পিতার নাম *</Label>
                  <Input
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="পিতার নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label>মাতার নাম *</Label>
                  <Input
                    required
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="মাতার নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label>অভিভাবকের মোবাইল *</Label>
                  <Input
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>জন্ম তারিখ *</Label>
                  <Input
                    type="date"
                    required
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
              </div>
            </CardContent>
            
            <CardHeader className="border-t">
              <CardTitle>একাডেমিক তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>শ্রেণি *</Label>
                  <Select
                    required
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
                    required
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
                <div className="space-y-2 col-span-2">
                  <Label>ছবি (URL)</Label>
                  <Input
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="ছবির URL দিন"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t pt-6">
              <Button type="button" variant="outline" onClick={() => router.push("/students")}>
                <X className="w-4 h-4 mr-2" />
                বাতিল
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                সংরক্ষণ করুন
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
