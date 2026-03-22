'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  CATEGORIES,
  NAV_ITEMS,
  DemoSection,
} from '@/components/marketing/demo-page'

export function LandingDemoSections() {
  const [activeNav, setActiveNav] = useState('all')

  const scrollToSection = useCallback((id: string) => {
    setActiveNav(id)
    if (id === 'all') {
      const demoEl = document.getElementById('demo')
      if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div>
      {/* Category navigation */}
      <div className="sticky top-[112px] z-30 -mx-6 border-b border-[#0f1320]/8 bg-[#f6f7fa]/90 backdrop-blur-md md:top-[77px]">
        <div className="flex gap-2 overflow-x-auto px-6 py-3 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = 'icon' in item ? item.icon : null
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all',
                  activeNav === item.id
                    ? 'bg-[#5c6dff] text-white shadow-sm'
                    : 'bg-white text-[#59627b] hover:bg-[#eef0f7] hover:text-[#0f1320]'
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Demo sections */}
      {CATEGORIES.map((cat) => (
        <DemoSection key={cat.id} category={cat} />
      ))}
    </div>
  )
}
