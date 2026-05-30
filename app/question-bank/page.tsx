"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSchoolStore } from "@/lib/store"
import {
  Plus,
  Search,
  FileText,
  BookOpen,
  Edit,
  Trash2,
  Download,
  Printer,
  Copy,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function QuestionBankPage() {
  const { classes, subjects, questionBank, addQuestion, updateQuestion, deleteQuestion } = useSchoolStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("questions")

  const [formData, setFormData] = useState({
    classId: "",
    subjectId: "",
    type: "mcq" as "mcq" | "short" | "long" | "fill",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 1,
    chapter: "",
    difficulty: "medium" as "easy" | "medium" | "hard",
  })

  const resetForm = () => {
    setFormData({
      classId: "",
      subjectId: "",
      type: "mcq",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
      chapter: "",
      difficulty: "medium",
    })
    setEditingQuestion(null)
  }

  const handleSubmit = () => {
    if (editingQuestion) {
      updateQuestion(editingQuestion, formData)
    } else {
      addQuestion(formData)
    }
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = (questionId: string) => {
    const q = questionBank.find((q) => q.id === questionId)
    if (q) {
      setFormData({
        classId: q.classId,
        subjectId: q.subjectId,
        type: q.type,
        question: q.question,
        options: q.options || ["", "", "", ""],
        correctAnswer: q.correctAnswer,
        marks: q.marks,
        chapter: q.chapter,
        difficulty: q.difficulty,
      })
      setEditingQuestion(questionId)
      setIsAddOpen(true)
    }
  }

  const filteredQuestions = questionBank.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = !selectedClass || q.classId === selectedClass
    const matchesSubject = !selectedSubject || q.subjectId === selectedSubject
    const matchesType = !selectedType || q.type === selectedType
    return matchesSearch && matchesClass && matchesSubject && matchesType
  })

  const getClassName = (classId: string) => {
    const cls = classes.find((c) => c.id === classId)
    return cls ? `${cls.name}` : "N/A"
  }

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId)
    return subject?.name || "N/A"
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      mcq: "বহুনির্বাচনী",
      short: "সংক্ষিপ্ত",
      long: "রচনামূলক",
      fill: "শূন্যস্থান",
    }
    return types[type] || type
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    }
    const labels: Record<string, string> = {
      easy: "সহজ",
      medium: "মাঝারি",
      hard: "কঠিন",
    }
    return <Badge className={colors[difficulty]}>{labels[difficulty]}</Badge>
  }

  const stats = {
    total: questionBank.length,
    mcq: questionBank.filter((q) => q.type === "mcq").length,
    short: questionBank.filter((q) => q.type === "short").length,
    long: questionBank.filter((q) => q.type === "long").length,
    fill: questionBank.filter((q) => q.type === "fill").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">প্রশ্ন ব্যাংক</h1>
            <p className="text-muted-foreground">প্রশ্নপত্র তৈরি ও প্রশ্ন সংরক্ষণ</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                নতুন প্রশ্ন যুক্ত করুন
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingQuestion ? "প্রশ্ন সম্পাদনা" : "নতুন প্রশ্ন যুক্ত করুন"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>শ্রেণি</Label>
                    <Select
                      value={formData.classId}
                      onValueChange={(v) => setFormData({ ...formData, classId: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="শ্রেণি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name} ({cls.section})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>বিষয়</Label>
                    <Select
                      value={formData.subjectId}
                      onValueChange={(v) => setFormData({ ...formData, subjectId: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>প্রশ্নের ধরন</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) =>
                        setFormData({ ...formData, type: v as typeof formData.type })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">বহুনির্বাচনী (MCQ)</SelectItem>
                        <SelectItem value="short">সংক্ষিপ্ত প্রশ্ন</SelectItem>
                        <SelectItem value="long">রচনামূলক</SelectItem>
                        <SelectItem value="fill">শূন্যস্থান পূরণ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>নম্বর</Label>
                    <Input
                      type="number"
                      min={1}
                      value={formData.marks}
                      onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>কঠিনতা</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(v) =>
                        setFormData({ ...formData, difficulty: v as typeof formData.difficulty })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">সহজ</SelectItem>
                        <SelectItem value="medium">মাঝারি</SelectItem>
                        <SelectItem value="hard">কঠিন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>অধ্যায়/টপিক</Label>
                  <Input
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                    placeholder="যেমন: অধ্যায় ১ - বল"
                  />
                </div>

                <div className="space-y-2">
                  <Label>প্রশ্ন</Label>
                  <Textarea
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="এখানে প্রশ্ন লিখুন..."
                    rows={3}
                  />
                </div>

                {formData.type === "mcq" && (
                  <div className="space-y-3">
                    <Label>অপশনসমূহ</Label>
                    {formData.options.map((opt, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="w-6 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                        <Input
                          value={opt}
                          onChange={(e) => {
                            const newOptions = [...formData.options]
                            newOptions[idx] = e.target.value
                            setFormData({ ...formData, options: newOptions })
                          }}
                          placeholder={`অপশন ${String.fromCharCode(65 + idx)}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label>সঠিক উত্তর</Label>
                  {formData.type === "mcq" ? (
                    <Select
                      value={formData.correctAnswer}
                      onValueChange={(v) => setFormData({ ...formData, correctAnswer: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="সঠিক উত্তর নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.options.map((opt, idx) => (
                          <SelectItem key={idx} value={String.fromCharCode(65 + idx)}>
                            {String.fromCharCode(65 + idx)}. {opt || `অপশন ${String.fromCharCode(65 + idx)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Textarea
                      value={formData.correctAnswer}
                      onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                      placeholder="সঠিক উত্তর লিখুন..."
                      rows={2}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSubmit}>{editingQuestion ? "আপডেট করুন" : "যুক্ত করুন"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">মোট প্রশ্ন</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.mcq}</div>
              <div className="text-sm text-muted-foreground">বহুনির্বাচনী</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.short}</div>
              <div className="text-sm text-muted-foreground">সংক্ষিপ্ত</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.long}</div>
              <div className="text-sm text-muted-foreground">রচনামূলক</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.fill}</div>
              <div className="text-sm text-muted-foreground">শূন্যস্থান</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="questions">
              <BookOpen className="w-4 h-4 mr-2" />
              প্রশ্ন তালিকা
            </TabsTrigger>
            <TabsTrigger value="create-paper">
              <FileText className="w-4 h-4 mr-2" />
              প্রশ্নপত্র তৈরি
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="প্রশ্ন অনুসন্ধান করুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="সকল শ্রেণি" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">সকল শ্রেণি</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="সকল বিষয়" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">সকল বিষয়</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="সকল ধরন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">সকল ধরন</SelectItem>
                      <SelectItem value="mcq">বহুনির্বাচনী</SelectItem>
                      <SelectItem value="short">সংক্ষিপ্ত</SelectItem>
                      <SelectItem value="long">রচনামূলক</SelectItem>
                      <SelectItem value="fill">শূন্যস্থান</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>কোনো প্রশ্ন পাওয়া যায়নি</p>
                  </CardContent>
                </Card>
              ) : (
                filteredQuestions.map((q, index) => (
                  <Card key={q.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{getClassName(q.classId)}</Badge>
                            <Badge variant="secondary">{getSubjectName(q.subjectId)}</Badge>
                            <Badge>{getTypeLabel(q.type)}</Badge>
                            {getDifficultyBadge(q.difficulty)}
                            <Badge variant="outline">{q.marks} নম্বর</Badge>
                          </div>
                          <p className="font-medium mb-2">
                            {index + 1}. {q.question}
                          </p>
                          {q.type === "mcq" && q.options && (
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground ml-4">
                              {q.options.map((opt, idx) => (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-1 ${
                                    q.correctAnswer === String.fromCharCode(65 + idx)
                                      ? "text-green-600 font-medium"
                                      : ""
                                  }`}
                                >
                                  {q.correctAnswer === String.fromCharCode(65 + idx) ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <XCircle className="w-4 h-4 opacity-50" />
                                  )}
                                  {String.fromCharCode(65 + idx)}. {opt}
                                </div>
                              ))}
                            </div>
                          )}
                          {q.chapter && (
                            <p className="text-sm text-muted-foreground mt-2">অধ্যায়: {q.chapter}</p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(q.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => deleteQuestion(q.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="create-paper">
            <QuestionPaperCreator
              questions={questionBank}
              classes={classes}
              subjects={subjects}
              getClassName={getClassName}
              getSubjectName={getSubjectName}
              getTypeLabel={getTypeLabel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

interface QuestionPaperCreatorProps {
  questions: any[]
  classes: any[]
  subjects: any[]
  getClassName: (id: string) => string
  getSubjectName: (id: string) => string
  getTypeLabel: (type: string) => string
}

function QuestionPaperCreator({
  questions,
  classes,
  subjects,
  getClassName,
  getSubjectName,
  getTypeLabel,
}: QuestionPaperCreatorProps) {
  const [paperClass, setPaperClass] = useState("")
  const [paperSubject, setPaperSubject] = useState("")
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [paperTitle, setPaperTitle] = useState("")
  const [totalTime, setTotalTime] = useState(60)

  const filteredQuestions = questions.filter(
    (q) => (!paperClass || q.classId === paperClass) && (!paperSubject || q.subjectId === paperSubject)
  )

  const toggleQuestion = (qId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    )
  }

  const totalMarks = selectedQuestions.reduce((sum, qId) => {
    const q = questions.find((q) => q.id === qId)
    return sum + (q?.marks || 0)
  }, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Question Selection */}
      <Card>
        <CardHeader>
          <CardTitle>প্রশ্ন নির্বাচন করুন</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>শ্রেণি</Label>
              <Select value={paperClass} onValueChange={setPaperClass}>
                <SelectTrigger>
                  <SelectValue placeholder="শ্রেণি নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">সকল শ্রেণি</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>বিষয়</Label>
              <Select value={paperSubject} onValueChange={setPaperSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="বিষয় নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">সকল বিষয়</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg max-h-[400px] overflow-y-auto">
            {filteredQuestions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">কোনো প্রশ্ন পাওয়া যায়নি</div>
            ) : (
              filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className={`p-3 border-b last:border-0 cursor-pointer hover:bg-secondary/50 ${
                    selectedQuestions.includes(q.id) ? "bg-primary/10" : ""
                  }`}
                  onClick={() => toggleQuestion(q.id)}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => toggleQuestion(q.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{q.question}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(q.type)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {q.marks} নম্বর
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Paper Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>প্রশ্নপত্র প্রিভিউ</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-1" />
                প্রিন্ট
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>পরীক্ষার নাম</Label>
              <Input
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
                placeholder="যেমন: প্রথম সাময়িক পরীক্ষা"
              />
            </div>
            <div className="space-y-2">
              <Label>সময় (মিনিট)</Label>
              <Input
                type="number"
                value={totalTime}
                onChange={(e) => setTotalTime(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white min-h-[400px] print:border-0">
            <div className="text-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">নমুনা বিদ্যালয়</h2>
              <h3 className="text-lg font-semibold">{paperTitle || "পরীক্ষা"}</h3>
              {paperClass && <p>শ্রেণি: {getClassName(paperClass)}</p>}
              {paperSubject && <p>বিষয়: {getSubjectName(paperSubject)}</p>}
              <div className="flex justify-center gap-4 text-sm mt-2">
                <span>সময়: {totalTime} মিনিট</span>
                <span>পূর্ণমান: {totalMarks}</span>
              </div>
            </div>

            {selectedQuestions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                প্রশ্নপত্রে প্রশ্ন যুক্ত করতে বাম দিক থেকে প্রশ্ন নির্বাচন করুন
              </div>
            ) : (
              <div className="space-y-4">
                {selectedQuestions.map((qId, index) => {
                  const q = questions.find((q) => q.id === qId)
                  if (!q) return null
                  return (
                    <div key={qId} className="text-sm">
                      <p className="font-medium">
                        {index + 1}. {q.question}{" "}
                        <span className="text-muted-foreground">({q.marks} নম্বর)</span>
                      </p>
                      {q.type === "mcq" && q.options && (
                        <div className="grid grid-cols-2 gap-1 ml-4 mt-1">
                          {q.options.map((opt: string, idx: number) => (
                            <div key={idx}>
                              {String.fromCharCode(65 + idx)}. {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>নির্বাচিত প্রশ্ন: {selectedQuestions.length}</span>
            <span>মোট নম্বর: {totalMarks}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
