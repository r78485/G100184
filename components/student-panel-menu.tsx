"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Search, LayoutDashboard, FileText, Receipt, Calendar, ClipboardList, Video, UserCog, LogOut } from "lucide-react"
import { useSchoolStore } from "@/lib/store"

const menuItems = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "Search Menu", href: "/student/search", icon: Search },
  { name: "Admission Letter", href: "/student/admission-letter", icon: FileText },
  { name: "Paid Fee Receipt", href: "/student/pay-fees", icon: Receipt },
  { name: "My Timetable", href: "/student/timetable", icon: Calendar },
  { name: "My Report Card", href: "/student/report-cards", icon: FileText },
  { name: "Test Results", href: "/student/results", icon: ClipboardList },
  { name: "Exam Result", href: "/student/results", icon: ClipboardList },
  { name: "Home Assignments", href: "/student/homework", icon: ClipboardList },
  { name: "Messaging", href: "/messaging", icon: Mail },
  { name: "Live Class", href: "/live-class", icon: Video },
  { name: "Account Settings", href: "/student/password", icon: UserCog },
]

export default function StudentPanelMenu() {
  const router = useRouter()
  const logoutUser = useSchoolStore((s) => s.logoutUser)

  const handleLogout = () => {
    logoutUser()
    router.push('/login')
  }

  return (
    <aside className="w-64 bg-card p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3">Student Menu</h3>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary/5">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-red-50 text-sm text-red-600">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
