"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { useSchoolStore, RuleRegulation } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function RulesRegulationsPage() {
  const { rulesRegulations, addRuleRegulation, updateRuleRegulation, deleteRuleRegulation } = useSchoolStore()
  
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Omit<RuleRegulation, 'id'>>({
    title: '',
    category: 'Attendance',
    content: '',
    status: 'Published'
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and Content are required!")
      return
    }
    
    if (isEditing && editId) {
      updateRuleRegulation(editId, formData)
      toast.success("Rule updated successfully!")
    } else {
      addRuleRegulation(formData)
      toast.success("Rule added successfully!")
    }
    
    handleReset()
  }
  
  const handleEdit = (rule: RuleRegulation) => {
    setIsEditing(true)
    setEditId(rule.id)
    setFormData({
      title: rule.title,
      category: rule.category,
      content: rule.content,
      status: rule.status
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this rule?")) {
      deleteRuleRegulation(id)
      toast.success("Rule deleted successfully!")
    }
  }
  
  const handleReset = () => {
    setIsEditing(false)
    setEditId(null)
    setFormData({
      title: '',
      category: 'Attendance',
      content: '',
      status: 'Published'
    })
  }

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  const filteredRules = rulesRegulations.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rules & Regulations</h1>
            <p className="text-muted-foreground">প্রতিষ্ঠানের নিয়ম-কানুন ও নীতিমালা পরিচালনা করুন</p>
          </div>
          <Button className="gap-2" onClick={handleReset}>
            <Plus className="w-4 h-4" />
            নতুন নিয়ম যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">
              {isEditing ? 'নিয়ম-কানুন সম্পাদনা' : 'নিয়ম-কানুন তৈরি করুন'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">শিরোনাম (Title)</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="যেমন: উপস্থিতির নিয়ম" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ক্যাটাগরি</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option value="Attendance">Attendance</option>
                  <option value="Uniform">Uniform</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Exam Rules">Exam Rules</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">বিস্তারিত বিবরণ</label>
                <textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full min-h-[150px] bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="নিয়ম কানুন বিস্তারিত লিখুন..."
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">স্ট্যাটাস</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={handleSave}>সংরক্ষণ করুন</Button>
                {isEditing && <Button variant="outline" onClick={handleReset}>বাতিল</Button>}
              </div>
            </div>
          </div>

          {/* List */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">নিয়ম-কানুনের তালিকা</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="খুঁজুন..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="space-y-4">
              {filteredRules.length > 0 ? filteredRules.map((item) => (
                <div key={item.id} className="border border-border rounded-xl overflow-hidden">
                  <div 
                    className="bg-secondary/30 p-4 flex justify-between items-center cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {item.status}
                      </span>
                      {expandedId === item.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  {expandedId === item.id && (
                    <div className="p-4 border-t border-border bg-card">
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {item.content}
                      </p>
                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/50">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="h-8 text-xs text-blue-500 hover:text-blue-600">
                          <Edit className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="h-8 text-xs text-rose-500 hover:text-rose-600">
                          <Trash2 className="w-3 h-3 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  No rules or regulations found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
