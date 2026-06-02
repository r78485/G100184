"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSchoolStore } from './store'

export function useRequireRole(allowedRoles: ('admin'|'teacher'|'student'|'employee'|'parent')[]) {
  const router = useRouter()
  const { isLoggedIn, userRole } = useSchoolStore()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    if (!userRole || !allowedRoles.includes(userRole)) {
      router.push('/unauthorized')
    }
  }, [isLoggedIn, userRole, allowedRoles, router])
}

export default useRequireRole
