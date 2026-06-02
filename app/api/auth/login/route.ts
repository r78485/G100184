import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body || {}

    // Simple mock authentication - replace with real DB lookup
    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 })
    }

    const uname = String(username).toLowerCase()
    let role: 'admin' | 'teacher' | 'student' | null = null

    if ((uname === 'admin' || uname === 'admin@ghjs.edu.bd') && password === '123456') role = 'admin'
    else if (uname === 'teacher' && password === '123456') role = 'teacher'
    else if (uname === 'student' && password === '123456') role = 'student'

    if (!role) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })

    // In a real app, issue JWT or session token here
    const token = `mock-token-${Math.random().toString(36).slice(2,10)}`
    // Provide a mock userId for the logged in user so frontend can map to records
    let userId = ''
    if (role === 'student') userId = '1'
    else if (role === 'teacher') userId = '1'
    else userId = ''

    return NextResponse.json({ success: true, role, token, userId })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error', error: String(err) }, { status: 500 })
  }
}
