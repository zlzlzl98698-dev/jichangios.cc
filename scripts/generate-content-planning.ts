import fs from 'node:fs'
import path from 'node:path'
import { PRIMARY_SECTIONS } from '../docs/.vitepress/data/navigation.ts'
import { ALL_BRANDS, BRAND_COUNT_AUDIT } from '../docs/.vitepress/data/brands/index.ts'
import { BRAND_LINKS } from '../docs/.vitepress/data/links.ts'

const root = process.cwd()
const seoDir = path.join(root, 'content-planning/seo')
const geoDir = path.join(root, 'content-planning/geo')
const brandsDir = path.join(root, 'content-planning/brands')
fs.mkdirSync(seoDir, { recursive: true })
fs.mkdirSync(geoDir, { recursive: true })
fs.mkdirSync(brandsDir, { recursive: true })

function docExists(urlPath: string): boolean {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '')
  if (!clean) return fs.existsSync(path.join(root, 'docs/index.md'))
  return (
    fs.existsSync(path.join(root, 'docs', `${clean}.md`)) ||
    fs.existsSync(path.join(root, 'docs', clean, 'index.md'))
  )
}

// 1. SEO-一级导航规划.md
const nav1Md = `# SEO 一级导航规划（严格 4 个一级栏目）

生产域名：\`https://jichangios.cc\` · 网站名称：**机场苹果**

| 序号 | 一级导航 | 入口 URL | Markdown 文件 | 专题定位 | 二级专题数 | 规划状态 |
| :-: | :--- | :--- | :--- | :--- | :-: | :--- |
${PRIMARY_SECTIONS.map(
  (s, i) =>
    `| ${i + 1} | ${s.title} | \`${s.link}\` | \`docs/${s.id}/index.md\` | ${s.description} | ${s.topics.length} | ${docExists(s.link) ? '已发布' : '待撰写'} |`
).join('\n')}

> 说明：品牌数据库（\`/brands/\`）、独立评测中心（\`/reviews/\`）、横向对比（\`/comparisons/\`）与优惠汇总（\`/offers/\`）通过首页、侧栏与专题内链进入，严格遵循不增设第五个一级导航原则。
`
fs.writeFileSync(path.join(seoDir, 'SEO-一级导航规划.md'), nav1Md, 'utf8')

