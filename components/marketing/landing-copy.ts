export const LANDING_LANGUAGE_LABELS = {
  en: 'English',
  ko: 'Korean',
  zh: 'Chinese',
  hi: 'Hindi',
  es: 'Spanish',
  ar: 'Arabic',
  fr: 'French',
  pt: 'Portuguese',
  ru: 'Russian',
  ja: 'Japanese',
} as const

export type LandingLanguage = keyof typeof LANDING_LANGUAGE_LABELS

export function normalizeLandingLanguage(value: string | string[] | undefined): LandingLanguage {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw) return 'en'

  const candidate = raw.toLowerCase()
  return candidate in LANDING_LANGUAGE_LABELS ? (candidate as LandingLanguage) : 'en'
}

type WorkflowStageCopy = {
  title: string
  description: string
}

type InputDemoCopy = {
  title: string
  summary: string
  example: string
}

type RagExampleCopy = {
  title: string
  query: string
  output: string
}

type LandingCopy = {
  nav: {
    product: string
    pricing: string
    signIn: string
    getStarted: string
    tagline: string
    language: string
  }
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    startWithGoogle: string
    seePricing: string
  }
  how: {
    label: string
    title: string
    subtitle: string
  }
  workflowStages: [WorkflowStageCopy, WorkflowStageCopy, WorkflowStageCopy, WorkflowStageCopy]
  liveModel: {
    label: string
    title: string
    description: string
    input: string
    context: string
    output: string
  }
  inputSection: {
    label: string
    title: string
    subtitle: string
    screenshotPlaceholder: string
    videoPlaceholder: string
  }
  inputDemos: [InputDemoCopy, InputDemoCopy, InputDemoCopy, InputDemoCopy, InputDemoCopy]
  ragSection: {
    label: string
    title: string
    subtitle: string
    demoPlaceholder: string
  }
  ragExamples: [RagExampleCopy, RagExampleCopy, RagExampleCopy]
  proactive: {
    label: string
    title: string
    description: string
    tip1: string
    tip2: string
    mobileAssetsLabel: string
    mobileScreenshotPlaceholder: string
    mobileVideoPlaceholder: string
  }
  cta: {
    title: string
    description: string
    startNow: string
    explore: string
  }
  footer: {
    privacy: string
    terms: string
    signIn: string
  }
}

