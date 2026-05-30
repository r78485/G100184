"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useSchoolStore, type Employee } from "@/lib/store"
import { Key, Search, Eye, EyeOff, LockReset } from "lucide-react"

export default function ManageLoginPage() {
  const { employees, updateEmployee } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [newPassword, setNewPassword] = useState("")
  
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({})

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const togglePasswordVisibility = (id: string) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleOpenReset = (employee: Employee) => {
    setSelectedEmployee(employee)
    // Generate a temporary 6-digit password by default
    setNewPassword(Math.floor(100000 + Math.random() * 900000).toString())
    setIsResetOpen(true)
  }

  const handleSavePassword = () => {
    if (selectedEmployee && newPassword) {
      updateEmployee(selectedEmployee.id, { password: newPassword })
      setIsResetOpen(false)
      setSelectedEmployee(null)
      setNewPassword("")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">লগইন ম্যানেজমেন্ট</h1>
              <p className="text-muted-foreground">শিক্ষক ও কর্মচারীদের পাসওয়ার্ড পরিচালনা করুন</p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="নাম, ফোন বা পদবী দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>পদবী ও বিভাগ</TableHead>
                    <TableHead>মোবাইল / ইউজারনেম</TableHead>
                    <TableHead>বর্তমান পাসওয়ার্ড</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-medium">{emp.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{emp.designation}</span>
                          <span className="text-xs text-muted-foreground">{emp.department}</span>
                        </div>
                      </TableCell>
                      <TableCell>{emp.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {emp.password ? (
                            <>
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-sm min-w-[80px] text-center">
                                {revealedPasswords[emp.id] ? emp.password : '••••••••'}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => togglePasswordVisibility(emp.id)}
                              >
                                {revealedPasswords[emp.id] ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </>
                          ) : (
                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                              সেট করা হয়নি
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenReset(emp)}
                        >
                          <LockReset className="w-4 h-4 mr-2" />
                          রিসেট
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        কোনো কর্মচারী পাওয়া যায়নি
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Reset Password Modal */}
        <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>পাসওয়ার্ড রিসেট করুন</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="space-y-4 py-4">
                <div className="p-3 bg-muted rounded-lg text-sm">
                  <p><strong>নাম:</strong> {selectedEmployee.name}</p>
                  <p><strong>ইউজারনেম (ফোন):</strong> {selectedEmployee.phone}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>নতুন পাসওয়ার্ড</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="নতুন পাসওয়ার্ড লিখুন"
                      type="text"
                    />
                    <Button 
                      variant="outline"
                      onClick={() => setNewPassword(Math.floor(100000 + Math.random() * 900000).toString())}
                      title="অটো জেনারেট"
                    >
                      <LockReset className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ডিফল্টভাবে একটি ৬-ডিজিটের পিন তৈরি করা হয়েছে। আপনি চাইলে এটি পরিবর্তন করতে পারেন।
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsResetOpen(false)}>
                    বাতিল
                  </Button>
                  <Button onClick={handleSavePassword} disabled={!newPassword}>
                    সেভ করুন
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