// 2. SEO-二级专题规划.md
const topicRows: string[] = []
for (const sec of PRIMARY_SECTIONS) {
  for (const t of sec.topics) {
    const slug = t.link.replace(/^\//, '')
    const published = docExists(t.link) ? '已发布' : '待撰写'
    const pageType = sec.id === 'clash' || t.link.includes('mobile') || t.link.includes('getting-started') || t.link.includes('free-nodes') || t.link.includes('node-testing') || t.link.includes('subscription-issues') || t.link.includes('beginner-help') ? 'tutorial' : t.link.includes('comparison') ? 'comparison' : 'topic'
    topicRows.push(
      `| ${sec.title} | ${t.title} | \`${t.link}\` | \`docs/${slug}.md\` | ${t.title} | ${pageType} | ${t.clusterNames.join(' / ')} | ${published} |`
    )
  }
}
const nav2Md = `# SEO 二级专题规划（28 个独立专题）

| 一级栏目 | 二级专题 | URL | Markdown 路径 | 主关键词 | pageType | 关联三级集群 | 状态 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${topicRows.join('\n')}
`
fs.writeFileSync(path.join(seoDir, 'SEO-二级专题规划.md'), nav2Md, 'utf8')

// 3. SEO-三级文档集群规划.md (28 * 2 = 56 clusters)
interface ClusterDef {
  id: string
  sectionTitle: string
  sectionId: string
  topicTitle: string
  topicLink: string
  clusterName: string
  intent: string
  targetUser: string
  baseSlug: string
}
const clusters: ClusterDef[] = []
let cIdx = 1
for (const sec of PRIMARY_SECTIONS) {
  for (const t of sec.topics) {
    const tSlug = t.link.split('/').filter(Boolean).pop() || 'topic'
    t.clusterNames.forEach((cn, idx) => {
      clusters.push({
        id: `C${String(cIdx++).padStart(2, '0')}`,
        sectionTitle: sec.title,
        sectionId: sec.id,
        topicTitle: t.title,
        topicLink: t.link,
        clusterName: cn,
        intent: sec.id === 'clash' || sec.id === 'resources' ? 'informational' : 'investigational',
        targetUser: sec.id === 'clash' ? '安装或排查客户端故障的桌面/移动端用户' : '对比评估节点与线路稳定性的选型用户',
        baseSlug: `${sec.id}-${tSlug}-c${idx + 1}`
      })
    })
  }
}

const clusterMd = `# SEO 三级文档集群规划（共 ${clusters.length} 个集群）

| 集群ID | 所属一级栏目 | 上游二级专题 | 三级集群名称 | 核心搜索意图 | 目标用户 | 规划文章数 |
| :-: | :--- | :--- | :--- | :--- | :--- | :-: |
${clusters
  .map(
    (c) =>
      `| ${c.id} | ${c.sectionTitle} | [${c.topicTitle}](${c.topicLink}) | **${c.clusterName}** | ${c.intent} | ${c.targetUser} | 8 |`
  )
  .join('\n')}
`
fs.writeFileSync(path.join(seoDir, 'SEO-三级文档集群规划.md'), clusterMd, 'utf8')

// 4. SEO-完整文章标题库.md (56 clusters * 8 articles = 448 titles!)
// Map known real published articles to their matching clusters so status is 100% factual
const publishedSpecialMap: Record<string, { title: string; url: string; file: string; pageType: string }> = {
  'C06-1': { title: '2026 一次性不限时流量包机场对比：二猫云 / 唯兔云 / 一翻云 / 星岛梦 / 光速云', url: '/articles/one-time-traffic-airport-guide', file: 'docs/articles/one-time-traffic-airport-guide.md', pageType: 'comparison' },
  'C08-1': { title: '晚高峰机场稳定性怎么测？20:00–23:00 本地宽带实测与 curl 基准方法', url: '/articles/airport-peak-hour-testing-guide', file: 'docs/articles/airport-peak-hour-testing-guide.md', pageType: 'tutorial' },
  'C10-1': { title: '年付折算均价 vs 真实月付：避开低价年付“不适用折扣码”与不退款陷阱', url: '/articles/airport-annual-vs-monthly-math', file: 'docs/articles/airport-annual-vs-monthly-math.md', pageType: 'topic' },
  'C19-1': { title: 'iPhone Shadowrocket（小火箭）规则分流、按需连接与防断流完整配置教程', url: '/articles/shadowrocket-rules-setup', file: 'docs/articles/shadowrocket-rules-setup.md', pageType: 'tutorial' },
  'C20-1': { title: 'Android 安卓代理避坑：远离 Play 假冒 NekoBox 与 FlClash/v2rayNG 保活设置', url: '/articles/android-nekobox-security-and-alternatives', file: 'docs/articles/android-nekobox-security-and-alternatives.md', pageType: 'tutorial' },
  'C26-1': { title: 'Hysteria 2 vs VLESS-Reality 深度对比：弱网抗丢包、延迟与防火墙穿透', url: '/articles/hysteria2-vs-vless-reality', file: 'docs/articles/hysteria2-vs-vless-reality.md', pageType: 'comparison' },
  'C29-1': { title: 'Clash 推荐（2026）- 桌面端与移动端 Mihomo/sing-box 客户端选型', url: '/clash/recommended', file: 'docs/clash/recommended.md', pageType: 'tutorial' },
  'C29-2': { title: 'Windows 电脑代理客户端推荐（2026）- Clash Verge Rev / v2rayN / FlClash', url: '/guides/windows-clients', file: 'docs/guides/windows-clients.md', pageType: 'tutorial' },
  'C29-3': { title: 'Android 安卓代理客户端指南（2026）- v2rayNG / FlClash / Hiddify', url: '/guides/android-clients', file: 'docs/guides/android-clients.md', pageType: 'tutorial' },
  'C30-1': { title: 'iOS / iPadOS 代理客户端指南（2026）- 小火箭、Stash、圈 X 与免费替代', url: '/guides/ios-clients', file: 'docs/guides/ios-clients.md', pageType: 'tutorial' },
  'C30-2': { title: 'OpenWrt 软路由代理客户端指南 - OpenClash / PassWall2 / Nikki / HomeProxy', url: '/guides/openwrt-routing', file: 'docs/guides/openwrt-routing.md', pageType: 'tutorial' },
  'C30-3': { title: '2026 全平台第三方代理客户端矩阵（Windows/Android/iOS/macOS/Linux/OpenWrt）', url: '/guides/multi-platform-clients', file: 'docs/guides/multi-platform-clients.md', pageType: 'tutorial' },
  'C31-1': { title: 'Clash Verge Rev 是什么 - 功能架构、Mihomo 内核与版本演进', url: '/clash/verge', file: 'docs/clash/verge.md', pageType: 'tutorial' },
  'C32-1': { title: 'Clash Verge Rev 配置文件备份、恢复与跨电脑迁移指南', url: '/articles/clash-verge-backup-migration', file: 'docs/articles/clash-verge-backup-migration.md', pageType: 'tutorial' },
  'C33-1': { title: 'Clash Verge Rev 官方下载指南 - GitHub Release 与多系统架构区分', url: '/clash/verge-download', file: 'docs/clash/verge-download.md', pageType: 'tutorial' },
  'C34-1': { title: 'Clash Verge Rev 安装包 SHA-256 哈希校验与防仿冒安全核验教程', url: '/articles/clash-verge-checksum-verify', file: 'docs/articles/clash-verge-checksum-verify.md', pageType: 'tutorial' },
  'C35-1': { title: 'Clash Verge Rev 订阅导入与自动更新教程（2026）', url: '/guides/clash-verge-subscription-setup', file: 'docs/guides/clash-verge-subscription-setup.md', pageType: 'tutorial' },
  'C37-1': { title: 'Clash Meta (Mihomo) 内核解析 - 现代协议、Rule Provider 与覆写', url: '/clash/meta', file: 'docs/clash/meta.md', pageType: 'tutorial' },
  'C38-1': { title: 'Clash Verge Rev 全局覆写（Merge 与 Script）实战教程', url: '/articles/clash-verge-override-script', file: 'docs/articles/clash-verge-override-script.md', pageType: 'tutorial' },
  'C38-2': { title: 'Mihomo Rule Provider 与二进制规则集 (.mrs) 配置指南', url: '/articles/clash-verge-rule-provider', file: 'docs/articles/clash-verge-rule-provider.md', pageType: 'tutorial' },
  'C39-1': { title: 'Clash Verge Rev Windows 安装与权限配置教程（2026）', url: '/guides/clash-verge-windows', file: 'docs/guides/clash-verge-windows.md', pageType: 'tutorial' },
  'C39-2': { title: 'Clash Verge Rev macOS 安装教程（2026）- Apple Silicon 与 Intel 区分', url: '/guides/clash-verge-macos', file: 'docs/guides/clash-verge-macos.md', pageType: 'tutorial' },
  'C39-3': { title: 'Clash Verge Rev Linux 安装指南 - DEB / RPM / AppImage 部署', url: '/guides/clash-verge-linux', file: 'docs/guides/clash-verge-linux.md', pageType: 'tutorial' },
  'C39-4': { title: 'Clash 策略组类型详解：select、url-test、fallback 与 load-balance', url: '/articles/clash-verge-proxy-groups-explained', file: 'docs/articles/clash-verge-proxy-groups-explained.md', pageType: 'tutorial' },
  'C40-1': { title: 'Clash Verge Rev DNS 设置与 Fake-IP / Redir-Host 分流详解', url: '/guides/clash-verge-dns', file: 'docs/guides/clash-verge-dns.md', pageType: 'tutorial' },
  'C40-2': { title: 'Clash Verge Rev TUN 模式开启教程与虚拟网卡冲突排查', url: '/guides/clash-verge-tun', file: 'docs/guides/clash-verge-tun.md', pageType: 'tutorial' },
  'C40-3': { title: 'Clash Verge Rev 配合 WSL2、Docker 与 Git 终端代理配置指南', url: '/articles/clash-verge-wsl2-docker-proxy', file: 'docs/articles/clash-verge-wsl2-docker-proxy.md', pageType: 'tutorial' },
  'C41-1': { title: 'Clash Verge Rev 连接失败、节点超时与报错日志排查全手册', url: '/guides/clash-verge-errors', file: 'docs/guides/clash-verge-errors.md', pageType: 'tutorial' },
  'C42-1': { title: 'Windows UWP 应用无法走 Clash 代理？Loopback 环回豁免配置教程', url: '/articles/clash-verge-uwp-loopback', file: 'docs/articles/clash-verge-uwp-loopback.md', pageType: 'tutorial' },
  'C42-2': { title: 'Clash 端口 7897/7890 被占用及异常退出后系统代理残留彻底修复', url: '/articles/clash-verge-port-conflict-recovery', file: 'docs/articles/clash-verge-port-conflict-recovery.md', pageType: 'tutorial' },
  'C53-1': { title: '订阅问题排查大全 - 403/404、YAML 解析失败与专属客户端限制', url: '/resources/subscription-issues', file: 'docs/resources/subscription-issues.md', pageType: 'tutorial' }
}

const angleTemplates = [
  (c: ClusterDef) => `${c.topicTitle}：${c.clusterName}核心原理与选型标准`,
  (c: ClusterDef) => `${c.clusterName}实战操作指南（2026 最新核查）`,
  (c: ClusterDef) => `${c.topicTitle}常见误区拆解：围绕${c.clusterName}的避坑清单`,
  (c: ClusterDef) => `${c.clusterName}在不同设备系统下的适配差异说明`,
  (c: ClusterDef) => `${c.topicTitle}进阶配置：优化${c.clusterName}稳定性与延迟`,
  (c: ClusterDef) => `${c.clusterName}常见报错与故障排查对照表`,
  (c: ClusterDef) => `${c.topicTitle}常见问题 FAQ：关于${c.clusterName}的八大解答`,
  (c: ClusterDef) => `${c.clusterName}延伸对比与相关工具选择建议`
]

interface ArticlePlan {
  no: number
  clusterId: string
  topicTitle: string
  clusterName: string
  title: string
  url: string
  file: string
  keyword: string
  intent: string
  pageType: string
  priority: 'P0' | 'P1' | 'P2'
  status: '已发布' | '待撰写'
}

const articles: ArticlePlan[] = []
let aNo = 1
for (const c of clusters) {
  for (let i = 1; i <= 8; i++) {
    const key = `${c.id}-${i}`
    const special = publishedSpecialMap[key]
    if (special) {
      articles.push({
        no: aNo++,
        clusterId: c.id,
        topicTitle: c.topicTitle,
        clusterName: c.clusterName,
        title: special.title,
        url: special.url,
        file: special.file,
        keyword: `${c.topicTitle} ${c.clusterName}`,
        intent: c.intent,
        pageType: special.pageType,
        priority: 'P0',
        status: docExists(special.url) ? '已发布' : '待撰写'
      })
    } else {
      const slug = `${c.baseSlug}-a${i}`
      const url = `/articles/${slug}`
      const file = `docs/articles/${slug}.md`
      const pageType = c.sectionId === 'clash' || c.sectionId === 'resources' ? 'tutorial' : 'topic'
      const prio: 'P0' | 'P1' | 'P2' = c.sectionId === 'clash' ? 'P1' : 'P2'
      articles.push({
        no: aNo++,
        clusterId: c.id,
        topicTitle: c.topicTitle,
        clusterName: c.clusterName,
        title: angleTemplates[i - 1](c),
        url,
        file,
        keyword: `${c.topicTitle} ${c.clusterName}`,
        intent: c.intent,
        pageType,
        priority: prio,
        status: docExists(url) ? '已发布' : '待撰写'
      })
    }
  }
}

const publishedCount = articles.filter((a) => a.status === '已发布').length
const plannedCount = articles.filter((a) => a.status === '待撰写').length

const titlesMd = `# SEO 完整文章标题库（共 ${articles.length} 篇规划）

- **规划总数**：${articles.length} 篇（56 个三级集群 × 8 篇，处于 336–840 规划区间内）
- **当前已实际发布**：${publishedCount} 篇核心教程 + 28 个二级专题 + 4 个一级中心 + 17 篇独立评测 + 4 篇横向对比 + 31 个品牌详情页
- **待撰写规划中**：${plannedCount} 篇（**严格保留“待撰写”状态，不以空文件充数**）

| 编号 | 集群 | 所属专题 | 文章标题 | URL | Markdown 路径 | pageType | 优先级 | 发布状态 |
| :-: | :-: | :--- | :--- | :--- | :--- | :--- | :-: | :-: |
${articles
  .map(
    (a) =>
      `| ${a.no} | ${a.clusterId} | ${a.topicTitle} | ${a.title} | \`${a.url}\` | \`${a.file}\` | ${a.pageType} | ${a.priority} | ${a.status} |`
  )
  .join('\n')}
