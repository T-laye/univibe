'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { pageRoutes } from '@/lib/routes'
import type { UserRole } from '@/types/database'
import { useAuthSession } from './use-auth-session'

export function useRequireRole(allowedRoles: UserRole[]) {
  const router = useRouter()
  const { user, isHydrating } = useAuthSession()

  useEffect(() => {
    if (isHydrating) return

    if (!user) {
      router.replace(pageRoutes.authRoutes.login)
      return
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace(pageRoutes.userRoutes.dashboard)
    }
  }, [allowedRoles, isHydrating, router, user])

  return {
    user,
    isAuthorized: !!user && allowedRoles.includes(user.role),
    isHydrating,
  }
}
