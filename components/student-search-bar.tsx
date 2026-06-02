"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function StudentSearchBar() {
  const [q, setQ] = useState("")
  const router = useRouter()

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const query = q.trim()
    if (!query) return
    router.push(`/student/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={submit} className="mb-4">
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-3 py-2 rounded border border-input bg-input text-sm"
        />
        <button type="submit" className="inline-flex items-center gap-2 px-3 py-2 rounded bg-primary text-white text-sm">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </form>
  )
}
