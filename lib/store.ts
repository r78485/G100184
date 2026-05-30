"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Student {
  id: string
  name: string
  nameEn: string
  fatherName: string
  motherName: string
  guardianPhone: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  religion: string
  nationality: string
  nidOrBirthCert: string
  address: string
  classId: string
  section: string
  roll: number
  registrationNo: string
  admissionDate: string
  previousSchool: string
  photo: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Employee {
  id: string
  name: string
  nameEn: string
  designation: string
  department: string
  phone: string
  email: string
  nid: string
  dateOfBirth: string
  joiningDate: string
  salary: number
  address: string
  photo: string
  status: 'active' | 'inactive'
  password?: string
  createdAt: string
}

export interface ClassInfo {
  id: string
  name: string
  section: string
  capacity: number
  classTeacherId: string
}

export interface Subject {
  id: string
  name: string
  code: string
  classId: string
  teacherId: string
  type: 'compulsory' | 'optional'
}

export interface Attendance {
  id: string
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late' | 'leave'
  remarks: string
}

export interface Fee {
  id: string
  studentId: string
  type: string
  amount: number
  dueDate: string
  paidDate: string | null
  status: 'paid' | 'unpaid' | 'partial'
  paidAmount: number
  paymentMethod: string
  transactionId: string
}

export interface LeaveApplication {
  id: string
  applicantId: string
  applicantType: 'student' | 'employee'
  applicantName: string
  startDate: string
  endDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  appliedDate: string
  approvedBy: string
}

export interface TimetableSlot {
  id: string
  classId: string
  day: string
  period: number
  startTime: string
  endTime: string
  subjectId: string
  teacherId: string
}

export interface Question {
  id: string
  subjectId: string
  classId: string
  chapter: string
  type: 'mcq' | 'short' | 'descriptive'
  question: string
  options: string[]
  correctAnswer: string
  marks: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Exam {
  id: string
  name: string
  classId: string
  subjectId: string
  date: string
  startTime: string
  duration: number
  totalMarks: number
  passingMarks: number
  type: 'term' | 'class-test' | 'final'
}

export interface Result {
  id: string
  studentId: string
  examId: string
  subjectId: string
  obtainedMarks: number
  grade: string
  gpa: number
}

export interface Certificate {
  id: string
  studentId: string
  type: 'character' | 'transfer' | 'testimonial' | 'jsc' | 'ssc'
  issueDate: string
  serialNo: string
  remarks: string
}

export interface Notice {
  id: string
  title: string
  content: string
  date: string
  category: string
  attachment: string
  isPublic: boolean
}

// General Settings Types
export interface InstituteProfile {
  name: string
  eiin: string
  establishedYear: string
  principalName: string
  phone: string
  email: string
  website: string
  address: string
  logo: string
}

export interface FeeParticular {
  id: string
  name: string
  description: string
  status: 'Active' | 'Inactive'
}

export interface FeeStructure {
  id: string
  classId: string
  feeParticularId: string
  amount: number
  frequency: string
  status: 'Active' | 'Inactive'
}

export interface AccountSetting {
  fullName: string
  phone: string
  email: string
  avatar: string
}

export interface DiscountType {
  id: string
  name: string
  type: string
  amount: number
  status: 'Active' | 'Inactive'
}

export interface AccountForFee {
  id: string
  name: string
  type: string
  number: string
  details: string
  status: 'Active' | 'Inactive'
}

export interface RuleRegulation {
  id: string
  title: string
  category: string
  content: string
  status: 'Published' | 'Draft'
}

export interface MarksGrading {
  id: string
  grade: string
  point: number
  minMark: number
  maxMark: number
  remarks: string
}

export interface ThemeLanguage {
  theme: 'light' | 'dark'
  language: 'bn' | 'en'
}

// Sample Data
const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'মোঃ রাফি আহমেদ',
    nameEn: 'Md. Rafi Ahmed',
    fatherName: 'মোঃ করিম উদ্দিন',
    motherName: 'মোসাঃ ফাতেমা বেগম',
    guardianPhone: '01712345678',
    dateOfBirth: '2010-05-15',
    gender: 'male',
    bloodGroup: 'B+',
    religion: 'Islam',
    nationality: 'Bangladeshi',
    nidOrBirthCert: '1234567890123',
    address: 'গ্রাম: নিশানবাড়িয়া, বরগুনা সদর',
    classId: '1',
    section: 'A',
    roll: 1,
    registrationNo: '2024001001',
    admissionDate: '2024-01-01',
    previousSchool: 'নিশানবাড়িয়া সরকারি প্রাথমিক বিদ্যালয়',
    photo: '',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'ফাতিমা আক্তার',
    nameEn: 'Fatima Akter',
    fatherName: 'মোঃ জহির উদ্দিন',
    motherName: 'মোসাঃ রহিমা খাতুন',
    guardianPhone: '01812345678',
    dateOfBirth: '2010-08-20',
    gender: 'female',
    bloodGroup: 'A+',
    religion: 'Islam',
    nationality: 'Bangladeshi',
    nidOrBirthCert: '1234567890124',
    address: 'গ্রাম: আংগারজুর, বরগুনা সদর',
    classId: '1',
    section: 'A',
    roll: 2,
    registrationNo: '2024001002',
    admissionDate: '2024-01-01',
    previousSchool: 'আংগারজুর সরকারি প্রাথমিক বিদ্যালয়',
    photo: '',
    status: 'active',
    createdAt: '2024-01-01'
  }
]

