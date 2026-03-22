'use client'

import { cn } from '@/lib/utils'
import {
  FileText,
  ImageIcon,
  Mic,
  Globe,
  CalendarPlus,
  ListChecks,
  Search,
  BarChart3,
  RefreshCw,
  Zap,
  Database,
} from 'lucide-react'
import { Space_Grotesk } from 'next/font/google'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
})

type StageData = { title: string; description: string }
type LiveModelData = {
  label: string; title: string; description: string
  input: string; context: string; output: string
}

const INPUTS = [
  { icon: FileText, label: 'Text', color: '#5c6dff' },
  { icon: ImageIcon, label: 'Image / PDF', color: '#8b5cf6' },
  { icon: Mic, label: 'Audio', color: '#ec4899' },
  { icon: Globe, label: 'Web', color: '#06b6d4' },
] as const

const OUTPUTS = [
  { icon: CalendarPlus, label: 'Create events' },
  { icon: ListChecks, label: 'Manage tasks' },
  { icon: Search, label: 'Semantic search' },
  { icon: BarChart3, label: 'Smart summaries' },
  { icon: RefreshCw, label: 'Google Sync' },
] as const

const CONTEXT_ITEMS = [
  { label: 'Calendar', count: '12 calendars' },
  { label: 'Tasks', count: '6 lists' },
  { label: 'History', count: '1,200+ events' },
  { label: 'Embeddings', count: 'pgvector' },
] as const

export function WorkflowPipeline({
  stages,
  liveModel,
}: {
  stages: ReadonlyArray<StageData>
  liveModel: LiveModelData
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[1fr_1.4fr]">
        <div className="group relative overflow-hidden rounded-2xl border border-[#0f1320]/8 bg-white p-6 transition-all duration-300 hover:border-[#5c6dff]/20 hover:shadow-[0_8px_30px_-8px_rgba(92,109,255,0.12)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c6dff]">
            Multi-modal Input
          </p>
          <p className={cn('mt-2 text-xl tracking-tight text-[#0f1320]', displayFont.className)}>
            Any format in, structured data out
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4a556f]">
            Type a message, snap a photo, upload a PDF, record audio, or paste a URL.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {INPUTS.map((input) => {
              const Icon = input.icon
              return (
                <div
                  key={input.label}
                  className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors duration-200"
                  style={{
                    borderColor: `${input.color}20`,
                    color: input.color,
                    backgroundColor: `${input.color}08`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {input.label}
                </div>
              )
            })}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-[#0f1320]/8 bg-gradient-to-br from-[#0f1320] to-[#1e2540] p-6 text-white transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(92,109,255,0.25)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-60 w-60 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-[#5c6dff]/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 animate-[pulse_8s_ease-in-out_infinite_1s] rounded-full bg-[#8b5cf6]/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  AI Engine
                </p>
                <p className={cn('mt-2 text-2xl tracking-tight', displayFont.className)}>
                  Understand first, act second
                </p>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/60">
                  Morph references your calendar, tasks, and history before every action — keeping suggestions relevant and updates consistent.
                </p>
              </div>
              <div className="relative ml-4 shrink-0">
                <div className="absolute -inset-3 animate-[pulse_3s_ease-in-out_infinite] rounded-2xl bg-[#5c6dff]/20 blur-xl" />
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#5c6dff] to-[#4354e6] shadow-[0_4px_20px_rgba(92,109,255,0.4)]">
                  <img src="/morph-ai-docs/morph_logo_new.svg" alt="" aria-hidden="true" className="h-8 w-8 brightness-0 invert" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[11px] text-white/40">
              <span className="rounded bg-white/10 px-2 py-0.5">input</span>
              <span>&rarr;</span>
              <span className="rounded bg-white/10 px-2 py-0.5">context</span>
              <span>&rarr;</span>
              <span className="rounded bg-white/10 px-2 py-0.5">reason</span>
              <span>&rarr;</span>
              <span className="rounded bg-[#5c6dff]/30 px-2 py-0.5 text-white/70">act</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="group relative overflow-hidden rounded-2xl border border-[#0f1320]/8 bg-white p-6 transition-all duration-300 hover:border-[#5c6dff]/20 hover:shadow-[0_8px_30px_-8px_rgba(92,109,255,0.12)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c6dff]">
                Context Layer
              </p>
              <p className={cn('mt-2 text-xl tracking-tight text-[#0f1320]', displayFont.className)}>
                Persistent working memory
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4a556f]">
                Every interaction builds on your full calendar, task lists, and conversation history — stored as searchable embeddings.
              </p>
            </div>
            <Database className="ml-4 h-8 w-8 shrink-0 text-[#5c6dff]/20" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CONTEXT_ITEMS.map((item) => (
              <div key={item.label} className="rounded-xl bg-[#f4f5f9] px-3 py-2.5 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a9da8]">{item.label}</p>
                <p className={cn('mt-0.5 text-[14px] font-semibold text-[#0f1320]', displayFont.className)}>{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-[#0f1320]/8 bg-white p-6 transition-all duration-300 hover:border-[#5c6dff]/20 hover:shadow-[0_8px_30px_-8px_rgba(92,109,255,0.12)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c6dff]">
            Actions & Outputs
          </p>
          <p className={cn('mt-2 text-xl tracking-tight text-[#0f1320]', displayFont.className)}>
            AI does the heavy lifting
          </p>
          <div className="mt-5 space-y-2">
            {OUTPUTS.map((output) => {
              const Icon = output.icon
              return (
                <div
                  key={output.label}
                  className="flex items-center gap-3 rounded-xl bg-[#f4f5f9] px-3.5 py-2.5 transition-colors duration-200 hover:bg-[#eef0ff]"
                >
                  <Icon className="h-4 w-4 text-[#5c6dff]" />
                  <span className="text-[13px] font-medium text-[#3f4a63]">{output.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-[#f59e0b]/12 bg-gradient-to-r from-[#fffbeb] via-white to-[#fffbeb] p-6 transition-all duration-300 hover:border-[#f59e0b]/25 hover:shadow-[0_8px_30px_-8px_rgba(245,158,11,0.12)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 animate-[pulse_3s_ease-in-out_infinite] rounded-xl bg-[#f59e0b]/10 blur-lg" />
              <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white shadow-sm">
                <Zap className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className={cn('text-[15px] font-semibold text-[#0f1320]', displayFont.className)}>
                Proactive AI
              </p>
              <p className="text-[13px] text-[#78663c]">
                Monitors your context layer 24/7 — sends morning briefs, deadline alerts, and schedule replans before you ask.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#f59e0b]/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#f59e0b]" />
            <span className="text-[11px] font-semibold text-[#b97e16]">Coming soon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
