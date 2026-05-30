"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserCircle, Shield, Key, Camera, Mail, Phone } from "lucide-react"
import { useSchoolStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n"

export default function AccountSettingsPage() {
  const { accountSetting, updateAccountSetting } = useSchoolStore()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [localState, setLocalState] = useState(accountSetting)

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: ''
  })

  useEffect(() => {
    setMounted(true)
    setLocalState(accountSetting)
  }, [accountSetting])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalState(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    if (!localState.fullName || !localState.email) {
      toast.error("Name and Email are required!")
      return
    }
    updateAccountSetting(localState)
    toast.success("Profile updated successfully!")
  }

  const handleUpdatePassword = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirmPass) {
      toast.error("Please fill all password fields!")
      return
    }
    if (passwords.newPass !== passwords.confirmPass) {
      toast.error("New passwords do not match!")
      return
    }
    // Mock password update
    toast.success("Password updated successfully!")
    setPasswords({ current: '', newPass: '', confirmPass: '' })
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("Account Settings")}</h1>
          <p className="text-muted-foreground">{t("Manage your personal profile and security settings")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{t("Profile Information")}</h3>
                  <p className="text-sm text-muted-foreground">{t("Update your personal information")}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary relative bg-secondary flex items-center justify-center">
                      <UserCircle className="w-16 h-16 text-muted-foreground" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  </div>
                  <span className="text-sm font-medium text-blue-500 cursor-pointer hover:underline">{t("Change Photo")}</span>
                </div>

                {/* Info Fields */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-foreground">{t("Full Name")}</label>
                      <Input name="fullName" value={localState.fullName} onChange={handleChange} placeholder="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {t("Phone Number")}
                      </label>
                      <Input name="phone" value={localState.phone} onChange={handleChange} placeholder="+880 1..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {t("Email Address")}
                      </label>
                      <Input name="email" type="email" value={localState.email} onChange={handleChange} placeholder="admin@example.com" />
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleSaveProfile}>{t("Save Profile")}</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{t("Change Password")}</h3>
                  <p className="text-sm text-muted-foreground">{t("Keep your account secure")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Key className="w-4 h-4 text-muted-foreground" />
                    {t("Current Password")}
                  </label>
                  <Input name="current" type="password" value={passwords.current} onChange={handlePasswordChange} placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Key className="w-4 h-4 text-muted-foreground" />
                    {t("New Password")}
                  </label>
                  <Input name="newPass" type="password" value={passwords.newPass} onChange={handlePasswordChange} placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Key className="w-4 h-4 text-muted-foreground" />
                    {t("Confirm Password")}
                  </label>
                  <Input name="confirmPass" type="password" value={passwords.confirmPass} onChange={handlePasswordChange} placeholder="••••••••" />
                </div>
                <Button className="w-full mt-4" variant="default" onClick={handleUpdatePassword}>{t("Update Password")}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
