'use client'

import Link from 'next/link'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'
import { pageRoutes } from '@/lib/routes'
import { Logo } from '../components/shared/logo'

export default function NotFound() {
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
              <AlertCircle className="text-destructive" size={40} />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={pageRoutes.publicRoutes.home}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              <Home size={18} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Try these instead:</p>
            <nav className="space-y-2">
              <Link href={pageRoutes.publicRoutes.events} className="block text-primary hover:text-accent transition font-medium">
                Browse Events
              </Link>
              <Link href={pageRoutes.userRoutes.dashboard} className="block text-primary hover:text-accent transition font-medium">
                My Tickets
              </Link>
              <Link href={pageRoutes.hostRoutes.dashboard} className="block text-primary hover:text-accent transition font-medium">
                Host an Event
              </Link>
            </nav>
          </div>
        </div>
      </main>
    </div>
  )
}
