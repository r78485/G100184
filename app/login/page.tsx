"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, EyeOff, GraduationCap, Users, MonitorPlay } from "lucide-react"
import styles from "./login.module.css"

export default function LoginPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
           {/* You might need to update this path to the correct logo later */}
          <Image src="/images/logo.png" alt="School Logo" width={80} height={80} className={styles.logo} />
        </div>
        <div className={styles.titles}>
          <h1 className={styles.bengaliTitle}>গাজী মাহমুদ নিম্ন মাধ্যমিক বিদ্যালয়</h1>
          <h2 className={styles.englishTitle}>Gazi Mahmud Lower Secondary School</h2>
          <h3 className={styles.softwareTitle}>স্কুল ম্যানেজমেন্ট সফটওয়্যার</h3>
        </div>

        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <div className={styles.inputGroup}>
             <User className={styles.inputIcon} size={20} />
             <Input type="text" placeholder="ব্যবহারকারীর নাম\nUsername / Email" className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
             <Lock className={styles.inputIcon} size={20} />
             <Input type="password" placeholder="পাসওয়ার্ড" className={styles.input} required />
             <EyeOff className={styles.inputIconRight} size={20} />
          </div>
          
          <div className={styles.loginTypes}>
            <Button type="button" className={`${styles.typeButton} ${styles.studentBtn}`}>
               <GraduationCap size={20} />
               <span>ছাত্র লগইন</span>
            </Button>
            <Button type="button" className={`${styles.typeButton} ${styles.adminBtn}`}>
               <Users size={20} />
               <span>এডমিন লগইন</span>
            </Button>
            <Button type="button" className={`${styles.typeButton} ${styles.teacherBtn}`}>
               <MonitorPlay size={20} />
               <span>শিক্ষক লগইন</span>
            </Button>
          </div>
        </form>
        
        <div className={styles.footer}>
          <p className={styles.forgotPassword}>পাসওয়ার্ড ভুলে গেছেন?</p>
          <Link href="/register" className={styles.registerLink}>রেজিস্ট্রেশন করুন</Link>
        </div>
      </div>
    </section>
  )
}
