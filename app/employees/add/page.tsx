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

export default function AddEmployeePage() {
  const { addEmployee } = useSchoolStore()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    designation: "",
    department: "",
    phone: "",
    email: "",
    nid: "",
    dateOfBirth: "",
    joiningDate: new Date().toISOString().split("T")[0],
    salary: 0,
    address: "",
    photo: "",
    status: "active" as "active" | "inactive",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEmployee(formData)
    router.push("/employees")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">নতুন কর্মচারী যুক্ত করুন</h1>
            <p className="text-muted-foreground">প্রতিষ্ঠানে নতুন শিক্ষক বা কর্মচারীর তথ্য যুক্ত করুন</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>কর্মচারীর তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>নাম (বাংলা) *</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="কর্মচারীর নাম বাংলায়"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name (English) *</Label>
                  <Input
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Employee name in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>পদবী *</Label>
                  <Select
                    required
                    value={formData.designation}
                    onValueChange={(v) => setFormData({ ...formData, designation: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="পদবী নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="প্রধান শিক্ষক">প্রধান শিক্ষক</SelectItem>
                      <SelectItem value="সহকারী প্রধান শিক্ষক">সহকারী প্রধান শিক্ষক</SelectItem>
                      <SelectItem value="সহকারী শিক্ষক">সহকারী শিক্ষক</SelectItem>
                      <SelectItem value="অফিস সহকারী">অফিস সহকারী</SelectItem>
                      <SelectItem value="হিসাবরক্ষক">হিসাবরক্ষক</SelectItem>
                      <SelectItem value="পিয়ন">পিয়ন</SelectItem>
                      <SelectItem value="নিরাপত্তারক্ষী">নিরাপত্তারক্ষী</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>বিভাগ *</Label>
                  <Select
                    required
                    value={formData.department}
                    onValueChange={(v) => setFormData({ ...formData, department: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administration">প্রশাসন</SelectItem>
                      <SelectItem value="Science">বিজ্ঞান</SelectItem>
                      <SelectItem value="Arts">কলা</SelectItem>
                      <SelectItem value="Commerce">বাণিজ্য</SelectItem>
                      <SelectItem value="Mathematics">গণিত</SelectItem>
                      <SelectItem value="Bengali">বাংলা</SelectItem>
                      <SelectItem value="English">ইংরেজি</SelectItem>
                      <SelectItem value="Religion">ধর্ম</SelectItem>
                      <SelectItem value="ICT">তথ্য প্রযুক্তি</SelectItem>
                      <SelectItem value="Support Staff">সাপোর্ট স্টাফ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>মোবাইল নম্বর *</Label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ইমেইল</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>NID নম্বর</Label>
                  <Input
                    value={formData.nid}
                    onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                    placeholder="জাতীয় পরিচয়পত্র নম্বর"
                  />
                </div>
                <div className="space-y-2">
                  <Label>জন্ম তারিখ</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>যোগদানের তারিখ *</Label>
                  <Input
                    type="date"
                    required
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>বেতন (টাকা) *</Label>
                  <Input
                    type="number"
                    required
                    value={formData.salary || ""}
                    onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })}
                    placeholder="মাসিক বেতন"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>ঠিকানা</Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="সম্পূর্ণ ঠিকানা"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ছবি (URL)</Label>
                  <Input
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="ছবির URL"
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
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t pt-6">
              <Button type="button" variant="outline" onClick={() => router.push("/employees")}>
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
