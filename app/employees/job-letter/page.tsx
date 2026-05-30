"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSchoolStore } from "@/lib/store"

export default function JobLetterPage() {
  const { employees } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [letterType, setLetterType] = useState("appointment")

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.includes(searchTerm)
  )

  const employee = employees.find(e => e.id === selectedEmployee)

  const handlePrint = () => {
    window.print()
  }

  const renderLetterContent = () => {
    if (!employee) return null

    if (letterType === "offer") {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold underline uppercase">Job Offer Letter</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>To,<br /><strong>{employee.nameEn || employee.name}</strong><br />{employee.address}</p>
            <p><strong>Subject: Offer of Employment for the position of {employee.designation}</strong></p>
            <p>Dear {employee.nameEn || employee.name},</p>
            <p>We are pleased to offer you the position of <strong>{employee.designation}</strong> in the <strong>{employee.department}</strong> department at EduManage School. Your skills and experience will be an ideal fit for our institution.</p>
            <p>Your expected joining date is <strong>{employee.joiningDate}</strong>. Your monthly consolidated salary will be <strong>BDT {employee.salary.toLocaleString()}</strong>.</p>
            <p>Please review this offer letter and sign it to confirm your acceptance. We look forward to welcoming you to our team.</p>
            <p>Sincerely,<br /><br /><strong>Principal / HR Head</strong><br />EduManage School</p>
          </div>
        </>
      )
    }

    if (letterType === "appointment") {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold underline uppercase">Letter of Appointment</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed">
            <p>Date: {employee.joiningDate}</p>
            <p>To,<br /><strong>{employee.nameEn || employee.name}</strong><br />{employee.address}</p>
            <p><strong>Subject: Appointment Letter for the position of {employee.designation}</strong></p>
            <p>Dear {employee.nameEn || employee.name},</p>
            <p>We are pleased to appoint you as <strong>{employee.designation}</strong> in the <strong>{employee.department}</strong> department at EduManage School, effective from <strong>{employee.joiningDate}</strong>.</p>
            <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-6 rounded-lg print:bg-transparent print:border">
              <p><strong>Employee ID:</strong> {employee.id}</p>
              <p><strong>Designation:</strong> {employee.designation}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Salary:</strong> BDT {employee.salary.toLocaleString()} / month</p>
              <p><strong>Contact:</strong> {employee.phone}</p>
              <p><strong>Email:</strong> {employee.email || 'N/A'}</p>
            </div>
            <p>You will be governed by the rules and regulations of the school. We expect you to perform your duties with diligence and maintain the highest standard of professionalism.</p>
            <p>Wishing you a successful career with us.</p>
            <p>Authorized Signatory,<br /><br /><strong>Principal</strong><br />EduManage School</p>
          </div>
        </>
      )
    }

    if (letterType === "joining") {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold underline uppercase">Joining Report</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed">
            <p>Date: {employee.joiningDate}</p>
            <p>To,<br />The Principal,<br />EduManage School</p>
            <p><strong>Subject: Joining Report as {employee.designation}</strong></p>
            <p>Respected Sir/Madam,</p>
            <p>With reference to your appointment letter dated {employee.joiningDate}, I am pleased to report for duty as <strong>{employee.designation}</strong> in the <strong>{employee.department}</strong> department on the forenoon/afternoon of <strong>{employee.joiningDate}</strong>.</p>
            <p>I assure you that I will discharge my duties to the best of my abilities and abide by the rules and regulations of the institution.</p>
            <p>Thanking you.</p>
            <div className="mt-16 text-right">
              <p>Yours faithfully,</p>
              <br />
              <p><strong>{employee.nameEn || employee.name}</strong></p>
              <p>Employee ID: {employee.id}</p>
              <p>{employee.phone}</p>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 print:hidden">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">কর্মচারীর চিঠিপত্র</h1>
            <p className="text-muted-foreground">নিয়োগপত্র, যোগদান পত্র ও অফার লেটার প্রিন্ট করুন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 print:hidden">
            <CardHeader>
              <CardTitle>কর্মচারী নির্বাচন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={letterType} onValueChange={setLetterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="চিঠির ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offer">Offer Letter (অফার লেটার)</SelectItem>
                    <SelectItem value="appointment">Appointment Letter (নিয়োগপত্র)</SelectItem>
                    <SelectItem value="joining">Joining Letter (যোগদান পত্র)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative pt-2">
                  <Search className="absolute left-3 top-[1.25rem] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredEmployees.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => setSelectedEmployee(e.id)}
                      className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedEmployee === e.id
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <p className="font-medium">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.designation} - {e.department}</p>
                    </div>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-4">
                      কোনো কর্মচারী পাওয়া যায়নি
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-none md:shadow-sm">
            <CardHeader className="print:hidden flex flex-row items-center justify-between">
              <CardTitle>প্রিভিউ</CardTitle>
              {employee && (
                <Button onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  প্রিন্ট করুন
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {employee ? (
                <div className="p-8 border rounded-lg bg-white text-black min-h-[800px] print:border-none print:p-0">
                  <div className="text-center mb-8 border-b pb-6">
                    <h1 className="text-3xl font-bold mb-2">EduManage School</h1>
                    <p className="text-sm">123 Education Street, Dhaka, Bangladesh</p>
                    <p className="text-sm">Phone: 01XXX-XXXXXX | Email: info@edumanage.com</p>
                  </div>
                  
                  {renderLetterContent()}

                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground border-2 border-dashed rounded-lg print:hidden">
                  বাম পাশ থেকে একজন কর্মচারী নির্বাচন করুন
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
