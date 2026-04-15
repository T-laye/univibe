'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { pageRoutes } from '@/lib/routes'
import { Logo } from '../shared/logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <Logo size="lg" />
            <p className="text-muted-foreground text-sm mt-4">
              Univibes is the leading event discovery platform for university students. Connect, explore, and create unforgettable experiences.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={pageRoutes.publicRoutes.events} className="text-muted-foreground hover:text-primary transition">
                  Discover Events
                </Link>
              </li>
              <li>
                <Link href={pageRoutes.hostRoutes.dashboard} className="text-muted-foreground hover:text-primary transition">
                  Host Events
                </Link>
              </li>
              <li>
                <Link href={pageRoutes.userRoutes.dashboard} className="text-muted-foreground hover:text-primary transition">
                  My Tickets
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                <a href="mailto:hello@univibes.com" className="text-muted-foreground hover:text-primary transition">
                  hello@univibes.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-primary mt-0.5 shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Univibes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition">
              Cookie Policy
            </a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-6 9-6"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
