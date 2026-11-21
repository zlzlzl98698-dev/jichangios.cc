import fs from 'node:fs'
import path from 'node:path'
import { ALL_BRANDS } from '../docs/.vitepress/data/brands/index.ts'
import type { BrandEntity } from '../docs/.vitepress/data/brands/types.ts'
import { getBrandLink } from '../docs/.vitepress/data/links.ts'

const outDir = path.resolve(process.cwd(), 'docs/brands')
fs.mkdirSync(outDir, { recursive: true })

function cleanInline(input: string): string {
  return input.replace(/['"`]/g, '').replace(/\s+/g, ' ').trim()
}

function getVariedHeadings(brand: BrandEntity) {
  const modeSuffix =
    brand.clientMode === 'dedicated_only'
      ? '专属客户端登录说明与设备边界'
      : brand.clientMode === 'both'
        ? '自研端与 Clash/小火箭通用订阅导入指引'
        : brand.clientMode === 'third_party'
          ? '第三方 Clash / Shadowrocket / 软路由接入指南'
          : '客户端适配模式与待核实清单'

  const speedHeading =
    brand.speedReport.dataOrigin === 'measured'
      ? `${brand.name} 实测速率截图（${cleanInline(brand.speedReport.testDate)}）与解锁现状`
      : brand.dataStatus === 'historical'
        ? `${brand.name} 历史档案实测与时效状态核对`
        : `${brand.name} 性能记录现状与媒体/AI 可用边界`

  const auditHeading = `${brand.name} 资料来源审计与多口径差异核对`
  const h1Headline = `${brand.name}（${brand.foundedYear}）套餐价格、线路实测与官网资料`

  return {
    h1Headline,
    overview: `${brand.name} 基础档案与核实等级（${brand.lineCategory}）`,
    pricing: `${brand.name} ${brand.lowestMonthlyPrice !== null ? `¥${brand.lowestMonthlyPrice} 月付起` : '年付/周期'}套餐矩阵`,
    client: `${brand.name} ${modeSuffix}`,
    speed: speedHeading,
    prosCons: `${brand.name} 客观优势分析与已知局限`,
    audience: `哪些场景适合选择 ${brand.name}（及不建议入手人群）`,
    audit: auditHeading,
    peers: `与 ${brand.name} 同档位或可替代品牌横向对照`,
    risk: `${brand.name} 下单试水前必看风险提示`,
    faq: `${brand.name} 购买前常见问题（FAQ）`
  }
}

function buildClientOnboardingSection(brand: BrandEntity, heading: string): string {
  const protocols = cleanInline(brand.protocols.join(' / ') || '待核实')
  const clients = cleanInline(brand.supportedClients.join('、') || brand.clientModeLabel)
  const hasModernProto = /Hysteria|Reality/i.test(protocols)

  if (brand.clientMode === 'both') {
    return `## ${heading}

- **接入模式**：\`${brand.clientModeLabel}\`（已核实兼顾「官方一键端」与「第三方通用订阅」）
- **核心协议栈**：\`${protocols}\` · **适配参考**：${clients}
- **配置建议**：
  1. **桌面与多平台优先选 Clash Verge Rev / FlClash**：进入用户面板复制「Clash 订阅链接」导入即可，避免安装早已停更的 \`Clash for Windows\`；${hasModernProto ? '因含现代协议，请确认客户端为最新 Mihomo/sing-box 内核版本。' : '建议开启定期自动更新（如 720 分钟），保持节点列表同步。'}
  2. **iOS / 软路由扩展**：已购美区 \`Shadowrocket / Stash\` 或部署 \`OpenWrt (OpenClash / Nikki)\` 的用户，均可直接使用通用订阅接入并在本地编写分流规则；家人或纯新手则可先安装官网桌面/移动一键端。
  3. **AI 与流媒体分组习惯**：日常使用 ChatGPT / Claude / Gemini 时，建议在客户端内使用 \`select\` 手动锁定新加坡、日本或美国节点，不要开自动延迟跳区。`
  }

  if (brand.clientMode === 'third_party') {
    return `## ${heading}

- **接入模式**：\`${brand.clientModeLabel}\`（专注第三方开源/通用客户端生态）
- **核心协议栈**：\`${protocols}\` · **推荐客户端**：${clients}
- **配置建议**：
  1. **PC / Mac / Linux 桌面端**：优先从官方 GitHub 下载 [Clash Verge Rev](/guides/clash-verge-windows) 或 \`v2rayN\` 并校验安装包 SHA-256，粘贴订阅链接后开启 \`Rule\` 规则模式。
  2. **移动端与软路由**：Android 推荐使用 \`FlClash\` 或 \`v2rayNG\`（避免 Play 商店来历不明的假冒 NekoBox）；iOS 可用付费 \`Shadowrocket\` / \`Stash\` 或免费 \`Karing\` / \`Clash Mi\`；软路由原生适配 \`OpenClash\` / \`PassWall2\` / \`Nikki (OpenWrt 24.10+)\`。
  3. **规则防坑**：${hasModernProto ? 'Hysteria 2 在部分公司/校园网下若遇 UDP 限流阻断，可直接切换同订阅下的 VLESS-Reality 或 Shadowsocks 节点。' : '在客户端确认系统时间误差小于 60 秒，并开启 Fake-IP 模式加速网页解析与防 DNS 泄漏。'}`
  }

  if (brand.clientMode === 'dedicated_only') {
    return `## ${heading}

- **接入模式**：\`${brand.clientModeLabel}\`（**重要提醒：当前不提供通用订阅链接**）
- **覆盖环境**：${clients}
- **使用前必须确认的限制**：
  1. **无法导入通用工具**：因服务商收紧订阅入口，账号仅能登录官方自研专属客户端，**不能导入 Clash Verge Rev、v2rayN、Shadowrocket（小火箭）或标准 OpenWrt OpenClash 插件**。
  2. **双开冲突提示**：专属软件启动时往往会自动修改系统代理或创建虚拟网卡；如设备已有其他 VPN/游戏加速器/Clash，切换使用前请先完全退出另一款程序。
  3. **多平台可用性核查**：若需要使用 iPhone/iPad 或特定桌面系统，下单前先登录官网下载页确认对应端（如海外商店/TestFlight/安装包）当前可正常安装。`
  }

  return `## ${heading}

- **接入模式**：\`${brand.clientModeLabel}\`（当前源资料未完整明示是否开放通用订阅）
- **已披露协议信息**：\`${protocols}\` · **记录客户端描述**：${clients}
- **下单前核查动作**：
  1. **务必先注册进后台检查订阅入口**：如果你必须依赖 \`Clash Verge Rev\`、iOS \`Shadowrocket\` 或 \`OpenWrt 软路由\`，先确认用户中心是否直接提供 Clash / 通用订阅复制按钮。
  2. **避开预付长周期锁定**：在未确认官网实际软件版本和下载可用性前，尽量先以低门槛短周期体验测试。`
}

function buildPeerAlternativesSection(brand: BrandEntity, heading: string): string {
  const candidates = ALL_BRANDS.filter((b) => b.slug !== brand.slug)
    .map((b) => {
      let score = 0
      if (b.lineCategory === brand.lineCategory) score += 3
      if (b.clientMode === brand.clientMode) score += 2
      if (b.dataStatus === 'measured') score += 4
      if (b.clientMode === 'both' || b.clientMode === 'third_party') score += 2
      if (b.reviewPath) score += 1
      return { b, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.b)

  const rows = candidates.map((p) => {
    const revLink = p.reviewPath ? `[评测](${p.reviewPath}) · [详情](/brands/${p.slug})` : `[详情](/brands/${p.slug})`
    return `| **${p.name}** | ${p.lineCategory} | ${p.clientModeLabel} | ${p.entryPriceDisplay} | ${p.dataStatusLabel} | ${revLink} |`
  })

  return `## ${heading}

如果 ${brand.name} 在客户端限制、测试数据完整度或起步计费周期上不完全匹配您的需求，可直接比对以下同站收录品牌：

| 品牌 | 线路定位 | 客户端模式 | 入门价格口径 | 数据核实等级 | 直达入口 |
| :--- | :--- | :--- | :--- | :--- | :--- |
${rows.join('\n')}`
}

function buildBrandFaq(brand: BrandEntity): { q: string; a: string }[] {
  const monthlyNote =
    brand.lowestMonthlyPrice !== null
      ? `${brand.name} 在已核实档案中的单月付最低门槛为 ¥${brand.lowestMonthlyPrice}/月（具体流量见上方价目表）`
      : `${brand.name} 目前在原资料中缺少清晰的常驻单月付阶梯价格表，页面仅见 ${cleanInline(brand.entryPriceDisplay)} 口径`

  const promoNoteText = brand.promoCode
    ? `档案记录优惠码为 ${cleanInline(brand.promoCode)}（${cleanInline(brand.promoDiscount || '具体折扣以官网结算为准')}）${brand.promoNote ? `，说明：${cleanInline(brand.promoNote)}` : ''}。`
    : `${cleanInline(brand.promoNote || '当前资料暂无明确公开优惠码记录，请以官网购物车实际价格为准。')}`

  const clientFaqAnswer =
    brand.clientMode === 'dedicated_only'
      ? `不支持。${brand.name} 目前属于「仅专属客户端」模式，不对外提供第三方通用订阅 URL，因此无法导入 Clash Verge Rev、v2rayN、Shadowrocket 或标准 OpenClash 软路由。`
      : brand.clientMode === 'both' || brand.clientMode === 'third_party'
        ? `支持。${brand.name} 兼容第三方通用订阅导入（协议栈：${cleanInline(brand.protocols.join('/') || '开源常见协议')}），可用于 Clash Verge Rev、FlClash、Shadowrocket 及 OpenWrt 软路由插件。`
        : `目前资料对此项标为「待核实」。购买前请先进入官网用户中心确认是否提供标准 Clash/通用订阅链接，再决定是否下单。`

  const dataFaqAnswer =
    brand.speedReport.dataOrigin === 'measured'
      ? `具备对应实测记录（测试日期：${cleanInline(brand.speedReport.testDate)}，环境：${cleanInline(brand.speedReport.environment)}）。${cleanInline(brand.speedReport.summaryNote)}`
      : `该品牌在当前资料库中属于「${cleanInline(brand.dataStatusLabel)}」（${cleanInline(brand.speedReport.summaryNote)}）。本站不虚构任何测速数字，建议低预算试水并以自家晚高峰实测为准。`

  return [
    {
      q: `${brand.name} 支持导入 Clash Verge Rev、Shadowrocket 或 OpenWrt 软路由吗？`,
      a: clientFaqAnswer
    },
    {
      q: `${brand.name} 真实单月付多少钱？有什么优惠码或限制吗？`,
      a: `${monthlyNote}。${promoNoteText}`
    },
    {
      q: `${brand.name} 有实测测速和解锁验证数据吗？`,
      a: dataFaqAnswer
    },
    {
      q: `${brand.name} 同时支持几台设备登录？有什么特别限制？`,
      a: `设备限制口径为「${cleanInline(brand.deviceLimit)}」，运营起始标注为「${cleanInline(brand.foundedYear)}」，支付方式记录为「${cleanInline(brand.paymentMethods.join(' / ') || '以官网收银台为准')}」。买前注意查看上述客观限制与条款提醒。`
    }
  ]
}

for (const brand of ALL_BRANDS) {
  const linkInfo = getBrandLink(brand.slug)
  const isGuangsuyun = brand.slug === 'guangsuyun'
  const faqItems = buildBrandFaq(brand)
  const h = getVariedHeadings(brand)

  const relatedItems = [
    brand.reviewPath
      ? {
          title: `${brand.name} 独立深度评测`,
          link: brand.reviewPath,
          description: `查看 ${brand.name} 的评测结论、测速解读与数据缺口核查。`,
          tag: '独立评测'
        }
      : {
          title: '独立品牌评测中心',
          link: '/reviews/',
          description: '查看其他品牌实测数据与对比方法。',
          tag: '评测'
        },
    {
      title: '31 家品牌数据库筛选',
      link: '/brands/',
      description: '返回品牌总库，按价格、线路与客户端模式比较全部品牌。',
      tag: '数据库'
    },
    brand.clientMode === 'dedicated_only'
      ? {
          title: '专属客户端 vs 通用订阅对比',
          link: '/comparisons/dedicated-client-vs-third-party',
          description: '了解仅专属客户端与 Clash 第三方订阅的差异与边界。',
          tag: '对比'
        }
      : {
          title: 'Clash Verge Rev 订阅导入教程',
          link: '/guides/clash-verge-subscription-setup',
          description: '学习如何在电脑端导入通用订阅并切换节点。',
          tag: '教程'
        }
  ]

  const discrepanciesBlock =
    brand.discrepancies.length > 0
      ? `## ${h.audit}\n\n${brand.discrepancies.map((d) => `- ${d}`).join('\n')}\n`
      : ''

  const linkNoteBlock = linkInfo?.linkStatusNote
    ? `\n> **注册链接格式/时效提示**：${linkInfo.linkStatusNote}\n`
    : ''

  const faqFrontmatter = faqItems
    .map((item) => `  - q: ${JSON.stringify(item.q)}\n    a: ${JSON.stringify(item.a)}`)
    .join('\n')

  const onboardingSection = buildClientOnboardingSection(brand, h.client)
  const peersSection = buildPeerAlternativesSection(brand, h.peers)

  const md = `---
title: "${brand.name} 官网套餐、价格、线路与评测资料（2026）"
headline: ${JSON.stringify(h.h1Headline)}
description: "${brand.name}（${brand.foundedYear}）完整档案：${brand.lineType}，${brand.entryPriceDisplay}，客户端支持 ${brand.clientModeLabel}。含核实日期与使用限制说明。"
date: 2026-11-20
updatedDate: ${brand.updatedDate}
category: "品牌与套餐"
tags:
  - ${brand.name}
  - ${brand.lineCategory}
author: "机场苹果编辑部"
pageType: commercial
searchIntent: transactional
draft: false
affiliateDisclosure: true
brandSlugs:
  - ${brand.slug}
sources:
${brand.sources.map((s) => `  - ${JSON.stringify(s)}`).join('\n')}
faq:
${faqFrontmatter}
related:
${relatedItems
  .map(
    (r) =>
      `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    description: ${JSON.stringify(r.description)}\n    tag: ${JSON.stringify(r.tag)}`
  )
  .join('\n')}
---

# ${h.h1Headline}

<CommercialPage slug="${brand.slug}" />

<BrandInfrastructureSnapshot slug="${brand.slug}" />

## ${h.overview}

- **核心定位与评价摘要**：${brand.summary}
- **档案可信度分级**：\`${brand.dataStatusLabel}\`（核实日期：\`${brand.verifiedDate}\` · 节点规模：${brand.nodeCountLabel} · 地区覆盖：${brand.regionsSummary}）
- **支付与优惠信息**：支持 ${brand.paymentMethods.join(' / ') || '以官网收银台为准'}；${brand.promoCode ? `记录优惠码 \`${brand.promoCode}\`（${brand.promoDiscount || '具体折扣以结算页为准'}）` : '暂无明确公开优惠码记录'}${brand.promoNote ? `——${brand.promoNote}` : ''}

## ${h.pricing}

<BrandPricingTable slug="${brand.slug}" />

${
  isGuangsuyun
    ? `> **光速云专项核实说明**：本页综合《光速云品牌信息.txt》与《32家机场品牌清单.txt》整理完整 7 档套餐。其中“约 8 元/月”为轻量版年付（¥99/年，69GB/月，折合 ¥8.25/月；早期摘要曾记 59GB）折算值，并非单月付价格。极速版与定制版支持多周期折扣；147 永久版与轻量版不打折且特殊商品不支持退款。\n\n`
    : ''
}${brand.tiersIncompleteNote ? `> **套餐完整性备注**：${brand.tiersIncompleteNote}\n\n` : ''}${onboardingSection}

## ${h.speed}

<NetworkPerformanceReport slug="${brand.slug}" />

<StreamingAvailabilityMatrix slug="${brand.slug}" />

<NetworkTopology slug="${brand.slug}" />

## ${h.prosCons}

### 已核实优势
${brand.pros.map((p) => `- ${p}`).join('\n')}

### 已知限制与资料缺口
${brand.limitations.map((l) => `- ${l}`).join('\n')}

## ${h.audience}

- **适合人群**：${brand.suitableFor.join('；')}
- **不适合人群**：${brand.notSuitableFor.join('；')}

${discrepanciesBlock}
${peersSection}

## ${h.risk}

${brand.riskNotes.map((r) => `- ${r}`).join('\n')}
${linkNoteBlock}
## ${h.faq}

<FAQSection title="${brand.name} 常见问题" />

<BrandCTA slug="${brand.slug}" />
`

  fs.writeFileSync(path.join(outDir, `${brand.slug}.md`), md, 'utf8')
}

console.log(`Generated ${ALL_BRANDS.length} de-templated brand pages in docs/brands/`)
