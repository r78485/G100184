"use client"

import React from 'react'
import useRequireRole from '@/lib/auth'

export default function RequireRole({ allowedRoles, children }: { allowedRoles: ('admin'|'teacher'|'student'|'employee'|'parent')[], children: React.ReactNode }) {
  useRequireRole(allowedRoles)
  return <>{children}</>
}
