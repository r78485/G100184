"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Eye, EyeOff, GraduationCap, Users, MonitorPlay } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import styles from "./login.module.css"
import { useSchoolStore } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const loginUser = useSchoolStore((state) => state.loginUser)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!username || !password) {
      toast.error("অনুগ্রহ করে ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন।")
      return
    }

    // Default admin validation: admin/123456 or admin@ghjs.edu.bd/123456
    const isAdmin = (username.toLowerCase() === "admin" || username.toLowerCase() === "admin@ghjs.edu.bd") && password === "123456"
    // Student validation: student/123456
    const isStudent = username.toLowerCase() === "student" && password === "123456"
    // Teacher validation: teacher/123456
    const isTeacher = username.toLowerCase() === "teacher" && password === "123456"

    if (isAdmin || isStudent || isTeacher || password === "123456") {
      let role: "admin" | "student" | "teacher" = "admin"
      if (isStudent) role = "student"
      else if (isTeacher) role = "teacher"

      loginUser(role, username)

      toast.success("লগইন সফল হয়েছে! ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...")
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } else {
      toast.error("ভুল ইউজারনেম অথবা পাসওয়ার্ড! সঠিক পাসওয়ার্ডটি হলো: 123456")
    }
  }

  const handleQuickLogin = (role: "admin" | "student" | "teacher") => {
    if (role === "admin") {
      setUsername("admin@ghjs.edu.bd")
      setPassword("123456")
      toast.info("এডমিন তথ্য ইনপুট করা হয়েছে, লগইন বাটনে ক্লিক করুন অথবা এন্টার চাপুন।")
    } else if (role === "student") {
      setUsername("student")
      setPassword("123456")
      toast.info("ছাত্র তথ্য ইনপুট করা হয়েছে, লগইন বাটনে ক্লিক করুন অথবা এন্টার চাপুন।")
    } else if (role === "teacher") {
      setUsername("teacher")
      setPassword("123456")
      toast.info("শিক্ষক তথ্য ইনপুট করা হয়েছে, লগইন বাটনে ক্লিক করুন অথবা এন্টার চাপুন।")
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo.png" alt="School Logo" width={80} height={80} className={styles.logo} />
        </div>
        <div className={styles.titles}>
          <h1 className={styles.bengaliTitle}>গাজী মাহমুদ নিম্ন মাধ্যমিক বিদ্যালয়</h1>
          <h2 className={styles.englishTitle}>Gazi Mahmud Lower Secondary School</h2>
          <h3 className={styles.softwareTitle}>স্কুল ম্যানেজমেন্ট সফটওয়্যার</h3>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <User className={styles.inputIcon} size={20} />
            <Input 
              type="text" 
              placeholder="ব্যবহারকারীর নাম / Email" 
              className={styles.input} 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="পাসওয়ার্ড (ডিফল্ট: 123456)" 
              className={styles.input} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
            <button 
              type="button" 
              className={styles.inputIconRight}
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors mb-4">
            লগইন করুন
          </Button>

          <div className={styles.loginTypes}>
            <Button type="button" onClick={() => handleQuickLogin("student")} className={`${styles.typeButton} ${styles.studentBtn}`}>
              <GraduationCap size={20} />
              <span>ছাত্র লগইন</span>
            </Button>
            <Button type="button" onClick={() => handleQuickLogin("admin")} className={`${styles.typeButton} ${styles.adminBtn}`}>
              <Users size={20} />
              <span>এডমিন লগইন</span>
            </Button>
            <Button type="button" onClick={() => handleQuickLogin("teacher")} className={`${styles.typeButton} ${styles.teacherBtn}`}>
              <MonitorPlay size={20} />
              <span>শিক্ষক লগইন</span>
            </Button>
          </div>
        </form>
        
        <div className={styles.footer}>
          <p className={styles.forgotPassword} onClick={() => toast.info("ডিফল্ট পাসওয়ার্ড হলো 123456")}>পাসওয়ার্ড ভুলে গেছেন?</p>
          <Link href="/register" className={styles.registerLink}>রেজিস্ট্রেশন করুন</Link>
        </div>
      </div>
    </section>
  )
}
