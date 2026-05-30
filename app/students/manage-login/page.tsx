"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Key, Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSchoolStore } from "@/lib/store"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ManageLoginPage() {
  const { students } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.includes(searchTerm)
  )

  const handleResetPassword = (id: string) => {
    alert("পাসওয়ার্ড রিসেট করা হয়েছে। নতুন ডিফল্ট পাসওয়ার্ড: 123456")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">লগইন ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground">শিক্ষার্থীদের পোর্টাল লগইন ও পাসওয়ার্ড পরিচালনা করুন</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>শিক্ষার্থী লগইন এক্সেস</CardTitle>
                <CardDescription>ইউজারনেম (রেজিঃ নং) ও পাসওয়ার্ড রিসেট করুন</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="নাম বা আইডি দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>ইউজারনেম (রেজিঃ নং)</TableHead>
                  <TableHead>শ্রেণি</TableHead>
                  <TableHead>অভিভাবক ফোন</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="font-mono text-primary">{student.registrationNo}</TableCell>
                    <TableCell>{student.classId}</TableCell>
                    <TableCell>{student.guardianPhone}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleResetPassword(student.id)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        পাসওয়ার্ড রিসেট
                      </Button>
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
      </div>
    </DashboardLayout>
  )
}
