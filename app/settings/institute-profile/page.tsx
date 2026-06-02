"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Save, Phone, Mail, Globe, MapPin, Hash, Calendar, UserRound } from "lucide-react"
import { useSchoolStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function InstituteProfilePage() {
  const { instituteProfile, updateInstituteProfile } = useSchoolStore()
  
  const [formData, setFormData] = useState(instituteProfile)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFormData(instituteProfile)
  }, [instituteProfile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    try {
      if (!formData) {
        toast.error("No data to save")
        console.warn('InstituteProfile: handleSave called but formData is empty')
        return
      }
      console.log('InstituteProfile: saving', formData)
      updateInstituteProfile(formData)
      // quick check of localStorage persistence key used by zustand persist
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('school-management-store')
          console.log('localStorage[school-management-store] (truncated):', stored ? stored.slice(0, 200) : null)
        } catch (e) {
          console.error('localStorage read failed', e)
        }
      }
      toast.success("Institute profile saved successfully!")
    } catch (err) {
      console.error('InstituteProfile: save failed', err)
      toast.error('Failed to save institute profile')
    }
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Institute Profile</h1>
          <p className="text-muted-foreground">শিক্ষা প্রতিষ্ঠানের মূল তথ্য পরিচালনা করুন</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center space-y-4 md:w-1/4">
              <div className="w-32 h-32 rounded-xl bg-secondary border-2 border-dashed border-border flex items-center justify-center flex-col gap-2 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                {formData.logo ? (
                  <img src={formData.logo} alt="Institute Logo" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Building2 className="w-10 h-10 text-muted-foreground group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-muted-foreground font-medium">Upload Logo</span>
                  </>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, logo: reader.result as string }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }} 
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                প্রস্তাবিত সাইজ: ৪০০x৪০০ পিক্সেল<br />
                সর্বোচ্চ সাইজ: ২ MB
              </p>
            </div>

            {/* Form Section */}
            <div className="flex-1 space-y-6">
              
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">প্রাথমিক তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      প্রতিষ্ঠানের নাম
                    </label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="যেমন: ঢাকা জিলা স্কুল" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      ইআইআইএন (EIIN) / রেজিস্ট্রেশন নম্বর
                    </label>
                    <Input name="eiin" value={formData.eiin} onChange={handleChange} placeholder="যেমন: 108162" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      প্রতিষ্ঠাকালীন বছর
                    </label>
                    <Input name="establishedYear" type="number" value={formData.establishedYear} onChange={handleChange} placeholder="যেমন: 1995" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <UserRound className="w-4 h-4 text-muted-foreground" />
                      অধ্যক্ষ / প্রধান শিক্ষকের নাম
                    </label>
                    <Input name="principalName" value={formData.principalName} onChange={handleChange} placeholder="সম্পূর্ণ নাম লিখুন" />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2 mt-6">যোগাযোগের তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      ফোন নম্বর
                    </label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="যেমন: +880 1..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      ইমেইল এড্রেস
                    </label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="যেমন: info@school.edu.bd" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      ওয়েবসাইট
                    </label>
                    <Input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="যেমন: https://www.school.edu.bd" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      সম্পূর্ণ ঠিকানা
                    </label>
                    <Input name="address" value={formData.address} onChange={handleChange} placeholder="যেমন: ১২৩, স্কুল রোড, ঢাকা" />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 flex justify-end">
                <Button className="gap-2 px-6" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  সংরক্ষণ করুন
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