export const LANDING_COPY: Record<LandingLanguage, LandingCopy> = {
  en: {
    nav: {
      product: 'Product',
      pricing: 'Pricing',
      signIn: 'Sign in',
      getStarted: 'Get started',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'Meet your',
      titleLine2: 'always-on chief of staff.',
      description:
        'Morph turns messy inputs into clean execution. Create or update plans with text, image, PDF, audio, or web context, then let one context-aware assistant retrieve the right information and move your schedule forward.',
      startWithGoogle: 'Start with Google',
      seePricing: 'See pricing',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'One loop for capture, context, search, and execution',
      subtitle:
        'Most tools split creation, retrieval, and follow-through into different apps. Morph keeps all three in one assistant workflow.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'Understand intent from text, image, PDF, audio, and web context.',
      },
      {
        title: 'Context',
        description: 'Merge Calendar, Tasks, and history into one working memory.',
      },
      {
        title: 'Retrieve',
        description: 'Find the right facts quickly with semantic search over your data.',
      },
      {
        title: 'Execute + Sync',
        description: 'Create and update events/tasks, then sync bi-directionally to Google.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'Understand first, act second',
      description:
        'Morph continuously references your Calendar, Tasks, and recent actions before writing anything back. That keeps suggestions relevant and updates consistent.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Demos',
      title: 'One assistant for planning, capture, and execution',
      subtitle:
        'Morph turns text, images, PDFs, audio, and web context into reliable calendar + task execution in one place.',
      screenshotPlaceholder: 'Demo screenshot placeholder',
      videoPlaceholder: 'Demo video placeholder',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'Type naturally to create or update events and tasks.',
        example: '"Move Friday standup to 2 PM and add prep task."',
      },
      {
        title: 'Image',
        summary: 'Extract schedule details from posters, slides, or screenshots.',
        example: 'Snap a conference schedule and map sessions to your calendar.',
      },
      {
        title: 'PDF',
        summary: 'Parse documents and turn dates into structured plans.',
        example: 'Upload a syllabus PDF and create recurring class events.',
      },
      {
        title: 'Audio',
        summary: 'Speak quick updates and let Morph convert them into actions.',
        example: 'Record a memo and auto-create follow-up tasks.',
      },
      {
        title: 'Web',
        summary: 'Use live web context to enrich or verify event information.',
        example: 'Pull venue/time details from a URL before scheduling.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'Ask, retrieve, summarize, act',
      subtitle:
        'Morph combines semantic retrieval with your schedule context so answers are useful, not just keyword matches.',
      demoPlaceholder: 'Demo screenshot/video placeholder',
    },
    ragExamples: [
      {
        title: 'Meeting memory retrieval',
        query: '"When did I last align with the design team on onboarding?"',
        output:
          'Morph retrieves matching meetings, notes, and linked tasks, then summarizes what changed.',
      },
      {
        title: 'Decision trail reconstruction',
        query: '"Why did we move launch to next month?"',
        output:
          'Morph traces related events, task updates, and chat context so you can review the full rationale.',
      },
      {
        title: 'Next-step generation',
        query: '"What should I do before Thursday investor call?"',
        output:
          'Morph finds dependencies, drafts a priority checklist, and can schedule prep blocks automatically.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'Coming soon with the mobile app',
      description:
        'Morph will proactively spot conflicts, prep windows, and missed follow-ups, then suggest smart next steps before you ask.',
      tip1: '"You have a 40-minute gap before design review. Draft prep checklist?"',
      tip2: '"Traffic delay detected. Shift dinner reservation by 20 minutes?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'Mobile screenshot placeholder',
      mobileVideoPlaceholder: 'Mobile video placeholder',
    },
    cta: {
      title: 'Your schedule has one operating system now',
      description:
        'Start free, plug in your Calendar, and replace manual scheduling loops with one context-aware assistant.',
      startNow: 'Start now',
      explore: 'Explore how it works',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'Sign in',
    },
  },
  ko: {
    nav: {
      product: '제품',
      pricing: '요금제',
      signIn: '로그인',
      getStarted: '시작하기',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: '언어',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: '당신 곁의',
      titleLine2: 'always-on 개인 수석 비서.',
      description:
        'Morph는 복잡한 입력을 실행 가능한 계획으로 바꿉니다. text, image, PDF, audio, web context로 일정을 만들거나 수정하고, 맥락을 이해하는 하나의 assistant로 필요한 정보를 찾아 즉시 실행하세요.',
      startWithGoogle: 'Google로 시작하기',
      seePricing: '요금제 보기',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'capture, context, search, execution을 하나의 loop로',
      subtitle:
        '대부분의 도구는 생성, 검색, 실행이 분리되어 있습니다. Morph는 이를 하나의 assistant workflow로 묶어줍니다.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'text, image, PDF, audio, web context에서 의도를 파악합니다.',
      },
      {
        title: 'Context',
        description: 'Calendar, Tasks, 기록을 하나의 working memory로 결합합니다.',
      },
      {
        title: 'Retrieve',
        description: 'semantic search로 필요한 사실을 빠르게 찾습니다.',
      },
      {
        title: 'Execute + Sync',
        description: 'events/tasks를 생성 및 수정하고 Google과 양방향 sync합니다.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: '먼저 이해하고, 그다음 실행합니다',
      description:
        'Morph는 답변을 작성하기 전에 Calendar, Tasks, 최근 액션을 계속 참조합니다. 그래서 제안은 더 정확하고 업데이트는 일관됩니다.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: '데모',
      title: '계획부터 실행까지 하나의 assistant',
      subtitle:
        'Morph는 text, image, PDF, audio, web context를 한곳에서 처리해 calendar와 tasks를 안정적으로 실행합니다.',
      screenshotPlaceholder: '데모 screenshot placeholder',
      videoPlaceholder: '데모 video placeholder',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: '자연어로 events/tasks를 생성하거나 수정합니다.',
        example: '"금요일 standup을 오후 2시로 옮기고 준비 task 추가해줘."',
      },
      {
        title: 'Image',
        summary: '포스터, 슬라이드, screenshot에서 일정 정보를 추출합니다.',
        example: '컨퍼런스 일정 사진을 찍고 세션을 calendar에 반영합니다.',
      },
      {
        title: 'PDF',
        summary: '문서를 파싱해 날짜를 구조화된 계획으로 변환합니다.',
        example: '강의계획서 PDF를 업로드해 반복 수업 event를 만듭니다.',
      },
      {
        title: 'Audio',
        summary: '짧게 말하면 Morph가 액션으로 변환합니다.',
        example: '음성 메모를 녹음하고 후속 task를 자동 생성합니다.',
      },
      {
        title: 'Web',
        summary: '실시간 web context로 event 정보를 보강하고 검증합니다.',
        example: '일정 추가 전에 URL에서 장소/시간 정보를 가져옵니다.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: '묻고, 찾고, 요약하고, 실행하기',
      subtitle: 'Morph는 semantic retrieval와 일정 맥락을 결합해 keyword 매칭 이상의 답을 제공합니다.',
      demoPlaceholder: '데모 screenshot/video placeholder',
    },
    ragExamples: [
      {
        title: 'meeting 기록 검색',
        query: '"온보딩 관련해서 design team이랑 마지막으로 맞춘 게 언제였지?"',
        output: '연관 meeting, 노트, linked task를 찾아 핵심 변경점을 요약합니다.',
      },
      {
        title: '의사결정 흐름 복원',
        query: '"우리가 launch를 다음 달로 미룬 이유가 뭐였지?"',
        output: '관련 event, task 변경, chat context를 추적해 전체 근거를 정리합니다.',
      },
      {
        title: '다음 액션 생성',
        query: '"목요일 investor call 전에 내가 뭘 해야 하지?"',
        output: '의존 항목을 찾아 우선순위 checklist를 만들고 prep block까지 제안합니다.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'mobile app과 함께 곧 제공됩니다',
      description:
        'Morph가 충돌, 준비 시간, 놓친 후속 조치를 먼저 감지하고, 물어보기 전에 다음 액션을 제안합니다.',
      tip1: '"design review 전 40분이 비어 있습니다. 준비 checklist를 만들까요?"',
      tip2: '"교통 지연이 감지되었습니다. 저녁 예약을 20분 늦출까요?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'mobile screenshot placeholder',
      mobileVideoPlaceholder: 'mobile video placeholder',
    },
    cta: {
      title: '이제 일정 운영은 하나의 시스템으로',
      description: '무료로 시작하고 Calendar를 연결해, 수작업 scheduling loop를 하나의 assistant로 대체하세요.',
      startNow: '지금 시작',
      explore: '작동 방식 보기',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: '로그인',
    },
  },
  zh: {
    nav: {
      product: '产品',
      pricing: '定价',
      signIn: '登录',
      getStarted: '开始使用',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: '语言',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: '认识你的',
      titleLine2: 'always-on chief of staff.',
      description:
        'Morph 将零散输入变成可执行计划。你可以用 text、image、PDF、audio、web context 创建或更新安排，再由一个理解上下文的 assistant 检索关键信息并推动执行。',
      startWithGoogle: '使用 Google 开始',
      seePricing: '查看定价',
    },
    how: {
      label: 'How Morph AI Works',
      title: '用一个 loop 完成 capture、context、search 和 execution',
      subtitle: '多数工具把创建、检索、执行分散在不同应用。Morph 将三者合为一个 assistant workflow。',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: '从 text、image、PDF、audio、web context 理解你的意图。',
      },
      {
        title: 'Context',
        description: '把 Calendar、Tasks 和历史记录合并为统一 working memory。',
      },
      {
        title: 'Retrieve',
        description: '通过 semantic search 快速找到最相关事实。',
      },
      {
        title: 'Execute + Sync',
        description: '创建和更新 events/tasks，并与 Google 双向 sync。',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: '先理解，再执行',
      description:
        'Morph 在回写前会持续参考你的 Calendar、Tasks 和最近操作，因此建议更相关、更新更一致。',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: '输入演示',
      title: '为每种 input mode 准备的 demo-ready 模块',
      subtitle: '把每个 placeholder 替换为你的 screenshot/video，即可展示 text、image、PDF、audio、web workflow。',
      screenshotPlaceholder: '演示 screenshot placeholder',
      videoPlaceholder: '演示 video placeholder',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: '用自然语言创建或更新 events 和 tasks。',
        example: '"把周五 standup 改到下午 2 点，并加一个准备 task。"',
      },
      {
        title: 'Image',
        summary: '从海报、幻灯片或截图提取日程信息。',
        example: '拍下会议日程并自动映射到 calendar。',
      },
      {
        title: 'PDF',
        summary: '解析文档并把日期转成结构化计划。',
        example: '上传课程 PDF，自动生成重复课程 event。',
      },
      {
        title: 'Audio',
        summary: '口述更新，Morph 自动转成可执行动作。',
        example: '录一段语音 memo，自动创建后续 tasks。',
      },
      {
        title: 'Web',
        summary: '利用实时 web context 补充或核对 event 信息。',
        example: '排程前从 URL 拉取地点和时间细节。',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: '提问、检索、总结、执行',
      subtitle: 'Morph 将 semantic retrieval 与你的日程上下文结合，回答不止是关键词匹配。',
      demoPlaceholder: '演示 screenshot/video placeholder',
    },
    ragExamples: [
      {
        title: 'meeting 记忆检索',
        query: '"我上次和 design team 对齐 onboarding 是什么时候？"',
        output: '检索相关 meeting、notes 和 linked tasks，并总结关键变化。',
      },
      {
        title: '决策链路回溯',
        query: '"我们为什么把 launch 延到下个月？"',
        output: '追踪相关 events、task 更新与 chat context，还原完整决策依据。',
      },
      {
        title: '下一步行动生成',
        query: '"周四 investor call 前我该做什么？"',
        output: '识别依赖项，生成优先级 checklist，并自动建议 prep time block。',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: '即将随 mobile app 推出',
      description: 'Morph 会主动发现冲突、准备窗口和遗漏跟进，在你提问前给出下一步建议。',
      tip1: '"design review 前有 40 分钟空档。要生成准备 checklist 吗？"',
      tip2: '"检测到交通延迟。要把晚餐预约延后 20 分钟吗？"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'mobile screenshot placeholder',
      mobileVideoPlaceholder: 'mobile video placeholder',
    },
    cta: {
      title: '你的日程现在有了统一操作系统',
      description: '免费开始，连接 Calendar，用一个理解上下文的 assistant 替代手工调度循环。',
      startNow: '立即开始',
      explore: '查看工作方式',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: '登录',
    },
  },
  hi: {
    nav: {
      product: 'उत्पाद',
      pricing: 'Pricing',
      signIn: 'Sign in',
      getStarted: 'Get started',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'भाषा',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'मिलिए अपने',
      titleLine2: 'always-on chief of staff से।',
      description:
        'Morph बिखरे हुए inputs को साफ execution में बदल देता है। text, image, PDF, audio, या web context से plans बनाएं या update करें, और एक context-aware assistant से सही जानकारी लेकर आगे बढ़ें।',
      startWithGoogle: 'Google से शुरू करें',
      seePricing: 'Pricing देखें',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'capture, context, search और execution के लिए एक loop',
      subtitle:
        'ज़्यादातर tools creation, retrieval और follow-through को अलग apps में बांट देते हैं। Morph इन तीनों को एक assistant workflow में रखता है।',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'text, image, PDF, audio, और web context से intent समझें।',
      },
      {
        title: 'Context',
        description: 'Calendar, Tasks और history को एक working memory में जोड़ें।',
      },
      {
        title: 'Retrieve',
        description: 'semantic search से सही facts जल्दी पाएं।',
      },
      {
        title: 'Execute + Sync',
        description: 'events/tasks बनाएं या बदलें, फिर Google के साथ bi-directional sync करें।',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'पहले समझें, फिर execute करें',
      description:
        'Morph कुछ भी लिखने से पहले आपके Calendar, Tasks और recent actions को लगातार संदर्भित करता है। इससे suggestions अधिक relevant और updates consistent रहते हैं।',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Demos',
      title: 'हर input mode के लिए demo-ready blocks',
      subtitle:
        'हर placeholder को अपने screenshot/video से बदलें। text, image, PDF, audio, और web workflows दिखाने के लिए structure तैयार है।',
      screenshotPlaceholder: 'Demo screenshot placeholder',
      videoPlaceholder: 'Demo video placeholder',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'natural language से events और tasks create या update करें।',
        example: '"Friday standup को 2 PM पर shift करो और prep task जोड़ो।"',
      },
      {
        title: 'Image',
        summary: 'poster, slides या screenshots से schedule details निकालें।',
        example: 'conference schedule की photo लेकर sessions को calendar में डालें।',
      },
      {
        title: 'PDF',
        summary: 'documents parse करके dates को structured plan में बदलें।',
        example: 'syllabus PDF upload करके recurring class events बनाएं।',
      },
      {
        title: 'Audio',
        summary: 'quick updates बोलें और Morph को actions में बदलने दें।',
        example: 'voice memo रिकॉर्ड करें और follow-up tasks auto-create करें।',
      },
      {
        title: 'Web',
        summary: 'live web context से event details enrich या verify करें।',
        example: 'schedule करने से पहले URL से venue/time details खींचें।',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'पूछें, retrieve करें, summarize करें, act करें',
      subtitle:
        'Morph semantic retrieval को आपके schedule context के साथ जोड़ता है, ताकि उत्तर केवल keyword match न हों।',
      demoPlaceholder: 'Demo screenshot/video placeholder',
    },
    ragExamples: [
      {
        title: 'meeting memory retrieval',
        query: '"onboarding पर design team के साथ last alignment कब हुआ था?"',
        output: 'related meetings, notes और linked tasks लेकर key changes summarize करता है।',
      },
      {
        title: 'decision trail reconstruction',
        query: '"हमने launch अगले महीने क्यों shift किया?"',
        output: 'related events, task updates और chat context trace करके पूरा rationale दिखाता है।',
      },
      {
        title: 'next-step generation',
        query: '"Thursday investor call से पहले मुझे क्या करना चाहिए?"',
        output: 'dependencies ढूंढकर priority checklist draft करता है और prep blocks suggest करता है।',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'mobile app के साथ जल्द आ रहा है',
      description:
        'Morph conflicts, prep windows और missed follow-ups को proactively पकड़कर, आपके पूछने से पहले next steps सुझाएगा।',
      tip1: '"design review से पहले 40-minute gap है। prep checklist बनाऊं?"',
      tip2: '"traffic delay मिला है। dinner reservation 20 minutes shift करें?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'Mobile screenshot placeholder',
      mobileVideoPlaceholder: 'Mobile video placeholder',
    },
    cta: {
      title: 'अब आपके schedule के लिए एक ही operating system',
      description:
        'free में शुरू करें, Calendar जोड़ें, और manual scheduling loops को एक context-aware assistant से बदलें।',
      startNow: 'अभी शुरू करें',
      explore: 'कैसे काम करता है देखें',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'Sign in',
    },
  },
  es: {
    nav: {
      product: 'Producto',
      pricing: 'Precios',
      signIn: 'Iniciar sesion',
      getStarted: 'Comenzar',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'Conoce a tu',
      titleLine2: 'chief of staff always-on.',
      description:
        'Morph convierte entradas desordenadas en ejecucion clara. Crea o actualiza planes con text, image, PDF, audio o web context, y deja que un assistant con contexto encuentre la informacion correcta para avanzar tu agenda.',
      startWithGoogle: 'Comenzar con Google',
      seePricing: 'Ver precios',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'Un solo loop para capture, context, search y execution',
      subtitle:
        'La mayoria de herramientas separan creacion, recuperacion y seguimiento en apps distintas. Morph une todo en un solo assistant workflow.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'Comprende la intencion desde text, image, PDF, audio y web context.',
      },
      {
        title: 'Context',
        description: 'Combina Calendar, Tasks e historial en una sola working memory.',
      },
      {
        title: 'Retrieve',
        description: 'Encuentra los hechos correctos rapidamente con semantic search.',
      },
      {
        title: 'Execute + Sync',
        description: 'Crea y actualiza events/tasks, luego hace sync bidireccional con Google.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'Primero entiende, luego actua',
      description:
        'Morph consulta de forma continua tu Calendar, Tasks y acciones recientes antes de escribir. Asi mantiene sugerencias relevantes y cambios consistentes.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Demos de Input',
      title: 'Bloques demo-ready para cada input mode',
      subtitle:
        'Reemplaza cada placeholder con tu screenshot/video real de creacion o actualizacion. La estructura ya cubre workflows de text, image, PDF, audio y web.',
      screenshotPlaceholder: 'Placeholder de screenshot demo',
      videoPlaceholder: 'Placeholder de video demo',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'Escribe en lenguaje natural para crear o actualizar events y tasks.',
        example: '"Mueve el standup del viernes a las 2 PM y agrega una task de preparacion."',
      },
      {
        title: 'Image',
        summary: 'Extrae detalles de agenda desde posters, slides o screenshots.',
        example: 'Toma una foto del programa de una conferencia y mapea sesiones al calendar.',
      },
      {
        title: 'PDF',
        summary: 'Procesa documentos y convierte fechas en planes estructurados.',
        example: 'Sube un PDF de syllabus y crea events recurrentes de clase.',
      },
      {
        title: 'Audio',
        summary: 'Dicta actualizaciones rapidas y deja que Morph las convierta en acciones.',
        example: 'Graba una nota de voz y crea tasks de seguimiento automaticamente.',
      },
      {
        title: 'Web',
        summary: 'Usa web context en vivo para enriquecer o verificar detalles de eventos.',
        example: 'Obtiene lugar y hora desde una URL antes de agendar.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'Pregunta, recupera, resume y actua',
      subtitle:
        'Morph combina semantic retrieval con tu contexto de agenda para responder con utilidad real, no solo por keywords.',
      demoPlaceholder: 'Placeholder de screenshot/video demo',
    },
    ragExamples: [
      {
        title: 'Recuperacion de memoria de reuniones',
        query: '"Cuando fue la ultima vez que me alinee con el design team sobre onboarding?"',
        output: 'Recupera meetings, notas y tasks vinculadas, y resume los cambios clave.',
      },
      {
        title: 'Reconstruccion de decisiones',
        query: '"Por que movimos el launch al proximo mes?"',
        output: 'Rastrea events relacionados, cambios de tasks y chat context para mostrar el motivo completo.',
      },
      {
        title: 'Generacion de siguientes pasos',
        query: '"Que debo hacer antes de la investor call del jueves?"',
        output: 'Detecta dependencias, crea un checklist priorizado y sugiere bloques de preparacion.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'Proximamente con la mobile app',
      description:
        'Morph detectara conflictos, ventanas de preparacion y seguimientos perdidos de forma proactiva, y sugerira los siguientes pasos antes de que preguntes.',
      tip1: '"Tienes un hueco de 40 minutos antes de design review. Crear checklist de preparacion?"',
      tip2: '"Se detecto retraso de trafico. Mover la reserva de cena 20 minutos?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'Placeholder de screenshot mobile',
      mobileVideoPlaceholder: 'Placeholder de video mobile',
    },
    cta: {
      title: 'Tu agenda ahora tiene un solo sistema operativo',
      description:
        'Empieza gratis, conecta tu Calendar y reemplaza los loops manuales de programacion con un assistant que entiende contexto.',
      startNow: 'Empezar ahora',
      explore: 'Explorar como funciona',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'Iniciar sesion',
    },
  },
  ar: {
    nav: {
      product: 'المنتج',
      pricing: 'الاسعار',
      signIn: 'تسجيل الدخول',
      getStarted: 'ابدأ',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'اللغة',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'تعرّف على',
      titleLine2: 'chief of staff always-on الخاص بك.',
      description:
        'Morph يحوّل المدخلات غير المرتبة الى تنفيذ واضح. يمكنك إنشاء او تحديث الخطط باستخدام text و image و PDF و audio او web context، ثم يعتمد assistant الواعي بالسياق لاسترجاع المعلومات الصحيحة ودفع جدولك الى الامام.',
      startWithGoogle: 'ابدأ باستخدام Google',
      seePricing: 'عرض الاسعار',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'حلقة واحدة لـ capture و context و search و execution',
      subtitle:
        'معظم الادوات تفصل بين الانشاء والاسترجاع والمتابعة في تطبيقات مختلفة. Morph يجمع الثلاثة في assistant workflow واحد.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'فهم النية من text و image و PDF و audio و web context.',
      },
      {
        title: 'Context',
        description: 'دمج Calendar و Tasks والسجل في working memory واحدة.',
      },
      {
        title: 'Retrieve',
        description: 'العثور بسرعة على الحقائق الصحيحة عبر semantic search.',
      },
      {
        title: 'Execute + Sync',
        description: 'إنشاء وتحديث events/tasks ثم sync ثنائي الاتجاه مع Google.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'افهم اولا ثم نفّذ',
      description:
        'يقوم Morph بالرجوع المستمر الى Calendar و Tasks والاجراءات الحديثة قبل اي كتابة. هذا يجعل الاقتراحات اكثر صلة والتحديثات اكثر اتساقا.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'عروض Input',
      title: 'وحدات demo-ready لكل input mode',
      subtitle:
        'استبدل كل placeholder بـ screenshot/video حقيقي لعمليات الانشاء او التحديث. الهيكل جاهز لمسارات text و image و PDF و audio و web.',
      screenshotPlaceholder: 'placeholder لصورة demo',
      videoPlaceholder: 'placeholder لفيديو demo',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'اكتب بلغة طبيعية لإنشاء او تحديث events و tasks.',
        example: '"انقل standup يوم الجمعة الى 2 PM واضف task للتحضير."',
      },
      {
        title: 'Image',
        summary: 'استخرج تفاصيل الجدول من posters او slides او screenshots.',
        example: 'التقط صورة لبرنامج مؤتمر ثم اربط الجلسات بالـ calendar.',
      },
      {
        title: 'PDF',
        summary: 'حلّل المستندات وحوّل التواريخ الى خطة منظمة.',
        example: 'ارفع syllabus بصيغة PDF لإنشاء events دراسية متكررة.',
      },
      {
        title: 'Audio',
        summary: 'سجّل تحديثات سريعة ودع Morph يحولها الى actions.',
        example: 'سجّل memo صوتية وأنشئ tasks متابعة تلقائيا.',
      },
      {
        title: 'Web',
        summary: 'استخدم web context المباشر لتعزيز او التحقق من تفاصيل الحدث.',
        example: 'اسحب تفاصيل المكان والوقت من URL قبل الجدولة.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'اسأل، استرجع، لخّص، ثم نفّذ',
      subtitle: 'Morph يدمج semantic retrieval مع سياق جدولك لتقديم اجابات مفيدة تتجاوز keyword matching.',
      demoPlaceholder: 'placeholder لصورة/فيديو demo',
    },
    ragExamples: [
      {
        title: 'استرجاع ذاكرة الاجتماعات',
        query: '"متى كانت اخر مرة نسّقت فيها مع design team بخصوص onboarding؟"',
        output: 'يسترجع meetings والملاحظات والtasks المرتبطة ثم يلخّص ما تغيّر.',
      },
      {
        title: 'إعادة بناء مسار القرار',
        query: '"لماذا نقلنا launch الى الشهر القادم؟"',
        output: 'يتتبع events المرتبطة وتحديثات tasks وchat context لعرض السبب الكامل.',
      },
      {
        title: 'توليد الخطوة التالية',
        query: '"ماذا يجب ان افعل قبل investor call يوم الخميس؟"',
        output: 'يحدد الاعتماديات، يبني checklist اولوية، ويقترح blocks للتحضير.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'قريبا مع mobile app',
      description:
        'سيقوم Morph برصد التعارضات ونوافذ التحضير والمتابعات الفائتة بشكل استباقي، ثم يقترح الخطوات التالية قبل ان تسأل.',
      tip1: '"لديك فجوة 40 دقيقة قبل design review. هل اعدّ checklist للتحضير؟"',
      tip2: '"تم رصد تأخير مروري. هل نؤخر حجز العشاء 20 دقيقة؟"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'placeholder لصورة mobile',
      mobileVideoPlaceholder: 'placeholder لفيديو mobile',
    },
    cta: {
      title: 'الان جدولك يملك نظام تشغيل واحدا',
      description:
        'ابدأ مجانا، اربط Calendar، واستبدل حلقات الجدولة اليدوية بـ assistant يفهم السياق.',
      startNow: 'ابدأ الان',
      explore: 'استكشف كيف يعمل',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'تسجيل الدخول',
    },
  },
  fr: {
    nav: {
      product: 'Produit',
      pricing: 'Tarifs',
      signIn: 'Connexion',
      getStarted: 'Commencer',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'Langue',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'Decouvrez votre',
      titleLine2: 'chief of staff always-on.',
      description:
        'Morph transforme des entrees desordonnees en execution claire. Creez ou mettez a jour vos plans avec text, image, PDF, audio ou web context, puis laissez un assistant context-aware retrouver la bonne information et faire avancer votre planning.',
      startWithGoogle: 'Commencer avec Google',
      seePricing: 'Voir les tarifs',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'Une seule loop pour capture, context, search et execution',
      subtitle:
        'La plupart des outils separent creation, retrieval et suivi dans plusieurs apps. Morph rassemble les trois dans un seul assistant workflow.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'Comprendre lintention depuis text, image, PDF, audio et web context.',
      },
      {
        title: 'Context',
        description: 'Fusionner Calendar, Tasks et historique dans une seule working memory.',
      },
      {
        title: 'Retrieve',
        description: 'Trouver rapidement les bons faits avec semantic search.',
      },
      {
        title: 'Execute + Sync',
        description: 'Creer et mettre a jour events/tasks, puis sync bidirectionnel avec Google.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'Comprendre dabord, agir ensuite',
      description:
        'Morph consulte en continu votre Calendar, vos Tasks et les actions recentes avant de repondre. Les suggestions restent pertinentes et les mises a jour coherentes.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Demos Input',
      title: 'Des blocs demo-ready pour chaque input mode',
      subtitle:
        'Remplacez chaque placeholder par vos screenshots/videos reels de creation ou mise a jour. La structure couvre text, image, PDF, audio et web workflows.',
      screenshotPlaceholder: 'Placeholder screenshot demo',
      videoPlaceholder: 'Placeholder video demo',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'Saisissez naturellement pour creer ou mettre a jour events et tasks.',
        example: '"Deplace le standup de vendredi a 14h et ajoute une task de preparation."',
      },
      {
        title: 'Image',
        summary: 'Extraire les details de planning depuis posters, slides ou screenshots.',
        example: 'Prenez un planning de conference en photo et mappez les sessions au calendar.',
      },
      {
        title: 'PDF',
        summary: 'Parser des documents et convertir les dates en plan structure.',
        example: 'Uploadez un syllabus PDF pour creer des events de cours recurrents.',
      },
      {
        title: 'Audio',
        summary: 'Dictez des mises a jour rapides et laissez Morph les convertir en actions.',
        example: 'Enregistrez un memo vocal et creez automatiquement des tasks de suivi.',
      },
      {
        title: 'Web',
        summary: 'Utiliser le web context en direct pour enrichir ou verifier les details.',
        example: 'Recuperez lieu et horaire depuis une URL avant de planifier.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'Demander, retrouver, resumer, agir',
      subtitle:
        'Morph combine semantic retrieval et contexte de planning pour des reponses vraiment utiles, pas juste des correspondances de keywords.',
      demoPlaceholder: 'Placeholder screenshot/video demo',
    },
    ragExamples: [
      {
        title: 'Retrieval de memoire de reunion',
        query: '"Quand ai-je aligne pour la derniere fois avec design team sur onboarding ?"',
        output: 'Morph retrouve meetings, notes et tasks liees, puis resume les changements importants.',
      },
      {
        title: 'Reconstruction du fil de decision',
        query: '"Pourquoi avons-nous decale le launch au mois prochain ?"',
        output: 'Morph trace events, mises a jour de tasks et chat context pour restituer le raisonnement complet.',
      },
      {
        title: 'Generation de la prochaine action',
        query: '"Que dois-je faire avant investor call jeudi ?"',
        output: 'Morph identifie les dependances, genere une checklist priorisee et propose des blocs de preparation.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'Bientot avec la mobile app',
      description:
        'Morph detectera proactivement les conflits, fenetres de preparation et suivis manques, puis proposera les prochaines actions avant meme votre demande.',
      tip1: '"Vous avez 40 minutes libres avant design review. Generer une checklist de preparation ?"',
      tip2: '"Retard trafic detecte. Decaler la reservation du diner de 20 minutes ?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'Placeholder screenshot mobile',
      mobileVideoPlaceholder: 'Placeholder video mobile',
    },
    cta: {
      title: 'Votre planning a maintenant un seul systeme dexploitation',
      description:
        'Commencez gratuitement, connectez votre Calendar, et remplacez les boucles manuelles de planification par un assistant context-aware.',
      startNow: 'Commencer maintenant',
      explore: 'Explorer le fonctionnement',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'Connexion',
    },
  },
  pt: {
    nav: {
      product: 'Produto',
      pricing: 'Precos',
      signIn: 'Entrar',
      getStarted: 'Comecar',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'Conheca seu',
      titleLine2: 'chief of staff always-on.',
      description:
        'Morph transforma entradas confusas em execucao clara. Crie ou atualize planos com text, image, PDF, audio ou web context, e deixe um assistant com contexto recuperar as informacoes certas para mover sua agenda.',
      startWithGoogle: 'Comecar com Google',
      seePricing: 'Ver precos',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'Um unico loop para capture, context, search e execution',
      subtitle:
        'A maioria das ferramentas separa criacao, retrieval e acompanhamento em apps diferentes. Morph une os tres em um unico assistant workflow.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'Entenda a intencao a partir de text, image, PDF, audio e web context.',
      },
      {
        title: 'Context',
        description: 'Una Calendar, Tasks e historico em uma unica working memory.',
      },
      {
        title: 'Retrieve',
        description: 'Encontre rapidamente os fatos certos com semantic search.',
      },
      {
        title: 'Execute + Sync',
        description: 'Crie e atualize events/tasks e depois faca sync bidirecional com Google.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'Primeiro entende, depois executa',
      description:
        'Morph consulta continuamente seu Calendar, suas Tasks e acoes recentes antes de responder. Isso mantem sugestoes relevantes e atualizacoes consistentes.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Demos de Input',
      title: 'Blocos demo-ready para cada input mode',
      subtitle:
        'Substitua cada placeholder por seu screenshot/video real de criacao ou atualizacao. A estrutura esta pronta para workflows de text, image, PDF, audio e web.',
      screenshotPlaceholder: 'Placeholder de screenshot demo',
      videoPlaceholder: 'Placeholder de video demo',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'Digite naturalmente para criar ou atualizar events e tasks.',
        example: '"Mova o standup de sexta para 14h e adicione uma task de preparo."',
      },
      {
        title: 'Image',
        summary: 'Extraia detalhes de agenda de posters, slides ou screenshots.',
        example: 'Tire foto de uma agenda de conferencia e mapeie sessoes para o calendar.',
      },
      {
        title: 'PDF',
        summary: 'Analise documentos e transforme datas em planos estruturados.',
        example: 'Envie um PDF de syllabus e crie events de aula recorrentes.',
      },
      {
        title: 'Audio',
        summary: 'Grave atualizacoes rapidas e deixe o Morph converter em acoes.',
        example: 'Grave um memo de voz e crie tasks de follow-up automaticamente.',
      },
      {
        title: 'Web',
        summary: 'Use web context ao vivo para enriquecer ou validar detalhes de eventos.',
        example: 'Busque detalhes de local e horario de uma URL antes de agendar.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'Pergunte, recupere, resuma e aja',
      subtitle:
        'Morph combina semantic retrieval com o contexto da sua agenda para entregar respostas uteis, nao apenas matching por keywords.',
      demoPlaceholder: 'Placeholder de screenshot/video demo',
    },
    ragExamples: [
      {
        title: 'Recuperacao de memoria de reunioes',
        query: '"Quando foi a ultima vez que alinhei com o design team sobre onboarding?"',
        output: 'Recupera meetings, notas e tasks vinculadas, e resume as mudancas principais.',
      },
      {
        title: 'Reconstrucao da trilha de decisao',
        query: '"Por que movemos o launch para o proximo mes?"',
        output: 'Rastreia events relacionados, updates de tasks e chat context para mostrar o racional completo.',
      },
      {
        title: 'Geracao do proximo passo',
        query: '"O que devo fazer antes da investor call de quinta?"',
        output: 'Encontra dependencias, cria checklist priorizado e sugere blocos de preparacao.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'Em breve com o mobile app',
      description:
        'Morph vai detectar conflitos, janelas de preparo e follow-ups perdidos de forma proativa, sugerindo proximas acoes antes de voce pedir.',
      tip1: '"Voce tem 40 minutos livres antes de design review. Criar checklist de preparo?"',
      tip2: '"Atraso no transito detectado. Mover reserva do jantar em 20 minutos?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'Placeholder de screenshot mobile',
      mobileVideoPlaceholder: 'Placeholder de video mobile',
    },
    cta: {
      title: 'Sua agenda agora tem um unico sistema operacional',
      description:
        'Comece gratis, conecte seu Calendar e substitua loops manuais de agendamento por um assistant context-aware.',
      startNow: 'Comecar agora',
      explore: 'Explorar como funciona',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'Entrar',
    },
  },
  ru: {
    nav: {
      product: 'Продукт',
      pricing: 'Тарифы',
      signIn: 'Войти',
      getStarted: 'Начать',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: 'Язык',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'Познакомьтесь со своим',
      titleLine2: 'always-on chief of staff.',
      description:
        'Morph превращает хаотичные входные данные в четкое execution. Создавайте и обновляйте планы через text, image, PDF, audio и web context, а затем используйте одного context-aware assistant для поиска нужной информации и движения расписания вперед.',
      startWithGoogle: 'Начать с Google',
      seePricing: 'Смотреть тарифы',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'Один loop для capture, context, search и execution',
      subtitle:
        'Большинство инструментов разделяет создание, retrieval и выполнение по разным приложениям. Morph объединяет все в одном assistant workflow.',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'Понимание намерения из text, image, PDF, audio и web context.',
      },
      {
        title: 'Context',
        description: 'Объединение Calendar, Tasks и истории в единую working memory.',
      },
      {
        title: 'Retrieve',
        description: 'Быстрый поиск нужных фактов через semantic search.',
      },
      {
        title: 'Execute + Sync',
        description: 'Создание и обновление events/tasks с bi-directional sync в Google.',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'Сначала понять, потом действовать',
      description:
        'Перед ответом Morph постоянно сверяется с вашим Calendar, Tasks и недавними действиями. Поэтому рекомендации релевантны, а обновления последовательны.',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Input демо',
      title: 'Demo-ready блоки для каждого input mode',
      subtitle:
        'Замените каждый placeholder своими screenshot/video с созданием или обновлением. Структура готова для text, image, PDF, audio и web workflows.',
      screenshotPlaceholder: 'Demo screenshot placeholder',
      videoPlaceholder: 'Demo video placeholder',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: 'Пишите естественным языком для создания или обновления events и tasks.',
        example: '"Перенеси Friday standup на 2 PM и добавь prep task."',
      },
      {
        title: 'Image',
        summary: 'Извлекайте детали расписания из постеров, слайдов и screenshots.',
        example: 'Сфотографируйте программу конференции и добавьте сессии в calendar.',
      },
      {
        title: 'PDF',
        summary: 'Разбирайте документы и превращайте даты в структурированный план.',
        example: 'Загрузите PDF syllabus и создайте повторяющиеся class events.',
      },
      {
        title: 'Audio',
        summary: 'Озвучьте обновления, а Morph превратит их в actions.',
        example: 'Запишите voice memo и автоматически создайте follow-up tasks.',
      },
      {
        title: 'Web',
        summary: 'Используйте live web context для уточнения данных события.',
        example: 'Получите место и время из URL перед добавлением в расписание.',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: 'Спросить, найти, суммировать, выполнить',
      subtitle:
        'Morph объединяет semantic retrieval с контекстом вашего расписания, чтобы отвечать полезно, а не только по keywords.',
      demoPlaceholder: 'Demo screenshot/video placeholder',
    },
    ragExamples: [
      {
        title: 'Поиск памяти встреч',
        query: '"Когда я в последний раз синхронизировался с design team по onboarding?"',
        output: 'Находит связанные meetings, заметки и linked tasks, затем резюмирует изменения.',
      },
      {
        title: 'Восстановление цепочки решений',
        query: '"Почему мы перенесли launch на следующий месяц?"',
        output: 'Трассирует связанные events, обновления tasks и chat context, показывая полный мотив.',
      },
      {
        title: 'Генерация следующего шага',
        query: '"Что мне сделать до investor call в четверг?"',
        output: 'Находит зависимости, формирует priority checklist и предлагает prep blocks.',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'Скоро в mobile app',
      description:
        'Morph будет заранее выявлять конфликты, окна подготовки и пропущенные follow-up, предлагая следующие шаги до вашего запроса.',
      tip1: '"У вас есть 40 минут до design review. Сформировать checklist подготовки?"',
      tip2: '"Обнаружена задержка трафика. Сдвинуть бронь ужина на 20 минут?"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'Mobile screenshot placeholder',
      mobileVideoPlaceholder: 'Mobile video placeholder',
    },
    cta: {
      title: 'Теперь у вашего расписания одна операционная система',
      description:
        'Начните бесплатно, подключите Calendar и замените ручные циклы планирования одним context-aware assistant.',
      startNow: 'Начать сейчас',
      explore: 'Посмотреть как это работает',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'Войти',
    },
  },
  ja: {
    nav: {
      product: '製品',
      pricing: '料金',
      signIn: 'ログイン',
      getStarted: '開始する',
      tagline: 'YOUR AI CHIEF OF STAFF',
      language: '言語',
    },
    hero: {
      eyebrow: 'Schedule + Tasks Assistant',
      titleLine1: 'あなたの',
      titleLine2: 'always-on chief of staff。',
      description:
        'Morphはバラバラな入力を実行可能な計画に変えます。text、image、PDF、audio、web contextで予定を作成・更新し、文脈を理解する1つのassistantで必要な情報を取得して実行まで進められます。',
      startWithGoogle: 'Googleで始める',
      seePricing: '料金を見る',
    },
    how: {
      label: 'How Morph AI Works',
      title: 'capture・context・search・executionを1つのloopで',
      subtitle:
        '多くのツールは作成、検索、実行を別々のappに分けています。Morphはそれらを1つのassistant workflowに統合します。',
    },
    workflowStages: [
      {
        title: 'Capture',
        description: 'text、image、PDF、audio、web contextから意図を理解します。',
      },
      {
        title: 'Context',
        description: 'Calendar、Tasks、履歴を1つのworking memoryに統合します。',
      },
      {
        title: 'Retrieve',
        description: 'semantic searchで必要な情報を素早く見つけます。',
      },
      {
        title: 'Execute + Sync',
        description: 'events/tasksを作成・更新し、Googleと双方向syncします。',
      },
    ],
    liveModel: {
      label: 'Live Assistant Model',
      title: 'まず理解し、その後に実行',
      description:
        'Morphは返答前にCalendar、Tasks、最近の操作を継続的に参照します。これにより提案は関連性が高く、更新は一貫します。',
      input: 'Input: text/image/PDF/audio/web',
      context: 'Context graph: meetings, tasks, history, metadata',
      output: 'Output: create/update/search/summarize/next actions',
    },
    inputSection: {
      label: 'Inputデモ',
      title: 'すべてのinput mode向けdemo-readyブロック',
      subtitle:
        '各placeholderを実際のscreenshot/videoに置き換えるだけで、text・image・PDF・audio・web workflowを表示できます。',
      screenshotPlaceholder: 'デモ screenshot placeholder',
      videoPlaceholder: 'デモ video placeholder',
    },
    inputDemos: [
      {
        title: 'Text',
        summary: '自然言語でeventsとtasksを作成・更新できます。',
        example: '"金曜のstandupを2 PMに移して、準備taskを追加して。"',
      },
      {
        title: 'Image',
        summary: 'ポスター、スライド、screenshotsから予定情報を抽出します。',
        example: 'カンファレンス日程を撮影してsessionsをcalendarに反映します。',
      },
      {
        title: 'PDF',
        summary: '文書を解析して日付を構造化プランへ変換します。',
        example: 'syllabus PDFをアップロードして繰り返しclass eventを作成します。',
      },
      {
        title: 'Audio',
        summary: '音声で更新を伝えるとMorphがactionsに変換します。',
        example: 'voice memoを録音してfollow-up tasksを自動作成します。',
      },
      {
        title: 'Web',
        summary: 'live web contextでevent情報を補強・確認します。',
        example: '予定追加前にURLから場所と時間の詳細を取得します。',
      },
    ],
    ragSection: {
      label: 'AI Search (RAG)',
      title: '質問して、取得して、要約して、実行する',
      subtitle:
        'Morphはsemantic retrievalとあなたの予定コンテキストを組み合わせ、keyword一致以上の有用な回答を返します。',
      demoPlaceholder: 'デモ screenshot/video placeholder',
    },
    ragExamples: [
      {
        title: 'meeting履歴の検索',
        query: '"onboardingについてdesign teamと最後にすり合わせたのはいつ？"',
        output: '関連meeting、notes、linked tasksを取得して、重要な変更点を要約します。',
      },
      {
        title: '意思決定の経緯再構成',
        query: '"なぜlaunchを来月に延期したの？"',
        output: '関連events、task更新、chat contextをたどり、理由を整理して提示します。',
      },
      {
        title: '次アクションの生成',
        query: '"木曜のinvestor call前に何をすべき？"',
        output: '依存項目を特定し、優先順位付きchecklistを作成し、prep blockまで提案します。',
      },
    ],
    proactive: {
      label: 'Proactive Suggestions',
      title: 'mobile appで近日提供予定',
      description:
        'Morphは競合、準備時間、抜け漏れfollow-upを先回りで検知し、あなたが聞く前に次の行動を提案します。',
      tip1: '"design review前に40分空いています。準備checklistを作成しますか？"',
      tip2: '"交通遅延を検知しました。夕食予約を20分後ろにずらしますか？"',
      mobileAssetsLabel: 'Mobile Preview Assets',
      mobileScreenshotPlaceholder: 'mobile screenshot placeholder',
      mobileVideoPlaceholder: 'mobile video placeholder',
    },
    cta: {
      title: 'あなたのスケジュールは、1つのOSで動く',
      description: '無料で始めてCalendarを接続し、手作業の調整ループを1つのcontext-aware assistantに置き換えましょう。',
      startNow: '今すぐ開始',
      explore: '仕組みを見る',
    },
    footer: {
      privacy: 'PRIVACY',
      terms: 'TERMS',
      signIn: 'ログイン',
    },
  },
}
