'use client'

import { useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Type,
  ImageIcon,
  Mic,
  Globe,
  Search,
  Zap,
} from 'lucide-react'
import { StaticDemoChat } from './static-demo-chat'

const BASE_PATH = '/morph-ai-docs'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
})

export type DemoScenario = {
  id: string
  label: string
  prompt: string
  demoPromptKey: string
}

export type DemoCategory = {
  id: string
  label: string
  badge: string
  title: string
  description: string
  scenarios: DemoScenario[]
}

export const CATEGORIES: DemoCategory[] = [
  {
    id: 'text',
    label: 'Text',
    badge: 'TEXT INPUT',
    title: 'Type naturally. Morph handles the rest.',
    description:
      'Create events, plan tasks, summarize schedules, or set up recurring patterns \u2014 all from a single message.',
    scenarios: [
      { id: 'multi-event', label: 'Multi-event', prompt: 'Add a team standup tomorrow 9-9:30 AM, lunch with Sarah at noon for an hour, and a dentist appointment Thursday at 3 PM.', demoPromptKey: 'multi-event' },
      { id: 'task-plan', label: 'Task planning', prompt: 'I need to finish my investor deck by Friday. Break it down into subtasks and block focus time this week.', demoPromptKey: 'task-plan' },
      { id: 'summary', label: 'Schedule summary', prompt: 'What does my week look like? Summarize meetings, deadlines, and free blocks.', demoPromptKey: 'summary' },
      { id: 'event-edit', label: 'Event editing', prompt: 'Move my 2 PM design review to 4 PM and add a Zoom link.', demoPromptKey: 'event-edit' },
      { id: 'recurring', label: 'Recurring', prompt: 'Set up a weekly 1-on-1 with Jake every Tuesday at 10 AM for the next 8 weeks.', demoPromptKey: 'recurring' },
      { id: 'event-delete', label: 'Event deletion', prompt: 'Cancel all my meetings on Friday afternoon \u2014 I need a focus block.', demoPromptKey: 'event-delete' },
    ],
  },
  {
    id: 'image-pdf',
    label: 'Image & PDF',
    badge: 'IMAGE & PDF',
    title: 'Extract events from any image or document',
    description: 'Upload a conference schedule, class announcement, sports timetable, email, or messenger screenshot. GPT-4 Vision reads it and creates structured events.',
    scenarios: [
      { id: 'img-ai-conference', label: 'Conference speakers', prompt: 'Here\u2019s the AI conference schedule. Add all sessions with John Lee as speaker to my calendar.', demoPromptKey: 'img-ai-conference-john-lee' },
      { id: 'img-fcb', label: 'FC Barcelona filter', prompt: 'Add only the FC Barcelona home games from this schedule to my calendar.', demoPromptKey: 'img-fcb-home-only' },
      { id: 'img-golf', label: 'Golf schedule', prompt: 'Extract Daniel\u2019s golf lesson times from this image and add them as events.', demoPromptKey: 'img-golf-daniel-only' },
      { id: 'img-messenger', label: 'Messenger', prompt: 'Pull any plans or meetups from this Messenger conversation.', demoPromptKey: 'img-messenger-default' },
      { id: 'img-email', label: 'Email', prompt: 'Read this email invite and create the calendar event with all details.', demoPromptKey: 'img-vc-email-default' },
      { id: 'pdf-ucsd', label: 'Academic calendar', prompt: 'Import all key dates from this UCSD academic calendar PDF.', demoPromptKey: 'pdf-ucsd-default' },
      { id: 'img-algebra', label: 'Class announcement', prompt: 'Add the exam and homework dates from this class announcement to my calendar.', demoPromptKey: 'img-modern-algebra-announcement' },
    ],
  },
  {
    id: 'audio',
    label: 'Audio',
    badge: 'AUDIO',
    title: 'Speak it. Morph transcribes and acts.',
    description: 'Record a voice memo, capture a call, or dictate updates. Whisper transcribes, then GPT-4o extracts events and tasks.',
    scenarios: [
      { id: 'audio-call', label: 'Call recording', prompt: 'I just recorded a call with the marketing team. Extract action items and add follow-ups to my calendar.', demoPromptKey: 'audio-call-recording-default' },
      { id: 'audio-memo', label: 'Voice memo', prompt: 'Here\u2019s a quick voice memo \u2014 pull out any events or reminders.', demoPromptKey: 'audio-voice-memo-short' },
      { id: 'audio-client', label: 'Client call', prompt: 'Long client call just ended. Summarize key decisions and create follow-up events.', demoPromptKey: 'audio-client-call-long' },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    badge: 'WEB SEARCH',
    title: 'Pull live data from the web into your calendar',
    description: 'Ask Morph to look up sports schedules, holidays, deadlines, or travel plans \u2014 it searches the web and creates events automatically.',
    scenarios: [
      { id: 'web-warriors', label: 'Warriors games', prompt: 'Find the next 5 Golden State Warriors home games and add them to my calendar.', demoPromptKey: 'warriors' },
      { id: 'web-holidays', label: 'Federal holidays', prompt: 'Add all 2026 US federal holidays to my calendar.', demoPromptKey: 'web-us-federal-holidays' },
      { id: 'web-tax', label: 'Tax deadlines', prompt: 'When are the 2026 tax filing deadlines? Add them with reminders.', demoPromptKey: 'web-tax-deadlines' },
      { id: 'web-dst', label: 'DST reminders', prompt: 'Add daylight saving time change reminders for this year.', demoPromptKey: 'web-dst-reminders' },
      { id: 'web-tahoe', label: 'Tahoe trip', prompt: 'Plan a Lake Tahoe weekend trip \u2014 find events, weather, and driving time.', demoPromptKey: 'web-tahoe' },
    ],
  },
  {
    id: 'rag',
    label: 'Semantic Search',
    badge: 'SEMANTIC SEARCH',
    title: 'Search your schedule history with natural language',
    description: 'Powered by pgvector embeddings. Ask contextual questions about past events, workload patterns, or upcoming preparations.',
    scenarios: [
      { id: 'rag-homework', label: 'Assignment lookup', prompt: 'When is my next linear algebra assignment due?', demoPromptKey: 'rag-homework' },
      { id: 'rag-hours', label: 'Workload summary', prompt: 'How many hours of meetings did I have last week compared to this week?', demoPromptKey: 'rag-hours' },
      { id: 'rag-detail', label: 'Event details', prompt: 'What was discussed in my last product review? Who attended?', demoPromptKey: 'rag-event-detail' },
    ],
  },
  {
    id: 'proactive',
    label: 'Proactive',
    badge: 'PROACTIVE AI',
    title: 'Proactive notifications that keep you ahead',
    description: 'Morph monitors your schedule and sends intelligent nudges \u2014 morning briefs, deadline warnings, gap-fill suggestions, and commute replans.',
    scenarios: [
      { id: 'proactive-gap', label: 'Gap fill', prompt: 'You have a 45-minute gap before your product kickoff. Block prep time and draft talking points?', demoPromptKey: 'proactive-gap-fill' },
      { id: 'proactive-deadline', label: 'Deadline guard', prompt: 'Deadline risk: investor memo due tomorrow 9 AM, progress below plan. Suggested fix: block 7:30\u20139 PM focus.', demoPromptKey: 'proactive-deadline-risk' },
      { id: 'proactive-commute', label: 'Commute replan', prompt: 'Traffic delay detected. ETA misses dinner reservation by 18 min. Move dinner to 7:40 PM?', demoPromptKey: 'proactive-commute-replan' },
      { id: 'proactive-brief', label: 'Daily brief', prompt: 'Today: 2 meetings, 1 deadline, and a 90-min deep-work window at 2 PM. Top pick: finalize investor update first.', demoPromptKey: 'proactive-daily-brief' },
      { id: 'proactive-followup', label: 'Follow-up rescue', prompt: 'You promised Sarah a proposal by Wednesday. No draft detected \u2014 block 1 hour tomorrow morning?', demoPromptKey: 'proactive-followup-rescue' },
      { id: 'proactive-prep', label: 'Meeting prep', prompt: 'Board meeting in 2 hours. Here\u2019s a quick brief: attendees, last meeting notes, open action items.', demoPromptKey: 'proactive-meeting-prep-push' },
    ],
  },
]

export const NAV_ITEMS = [
  { id: 'all', label: 'All' },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'image-pdf', label: 'Image & PDF', icon: ImageIcon },
  { id: 'audio', label: 'Audio', icon: Mic },
  { id: 'web', label: 'Web', icon: Globe },
  { id: 'rag', label: 'Semantic Search', icon: Search },
  { id: 'proactive', label: 'Proactive', icon: Zap },
] as const

