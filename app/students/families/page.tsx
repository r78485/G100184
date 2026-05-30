"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// In a real app, this would be computed or fetched
const dummyFamilies = [
  { id: "1", fatherName: "Abdul Karim", motherName: "Rahima Begum", phone: "01711000001", studentCount: 2 },
  { id: "2", fatherName: "Mohammad Ali", motherName: "Fatema Khatun", phone: "01811000002", studentCount: 1 },
]

export default function ManageFamiliesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">পরিবার ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground">শিক্ষার্থীদের পরিবার এবং ভাইবোনদের তথ্য পরিচালনা করুন</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>পরিবারের তালিকা</CardTitle>
                <CardDescription>একই পরিবারের একাধিক শিক্ষার্থীর তথ্য</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="পিতার নাম বা ফোন নম্বর..."
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
                  <TableHead>পিতার নাম</TableHead>
                  <TableHead>মাতার নাম</TableHead>
                  <TableHead>মোবাইল নম্বর</TableHead>
                  <TableHead>শিক্ষার্থীর সংখ্যা</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyFamilies.map((family) => (
                  <TableRow key={family.id}>
                    <TableCell className="font-medium">{family.fatherName}</TableCell>
                    <TableCell>{family.motherName}</TableCell>
                    <TableCell>{family.phone}</TableCell>
                    <TableCell>{family.studentCount}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">বিস্তারিত</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
