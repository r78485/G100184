"use client"

import React, { useState } from 'react'
import RequireRole from '@/components/RequireRole'
import { useSchoolStore } from '@/lib/store'

export default function TeacherHomeworkPage() {
  RequireRole({ allowedRoles: ["teacher", "admin"], children: null })
  const addHomework = useSchoolStore(s => s.addNotice) // reuse notice as placeholder
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreate = () => {
    if (!title) return
    addHomework({ title, content, date: new Date().toISOString(), category: 'homework', attachment: '', isPublic: false })
    setTitle('')
    setContent('')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Homework</h1>
      <div className="mb-4">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 mb-2" />
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Details" className="w-full border p-2 mb-2" />
        <div className="flex gap-2">
          <button onClick={handleCreate} className="px-4 py-2 bg-primary text-white rounded">Create</button>
        </div>
      </div>
    </div>
  )
}
