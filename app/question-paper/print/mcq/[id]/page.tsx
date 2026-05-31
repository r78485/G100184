"use client"

import { useEffect, useState } from "react"
import { useSchoolStore } from "@/lib/store"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Printer, ArrowLeft } from "lucide-react"

export default function PrintMCQPage() {
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

  const mcqQuestions = paper.questions.filter(q => q.type === 'mcq')

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-8 print:py-0 print:bg-white">
      {/* Print styles for landscape */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: landscape; margin: 15mm; }
          body { -webkit-print-color-adjust: exact; }
        }
      `}} />

      {/* Controls (Hidden in print) */}
      <div className="max-w-[297mm] mx-auto mb-6 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> ফিরে যান
        </Button>
        <Button onClick={() => window.print()} className="gap-2 bg-primary">
          <Printer className="w-4 h-4" /> প্রিন্ট করুন (Landscape)
        </Button>
      </div>

      {/* A4 Landscape Paper Container */}
      <div className="max-w-[297mm] min-h-[210mm] mx-auto bg-white text-black p-[15mm] shadow-lg print:shadow-none print:p-0">
        
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
              <p>সময়: ৩০ মিনিট</p> {/* MCQ time is usually fixed, but could be dynamic */}
              <p>পূর্ণমান: {mcqQuestions.length}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center italic text-sm mb-6 font-bold">
          [বিশেষ দ্রষ্টব্য: সরবরাহকৃত বহুনির্বাচনী অভীক্ষার উত্তরপত্রে প্রশ্নের ক্রমিক নম্বরের বিপরীতে প্রদত্ত বর্ণসম্বলিত বৃত্তসমূহ হতে সঠিক/সর্বোৎকৃষ্ট উত্তরের বৃত্তটি বল পয়েন্ট কলম দ্বারা সম্পূর্ণ ভরাট কর। প্রতিটি প্রশ্নের মান ১।]
        </div>

        {/* MCQ Questions - 2 Columns */}
        <div className="columns-2 gap-12">
          {mcqQuestions.map((q, index) => (
            <div key={q.id} className="mb-6 break-inside-avoid text-sm">
              <div className="flex gap-2 mb-2 font-medium">
                <span>{index + 1}।</span>
                <span className="flex-1">{q.text}</span>
              </div>
              
              {q.options && (
                <div className="grid grid-cols-2 gap-2 ml-6 mt-1">
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