const SOURCE_IMAGES = [
  { src: `${BASE_PATH}/demo/sources/ai-conference-timetable.png`, alt: 'Conference timetable' },
  { src: `${BASE_PATH}/demo/sources/fcb-schedule.png`, alt: 'Sports schedule' },
  { src: `${BASE_PATH}/demo/sources/messanger.png`, alt: 'Messenger chat' },
  { src: `${BASE_PATH}/demo/sources/vc_email.png`, alt: 'Email invite' },
  { src: `${BASE_PATH}/demo/sources/golf-lesosn-schedule.png`, alt: 'Golf schedule' },
  { src: `${BASE_PATH}/demo/modern-algebra-class-anouncement.png`, alt: 'Class announcement' },
] as const

const PROACTIVE_PHONES = [
  {
    id: 'gap-fill',
    label: 'Gap-fill Nudge',
    alerts: [
      { time: '9:10 AM', text: 'You have a 45-minute gap before Product kickoff. Block prep time and draft talking points?' },
      { time: '11:30 PM', text: 'You closed 4 of 5 priorities today. I can suggest one quick win for tomorrow morning.' },
    ],
  },
  {
    id: 'deadline-guard',
    label: 'Deadline Guard',
    alerts: [
      { time: '2:00 PM', text: 'Deadline risk detected: investor memo is due tomorrow 9:00 AM and progress is below plan.' },
      { time: '2:01 PM', text: 'Suggested fix: block 7:30\u20139:00 PM focus, move one low-priority sync, and send review draft by 9:15 PM.' },
    ],
  },
  {
    id: 'commute-replan',
    label: 'Commute Re-plan',
    alerts: [
      { time: '5:12 PM', text: 'Traffic delay detected. ETA misses your dinner reservation check-in by 18 minutes.' },
      { time: '5:13 PM', text: 'I can move dinner to 7:40 PM and shift your 8:00 PM call to 8:20 PM. Apply this update?' },
    ],
  },
  {
    id: 'daily-brief',
    label: 'Daily Brief',
    alerts: [
      { time: '8:00 AM', text: 'Today: 2 meetings, 1 deadline, and a 90-minute deep-work window at 2 PM.' },
      { time: '8:01 AM', text: 'Top recommendation: finalize investor update first, then lock speaking notes before team sync.' },
    ],
  },
] as const