const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'মোঃ আব্দুল করিম',
    nameEn: 'Md. Abdul Karim',
    designation: 'প্রধান শিক্ষক',
    department: 'Administration',
    phone: '01912345678',
    email: 'headmaster@school.edu.bd',
    nid: '1234567890',
    dateOfBirth: '1975-03-10',
    joiningDate: '2005-01-01',
    salary: 50000,
    address: 'বরগুনা সদর',
    photo: '',
    status: 'active',
    createdAt: '2005-01-01'
  },
  {
    id: '2',
    name: 'মোসাঃ নাজমা বেগম',
    nameEn: 'Most. Nazma Begum',
    designation: 'সহকারী শিক্ষক',
    department: 'Science',
    phone: '01612345678',
    email: 'nazma@school.edu.bd',
    nid: '1234567891',
    dateOfBirth: '1985-07-25',
    joiningDate: '2010-07-01',
    salary: 35000,
    address: 'বরগুনা সদর',
    photo: '',
    status: 'active',
    createdAt: '2010-07-01'
  }
]

const sampleClasses: ClassInfo[] = [
  { id: '1', name: 'ষষ্ঠ শ্রেণি', section: 'A', capacity: 40, classTeacherId: '2' },
  { id: '2', name: 'ষষ্ঠ শ্রেণি', section: 'B', capacity: 40, classTeacherId: '2' },
  { id: '3', name: 'সপ্তম শ্রেণি', section: 'A', capacity: 40, classTeacherId: '2' },
  { id: '4', name: 'অষ্টম শ্রেণি', section: 'A', capacity: 40, classTeacherId: '2' },
  { id: '5', name: 'নবম শ্রেণি', section: 'A', capacity: 40, classTeacherId: '1' },
  { id: '6', name: 'দশম শ্রেণি', section: 'A', capacity: 40, classTeacherId: '1' },
]

