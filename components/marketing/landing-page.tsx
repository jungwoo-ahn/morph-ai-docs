import Image from 'next/image'
import { Manrope, Space_Grotesk } from 'next/font/google'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MarketingNav } from '@/components/marketing/site-nav'
import { GoogleLogoIcon } from '@/components/marketing/google-logo-icon'
import { LandingDemoSections } from '@/components/marketing/landing-demo-sections'
import { WorkflowPipeline } from '@/components/marketing/workflow-pipeline'
import {
  LANDING_COPY,
  LANDING_LANGUAGE_LABELS,
  type LandingLanguage,
} from '@/components/marketing/landing-copy'

const APP_URL = 'https://morph-ai.app'
const BASE_PATH = '/morph-ai-docs'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
})

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})


export function LandingPage({ lang = 'en' }: { lang?: LandingLanguage }) {
  const copy = LANDING_COPY[lang] ?? LANDING_COPY.en
  const isRtl = lang === 'ar'
  const landingHref = `?lang=${lang}`
  const pricingHref = `${APP_URL}/pricing?lang=${lang}`
  const languageOptions = (Object.entries(LANDING_LANGUAGE_LABELS) as Array<[LandingLanguage, string]>).map(
    ([code, label]) => ({
      code,
      label,
      href: `?lang=${code}`,
    })
  )

  return (
    <div
      className={cn('relative min-h-screen bg-[#f6f7fa] text-[#0f1320]', bodyFont.className)}
      lang={lang}
      dir={isRtl ? 'rtl' : undefined}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,19,32,0.08)_1px,transparent_1px)] bg-[size:clamp(76px,9vw,138px)_100%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(92,109,255,0.17),transparent_34%),radial-gradient(circle_at_20%_82%,rgba(92,109,255,0.08),transparent_36%)]" />
      </div>

      <div className="relative z-10">
        <MarketingNav
          active="home"
          basePath=""
          homeHref={landingHref}
          pricingHref={pricingHref}
          labels={{
            howItWorks: 'How it works',
            demo: 'Demo',
            pricing: copy.nav.pricing,
            signIn: copy.nav.signIn,
            getStarted: copy.nav.getStarted,
            tagline: copy.nav.tagline,
          }}
          languageMenu={{
            triggerLabel: copy.nav.language,
            currentCode: lang,
            currentLabel: LANDING_LANGUAGE_LABELS[lang],
            options: languageOptions,
          }}
        />

        <main className="mx-auto max-w-7xl px-6 pb-24">
          <section className="grid gap-14 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#59627b]">
                  {copy.hero.eyebrow}
                </p>
                <h1
                  className={cn(
                    'max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.03em] md:text-7xl',
                    displayFont.className
                  )}
                >
                  {copy.hero.titleLine1}
                  <br />
                  {copy.hero.titleLine2}
                </h1>

                <p className="max-w-xl text-lg text-[#3f4a63] md:text-xl">{copy.hero.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`${APP_URL}/auth/signin`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#11141f] px-6 py-3 text-sm font-semibold text-white transition-transform hover:translate-y-[-1px]"
                >
                  <GoogleLogoIcon className="h-4 w-4" />
                  {copy.hero.startWithGoogle}
                </a>
                <a
                  href={pricingHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0f1320]/20 bg-white/80 px-6 py-3 text-sm font-semibold text-[#0f1320] backdrop-blur transition-colors hover:bg-white"
                >
                  {copy.hero.seePricing}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="group relative mx-auto w-full max-w-[340px] cursor-pointer select-none sm:max-w-[440px] lg:max-w-[560px] animate-marketing-reveal">
              <div className="relative aspect-square transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.06] group-hover:rotate-[3deg] group-active:scale-[0.88] group-active:rotate-0">
                <div className="absolute inset-[6%] rounded-full border border-black/5 bg-white/55 transition-all duration-500 group-hover:inset-[4%] group-hover:bg-white/70 group-hover:shadow-[0_0_60px_-10px_rgba(92,109,255,0.25)]" />
                <div className="absolute inset-[20%] rounded-[42%] bg-gradient-to-b from-white via-[#f3f5fb] to-[#e7ebf6] shadow-[0_44px_70px_-42px_rgba(17,20,31,0.7)] animate-marketing-float transition-shadow duration-500 group-hover:shadow-[0_54px_80px_-42px_rgba(17,20,31,0.45)]" />
                <div className="absolute left-[12%] top-[26%] h-[20%] w-[20%] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-[10%] group-hover:top-[22%] group-hover:h-[22%] group-hover:w-[22%] group-active:top-[28%] group-active:h-[18%] group-active:w-[18%]">
                  <div className="h-full w-full rotate-45 rounded-[20%] bg-[#0d1018] shadow-[0_22px_40px_-24px_rgba(15,19,32,0.85)] animate-marketing-drift" />
                </div>
                <div className="absolute right-[14%] top-[24%] h-[17%] w-[17%] rotate-45 rounded-[20%] bg-[#0d1018] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[12%] group-hover:top-[20%] group-hover:h-[19%] group-hover:w-[19%] group-active:top-[26%] group-active:h-[15%] group-active:w-[15%]" />
                <div className="absolute bottom-[16%] right-[18%] h-[20%] w-[20%] rounded-full bg-[#dce5ff]/80 backdrop-blur-sm transition-all duration-700 group-hover:bottom-[14%] group-hover:right-[16%] group-hover:h-[23%] group-hover:w-[23%] group-hover:bg-[#c8d6ff]/90 group-active:h-[17%] group-active:w-[17%]" />
              </div>
            </div>
          </section>

          {/* Full app screenshot */}
          <section className="pb-20">
            <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-[#0f1320]/10 bg-white shadow-[0_32px_80px_-20px_rgba(15,19,32,0.25)]">
              <Image
                src={`${BASE_PATH}/demo/text-screenshot-v2.png`}
                alt="Morph AI — Tasks, Calendar, and AI Chat in one view"
                width={1920}
                height={1080}
                className="w-full"
                priority
              />
            </div>
            <p className="mt-4 text-center text-sm text-[#59627b]">Tasks &middot; Calendar &middot; AI Chat — all in one view</p>
          </section>

          <section id="how-it-works" className="scroll-mt-28 space-y-7 border-t border-[#0f1320]/10 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#59627b]">
                  {copy.how.label}
                </p>
                <h2
                  className={cn(
                    'mt-2 max-w-4xl text-4xl leading-[1.04] tracking-[-0.02em]',
                    displayFont.className
                  )}
                >
                  {copy.how.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm text-[#4a556f]">{copy.how.subtitle}</p>
            </div>

            <WorkflowPipeline stages={copy.workflowStages} liveModel={copy.liveModel} />
          </section>

          <section id="demo" className="scroll-mt-28 border-t border-[#0f1320]/10 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#59627b]">
                  {copy.inputSection.label}
                </p>
                <h2 className={cn('mt-2 text-4xl tracking-[-0.02em]', displayFont.className)}>
                  {copy.inputSection.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm text-[#4a556f]">{copy.inputSection.subtitle}</p>
            </div>

            <LandingDemoSections />
          </section>

          <section className="border-t border-[#0f1320]/10 py-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className={cn('text-3xl tracking-[-0.02em]', displayFont.className)}>{copy.cta.title}</h3>
                <p className="mt-2 text-sm text-[#4a556f]">{copy.cta.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`${APP_URL}/auth/signin`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#11141f] px-6 py-3 text-sm font-semibold text-white transition-transform hover:translate-y-[-1px]"
                >
                  {copy.cta.startNow}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0f1320]/18 px-6 py-3 text-sm font-semibold text-[#11141f] hover:bg-white/80"
                >
                  {copy.cta.explore}
                </a>
              </div>
            </div>
          </section>

          <footer className="border-t border-[#0f1320]/10 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-[#59627b]">
              <p>Morph AI</p>
              <div className="flex items-center gap-5">
                <a href={`${APP_URL}/privacy`} className="hover:text-[#0f1320]">
                  {copy.footer.privacy}
                </a>
                <a href={`${APP_URL}/terms`} className="hover:text-[#0f1320]">
                  {copy.footer.terms}
                </a>
                <a href={`${APP_URL}/auth/signin`} className="hover:text-[#0f1320]">
                  {copy.footer.signIn}
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
