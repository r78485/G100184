"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, BookOpen, Edit, Trash2, FileText, Download } from "lucide-react"
import { useSchoolStore, type Subject } from "@/lib/store"
import { toast } from "sonner"

const typeColors: Record<string, string> = {
  compulsory: "bg-primary/10 text-primary",
  group: "bg-chart-2/10 text-chart-2",
  optional: "bg-chart-3/10 text-chart-3",
}

const typeLabels: Record<string, string> = {
  compulsory: "Compulsory",
  group: "Group",
  optional: "Optional",
}

export default function SubjectsPage() {
  const { subjects, classes, addSubject, updateSubject, deleteSubject } = useSchoolStore()
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  
  const [formData, setFormData] = useState<Partial<Subject>>({
    name: '',
    code: '',
    classId: '',
    type: 'compulsory',
    marks: 100,
    pdfUrl: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleOpenModal = (sub?: Subject) => {
    if (sub) {
      setEditingSubject(sub)
      setFormData({
        name: sub.name,
        code: sub.code,
        classId: sub.classId,
        type: sub.type,
        marks: sub.marks || 100,
        pdfUrl: sub.pdfUrl || ''
      })
    } else {
      setEditingSubject(null)
      setFormData({
        name: '',
        code: '',
        classId: activeTab !== "all" ? activeTab : (classes[0]?.id || ''),
        type: activeTab !== "all" ? 'compulsory' : 'compulsory',
        marks: 100,
        pdfUrl: '',
        bookUrl: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pdfUrl' | 'bookUrl') => {
    const file = e.target.files?.[0]
    if (file) {
      const fakeUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, [field]: fakeUrl }))
      toast.success(`File ${file.name} attached!`)
    }
  }

  const handleSave = () => {
    if (!formData.name || !formData.code || !formData.classId) {
      toast.error("অনুগ্রহ করে সব তথ্য দিন (নাম, কোড, ক্লাস)")
      return
    }
    
    if (editingSubject) {
      updateSubject(editingSubject.id, formData as Subject)
      toast.success("Subject updated successfully")
    } else {
      addSubject({ ...formData, teacherId: '1' } as Omit<Subject, 'id'>)
      toast.success("Subject added successfully")
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      deleteSubject(id)
      toast.success("Subject deleted successfully")
    }
  }

  const filteredSubjects = activeTab === "all" 
    ? subjects 
    : subjects.filter(s => s.classId === activeTab)

  const compulsoryCount = filteredSubjects.filter(s => s.type === 'compulsory').length
  const optionalCount = filteredSubjects.filter(s => s.type === 'optional').length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
            <p className="text-muted-foreground">বিষয় ব্যবস্থাপনা (মার্কস ও পিডিএফ সহ)</p>
          </div>
          <Button onClick={() => handleOpenModal()} className="gap-2">
            <Plus className="w-4 h-4" />
            নতুন বিষয় যুক্ত করুন
          </Button>
        </div>

        {/* Tabs for Class filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
            <TabsList className="h-auto p-1 bg-secondary/50">
              <TabsTrigger value="all" className="px-4 py-2">All Classes</TabsTrigger>
              {classes.map(c => (
                <TabsTrigger key={c.id} value={c.id} className="px-4 py-2">{c.name}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* Stats based on filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-3xl font-bold text-foreground">{filteredSubjects.length}</p>
              <p className="text-sm text-muted-foreground">মোট বিষয়</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-3xl font-bold text-foreground">{compulsoryCount}</p>
              <p className="text-sm text-muted-foreground">আবশ্যিক বিষয়</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-3xl font-bold text-foreground">{optionalCount}</p>
              <p className="text-sm text-muted-foreground">ঐচ্ছিক বিষয়</p>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">বিষয়ের নাম</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">কোড</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ক্লাস</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">মার্কস</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ধরন</th>
                      <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">সিলেবাস/বই</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSubjects.map((subject) => {
                      const cls = classes.find(c => c.id === subject.classId)
                      return (
                        <tr key={subject.id} className="hover:bg-secondary/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <span className="font-medium text-foreground">{subject.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{subject.code}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{cls?.name || 'Unknown'}</td>
                          <td className="px-6 py-4 font-semibold">{subject.marks || '-'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${typeColors[subject.type] || 'bg-gray-100 text-gray-800'}`}>
                              {typeLabels[subject.type] || subject.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {subject.pdfUrl ? (
                                <a 
                                  href={subject.pdfUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                  title="View Syllabus PDF"
                                >
                                  <FileText className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground" title="No Syllabus">এস/নেই</span>
                              )}
                              {subject.bookUrl ? (
                                <a 
                                  href={subject.bookUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                  title="View Main Book PDF"
                                >
                                  <BookOpen className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground" title="No Book">বই/নেই</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenModal(subject)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(subject.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {filteredSubjects.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-muted-foreground">কোনো বিষয় পাওয়া যায়নি</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingSubject ? 'বিষয় সম্পাদনা করুন' : 'নতুন বিষয় যুক্ত করুন'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">বিষয়ের নাম <span className="text-red-500">*</span></label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g. বাংলা"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">কোড <span className="text-red-500">*</span></label>
                  <Input 
                    value={formData.code} 
                    onChange={(e) => setFormData({...formData, code: e.target.value})} 
                    placeholder="e.g. BAN101"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ক্লাস <span className="text-red-500">*</span></label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.classId}
                    onChange={(e) => setFormData({...formData, classId: e.target.value})}
                  >
                    <option value="" disabled>ক্লাস নির্বাচন করুন</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ধরন <span className="text-red-500">*</span></label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  >
                    <option value="compulsory">আবশ্যিক (Compulsory)</option>
                    <option value="group">গ্রুপ (Group)</option>
                    <option value="optional">ঐচ্ছিক (Optional)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">মার্কস (Marks)</label>
                  <Input 
                    type="number"
                    value={formData.marks} 
                    onChange={(e) => setFormData({...formData, marks: Number(e.target.value)})} 
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">সিলেবাস পিডিএফ (PDF)</label>
                  <div className="flex gap-2">
                    <label className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-secondary/50 px-3 py-2 text-sm hover:bg-secondary transition-colors">
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {formData.pdfUrl ? 'PDF Attached' : 'Upload Syllabus'}
                      </span>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'pdfUrl')}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4 mt-2">
                <label className="text-sm font-medium text-primary">মূল বই আপলোড (PDF) - <span className="text-muted-foreground font-normal">অটো প্রশ্ন তৈরির জন্য</span></label>
                <div className="flex gap-2">
                  <label className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <span className="flex items-center gap-2 font-medium text-primary">
                      <BookOpen className="w-5 h-5" />
                      {formData.bookUrl ? 'বই আপলোড করা হয়েছে' : 'বইয়ের PDF ফাইল আপলোড করুন'}
                    </span>
                    <input 
                      type="file" 
                      accept="application/pdf"
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'bookUrl')}
                    />
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}


