"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useSchoolStore, type Employee } from "@/lib/store"
import { Plus, Search, Edit, Trash2, UserCog, Mail, Phone, User } from "lucide-react"

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

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

  const resetForm = () => {
    setFormData({
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
      status: "active",
    })
    setEditingEmployee(null)
  }

  const handleSubmit = () => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData)
    } else {
      addEmployee(formData)
    }
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      nameEn: employee.nameEn,
      designation: employee.designation,
      department: employee.department,
      phone: employee.phone,
      email: employee.email,
      nid: employee.nid,
      dateOfBirth: employee.dateOfBirth,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      address: employee.address,
      photo: employee.photo,
      status: employee.status,
    })
    setIsAddOpen(true)
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm)
    const matchesDept = departmentFilter === "all" || emp.department === departmentFilter
    return matchesSearch && matchesDept
  })

  const departments = [...new Set(employees.map((e) => e.department))]
  const teacherCount = employees.filter((e) => e.designation.includes("শিক্ষক")).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">কর্মচারী ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground">শিক্ষক ও কর্মচারীদের তথ্য পরিচালনা করুন</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                নতুন কর্মচারী
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEmployee ? "কর্মচারী তথ্য সম্পাদনা" : "নতুন কর্মচারী যুক্ত করুন"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>নাম (বাংলা) *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="কর্মচারীর নাম বাংলায়"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name (English) *</Label>
                  <Input
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Employee name in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>পদবী *</Label>
                  <Select
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
                  <Label>যোগদানের তারিখ</Label>
                  <Input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>বেতন (টাকা)</Label>
                  <Input
                    type="number"
                    value={formData.salary}
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
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSubmit}>
                  {editingEmployee ? "আপডেট করুন" : "যুক্ত করুন"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{employees.length}</p>
                  <p className="text-sm text-muted-foreground">মোট কর্মচারী</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{teacherCount}</p>
                  <p className="text-sm text-muted-foreground">শিক্ষক</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{employees.length - teacherCount}</p>
                  <p className="text-sm text-muted-foreground">অন্যান্য</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{employees.filter((e) => e.status === "active").length}</p>
                  <p className="text-sm text-muted-foreground">সক্রিয়</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="বিভাগ ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সকল বিভাগ</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <Card key={emp.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {emp.photo ? (
                        <img src={emp.photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{emp.name}</h3>
                      <p className="text-sm text-muted-foreground">{emp.designation}</p>
                    </div>
                  </div>
                  <Badge variant={emp.status === "active" ? "default" : "secondary"}>
                    {emp.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    বিভাগ: <span className="text-foreground">{emp.department}</span>
                  </p>
                  <p className="text-muted-foreground">
                    বেতন: <span className="text-foreground">৳{emp.salary.toLocaleString()}</span>
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {emp.phone}
                  </div>
                  {emp.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {emp.email}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(emp)}>
                    <Edit className="w-4 h-4 mr-2" />
                    সম্পাদনা
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredEmployees.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">কোনো কর্মচারী পাওয়া যায়নি</div>
        )}
      </div>
    </DashboardLayout>
  )
}
