# Demo Source Assets (Marketing)

Last updated: 2026-02-23

This folder stores source files used by deterministic demo scenarios rendered in:

- `/demo-app?demoMode=marketing&demoPrompt=<key>`

All generated preview cards are targeted to:

- `morph.ahn@gmail.com`

## Active source files

- `ai-conference-timetable.png`
  - Prompt: `Please add events where the speaker is John or Lee.`
  - Demo key: `img-ai-conference-john-lee`
- `call-recording-demo.m4a`
  - Prompt: `Please extract events and tasks from this call recording.`
  - Demo key: `audio-call-recording-default`
- `voice-memo-short-demo.m4a`
  - Prompt: `Please transcribe this short voice memo and extract events/tasks.`
  - Demo key: `audio-voice-memo-short`
- `client-call-long-demo.m4a`
  - Prompt: `Please transcribe this client call and prepare event/task updates.`
  - Demo key: `audio-client-call-long`
- `fcb-schedule.png`
  - Prompt: `Please add only FC Barcelona home games from this schedule.`
  - Demo key: `img-fcb-home-only`
- `golf-lesosn-schedule.png`
  - Prompt: `Please add only entries with my name (Daniel).`
  - Demo key: `img-golf-daniel-only`
- `messanger.png`
  - Prompt: `Please extract all events and tasks from this messenger screenshot.`
  - Demo key: `img-messenger-default`
- `ucsd-academic-calendar-2026-2027.pdf`
  - Prompt: `Please extract all events and tasks from this academic calendar PDF.`
  - Demo key: `pdf-ucsd-default`
- `vc_email.png`
  - Prompt: `Please extract all events and tasks from this email screenshot.`
  - Demo key: `img-vc-email-default`
- `../modern-algebra-class-anouncement.png`
  - Prompt: `Extract homework details from this class announcement and create a structured task plan.`
  - Demo key: `img-modern-algebra-announcement`

## Notes

- These scenarios are hardcoded for stable marketing demos.
- UI controls stay read-only in demo mode; scrolling is allowed.
- Proactive mobile mock previews are generated assets at:
  - `/public/demo/proactive/proactive-mobile-gap-fill.png`
  - `/public/demo/proactive/proactive-mobile-deadline-guard.png`
  - `/public/demo/proactive/proactive-mobile-commute-replan.png`
  - `/public/demo/proactive/proactive-mobile-daily-brief.png`
  - Regenerate with: `python3 scripts/generate-proactive-mobile-mocks.py`