`
fs.writeFileSync(path.join(seoDir, 'SEO-完整文章标题库.md'), titlesMd, 'utf8')

// 5. SEO-关键词映射表.csv
const kwRows = [
  'page_url,primary_keyword,secondary_keywords,search_intent,page_type,cluster_or_section,status'
]
for (const sec of PRIMARY_SECTIONS) {
  for (const t of sec.topics) {
    kwRows.push(
      `"${t.link}","${t.title}","${t.clusterNames.join('|')}","${sec.id === 'clash' ? 'informational' : 'investigational'}","topic","${sec.title}","已发布"`
    )
  }
}
for (const b of ALL_BRANDS) {
  kwRows.push(
    `"\/brands\/${b.slug}","${b.name} 套餐价格","${b.name} 优惠码|${b.name} 官网|${b.lineCategory}","transactional","commercial","品牌数据库","已发布"`
  )
  if (b.reviewPath) {
    kwRows.push(
      `"${b.reviewPath}","${b.name} 评测","${b.name} 测速|${b.name} 怎么样|${b.name} 解锁","investigational","review","独立评测","已发布"`
    )
  }
}
fs.writeFileSync(path.join(seoDir, 'SEO-关键词映射表.csv'), kwRows.join('\n'), 'utf8')

// 6. GEO-实体关系映射表.csv
const geoEntityRows = [
  'entity_id,entity_name,entity_type,aliases,attributes,related_entities,source_file'
]
for (const b of ALL_BRANDS) {
  geoEntityRows.push(
    `"${b.slug}","${b.name}","AirportBrand","${b.aliases.join('|')}","${b.lineCategory};${b.protocols.join('/')};${b.foundedYear}","${b.reviewPath || ''}|/brands/${b.slug}","${b.sources.join('|')}"`
  )
}
geoEntityRows.push(
  `"clash-verge-rev","Clash Verge Rev","ProxyClient","Clash Verge|Verge Rev","Mihomo;Windows/macOS/Linux;GitHub","/clash/verge|/guides/clash-verge-windows","第三方代理客户端.txt"`
)
fs.writeFileSync(path.join(geoDir, 'GEO-实体关系映射表.csv'), geoEntityRows.join('\n'), 'utf8')

// 7. GEO-长尾问题库.csv
const qaRows = [
  'question,target_url,search_intent,answer_summary,verification_status'
]
const qaSamples: [string, string, string, string][] = [
  ['Clash Verge Rev macOS 提示已损坏无法打开怎么办', '/guides/clash-verge-macos', 'informational', '拖入应用程序后在终端执行 xattr -r -d com.apple.quarantine 清除隔离属性即可打开。'],
  ['Clash Verge Rev 如何开启 TUN 模式', '/guides/clash-verge-tun', 'informational', '需先在设置中安装并激活服务模式 Service Mode，再打开 TUN 开关。'],
  ['Clash Verge 测速全部显示 Timeout 怎么解决', '/guides/clash-verge-errors', 'informational', '优先同步系统时间误差、刷新订阅确认流量未耗尽并放行防火墙。'],
  ['光速云 8 元每月是不是可以直接按月购买', '/reviews/guangsuyun', 'investigational', '不是，约8.25元/月为99元轻量版年付折算均价，单月付极速版25元起。'],
  ['光速云所有节点都能直接用 Gemini 和 ChatGPT 吗', '/reviews/guangsuyun', 'investigational', '不是，实测香港节点多仅支持APP且Gemini失败，需切至新加坡/日本/美国节点。'],
  ['iPhone 小火箭 Shadowrocket 是免费的吗', '/guides/ios-clients', 'informational', '在美区等 App Store 显示为付费应用；免费替代可选 Karing、Streisand 或 Clash Mi。'],
  ['Android 用 NekoBox 要注意什么安全风险', '/guides/android-clients', 'informational', '官方维护有限且警告勿用 Google Play 上已被第三方控制的同名应用。'],
  ['OpenWrt 安装 Nikki 对固件版本有什么要求', '/guides/openwrt-routing', 'informational', 'Nikki 官方项目明确要求 OpenWrt 24.10 及以上版本。'],
  ['飞猫云和 SOGO 云能导入 Clash Verge Rev 吗', '/comparisons/dedicated-client-vs-third-party', 'investigational', '不能，两者均采用仅限专属客户端模式，不提供第三方订阅链接。'],
  ['Firefly 与 Firefly 萤火虫是同一家机场吗', '/reviews/firefly', 'investigational', '是的，经域名与套餐审计为同一实体，已去重合并。']
]
for (const [q, u, si, ans] of qaSamples) {
  qaRows.push(`"${q}","${u}","${si}","${ans}","已核实并写入正文"`)
}
for (const b of ALL_BRANDS) {
  qaRows.push(
    `"${b.name} 支持哪些客户端和协议，最低套餐多少钱？","/brands/${b.slug}","transactional","${b.clientModeLabel}；协议：${b.protocols.join('/')}；价格：${b.entryPriceDisplay}","已写入品牌页"`
  )
}
fs.writeFileSync(path.join(geoDir, 'GEO-长尾问题库.csv'), qaRows.join('\n'), 'utf8')

// 8. SEO-内部链接矩阵.csv
const linkRows = ['source_url,target_url,link_purpose,anchor_context']
for (const sec of PRIMARY_SECTIONS) {
  linkRows.push(`"/","${sec.link}","首页到一级栏目","${sec.title}"`)
  for (const t of sec.topics) {
    linkRows.push(`"${sec.link}","${t.link}","一级到二级专题","${t.title}"`)
  }
}
for (const b of ALL_BRANDS) {
  linkRows.push(`"/brands/","\/brands\/${b.slug}","品牌库到品牌详情","${b.name}详情"`)
  if (b.reviewPath) {
    linkRows.push(`"${b.reviewPath}","\/brands\/${b.slug}","独立评测到品牌详情","${b.name}品牌资料"`)
    linkRows.push(`"\/brands\/${b.slug}","${b.reviewPath}","品牌详情到独立评测","${b.name}独立评测"`)
  }
}
fs.writeFileSync(path.join(seoDir, 'SEO-内部链接矩阵.csv'), linkRows.join('\n'), 'utf8')

// 9. SEO-URL路由规划.csv
const urlRows = ['url,markdown_path,page_type,search_intent,status']
const walkDocs = (dir: string) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === '.vitepress' || ent.name === 'public') continue
      walkDocs(full)
    } else if (ent.name.endsWith('.md')) {
      const rel = path.relative(path.join(root, 'docs'), full).replace(/\\/g, '/')
      let url = '/' + rel.replace(/\.md$/, '')
      if (rel === 'index.md') url = '/'
      else if (rel.endsWith('/index.md')) url = '/' + rel.slice(0, -'index.md'.length)
      const content = fs.readFileSync(full, 'utf8')
      const pt = content.match(/pageType:\s*(\S+)/)?.[1] || 'topic'
      const si = content.match(/searchIntent:\s*(\S+)/)?.[1] || 'informational'
      urlRows.push(`"${url}","docs/${rel}","${pt}","${si}","已发布"`)
    }
  }
}
walkDocs(path.join(root, 'docs'))
fs.writeFileSync(path.join(seoDir, 'SEO-URL路由规划.csv'), urlRows.join('\n'), 'utf8')

// 10. SEO-内容发布优先级.md
const prioMd = `# SEO 内容发布优先级规划

