"use client"

import { useEffect, useState } from "react"
import { useSchoolStore } from "@/lib/store"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Printer, ArrowLeft } from "lucide-react"

export default function PrintCQPage() {
  const { id } = useParams()
  const router = useRouter()
  const { generatedPapers, subjects, classes, instituteProfile } = useSchoolStore()
  const [mounted, setMounted] = useState(false)

  const paper = generatedPapers.find(p => p.id === id)
  const subject = subjects.find(s => s.id === paper?.subjectId)
  const className = classes.find(c => c.id === paper?.classId)?.name || paper?.classId

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!paper) return <div className="p-8 text-center text-red-500">প্রশ্নপত্র পাওয়া যায়নি!</div>

  const cqQuestions = paper.questions.filter(q => q.type === 'cq')

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-8 print:py-0 print:bg-white">
      {/* Controls (Hidden in print) */}
      <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> ফিরে যান
        </Button>
        <Button onClick={() => window.print()} className="gap-2 bg-primary">
          <Printer className="w-4 h-4" /> প্রিন্ট করুন (A4)
        </Button>
      </div>

      {/* A4 Paper Container */}
      <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white text-black p-[20mm] shadow-lg print:shadow-none print:p-0">
        
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold font-serif">{instituteProfile.name}</h1>
          <h2 className="text-xl font-semibold mt-1">{paper.examName}</h2>
          
          <div className="flex justify-between items-end mt-4 font-medium text-lg">
            <div className="text-left">
              <p>শ্রেণি: {className}</p>
              <p>বিষয়: {subject?.name}</p>
            </div>
            <div className="text-right">
              <p>সময়: {paper.duration}</p>
              <p>পূর্ণমান: {paper.totalMarks}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center italic text-sm mb-6">
          [বিশেষ দ্রষ্টব্য: ডান পাশের সংখ্যা প্রশ্নের পূর্ণমান জ্ঞাপক। যেকোনো ৭টি প্রশ্নের উত্তর দাও।]
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {cqQuestions.map((q, index) => {
            const parts = q.text.split('\n\n')
            const textParts = parts.length > 1 ? parts.slice(0, parts.length - 1).join('\n\n') : q.text
            const qs = parts.length > 1 ? parts[parts.length - 1].split('\n') : []

            return (
              <div key={q.id} className="text-justify text-base leading-relaxed">
                <div className="flex gap-2">
                  <span className="font-bold">{index + 1}।</span>
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{textParts}</p>
                    <div className="mt-3 space-y-2 ml-4">
                      {qs.map((qLine, i) => (
                        <p key={i}>{qLine}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