const sampleSubjects: Subject[] = [
  { id: '1', name: 'বাংলা', code: 'BAN101', classId: '1', teacherId: '2', type: 'compulsory' },
  { id: '2', name: 'English', code: 'ENG101', classId: '1', teacherId: '2', type: 'compulsory' },
  { id: '3', name: 'গণিত', code: 'MAT101', classId: '1', teacherId: '1', type: 'compulsory' },
  { id: '4', name: 'বিজ্ঞান', code: 'SCI101', classId: '1', teacherId: '2', type: 'compulsory' },
  { id: '5', name: 'সমাজ বিজ্ঞান', code: 'SOC101', classId: '1', teacherId: '2', type: 'compulsory' },
  { id: '6', name: 'ধর্ম', code: 'REL101', classId: '1', teacherId: '2', type: 'compulsory' },
  { id: '7', name: 'তথ্য ও যোগাযোগ প্রযুক্তি', code: 'ICT101', classId: '1', teacherId: '1', type: 'compulsory' },
]

const sampleQuestions: Question[] = [
  {
    id: '1',
    subjectId: '1',
    classId: '1',
    chapter: 'অধ্যায় ১',
    type: 'mcq',
    question: 'বাংলা ভাষার জন্ম কোন ভাষা থেকে?',
    options: ['সংস্কৃত', 'প্রাকৃত', 'পালি', 'মাগধী প্রাকৃত'],
    correctAnswer: 'মাগধী প্রাকৃত',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: '2',
    subjectId: '3',
    classId: '1',
    chapter: 'অধ্যায় ১',
    type: 'mcq',
    question: '২ + ২ = ?',
    options: ['৩', '৪', '৫', '৬'],
    correctAnswer: '৪',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: '3',
    subjectId: '1',
    classId: '1',
    chapter: 'অধ্যায় ২',
    type: 'short',
    question: 'বাংলা সাহিত্যের প্রাচীনতম নিদর্শন কী?',
    options: [],
    correctAnswer: 'চর্যাপদ',
    marks: 2,
    difficulty: 'medium'
  },
  {
    id: '4',
    subjectId: '3',
    classId: '1',
    chapter: 'অধ্যায় ৩',
    type: 'descriptive',
    question: 'পিথাগোরাসের উপপাদ্য ব্যাখ্যা কর এবং একটি উদাহরণ দাও।',
    options: [],
    correctAnswer: '',
    marks: 5,
    difficulty: 'hard'
  }
]

// Settings Sample Data
const initialInstituteProfile: InstituteProfile = {
  name: "GHJS High School",
  eiin: "123456",
  establishedYear: "1995",
  principalName: "মোঃ আব্দুর রহমান",
  phone: "+880 1711-123456",
  email: "info@ghjs.edu.bd",
  website: "https://www.ghjs.edu.bd",
  address: "স্কুল রোড, ধানমন্ডি, ঢাকা, বাংলাদেশ",
  logo: ""
}

const initialFeeParticulars: FeeParticular[] = [
  { id: '1', name: "Tuition Fee", description: "Monthly tuition fee", status: "Active" },
  { id: '2', name: "Admission Fee", description: "One-time admission fee", status: "Active" },
]

const initialAccountSetting: AccountSetting = {
  fullName: "Super Admin",
  phone: "+880 1711-000000",
  email: "admin@ghjs.edu.bd",
  avatar: ""
}

const initialDiscountTypes: DiscountType[] = [
  { id: '1', name: "Siblings Discount", type: "Percentage", amount: 50, status: "Active" },
  { id: '2', name: "Merit Scholarship", type: "Percentage", amount: 100, status: "Active" },
  { id: '3', name: "Employee Child", type: "Fixed Amount", amount: 500, status: "Active" }
]

const initialAccountsForFees: AccountForFee[] = [
  { id: '1', name: "Main Bank Account", type: "Bank Account", number: "192.100.83849", details: "DBBL, Main Branch", status: "Active" },
  { id: '2', name: "School bKash Agent", type: "Mobile Banking (bKash/Nagad)", number: "+880 1711-000000", details: "Merchant Account", status: "Active" }
]