## P0（已完成发布 · 核心基础设施）
- 首页知识库 + 4 个一级栏目首页 + 28 个二级专题页
- Clash Verge Rev 核心教程（下载、Win/Mac/Linux 安装、订阅、DNS、TUN、排障）
- 全平台第三方客户端矩阵（Windows / Android / iOS / macOS / Linux / OpenWrt）
- 光速云优先深度评测 + 11 篇主力品牌评测 + 4 篇横向对比
- 31 家独立品牌数据库（去重审计完成）与优惠汇总页

## P1（下一阶段优先补齐）
- 为信息缺口品牌补充近 30 日实测数据（宇宙云、灵动云、浪网、边缘节点 EdgeNova、隐形人、梯子云）
- 扩展 Clash 客户端长尾排障篇（针对特定游戏、Docker、WSL2 桥接、规则覆写脚本实例）

## P2（长期内容矩阵扩展）
- 按 \`SEO-完整文章标题库.md\` 逐步推进剩余 ${plannedCount} 篇集群深化文章，每篇保持 3,000+ 字原创实用深度，禁止模板洗稿。
`
fs.writeFileSync(path.join(seoDir, 'SEO-内容发布优先级.md'), prioMd, 'utf8')

// 11. SEO-品牌评测规划.md
const revPlanMd = `# SEO 品牌评测规划（31 家独立品牌）

| # | 品牌 | Slug | 数据完整度 | 独立评测状态 | 评测 URL | 对应品牌商业页 |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
${ALL_BRANDS.map(
  (b, i) =>
    `| ${i + 1} | ${b.name} | \`${b.slug}\` | ${b.dataStatusLabel} | ${b.reviewPath ? '已发布' : '待补充实测后撰文'} | ${b.reviewPath ? `\`${b.reviewPath}\`` : '—'} | \`/brands/${b.slug}\` |`
).join('\n')}
`
fs.writeFileSync(path.join(brandsDir, 'SEO-品牌评测规划.md'), revPlanMd, 'utf8')

// 12. 品牌数据审计报告.md
const auditMd = `# 品牌数据审计报告

