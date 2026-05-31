"use client"

import React from "react"
import { type Student, useSchoolStore } from "@/lib/store"
import { User } from "lucide-react"

interface IdCardTemplateProps {
  student: Student
  className?: string
  variant?: "red" | "blue"
}

export function IdCardFront({ student, variant = "blue", className = "" }: IdCardTemplateProps) {
  const isRed = variant === "red"
  
  const bgClass = isRed 
    ? "bg-gradient-to-br from-red-700 to-red-600" 
    : "bg-gradient-to-br from-blue-800 to-blue-600"
    
  const accentText = isRed ? "text-red-700" : "text-blue-800"

  return (
    <div className={`relative w-[216px] h-[344px] bg-white overflow-hidden shadow-sm flex flex-col font-sans ${className}`} style={{ pageBreakInside: 'avoid' }}>
      {/* Top Background Section */}
      <div className={`relative h-[150px] w-full ${bgClass} overflow-hidden`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)" }}>
        {/* Abstract Overlays */}
        <div className="absolute top-[-20px] left-[-20px] w-[150px] h-[150px] bg-white/10 rotate-45 transform origin-top-left"></div>
        <div className="absolute top-[-10px] right-[-50px] w-[200px] h-[100px] bg-black/10 -rotate-12"></div>
        <div className="absolute bottom-0 right-0 w-[100px] h-[100px] bg-white/10 rounded-tl-full"></div>

        {/* Header: use institute profile if available */}
        <div className="relative z-10 flex flex-col items-center pt-3">
          {useSchoolStore().instituteProfile?.logo ? (
            <img src={useSchoolStore().instituteProfile.logo} alt={useSchoolStore().instituteProfile.name} className="w-8 h-8 rounded-full object-cover mb-1 shadow-sm" />
          ) : (
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
              <span className={`font-bold text-[10px] ${accentText}`}>{(useSchoolStore().instituteProfile?.name || 'AG').slice(0,2).toUpperCase()}</span>
            </div>
          )}
          <h2 className="text-white font-bold text-xs tracking-wider uppercase m-0 leading-tight">{useSchoolStore().instituteProfile?.name || 'Anti-Gravity'}</h2>
          <p className="text-white/80 text-[6px] tracking-[0.2em] uppercase m-0">{useSchoolStore().instituteProfile?.address || 'Academy'}</p>
        </div>
      </div>

      {/* Profile Photo */}
      <div className="absolute top-[90px] left-1/2 -translate-x-1/2 z-20">
        <div className="w-20 h-20 rounded-full border-[3px] border-white bg-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
          {student.photo ? (
            <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-slate-400" />
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="pt-12 px-4 pb-4 flex-1 flex flex-col items-center bg-slate-50/50">
        <h3 className="font-bold text-sm text-slate-800 uppercase text-center m-0">{student.name}</h3>
        <p className={`text-[7px] font-semibold uppercase tracking-widest ${accentText} mb-3`}>Student</p>

        <div className="w-full text-[7px] text-slate-600 space-y-1 mb-3">
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">ID NO</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{student.registrationNo || "N/A"}</span>
          </div>
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">BLOOD</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{student.bloodGroup || "N/A"}</span>
          </div>
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">CLASS</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{student.classId || "N/A"} ({student.section})</span>
          </div>
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">PHONE</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{student.guardianPhone}</span>
          </div>
        </div>

        <div className="w-full mt-auto flex justify-between text-[6px] text-slate-500 uppercase font-medium">
          <div className="flex gap-1">
            <span className="opacity-70">JOIN:</span>
            <span>{student.admissionDate.substring(0, 4)}</span>
          </div>
          <div className="flex gap-1">
            <span className="opacity-70">EXPIRE:</span>
            <span>{parseInt(student.admissionDate.substring(0, 4)) + 1}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function IdCardBack({ student, variant = "blue", className = "" }: IdCardTemplateProps) {
  const isRed = variant === "red"
  
  const bgClass = isRed 
    ? "bg-red-700" 
    : "bg-blue-800"

  const gradientClass = isRed
    ? "bg-gradient-to-b from-red-800 to-red-600"
    : "bg-gradient-to-b from-blue-900 to-blue-700"

  return (
    <div className={`relative w-[216px] h-[344px] ${gradientClass} overflow-hidden shadow-sm flex flex-col font-sans ${className}`} style={{ pageBreakInside: 'avoid' }}>
      {/* Abstract Overlays */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rotate-45 transform origin-top-right"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-black/5 rounded-full"></div>

      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="text-white/90 text-[7px] space-y-2 mt-4 text-justify leading-relaxed">
          <p>• This card is the property of {useSchoolStore().instituteProfile?.name || 'the institution'} and must be returned upon request.</p>
          <p>• If found, please return to the nearest school authority or contact the administration.</p>
          <p>• This card is non-transferable and must be worn visible at all times within the campus.</p>
        </div>

        <div className="mt-8 mb-4 mx-auto bg-white p-1 rounded-sm shadow-sm w-[150px] h-[30px] flex flex-col items-center justify-center">
          {/* Simple simulated barcode */}
          <div className="w-full h-full flex items-end justify-between px-1 gap-[1px]">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="bg-black h-full" style={{ width: `${Math.random() * 3 + 1}px`, opacity: Math.random() > 0.2 ? 1 : 0 }}></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <div className="w-[100px] h-[1px] bg-white/30 mb-1"></div>
          <span className="text-[6px] text-white/70 tracking-widest uppercase">Authorized Signature</span>
        </div>

        <div className="mt-auto flex flex-col items-center pb-2">
          {useSchoolStore().instituteProfile?.logo ? (
            <img src={useSchoolStore().instituteProfile.logo} alt={useSchoolStore().instituteProfile.name} className="w-5 h-5 rounded-full mb-1 shadow-sm" />
          ) : (
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
              <span className={`font-bold text-[8px] ${isRed ? "text-red-700" : "text-blue-800"}`}>{(useSchoolStore().instituteProfile?.name || 'AG').slice(0,2).toUpperCase()}</span>
            </div>
          )}
          <h2 className="text-white font-bold text-[10px] tracking-wider uppercase m-0 leading-none">{useSchoolStore().instituteProfile?.name || 'Anti-Gravity'}</h2>
          <p className="text-white/60 text-[5px] tracking-[0.2em] uppercase mt-1">{useSchoolStore().instituteProfile?.address || ''}</p>
        </div>
      </div>
    </div>
  )
}