const initialRulesRegulations: RuleRegulation[] = [
  { id: '1', title: "উপস্থিতি (Attendance)", category: "Attendance", content: "শিক্ষার্থীদের অবশ্যই সকাল ৮:০০ টার মধ্যে স্কুলে উপস্থিত হতে হবে।", status: "Published" },
  { id: '2', title: "স্কুল ইউনিফর্ম (School Uniform)", category: "Uniform", content: "সকল শিক্ষার্থীকে নির্ধারিত স্কুল ইউনিফর্ম পরিধান করতে হবে।", status: "Published" }
]

const initialMarksGradings: MarksGrading[] = [
  { id: '1', grade: "A+", point: 5.0, minMark: 80, maxMark: 100, remarks: "Excellent" },
  { id: '2', grade: "A", point: 4.0, minMark: 70, maxMark: 79, remarks: "Good" },
  { id: '3', grade: "A-", point: 3.5, minMark: 60, maxMark: 69, remarks: "Satisfactory" },
  { id: '4', grade: "B", point: 3.0, minMark: 50, maxMark: 59, remarks: "Average" },
  { id: '5', grade: "C", point: 2.0, minMark: 40, maxMark: 49, remarks: "Below Average" },
  { id: '6', grade: "D", point: 1.0, minMark: 33, maxMark: 39, remarks: "Pass" },
  { id: '7', grade: "F", point: 0.0, minMark: 0, maxMark: 32, remarks: "Fail" }
]

interface SchoolStore {
  // Data
  students: Student[]
  employees: Employee[]
  classes: ClassInfo[]
  subjects: Subject[]
  attendance: Attendance[]
  fees: Fee[]
  leaveApplications: LeaveApplication[]
  timetable: TimetableSlot[]
  questions: Question[]
  exams: Exam[]
  results: Result[]
  certificates: Certificate[]
  notices: Notice[]
  
  // General Settings
  instituteProfile: InstituteProfile
  feeParticulars: FeeParticular[]
  feeStructures: FeeStructure[]
  discountTypes: DiscountType[]
  accountsForFees: AccountForFee[]
  rulesRegulations: RuleRegulation[]
  marksGradings: MarksGrading[]
  themeLanguage: ThemeLanguage
  accountSetting: AccountSetting
  
  // Student Actions
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void
  updateStudent: (id: string, student: Partial<Student>) => void
  deleteStudent: (id: string) => void
  
