'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { GoogleLogoIcon } from '@/components/marketing/google-logo-icon'

const APP_URL = 'https://morph-ai.app'
const BASE_PATH = '/morph-ai-docs'

type NavActive = 'home' | 'pricing'
type NavSectionKey = 'how-it-works' | 'demo'

type MarketingNavLabels = {
  howItWorks: string
  demo: string
  pricing: string
  signIn: string
  getStarted: string
  tagline: string
}

type MarketingLanguageOption = {
  code: string
  label: string
  href: string
}

type MarketingLanguageMenu = {
  triggerLabel: string
  currentCode: string
  currentLabel: string
  options: MarketingLanguageOption[]
}

export function MarketingNav({
  active,
  basePath = '',
  homeHref = '/',
  pricingHref,
  labels,
  languageMenu,
}: {
  active?: NavActive
  basePath?: string
  homeHref?: string
  pricingHref?: string
  labels?: Partial<MarketingNavLabels>
  languageMenu?: MarketingLanguageMenu
}) {
  const sectionHref = (hash: string) => (basePath ? `${basePath}${hash}` : hash)
  const navLabels: MarketingNavLabels = {
    howItWorks: labels?.howItWorks ?? 'How it works',
    demo: labels?.demo ?? 'Demo',
    pricing: labels?.pricing ?? 'Pricing',
    signIn: labels?.signIn ?? 'Sign in',
    getStarted: labels?.getStarted ?? 'Get started',
    tagline: labels?.tagline ?? 'YOUR AI CHIEF OF STAFF',
  }

  const links = [
    { label: navLabels.howItWorks, href: sectionHref('#how-it-works'), key: 'how-it-works' },
    { label: navLabels.demo, href: sectionHref('#demo'), key: 'demo' },
    { label: navLabels.pricing, href: pricingHref || `${APP_URL}/pricing`, key: 'pricing', external: true },
  ]
  const mobileLanguageDetailsRef = useRef<HTMLDetailsElement>(null)
  const desktopLanguageDetailsRef = useRef<HTMLDetailsElement>(null)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<NavSectionKey>('how-it-works')
  const sectionTrackingEnabled = active !== 'pricing' && basePath === ''

  useEffect(() => {
    if (!isLanguageOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (mobileLanguageDetailsRef.current?.contains(target)) return
      if (desktopLanguageDetailsRef.current?.contains(target)) return
      setIsLanguageOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsLanguageOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isLanguageOpen])

  useEffect(() => {
    if (!sectionTrackingEnabled) return

    const howSection = document.getElementById('how-it-works')
    const demoSection = document.getElementById('demo')
    if (!howSection || !demoSection) return

    const updateFromHash = () => {
      if (window.location.hash === '#demo') {
        setActiveSection('demo')
        return
      }
      if (window.location.hash === '#how-it-works') {
        setActiveSection('how-it-works')
      }
    }

    const updateFromScroll = () => {
      const anchorY = window.scrollY + 140
      setActiveSection(anchorY >= demoSection.offsetTop ? 'demo' : 'how-it-works')
    }

    updateFromHash()
    updateFromScroll()
    window.addEventListener('hashchange', updateFromHash)
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)

    return () => {
      window.removeEventListener('hashchange', updateFromHash)
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [sectionTrackingEnabled])

  const isActiveLink = (key: string) => {
    if (active === 'pricing') return key === 'pricing'
    if (key === 'pricing') return false
    return key === activeSection
  }

  const handleLinkClick = (key: string) => {
    setIsLanguageOpen(false)
    if (!sectionTrackingEnabled) return
    if (key === 'how-it-works' || key === 'demo') {
      setActiveSection(key)
    }
  }

  const renderLink = (link: { label: string; href: string; key: string; external?: boolean }, isMobile?: boolean) => {
    const className = cn(
      isMobile
        ? 'relative shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#0f1320]'
        : 'relative transition-colors hover:text-[#0f1320]',
      isActiveLink(link.key) ? 'text-[#0f1320]' : ''
    )
    const dotClass = isMobile
      ? 'absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0f1320]'
      : 'absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0f1320]'

    if (link.external) {
      return (
        <a
          key={link.key}
          href={link.href}
          onClick={() => handleLinkClick(link.key)}
          className={className}
        >
          <span>{link.label}</span>
          {isActiveLink(link.key) && <span className={dotClass} />}
        </a>
      )
    }

    return (
      <Link
        key={link.key}
        href={link.href}
        onClick={() => handleLinkClick(link.key)}
        className={className}
      >
        <span>{link.label}</span>
        {isActiveLink(link.key) && <span className={dotClass} />}
      </Link>
    )
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#0f1320]/10 bg-[#f6f7fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 md:hidden">
            <Link href={homeHref} className="flex min-w-0 items-center gap-2.5 transition-transform hover:scale-[1.01]">
              <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#0f1320]/10 bg-white/85 shadow-sm">
                <Image src={`${BASE_PATH}/morph_logo_new.svg`} alt="Morph AI" width={28} height={28} priority />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-none tracking-tight text-[#0f1320]">
                  <span className="sm:hidden">Morph</span>
                  <span className="hidden sm:inline">Morph AI</span>
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-2">
              {languageMenu && (
                <details
                  ref={mobileLanguageDetailsRef}
                  className="relative"
                  open={isLanguageOpen}
                  onToggle={(event) => setIsLanguageOpen(event.currentTarget.open)}
                >
                  <summary
                    className="list-none cursor-pointer rounded-full border border-[#0f1320]/18 p-2 text-[#0f1320] transition-colors hover:bg-white/80 [&::-webkit-details-marker]:hidden"
                    title={`${languageMenu.triggerLabel}: ${languageMenu.currentLabel}`}
                  >
                    <span className="sr-only">
                      {languageMenu.triggerLabel}: {languageMenu.currentLabel}
                    </span>
                    <Globe className="h-4 w-4" />
                  </summary>
                  <div className="absolute right-0 top-full z-30 mt-2 max-h-72 w-52 overflow-y-auto rounded-2xl border border-[#0f1320]/12 bg-white p-2 shadow-lg">
                    {languageMenu.options.map((option) => (
                      <Link
                        key={option.code}
                        href={option.href}
                        onClick={() => setIsLanguageOpen(false)}
                        className={cn(
                          'block rounded-xl px-3 py-2 text-sm text-[#24304a] hover:bg-[#f3f4f9]',
                          option.code === languageMenu.currentCode ? 'bg-[#eef1f8] font-semibold text-[#0f1320]' : ''
                        )}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </details>
              )}
              <a
                href={`${APP_URL}/auth/signin`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#11141f] px-4 py-2 text-sm font-semibold text-white transition-transform hover:translate-y-[-1px]"
              >
                <GoogleLogoIcon className="h-4 w-4" />
                {navLabels.getStarted}
              </a>
            </div>
          </div>

          <nav className="flex items-center gap-6 overflow-x-auto pb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#59627b] md:hidden">
            {links.map((link) => renderLink(link, true))}
          </nav>

          <div className="hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center py-4 md:grid">
            <div className="justify-self-start">
              <Link href={homeHref} className="flex items-center gap-3 transition-transform hover:scale-[1.01]">
                <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-[#0f1320]/10 bg-white/85 shadow-sm">
                  <Image src={`${BASE_PATH}/morph_logo_new.svg`} alt="Morph AI" width={32} height={32} priority />
                </div>
                <div>
                  <p className="text-base font-semibold tracking-tight text-[#0f1320]">Morph AI</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#59627b]">{navLabels.tagline}</p>
                </div>
              </Link>
            </div>

            <nav className="flex items-center justify-self-center gap-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#59627b]">
              {links.map((link) => renderLink(link))}
            </nav>

            <div className="flex items-center justify-self-end gap-3">
              {languageMenu && (
                <details
                  ref={desktopLanguageDetailsRef}
                  className="relative"
                  open={isLanguageOpen}
                  onToggle={(event) => setIsLanguageOpen(event.currentTarget.open)}
                >
                  <summary
                    className="list-none cursor-pointer rounded-full border border-[#0f1320]/18 p-2 text-[#0f1320] transition-colors hover:bg-white/80 [&::-webkit-details-marker]:hidden"
                    title={`${languageMenu.triggerLabel}: ${languageMenu.currentLabel}`}
                  >
                    <span className="sr-only">
                      {languageMenu.triggerLabel}: {languageMenu.currentLabel}
                    </span>
                    <Globe className="h-4 w-4" />
                  </summary>
                  <div className="absolute right-0 top-full z-30 mt-2 max-h-72 w-52 overflow-y-auto rounded-2xl border border-[#0f1320]/12 bg-white p-2 shadow-lg">
                    {languageMenu.options.map((option) => (
                      <Link
                        key={option.code}
                        href={option.href}
                        onClick={() => setIsLanguageOpen(false)}
                        className={cn(
                          'block rounded-xl px-3 py-2 text-sm text-[#24304a] hover:bg-[#f3f4f9]',
                          option.code === languageMenu.currentCode ? 'bg-[#eef1f8] font-semibold text-[#0f1320]' : ''
                        )}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </details>
              )}
              <a
                href={`${APP_URL}/auth/signin`}
                className="rounded-full border border-[#0f1320]/18 px-4 py-2 text-sm font-semibold text-[#0f1320] transition-colors hover:bg-white/80"
              >
                {navLabels.signIn}
              </a>
              <a
                href={`${APP_URL}/auth/signin`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#11141f] px-4 py-2 text-sm font-semibold text-white transition-transform hover:translate-y-[-1px]"
              >
                <GoogleLogoIcon className="h-4 w-4" />
                {navLabels.getStarted}
              </a>
            </div>
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[112px] md:h-[77px]" />
    </>
  )
}
