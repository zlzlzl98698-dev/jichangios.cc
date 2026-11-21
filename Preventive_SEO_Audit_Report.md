# Preventive_SEO_Audit_Report.md — 机场苹果 (jichangios.cc) 预防性 SEO 与 GEO 全站深度审计报告

**审计日期**：2026-11-21  
**审计对象**：`docs/.vitepress/dist/` 全量静态构建产物（共 116 个 HTML 文件，其中 115 个可索引业务页面 + 1 个 `404.html`）  
**审计角色视角**：搜索引擎爬虫工程师 / 风控算法分析师 / GEO 结构化工程师  
**执行纪律**：本阶段严格执行「只审计、不修改代码」，所有结论均基于实测 HTML DOM、JSON-LD 载荷与站点配置文件。

---

## 一、核心健康评分表（0–100 分）

| 审计维度 | 权重占比 | 得分 | 加权分 | 核心诊断说明 |
| :--- | :---: | :---: | :---: | :--- |
| **索引与抓取机制** | 25% | **96** | 24.00 | `robots.txt`、`sitemap.xml`（115 URL）、全站 115 页绝对 HTTPS Canonical 与 `404.html` `noindex` 全部 `PASS`；`0` 死链、`0` 空 href、`0` Soft 404；仅 `/brands/` 交互筛选视图略依赖水合 |
| **站群风控与合规** | 25% | **91** | 22.75 | 全部外链 `100%` 带有 `rel="nofollow sponsored noopener"`（`0` 条遗漏）；无共享追踪 ID；单独立域无跨站同源指纹，但 `/brands/` 下 31 个页面存在站内同构 H2 模板指纹 |
| **内容深度与 GEO** | 20% | **79** | 15.80 | 108/115 页含 `Answer-First`、111/115 页含 `<table>`、0 篇存在高频代词指代歧义；但 14 篇渲染态纯文本 `<2,000` 字（含 7 个栏目枢纽首页），且 31 个品牌页 H2 骨架高度雷同 |
| **E-E-A-T 与信任** | 15% | **74** | 11.10 | 测试日期、测速环境、历史口径差与缺口披露极透明且 `0` 虚假评分 Schema；**短板在于缺失独立「关于编辑部 / 评测方法论 / 免责与隐私政策」信任落地页**，作者实体无落地页锚点 |
| **Schema 与 SERP** | 15% | **56** | 8.40 | 全站 `0` 重复 `title/description`、`0` JSON 语法错；**重大隐患在于 77/110 个 `FAQPage` Schema 与页面可见 `<details>` DOM 不一致**（含 1 篇纯隐藏 FAQ Schema），且全部 115 页缺失 `og:image`、`twitter:card` 与导航 Logo `alt` |
| **综合总分** | **100%** | — | **82.1** | **整体底座扎实无 `nofollow` 致命违规，但 Schema-DOM 同步一致性（P0）与信任体系/OG 元数据（P1）亟需在放量收录前修复** |

---

## 二、分维度核查状态（PASS / 异常明细）

### 1. 爬虫抓取与索引预算审计（Crawl & Index）
- **`robots.txt` 规则校验**：`PASS`。文件 [robots.txt](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/public/robots.txt) 放行 `/`，屏蔽 `/404`，指向 `https://jichangios.cc/sitemap.xml`，未误拦 `.css` / `.js` / `/images/` / `/logos/` 静态资源。
- **XML Sitemap 校验**：`PASS`。`docs/.vitepress/dist/sitemap.xml` 共收录 `115` 条正式 `https://jichangios.cc/...` 规范地址，不含 `404`、不含非 HTTPS 域名、不含 `noindex` 草稿页。
- **Canonical 规范化矩阵**：`PASS`。对全站 115 个索引页面逐页校验，Canonical 缺失数为 `0`，路径不一致数为 `0`；目录首页统一保留尾部 `/`（如 `/airport/`），终端页统一无 `.html` 后缀（`cleanUrls: true`），[ _redirects ](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/public/_redirects) 未设置 SPA 首页回退规则，`404.html` 携带 `<meta name="robots" content="noindex, nofollow">`。
- **JS 渲染与死链检查**：`PASS`。`115` 页全部通过 VitePress 静态生成（SSR）输出完整正文 HTML；无 `<a>` 空 `href`（`0` 例）、无无效 `#` 占位导航、`0` 个站内死链、`0` 个 Soft 404（最短索引页渲染文本亦超过 `1,000` 字）。仅 `/brands/` 的动态条件筛选框需客户端 Vue 水合交互，但初始 DOM 已静态输出 `9,175` 字符的品牌与列表内容。

