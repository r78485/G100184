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
import { useSchoolStore } from "@/lib/store"
import { Plus, FileText, Check, X, Clock, Calendar } from "lucide-react"

export default function LeaveApplicationPage() {
  const { leaveApplications, students, employees, addLeaveApplication, updateLeaveStatus } = useSchoolStore()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  const [formData, setFormData] = useState({
    applicantId: "",
    applicantType: "student" as "student" | "employee",
    applicantName: "",
    startDate: "",
    endDate: "",
    reason: "",
  })

  const handleSubmit = () => {
    const applicant =
      formData.applicantType === "student"
        ? students.find((s) => s.id === formData.applicantId)
        : employees.find((e) => e.id === formData.applicantId)

    addLeaveApplication({
      applicantId: formData.applicantId,
      applicantType: formData.applicantType,
      applicantName: applicant?.name || "",
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
    })
    setIsAddOpen(false)
    setFormData({
      applicantId: "",
      applicantType: "student",
      applicantName: "",
      startDate: "",
      endDate: "",
      reason: "",
    })
  }

  const handleApprove = (id: string) => {
    updateLeaveStatus(id, "approved", "Admin")
  }

  const handleReject = (id: string) => {
    updateLeaveStatus(id, "rejected", "Admin")
  }

  const filteredApplications = leaveApplications.filter((app) => {
    if (statusFilter === "all") return true
    return app.status === statusFilter
  })

  const pendingCount = leaveApplications.filter((a) => a.status === "pending").length
  const approvedCount = leaveApplications.filter((a) => a.status === "approved").length
  const rejectedCount = leaveApplications.filter((a) => a.status === "rejected").length

  const statusLabels: Record<string, string> = {
    pending: "অপেক্ষমান",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
  }

  const statusVariants: Record<string, "default" | "secondary" | "destructive"> = {
    pending: "secondary",
    approved: "default",
    rejected: "destructive",
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ছুটির আবেদন</h1>
            <p className="text-muted-foreground">শিক্ষার্থী ও কর্মচারীদের ছুটির আবেদন পরিচালনা</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                নতুন আবেদন
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ছুটির আবেদন ফরম</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>আবেদনকারীর ধরন</Label>
                  <Select
                    value={formData.applicantType}
                    onValueChange={(v: "student" | "employee") =>
                      setFormData({ ...formData, applicantType: v, applicantId: "" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">শিক্ষার্থী</SelectItem>
                      <SelectItem value="employee">কর্মচারী</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>আবেদনকারী নির্বাচন করুন *</Label>
                  <Select
                    value={formData.applicantId}
                    onValueChange={(v) => setFormData({ ...formData, applicantId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.applicantType === "student"
                        ? students.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name} - {s.registrationNo}
                            </SelectItem>
                          ))
                        : employees.map((e) => (
                            <SelectItem key={e.id} value={e.id}>
                              {e.name} - {e.designation}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>শুরুর তারিখ *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>শেষ তারিখ *</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ছুটির কারণ *</Label>
                  <Textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="ছুটির কারণ বিস্তারিত লিখুন..."
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSubmit}>জমা দিন</Button>
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
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{leaveApplications.length}</p>
                  <p className="text-sm text-muted-foreground">মোট আবেদন</p>
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
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">অপেক্ষমান</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">অনুমোদিত</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rejectedCount}</p>
                  <p className="text-sm text-muted-foreground">প্রত্যাখ্যাত</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সকল আবেদন</SelectItem>
              <SelectItem value="pending">অপেক্ষমান</SelectItem>
              <SelectItem value="approved">অনুমোদিত</SelectItem>
              <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>আবেদনকারী</TableHead>
                  <TableHead>ধরন</TableHead>
                  <TableHead>শুরু</TableHead>
                  <TableHead>শেষ</TableHead>
                  <TableHead>কারণ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.applicantName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {app.applicantType === "student" ? "শিক্ষার্থী" : "কর্মচারী"}
                      </Badge>
                    </TableCell>
                    <TableCell>{app.startDate}</TableCell>
                    <TableCell>{app.endDate}</TableCell>
                    <TableCell className="max-w-xs truncate">{app.reason}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[app.status]}>{statusLabels[app.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {app.status === "pending" && (
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleApprove(app.id)}>
                            <Check className="w-4 h-4 mr-1" />
                            অনুমোদন
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive"
                            onClick={() => handleReject(app.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            প্রত্যাখ্যান
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredApplications.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">কোনো আবেদন পাওয়া যায়নি</div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
