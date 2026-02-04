'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
      return
    }

    if (requireAdmin && !isAdmin) {
      router.push('/')
      return
    }
  }, [currentUser, isAdmin, requireAdmin, router])

  if (!currentUser) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  return children
}