### 2. 站群风控与架构隔离审计（Risk Control）
- **外链 `nofollow` 连坐排查**：`PASS`。逐一扫描全站 `115` 个静态页面内全部外部 `http(s)://` `<a>` 链接（含 [RegistrationButton.vue](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/theme/components/RegistrationButton.vue) 与各类详情跳转），未带 `nofollow` 的外部商业外链数为 **`0`**（均规范包含 `rel="nofollow sponsored noopener"`）。
- **统计与追踪代码**：`PASS`。全站静态 HTML 未注入任何共用的 GA4、百度统计或 AdSense 代码（`0` 命中）。
- **代码/模板指纹特征**：**部分存在站内模板指纹（P1）**。站点为单一独立域名（不涉及跨站群互链），但 `/brands/*.html` 下全部 `31` 个商业详情页呈现高度雷同的二级标题（H2）结构指纹（详见 P1-1）。
- **服务器路径/内网 IP 检查**：`PASS`（仅在 [clash-verge-backup-migration.html](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/dist/articles/clash-verge-backup-migration.html)、[clash-verge-wsl2-docker-proxy.html](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/dist/articles/clash-verge-wsl2-docker-proxy.html) 等排障教程中存在教学示例路径 `C:\Users\用户名\.wslconfig` 与本地代理端示例 `127.0.0.1:7897` / `127.0.0.1:9090`，无真实构建机物理路径或后台内网 IP 泄漏）。

### 3. 内容质量与语义权威审计（E-E-A-T & GEO）
- **GEO 结构化布局**：`108/115` 页包含 `Answer-First` 首屏总结，`111/115` 页包含机器可读 `<table>` 数据表，`110/115` 页包含 `<details>/<summary>` 语义 FAQ；`0` 篇存在高频代词指代不清（`它/这家/该公司` 模糊指代实体全站检出数 `0`）。
- **数据溯源与真实性**：`PASS`。测速数据均标注 `2026-08-19`、`2026-08-11`、`2026-10-19` 等日期及测试机规格（珠海联通 `5Gbps`/`9Gbps`），对缺失测速与口径冲突直白披露；全站 `0` 条虚假 `AggregateRating` / `ratingValue` 星级评分。
- **短板发现**：缺少独立的 E-E-A-T 信任落地页（见 P1-2），7 个一级栏目首页与少量长尾页渲染正文仍低于 `2,000` 字（见 P1-3）。

### 4. 结构化数据与社交展现审计（Schema & SERP）
- **JSON-LD 语法校验**：`PASS`（全站 `WebSite` 1、`Organization` 1、`ItemList` 1、`BreadcrumbList` 114、`Article` 78、`TechArticle` 36、`SoftwareApplication` 5、`FAQPage` 110，JSON 解析错误 `0`）。
- **Meta 唯一性**：`PASS`（全站 `0` 组重复 `<title>`、`0` 组重复 `<meta name="description">`，`0` 标题关键词堆砌）。
- **严重隐患**：`77` 个页面的 `FAQPage` JSON-LD 与可见 DOM 不一致（其中 `1` 篇完全无可见 DOM 问答），`32` 个页面 `Article.headline` 与 `<h1>` 不一致，`115` 页缺少 `og:image`、`twitter:card` 及导航栏 Logo 图片 `alt` 文本。

---

## 三、漏洞与降权风险清单（按危险等级分级）

### 🚨 P0（致命/高危红线 — 建议立即修复）

#### P0-1：`articles/airport-peak-hour-testing-guide.html` 存在纯「隐藏 FAQ Schema」违规
- **证据定位**：
  - 构建产物 `docs/.vitepress/dist/articles/airport-peak-hour-testing-guide.html`（源码：[airport-peak-hour-testing-guide.md](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/articles/airport-peak-hour-testing-guide.md)）
  - JSON-LD 含 `FAQPage` 共 **4 条问题**（如 `为什么白天测速几百 Mbps 的机场，一到晚上 9 点刷网页依然转圈？`），但页面可见 DOM 中 **完全没有渲染 `<FAQSection>`（`<details>` 计数 = `0`）**。
- **影响算法机制**：直接触发 **Google 结构化数据垃圾内容政策（Hidden Structured Data / Irrelevant Schema Markup）**，轻则导致全站失去富媒体 FAQ 摘要展示资格，重则引发站级人工审查警告。
- **修复建议**：
  1. 在该文末尾补充对应的 `<FAQSection>` 组件渲染全部 4 条问题；
  2. 将 `FAQSection` 与 Frontmatter `faq` 收敛为**单一数据源**，或在 [validate-site.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/scripts/validate-site.ts) 中强制校验：`faq.length > 0` 时页面构建 DOM 必须100%匹配渲染同等文字的 `<details>`。

