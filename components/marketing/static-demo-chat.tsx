'use client'

import Image from 'next/image'
import {
  Calendar,
  MapPin,
  CheckSquare,
  Mic,
  FileText,
  Repeat,
  Trash2,
  PenLine,
  Plus,
  Clock,
  Users,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEMO_MESSAGES, type DemoMessage, type DemoEvent, type DemoTask, type DemoPreview } from './demo-data'

const BASE_PATH = '/morph-ai-docs'

function formatTimeRange(start: string, end: string, allDay?: boolean): string {
  if (allDay) {
    const s = new Date(start)
    return s.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  const s = new Date(start)
  const e = new Date(end)
  const dateStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const startTime = s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${dateStr} at ${startTime} - ${endTime}`
}

function formatDueDate(iso: string): string {
  const d = new Date(iso)
  return (
    'Due ' +
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) +
    ' at ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  )
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
    if (line.startsWith('> ')) {
      elements.push(
        <div key={key++} className="border-l-2 border-[#5c6dff]/30 pl-3 text-[13px] italic text-[#59627b]">
          {inlineMd(line.slice(2))}
        </div>
      )
      continue
    }
    if (/^[-] /.test(line)) {
      elements.push(
        <div key={key++} className="flex gap-1.5">
          <span className="mt-0.5 text-[#5c6dff]">&bull;</span>
          <span>{inlineMd(line.slice(2))}</span>
        </div>
      )
      continue
    }
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

function inlineMd(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0
  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf('**')
    if (boldIdx === -1) { parts.push(remaining); break }
    if (boldIdx > 0) parts.push(remaining.slice(0, boldIdx))
    const endIdx = remaining.indexOf('**', boldIdx + 2)
    if (endIdx === -1) { parts.push(remaining); break }
    parts.push(<strong key={key++} className="font-semibold text-[#0f1320]">{remaining.slice(boldIdx + 2, endIdx)}</strong>)
    remaining = remaining.slice(endIdx + 2)
  }
  return <>{parts}</>
}

// ── Preview Cards (matching real app) ───────────────────────────────────

function EventCard({ event, isUpdate }: { event: DemoEvent; isUpdate?: boolean }) {
  return (
    <div className="rounded-2xl border border-[#e8e5f0] bg-white p-4 mb-2">
      {/* Title pill */}
      <div className="mb-3">
        <div className="inline-flex w-full max-w-full items-center gap-2.5 rounded-full border border-[#c9bbff] bg-[#c9bbff]/10 px-3.5 h-9 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
          <span className="truncate text-sm font-medium text-[#0f1320]">{event.title}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{formatTimeRange(event.startTime, event.endTime, event.allDay)}</span>
        </div>
        {event.location && (
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        {event.recurrence && (
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <Repeat className="h-3.5 w-3.5 shrink-0" />
            <span>Repeats every week on {event.recurrence.byDay?.join(', ')} &times; {event.recurrence.count}</span>
          </div>
        )}
        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{event.attendees.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {event.description && (
        <div className="mb-3 rounded-xl bg-[#f4f4f5]/60 px-3 py-2 text-xs leading-relaxed text-[#71717a]">
          {event.description}
        </div>
      )}

      {/* Calendar selector */}
      <div className="mb-3">
        <div className="flex h-9 w-full items-center justify-between rounded-xl border border-[#e4e4e7]/60 bg-[#fafafa]/80 px-3 text-xs font-medium text-[#71717a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
          <span>Select calendar</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-1.5 pt-1">
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#5134ff] px-3 text-xs font-semibold text-white shadow-sm">
          <Plus className="h-3.5 w-3.5" />
          {isUpdate ? 'Update' : 'Add'}
        </button>
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#e4e4e7]/60 bg-transparent px-3 text-xs font-medium text-[#0f1320]/80 shadow-sm">
          <PenLine className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
    </div>
  )
}

function TaskCard({ task }: { task: DemoTask }) {
  return (
    <div className="rounded-2xl border border-[#e8e5f0] bg-white p-4 mb-2">
      {/* Title pill */}
      <div className="mb-3 flex items-center gap-2">
        <div className="inline-flex w-full max-w-full items-center gap-2.5 rounded-full border border-[#5c6dff]/40 bg-[#5c6dff]/10 px-3.5 h-9 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
          <CheckSquare className="h-3.5 w-3.5 shrink-0 text-[#5134ff]" />
          <span className="truncate text-sm font-medium text-[#0f1320]">{task.title}</span>
        </div>
      </div>

      {/* Due date */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{formatDueDate(task.dueDate)}</span>
        </div>
      </div>

      {/* Notes */}
      {task.notes && (
        <div className="mb-3 rounded-xl bg-[#f4f4f5]/60 px-3 py-2 text-xs leading-relaxed text-[#71717a]">
          {task.notes}
        </div>
      )}

      {/* Task list selector */}
      <div className="mb-3">
        <div className="flex h-9 w-full items-center justify-between rounded-xl border border-[#e4e4e7]/60 bg-[#fafafa]/80 px-3 text-xs font-medium text-[#71717a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
          <span>My Tasks</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-1.5 pt-1">
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#5134ff] px-3 text-xs font-semibold text-white shadow-sm">
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#e4e4e7]/60 bg-transparent px-3 text-xs font-medium text-[#0f1320]/80 shadow-sm">
          <PenLine className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
    </div>
  )
}

function DeleteCard({ count }: { count: number }) {
  return (
    <div className="rounded-2xl border border-red-300/40 bg-red-50/50 p-4 mb-2">
      <div className="mb-3">
        <div className="inline-flex w-full max-w-full items-center gap-2.5 rounded-full border border-red-400/40 bg-red-500/10 px-3.5 h-9 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
          <Trash2 className="h-3.5 w-3.5 shrink-0 text-red-600" />
          <span className="truncate text-sm font-medium text-red-800">
            {count} investor-related meeting{count !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>
      <p className="mb-3 text-xs text-red-700/80">
        These events will be removed from your calendar. This action cannot be undone.
      </p>
      <div className="flex gap-1.5 pt-1">
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 text-xs font-semibold text-white shadow-sm">
          <Trash2 className="h-3.5 w-3.5" />
          Delete all
        </button>
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#e4e4e7]/60 bg-transparent px-3 text-xs font-medium text-[#0f1320]/80 shadow-sm">
          Cancel
        </button>
      </div>
    </div>
  )
}

function AddAllButton({ events, tasks, isUpdate }: { events: number; tasks: number; isUpdate?: boolean }) {
  const total = events + tasks
  if (total < 2) return null

  const parts: string[] = []
  if (events > 0) parts.push(`${events} event${events !== 1 ? 's' : ''}`)
  if (tasks > 0) parts.push(`${tasks} task${tasks !== 1 ? 's' : ''}`)
  const label = isUpdate
    ? `Update ${parts.join(' / ')}`
    : `Add all ${parts.join(' / ')}`

  return (
    <div className="mb-2">
      <button className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-2xl border border-[#5134ff]/30 bg-[#5134ff] text-white text-sm font-semibold shadow-sm">
        <Plus className="h-3.5 w-3.5" />
        {label}
      </button>
    </div>
  )
}

function PreviewSection({ preview }: { preview: DemoPreview }) {
  const { functionName, functionArgs } = preview
  const events = functionArgs.events ?? (functionArgs.updates ? [functionArgs.updates] : [])
  const tasks = functionArgs.tasks ?? []
  const isUpdate = functionName === 'update_event'

  // Header text
  let headerText = ''
  if (functionName === 'delete_events') {
    const count = functionArgs.eventIds?.length ?? 0
    headerText = `${count} event${count !== 1 ? 's' : ''} will be removed`
  } else if (isUpdate) {
    headerText = '1 event update ready'
  } else {
    const parts: string[] = []
    if (events.length > 0) parts.push(`${events.length} event${events.length !== 1 ? 's' : ''}`)
    if (tasks.length > 0) parts.push(`${tasks.length} task${tasks.length !== 1 ? 's' : ''}`)
    headerText = parts.join(' and ') + ' ready to add'
  }

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#5134ff] mb-3">
        <Calendar className="h-3.5 w-3.5" />
        {headerText}
      </div>

      {functionName === 'delete_events' ? (
        <DeleteCard count={functionArgs.eventIds?.length ?? 0} />
      ) : (
        <>
          <AddAllButton events={events.length} tasks={tasks.length} isUpdate={isUpdate} />
          {events.map((evt, i) => (
            <EventCard key={`e${i}`} event={evt} isUpdate={isUpdate} />
          ))}
          {tasks.map((task, i) => (
            <TaskCard key={`t${i}`} task={task} />
          ))}
        </>
      )}
    </div>
  )
}

// ── Bubbles ─────────────────────────────────────────────────────────────

function UserBubble({ msg }: { msg: DemoMessage }) {
  return (
    <div className="flex flex-col items-end gap-2">
      {msg.fileType === 'image' && msg.image && (
        <div className="overflow-hidden rounded-xl border border-white/40 shadow-sm" style={{ width: 120, height: 90 }}>
          <Image src={msg.image} alt="Uploaded image" width={120} height={90} className="h-full w-full object-cover" />
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
        <img src={`${BASE_PATH}/morph_logo_new.svg`} alt="" aria-hidden="true" className="h-4 w-4" />
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
      <div className={cn('flex h-[400px] items-center justify-center rounded-2xl border border-[#0f1320]/10 bg-white text-[#59627b] shadow-lg', className)}>
        Demo not available
      </div>
    )
  }

  return (
    <div className={cn('max-h-[560px] overflow-y-auto rounded-2xl border border-[#0f1320]/10 bg-white shadow-lg', className)}>
      <div className="space-y-5 px-5 py-6">
        {messages.map((msg, i) =>
          msg.role === 'user' ? <UserBubble key={i} msg={msg} /> : <AssistantBubble key={i} msg={msg} />
        )}
      </div>
    </div>
  )
}
