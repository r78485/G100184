import { useSchoolStore } from "@/lib/store"

type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

export const translations: Translations = {
  en: {
    // Sidebar Main Menus
    "Dashboard": "Dashboard",
    "General Settings": "General Settings",
    "Classes": "Classes",
    "Subjects": "Subjects",
    "Students": "Students",
    "Employees": "Employees",
    "Accounts": "Accounts",
    "Fees": "Fees",
    "Salary": "Salary",
    "Attendance": "Attendance",
    "Timetable": "Timetable",
    "Homework": "Homework",
    "Behaviour & Skills": "Behaviour & Skills",
    "Online Store & POS": "Online Store & POS",
    "WhatsApp": "WhatsApp",
    "Messaging": "Messaging",
    "SMS Services": "SMS Services",
    "Live Class": "Live Class",
    "Question Paper": "Question Paper",
    "Exams": "Exams",
    "Class Tests": "Class Tests",
    "Reports": "Reports",

    // Sidebar Sub Menus - Settings
    "Institute Profile": "Institute Profile",
    "Fees Particulars": "Fees Particulars",
    "Fees Structure": "Fees Structure",
    "Discount Type": "Discount Type",
    "Accounts For Fees": "Accounts For Fees",
    "Rules & Regulations": "Rules & Regulations",
    "Marks Grading": "Marks Grading",
    "Theme & Language": "Theme & Language",
    "Account Settings": "Account Settings",
    
    // Theme Page
    "Customize system language and theme": "Customize system language and theme",
    "Theme": "Theme",
    "Change the system color scheme": "Change the system color scheme",
    "Light": "Light",
    "Dark": "Dark",
    "System": "System",
    "Language": "Language",
    "Select system default language": "Select system default language",
    "Save Changes": "Save Changes",
    
    // Account Settings Page
    "Manage your personal profile and security settings": "Manage your personal profile and security settings",
    "Profile Information": "Profile Information",
    "Update your personal information": "Update your personal information",
    "Change Photo": "Change Photo",
    "Full Name": "Full Name",
    "Phone Number": "Phone Number",
    "Email Address": "Email Address",
    "Save Profile": "Save Profile",
    "Change Password": "Change Password",
    "Keep your account secure": "Keep your account secure",
    "Current Password": "Current Password",
    "New Password": "New Password",
    "Confirm Password": "Confirm Password",
    "Update Password": "Update Password",
    
    // Dashboard Page
    "Welcome to School Management System": "Welcome to School Management System",
    "Total Students": "Total Students",
    "Total Classes": "Total Classes",
    "Teachers/Staff": "Teachers/Staff",
    "This Month's Income": "This Month's Income",
    "Today's Attendance": "Today's Attendance",
    "Total Subjects": "Total Subjects",
    "Weekly Attendance": "Weekly Attendance",
    "Weekly Attendance Overview": "Weekly Attendance Overview",
    "Fee Collection": "Fee Collection",
    "Monthly Revenue Overview": "Monthly Revenue Overview",
    "Recent Activities": "Recent Activities",
    "Upcoming Events": "Upcoming Events",
    "View All": "View All",
    "Present": "Present",
    "Absent": "Absent",

    // Sidebar Sub Menus - Students
    "All Students": "All Students",
    "Add New": "Add New",
    "Manage Families": "Manage Families",
    "Active / Inactive": "Active / Inactive",
    "Admission Letter": "Admission Letter",
    "Student ID Cards": "Student ID Cards",
    "Print Basic List": "Print Basic List",
    "Manage Login": "Manage Login",
    "Promote Student": "Promote Student",

    // Sidebar Sub Menus - Employees
    "All Employees": "All Employees",
    "Staff ID Cards": "Staff ID Cards",
    "Job Letter": "Job Letter",

    // Common
    "Collapse": "Collapse",
    "Search placeholder": "Search students, classes, reports...",
    "My Account": "My Account",
    "Profile": "Profile",
    "Settings": "Settings",
    "Logout": "Logout",
    "Administrator": "Administrator"
  },
  bn: {
    // Sidebar Main Menus
    "Dashboard": "ড্যাশবোর্ড",
    "General Settings": "জেনারেল সেটিংস",
    "Classes": "ক্লাস",
    "Subjects": "বিষয়সমূহ",
    "Students": "শিক্ষার্থী",
    "Employees": "কর্মচারী",
    "Accounts": "হিসাবরক্ষণ",
    "Fees": "ফি / বেতন",
    "Salary": "বেতন ভাতা",
    "Attendance": "উপস্থিতি",
    "Timetable": "রুটিন",
    "Homework": "হোমওয়ার্ক",
    "Behaviour & Skills": "আচরণ ও দক্ষতা",
    "Online Store & POS": "অনলাইন স্টোর ও পস",
    "WhatsApp": "হোয়াটসঅ্যাপ",
    "Messaging": "মেসেজিং",
    "SMS Services": "এসএমএস সার্ভিস",
    "Live Class": "লাইভ ক্লাস",
    "Question Paper": "প্রশ্নপত্র",
    "Exams": "পরীক্ষা",
    "Class Tests": "ক্লাস টেস্ট",
    "Reports": "রিপোর্টস",

    // Sidebar Sub Menus - Settings
    "Institute Profile": "প্রতিষ্ঠান প্রোফাইল",
    "Fees Particulars": "ফি খাতসমূহ",
    "Fees Structure": "ফি কাঠামো",
    "Discount Type": "ডিসকাউন্টের ধরন",
    "Accounts For Fees": "ফি অ্যাকাউন্টস",
    "Rules & Regulations": "নিয়ম ও কানুন",
    "Marks Grading": "মার্কস গ্রেডিং",
    "Theme & Language": "থিম ও ভাষা",
    "Account Settings": "অ্যাকাউন্ট সেটিংস",
    
    // Theme Page
    "Customize system language and theme": "সিস্টেমের ভাষা এবং থিম কাস্টমাইজ করুন",
    "Theme": "থিম (Theme)",
    "Change the system color scheme": "সিস্টেমের কালার স্কিম পরিবর্তন করুন",
    "Light": "Light",
    "Dark": "Dark",
    "System": "System",
    "Language": "ভাষা (Language)",
    "Select system default language": "সিস্টেমের ডিফল্ট ভাষা নির্বাচন করুন",
    "Save Changes": "পরিবর্তন সেভ করুন",
    
    // Account Settings Page
    "Manage your personal profile and security settings": "আপনার নিজের প্রোফাইল এবং সিকিউরিটি সেটিংস পরিচালনা করুন",
    "Profile Information": "প্রোফাইল তথ্য",
    "Update your personal information": "আপনার ব্যক্তিগত তথ্য আপডেট করুন",
    "Change Photo": "ছবি পরিবর্তন করুন",
    "Full Name": "সম্পূর্ণ নাম",
    "Phone Number": "ফোন নম্বর",
    "Email Address": "ইমেইল এড্রেস",
    "Save Profile": "প্রোফাইল সেভ করুন",
    "Change Password": "পাসওয়ার্ড পরিবর্তন",
    "Keep your account secure": "আপনার একাউন্ট সুরক্ষিত রাখুন",
    "Current Password": "বর্তমান পাসওয়ার্ড",
    "New Password": "নতুন পাসওয়ার্ড",
    "Confirm Password": "পাসওয়ার্ড নিশ্চিত করুন",
    "Update Password": "পাসওয়ার্ড আপডেট করুন",
    
    // Dashboard Page
    "Welcome to School Management System": "স্কুল ম্যানেজমেন্ট সিস্টেমে স্বাগতম",
    "Total Students": "মোট ছাত্রছাত্রী",
    "Total Classes": "মোট ক্লাস",
    "Teachers/Staff": "শিক্ষক/কর্মচারী",
    "This Month's Income": "এই মাসের আয়",
    "Today's Attendance": "আজকের উপস্থিতি",
    "Total Subjects": "মোট বিষয়",
    "Weekly Attendance": "সাপ্তাহিক উপস্থিতি",
    "Weekly Attendance Overview": "সাপ্তাহিক উপস্থিতির সারসংক্ষেপ",
    "Fee Collection": "ফি কালেকশন",
    "Monthly Revenue Overview": "মাসিক আয়ের সারসংক্ষেপ",
    "Recent Activities": "সাম্প্রতিক কার্যক্রম",
    "Upcoming Events": "আসন্ন ইভেন্টসমূহ",
    "View All": "সব দেখুন",
    "Present": "উপস্থিত",
    "Absent": "অনুপস্থিত",

    // Sidebar Sub Menus - Students
    "All Students": "সকল শিক্ষার্থী",
    "Add New": "নতুন যোগ করুন",
    "Manage Families": "পরিবার পরিচালনা",
    "Active / Inactive": "সক্রিয় / নিষ্ক্রিয়",
    "Admission Letter": "ভর্তি পত্র",
    "Student ID Cards": "শিক্ষার্থী আইডি কার্ড",
    "Print Basic List": "প্রাথমিক তালিকা প্রিন্ট",
    "Manage Login": "লগইন পরিচালনা",
    "Promote Student": "শিক্ষার্থী প্রমোশন",

    // Sidebar Sub Menus - Employees
    "All Employees": "সকল কর্মচারী",
    "Staff ID Cards": "স্টাফ আইডি কার্ড",
    "Job Letter": "চাকরি পত্র",

    // Common
    "Collapse": "গুটিয়ে নিন",
    "Search placeholder": "শিক্ষার্থী, ক্লাস, রিপোর্ট খুঁজুন...",
    "My Account": "আমার অ্যাকাউন্ট",
    "Profile": "প্রোফাইল",
    "Settings": "সেটিংস",
    "Logout": "লগআউট",
    "Administrator": "অ্যাডমিনিস্ট্রেটর"
  }
}

export function useTranslation() {
  const themeLanguage = useSchoolStore((state) => state.themeLanguage)
  // themeLanguage?.language might be 'en' or 'bn'
  const lang = themeLanguage?.language || 'bn'

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key
  }

  return { t, lang }
}
