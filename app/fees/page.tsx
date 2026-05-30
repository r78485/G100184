"use client"

import { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import { useSchoolStore } from "@/lib/store"
import { Plus, Receipt, Search, Download, CreditCard, Banknote, Smartphone } from "lucide-react"

export default function FeesPage() {
  const { fees, students, classes, addFee, payFee } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isPayOpen, setIsPayOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    studentId: "",
    type: "tuition",
    amount: 0,
    dueDate: new Date().toISOString().split("T")[0],
  })

  const [paymentData, setPaymentData] = useState({
    amount: 0,
    method: "cash",
    transactionId: "",
  })

  const handleAddFee = () => {
    addFee({
      studentId: formData.studentId,
      type: formData.type,
      amount: formData.amount,
      dueDate: formData.dueDate,
      paidDate: null,
      status: "unpaid",
      paidAmount: 0,
      paymentMethod: "",
      transactionId: "",
    })
    setIsAddOpen(false)
    setFormData({ studentId: "", type: "tuition", amount: 0, dueDate: new Date().toISOString().split("T")[0] })
  }

  const handlePayment = () => {
    if (selectedFee) {
      payFee(selectedFee, paymentData.amount, paymentData.method, paymentData.transactionId)
      setIsPayOpen(false)
      setPaymentData({ amount: 0, method: "cash", transactionId: "" })
      setSelectedFee(null)
    }
  }

  const openPaymentDialog = (feeId: string, dueAmount: number) => {
    setSelectedFee(feeId)
    setPaymentData({ amount: dueAmount, method: "cash", transactionId: "" })
    setIsPayOpen(true)
  }

  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    return student?.name || "N/A"
  }

  const getStudentClass = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    if (!student) return "N/A"
    const cls = classes.find((c) => c.id === student.classId)
    return cls ? `${cls.name} (${cls.section})` : "N/A"
  }

  const filteredFees = fees.filter((fee) => {
    const student = students.find((s) => s.id === fee.studentId)
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false
    const matchesStatus = statusFilter === "all" || fee.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCollected = fees.reduce((sum, f) => sum + f.paidAmount, 0)
  const totalDue = fees.reduce((sum, f) => sum + (f.amount - f.paidAmount), 0)
  const paidCount = fees.filter((f) => f.status === "paid").length
  const unpaidCount = fees.filter((f) => f.status === "unpaid").length

  const feeTypes: Record<string, string> = {
    tuition: "টিউশন ফি",
    admission: "ভর্তি ফি",
    exam: "পরীক্ষা ফি",
    library: "লাইব্রেরি ফি",
    transport: "পরিবহন ফি",
    other: "অন্যান্য",
  }

  const statusColors: Record<string, string> = {
    paid: "default",
    partial: "secondary",
    unpaid: "destructive",
  }

  const statusLabels: Record<string, string> = {
    paid: "পরিশোধিত",
    partial: "আংশিক",
    unpaid: "বকেয়া",
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ফি ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground">ফি সংগ্রহ ও পেমেন্ট পরিচালনা করুন</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                নতুন ফি যুক্ত করুন
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন ফি যুক্ত করুন</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>শিক্ষার্থী নির্বাচন করুন *</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(v) => setFormData({ ...formData, studentId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="শিক্ষার্থী নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {student.registrationNo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>ফি এর ধরন *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) => setFormData({ ...formData, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuition">টিউশন ফি</SelectItem>
                      <SelectItem value="admission">ভর্তি ফি</SelectItem>
                      <SelectItem value="exam">পরীক্ষা ফি</SelectItem>
                      <SelectItem value="library">লাইব্রেরি ফি</SelectItem>
                      <SelectItem value="transport">পরিবহন ফি</SelectItem>
                      <SelectItem value="other">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>পরিমাণ (টাকা) *</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                    placeholder="ফি এর পরিমাণ"
                  />
                </div>
                <div className="space-y-2">
                  <Label>পরিশোধের শেষ তারিখ</Label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleAddFee}>যুক্ত করুন</Button>
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
                  <Receipt className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">৳{totalCollected.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">মোট সংগৃহীত</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">৳{totalDue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">মোট বকেয়া</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{paidCount}</p>
                  <p className="text-sm text-muted-foreground">পরিশোধিত</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{unpaidCount}</p>
                  <p className="text-sm text-muted-foreground">অপরিশোধিত</p>
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
              placeholder="শিক্ষার্থী খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সকল স্ট্যাটাস</SelectItem>
              <SelectItem value="paid">পরিশোধিত</SelectItem>
              <SelectItem value="partial">আংশিক</SelectItem>
              <SelectItem value="unpaid">বকেয়া</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            রিপোর্ট
          </Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>শিক্ষার্থী</TableHead>
                  <TableHead>শ্রেণি</TableHead>
                  <TableHead>ফি এর ধরন</TableHead>
                  <TableHead>মোট</TableHead>
                  <TableHead>জমা</TableHead>
                  <TableHead>বাকি</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{getStudentName(fee.studentId)}</TableCell>
                    <TableCell>{getStudentClass(fee.studentId)}</TableCell>
                    <TableCell>{feeTypes[fee.type] || fee.type}</TableCell>
                    <TableCell>৳{fee.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-primary">৳{fee.paidAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive">
                      ৳{(fee.amount - fee.paidAmount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[fee.status] as "default" | "secondary" | "destructive"}>
                        {statusLabels[fee.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {fee.status !== "paid" && (
                        <Button
                          size="sm"
                          onClick={() => openPaymentDialog(fee.id, fee.amount - fee.paidAmount)}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          পেমেন্ট
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredFees.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">কোনো ফি রেকর্ড পাওয়া যায়নি</div>
            )}
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={isPayOpen} onOpenChange={setIsPayOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>পেমেন্ট গ্রহণ করুন</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>পেমেন্ট পরিমাণ (টাকা) *</Label>
                <Input
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>পেমেন্ট পদ্ধতি *</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={paymentData.method === "cash" ? "default" : "outline"}
                    onClick={() => setPaymentData({ ...paymentData, method: "cash" })}
                    className="w-full"
                  >
                    <Banknote className="w-4 h-4 mr-2" />
                    নগদ
                  </Button>
                  <Button
                    type="button"
                    variant={paymentData.method === "bkash" ? "default" : "outline"}
                    onClick={() => setPaymentData({ ...paymentData, method: "bkash" })}
                    className="w-full"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    বিকাশ
                  </Button>
                  <Button
                    type="button"
                    variant={paymentData.method === "bank" ? "default" : "outline"}
                    onClick={() => setPaymentData({ ...paymentData, method: "bank" })}
                    className="w-full"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    ব্যাংক
                  </Button>
                </div>
              </div>
              {paymentData.method !== "cash" && (
                <div className="space-y-2">
                  <Label>ট্রানজেকশন আইডি</Label>
                  <Input
                    value={paymentData.transactionId}
                    onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                    placeholder="ট্রানজেকশন আইডি লিখুন"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPayOpen(false)}>
                বাতিল
              </Button>
              <Button onClick={handlePayment}>পেমেন্ট নিশ্চিত করুন</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
