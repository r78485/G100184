"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, GraduationCap } from "lucide-react"
import { useSchoolStore, ClassInfo } from "@/lib/store"
import { toast } from "sonner"

const CircularProgress = ({ percentage, label, count, colorClass }: { percentage: number, label: string, count: number, colorClass: string }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-secondary" />
          <circle 
            cx="32" cy="32" r="22" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            className={`transition-all duration-1000 ease-in-out ${colorClass}`} 
            strokeLinecap="round" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
          {percentage}%
        </div>
      </div>
      <div className="text-xs font-semibold mt-1 text-muted-foreground">{label}</div>
      <div className="text-[10px] text-muted-foreground">{count}</div>
    </div>
  )
}

export default function ClassesPage() {
  const { classes, students, addClass, updateClass, deleteClass } = useSchoolStore()
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<ClassInfo | null>(null)
  const [formData, setFormData] = useState({ name: '', section: 'A', capacity: 40 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Ensure unique classes by name if you prefer grouping, or just treat each entry as a class card.
  // The user asked for "Three classes". Assuming classes in store.
  
  const handleOpenModal = (cls?: ClassInfo) => {
    if (cls) {
      setEditingClass(cls)
      setFormData({ name: cls.name, section: cls.section, capacity: cls.capacity })
    } else {
      setEditingClass(null)
      setFormData({ name: '', section: 'A', capacity: 40 })
    }
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Please enter a class name")
      return
    }
    
    if (editingClass) {
      updateClass(editingClass.id, { ...formData })
      toast.success("Class updated successfully")
    } else {
      addClass({ ...formData, classTeacherId: '1' })
      toast.success("Class added successfully")
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      deleteClass(id)
      toast.success("Class deleted successfully")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Breadcrumb equivalent */}
        <div className="flex items-center gap-2 pb-4 border-b">
          <h1 className="text-lg font-semibold text-foreground">Classes</h1>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>- All Classes</span>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const classStudents = students.filter(s => s.classId === cls.id)
            const total = classStudents.length
            const boys = classStudents.filter(s => s.gender === 'male').length
            const girls = classStudents.filter(s => s.gender === 'female').length
            const na = total - boys - girls

            const boysPct = total > 0 ? Math.round((boys / total) * 100) : 0
            const girlsPct = total > 0 ? Math.round((girls / total) * 100) : 0
            const naPct = total > 0 ? Math.round((na / total) * 100) : 0

            return (
              <div key={cls.id} className="bg-card border border-border rounded-xl p-6 shadow-sm relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-foreground">{cls.name}</h3>
                  <div className="flex gap-2 text-muted-foreground">
                    <button onClick={() => handleOpenModal(cls)} className="hover:text-blue-500 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cls.id)} className="hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{total}</span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">STUDENTS</span>
                  </div>
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>

                <div className="flex justify-between px-2">
                  <CircularProgress percentage={boysPct} label="Boys" count={boys} colorClass="text-blue-600" />
                  <CircularProgress percentage={girlsPct} label="Girls" count={girls} colorClass="text-blue-400" />
                  <CircularProgress percentage={naPct} label="N/A" count={na} colorClass="text-gray-300" />
                </div>
              </div>
            )
          })}

          {/* Add New Card */}
          <button 
            onClick={() => handleOpenModal()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-300 rounded-xl p-6 min-h-[200px] text-blue-500 hover:bg-blue-50/50 transition-colors"
          >
            <Plus className="w-8 h-8" />
            <span className="font-medium">Add New</span>
          </button>
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Name</label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Six"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Section</label>
                <Input 
                  value={formData.section} 
                  onChange={(e) => setFormData({...formData, section: e.target.value})} 
                  placeholder="e.g. A"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Capacity</label>
                <Input 
                  type="number"
                  value={formData.capacity} 
                  onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})} 
                />
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

