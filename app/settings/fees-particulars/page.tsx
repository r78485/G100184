import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Receipt } from "lucide-react"
import { useSchoolStore, FeeParticular } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function FeesParticularsPage() {
  const { feeParticulars, addFeeParticular, updateFeeParticular, deleteFeeParticular } = useSchoolStore()
  
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Omit<FeeParticular, 'id'>>({
    name: '',
    description: '',
    status: 'Active'
  })
  
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Fee name is required!")
      return
    }
    
    if (isEditing && editId) {
      updateFeeParticular(editId, formData)
      toast.success("Fee updated successfully!")
    } else {
      addFeeParticular(formData)
      toast.success("Fee added successfully!")
    }
    
    handleReset()
  }
  
  const handleEdit = (particular: FeeParticular) => {
    setIsEditing(true)
    setEditId(particular.id)
    setFormData({
      name: particular.name,
      description: particular.description,
      status: particular.status
    })
  }
  
  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this fee?")) {
      deleteFeeParticular(id)
      toast.success("Fee deleted successfully!")
    }
  }
  
  const handleReset = () => {
    setIsEditing(false)
    setEditId(null)
    setFormData({
      name: '',
      description: '',
      status: 'Active'
    })
  }

  const filteredParticulars = feeParticulars.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fees Particulars</h1>
            <p className="text-muted-foreground">বিভিন্ন ধরনের ফি (যেমন: টিউশন ফি, ভর্তি ফি) তৈরি ও পরিচালনা করুন</p>
          </div>
          <Button className="gap-2" onClick={handleReset}>
            <Plus className="w-4 h-4" />
            নতুন ফি যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">
              {isEditing ? 'ফি এর ধরন সম্পাদনা করুন' : 'ফি এর ধরন তৈরি করুন'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ফি এর নাম</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="যেমন: Tuition Fee" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)</label>
                <Input name="description" value={formData.description} onChange={handleChange} placeholder="মাসিক বেতন..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">স্ট্যাটাস</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">ফি এর তালিকা</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="খুঁজুন..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">ফি এর নাম</th>
                    <th className="px-4 py-3">বিবরণ</th>
                    <th className="px-4 py-3">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticulars.length > 0 ? filteredParticulars.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-medium flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-primary" />
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.description}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {item.status}
                        </span>
                      </td>
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
                      <td colSpan={4} className="text-center py-4 text-muted-foreground">No fees found</td>
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
