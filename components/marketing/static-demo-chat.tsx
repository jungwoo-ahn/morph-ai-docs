'use client'

import Image from 'next/image'
import { Calendar, MapPin, CheckSquare, Mic, FileText, Repeat, Trash2, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEMO_MESSAGES, type DemoMessage, type DemoEvent, type DemoTask, type DemoPreview } from './demo-data'

const BASE_PATH = '/morph-ai-docs'

function formatDateTime(iso: string, allDay?: boolean): string {
  const d = new Date(iso)
  if (allDay) {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
  return (
    d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }) +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  )
}

function formatTimeRange(start: string, end: string, allDay?: boolean): string {
  if (allDay) return 'All day'
  const s = new Date(start)
  const e = new Date(end)
  const dateStr = s.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const startTime = s.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  const endTime = e.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${dateStr}, ${startTime} - ${endTime}`
}

/** Simple markdown-like rendering for assistant content */
function RichText({ text }: { text: string }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />)
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <div
          key={key++}
          className="border-l-2 border-[#5c6dff]/30 pl-3 text-[13px] italic text-[#59627b]"
        >
          {inlineMd(line.slice(2))}
        </div>
      )
      continue
    }

    // Bullet list
    if (/^[-] /.test(line)) {
      elements.push(
        <div key={key++} className="flex gap-1.5">
          <span className="mt-0.5 text-[#5c6dff]">&bull;</span>
          <span>{inlineMd(line.slice(2))}</span>
        </div>
      )
      continue
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s(.+)/)
    if (numMatch) {
      elements.push(
        <div key={key++} className="flex gap-1.5">
          <span className="min-w-[1.2em] text-[#59627b]">{numMatch[1]}.</span>
          <span>{inlineMd(numMatch[2])}</span>
        </div>
      )
      continue
    }

    elements.push(<div key={key++}>{inlineMd(line)}</div>)
  }

  return <div className="space-y-1">{elements}</div>
}

/** Inline markdown: **bold** and links */
function inlineMd(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf('**')
    if (boldIdx === -1) {
      parts.push(remaining)
      break
    }
    if (boldIdx > 0) {
      parts.push(remaining.slice(0, boldIdx))
    }
    const endIdx = remaining.indexOf('**', boldIdx + 2)
    if (endIdx === -1) {
      parts.push(remaining)
      break
    }
    parts.push(
      <strong key={key++} className="font-semibold text-[#0f1320]">
        {remaining.slice(boldIdx + 2, endIdx)}
      </strong>
    )
    remaining = remaining.slice(endIdx + 2)
  }
  return <>{parts}</>
}

// ── Cards ───────────────────────────────────────────────────────────────

function EventCard({ event }: { event: DemoEvent }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#0f1320]/[0.06] bg-white shadow-sm">
      <div className="flex">
        <div className="w-1 shrink-0 bg-[#5c6dff]" />
        <div className="min-w-0 flex-1 px-3.5 py-3 space-y-1.5">
          <p className="truncate text-[14px] font-semibold text-[#0f1320]">
            {event.title}
          </p>
          <div className="flex items-center gap-1.5 text-[12px] text-[#59627b]">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {formatTimeRange(event.startTime, event.endTime, event.allDay)}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#59627b]">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          {event.recurrence && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#5c6dff]">
              <Repeat className="h-3 w-3 shrink-0" />
              <span>
                Every {event.recurrence.byDay?.join(', ') ?? 'week'} &times;{' '}
                {event.recurrence.count}
              </span>
            </div>
          )}
          {event.description && (
            <p className="line-clamp-2 text-[12px] leading-relaxed text-[#7a8198]">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task }: { task: DemoTask }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#0f1320]/[0.06] bg-white shadow-sm">
      <div className="flex">
        <div className="w-1 shrink-0 bg-emerald-500" />
        <div className="min-w-0 flex-1 px-3.5 py-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
            <p className="truncate text-[14px] font-semibold text-[#0f1320]">
              {task.title}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#59627b]">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="truncate">
              Due {formatDateTime(task.dueDate)}
            </span>
          </div>
          {task.notes && (
            <p className="line-clamp-2 text-[12px] leading-relaxed text-[#7a8198]">
              {task.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function PreviewSection({ preview }: { preview: DemoPreview }) {
  const { functionName, functionArgs } = preview
  const events = functionArgs.events ?? (functionArgs.updates ? [functionArgs.updates] : [])
  const tasks = functionArgs.tasks ?? []

  // Build header text
  let headerText = ''
  let HeaderIcon = Calendar
  if (functionName === 'delete_events') {
    const count = functionArgs.eventIds?.length ?? 0
    headerText = `${count} event${count !== 1 ? 's' : ''} will be removed`
    HeaderIcon = Trash2
  } else if (functionName === 'update_event') {
    headerText = 'Event update ready'
    HeaderIcon = PenLine
  } else {
    const parts: string[] = []
    if (events.length > 0)
      parts.push(`${events.length} event${events.length !== 1 ? 's' : ''}`)
    if (tasks.length > 0)
      parts.push(`${tasks.length} task${tasks.length !== 1 ? 's' : ''}`)
    headerText = parts.join(' and ') + ' ready to add'
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#5c6dff]">
        <HeaderIcon className="h-3.5 w-3.5" />
        {headerText}
      </div>

      {functionName === 'delete_events' ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {functionArgs.eventIds?.length ?? 0} investor-related meetings found and
          queued for deletion.
        </div>
      ) : (
        <div className="space-y-2">
          {events.map((evt, i) => (
            <EventCard key={i} event={evt} />
          ))}
          {tasks.map((task, i) => (
            <TaskCard key={i} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Bubbles ─────────────────────────────────────────────────────────────

function UserBubble({ msg }: { msg: DemoMessage }) {
  return (
    <div className="flex flex-col items-end gap-2">
      {msg.fileType === 'image' && msg.image && (
        <div className="overflow-hidden rounded-xl border border-white/40 shadow-sm"
          style={{ width: 120, height: 90 }}
        >
          <Image
            src={msg.image}
            alt="Uploaded image"
            width={120}
            height={90}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {msg.fileType === 'audio' && msg.audioName && (
        <div className="flex items-center gap-2 rounded-full bg-[#4b5bef] px-4 py-2 text-[13px] text-white/90">
          <Mic className="h-3.5 w-3.5" />
          {msg.audioName}
        </div>
      )}

      {msg.fileType === 'pdf' && (
        <div className="flex items-center gap-2 rounded-full bg-[#4b5bef] px-4 py-2 text-[13px] text-white/90">
          <FileText className="h-3.5 w-3.5" />
          PDF document
        </div>
      )}

      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#5c6dff] px-4 py-3 text-[14px] leading-relaxed text-white shadow-md">
        {msg.content}
      </div>
    </div>
  )
}

function AssistantBubble({ msg }: { msg: DemoMessage }) {
  return (
    <div className="flex gap-2.5">
      <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f0f1f5]">
        <img
          src={`${BASE_PATH}/morph_logo_new.svg`}
          alt=""
          aria-hidden="true"
          className="h-4 w-4"
        />
      </div>

      <div className="min-w-0 max-w-[85%] space-y-0">
        <div className="rounded-2xl rounded-tl-md bg-[#f6f7fa] px-4 py-3 text-[14px] leading-relaxed text-[#2c3142] shadow-sm">
          <RichText text={msg.content} />
        </div>
        {msg.preview && <PreviewSection preview={msg.preview} />}
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────────────────

export function StaticDemoChat({
  demoPromptKey,
  className,
}: {
  demoPromptKey: string
  className?: string
}) {
  const messages = DEMO_MESSAGES[demoPromptKey]

  if (!messages) {
    return (
      <div
        className={cn(
          'flex h-[400px] items-center justify-center rounded-2xl border border-[#0f1320]/10 bg-white text-[#59627b] shadow-lg',
          className
        )}
      >
        Demo not available
      </div>
    )
  }

  return (
    <div
      className={cn(
        'max-h-[560px] overflow-y-auto rounded-2xl border border-[#0f1320]/10 bg-white shadow-lg',
        className
      )}
    >
      <div className="space-y-5 px-5 py-6">
        {messages.map((msg, i) =>
          msg.role === 'user' ? (
            <UserBubble key={i} msg={msg} />
          ) : (
            <AssistantBubble key={i} msg={msg} />
          )
        )}
      </div>
    </div>
  )
}
