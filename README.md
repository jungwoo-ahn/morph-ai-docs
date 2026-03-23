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

### Conference schedule &rarr; filtered events

<p align="center">
  <img src="public/demo/chat-img-conference.png" alt="Image input — extract conference events by speaker" width="100%" />
</p>

### Messenger chat &rarr; events + tasks

<p align="center">
  <img src="public/demo/chat-img-messenger.png" alt="Image input — extract plans from messenger" width="100%" />
</p>

### Email invite &rarr; meeting + prep tasks

<p align="center">
  <img src="public/demo/chat-img-email.png" alt="Image input — parse email invite into calendar event" width="100%" />
</p>

---

## Audio

Record a voice memo, capture a call, or dictate updates. Whisper transcribes the audio, then GPT-4o extracts events and tasks automatically.

### Call recording &rarr; events + action items

<p align="center">
  <img src="public/demo/chat-audio-call.png" alt="Audio input — extract events from call recording" width="100%" />
</p>

### Voice memo &rarr; event + task

<p align="center">
  <img src="public/demo/chat-audio-memo.png" alt="Audio input — transcribe voice memo into events" width="100%" />
</p>

---

## Web search

Ask Morph to look up sports schedules, holidays, deadlines, or travel plans — it searches the web and creates events automatically.

### Sports schedule lookup

<p align="center">
  <img src="public/demo/chat-05-web-search-warriors.png" alt="Web search — find Warriors games and add to calendar" width="100%" />
</p>

### Federal holidays

<p align="center">
  <img src="public/demo/chat-web-holidays.png" alt="Web search — add US federal holidays to calendar" width="100%" />
</p>

---

## Semantic search

Powered by pgvector embeddings. Ask contextual questions about past events, workload patterns, or upcoming preparations.

### Assignment lookup

<p align="center">
  <img src="public/demo/chat-rag-homework.png" alt="Semantic search — look up homework details" width="100%" />
</p>

### Workload summary

<p align="center">
  <img src="public/demo/chat-rag-hours.png" alt="Semantic search — meeting hours analysis" width="100%" />
</p>

---

## Proactive AI <sub><sup>(Coming soon)</sup></sub>

Morph monitors your schedule 24/7 and sends intelligent nudges before you ask.

<p align="center">
  <img src="public/demo/proactive/proactive-cards.png" alt="Proactive AI — gap fill, deadline guard, commute replan, daily brief" width="100%" />
</p>

<p align="center"><em>Gap-fill &bull; Deadline guard &bull; Commute replan &bull; Daily brief</em></p>

<p align="center">
  <img src="public/demo/proactive/proactive-chat-demo.png" alt="Proactive AI — automated prep block and task creation" width="100%" />
</p>

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
