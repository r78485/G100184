"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Award } from "lucide-react"
import { useSchoolStore, MarksGrading } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function MarksGradingPage() {
  const { marksGradings, addMarksGrading, updateMarksGrading, deleteMarksGrading } = useSchoolStore()
  
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Omit<MarksGrading, 'id'>>({
    grade: '',
    point: 0,
    minMark: 0,
    maxMark: 0,
    remarks: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: (name === 'grade' || name === 'remarks') ? value : Number(value) 
    }))
  }

  const handleSave = () => {
    if (!formData.grade || formData.minMark < 0 || formData.maxMark < 0) {
      toast.error("Grade name and valid marks range are required!")
      return
    }
    
    if (isEditing && editId) {
      updateMarksGrading(editId, formData)
      toast.success("Grade updated successfully!")
    } else {
      addMarksGrading(formData)
      toast.success("Grade added successfully!")
    }
    
    handleReset()
  }
  
  const handleEdit = (grading: MarksGrading) => {
    setIsEditing(true)
    setEditId(grading.id)
    setFormData({
      grade: grading.grade,
      point: grading.point,
      minMark: grading.minMark,
      maxMark: grading.maxMark,
      remarks: grading.remarks
    })
  }
  
  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this grade?")) {
      deleteMarksGrading(id)
      toast.success("Grade deleted successfully!")
    }
  }
  
  const handleReset = () => {
    setIsEditing(false)
    setEditId(null)
    setFormData({
      grade: '',
      point: 0,
      minMark: 0,
      maxMark: 0,
      remarks: ''
    })
  }

  const getGradeColor = (grade: string) => {
    if (grade.includes('A+')) return "text-emerald-500"
    if (grade.includes('A') && !grade.includes('-')) return "text-blue-500"
    if (grade.includes('A-')) return "text-indigo-500"
    if (grade.includes('B')) return "text-purple-500"
    if (grade.includes('C')) return "text-orange-500"
    if (grade.includes('D')) return "text-amber-500"
    if (grade.includes('F')) return "text-rose-500"
    return "text-foreground"
  }

  // Sort by point descending
  const sortedGradings = [...marksGradings].sort((a, b) => b.point - a.point)

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marks Grading</h1>
            <p className="text-muted-foreground">পরীক্ষার ফলাফলের জন্য গ্রেডিং সিস্টেম এবং পয়েন্ট নির্ধারণ করুন</p>
          </div>
          <Button className="gap-2" onClick={handleReset}>
            <Plus className="w-4 h-4" />
            নতুন গ্রেড যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">
              {isEditing ? 'গ্রেড সম্পাদনা' : 'গ্রেড সেটআপ'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">গ্রেড নাম (Grade Name)</label>
                <Input name="grade" value={formData.grade} onChange={handleChange} placeholder="যেমন: A+" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">গ্রেড পয়েন্ট (Grade Point)</label>
                <Input name="point" type="number" step="0.01" value={formData.point} onChange={handleChange} placeholder="যেমন: 5.00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">সর্বনিম্ন নম্বর</label>
                  <Input name="minMark" type="number" value={formData.minMark} onChange={handleChange} placeholder="80" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">সর্বোচ্চ নম্বর</label>
                  <Input name="maxMark" type="number" value={formData.maxMark} onChange={handleChange} placeholder="100" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">মন্তব্য (Remarks)</label>
                <Input name="remarks" value={formData.remarks} onChange={handleChange} placeholder="যেমন: Outstanding" />
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={handleSave}>সংরক্ষণ করুন</Button>
                {isEditing && <Button variant="outline" onClick={handleReset}>বাতিল</Button>}
              </div>
            </div>
          </div>

          {/* List/Table */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">গ্রেডিং স্কেল</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">গ্রেড</th>
                    <th className="px-4 py-3">পয়েন্ট</th>
                    <th className="px-4 py-3">নম্বর সীমা (Marks Range)</th>
                    <th className="px-4 py-3">মন্তব্য</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedGradings.length > 0 ? sortedGradings.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-bold text-lg flex items-center gap-2">
                        <Award className={`w-4 h-4 ${getGradeColor(item.grade)}`} />
                        <span className={getGradeColor(item.grade)}>{item.grade}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{Number(item.point).toFixed(2)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.minMark} - {item.maxMark}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.remarks}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted-foreground">No grades found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
