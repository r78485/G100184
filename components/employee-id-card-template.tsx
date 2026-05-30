import React from "react"
import { type Employee } from "@/lib/store"
import { User } from "lucide-react"

interface EmployeeIdCardProps {
  employee: Employee
  className?: string
  variant?: "teal" | "purple"
}

export function EmployeeIdCardFront({ employee, variant = "teal", className = "" }: EmployeeIdCardProps) {
  const isPurple = variant === "purple"
  
  const bgClass = isPurple 
    ? "bg-gradient-to-br from-purple-800 to-purple-600" 
    : "bg-gradient-to-br from-teal-800 to-teal-600"
    
  const accentText = isPurple ? "text-purple-800" : "text-teal-800"

  return (
    <div className={`relative w-[216px] h-[344px] bg-white overflow-hidden shadow-sm flex flex-col font-sans ${className}`} style={{ pageBreakInside: 'avoid' }}>
      {/* Top Background Section */}
      <div className={`relative h-[150px] w-full ${bgClass} overflow-hidden`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)" }}>
        {/* Abstract Overlays */}
        <div className="absolute top-[-20px] left-[-20px] w-[150px] h-[150px] bg-white/10 rotate-45 transform origin-top-left"></div>
        <div className="absolute top-[-10px] right-[-50px] w-[200px] h-[100px] bg-black/10 -rotate-12"></div>
        <div className="absolute bottom-0 right-0 w-[100px] h-[100px] bg-white/10 rounded-tl-full"></div>

        {/* Header */}
        <div className="relative z-10 flex flex-col items-center pt-4">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
            <span className={`font-bold text-[10px] ${accentText}`}>AG</span>
          </div>
          <h2 className="text-white font-bold text-xs tracking-wider uppercase m-0 leading-tight">Anti-Gravity</h2>
          <p className="text-white/80 text-[6px] tracking-[0.2em] uppercase m-0">Academy</p>
        </div>
      </div>

      {/* Profile Photo */}
      <div className="absolute top-[90px] left-1/2 -translate-x-1/2 z-20">
        <div className="w-20 h-20 rounded-full border-[3px] border-white bg-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
          {employee.photo ? (
            <img src={employee.photo} alt={employee.nameEn} className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-slate-400" />
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="pt-12 px-4 pb-4 flex-1 flex flex-col items-center bg-slate-50/50">
        <h3 className="font-bold text-sm text-slate-800 uppercase text-center m-0">{employee.nameEn || employee.name}</h3>
        <p className={`text-[7px] font-semibold uppercase tracking-widest ${accentText} mb-3`}>{employee.designation}</p>

        <div className="w-full text-[7px] text-slate-600 space-y-1 mb-3">
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">EMP ID</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{employee.id}</span>
          </div>
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">DEPT</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{employee.department}</span>
          </div>
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">PHONE</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{employee.phone}</span>
          </div>
          <div className="grid grid-cols-[30px_5px_1fr] items-center">
            <span className="opacity-70">JOIN</span>
            <span>:</span>
            <span className="font-medium text-slate-800">{employee.joiningDate}</span>
          </div>
        </div>

        <div className="w-full mt-auto flex justify-center text-[6px] text-slate-500 uppercase font-medium">
          <div className="flex gap-1">
            <span className="opacity-70">VALID FOR STAFF ONLY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmployeeIdCardBack({ employee, variant = "teal", className = "" }: EmployeeIdCardProps) {
  const isPurple = variant === "purple"
  
  const gradientClass = isPurple
    ? "bg-gradient-to-b from-purple-900 to-purple-700"
    : "bg-gradient-to-b from-teal-900 to-teal-700"

  return (
    <div className={`relative w-[216px] h-[344px] ${gradientClass} overflow-hidden shadow-sm flex flex-col font-sans ${className}`} style={{ pageBreakInside: 'avoid' }}>
      {/* Abstract Overlays */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rotate-45 transform origin-top-right"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-black/5 rounded-full"></div>

      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="text-white/90 text-[7px] space-y-2 mt-4 text-justify leading-relaxed">
          <p>• This card is the property of Anti-Gravity Academy and must be returned upon termination of employment.</p>
          <p>• If found, please return to the nearest school authority or contact the HR department.</p>
          <p>• This card must be worn visible at all times within the campus for security purposes.</p>
        </div>

        <div className="mt-8 mb-4 mx-auto bg-white p-1 rounded-sm shadow-sm w-[150px] h-[30px] flex flex-col items-center justify-center">
          {/* Simple simulated barcode representing the employee ID */}
          <div className="w-full h-full flex items-end justify-between px-1 gap-[1px]">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="bg-black h-full" style={{ width: `${Math.random() * 3 + 1}px`, opacity: Math.random() > 0.2 ? 1 : 0 }}></div>
            ))}
          </div>
          <div className="text-[5px] text-center mt-[1px]">{employee.id}</div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <div className="w-[100px] h-[1px] bg-white/30 mb-1"></div>
          <span className="text-[6px] text-white/70 tracking-widest uppercase">Principal / HR Signature</span>
        </div>

        <div className="mt-auto flex flex-col items-center pb-2">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
            <span className={`font-bold text-[8px] ${isPurple ? "text-purple-800" : "text-teal-800"}`}>AG</span>
          </div>
          <h2 className="text-white font-bold text-[10px] tracking-wider uppercase m-0 leading-none">Anti-Gravity</h2>
          <p className="text-white/60 text-[5px] tracking-[0.2em] uppercase mt-1">Academy</p>
        </div>
      </div>
    </div>
  )
}
