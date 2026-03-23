import { chromium } from 'playwright'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DEMO_DIR = path.join(__dirname, '..', 'public', 'demo')

const BASE_URL = process.argv[2] || 'http://localhost:3000'

// Each entry: [category section id, tab index (0-based), output filename]
const CAPTURES = [
  // Text demos
  ['text', 0, 'chat-01-multi-event-generation.png'],
  ['text', 1, 'chat-02-task-planning.png'],
  ['text', 2, 'chat-03-schedule-summary.png'],
  ['text', 4, 'chat-04-recurring-plan.png'],

  // Image & PDF demos
  ['image-pdf', 0, 'chat-img-conference.png'],
  ['image-pdf', 3, 'chat-img-messenger.png'],
  ['image-pdf', 4, 'chat-img-email.png'],

  // Audio demos
  ['audio', 0, 'chat-audio-call.png'],
  ['audio', 1, 'chat-audio-memo.png'],

  // Web search demos
  ['web', 0, 'chat-05-web-search-warriors.png'],
  ['web', 1, 'chat-web-holidays.png'],

  // Semantic search demos
  ['rag', 0, 'chat-rag-homework.png'],
  ['rag', 1, 'chat-rag-hours.png'],
]

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  console.log(`Loading landing page: ${BASE_URL}`)
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 60000 })
  // Wait for client-side hydration and rendering
  await page.waitForTimeout(5000)

  // Hide sticky nav and tab bars so they don't appear in screenshots
  await page.evaluate(() => {
    document.querySelectorAll('header, nav').forEach(el => el.style.display = 'none')
    // Hide the sticky category tab bar
    document.querySelectorAll('.sticky').forEach(el => el.style.display = 'none')
  })

  // Debug: log all section IDs found
  const sectionIds = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section[id]')).map(el => el.id)
  })
  console.log('Found sections:', sectionIds)

  for (const [sectionId, tabIndex, filename] of CAPTURES) {
    console.log(`Capturing: ${filename} (section=${sectionId}, tab=${tabIndex})`)

    // Scroll to section using JS
    const found = await page.evaluate((id) => {
      const el = document.getElementById(id)
      if (el) { el.scrollIntoView({ behavior: 'instant' }); return true }
      return false
    }, sectionId)

    if (!found) {
      console.log(`  ✗ Section #${sectionId} not found on page`)
      continue
    }
    await page.waitForTimeout(800)

    // Click tab if not first
    if (tabIndex > 0) {
      const section = page.locator(`#${sectionId}`)
      // ScenarioTabs buttons are inside the section
      const tabs = section.locator('button').filter({ hasText: /.+/ })
      const tabCount = await tabs.count()
      console.log(`  Tab count: ${tabCount}, clicking index ${tabIndex}`)
      if (tabIndex < tabCount) {
        await tabs.nth(tabIndex).click()
        await page.waitForTimeout(800)
      }
    }

    // Find the StaticDemoChat container (has both max-h-[560px] and overflow-y-auto)
    const section = page.locator(`#${sectionId}`)
    const chatContainer = section.locator('div.overflow-y-auto.rounded-2xl').first()

    if (await chatContainer.count() > 0) {
      // Remove max-height and overflow clipping so full content is captured
      await chatContainer.evaluate((el) => {
        el.style.maxHeight = 'none'
        el.style.overflow = 'visible'
      })
      await page.waitForTimeout(300)

      await chatContainer.screenshot({
        path: path.join(DEMO_DIR, filename),
        type: 'png',
      })

      // Restore original styles
      await chatContainer.evaluate((el) => {
        el.style.maxHeight = ''
        el.style.overflow = ''
      })

      console.log(`  ✓ Saved ${filename}`)
    } else {
      console.log(`  ✗ Chat container not found in section ${sectionId}`)
    }
  }

  // Capture proactive cards grid
  console.log('Capturing: proactive-cards.png')
  await page.evaluate(() => {
    const el = document.getElementById('proactive')
    if (el) el.scrollIntoView({ behavior: 'instant' })
  })
  await page.waitForTimeout(800)

  // The proactive grid with phone mockups
  const proactiveSection = page.locator('#proactive')
  const proactiveGrid = proactiveSection.locator('.grid').last()
  if (await proactiveGrid.count() > 0) {
    await proactiveGrid.screenshot({
      path: path.join(DEMO_DIR, 'proactive', 'proactive-cards.png'),
      type: 'png',
    })
    console.log('  ✓ Saved proactive-cards.png')
  } else {
    console.log('  ✗ Proactive grid not found')
  }

  await browser.close()
  console.log('\nDone! All screenshots captured.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
