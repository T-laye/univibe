'use client'

import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { pageRoutes } from '@/lib/routes'
import { Logo } from '../components/shared/logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[v0] Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo href={pageRoutes.publicRoutes.home} />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-destructive" size={40} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2">Oops!</h1>
          <h2 className="text-xl font-bold text-foreground mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-2">
            We encountered an unexpected error. Our team has been notified and we&apos;re working to fix it.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground mb-8 wrap-break-words">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <Link 
              href={pageRoutes.publicRoutes.home}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
            >
              <Home size={18} />
              Go Home
            </Link>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please contact{' '}
              <a href="mailto:hello@univibes.com" className="text-primary hover:text-accent transition font-medium">
                our support team
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
