"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react"
import { useSchoolStore, FeeStructure } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function FeesStructurePage() {
  const { feeStructures, feeParticulars, classes, addFeeStructure, updateFeeStructure, deleteFeeStructure } = useSchoolStore()
  
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Omit<FeeStructure, 'id'>>({
    classId: '',
    feeParticularId: '',
    amount: 0,
    frequency: 'Monthly',
    status: 'Active'
  })
  
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setMounted(true)
    if(classes.length > 0 && !formData.classId) {
       setFormData(prev => ({...prev, classId: classes[0].id}))
    }
    if(feeParticulars.length > 0 && !formData.feeParticularId) {
       setFormData(prev => ({...prev, feeParticularId: feeParticulars[0].id}))
    }
  }, [classes, feeParticulars])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'amount' ? Number(value) : value 
    }))
  }

  const handleSave = () => {
    if (!formData.classId || !formData.feeParticularId || formData.amount <= 0) {
      toast.error("Please fill all required fields with valid values!")
      return
    }
    
    if (isEditing && editId) {
      updateFeeStructure(editId, formData)
      toast.success("Fee structure updated successfully!")
    } else {
      addFeeStructure(formData)
      toast.success("Fee structure added successfully!")
    }
    
    handleReset()
  }
  
  const handleEdit = (structure: FeeStructure) => {
    setIsEditing(true)
    setEditId(structure.id)
    setFormData({
      classId: structure.classId,
      feeParticularId: structure.feeParticularId,
      amount: structure.amount,
      frequency: structure.frequency || 'Monthly',
      status: structure.status
    })
  }
  
  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this fee structure?")) {
      deleteFeeStructure(id)
      toast.success("Fee structure deleted successfully!")
    }
  }
  
  const handleReset = () => {
    setIsEditing(false)
    setEditId(null)
    setFormData({
      classId: classes.length > 0 ? classes[0].id : '',
      feeParticularId: feeParticulars.length > 0 ? feeParticulars[0].id : '',
      amount: 0,
      frequency: 'Monthly',
      status: 'Active'
    })
  }

  const getClassName = (classId: string) => classes.find(c => c.id === classId)?.name || 'Unknown'
  const getFeeName = (feeId: string) => feeParticulars.find(f => f.id === feeId)?.name || 'Unknown'

  const filteredStructures = feeStructures.filter(s => {
    const className = getClassName(s.classId).toLowerCase()
    const feeName = getFeeName(s.feeParticularId).toLowerCase()
    const term = searchTerm.toLowerCase()
    return className.includes(term) || feeName.includes(term)
  })

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fees Structure</h1>
            <p className="text-muted-foreground">শ্রেণী এবং সেশন অনুযায়ী ফি এর পরিমাণ নির্ধারণ করুন</p>
          </div>
          <Button className="gap-2" onClick={handleReset}>
            <Plus className="w-4 h-4" />
            নতুন ফি কাঠামো যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">
              {isEditing ? 'ফি কাঠামো সম্পাদনা' : 'ফি কাঠামো নির্ধারণ'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">শ্রেণী (Class)</label>
                <select name="classId" value={formData.classId} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ফি এর ধরন</label>
                <select name="feeParticularId" value={formData.feeParticularId} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  {feeParticulars.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">পরিমাণ (Amount)</label>
                <Input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="যেমন: 500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ফ্রিকোয়েন্সি (Frequency)</label>
                <select name="frequency" value={formData.frequency} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option value="Monthly">মাসিক (Monthly)</option>
                  <option value="Yearly">বাৎসরিক (Yearly)</option>
                  <option value="One-time">এককালীন (One-time)</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={handleSave}>সংরক্ষণ করুন</Button>
                {isEditing && <Button variant="outline" onClick={handleReset}>বাতিল</Button>}
              </div>
            </div>
          </div>

          {/* List/Table */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="font-semibold text-lg">বিদ্যমান ফি কাঠামো</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="w-4 h-4" />
                </Button>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-9" placeholder="খুঁজুন..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">শ্রেণী</th>
                    <th className="px-4 py-3">ফি এর ধরন</th>
                    <th className="px-4 py-3">পরিমাণ</th>
                    <th className="px-4 py-3">ফ্রিকোয়েন্সি</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStructures.length > 0 ? filteredStructures.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{getClassName(item.classId)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{getFeeName(item.feeParticularId)}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{item.amount} ৳</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.frequency}</td>
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
                      <td colSpan={5} className="text-center py-4 text-muted-foreground">No fee structure found</td>
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