  // Employee Actions
  addEmployee: (employee: Omit<Employee, 'id' | 'createdAt'>) => void
  updateEmployee: (id: string, employee: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
  
  // Class Actions
  addClass: (classInfo: Omit<ClassInfo, 'id'>) => void
  updateClass: (id: string, classInfo: Partial<ClassInfo>) => void
  deleteClass: (id: string) => void
  
  // Subject Actions
  addSubject: (subject: Omit<Subject, 'id'>) => void
  updateSubject: (id: string, subject: Partial<Subject>) => void
  deleteSubject: (id: string) => void
  
  // Attendance Actions
  markAttendance: (attendance: Omit<Attendance, 'id'>) => void
  updateAttendance: (id: string, attendance: Partial<Attendance>) => void
  
  // Fee Actions
  addFee: (fee: Omit<Fee, 'id'>) => void
  updateFee: (id: string, fee: Partial<Fee>) => void
  payFee: (id: string, amount: number, method: string, transactionId: string) => void
  
  // Leave Application Actions
  addLeaveApplication: (leave: Omit<LeaveApplication, 'id' | 'appliedDate' | 'status' | 'approvedBy'>) => void
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected', approvedBy: string) => void
  
  // Timetable Actions
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => void
  updateTimetableSlot: (id: string, slot: Partial<TimetableSlot>) => void
  deleteTimetableSlot: (id: string) => void
  
  // Question Bank Actions
  addQuestion: (question: Omit<Question, 'id'>) => void
  updateQuestion: (id: string, question: Partial<Question>) => void
  deleteQuestion: (id: string) => void
  
  // Exam Actions
  addExam: (exam: Omit<Exam, 'id'>) => void
  updateExam: (id: string, exam: Partial<Exam>) => void
  deleteExam: (id: string) => void
  
  // Result Actions
  addResult: (result: Omit<Result, 'id'>) => void
  updateResult: (id: string, result: Partial<Result>) => void
  
  // Certificate Actions
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void
  
  // Notice Actions
  addNotice: (notice: Omit<Notice, 'id'>) => void
  updateNotice: (id: string, notice: Partial<Notice>) => void
  deleteNotice: (id: string) => void

  // General Settings Actions
  updateInstituteProfile: (profile: Partial<InstituteProfile>) => void
  
  addFeeParticular: (particular: Omit<FeeParticular, 'id'>) => void
  updateFeeParticular: (id: string, particular: Partial<FeeParticular>) => void
  deleteFeeParticular: (id: string) => void
  
  addFeeStructure: (structure: Omit<FeeStructure, 'id'>) => void
  updateFeeStructure: (id: string, structure: Partial<FeeStructure>) => void
  deleteFeeStructure: (id: string) => void
  
  addDiscountType: (discount: Omit<DiscountType, 'id'>) => void
  updateDiscountType: (id: string, discount: Partial<DiscountType>) => void
  deleteDiscountType: (id: string) => void
  
  addAccountForFee: (account: Omit<AccountForFee, 'id'>) => void
  updateAccountForFee: (id: string, account: Partial<AccountForFee>) => void
  deleteAccountForFee: (id: string) => void
  
  updateAccountSetting: (setting: Partial<AccountSetting>) => void
  
  addRuleRegulation: (rule: Omit<RuleRegulation, 'id'>) => void
  updateRuleRegulation: (id: string, rule: Partial<RuleRegulation>) => void
  deleteRuleRegulation: (id: string) => void
  
  addMarksGrading: (grading: Omit<MarksGrading, 'id'>) => void
  updateMarksGrading: (id: string, grading: Partial<MarksGrading>) => void
  deleteMarksGrading: (id: string) => void
  
  updateThemeLanguage: (themeLang: Partial<ThemeLanguage>) => void
}

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set) => ({
      // Initial Data
      students: sampleStudents,
      employees: sampleEmployees,
      classes: sampleClasses,
      subjects: sampleSubjects,
      attendance: [],
      fees: [],
      leaveApplications: [],
      timetable: [],
      questions: sampleQuestions,
      exams: [],
      results: [],
      certificates: [],
      notices: [],
      
      // General Settings Initial Data
      instituteProfile: initialInstituteProfile,
      feeParticulars: initialFeeParticulars,
      feeStructures: [],
      discountTypes: initialDiscountTypes,
      accountsForFees: initialAccountsForFees,
      rulesRegulations: initialRulesRegulations,
      marksGradings: initialMarksGradings,
      themeLanguage: { theme: 'light', language: 'bn' },
      accountSetting: initialAccountSetting,
      
      // Student Actions
      addStudent: (student) => set((state) => ({
        students: [...state.students, { ...student, id: generateId(), createdAt: new Date().toISOString() }]
      })),
      updateStudent: (id, student) => set((state) => ({
        students: state.students.map((s) => s.id === id ? { ...s, ...student } : s)
      })),
      deleteStudent: (id) => set((state) => ({
        students: state.students.filter((s) => s.id !== id)
      })),
      
      // Employee Actions
      addEmployee: (employee) => set((state) => ({
        employees: [...state.employees, { ...employee, id: generateId(), createdAt: new Date().toISOString() }]
      })),
      updateEmployee: (id, employee) => set((state) => ({
        employees: state.employees.map((e) => e.id === id ? { ...e, ...employee } : e)
      })),
      deleteEmployee: (id) => set((state) => ({
        employees: state.employees.filter((e) => e.id !== id)
      })),
      
      // Class Actions
      addClass: (classInfo) => set((state) => ({
        classes: [...state.classes, { ...classInfo, id: generateId() }]
      })),
      updateClass: (id, classInfo) => set((state) => ({
        classes: state.classes.map((c) => c.id === id ? { ...c, ...classInfo } : c)
      })),
      deleteClass: (id) => set((state) => ({
        classes: state.classes.filter((c) => c.id !== id)
      })),
      
      // Subject Actions
      addSubject: (subject) => set((state) => ({
        subjects: [...state.subjects, { ...subject, id: generateId() }]
      })),
      updateSubject: (id, subject) => set((state) => ({
        subjects: state.subjects.map((s) => s.id === id ? { ...s, ...subject } : s)
      })),
      deleteSubject: (id) => set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id)
      })),
      
      // Attendance Actions
      markAttendance: (attendance) => set((state) => ({
        attendance: [...state.attendance, { ...attendance, id: generateId() }]
      })),
      updateAttendance: (id, attendance) => set((state) => ({
        attendance: state.attendance.map((a) => a.id === id ? { ...a, ...attendance } : a)
      })),
      
      // Fee Actions
      addFee: (fee) => set((state) => ({
        fees: [...state.fees, { ...fee, id: generateId() }]
      })),
      updateFee: (id, fee) => set((state) => ({
        fees: state.fees.map((f) => f.id === id ? { ...f, ...fee } : f)
      })),
      payFee: (id, amount, method, transactionId) => set((state) => ({
        fees: state.fees.map((f) => {
          if (f.id === id) {
            const newPaidAmount = f.paidAmount + amount
            const status = newPaidAmount >= f.amount ? 'paid' : 'partial'
            return { ...f, paidAmount: newPaidAmount, status, paidDate: new Date().toISOString(), paymentMethod: method, transactionId }
          }
          return f
        })
      })),
      
      // Leave Application Actions
      addLeaveApplication: (leave) => set((state) => ({
        leaveApplications: [...state.leaveApplications, { ...leave, id: generateId(), appliedDate: new Date().toISOString(), status: 'pending', approvedBy: '' }]
      })),
      updateLeaveStatus: (id, status, approvedBy) => set((state) => ({
        leaveApplications: state.leaveApplications.map((l) => l.id === id ? { ...l, status, approvedBy } : l)
      })),
      
      // Timetable Actions
      addTimetableSlot: (slot) => set((state) => ({
        timetable: [...state.timetable, { ...slot, id: generateId() }]
      })),
      updateTimetableSlot: (id, slot) => set((state) => ({
        timetable: state.timetable.map((t) => t.id === id ? { ...t, ...slot } : t)
      })),
      deleteTimetableSlot: (id) => set((state) => ({
        timetable: state.timetable.filter((t) => t.id !== id)
      })),
      
      // Question Bank Actions
      addQuestion: (question) => set((state) => ({
        questions: [...state.questions, { ...question, id: generateId() }]
      })),
      updateQuestion: (id, question) => set((state) => ({
        questions: state.questions.map((q) => q.id === id ? { ...q, ...question } : q)
      })),
      deleteQuestion: (id) => set((state) => ({
        questions: state.questions.filter((q) => q.id !== id)
      })),
      
      // Exam Actions
      addExam: (exam) => set((state) => ({
        exams: [...state.exams, { ...exam, id: generateId() }]
      })),
      updateExam: (id, exam) => set((state) => ({
        exams: state.exams.map((e) => e.id === id ? { ...e, ...exam } : e)
      })),
      deleteExam: (id) => set((state) => ({
        exams: state.exams.filter((e) => e.id !== id)
      })),
      
      // Result Actions
      addResult: (result) => set((state) => ({
        results: [...state.results, { ...result, id: generateId() }]
      })),
      updateResult: (id, result) => set((state) => ({
        results: state.results.map((r) => r.id === id ? { ...r, ...result } : r)
      })),
      
      // Certificate Actions
      addCertificate: (certificate) => set((state) => ({
        certificates: [...state.certificates, { ...certificate, id: generateId() }]
      })),
      
      // Notice Actions
      addNotice: (notice) => set((state) => ({
        notices: [...state.notices, { ...notice, id: generateId() }]
      })),
      updateNotice: (id, notice) => set((state) => ({
        notices: state.notices.map((n) => n.id === id ? { ...n, ...notice } : n)
      })),
      deleteNotice: (id) => set((state) => ({
        notices: state.notices.filter((n) => n.id !== id)
      })),
      
      // General Settings Actions
      updateInstituteProfile: (profile) => set((state) => ({
        instituteProfile: { ...state.instituteProfile, ...profile }
      })),
      
      addFeeParticular: (particular) => set((state) => ({
        feeParticulars: [...state.feeParticulars, { ...particular, id: generateId() }]
      })),
      updateFeeParticular: (id, particular) => set((state) => ({
        feeParticulars: state.feeParticulars.map(p => p.id === id ? { ...p, ...particular } : p)
      })),
      deleteFeeParticular: (id) => set((state) => ({
        feeParticulars: state.feeParticulars.filter(p => p.id !== id)
      })),
      
      addFeeStructure: (structure) => set((state) => ({
        feeStructures: [...state.feeStructures, { ...structure, id: generateId() }]
      })),
      updateFeeStructure: (id, structure) => set((state) => ({
        feeStructures: state.feeStructures.map(s => s.id === id ? { ...s, ...structure } : s)
      })),
      deleteFeeStructure: (id) => set((state) => ({
        feeStructures: state.feeStructures.filter(s => s.id !== id)
      })),
      
      addDiscountType: (discount) => set((state) => ({
        discountTypes: [...state.discountTypes, { ...discount, id: generateId() }]
      })),
      updateDiscountType: (id, discount) => set((state) => ({
        discountTypes: state.discountTypes.map(d => d.id === id ? { ...d, ...discount } : d)
      })),
      deleteDiscountType: (id) => set((state) => ({
        discountTypes: state.discountTypes.filter(d => d.id !== id)
      })),
      
      addAccountForFee: (account) => set((state) => ({
        accountsForFees: [...state.accountsForFees, { ...account, id: generateId() }]
      })),
      updateAccountForFee: (id, account) => set((state) => ({
        accountsForFees: state.accountsForFees.map(a => a.id === id ? { ...a, ...account } : a)
      })),
      deleteAccountForFee: (id) => set((state) => ({
        accountsForFees: state.accountsForFees.filter(a => a.id !== id)
      })),
      
      updateAccountSetting: (setting) => set((state) => ({
        accountSetting: { ...state.accountSetting, ...setting }
      })),
      
      addRuleRegulation: (rule) => set((state) => ({
        rulesRegulations: [...state.rulesRegulations, { ...rule, id: generateId() }]
      })),
      updateRuleRegulation: (id, rule) => set((state) => ({
        rulesRegulations: state.rulesRegulations.map(r => r.id === id ? { ...r, ...rule } : r)
      })),
      deleteRuleRegulation: (id) => set((state) => ({
        rulesRegulations: state.rulesRegulations.filter(r => r.id !== id)
      })),
      
      addMarksGrading: (grading) => set((state) => ({
        marksGradings: [...state.marksGradings, { ...grading, id: generateId() }]
      })),
      updateMarksGrading: (id, grading) => set((state) => ({
        marksGradings: state.marksGradings.map(g => g.id === id ? { ...g, ...grading } : g)
      })),
      deleteMarksGrading: (id) => set((state) => ({
        marksGradings: state.marksGradings.filter(g => g.id !== id)
      })),
      
      updateThemeLanguage: (themeLang) => set((state) => ({
        themeLanguage: { ...state.themeLanguage, ...themeLang }
      })),
    }),
    {
      name: 'school-management-store',
    }
  )
)
