# PROGRESS.md — 机场苹果 (jichangios.cc) 建站进度与验收记录

最近更新：2026-11-21（第五阶段：预防性 SEO / GEO 全站审计与 Top 1–Top 5 全面修复落地）

## 1. 工程与域名基线

- **工作区路径**：`c:\Users\Pro User\Desktop\jichangios.cc`
- **正式生产域名**：`https://jichangios.cc`
- **网站名称 / 语言**：机场苹果 / `zh-CN`
- **技术栈**：VitePress `1.6.4` + Vue `3.5.22` + TypeScript `5.8.3` + VitePress Local Search（保留 Algolia 环境变量接入开关）+ Cloudflare Pages 静态输出

## 2. 已完成建设清单（截至 2026-11-21 第五轮验收）

### 2.1 SEO / GEO 预防性审计与全项修复（Top 1–Top 5 全部闭环）
- **FAQ Schema 与 DOM 单一数据源（P0 彻底清零）**：改造 [FAQSection.vue](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/theme/components/FAQSection.vue) 默认直接消费 `frontmatter.faq`（多组拆分页面支持 `customOnly` 同步），为 [airport-peak-hour-testing-guide.md](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/articles/airport-peak-hour-testing-guide.md) 补全 `<FAQSection />` 并同步首页/FAQ 总览，全站 `117` 个 `FAQPage` Schema 与可见 DOM 实现 `0` 隐藏、`0` 数量偏差；并在 [validate-site.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/scripts/validate-site.ts) 内置强制拦截校验。
- **Open Graph / Twitter Card / Logo Alt 补全**：生成 `1200×630` 封面图 [og-cover.png](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/public/images/og-cover.png)，在 [config.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/config.ts) 为全站 `118` 个可索引页面补充 `og:image` 与 `twitter:card`，同时将 `themeConfig.logo` 转为对象配置以消除全站空 `alt` 图片。
- **E-E-A-T 信任基建落地**：新增 [about.md](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/about.md)、[methodology.md](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/methodology.md) 与 [privacy-and-disclaimer.md](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/privacy-and-disclaimer.md)，挂接至全局页脚及 JSON-LD `Article.author.url` / `publisher.logo`。
- **解除 `/brands/` 模板指纹与对齐 `headline`**：升级 [generate-brand-pages.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/scripts/generate-brand-pages.ts) 生成 31 家差异化 H2 标题结构并使页面 `<h1>` 与 JSON-LD `Article.headline` 完全对齐。
- **枢纽页补厚与标点规范**：补充 `/clash/` 对照表与 FAQ、扩容 `/offers/`、`/reviews/`、`/resources/free-nodes`、`/resources/risk-alerts`，修复标点混用。
- **最新验收指标**：`npm run typecheck` 通过、`npm run validate:site` 通过（`118` 篇可索引页面、0 errors / 0 warnings）、`npm run docs:build` 通过（`7.84s`）。

### 2.2 全站内容零薄页深度升级（此前第四轮已全部完成）
- **新增通用架构可视化组件**：[ProxyArchitectureDiagram.vue](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/.vitepress/theme/components/ProxyArchitectureDiagram.vue)，在系统代理 vs TUN、Windows Service Mode、Fake-IP vs Redir-Host、OpenWrt 旁路由、通用订阅 vs 专属端指南中提供响应式架构流程图。
- **`/guides/` 12 篇客户端教程全量扩容**：Markdown 正文均升至 `2,995–6,057` 字（均值 `3,921` 字），统一补齐架构对比图、PowerShell/Terminal 自检命令、可复制 YAML 模板、TroubleshootingGuide 报错矩阵与 FAQ。
- **`/articles/` 14 篇实战长尾文全量扩容**：正文升至 `2,576–4,634` 字（均值 `3,111` 字），涵盖 SHA-256 校验脚本、7897 端口/系统代理强制清理命令、WSL2 Mirrored 与 Docker systemd 代理、Script AI 专组覆写及晚高峰 TTFB 实测法。
- **`/reviews/`（16 篇短评测）+ `/comparisons/`（5 篇横评）全量补厚**：在不虚构任何测速与价格的前提下，`reviews/` 均提升至 `1,908–3,096` 字（均值 `2,153` 字），`comparisons/` 全部提升至 `2,108–2,968` 字（均值 `2,587` 字），补充场景适配表、单价精算、同梯队对比与缺口/自述标注。
- **`/brands/` 31 个品牌页去模板化生成**：升级 [generate-brand-pages.ts](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/scripts/generate-brand-pages.ts) 并重建全部 31 个品牌详情页（正文均达 `2,385–3,837` 字，均值 `2,773` 字），按各自协议与客户端模式定制接入指引、同梯队对比表与购买前 4 问 FAQ。
- **三大枢纽首页补厚**：`airport/index.md`、`vpn/index.md`、`resources/index.md` 均扩展至 `2,400–2,900+` 字（含路线匹配矩阵与 FAQ）。

### 2.2 站点头像、Favicon 与此前基础设施
- **站点头像与全套 Favicon 替换**：已更换圆形柴犬头像 [site-avatar.webp](file:///c:/Users/Pro%20User/Desktop/jichangios.cc/docs/public/images/site-avatar.webp) 及 `favicon.png` / `favicon.ico` / `favicon.svg`（带 `?v=2` 缓存刷新参数），同步更新导航栏、首页 Hero 及 JSON-LD `Organization.logo`。
- **实测图包、CI 与搜索**：已整合 18 张 `2026-08-11` 原图与 5 张 `2026-08-19` 光速云原图；保留 Cloudflare Pages 工作流、`_headers`、`_redirects` 与 `robots.txt`。

### 2.3 最新构建与校验数据
- **已发布可索引 Markdown 页面**：`115` 页（另含 `404.md` 共 `116` 个 HTML 文件）
  - `tutorial`：**36** 篇 · `review`：**18** 篇 · `comparison`：**8** 篇 · `commercial`：**33** 篇 · `topic`：**20** 篇
- `npm run typecheck`：通过（0 errors）
- `npm run validate:site`：通过（115 篇可索引页面、31 家品牌实体、0 warnings、0 errors）
- `npm run docs:build`：通过（7.16s）

## 3. 仍需外部凭据 / 后续推进项

1. **GitHub 推仓与 Cloudflare Pages 远程绑定**：需在本地关联你的 GitHub 仓库并配置 `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`。
2. **Algolia DocSearch 凭证**：配置 `VITE_ALGOLIA_*` 后即可由 Local Search 切换至 Algolia。
3. **其余 417 篇 P1/P2 长尾规划与 5.6 元组/浪网/EdgeNova 补测**：待后续按内容矩阵排期继续撰写与补充近 30 日实测。