#### P0-2：其余 `76` 个页面存在 `FAQPage` Schema 与正文可见 FAQ 数量/文本不一致
- **证据定位**：在全站 `110` 个声明了 `FAQPage` Schema 的页面中，仅 `34` 篇做到了 100% 一致（主要是通过脚本同步生成的 31 个 `/brands/*.html` 等），其余 **`76` 篇均存在不同步**：
  - **条数不等（`42` 篇）**：如 [airport-annual-vs-monthly-math.html](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/dist/articles/airport-annual-vs-monthly-math.html)（Schema=4 题 vs DOM=3 题，且题干文本不同）、全部 `16` 篇近期扩容 `/reviews/*.html`（如 `/reviews/tiziyun` 等均为 Schema=4 题 vs DOM=3 题）、`/comparisons/` 4 篇横评（Schema=4 vs DOM=3）、[resources/faq.html](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/dist/resources/faq.html)（DOM=10 题 vs Schema 仅 4 题）、首页 [index.html](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/dist/index.html)（DOM 渲染了 4 个 `<details>` 却未输出 `FAQPage` Schema）。
  - **条数相等但文案偏差（`34` 篇）**：如 `/airport/index`、`/airport/cheap`、`/guides/clash-verge-windows` 等，Frontmatter `faq` 中的答案或提问文本与正文中 `<FAQSection :items="[...]" />` 写法不完全一致（例如 `/airport/index` 第 2、3 题题干不同）。
- **影响算法机制**：搜索引擎解析器会将 JSON-LD 中的文本与用户实际可见 DOM 做对齐比对；大规模 Schema 与正文错位会被识别为结构化数据不可信或欺骗性标记，同时削弱 GEO 对精准问答片段的抽取置信度。
- **修复建议**：
  - **架构级根治（推荐）**：改造 `<FAQSection>`，当不传 `:items` 或默认模式下**直接读取 `useData().frontmatter.value.faq`** 进行渲染！从此全站只需要在 Frontmatter `faq:` 维护一份权威数据，彻底消除任何二次维护错位风险。

---

### ⚠️ P1（高危隐患 — 建议本周内修复）

#### P1-1：`/brands/` 31 个商业品牌页存在明显的站内同构 H2 模板指纹
- **证据定位**：
  - 扫描 `docs/brands/`（除 `index.md` 外共 31 篇，源码生成器：[generate-brand-pages.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/scripts/generate-brand-pages.ts)）：
    - **23 个品牌页**拥有完全一致的 10 个二级标题 H2 序列：`品牌核实概览 | 套餐价格与计费周期 | 客户端兼容与接入实战指引 | 测速记录与流媒体 / AI 解锁状态 | 核心优势与客观限制 | 适合与不适合人群 | 数据审计与差异说明 | 同梯队与可替代品牌对比参考 | 购买前风险与注意事项 | 购买前高频问答（FAQ）`；
    - **8 个品牌页**（缺差异项）拥有完全一致的 9 个 H2 序列（如 `brands/edgenova.md`、`brands/feimao.md`）。
- **影响算法机制**：高度雷同的 DOM 骨架与固定的标题模板指纹，容易被搜索引擎 Helpful Content / Scaled Content 启发式检测识别为批量生成模式页，降低商业页群的长尾独立排名权重。
- **修复建议**：
  1. 在 `generate-brand-pages.ts` 中将静态通用 H2（如 `品牌核实概览`、`套餐价格与计费周期`）动态结合品牌实况（例如按协议/测速差异生成 `光速云 2026-08-19 三网实测与 VLESS 节点状态`、`神行加速 120GB 年付门槛与协议核查`）；
  2. 为缺乏数据的品牌页合并冗余空框架章节，根据品牌核心卖点或核心痛点差异化组织小节顺序。

