"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Monitor, Moon, Sun, Globe, Palette, Check } from "lucide-react"
import { useSchoolStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n"

export default function ThemeLanguagePage() {
  const { themeLanguage, updateThemeLanguage } = useSchoolStore()
  const { t } = useTranslation()
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

  // Removing primaryColor since it's not in store types and user just asked for basic dark/light mode for now
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("Theme & Language")}</h1>
          <p className="text-muted-foreground">{t("Customize system language and theme")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{t("Theme")}</h3>
                <p className="text-sm text-muted-foreground">{t("Change the system color scheme")}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => setLocalState(prev => ({...prev, theme: 'light'}))}
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${localState.theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <Sun className={`w-6 h-6 ${localState.theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">{t("Light")}</span>
              </button>
              <button 
                onClick={() => setLocalState(prev => ({...prev, theme: 'dark'}))}
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${localState.theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <Moon className={`w-6 h-6 ${localState.theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">{t("Dark")}</span>
              </button>
              <button 
                onClick={() => setLocalState(prev => ({...prev, theme: 'system'}))}
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${localState.theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <Monitor className={`w-6 h-6 ${localState.theme === 'system' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">{t("System")}</span>
              </button>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{t("Language")}</h3>
                <p className="text-sm text-muted-foreground">{t("Select system default language")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <label 
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${localState.language === 'bn' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setLocalState(prev => ({...prev, language: 'bn'}))}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇧🇩</span>
                  <span className="font-medium text-foreground">বাংলা (Bangla)</span>
                </div>
                <div className={`w-5 h-5 rounded-full ${localState.language === 'bn' ? 'border-4 border-primary bg-background' : 'border-2 border-muted-foreground'}`}></div>
              </label>

              <label 
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${localState.language === 'en' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setLocalState(prev => ({...prev, language: 'en'}))}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-medium text-foreground">English (US)</span>
                </div>
                <div className={`w-5 h-5 rounded-full ${localState.language === 'en' ? 'border-4 border-primary bg-background' : 'border-2 border-muted-foreground'}`}></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="px-6" onClick={handleSave}>{t("Save Changes")}</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
