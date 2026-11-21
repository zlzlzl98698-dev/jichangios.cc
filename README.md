<div align="center">
  <img src="./docs/public/images/site-avatar.webp" alt="机场苹果 (jichangios.cc) 头像" width="96" height="96" style="border-radius: 50%;" />

  # 机场苹果 · jichangios.cc

  **简体中文网络工具知识库 · Clash 客户端教程中心 · 独立品牌评测与套餐数据库**

  [![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
  [![Vue 3](https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Pages](https://img.shields.io/badge/Indexable%20Pages-118-2563EB?style=flat-square)](https://jichangios.cc/sitemap.xml)
  [![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=flat-square&logo=cloudflarepages&logoColor=white)](https://pages.cloudflare.com/)

  [官方网站 `jichangios.cc`](https://jichangios.cc/) · [项目进度 `PROGRESS.md`](./PROGRESS.md) · [SEO/GEO 审计报告](./Preventive_SEO_Audit_Report.md)
</div>

---

## 项目简介

**机场苹果 (`jichangios.cc`)** 是面向简体中文用户构建的静态网络知识库与品牌数据平台，聚焦三个核心价值：

1. **纯净开源客户端教程中心**：围绕 `Clash Verge Rev`（Mihomo 内核）、`v2rayN`、`FlClash`、`Shadowrocket`、`OpenWrt`（OpenClash / PassWall2 / Nikki / HomeProxy）提供从安装包校验、服务模式授权、DNS/Fake-IP 分流到终端排障命令的完整指南。
2. **证据可溯源的独立评测与横评**：坚持区分 **实测原图 (`Measured`)**、**部分基准 (`Partial`)**、**厂商自述 (`Vendor Claimed`)** 与 **历史快照 (`Historical`)**，如实标注 `0B` 失效节点、地区解锁限制及年付折算与真实月付价差异，绝不虚构测速数字。
3. **全站 SEO / GEO 工程化就绪**：全部 118 个业务页面均为静态预渲染 HTML，内置单一数据源 `FAQPage`、`CollectionPage` / `TechArticle` / `WebPage` / `BreadcrumbList` 结构化数据，原生适配 Google、Bing、神马（`yisouspider`）与百度（`Baiduspider`）抓取。

---

## B 方案三分区架构（内容与商业分离）

| 分区体系 | 搜索意图 | 覆盖路由 | 商业化与安全规范 |
| :--- | :--- | :--- | :--- |
| **教程知识区** | Informational | `/clash/`、`/guides/`、`/articles/`、`/resources/`、`/vpn/`、`/airport/` | **零购买横幅、零悬浮 CTA**，专注解决实际技术问题；配备 `Answer-First`、可复制命令与排障卡片 |
| **独立评测区** | Investigational | `/reviews/`、`/comparisons/` | 明确披露数据采集时间、测试环境与缺口，页面顶部独立展示合作披露，排序不与推广绑定 |
| **品牌商业区** | Transactional | `/brands/`、`/brands/{slug}`、`/offers/` | 由 `docs/.vitepress/data/brands/` 与 `links.ts` 集中驱动，全部外部推广链接强制带 `rel="nofollow sponsored noopener"` |
| **E-E-A-T 信任基建** | Trust / Policy | `/about`、`/methodology`、`/privacy-and-disclaimer` | 公开编辑部职责、测试机环境标准、零第三方追踪声明与页脚全站直达 |

---

## 站点规模与技术特性

- **静态页面矩阵**：共 **119 个构建 HTML 文件**（`118` 篇可索引内容页 + 独立 `404.html`），零薄内容（全站业务正文 `>= 1,800` 字）
  - 4 大一级导航枢纽（`/airport/`、`/vpn/`、`/clash/`、`/resources/`）+ **28 个二级专题** + **56 个三级长尾集群 (`C01–C56`)**
  - **12 篇**全平台客户端实战教程（`/guides/`）+ **14 篇**进阶工程长文（`/articles/`）
  - **18 篇**独立品牌评测与综述（`/reviews/`）+ **5 篇**同维横向对比（`/comparisons/`）
  - **31 家**去重后独立品牌详情页（`/brands/<slug>`）+ 交互式多维条件筛选器（`/brands/`）+ 优惠汇总（`/offers/`）
- **交互组件库**：内置 `ProxyArchitectureDiagram`、`BrandDatabaseExplorer`、`NetworkPerformanceReport`、`StreamingAvailabilityMatrix`、`FAQSection`（直连 Frontmatter `faq:` 单一权威源，彻底杜绝隐藏 Schema）等 26 个 Vue 3 主题组件
- **全站检索双引擎**：配置 `VITE_ALGOLIA_*` 自动启用 **Algolia DocSearch**；未配置外部凭证时自动回退 **VitePress Local Search** 离线简体中文全文检索

---

## 目录结构

```text
jichangios.cc/
├── .github/workflows/             # Cloudflare Pages 自动校验与构建工作流
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts              # 站点配置、Clean URLs、Sitemap、OG/Twitter Meta 与 JSON-LD Schema
│   │   ├── data/                  # 31 家品牌结构化数据、链接库、导航面包屑与 C01–C56 集群字典
│   │   └── theme/                 # 自定义布局 Layout.vue、CSS Variables 与 26 个 Vue 3 组件
│   ├── public/                    # favicon.{png,ico,svg}、og-cover.png、robots.txt、_headers、_redirects
│   ├── airport/  vpn/  clash/  resources/   # 四大知识栏目（含 28 个二级专题）
│   ├── guides/   articles/                  # 12 篇客户端安装排障教程 + 14 篇高阶长文
│   ├── reviews/  comparisons/               # 18 篇独立评测 + 5 篇横向对比
│   ├── brands/   offers/                    # 31 个品牌页（脚本确定性生成）+ 品牌筛选库 + 优惠汇总
│   ├── about.md  methodology.md  privacy-and-disclaimer.md   # E-E-A-T 信任基建页面
│   └── index.md                             # 知识库定制首页
├── scripts/
│   ├── generate-brand-pages.ts    # 31 家品牌页面生成脚本（差异化 H2 骨架 + FAQ 同步）
│   └── validate-site.ts           # 自动化巡检：路由、CTA 隔离、外链 nofollow、隐藏 FAQ 阻断
├── content-planning/              # 内容矩阵规划与数据审计归档
├── Preventive_SEO_Audit_Report.md # 预防性 SEO & GEO 全站深度审计报告
├── PROGRESS.md                    # 多阶段建站与验收记录
├── wrangler.toml                  # Cloudflare Pages 部署配置
└── package.json
```

---

## 本地开发与全站校验命令

需要 **Node.js `>= 20`**（推荐 Node 22 LTS）：

```bash
# 1. 安装依赖
npm install

# 2. 启动本地热更新开发预览
npm run docs:dev

# 3. 执行 TypeScript 类型检查 + 全站 SEO/合规门禁校验
npm run typecheck
npm run validate:site

# 4. 生成/更新 31 个品牌详情页（修改品牌库后运行）
npx tsx scripts/generate-brand-pages.ts

# 5. 构建生产静态产物（输出至 docs/.vitepress/dist）与本地预览
npm run docs:build
npm run docs:preview
```

> `npm run validate:site` 会自动校验全站路由唯一性、教程区零商业 CTA、外部推广链接 `nofollow sponsored noopener` 属性、`robots.txt` / `_headers` / `_redirects` 完整性以及 `frontmatter.faq` 与 `<FAQSection />` 一致性。

---

## 环境变量与站长验证配置

复制 `.env.example` 为 `.env`（或直接在 Cloudflare Pages / GitHub Actions Secrets 中配置以下可选变量，**所有 HTML 验证标签均在构建期直出至静态源码 `<head>`**）：

| 变量名 | 用途说明 | 对应平台 / 输出标签 |
| :--- | :--- | :--- |
| `VITE_ALGOLIA_APP_ID` / `API_KEY` / `INDEX_NAME` | 启用 Algolia DocSearch（仅填 Search-Only Key） | 留空自动启用本地中文全文检索 |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console 所有权验证 | `<meta name="google-site-verification" ...>` |
| `VITE_BING_SITE_VERIFICATION` | Bing Webmaster Tools 验证 | `<meta name="msvalidate.01" ...>` |
| `VITE_SHENMA_SITE_VERIFICATION` | 神马站长平台验证 | `<meta name="shenma-site-verification" ...>` |
| `VITE_BAIDU_SITE_VERIFICATION` | 百度搜索资源平台验证 | `<meta name="baidu-site-verification" ...>` |

---

## Cloudflare Pages 部署说明

- **构建命令（Build command）**：`npm run docs:build`
- **构建输出目录（Build output directory）**：`docs/.vitepress/dist`
- **生产规范域**：`https://jichangios.cc/`
- **推荐 DNS / 重定向补充**：若在 Cloudflare 同时绑定了 `www.jichangios.cc`，建议配置 Redirect Rule 将 `https://www.jichangios.cc/*` 301 重定向至 `https://jichangios.cc/$1`，并在安全规则中确保不针对 `Googlebot` / `bingbot` / `Baiduspider` / `yisouspider` 触发质询拦截。
- **GitHub Actions 自动发布**：见 [deploy-cloudflare-pages.yml](./.github/workflows/deploy-cloudflare-pages.yml)，需在仓库 Secrets 配置 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID`。