const RAG_EXAMPLE_QUERIES = [
  'When is my next homework due?',
  'How many hours did I spend in meetings last month?',
  'What was the outcome of my last 1-on-1 with Jake?',
] as const

function ProactiveCard({
  alerts,
}: {
  alerts: ReadonlyArray<{ time: string; text: string }>
}) {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <div className="mx-auto w-[50%]">
        <div
          className="relative aspect-[9/19] overflow-hidden"
          style={{
            borderRadius: '22%/10.5%',
            background: 'linear-gradient(160deg, #2c2c2e, #1c1c1e 40%, #111113)',
            boxShadow: '0 16px 40px -8px rgba(0,0,0,0.25)',
          }}
        >
          <div className="absolute inset-[3px]" style={{ borderRadius: '20%/9.8%', background: 'linear-gradient(170deg, #1e2a4a 0%, #0f1a35 40%, #1a1030 100%)' }} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(92,109,255,0.12)_0%,transparent_60%)]" />
        </div>
      </div>
      <div className="-mt-[40%] relative z-10 space-y-2.5">
        {alerts.map((alert) => (
          <div
            key={alert.time}
            className="overflow-hidden rounded-2xl border border-[#0f1320]/[0.06] bg-white shadow-[0_2px_12px_-2px_rgba(15,19,32,0.1),0_0_0_0.5px_rgba(15,19,32,0.04)]"
          >
            <div className="flex items-center gap-2 px-3.5 pt-3 pb-1.5">
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#f0f1f5]">
                <img src="/morph-ai-docs/morph_logo_new.svg" alt="" aria-hidden="true" className="h-4 w-4" />
              </div>
              <span className="text-[13px] font-semibold text-[#0f1320]">Morph AI</span>
              <span className="ml-auto text-[11px] text-[#9a9aa0]">{alert.time}</span>
            </div>
            <p className="px-3.5 pb-3 text-[13px] leading-[19px] text-[#48484a]">
              {alert.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScenarioTabs({
  scenarios,
  activeIndex,
  onSelect,
}: {
  scenarios: DemoScenario[]
  activeIndex: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {scenarios.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          className={cn(
            'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all',
            i === activeIndex
              ? 'bg-[#5c6dff] text-white shadow-sm'
              : 'bg-white text-[#59627b] hover:bg-[#eef0f7] hover:text-[#0f1320]'
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}

export function DemoSection({ category }: { category: DemoCategory }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeScenario = category.scenarios[activeIndex]

  return (
    <section id={category.id} className="scroll-mt-40 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#5c6dff]">
          {category.badge}
        </p>
        <h2
          className={cn(
            'mb-4 text-3xl font-semibold tracking-tight md:text-4xl',
            displayFont.className
          )}
        >
          {category.title}
        </h2>
        <p className="mb-10 max-w-2xl text-lg text-[#59627b]">{category.description}</p>

        {category.id === 'image-pdf' && (
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {SOURCE_IMAGES.map((img) => (
              <div
                key={img.src}
                className="group overflow-hidden rounded-xl border border-[#0f1320]/8 bg-white shadow-sm transition-transform hover:scale-[1.04]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                  />
                </div>
                <p className="px-2 py-2 text-center text-xs font-medium text-[#59627b]">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>
        )}

        <ScenarioTabs
          scenarios={category.scenarios}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <StaticDemoChat demoPromptKey={activeScenario.demoPromptKey} />

        {category.id === 'rag' && (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {RAG_EXAMPLE_QUERIES.map((q) => (
              <div
                key={q}
                className="rounded-2xl border border-white/30 bg-white/50 px-5 py-4 shadow-sm backdrop-blur-md"
              >
                <p className="text-sm font-medium text-[#0f1320]">&ldquo;{q}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

        {category.id === 'proactive' && (
          <>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {PROACTIVE_PHONES.map((phone) => (
                <div key={phone.id} className="text-center">
                  <ProactiveCard alerts={phone.alerts} />
                  <p className="mt-4 text-sm font-semibold text-[#0f1320]">{phone.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#5c6dff]/15 bg-[#5c6dff]/[0.06] px-5 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#5c6dff]" />
                <span className="text-sm font-medium text-[#5c6dff]">Coming soon with the mobile app</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
