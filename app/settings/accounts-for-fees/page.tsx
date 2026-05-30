"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Building, Landmark } from "lucide-react"
import { useSchoolStore, AccountForFee } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function AccountsForFeesPage() {
  const { accountsForFees, addAccountForFee, updateAccountForFee, deleteAccountForFee } = useSchoolStore()
  
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Omit<AccountForFee, 'id'>>({
    name: '',
    type: 'Bank Account',
    number: '',
    details: '',
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
    if (!formData.name || !formData.number) {
      toast.error("Account name and number are required!")
      return
    }
    
    if (isEditing && editId) {
      updateAccountForFee(editId, formData)
      toast.success("Account updated successfully!")
    } else {
      addAccountForFee(formData)
      toast.success("Account added successfully!")
    }
    
    handleReset()
  }
  
  const handleEdit = (account: AccountForFee) => {
    setIsEditing(true)
    setEditId(account.id)
    setFormData({
      name: account.name,
      type: account.type,
      number: account.number,
      details: account.details,
      status: account.status
    })
  }
  
  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this account?")) {
      deleteAccountForFee(id)
      toast.success("Account deleted successfully!")
    }
  }
  
  const handleReset = () => {
    setIsEditing(false)
    setEditId(null)
    setFormData({
      name: '',
      type: 'Bank Account',
      number: '',
      details: '',
      status: 'Active'
    })
  }

  const filteredAccounts = accountsForFees.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.number.includes(searchTerm)
  )

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Accounts For Fees</h1>
            <p className="text-muted-foreground">ফি সংগ্রহের জন্য পেমেন্ট একাউন্ট বা ব্যাংক হিসাব যুক্ত করুন</p>
          </div>
          <Button className="gap-2" onClick={handleReset}>
            <Plus className="w-4 h-4" />
            নতুন একাউন্ট যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 h-fit">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">
              {isEditing ? 'একাউন্ট সম্পাদনা' : 'একাউন্ট তৈরি করুন'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">একাউন্টের নাম</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="যেমন: DBBL School Account" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">একাউন্টের ধরন</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground">
                  <option value="Bank Account">Bank Account</option>
                  <option value="Mobile Banking (bKash/Nagad)">Mobile Banking (bKash/Nagad)</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">একাউন্ট নম্বর / মোবাইল নম্বর</label>
                <Input name="number" value={formData.number} onChange={handleChange} placeholder="যেমন: 123.456.789" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ব্যাংক ও ব্রাঞ্চ (ঐচ্ছিক)</label>
                <Input name="details" value={formData.details} onChange={handleChange} placeholder="যেমন: DBBL, Dhanmondi Branch" />
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
              <h3 className="font-semibold text-lg">একাউন্টের তালিকা</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="খুঁজুন..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredAccounts.length > 0 ? filteredAccounts.map((item) => (
                <div key={item.id} className="border border-border rounded-xl p-4 hover:border-primary/50 transition-colors bg-secondary/10">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.type === 'Bank Account' ? <Building className="w-4 h-4" /> : <Landmark className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-foreground font-medium font-mono">{item.number}</p>
                    <p className="text-xs text-muted-foreground">{item.details || 'N/A'}</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="h-7 px-2 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 text-xs">
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-7 px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 text-xs">
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  No accounts found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
