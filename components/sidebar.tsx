"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import { useSchoolStore } from "@/lib/store"
import {
  LayoutDashboard,
  Settings,
  GraduationCap,
  BookOpen,
  Users,
  UserCog,
  Wallet,
  Receipt,
  Banknote,
  CalendarCheck,
  Calendar,
  ClipboardList,
  Star,
  ShoppingCart,
  MessageCircle,
  Mail,
  MessageSquare,
  Video,
  FileQuestion,
  FileText,
  ClipboardCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  School,
  Building2,
  Tags,
  Layers,
  Scale,
  Award,
  Palette,
  ChevronDown,
  UserPlus,
  Users2,
  UserCheck,
  IdCard,
  Printer,
  Key,
  TrendingUp
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { 
    name: "General Settings", 
    icon: Settings, 
    href: "/settings",
    subItems: [
      { name: "Institute Profile", href: "/settings/institute-profile", icon: Building2 },
      { name: "Fees Particulars", href: "/settings/fees-particulars", icon: Receipt },
      { name: "Fees Structure", href: "/settings/fees-structure", icon: Layers },
      { name: "Discount Type", href: "/settings/discount-type", icon: Tags },
      { name: "Accounts For Fees", href: "/settings/accounts-for-fees", icon: Wallet },
      { name: "Rules & Regulations", href: "/settings/rules-regulations", icon: Scale },
      { name: "Marks Grading", href: "/settings/marks-grading", icon: Award },
      { name: "Theme & Language", href: "/settings/theme-language", icon: Palette },
      { name: "Account Settings", href: "/settings/account-settings", icon: UserCog },
    ]
  },
  { name: "Classes", icon: GraduationCap, href: "/classes" },
  { name: "Subjects", icon: BookOpen, href: "/subjects" },
  { 
    name: "Students", 
    icon: Users, 
    href: "/students",
    subItems: [
      { name: "All Students", href: "/students", icon: Users },
      { name: "Add New", href: "/students/add", icon: UserPlus },
      { name: "Manage Families", href: "/students/families", icon: Users2 },
      { name: "Active / Inactive", href: "/students/status", icon: UserCheck },
      { name: "Admission Letter", href: "/students/admission-letter", icon: FileText },
      { name: "Student ID Cards", href: "/students/id-cards", icon: IdCard },
      { name: "Print Basic List", href: "/students/print-list", icon: Printer },
      { name: "Manage Login", href: "/students/manage-login", icon: Key },
      { name: "Promote Student", href: "/students/promote", icon: TrendingUp },
    ]
  },
  { 
    name: "Employees", 
    icon: UserCog, 
    href: "/employees",
    subItems: [
      { name: "All Employees", href: "/employees", icon: Users },
      { name: "Add New", href: "/employees/add", icon: UserPlus },
      { name: "Staff ID Cards", href: "/employees/id-cards", icon: IdCard },
      { name: "Job Letter", href: "/employees/job-letter", icon: FileText },
      { name: "Manage Login", href: "/employees/manage-login", icon: Key },
    ]
  },
  { name: "Accounts", icon: Wallet, href: "/accounts" },
  { name: "Fees", icon: Receipt, href: "/fees" },
  { name: "Salary", icon: Banknote, href: "/salary" },
  { name: "Attendance", icon: CalendarCheck, href: "/attendance" },
  { name: "Timetable", icon: Calendar, href: "/timetable" },
  { name: "Homework", icon: ClipboardList, href: "/homework" },
  { name: "Behaviour & Skills", icon: Star, href: "/behaviour" },
  { name: "Online Store & POS", icon: ShoppingCart, href: "/store" },
  { name: "WhatsApp", icon: MessageCircle, href: "/whatsapp" },
  { name: "Messaging", icon: Mail, href: "/messaging" },
  { name: "SMS Services", icon: MessageSquare, href: "/sms" },
  { name: "Live Class", icon: Video, href: "/live-class" },
  { name: "Question Paper", icon: FileQuestion, href: "/question-paper" },
  { name: "Exams", icon: FileText, href: "/exams" },
  { name: "Class Tests", icon: ClipboardCheck, href: "/class-tests" },
  { name: "Reports", icon: BarChart3, href: "/reports" },
]

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { instituteProfile } = useSchoolStore()
  const [mounted, setMounted] = useState(false)
  
  // Only open General Settings by default if we are inside a settings route
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    return {
      "General Settings": pathname?.startsWith('/settings') || false,
      "Students": pathname?.startsWith('/students') || false,
      "Employees": pathname?.startsWith('/employees') || false,
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }))
  }

  // To prevent hydration mismatch with translations
  if (!mounted) {
    return (
      <aside className={cn("fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col", collapsed ? "w-16" : "w-64")}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <School className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border overflow-hidden">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary shrink-0">
          {instituteProfile?.logo ? (
            <img src={instituteProfile.logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
          ) : (
            <School className="w-6 h-6 text-primary-foreground" />
          )}
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sidebar-foreground truncate text-sm" title={instituteProfile?.name || "School Name"}>
              {instituteProfile?.name || "Institute Name"}
            </span>
            <span className="text-[10px] text-muted-foreground truncate" title={instituteProfile?.address}>
              {instituteProfile?.address || "Address"}
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              EIIN: {instituteProfile?.eiin || "N/A"} | Est: {instituteProfile?.establishedYear || "N/A"}
            </span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isOpen = openMenus[item.name]
            const isActive = pathname === item.href || (hasSubItems && item.subItems?.some(sub => pathname === sub.href))

            return (
              <li key={item.name}>
                <div
                  className={cn(
                    "flex flex-col",
                    hasSubItems && !collapsed && "space-y-1"
                  )}
                >
                  <Link
                    href={hasSubItems ? "#" : item.href}
                    onClick={(e) => {
                      if (hasSubItems) {
                        e.preventDefault()
                        toggleMenu(item.name)
                        if (collapsed) setCollapsed(false)
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group",
                      isActive && !hasSubItems
                        ? "bg-sidebar-accent text-primary"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      hasSubItems && "cursor-pointer"
                    )}
                    title={collapsed ? t(item.name) : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "w-5 h-5 flex-shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                        )}
                      />
                      {!collapsed && (
                        <span className="text-sm font-medium truncate">{t(item.name)}</span>
                      )}
                    </div>
                    {hasSubItems && !collapsed && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isOpen ? "transform rotate-180" : ""
                        )}
                      />
                    )}
                  </Link>

                  {/* Submenu */}
                  {hasSubItems && isOpen && !collapsed && (
                    <ul className="pl-9 pr-2 space-y-1 mt-1">
                      {item.subItems?.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        return (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm",
                                isSubActive
                                  ? "bg-sidebar-accent text-primary font-medium"
                                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                              )}
                            >
                              <subItem.icon className={cn(
                                "w-4 h-4",
                                isSubActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                              )} />
                              <span className="truncate">{t(subItem.name)}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">{t("Collapse")}</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
