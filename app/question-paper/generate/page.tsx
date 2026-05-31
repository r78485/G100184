"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSchoolStore, GeneratedPaper, GeneratedQuestion } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Bot, Sparkles, FileText, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function GenerateQuestionPaperPage() {
  const { classes, subjects, addGeneratedPaper } = useSchoolStore()
  const router = useRouter()
  
  const [mounted, setMounted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("প্রস্তুত হচ্ছে...")
  
  const [formData, setFormData] = useState({
    classId: "",
    subjectId: "",
    examName: "অর্ধবার্ষিক পরীক্ষা ২০২৬",
    duration: "৩ ঘণ্টা",
    totalMarks: 100,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const availableSubjects = formData.classId 
    ? subjects.filter(s => s.classId === formData.classId)
    : []

  const selectedSubject = subjects.find(s => s.id === formData.subjectId)

  const handleGenerate = () => {
    if (!formData.classId || !formData.subjectId || !formData.examName) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় সকল তথ্য দিন।")
      return
    }

    if (!selectedSubject?.bookUrl) {
      toast.warning("এই বিষয়ের কোনো মূল বই (PDF) আপলোড করা নেই। ডেমো বই থেকে প্রশ্ন তৈরি করা হচ্ছে।")
    }

    setIsGenerating(true)
    setProgress(0)
    
    // Simulate AI generation process
    const stages = [
      { p: 10, t: "বইয়ের PDF রিড করা হচ্ছে..." },
      { p: 30, t: "AI টেক্সট এনালাইসিস করছে..." },
      { p: 50, t: "সৃজনশীল প্রশ্ন তৈরি হচ্ছে..." },
      { p: 75, t: "বহুনির্বাচনী (MCQ) প্রশ্ন তৈরি হচ্ছে..." },
      { p: 90, t: "ফরম্যাটিং এবং ফাইনালাইজ করা হচ্ছে..." },
      { p: 100, t: "সম্পন্ন হয়েছে!" }
    ]

    let currentStage = 0
    const interval = setInterval(() => {
      if (currentStage >= stages.length) {
        clearInterval(interval)
        finishGeneration()
        return
      }
      setProgress(stages[currentStage].p)
      setStatusText(stages[currentStage].t)
      currentStage++
    }, 1500)
  }

  const finishGeneration = () => {
    // Generate dummy questions for preview
    const dummyCq: GeneratedQuestion[] = Array.from({ length: 11 }).map((_, i) => ({
      id: `cq-${i}`,
      type: 'cq',
      marks: 10,
      text: `নিচের উদ্দীপকটি পড় এবং প্রশ্নগুলোর উত্তর দাও:\n\nরহিম সাহেব একজন আদর্শ শিক্ষক। তিনি ছাত্রদের সবসময় সত্য কথা বলার উপদেশ দেন। একদিন তার এক ছাত্র মিথ্যা কথা বলে ধরা পড়ে। রহিম সাহেব তাকে শাস্তি না দিয়ে বুঝিয়ে বলেন।\n\nক) সত্যবাদিতা কী? (১)\nখ) মিথ্যাবাদীর পরিণাম ব্যাখ্যা কর। (২)\nগ) উদ্দীপকে রহিম সাহেবের আচরণে কোন গুণের প্রকাশ পেয়েছে? ব্যাখ্যা কর। (৩)\nঘ) "রহিম সাহেবের মতো শিক্ষকদের সমাজ পরিবর্তন করার ক্ষমতা রয়েছে" - উদ্দীপকের আলোকে বিশ্লেষণ কর। (৪)`
    }))

    const dummyMcq: GeneratedQuestion[] = Array.from({ length: 30 }).map((_, i) => ({
      id: `mcq-${i}`,
      type: 'mcq',
      marks: 1,
      text: `নিচের কোনটি সঠিক উত্তর? (প্রশ্ন নং ${i + 1})`,
      options: ["ক) প্রথম অপশন", "খ) দ্বিতীয় অপশন", "গ) তৃতীয় অপশন", "ঘ) চতুর্থ অপশন"],
      answer: "খ) দ্বিতীয় অপশন"
    }))

    const newPaper: Omit<GeneratedPaper, 'id' | 'createdAt'> = {
      classId: formData.classId,
      subjectId: formData.subjectId,
      examName: formData.examName,
      duration: formData.duration,
      totalMarks: formData.totalMarks,
      status: 'Ready',
      createdBy: "System AI",
      questions: [...dummyCq, ...dummyMcq]
    }

    addGeneratedPaper(newPaper)
    toast.success("প্রশ্নপত্র সফলভাবে জেনারেট হয়েছে!")
    setTimeout(() => {
      router.push('/question-paper')
    }, 1000)
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/question-paper">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Question Generator
            </h1>
            <p className="text-muted-foreground">বই থেকে স্বয়ংক্রিয়ভাবে প্রশ্ন তৈরি করুন</p>
          </div>
        </div>

        {!isGenerating ? (
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">ক্লাস <span className="text-red-500">*</span></label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.classId}
                  onChange={(e) => {
                    setFormData({...formData, classId: e.target.value, subjectId: ""})
                  }}
                >
                  <option value="" disabled>ক্লাস নির্বাচন করুন</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">বিষয় <span className="text-red-500">*</span></label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.subjectId}
                  onChange={(e) => setFormData({...formData, subjectId: e.target.value})}
                  disabled={!formData.classId}
                >
                  <option value="" disabled>বিষয় নির্বাচন করুন</option>
                  {availableSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {selectedSubject && (
              <div className={`p-4 rounded-lg border flex items-start gap-4 ${selectedSubject.bookUrl ? 'bg-green-500/10 border-green-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
                <div className="mt-1">
                  {selectedSubject.bookUrl ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <FileText className="w-5 h-5 text-yellow-500" />}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {selectedSubject.bookUrl ? 'বই (PDF) আপলোড করা আছে' : 'কোনো বই (PDF) আপলোড করা নেই'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedSubject.bookUrl 
                      ? 'AI এই বইটি পড়ে সেখান থেকে স্বয়ংক্রিয়ভাবে প্রশ্ন তৈরি করবে।' 
                      : 'যেহেতু মূল বই আপলোড করা নেই, তাই AI ডেমো ডাটা থেকে প্রশ্ন তৈরি করবে। Subjects পেজ থেকে বই আপলোড করে নিতে পারেন।'}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">পরীক্ষার নাম</label>
                <Input 
                  value={formData.examName} 
                  onChange={(e) => setFormData({...formData, examName: e.target.value})} 
                  placeholder="যেমন: অর্ধবার্ষিক পরীক্ষা ২০২৬"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">সময়</label>
                <Input 
                  value={formData.duration} 
                  onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                  placeholder="৩ ঘণ্টা"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">মোট মার্কস</label>
                <Input 
                  type="number"
                  value={formData.totalMarks} 
                  onChange={(e) => setFormData({...formData, totalMarks: Number(e.target.value)})} 
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleGenerate} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8 rounded-full shadow-lg shadow-primary/20">
                <Bot className="w-5 h-5" />
                অটো জেনারেট করুন
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center">
                <Bot className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary transition-all duration-500 ease-out"
                  strokeDasharray={`${progress * 3.01} 301`}
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{progress}%</h2>
              <p className="text-muted-foreground animate-pulse">{statusText}</p>
            </div>
            <div className="w-full max-w-md bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
