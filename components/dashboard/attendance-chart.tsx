"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "সোম", present: 420, absent: 30 },
  { name: "মঙ্গল", present: 435, absent: 15 },
  { name: "বুধ", present: 410, absent: 40 },
  { name: "বৃহঃ", present: 445, absent: 5 },
  { name: "শুক্র", present: 425, absent: 25 },
  { name: "শনি", present: 380, absent: 70 },
]

export function AttendanceChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">সাপ্তাহিক উপস্থিতি</h3>
          <p className="text-sm text-muted-foreground">Weekly Attendance Overview</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Absent</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.18 165)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.18 165)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.55 0.22 25)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.55 0.22 25)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
            <XAxis dataKey="name" stroke="oklch(0.65 0.01 260)" fontSize={12} />
            <YAxis stroke="oklch(0.65 0.01 260)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.28 0.01 260)",
                borderRadius: "8px",
                color: "oklch(0.96 0.01 260)",
              }}
            />
            <Area
              type="monotone"
              dataKey="present"
              stroke="oklch(0.65 0.18 165)"
              fillOpacity={1}
              fill="url(#colorPresent)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="absent"
              stroke="oklch(0.55 0.22 25)"
              fillOpacity={1}
              fill="url(#colorAbsent)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