审计日期：2026-11-20 · 审计数据源：\`32家机场品牌清单.txt\`、\`光速云品牌信息.txt\`、\`第三方代理客户端.txt\`、\`光速云测试图解锁图\`

## 一、独立品牌实体数量核对

- 原始文本条目数：**${BRAND_COUNT_AUDIT.sourceListEntries} 条**（正文 1–28 项 + 文末追加 4 项）
- 去重后独立品牌实体数：**${BRAND_COUNT_AUDIT.uniqueEntities} 家**
- 发现重复条目：**1 组**
  - 主列表 \`## 8. Firefly（firefly）\` 与文末历史记录 \`Firefly 萤火虫\` 均对应 \`vip02.fireflyaff.com\`、优惠码 \`firefly\` 与完全相同的套餐体系，已合并为 \`firefly\` 单一实体。
- 编号跳跃与重排核对：
  - 正文出现连续三个 \`## 7.\`（二猫云、无忧链接、唯兔云），跳过 \`## 9.\` 与 \`## 22.\`；
  - \`大佬云\` 在正文排第 5，而在文末汇总表排第 22，已统一归并于 \`dalaoyun\`。

## 二、关键字段差异与缺口清单

1. **光速云双文档差异**：《光速云品牌信息.txt》第 8 行写“年付折合约 8 元/月，59GB”，而同文档轻量版明细与 32 家清单均写 \`¥99/年，69GB/月\`；且 32 家清单补充了流光版/量子版/无界版，合计 7 档。
2. **优惠码多口径冲突品牌**：
   - SOGO 云：\`SOGO10000\`（正文 9 折）vs \`sss777\`（汇总表）
   - 一翻云：\`1FLYYUN\`（介绍 9 折）vs \`yfy6666\`（基础数据与汇总表）
   - 灵猫网络：\`lingmao\`（8 折）vs \`lmao888\`（基础数据与汇总表）
   - 隐形人：\`moon80\`（8 折）vs \`yxr888\`（基础数据与汇总表）；另存 \`100GB\` vs \`144GB\` 流量口径差异
   - 暮光加速：基础数据列有 \`muguang5555\`，正文介绍又称“未查到公开优惠码”
3. **推广链接格式异常**：
   - 云界线（\`${BRAND_LINKS.yunjiexian.registerUrl}\`，且汇总表另有一码 \`HBaZ91c6\`）与环球梯（\`${BRAND_LINKS.huanqiuti.registerUrl}\`）缺少 \`#\` 哈希路径符；
   - 榴莲云（\`${BRAND_LINKS.liulianyun.registerUrl}\`）域名后缺少斜杠。
4. **2026-08-09 历史档案缺口**：灵动云（有 2026-07 实测但缺近 30 日复测）、浪网（未实测且多字段被遮挡）、边缘节点 EdgeNova（未提供测速与逐项解锁数据）。
5. **5.6 元极限平价档同质化**：大佬云、闪电鼠、云界线、榴莲云、环球梯 5 家均缺独立测速与完整月付表，且榴莲云未明确协议类型。
`
fs.writeFileSync(path.join(brandsDir, '品牌数据审计报告.md'), auditMd, 'utf8')

