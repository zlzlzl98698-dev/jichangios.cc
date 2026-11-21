import fs from 'node:fs'
import path from 'node:path'
import { ALL_BRANDS } from '../docs/.vitepress/data/brands/index.ts'
import { PRIMARY_SECTIONS } from '../docs/.vitepress/data/navigation.ts'
import { BRAND_LINKS } from '../docs/.vitepress/data/links.ts'

const root = process.cwd()
const docsDir = path.join(root, 'docs')

let errors: string[] = []
let warnings: string[] = []

const mdFiles: string[] = []
function collectMd(dir: string) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === '.vitepress' || ent.name === 'public') continue
      collectMd(full)
    } else if (ent.name.endsWith('.md')) {
      mdFiles.push(full)
    }
  }
}
collectMd(docsDir)

const seenUrls = new Set<string>()
const validPageTypes = new Set(['tutorial', 'review', 'comparison', 'commercial', 'topic'])
const validIntents = new Set(['informational', 'investigational', 'transactional', 'navigational'])
const brandSlugs = new Set(ALL_BRANDS.map((b) => b.slug))
const referralHosts = Object.values(BRAND_LINKS).map((l) => new URL(l.registerUrl).hostname)

const counts = {
  total: 0,
  tutorial: 0,
  review: 0,
  comparison: 0,
  commercial: 0,
  topic: 0
}

for (const file of mdFiles) {
  const rel = path.relative(docsDir, file).replace(/\\/g, '/')
  const content = fs.readFileSync(file, 'utf8')
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fmMatch) {
    errors.push(`Missing frontmatter: docs/${rel}`)
    continue
  }
  const fm = fmMatch[1]
  const getField = (k: string) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '')

  const title = getField('title')
  const description = getField('description')
  const pageType = getField('pageType')
  const searchIntent = getField('searchIntent')
  const draft = getField('draft')

  if (!title) errors.push(`Missing title: docs/${rel}`)
  if (!description) errors.push(`Missing description: docs/${rel}`)
  if (!pageType || !validPageTypes.has(pageType)) errors.push(`Invalid pageType (${pageType}) in docs/${rel}`)
  if (!searchIntent || !validIntents.has(searchIntent)) errors.push(`Invalid searchIntent (${searchIntent}) in docs/${rel}`)

  if (rel !== '404.md' && draft !== 'true') {
    counts.total++
    if (pageType && pageType in counts) {
      counts[pageType as keyof typeof counts]++
    }
  }

  let url = '/' + rel.replace(/\.md$/, '')
  if (rel === 'index.md') url = '/'
  else if (rel.endsWith('/index.md')) url = '/' + rel.slice(0, -'index.md'.length)

  if (seenUrls.has(url)) {
    errors.push(`Duplicate URL detected: ${url}`)
  }
  seenUrls.add(url)

  // Ensure ZERO hardcoded affiliate URLs in any Markdown file!
  for (const host of referralHosts) {
    if (content.includes(host)) {
      errors.push(`Hardcoded affiliate host (${host}) found in docs/${rel}; must use links.ts!`)
    }
  }

  // Ensure tutorial pages never embed commercial CTA components
  if (pageType === 'tutorial') {
    if (/<BrandCTA|<RegistrationButton|<CommercialPage|<BrandRecommendation/i.test(content)) {
      errors.push(`Tutorial page docs/${rel} contains commercial CTA component!`)
    }
  }

  // Prevent Hidden FAQ Schema: any page declaring frontmatter `faq:` must render FAQSection or HomeKnowledgeBase
  if (/^faq:\r?\n\s+-\s+q:/m.test(fm)) {
    if (!/<FAQSection|<HomeKnowledgeBase/i.test(content)) {
      errors.push(`Hidden FAQ Schema detected in docs/${rel}: frontmatter has faq: without visible <FAQSection />!`)
    }
  }

  // Validate brandSlugs references
  const slugLines = fm.match(/^brandSlugs:\r?\n((?:\s+-\s+.+\r?\n?)+)/m)
  if (slugLines) {
    const items = slugLines[1]
      .split(/\r?\n/)
      .map((l) => l.replace(/^\s*-\s*/, '').trim())
      .filter(Boolean)
    for (const s of items) {
      if (!brandSlugs.has(s)) {
        errors.push(`Unknown brandSlug "${s}" in docs/${rel}`)
      }
    }
  }
}

// Verify 4 primary + 28 secondary + 31 brand pages exist
for (const sec of PRIMARY_SECTIONS) {
  if (!seenUrls.has(sec.link)) errors.push(`Missing primary section page: ${sec.link}`)
  for (const t of sec.topics) {
    if (!seenUrls.has(t.link)) errors.push(`Missing secondary topic page: ${t.link}`)
  }
}
for (const b of ALL_BRANDS) {
  if (!seenUrls.has(`/brands/${b.slug}`)) errors.push(`Missing brand detail page: /brands/${b.slug}`)
}

// Verify RegistrationButton enforces target="_blank" and rel="nofollow sponsored noopener"
const regBtn = fs.readFileSync(path.join(root, 'docs/.vitepress/theme/components/RegistrationButton.vue'), 'utf8')
if (!regBtn.includes('target="_blank"') || !regBtn.includes('nofollow sponsored noopener')) {
  errors.push('RegistrationButton.vue missing required target="_blank" or rel="nofollow sponsored noopener"!')
}

// Verify robots.txt, E-E-A-T trust pages, and Cloudflare Pages static files
for (const pub of ['robots.txt', '_headers', '_redirects', 'favicon.svg', 'images/og-cover.png']) {
  if (!fs.existsSync(path.join(docsDir, 'public', pub))) {
    errors.push(`Missing docs/public/${pub}`)
  }
}
for (const trustUrl of ['/about', '/methodology', '/privacy-and-disclaimer']) {
  if (!seenUrls.has(trustUrl)) {
    errors.push(`Missing required E-E-A-T trust page: ${trustUrl}`)
  }
}

const robots = fs.readFileSync(path.join(docsDir, 'public/robots.txt'), 'utf8')
if (!robots.includes('https://jichangios.cc/sitemap.xml')) {
  warnings.push('robots.txt Sitemap URL mismatch')
}

console.log('=== Site Validation Summary ===')
console.log(`Published Markdown Pages (excluding 404): ${counts.total}`)
console.log(`  - tutorial:   ${counts.tutorial}`)
console.log(`  - review:     ${counts.review}`)
console.log(`  - comparison: ${counts.comparison}`)
console.log(`  - commercial: ${counts.commercial}`)
console.log(`  - topic:      ${counts.topic}`)
console.log(`Unique Brand Entities: ${ALL_BRANDS.length}`)
console.log(`Warnings: ${warnings.length}, Errors: ${errors.length}`)

if (warnings.length) {
  console.warn('Warnings:\n' + warnings.map((w) => '  - ' + w).join('\n'))
}
if (errors.length) {
  console.error('Errors:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log('ALL VALIDATION CHECKS PASSED!')
