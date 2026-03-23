const BASE_PATH = '/morph-ai-docs'

export type DemoEvent = {
  title: string
  startTime: string
  endTime: string
  location?: string
  description?: string
  allDay?: boolean
  attendees?: string[]
  recurrence?: {
    frequency: string
    interval: number
    byDay?: string[]
    count?: number
  }
}

export type DemoTask = {
  title: string
  dueDate: string
  notes?: string
}

export type DemoPreview = {
  functionName:
    | 'create_events'
    | 'create_events_and_tasks'
    | 'create_tasks'
    | 'update_event'
    | 'delete_events'
  functionArgs: {
    events?: DemoEvent[]
    tasks?: DemoTask[]
    eventId?: string
    updates?: DemoEvent
    eventIds?: string[]
  }
}

export type DemoMessage = {
  role: 'user' | 'assistant'
  content: string
  image?: string
  fileType?: 'image' | 'audio' | 'pdf'
  audioName?: string
  preview?: DemoPreview
}

export const DEMO_MESSAGES: Record<string, DemoMessage[]> = {
  // ── Text ──────────────────────────────────────────────────────────────
  'multi-event': [
    {
      role: 'user',
      content:
        'Create three events next week: Product kickoff Monday 10 AM, Customer call Wednesday 2 PM, Team retro Friday 4 PM.',
    },
    {
      role: 'assistant',
      content:
        'Ready. I generated 3 events with times, location details, and attendee context.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'Product kickoff',
              startTime: '2026-02-23T10:00:00',
              endTime: '2026-02-23T11:00:00',
              location: 'Morph HQ 10F - Atlas Room',
              description:
                'Agenda: launch goals, owner alignment, risk review, and milestone lock.',
              attendees: ['alex@morph.ai', 'sarah@morph.ai', 'david@morph.ai'],
            },
            {
              title: 'Customer call',
              startTime: '2026-02-25T14:00:00',
              endTime: '2026-02-25T15:00:00',
              location: 'Zoom',
              description:
                'Enterprise onboarding check-in. Review usage blockers and integration timeline.',
              attendees: ['ops@novabank.com', 'cs@morph.ai'],
            },
            {
              title: 'Team retro',
              startTime: '2026-02-27T16:00:00',
              endTime: '2026-02-27T17:00:00',
              location: 'Morph HQ 9F - Open Stage',
              description:
                'Sprint retrospective with action items for quality, release process, and handoff speed.',
              attendees: ['eng@morph.ai', 'design@morph.ai'],
            },
          ],
        },
      },
    },
  ],

  'task-plan': [
    {
      role: 'user',
      content:
        'Create three tasks for this week: finalize investor update by Thursday 5 PM, draft hiring plan by Friday 12 PM, update website copy by Friday 6 PM.',
    },
    {
      role: 'assistant',
      content: 'Done. I prepared 3 tasks with due times and concrete execution notes.',
      preview: {
        functionName: 'create_tasks',
        functionArgs: {
          tasks: [
            {
              title: 'Finalize investor update',
              dueDate: '2026-02-26T17:00:00',
              notes:
                'Include KPI deltas, monthly burn, and Q2 hiring plan assumptions. Attach latest board deck.',
            },
            {
              title: 'Draft hiring plan',
              dueDate: '2026-02-27T12:00:00',
              notes:
                'Finalize role priorities, interview loop owners, and compensation bands for Eng + GTM hires.',
            },
            {
              title: 'Update website copy',
              dueDate: '2026-02-27T18:00:00',
              notes:
                'Refresh hero, product proof section, and pricing CTA language for launch week.',
            },
          ],
        },
      },
    },
  ],

  summary: [
    {
      role: 'user',
      content: 'What do I have next week? Highlight busy days and free blocks.',
    },
    {
      role: 'assistant',
      content:
        'Next week at a glance:\n\n- **Mon, Feb 23:** Product kickoff at 10:00 AM.\n- **Tue, Feb 24:** Deep work block available 1:00-4:00 PM.\n- **Wed, Feb 25:** Customer call at 2:00 PM.\n- **Thu, Feb 26:** Focus window after 3:30 PM.\n- **Fri, Feb 27:** Team retro at 4:00 PM.\n\nSuggested focus block: **Tue 1:30-3:30 PM** for proposal drafting.',
    },
  ],

  'event-edit': [
    {
      role: 'user',
      content:
        'Move Friday standup to 2 PM, rename it to Friday Team Standup, and add prep notes.',
    },
    {
      role: 'assistant',
      content:
        'Prepared an update card for your standup. It now starts at 2:00 PM with a clearer title and prep checklist in the description.',
      preview: {
        functionName: 'update_event',
        functionArgs: {
          eventId: 'evt-007',
          updates: {
            title: 'Friday Team Standup',
            startTime: '2026-02-27T14:00:00',
            endTime: '2026-02-27T14:30:00',
            location: 'Morph HQ 9F - Standup Zone',
            description:
              'Updated due to customer overlap. Prep checklist: blocker updates, launch risk log, and owner handoff notes.',
          },
        },
      },
    },
  ],

  recurring: [
    {
      role: 'user',
      content:
        'Create a weekly planning event every Monday at 9:30 AM for the next 6 weeks and add a task reminder every Sunday at 6 PM.',
    },
    {
      role: 'assistant',
      content:
        'Prepared one recurring planning event and one weekly reminder task. You can add both together.',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Weekly Planning Block',
              startTime: '2026-02-23T09:30:00',
              endTime: '2026-02-23T10:15:00',
              location: 'Morph HQ - Strategy Room',
              description:
                'Review top priorities, dependencies, and execution risks for the upcoming week.',
              recurrence: {
                frequency: 'WEEKLY',
                interval: 1,
                byDay: ['MO'],
                count: 6,
              },
            },
          ],
          tasks: [
            {
              title: 'Send Monday agenda draft',
              dueDate: '2026-02-22T18:00:00',
              notes:
                'Collect blockers from Eng/Design, finalize owner list, and attach pre-read links.',
            },
          ],
        },
      },
    },
  ],

  'event-delete': [
    {
      role: 'user',
      content: 'Remove all investor-related meetings this month. They are canceled.',
    },
    {
      role: 'assistant',
      content:
        'Found investor-related meetings in this month. I prepared delete cards so you can remove them together or one by one.',
      preview: {
        functionName: 'delete_events',
        functionArgs: {
          eventIds: ['evt-015', 'evt-028'],
        },
      },
    },
  ],

  // ── Image & PDF ───────────────────────────────────────────────────────
  'img-ai-conference-john-lee': [
    {
      role: 'user',
      content: 'Please add events where the speaker is John or Lee.',
      image: `${BASE_PATH}/demo/sources/ai-conference-timetable.png`,
      fileType: 'image',
    },
    {
      role: 'assistant',
      content:
        'I filtered the timetable and kept only sessions with speakers named John or Lee. I found two matching sessions in the conference schedule.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'Keynote Address - Prof. John Doe',
              startTime: '2026-02-23T10:00:00',
              endTime: '2026-02-23T11:00:00',
              location: 'COEX Convention & Exhibition Center - Main Hall',
              description:
                'AI Conference Timetable (2026.02.23). Topic: "Future of Technology."',
            },
            {
              title: 'Workshop: AI in Business - Dr. Sarah Lee',
              startTime: '2026-02-23T13:00:00',
              endTime: '2026-02-23T14:30:00',
              location: 'COEX Convention & Exhibition Center - Room B',
              description:
                'AI Conference Timetable (2026.02.23). Notes: hands-on session.',
            },
          ],
        },
      },
    },
  ],

  'img-fcb-home-only': [
    {
      role: 'user',
      content: 'Please add only FC Barcelona home games from this schedule.',
      image: `${BASE_PATH}/demo/sources/fcb-schedule.png`,
      fileType: 'image',
    },
    {
      role: 'assistant',
      content:
        'Filtered to FC Barcelona home fixtures only (where Barcelona is listed first). I excluded away fixtures like Athletic Club vs Barcelona.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'FC Barcelona vs Levante (Home)',
              startTime: '2026-02-23T00:15:00',
              endTime: '2026-02-23T02:15:00',
              location: 'Barcelona (Home)',
              description: 'La Liga home fixture.',
            },
            {
              title: 'FC Barcelona vs Villarreal (Home)',
              startTime: '2026-03-01T00:15:00',
              endTime: '2026-03-01T02:15:00',
              location: 'Barcelona (Home)',
              description: 'La Liga home fixture.',
            },
            {
              title: 'FC Barcelona vs Atletico Madrid (Home)',
              startTime: '2026-03-04T05:00:00',
              endTime: '2026-03-04T07:00:00',
              location: 'Barcelona (Home)',
              description: 'Copa del Rey semifinal (Leg 2 of 2).',
            },
            {
              title: 'FC Barcelona vs Sevilla (Home)',
              startTime: '2026-03-16T00:15:00',
              endTime: '2026-03-16T02:15:00',
              location: 'Barcelona (Home)',
              description: 'La Liga home fixture.',
            },
            {
              title: 'FC Barcelona vs Rayo Vallecano (Home)',
              startTime: '2026-03-23T00:00:00',
              endTime: '2026-03-24T00:00:00',
              allDay: true,
              location: 'Barcelona (Home)',
              description: 'Kickoff time is TBD.',
            },
          ],
        },
      },
    },
  ],

  'img-golf-daniel-only': [
    {
      role: 'user',
      content:
        "Please add only entries with my name (Daniel).",
      image: `${BASE_PATH}/demo/sources/golf-lesosn-schedule.png`,
      fileType: 'image',
    },
    {
      role: 'assistant',
      content:
        'I scanned the timetable and found two entries for Daniel. Both slots are prepared as event cards.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'Golf Lesson - Daniel',
              startTime: '2026-02-24T16:00:00',
              endTime: '2026-02-24T16:30:00',
              location: 'Golf Lesson Schedule - Tue 2/24 column',
              description: 'Private lesson booking.',
            },
            {
              title: 'Golf Lesson - Daniel',
              startTime: '2026-02-26T14:00:00',
              endTime: '2026-02-26T14:30:00',
              location: 'Golf Lesson Schedule - Thu 2/26 column',
              description: 'Private lesson booking.',
            },
          ],
        },
      },
    },
  ],

  'img-messenger-default': [
    {
      role: 'user',
      content:
        'Please extract all events and tasks from this messenger screenshot.',
      image: `${BASE_PATH}/demo/sources/messanger.png`,
      fileType: 'image',
    },
    {
      role: 'assistant',
      content:
        'I captured the schedule-change request and prepared one updated class for today, two rescheduled Sunday classes, and a confirmation task.',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Tutoring Class - Harry (Today)',
              startTime: '2026-02-21T20:00:00',
              endTime: '2026-02-21T22:00:00',
              location: 'Online class',
              description:
                'Today update: keep only Harry in the 8-10 PM slot.',
            },
            {
              title: 'Tutoring Class - Harry (Sunday Make-up)',
              startTime: '2026-02-22T18:00:00',
              endTime: '2026-02-22T20:00:00',
              location: 'Online class',
              description: 'Rescheduled from Saturday per parent request.',
            },
            {
              title: 'Tutoring Class - Hannah (Sunday Make-up)',
              startTime: '2026-02-22T20:00:00',
              endTime: '2026-02-22T22:00:00',
              location: 'Online class',
              description: 'Rescheduled from Saturday per parent request.',
            },
          ],
          tasks: [
            {
              title: 'Confirm updated class schedule with Mrs. Lee',
              dueDate: '2026-02-22T17:00:00',
              notes:
                'Send final confirmation: today 8-10 PM Harry only, Sunday 6-8 PM Harry, Sunday 8-10 PM Hannah.',
            },
          ],
        },
      },
    },
  ],

  'img-vc-email-default': [
    {
      role: 'user',
      content:
        'Please extract all events and tasks from this email screenshot.',
      image: `${BASE_PATH}/demo/sources/vc_email.png`,
      fileType: 'image',
    },
    {
      role: 'assistant',
      content:
        'I reviewed the invitation details and prepared one meeting event plus two prep tasks.',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'STP Ventures Douglas Meeting',
              startTime: '2026-01-30T14:00:00',
              endTime: '2026-01-30T15:00:00',
              location:
                'Seoul Finance Center, 25th Floor, Conference Room A, Gwanghwamun Station',
              description:
                'Agenda from email: 20 mins founding team intro, 30 mins Q&A, 10 mins founder questions. Contact: +82 10 1234 5678.',
              attendees: [
                'jungwooahn@kaist.ac.kr',
                'douglas@stpventures.com',
              ],
            },
          ],
          tasks: [
            {
              title: 'Confirm co-founder attendance with organizer',
              dueDate: '2026-01-29T18:00:00',
              notes:
                'Email Douglas to confirm whether your co-founder will attend the 2-3 PM slot.',
            },
            {
              title: 'Prepare founding team intro + Q&A prep',
              dueDate: '2026-01-30T12:00:00',
              notes:
                'Prepare a concise company intro, top metrics, and founder questions for the STP Ventures meeting.',
            },
          ],
        },
      },
    },
  ],

  'pdf-ucsd-default': [
    {
      role: 'user',
      content:
        'Please extract all events and tasks from this academic calendar PDF.',
      fileType: 'pdf',
    },
    {
      role: 'assistant',
      content:
        'I reviewed the UCSD 2026-2027 academic calendar and prepared major quarter milestones as calendar events.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'UCSD Fall Instruction Begins',
              startTime: '2026-09-24T00:00:00',
              endTime: '2026-09-25T00:00:00',
              allDay: true,
              location: 'UC San Diego',
              description: 'Quarter start milestone.',
            },
            {
              title: 'UCSD Winter Quarter Begins',
              startTime: '2027-01-04T00:00:00',
              endTime: '2027-01-05T00:00:00',
              allDay: true,
              location: 'UC San Diego',
              description: 'Quarter start milestone.',
            },
            {
              title: 'UCSD Spring Instruction Begins',
              startTime: '2027-03-29T00:00:00',
              endTime: '2027-03-30T00:00:00',
              allDay: true,
              location: 'UC San Diego',
              description: 'Quarter start milestone.',
            },
            {
              title: 'UCSD Spring Final Exams',
              startTime: '2027-06-05T00:00:00',
              endTime: '2027-06-12T00:00:00',
              allDay: true,
              location: 'UC San Diego',
              description: 'Final exam period.',
            },
          ],
        },
      },
    },
  ],

  'img-modern-algebra-announcement': [
    {
      role: 'user',
      content:
        'Extract homework details from this class announcement and create a structured task plan.',
      image: `${BASE_PATH}/demo/modern-algebra-class-anouncement.png`,
      fileType: 'image',
    },
    {
      role: 'assistant',
      content:
        'I reviewed the homework announcement and cleaned it up for actionability. The image shows **Homework 3** with a deadline at **11:59 PM on 11/23**, so I normalized it to the upcoming date in this demo timeline (**Nov 23, 2026, 11:59 PM**).',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Modern Algebra HW3 Final Review',
              startTime: '2026-11-23T20:30:00',
              endTime: '2026-11-23T23:00:00',
              location: 'Library - Quiet Floor',
              description:
                'Review and verify all required sections before final submission at 11:59 PM.',
            },
          ],
          tasks: [
            {
              title: 'Submit Modern Algebra HW3',
              dueDate: '2026-11-23T23:59:00',
              notes:
                'Class policy: no late homework accepted. Source sections: 47 (10,15,16), 48 (7,8,22,33,34,35,36), 49 (4,5,9), 50 (2,6,13,18,22,23).',
            },
            {
              title: 'Solve remaining HW3 problem set',
              dueDate: '2026-11-22T20:00:00',
              notes:
                'Textbook: A First Course in Abstract Algebra (Fraleigh, 7th). Finish drafts one day before submission.',
            },
          ],
        },
      },
    },
  ],

  // ── Audio ─────────────────────────────────────────────────────────────
  'audio-call-recording-default': [
    {
      role: 'user',
      content: 'Please extract events and tasks from this call recording.',
      fileType: 'audio',
      audioName: 'call-recording-demo.m4a',
    },
    {
      role: 'assistant',
      content:
        "Transcribed and lightly cleaned filler words for readability.\n\n**Transcript used**\n\n> Call recap. Let's move the customer follow-up from Wednesday 3 p.m. to Wednesday 4 p.m.\n> Add a new event: vendor contract review on Thursday from 11 a.m. to noon at Morph HQ.\n> Also create a task: send revised notes to Mina by Thursday 5 p.m.\n\nPrepared one rescheduled follow-up event, one new vendor review event, and one action task.",
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Customer Follow-up (moved to 4:00 PM)',
              startTime: '2026-02-25T16:00:00',
              endTime: '2026-02-25T17:00:00',
              location: 'Zoom',
              description:
                'Rescheduled from 3:00 PM to 4:00 PM after call recap. Share updated timeline and open blockers.',
            },
            {
              title: 'Vendor Contract Review',
              startTime: '2026-02-26T11:00:00',
              endTime: '2026-02-26T12:00:00',
              location: 'Morph HQ',
              description:
                'Review revised terms, legal redlines, renewal clause, and implementation milestone dates.',
            },
          ],
          tasks: [
            {
              title: 'Send revised notes to Mina',
              dueDate: '2026-02-26T17:00:00',
              notes:
                'Include customer follow-up timing change, vendor contract review summary, and next-step owners.',
            },
          ],
        },
      },
    },
  ],

  'audio-voice-memo-short': [
    {
      role: 'user',
      content:
        'Please transcribe this short voice memo and extract events/tasks.',
      fileType: 'audio',
      audioName: 'voice-memo-short-demo.m4a',
    },
    {
      role: 'assistant',
      content:
        "Done. I transcribed this quick memo and normalized punctuation.\n\n**Transcript used**\n\n> Quick voice memo before I forget.\n> Add a coffee chat with Daniel on Tuesday, February 24th, from 6:30 p.m. to 7:00 p.m. at Blue Bottle (Mint Plaza).\n> Also create a task to buy a birthday gift for Mina, due Friday, February 27th at 6:00 p.m.\n\nPrepared one event and one task card from the memo.",
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Coffee Chat with Daniel',
              startTime: '2026-02-24T18:30:00',
              endTime: '2026-02-24T19:00:00',
              location: 'Blue Bottle Coffee, Mint Plaza',
              description: 'Casual check-in before weekend plans.',
            },
          ],
          tasks: [
            {
              title: 'Buy birthday gift for Mina',
              dueDate: '2026-02-27T18:00:00',
              notes:
                'Pick up a small gift and handwritten card before Friday dinner.',
            },
          ],
        },
      },
    },
  ],

  'audio-client-call-long': [
    {
      role: 'user',
      content:
        'Please transcribe this client call and prepare event/task updates.',
      fileType: 'audio',
      audioName: 'client-call-long-demo.m4a',
    },
    {
      role: 'assistant',
      content:
        'Transcribed the full call, removed filler words, and kept only actionable items.\n\n**Transcript used (edited for clarity)**\n\n- Move Northstar partnership sync to **Wednesday, Feb 25, 4:30-5:15 PM** (Zoom).\n- Add **Pilot onboarding workshop** on **Thursday, Feb 26, 1:00-2:00 PM** at Morph HQ 10F Atlas Room.\n- Add internal **workshop prep block** on **Thursday, Feb 26, 9:30-10:00 AM**.\n- Task: send revised onboarding notes to Priya by **Thursday 5:00 PM**.\n- Task: confirm AV setup by **Thursday 11:00 AM**.\n\nPrepared three event cards and two task cards.',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Northstar Partnership Sync (rescheduled)',
              startTime: '2026-02-25T16:30:00',
              endTime: '2026-02-25T17:15:00',
              location: 'Zoom',
              description:
                'Moved from 3:00 PM to 4:30 PM based on client call recap.',
            },
            {
              title: 'Pilot Onboarding Workshop',
              startTime: '2026-02-26T13:00:00',
              endTime: '2026-02-26T14:00:00',
              location: 'Morph HQ 10F - Atlas Room',
              description:
                'Client onboarding session with implementation milestones and owner handoff.',
            },
            {
              title: 'Onboarding Workshop Prep Block',
              startTime: '2026-02-26T09:30:00',
              endTime: '2026-02-26T10:00:00',
              location: 'Morph HQ 10F - Atlas Room',
              description:
                'Internal prep: run-through agenda, check slides, and align ownership.',
            },
          ],
          tasks: [
            {
              title: 'Send revised onboarding notes to Priya',
              dueDate: '2026-02-26T17:00:00',
              notes:
                'Include final timeline, owners, and updated sync time (4:30 PM Wednesday).',
            },
            {
              title: 'Confirm Atlas Room AV setup',
              dueDate: '2026-02-26T11:00:00',
              notes:
                'Validate HDMI, mic battery, and backup recording option before workshop.',
            },
          ],
        },
      },
    },
  ],

  // ── Web Search ────────────────────────────────────────────────────────
  warriors: [
    {
      role: 'user',
      content: "Look up the Warriors' next 3 home games and add them",
    },
    {
      role: 'assistant',
      content:
        'I found the next 3 Warriors home games and prepared event cards with tip-off times and venue details.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'Warriors vs Lakers',
              startTime: '2026-02-24T19:00:00',
              endTime: '2026-02-24T21:30:00',
              location: 'Chase Center, San Francisco, CA',
              description:
                'NBA Regular Season home game. Gates open at 6:00 PM. Ticket page: nba.com/warriors/tickets',
            },
            {
              title: 'Warriors vs Mavericks',
              startTime: '2026-02-27T19:00:00',
              endTime: '2026-02-27T21:30:00',
              location: 'Chase Center, San Francisco, CA',
              description:
                'NBA Regular Season home game. Recommended arrival: 6:15 PM for faster entry.',
            },
            {
              title: 'Warriors vs Clippers',
              startTime: '2026-03-02T18:30:00',
              endTime: '2026-03-02T21:00:00',
              location: 'Chase Center, San Francisco, CA',
              description:
                'NBA Regular Season home game. Add parking reminder 45 minutes before tip-off if needed.',
            },
          ],
        },
      },
    },
  ],

  'web-us-federal-holidays': [
    {
      role: 'user',
      content:
        'Use web search to find 2026 U.S. federal holidays and add weekday holidays to my calendar.',
    },
    {
      role: 'assistant',
      content:
        'I pulled the 2026 U.S. federal holiday calendar and prepared weekday holiday events (all-day) so they are easy to block in planning.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'MLK Day (Federal Holiday)',
              startTime: '2026-01-19T00:00:00',
              endTime: '2026-01-20T00:00:00',
              allDay: true,
              location: 'United States',
              description:
                'Source: U.S. Office of Personnel Management federal holiday schedule (2026).',
            },
            {
              title: 'Memorial Day (Federal Holiday)',
              startTime: '2026-05-25T00:00:00',
              endTime: '2026-05-26T00:00:00',
              allDay: true,
              location: 'United States',
              description:
                'Source: U.S. Office of Personnel Management federal holiday schedule (2026).',
            },
            {
              title: 'Labor Day (Federal Holiday)',
              startTime: '2026-09-07T00:00:00',
              endTime: '2026-09-08T00:00:00',
              allDay: true,
              location: 'United States',
              description:
                'Source: U.S. Office of Personnel Management federal holiday schedule (2026).',
            },
            {
              title: 'Thanksgiving Day (Federal Holiday)',
              startTime: '2026-11-26T00:00:00',
              endTime: '2026-11-27T00:00:00',
              allDay: true,
              location: 'United States',
              description:
                'Source: U.S. Office of Personnel Management federal holiday schedule (2026).',
            },
            {
              title: 'Christmas Day (Federal Holiday)',
              startTime: '2026-12-25T00:00:00',
              endTime: '2026-12-26T00:00:00',
              allDay: true,
              location: 'United States',
              description:
                'Source: U.S. Office of Personnel Management federal holiday schedule (2026).',
            },
          ],
        },
      },
    },
  ],

  'web-tax-deadlines': [
    {
      role: 'user',
      content:
        'Look up 2026 U.S. estimated tax payment deadlines and create reminder events plus tasks.',
    },
    {
      role: 'assistant',
      content:
        'I looked up 2026 U.S. estimated tax due dates and prepared deadline events plus checklist tasks so you can stay ahead.',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Estimated Tax Payment Q1 Due',
              startTime: '2026-04-15T09:00:00',
              endTime: '2026-04-15T09:30:00',
              location: 'IRS Online Payment',
              description:
                'Source: IRS estimated taxes due-date guidance.',
            },
            {
              title: 'Estimated Tax Payment Q2 Due',
              startTime: '2026-06-15T09:00:00',
              endTime: '2026-06-15T09:30:00',
              location: 'IRS Online Payment',
              description:
                'Source: IRS estimated taxes due-date guidance.',
            },
            {
              title: 'Estimated Tax Payment Q3 Due',
              startTime: '2026-09-15T09:00:00',
              endTime: '2026-09-15T09:30:00',
              location: 'IRS Online Payment',
              description:
                'Source: IRS estimated taxes due-date guidance.',
            },
            {
              title: 'Estimated Tax Payment Q4 Due',
              startTime: '2027-01-15T09:00:00',
              endTime: '2027-01-15T09:30:00',
              location: 'IRS Online Payment',
              description:
                'Source: IRS estimated taxes due-date guidance.',
            },
          ],
          tasks: [
            {
              title: 'Prepare docs for Q1 estimated tax payment',
              dueDate: '2026-04-12T17:00:00',
              notes:
                'Reconcile 1099 income, deductible expenses, and prior-quarter payment records.',
            },
            {
              title: 'Prepare docs for Q2 estimated tax payment',
              dueDate: '2026-06-12T17:00:00',
              notes:
                'Reconcile April-May income and expense categories before filing.',
            },
            {
              title: 'Prepare docs for Q3 estimated tax payment',
              dueDate: '2026-09-12T17:00:00',
              notes:
                'Review quarterly totals and confirm EFTPS payment method.',
            },
          ],
        },
      },
    },
  ],

  'web-dst-reminders': [
    {
      role: 'user',
      content:
        'Find U.S. daylight saving time change dates in 2026 and add reminder events.',
    },
    {
      role: 'assistant',
      content:
        'I added U.S. daylight saving transition reminders for 2026 so you can avoid missed meetings around clock shifts.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'DST Starts Tomorrow (Spring Forward)',
              startTime: '2026-03-07T18:00:00',
              endTime: '2026-03-07T18:30:00',
              location: 'Personal reminder',
              description:
                'DST starts Sunday, March 8, 2026 in the U.S. Source: timeanddate.com.',
            },
            {
              title: 'DST Ends Tomorrow (Fall Back)',
              startTime: '2026-10-31T18:00:00',
              endTime: '2026-10-31T18:30:00',
              location: 'Personal reminder',
              description:
                'DST ends Sunday, November 1, 2026 in the U.S. Source: timeanddate.com.',
            },
          ],
        },
      },
    },
  ],

  'web-tahoe': [
    {
      role: 'user',
      content:
        'Use web context to plan a Tahoe ski weekend in March and draft the key itinerary events.',
    },
    {
      role: 'assistant',
      content:
        'Based on current snow + weather context, I drafted a compact Tahoe itinerary with drive, ski block, and return planning events.',
      preview: {
        functionName: 'create_events',
        functionArgs: {
          events: [
            {
              title: 'Drive to Tahoe + Hotel Check-in',
              startTime: '2026-03-06T16:30:00',
              endTime: '2026-03-06T20:30:00',
              location: 'San Francisco \u2192 South Lake Tahoe',
              description:
                'Planned around Friday traffic. Check-in window 7:00-10:00 PM. Add snow-chain reminder before departure.',
            },
            {
              title: 'Ski Day (Heavenly)',
              startTime: '2026-03-07T08:30:00',
              endTime: '2026-03-07T15:30:00',
              location: 'Heavenly Mountain Resort',
              description:
                'Morning groomer window first. Lunch break around 12:15 PM. Gear return by 4:30 PM near gondola base.',
            },
            {
              title: 'Drive Back + Grocery Stop',
              startTime: '2026-03-08T13:30:00',
              endTime: '2026-03-08T17:30:00',
              location: 'South Lake Tahoe \u2192 San Francisco',
              description:
                'Target departure after early lunch to avoid heavy evening traffic. Grocery stop planned near home.',
            },
          ],
        },
      },
    },
  ],

  // ── Semantic Search (RAG) ─────────────────────────────────────────────
  'rag-homework': [
    {
      role: 'user',
      content: 'What problems do I need to solve for algebra HW 3?',
    },
    {
      role: 'assistant',
      content:
        'For **Algebra HW 3** in your notes, you still need:\n\n1. Section 4.2: Problems 1, 3, 7, 9\n2. Section 4.3: Problems 2, 8, 12\n3. A short proof write-up for the basis-change lemma (1 page)\n\nYou already completed problem 5 and drafted proof outlines for 2 of 3 lemmas. I also see your submission task in **My Tasks** with the LearnUS link.',
    },
    {
      role: 'user',
      content: 'Where should I submit it again?',
    },
    {
      role: 'assistant',
      content:
        'Submit it on the online learning platform **LearnUS**: https://ys.learnus.org',
    },
  ],

  'rag-hours': [
    {
      role: 'user',
      content:
        'How many total hours did I spend in meetings this month? Split work vs personal.',
    },
    {
      role: 'assistant',
      content:
        'In **February 2026**, you logged **31.5 total meeting hours**.\n\n- **Work meetings:** 23.0 hours\n- **Personal / life events:** 8.5 hours\n\nTop buckets:\n- Product + customer: 9.0h\n- Leadership + ops: 7.5h\n- Finance / investor: 3.5h\n- Health, travel, social: 8.5h\n\nBusiest day: **Thu, Feb 12** (3 meetings, 3.0h).',
    },
  ],

  'rag-event-detail': [
    {
      role: 'user',
      content: 'What are the full details for my Pebble Beach golf day?',
    },
    {
      role: 'assistant',
      content:
        'Here are your **Pebble Beach golf day** details:\n\n- **When:** Fri, Feb 27, 9:00 AM - 3:00 PM\n- **Where:** Pebble Beach Golf Links, 1700 17-Mile Drive, Pebble Beach, CA\n- **Participants:** Mina Park, Daniel Kim\n- **Notes:** Tee time check-in 45 minutes early, rental clubs confirmed, lunch booked at The Bench for 12:20 PM, sunset point stop planned before return.\n- **Drive plan:** Leave SF around 5:45 AM, expected return around 7:30 PM.',
    },
  ],

  // ── Proactive ─────────────────────────────────────────────────────────
  'proactive-gap-fill': [
    {
      role: 'assistant',
      content:
        'Proactive alert: I detected a **45-minute gap** before Product kickoff and prepared a focused prep block plus checklist task.\n\nWhy now:\n- Kickoff is high impact\n- Free window is long enough for one meaningful prep sprint\n- Prep now lowers meeting risk',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Kickoff Prep Focus Block',
              startTime: '2026-02-23T09:10:00',
              endTime: '2026-02-23T09:55:00',
              location: 'Morph HQ 10F - Quiet Booth',
              description:
                'Auto-suggested from free-time detection before Product kickoff. Goal: finalize talking points + risk log.',
            },
          ],
          tasks: [
            {
              title: 'Finalize kickoff talking points',
              dueDate: '2026-02-23T09:55:00',
              notes:
                'Lock owner assignments, launch risks, and top 3 decisions needed in meeting.',
            },
          ],
        },
      },
    },
  ],

  'proactive-deadline-risk': [
    {
      role: 'assistant',
      content:
        'Proactive risk alert: your **investor update** is behind plan with less than 24 hours left.\n\nI prepared a recovery set automatically:\n- 1 protected deep-work block\n- 2 concrete support tasks\n\nI can also recommend one low-priority meeting to move.',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Investor Update Recovery Block',
              startTime: '2026-02-26T19:30:00',
              endTime: '2026-02-26T21:00:00',
              location: 'Home Office',
              description:
                'Auto-suggested due to deadline risk. Focus scope: KPI deltas, narrative consistency, and final board-ready formatting.',
            },
          ],
          tasks: [
            {
              title: 'Confirm final KPI table for investor memo',
              dueDate: '2026-02-26T20:15:00',
              notes:
                'Cross-check MRR, burn multiple, and retention cohort updates.',
            },
            {
              title: 'Send investor memo final draft to Mina',
              dueDate: '2026-02-26T21:05:00',
              notes:
                'Attach PDF + change summary with top 3 updates since prior version.',
            },
          ],
        },
      },
    },
  ],

  'proactive-commute-replan': [
    {
      role: 'assistant',
      content:
        'Proactive commute alert: traffic ETA now overlaps with dinner check-in timing. I prepared a schedule adjustment to reduce no-show risk while preserving your evening plan.',
      preview: {
        functionName: 'update_event',
        functionArgs: {
          eventId: 'evt-019',
          updates: {
            title: 'Family Dinner',
            startTime: '2026-02-14T19:20:00',
            endTime: '2026-02-14T20:50:00',
            location: 'San Francisco',
            description:
              'Proactive commute re-plan: shifted by +20 minutes based on traffic delay. Buffer retained for parking and check-in.',
          },
        },
      },
    },
  ],

  'proactive-daily-brief': [
    {
      role: 'assistant',
      content:
        'Good morning. Proactive brief for **Sat, Feb 22**:\n\n**Today**\n- 12:30 AM: Saturday Long Run (already done)\n- No fixed meetings until Monday\n\n**Risks to watch**\n- Offsite agenda draft due next week\n- Sunday tennis slots are filling quickly\n\n**Best next actions**\n1. 2:00-3:00 PM: Draft offsite agenda v2\n2. 3:15-3:45 PM: Book Sunday tennis court\n3. 4:00-4:30 PM: Inbox zero for Monday kickoff prep\n\nSay "apply plan" and I will create one focus block + two tasks.',
    },
  ],

  'proactive-followup-rescue': [
    {
      role: 'assistant',
      content:
        'Proactive follow-up rescue: I found a high-priority customer thread with no owner, no due time, and no send slot.\n\nI prepared a rescue sequence:\n- 20-minute drafting block\n- Follow-up task with owner and due time\n- 5-minute send buffer',
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Draft customer follow-up',
              startTime: '2026-02-24T10:30:00',
              endTime: '2026-02-24T10:50:00',
              location: 'Morph HQ 10F - Quiet Booth',
              description:
                'Auto-created to prevent follow-up drift on priority customer thread.',
            },
            {
              title: 'Send follow-up + confirm next steps',
              startTime: '2026-02-24T10:55:00',
              endTime: '2026-02-24T11:00:00',
              location: 'Slack / Email',
              description: 'Buffer slot for final send and confirmation.',
            },
          ],
          tasks: [
            {
              title: 'Finalize customer follow-up draft',
              dueDate: '2026-02-24T10:50:00',
              notes:
                'Include revised timeline, owner list, and one explicit next decision.',
            },
          ],
        },
      },
    },
  ],

  'proactive-meeting-prep-push': [
    {
      role: 'assistant',
      content:
        "Proactive meeting prep push: your external meeting starts in under 2 hours and prep artifacts are incomplete.\n\nI prepared a fast prep package:\n- Briefing block to close the top gaps\n- Decision checklist task\n- Final materials handoff task",
      preview: {
        functionName: 'create_events_and_tasks',
        functionArgs: {
          events: [
            {
              title: 'Emergency prep block: external meeting',
              startTime: '2026-02-25T12:15:00',
              endTime: '2026-02-25T13:00:00',
              location: 'Morph HQ 10F - Atlas Room',
              description:
                'Auto-created from readiness check. Focus: talking points, risks, and decision asks.',
            },
          ],
          tasks: [
            {
              title: 'Complete meeting decision checklist',
              dueDate: '2026-02-25T12:55:00',
              notes:
                'Confirm objective, fallback plan, open risks, and owner per decision.',
            },
            {
              title: 'Send final meeting brief to attendees',
              dueDate: '2026-02-25T13:05:00',
              notes:
                'Share concise one-pager, agenda, and required pre-read links.',
            },
          ],
        },
      },
    },
  ],
}
