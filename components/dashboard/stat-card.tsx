"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { cn } from "@/lib/utils"
import { Particles } from "@/components/ui/particles"

type StatCardProps = {
  title: string
  value: React.ReactNode
  icon?: React.ReactNode
  href?: string
  printableRef?: React.RefObject<HTMLElement>
  className?: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  showParticles?: boolean
  showActions?: boolean
}

export function StatCard({
  title,
  value,
  icon,
  href,
  printableRef,
  className = "",
  change,
  changeType = "neutral",
  showParticles = false,
  showActions = true,
}: StatCardProps) {
  const router = useRouter()
  const clickable = !!href && !showActions
  const handlePrint = () => {
    if (printableRef && printableRef.current) {
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
          body{font-family: Inter,ui-sans-serif,system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color:#000; background:#fff;}
          .print-container{padding:16px}
        </style>
      </head><body><div class="print-container">${printableRef.current.outerHTML}</div></body></html>`

      const w = window.open("", "_blank")
      if (!w) return
      w.document.write(html)
      w.document.close()
      w.focus()
      setTimeout(() => {
        try { w.print() } catch (e) { /* ignore */ }
      }, 250)
      return
    }

    window.print()
  }

  return (
    <Card
      className={cn("relative overflow-hidden", clickable ? "cursor-pointer" : "", className)}
      onClick={() => clickable ? router.push(href as string) : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {showParticles && (
        <Particles
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
          quantity={20}
          color="#22c55e"
        />
      )}

      <div className="flex items-center justify-between p-4 relative z-10">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-12 h-12 flex items-center justify-center text-2xl">
              {React.isValidElement(icon) ? (
                icon
              ) : typeof icon === "function" ? (
                // icon is a function component
                // @ts-ignore: call component
                React.createElement(icon, { className: "w-6 h-6 text-primary" })
              ) : (icon && typeof icon === 'object' && (icon.$$typeof || icon.render)) ? (
                // forwardRef or exotic component object (e.g. lucide-react exports)
                // @ts-ignore
                React.createElement(icon, { className: "w-6 h-6 text-primary" })
              ) : (
                icon
              )}
            </div>
          )}
          <div>
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {change && (
              <div className={cn(
                "text-sm",
                changeType === "positive" && "text-primary",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>{change}</div>
            )}
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            {href ? (
              <Link href={href} className="inline-block">
                <Button variant="outline">Details</Button>
              </Link>
            ) : null}
            <Button onClick={handlePrint} variant="ghost" title={`Print ${title}`}>
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatCard
