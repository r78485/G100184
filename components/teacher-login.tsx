"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TeacherLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: call real auth API. For now store a demo token.
    try {
      localStorage.setItem('teacherToken', 'demo-token')
      // redirect to teacher dashboard
      router.push('/teacher/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-md shadow-sm bg-white">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">ইমেইল</label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="ইমেইল লিখুন" className="mt-1 w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">পাসওয়ার্ড</label>
        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="পাসওয়ার্ড লিখুন" className="mt-1 w-full px-3 py-2 border rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm">
          <input id="remember" type="checkbox" className="mr-2" />
          <label htmlFor="remember">Remember me</label>
        </div>
      </div>
      <div>
        <button disabled={loading} type="submit" className="w-full px-4 py-2 bg-primary text-white rounded">{loading ? 'Logging in...' : 'Log In'}</button>
      </div>
    </form>
  )
}
