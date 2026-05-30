"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Monitor, Moon, Sun, Globe, Palette, Check } from "lucide-react"
import { useSchoolStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function ThemeLanguagePage() {
  const { themeLanguage, updateThemeLanguage } = useSchoolStore()
  const [mounted, setMounted] = useState(false)
  const [localState, setLocalState] = useState(themeLanguage)

  useEffect(() => {
    setMounted(true)
    setLocalState(themeLanguage)
  }, [themeLanguage])

  const handleSave = () => {
    updateThemeLanguage(localState)
    toast.success("Theme and Language settings updated successfully!")
  }

  if (!mounted) return null

  const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-rose-600', 'bg-violet-600', 'bg-orange-600']

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Theme & Language</h1>
          <p className="text-muted-foreground">সিস্টেমের ভাষা এবং থিম কাস্টমাইজ করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">থিম (Theme)</h3>
                <p className="text-sm text-muted-foreground">সিস্টেমের কালার স্কিম পরিবর্তন করুন</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => setLocalState(prev => ({...prev, theme: 'Light'}))}
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${localState.theme === 'Light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <Sun className={`w-6 h-6 ${localState.theme === 'Light' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button 
                onClick={() => setLocalState(prev => ({...prev, theme: 'Dark'}))}
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${localState.theme === 'Dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <Moon className={`w-6 h-6 ${localState.theme === 'Dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button 
                onClick={() => setLocalState(prev => ({...prev, theme: 'System'}))}
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${localState.theme === 'System' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <Monitor className={`w-6 h-6 ${localState.theme === 'System' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">প্রাইমারি কালার (Primary Color)</label>
              <div className="flex gap-3">
                {colors.map((color, i) => (
                  <button 
                    key={i} 
                    onClick={() => setLocalState(prev => ({...prev, primaryColor: color}))}
                    className={`w-8 h-8 rounded-full ${color} flex items-center justify-center ring-2 ring-offset-2 ${localState.primaryColor === color ? 'ring-primary' : 'ring-transparent'}`}
                  >
                    {localState.primaryColor === color && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">ভাষা (Language)</h3>
                <p className="text-sm text-muted-foreground">সিস্টেমের ডিফল্ট ভাষা নির্বাচন করুন</p>
              </div>
            </div>

            <div className="space-y-4">
              <label 
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${localState.language === 'Bangla' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setLocalState(prev => ({...prev, language: 'Bangla'}))}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇧🇩</span>
                  <span className="font-medium text-foreground">বাংলা (Bangla)</span>
                </div>
                <div className={`w-5 h-5 rounded-full ${localState.language === 'Bangla' ? 'border-4 border-primary bg-background' : 'border-2 border-muted-foreground'}`}></div>
              </label>

              <label 
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${localState.language === 'English' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setLocalState(prev => ({...prev, language: 'English'}))}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-medium text-foreground">English (US)</span>
                </div>
                <div className={`w-5 h-5 rounded-full ${localState.language === 'English' ? 'border-4 border-primary bg-background' : 'border-2 border-muted-foreground'}`}></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="px-6" onClick={handleSave}>পরিবর্তন সেভ করুন</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
