"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"

const dataBn = [
  { month: "জানু", collected: 85000, pending: 15000 },
  { month: "ফেব্রু", collected: 92000, pending: 8000 },
  { month: "মার্চ", collected: 78000, pending: 22000 },
  { month: "এপ্রিল", collected: 95000, pending: 5000 },
  { month: "মে", collected: 88000, pending: 12000 },
  { month: "জুন", collected: 72000, pending: 28000 },
]

const dataEn = [
  { month: "Jan", collected: 85000, pending: 15000 },
  { month: "Feb", collected: 92000, pending: 8000 },
  { month: "Mar", collected: 78000, pending: 22000 },
  { month: "Apr", collected: 95000, pending: 5000 },
  { month: "May", collected: 88000, pending: 12000 },
  { month: "Jun", collected: 72000, pending: 28000 },
]

export function FeeCollectionChart() {
  const { t, lang } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const data = lang === 'bn' ? dataBn : dataEn

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t("Fee Collection")}</h3>
          <p className="text-sm text-muted-foreground">{t("Monthly Revenue Overview")}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Collected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-3" />
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
            <XAxis dataKey="month" stroke="oklch(0.65 0.01 260)" fontSize={12} />
            <YAxis stroke="oklch(0.65 0.01 260)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.28 0.01 260)",
                borderRadius: "8px",
                color: "oklch(0.96 0.01 260)",
              }}
              formatter={(value: number) => [`৳${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="collected" fill="oklch(0.65 0.18 165)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="oklch(0.70 0.18 50)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
