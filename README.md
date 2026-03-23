<p align="center">
  <img src="public/morph_logo_new.png" alt="Morph AI" width="80" />
</p>

<h1 align="center">Morph AI</h1>

<p align="center">
  <strong>Your always-on chief of staff for scheduling and task management</strong>
</p>

<p align="center">
  <a href="https://jungwoo-ahn.github.io/morph-ai-docs/">Landing Page</a> &bull;
  <a href="https://morph-ai.app">Try Morph AI</a> &bull;
  <a href="https://jungwoo-ahn.github.io/morph-ai-docs/docs/">Documentation</a>
</p>

---

<p align="center">
  <img src="public/demo/text-screenshot-v2.png" alt="Morph AI — Tasks, Calendar, and AI Chat in one view" width="100%" />
</p>

<p align="center"><em>Tasks &middot; Calendar &middot; AI Chat — all in one view</em></p>

<p align="center">
  <img src="public/demo/chat-usecases-demo.gif" alt="Morph AI demo reel — text, image, audio, and web search" width="100%" />
</p>

<p align="center"><em>One assistant for text, images, audio, and web search</em></p>

---

## How it works

Morph turns messy inputs into clean execution. One assistant loop handles **capture, context, search, and execution** — no app switching required.

| Step | What happens |
|------|-------------|
| **Capture** | Understand intent from text, image, PDF, audio, and web context |
| **Context** | Merge Calendar, Tasks, and history into one working memory |
| **Retrieve** | Semantic search over your data finds the right facts fast |
| **Execute + Sync** | Create/update events and tasks, then sync bi-directionally with Google |

---

## Text input

Type naturally — Morph creates events, plans tasks, summarizes schedules, and sets up recurring patterns from a single message.

### Multi-event creation

Add multiple events in one message. Morph parses each one and queues them for your calendar.

<p align="center">
  <img src="public/demo/chat-01-multi-event-generation.png" alt="Multi-event creation from a single message" width="100%" />
</p>

### AI-powered task planning

Break down goals into subtasks and schedule focus time — all from a single message.

<p align="center">
  <img src="public/demo/chat-02-task-planning.png" alt="AI task planning — break down goals into subtasks" width="100%" />
</p>

### Schedule summary

Ask "What does my week look like?" and get a structured overview of meetings, deadlines, and free blocks.

<p align="center">
  <img src="public/demo/chat-03-schedule-summary.png" alt="AI-generated weekly schedule summary" width="100%" />
</p>

### Recurring events

Set up repeating schedules with natural language. Morph creates the events and syncs with Google Calendar.

<p align="center">
  <img src="public/demo/chat-04-recurring-plan.png" alt="Recurring event creation from natural language" width="100%" />
</p>

---

## Image & PDF

Upload a photo of a conference schedule, class announcement, email, or messenger chat — Morph reads it and creates structured events.

<p align="center">
  <img src="public/demo/sources/ai-conference-timetable.png" alt="Conference timetable" width="32%" />
  <img src="public/demo/sources/fcb-schedule.png" alt="Sports schedule" width="32%" />
  <img src="public/demo/sources/golf-lesosn-schedule.png" alt="Golf schedule" width="32%" />
</p>

<p align="center">
  <img src="public/demo/sources/messanger.png" alt="Messenger chat" width="32%" />
  <img src="public/demo/sources/vc_email.png" alt="Email invite" width="32%" />
  <img src="public/demo/modern-algebra-class-anouncement.png" alt="Class announcement" width="32%" />
</p>

---

## Audio

Record a voice memo, capture a call, or dictate updates. Whisper transcribes the audio, then GPT-4o extracts events and tasks automatically.

- **Call recordings** — extract action items and schedule follow-ups
- **Voice memos** — pull out events and reminders from quick dictations
- **Client calls** — summarize key decisions and create follow-up events

---

## Web search

Ask Morph to look up sports schedules, holidays, deadlines, or travel plans — it searches the web and creates events automatically.

<p align="center">
  <img src="public/demo/chat-05-web-search-warriors.png" alt="Web search — find Warriors games and add to calendar" width="100%" />
</p>

---

## Semantic search

Powered by pgvector embeddings. Ask contextual questions about past events, workload patterns, or upcoming preparations.

- *"When is my next homework due?"*
- *"How many hours did I spend in meetings last month?"*
- *"What was the outcome of my last 1-on-1 with Jake?"*

---

## Proactive AI <sub><sup>(Coming soon)</sup></sub>

Morph monitors your schedule 24/7 and sends intelligent nudges before you ask.

<p align="center">
  <img src="public/demo/proactive/proactive-mobile-gap-fill.png" alt="Gap-fill nudge" width="22%" />
  <img src="public/demo/proactive/proactive-mobile-deadline-guard.png" alt="Deadline guard" width="22%" />
  <img src="public/demo/proactive/proactive-mobile-commute-replan.png" alt="Commute replan" width="22%" />
  <img src="public/demo/proactive/proactive-mobile-daily-brief.png" alt="Daily brief" width="22%" />
</p>

<p align="center"><em>Gap-fill &bull; Deadline guard &bull; Commute replan &bull; Daily brief</em></p>

---

## Tech stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **AI**: GPT-4o, GPT-4 Vision, Whisper
- **Database**: PostgreSQL + pgvector (semantic search)
- **Sync**: Google Calendar & Google Tasks (bi-directional)
- **Languages**: 10 languages supported

---

<p align="center">
  <a href="https://morph-ai.app/auth/signin">
    <img src="https://img.shields.io/badge/Start%20with%20Google-black?style=for-the-badge&logo=google&logoColor=white" alt="Start with Google" />
  </a>
</p>

<p align="center">
  <sub>Made by <a href="https://github.com/jungwoo-ahn">Jungwoo Ahn</a></sub>
</p>