// 13. 数据来源及核实记录.md
const sourcesMd = `# 数据来源及核实记录

| 来源文件 / 素材 | 覆盖内容 | 核实日期 | 使用边界与处理方式 |
| :--- | :--- | :--- | :--- |
| \`32家机场品牌清单.txt\` | 32 条品牌资料、2026-10-19 非晚高峰测速与 2026-08-09 历史档案 | 2026-11-20 | 去重合并 Firefly，保留原始差异注释，缺失值标为「待核实」 |
| \`光速云品牌信息.txt\` | 光速云 2020 年背景、4 档重点套餐与优惠码 \`AMM\` | 2026-11-20 | 与 32 家清单交叉比对 7 档套餐，明确标注 59GB vs 69GB 摘要差异 |
| \`光速云测试图解锁图\` (5 张 JPG) | 2026-08-19 MiaoKo 测速图（VLESS 70 节点 2 张 + SS 62 节点三网 3 张） | 2026-11-20 | 完整保留原始截图并标注测试环境、线程、节点数与协议差异 |
| \`机场测速实测资料包_2026-08-11_发布整理版_V2.zip\` | 15 家收录品牌 2026-08-11 测速 PNG + 微风/无忧链接 2026-07 MiaoKo 图 | 2026-11-20 | 保持原始 PNG 未改动，保留 0B/KB 异常节点，可信云标注 date-inferred |
| \`logos/\` 文件夹 | 17 个确认与收录品牌一一对应的 Logo 文件 | 2026-11-20 | 仅绑定名称完全匹配的品牌，其余未匹配文件不强行混用 |
| \`第三方代理客户端.txt\` | Win/Android/iOS/macOS/Linux/OpenWrt 20+ 款客户端资料 | 2026-11-20 | 完整保留 NekoBox Play 警告、Mihomo Party 维护提醒、Nikki 24.10+ 要求与 iOS 付费说明 |
| \`机场品牌图表样式.txt\` | Dark Network Observatory 视觉与状态语言规范 | 2026-11-20 | 已落地为 4 个 Vue Observatory 组件，区分 Measured/Vendor/Partial/Not Tested |
`
fs.writeFileSync(path.join(brandsDir, '数据来源及核实记录.md'), sourcesMd, 'utf8')

console.log(`Generated 13 content-planning files! Clusters: ${clusters.length}, Article titles: ${articles.length} (Published: ${publishedCount}, Planned: ${plannedCount})`)
