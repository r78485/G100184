"use client"

import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-4">You do not have permission to view this page.</p>
        <div className="flex gap-2">
          <Link href="/" className="btn">Go to Home</Link>
          <Link href="/login" className="btn">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
