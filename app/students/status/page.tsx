"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UserCheck, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useSchoolStore } from "@/lib/store"

export default function ActiveInactivePage() {
  const { students, updateStudent } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.includes(searchTerm)
  )

  const handleStatusChange = (id: string, currentStatus: "active" | "inactive") => {
    updateStudent(id, { status: currentStatus === "active" ? "inactive" : "active" })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">সক্রিয় / নিষ্ক্রিয়</h1>
            <p className="text-muted-foreground">শিক্ষার্থীদের স্ট্যাটাস পরিচালনা করুন</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>শিক্ষার্থীর স্ট্যাটাস</CardTitle>
                <CardDescription>শিক্ষার্থীকে সক্রিয় বা নিষ্ক্রিয় করুন</CardDescription>
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
                  <TableHead>রেজিঃ নং</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>শ্রেণি</TableHead>
                  <TableHead>বর্তমান স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium font-mono">{student.registrationNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.classId}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>
                        {student.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-muted-foreground">
                          {student.status === "active" ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
                        </span>
                        <Switch
                          checked={student.status === "active"}
                          onCheckedChange={() => handleStatusChange(student.id, student.status)}
                        />
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
      </div>
    </DashboardLayout>
  )
}