#### P1-2：全站缺少独立 E-E-A-T 信任基建页面与作者实体验证锚点
- **证据定位**：
  - 检查 `docs/about*`、`docs/methodology*`、`docs/disclaimer*`、`docs/privacy*`，**全部缺失（`0` 个页面）**；
  - [config.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/config.ts#L139-L147) 中全部 `Article`/`TechArticle` 的 `author` 仅为 `{ "@type": "Organization", "name": "机场苹果编辑部" }`，没有提供可抓取的 `url` 指向编辑部/测试实验室介绍页，页脚亦无独立的《免责与商业披露政策》《测速方法论》《隐私说明》链接。
- **影响算法机制**：网络代理与软件下载工具属于**准 YMYL（安全/交易决策敏感）领域**。Google Quality Rater Guidelines 与核心更新高度重视**第一手实测证明（Experience）与作者/机构可追溯性（Trustworthiness）**，缺少独立权威信任页会限制首页及评测页获取顶级 E-E-A-T 评分。
- **修复建议**：
  - 新增并纳入页脚/主导航链接的 3 个信任基建页面：
    1. `/about`（编辑部背景、维护者署名机制、联系与纠错渠道）；
    2. `/methodology`（详述 MiaoKo / MAI-TEST-BOT 测试机规格、curl TTFB 测试标准、商业利益分离政策）；
    3. `/privacy-and-disclaimer`（合规声明、Affiliate 佣金中立原则及无广告追踪承诺）；
  - 在 `config.ts` JSON-LD `Article.author` 与 `Organization` 中补充 `url: 'https://jichangios.cc/about'` 及 `sameAs` 锚点。

#### P1-3：`115` 个索引页面全部缺失 `og:image` 与 `twitter:card` 元标签
- **证据定位**：
  - 查看 [config.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/config.ts#L58-L65)，`transformHead` 仅生成了 `og:title`、`og:description`、`og:url`、`og:type`，全站 `115` 个构建页面 **`og:image` = `0`、`twitter:card` = `0`**。
- **影响算法机制**：影响 Google Discover 卡片抓图、SERP 富摘要配图选择、Perplexity/ChatGPT 搜索结果卡片图标展现以及 X/Telegram/微信分享卡片视觉展现率（CTR）。
- **修复建议**：
  - 为站点制作一张 1200×630 标准默认分享封面图（如 `/images/og-cover.png`），在 `transformHead` 中全站兜底输出 `og:image` + `twitter:card: summary_large_image`；对拥有实测图截图的评测页优先提取对应第一张实测截图作为页面专属 `og:image`。

#### P1-4：`31` 个品牌页及部分文章页的 JSON-LD `Article.headline` 与可见 `<h1>` 标题不一致
- **证据定位**：如 `/brands/dalaoyun.html`（共 `31` 个品牌页及 `/articles/clash-verge-port-conflict-recovery.html`、`brands/index.html` 等共计 `32` 页）：
  - JSON-LD `headline`：`"大佬云 官网套餐、价格、线路与评测资料（2026）"`；
  - 页面主标题 `<h1>`：`大佬云（套餐价格与核实资料）`。
- **影响算法机制**：`Article` Schema 中的 `headline` 应与页面主视觉 `<h1>` 语义高度一致；若长期分离容易影响 SERP 标题改写一致性。
- **修复建议**：在 [generate-brand-pages.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/scripts/generate-brand-pages.ts) 与 `config.ts` 中对齐页面 `<h1>` 与 `headline`（或让 `transformHead` 使用明确的一级标题属性，且与页面 H1 统一）。

#### P1-5：少量页面渲染后有效文本 `< 2,000` 字（含 7 个一级栏目首页与 3 篇专题页）
- **证据定位**：对 `dist/*.html` 主体纯文本去空白实测，共有 `14` 个页面低于 `2,000` 字符（除导航枢纽外包含）：
  - `/clash/index.html`（`1,047` 字符，且缺少对照 `<table>` 与 `<details>` FAQ）、`/resources/index.html`（`1,066` 字符）、`/offers/index.html`（`1,264` 字符）、`/vpn/index.html`（`1,345` 字符）、`/comparisons/index.html`（`1,351` 字符）、`/airport/index.html`（`1,391` 字符）、`/reviews/index.html`（`1,435` 字符）；
  - 内容页边界：`resources/free-nodes.html`（`1,792`）、`resources/risk-alerts.html`（`1,850`）、`articles/airport-annual-vs-monthly-math.html`（`1,851`）、`articles/android-nekobox-security-and-alternatives.html`（`1,908`）、`articles/airport-peak-hour-testing-guide.html`（`1,960`）。
- **修复建议**：重点补充 `/clash/index.md`（添加软件对照表与 FAQ）、`/offers/index.md` 与 `/reviews/index.md`（补充评价维度与总表），并把 `resources/free-nodes`、`risk-alerts` 等边缘页面扩充至 `2,400+` 渲染字符。

---

### 🟡 P2（优化机会 — 纳入规划持续优化）

#### P2-1：全站 `115` 页顶部导航栏 Logo `<img>` 的 `alt` 属性为空
- **证据定位**：构建 HTML 中全站共检出 `115` 次 `<img class="VPImage logo" src="/images/site-avatar.webp" alt data-v-8426fc1a>`（`alt=""` 为空）。原因在于 [config.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/config.ts#L174) 中 `themeConfig.logo` 传的是纯字符串 `'/images/site-avatar.webp'`，未传带 `alt` 的对象。
- **修复建议**：将 `themeConfig.logo` 改为 `{ src: '/images/site-avatar.webp', alt: '机场苹果知识库头像' }`，即可一处改动消除全站 `115` 个无 `alt` 图片告警。

#### P2-2：个别标题混用英文半角括号 `()` 与中文全角括号 `（）`
- **证据定位**：`docs/articles/clash-verge-rule-provider.html`（标题同时出现 `(.mrs)` 与 `（2026）`）、`docs/clash/meta.html`（`Clash Meta (Mihomo) ... （2026）`）。属轻度排版规范瑕疵。
- **修复建议**：将标题中技术副词括号统一或省略外层 `(2026)` 年份重复，提升 SERP 视觉一致性。

#### P2-3：首页 `index.html` 与 `/clash/index.html` 缺少机器友好的 `<table>` 与 `FAQPage` Schema
- **证据定位**：首页 `index.html` 在 `HomeKnowledgeBase.vue` 中渲染了 `4` 个 `<details>` 问答却未通过 Frontmatter 注入 `FAQPage` Schema；且首页与 `/clash/index.html` 内均无 `<table>` 对比块。
- **修复建议**：为首页注入与 4 个 `<details>` 完全一致的 `FAQPage`（或放入 `/about` + `index.md` frontmatter），并在 `/clash/index.md` 增加 5 大主流客户端系统对照表与常见 FAQ。

#### P2-4：`/brands/` 品牌列表页与评测图库的客户端交互可增加静态锚点强化
- **证据定位**：`/brands/index.html` 虽已 SSR 渲染完整列表（`9,175` 字符），但交互筛选状态（如 `?mode=third_party`）目前不会生成独立可索引的高意图聚合 URL。
- **修复建议**：保持现有 `/brands/` 主数据库不动，未来可增补少量高意图静态聚合专题（或通过现有 `/comparisons/dedicated-client-vs-third-party` 承接内链流量）。

---

## 四、终极改造行动 SOP（Top 5 按投入产出比 ROI 排序）

| 优先级 | 行动项目 | 预期 ROI 与解决核心风险 | 涉及文件 | 预估工作量 |
| :---: | :--- | :--- | :--- | :---: |
| **Top 1** | **建立 FAQ 单一数据源机制，100% 消灭「隐藏/错位 FAQ Schema」** | **极高 ROI**：1 次组件改造 + 同步修正 77 页问答数据，彻底消除 Google 隐藏 Schema 降权红线，并补全 `validate-site.ts` 自动防回归拦截 | `FAQSection.vue`、`validate-site.ts`、同步相关 `.md` | 1–2 小时 |
| **Top 2** | **全站补全 `og:image`、`twitter:card` 与导航 Logo `alt` 文本** | **高 ROI**：仅需改动 1 处配置与 1 张封面图，立即修复全站 `115` 页社交卡片无图及图片空 `alt` 缺陷 | `docs/.vitepress/config.ts`、新建 `docs/public/images/og-cover.png` | 20 分钟 |
| **Top 3** | **新建 E-E-A-T 信任基建三页面并绑定 `Article.author` URL** | **高 ROI**：补齐准 YMYL 评测站的编辑部身份、实测实验室方法论与隐私/披露政策，大幅提升品牌与评测权威性评分 | 新建 `/about`、`/methodology`、`/privacy-and-disclaimer`；更新 `config.ts` 页脚与 Schema | 45 分钟 |
| **Top 4** | **打破 `/brands/` 31 个品牌页 H2 模板指纹并统一 `headline` 与 `<h1>`** | **中高 ROI**：升级 `generate-brand-pages.ts`，让 31 个商业页拥有差异化 H2 标题（绑定品牌名、协议与实测状态），消除站内高度雷同结构特征 | `scripts/generate-brand-pages.ts` | 40 分钟 |
| **Top 5** | **补厚 `/clash/index`、`/offers/index`、`/reviews/index` 与边缘 `<2,000` 字页面** | **中 ROI**：将全部 14 个渲染态偏短页面拉升至 `2,200+` 字符，并为 `/clash/index` 补充客户端速查 `<table>` 与 FAQ | `docs/clash/index.md`、`docs/offers/index.md`、`docs/reviews/index.md` 等 | 45 分钟 |
