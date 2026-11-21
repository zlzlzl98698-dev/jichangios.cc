<script setup lang="ts">
import { PRIMARY_SECTIONS } from '../../data/navigation'
import { ALL_BRANDS } from '../../data/brands'
import { PROXY_CLIENTS } from '../../data/clients'
import FAQSection from './FAQSection.vue'

function openSiteSearch() {
  const btn = document.querySelector<HTMLButtonElement>('.VPNavBarSearch button, #local-search-button')
  if (btn) btn.click()
}

const learningPath = [
  { step: '01', title: '了解 Clash Verge Rev', link: '/clash/verge', desc: '认识 Mihomo 内核与客户端基础架构' },
  { step: '02', title: '官方安全下载', link: '/clash/verge-download', desc: '区分 GitHub 官方渠道与芯片架构' },
  { step: '03', title: '系统安装部署', link: '/guides/clash-verge-windows', desc: 'Windows / macOS / Linux 安装与权限' },
  { step: '04', title: '导入与更新订阅', link: '/guides/clash-verge-subscription-setup', desc: '配置订阅链接、定时刷新与策略组' },
  { step: '05', title: 'DNS 与 TUN 模式', link: '/guides/clash-verge-dns', desc: '解决分流污染与终端接管问题' },
  { step: '06', title: '故障排查手册', link: '/guides/clash-verge-errors', desc: '节点超时、无法连接与端口冲突定位' }
]

const coreTutorials = [
  { title: 'Clash Verge Rev Windows 安装教程', link: '/guides/clash-verge-windows', tag: 'Windows' },
  { title: 'Clash Verge Rev macOS 安装（M系/Intel）', link: '/guides/clash-verge-macos', tag: 'macOS' },
  { title: 'Clash Verge Rev 订阅导入与更新设置', link: '/guides/clash-verge-subscription-setup', tag: '订阅配置' },
  { title: 'Clash Verge Rev DNS 与 Fake-IP 详解', link: '/guides/clash-verge-dns', tag: 'DNS 分流' },
  { title: 'Clash Verge Rev TUN 模式开启与冲突排查', link: '/guides/clash-verge-tun', tag: 'TUN 模式' },
  { title: '节点超时、无法连接与报错排查指南', link: '/guides/clash-verge-errors', tag: '故障排查' }
]

const featuredReviews = [
  { title: '光速云深度独立评测', link: '/reviews/guangsuyun', note: '含 2026-08-19 MiaoKo 70 节点与三网测试图解析' },
  { title: '暮光加速评测', link: '/reviews/muguang', note: 'BGP 智能调度与多平台并发能力核实' },
  { title: '飞猫云评测', link: '/reviews/feimao', note: '专属客户端零配置入门体验与限制分析' },
  { title: 'Firefly 萤火虫评测', link: '/reviews/firefly', note: 'IPLC 原生 IP 定位与重复档案合并说明' },
  { title: '一翻云评测', link: '/reviews/yifan', note: 'Hysteria 2 / VLESS-Reality / SS 三协议实测' },
  { title: '灵动云历史实测解析', link: '/reviews/lingdongyun', note: '2026-07 珠海联通 9Gbps 实测与送中/TikTok 问题分析' }
]

const homeFaqs = [
  {
    q: '机场苹果 (jichangios.cc) 的教程区、评测区和品牌库有什么区别？',
    a: '教程区专注 Clash Verge Rev、多平台客户端与网络排障，默认不注入商业购买按钮；评测区提供可核查的实测数据与资料缺口说明；品牌数据库（/brands/）集中汇总 31 家独立品牌套餐、协议和已披露的推广入口。'
  },
  {
    q: '新手应该先选通用客户端（如 Clash Verge Rev）还是机场专属客户端？',
    a: '如果您需要跨多设备统一管理、自定义规则分流或在 OpenWrt 软路由使用，建议优先选择提供标准订阅链接并兼容 Clash Verge Rev / Shadowrocket 的服务；如果追求极简免配置，可了解支持专属客户端的品牌，但需留意设备兼容性限制。'
  },
  {
    q: '为什么部分品牌页面显示“年付折合 ¥5.6/月”，而不是真实月付价格？',
    a: '本站严格区分“真实单月付价”与“年付折算均价”。年付套餐需要一次性预付全年费用，不等于每月可按该单价随时月付，所有套餐表格均标明实际计费周期。'
  },
  {
    q: '当前全站搜索如何工作？是否支持无密钥离线检索？',
    a: '当配置 Algolia DocSearch 凭证时自动启用 Algolia 全文索引；当前未注入外部凭证，站点已启用 VitePress Local Search 静态中文全文搜索，点击顶部搜索框或按 Ctrl+K 即可直接检索全站教程与品牌。'
  }
]
</script>

<template>
  <div class="kb-home">
    <!-- Hero + Search -->
    <section class="kh-hero">
      <div class="kh-hero-inner">
        <div class="kh-brand-row">
          <img
            src="/images/site-avatar.webp"
            alt="机场苹果头像"
            class="kh-avatar"
            width="40"
            height="40"
          />
          <div class="kh-eyebrow">机场苹果 · jichangios.cc · 简体中文专业知识库</div>
        </div>
        <h1 class="kh-h1">Clash 客户端教程中心 · 独立评测与品牌数据库</h1>
        <p class="kh-lead">
          系统化梳理 Clash Verge Rev 安装、订阅导入、DNS/TUN 排障与全平台客户端指南，并提供基于核实记录的
          {{ ALL_BRANDS.length }} 家独立机场品牌参数与测试观察。
        </p>
        <div class="kh-actions">
          <button type="button" class="kb-btn-primary" @click="openSiteSearch">
            搜索教程、报错或品牌（Ctrl+K）
          </button>
          <a href="/clash/verge" class="kb-btn-secondary">从 Clash Verge Rev 入门</a>
          <a href="/brands/" class="kb-btn-secondary">浏览 {{ ALL_BRANDS.length }} 家品牌库</a>
        </div>
      </div>
    </section>

    <!-- 4 Primary Topics -->
    <section class="kh-section">
      <div class="kh-sec-head">
        <h2>四大核心知识主题</h2>
        <span>4 个一级栏目 · 28 个专题 · 三级集群架构</span>
      </div>
      <div class="kh-grid-4">
        <div v-for="sec in PRIMARY_SECTIONS" :key="sec.id" class="kh-hub-card">
          <h3><a :href="sec.link">{{ sec.title }}</a></h3>
          <p>{{ sec.description }}</p>
          <ul class="kh-topic-links">
            <li v-for="t in sec.topics" :key="t.link">
              <a :href="t.link">{{ t.title }}</a>
            </li>
          </ul>
          <a :href="sec.link" class="kh-more">进入{{ sec.title }} →</a>
        </div>
      </div>
    </section>

    <!-- Clash Verge Learning Path -->
    <section class="kh-section kh-section--alt">
      <div class="kh-sec-head">
        <h2>Clash Verge Rev 新手学习路径</h2>
        <a href="/clash/">查看全部 Clash 教程 →</a>
      </div>
      <div class="kh-path-grid">
        <a v-for="item in learningPath" :key="item.step" :href="item.link" class="kb-card kh-path-card">
          <span class="kh-step">{{ item.step }}</span>
          <div class="kh-path-title">{{ item.title }}</div>
          <p class="kh-path-desc">{{ item.desc }}</p>
        </a>
      </div>
    </section>

    <!-- Featured Tutorials & Troubleshooting -->
    <section class="kh-section">
      <div class="kh-sec-head">
        <h2>精选安装教程与故障排查</h2>
        <a href="/clash/troubleshooting">进入故障排查总览 →</a>
      </div>
      <div class="kb-card-grid">
        <a v-for="tut in coreTutorials" :key="tut.link" :href="tut.link" class="kb-card kh-link-card">
          <span class="kb-badge kb-badge--tutorial">{{ tut.tag }}</span>
          <div class="kh-card-title">{{ tut.title }}</div>
        </a>
      </div>
    </section>

    <!-- Client Library Preview -->
    <section class="kh-section kh-section--alt">
      <div class="kh-sec-head">
        <h2>全平台客户端知识库（已收录 {{ PROXY_CLIENTS.length }} 款）</h2>
        <a href="/guides/multi-platform-clients">查看全平台客户端矩阵 →</a>
      </div>
      <div class="kh-client-pills">
        <a href="/guides/windows-clients" class="kb-card kh-client-box">
          <strong>Windows</strong>
          <span>Clash Verge Rev / v2rayN / FlClash / Karing</span>
        </a>
        <a href="/guides/ios-clients" class="kb-card kh-client-box">
          <strong>iOS / iPadOS</strong>
          <span>Shadowrocket / Stash / Quantumult X / Surge / Streisand</span>
        </a>
        <a href="/guides/android-clients" class="kb-card kh-client-box">
          <strong>Android</strong>
          <span>v2rayNG / FlClash / Clash Meta / Hiddify / Karing</span>
        </a>
        <a href="/guides/clash-verge-macos" class="kb-card kh-client-box">
          <strong>macOS / Linux</strong>
          <span>Apple Silicon 与 Intel 区分 / DEB / RPM / AppImage</span>
        </a>
        <a href="/guides/openwrt-routing" class="kb-card kh-client-box">
          <strong>OpenWrt 软路由</strong>
          <span>OpenClash / PassWall2 / Nikki (24.10+) / HomeProxy</span>
        </a>
      </div>
    </section>

    <!-- Independent Reviews & Comparisons -->
    <section class="kh-section">
      <div class="kh-sec-head">
        <h2>独立品牌评测与横向对比</h2>
        <div>
          <a href="/reviews/">评测中心</a> ·
          <a href="/comparisons/">横向对比</a>
        </div>
      </div>
      <div class="kb-card-grid">
        <a v-for="rev in featuredReviews" :key="rev.link" :href="rev.link" class="kb-card kh-link-card">
          <span class="kb-badge kb-badge--review">独立评测</span>
          <div class="kh-card-title">{{ rev.title }}</div>
          <p class="kh-card-note">{{ rev.note }}</p>
        </a>
      </div>
      <div class="kh-sub-banners">
        <a href="/comparisons/guangsuyun-vs-muguang-vs-feimao" class="kb-card kh-link-card">
          <strong>横向对比：光速云 vs 暮光加速 vs 飞猫云</strong>
          <span>订阅兼容、套餐结构与非晚高峰测速差异对照</span>
        </a>
        <a href="/comparisons/budget-iepl-5-yuan-tier" class="kb-card kh-link-card">
          <strong>5.6 元极限平价档横评：闪电鼠 / 大佬云 / 云界线 / 榴莲云 / 环球梯</strong>
          <span>同质化规格拆解与协议/链接差异核查</span>
        </a>
      </div>
    </section>

    <!-- Commercial Database & Offers Entry (Positioned Lower & Clearly Separated) -->
    <section class="kh-section kh-section--alt">
      <div class="kh-sec-head">
        <h2>品牌数据库与已核实套餐入口（{{ ALL_BRANDS.length }} 家独立实体）</h2>
        <a href="/brands/">打开交互式筛选库 →</a>
      </div>
      <p class="kh-commercial-note">
        以下区域集中提供机场品牌基础资料、套餐价格周期与已披露优惠码。教程区内容不涉及任何注册推广引导。
      </p>
      <div class="kh-brand-quick">
        <a v-for="b in ALL_BRANDS.slice(0, 8)" :key="b.slug" :href="`/brands/${b.slug}`" class="kb-card kh-brand-chip">
          <div class="kh-brand-top">
            <strong>{{ b.name }}</strong>
            <span class="kb-badge">{{ b.lineCategory }}</span>
          </div>
          <div class="kh-brand-price">{{ b.entryPriceDisplay }}</div>
        </a>
      </div>
      <div class="kh-db-cta">
        <a href="/brands/" class="kb-btn-primary">检索全部 {{ ALL_BRANDS.length }} 家机场品牌</a>
        <a href="/offers/" class="kb-btn-secondary">查看优惠码与合作说明</a>
      </div>
    </section>

    <!-- FAQ -->
    <section class="kh-section">
      <FAQSection title="常见问题（FAQ）" :items="homeFaqs" />
    </section>
  </div>
</template>

<style scoped>
.kb-home {
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 1.25rem 3rem;
}
.kh-hero {
  padding: 2.6rem 1.5rem 2.2rem;
  margin: 1rem 0 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--kb-border);
  background: linear-gradient(135deg, var(--kb-bg-soft) 0%, var(--kb-bg-blue-soft) 100%);
}
.kh-hero-inner {
  max-width: 840px;
}
.kh-brand-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.65rem;
}
.kh-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--kb-bg);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.14);
  flex-shrink: 0;
}
.kh-eyebrow {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--kb-primary);
}
.kh-h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.65rem, 3vw, 2.3rem);
  line-height: 1.28;
  color: var(--kb-text);
}
.kh-lead {
  margin: 0 0 1.25rem;
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}
.kh-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}
.kh-section {
  padding: 1.5rem 0;
}
.kh-section--alt {
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  border-radius: 14px;
  padding: 1.45rem 1.25rem;
  margin: 0.75rem 0;
}
.kh-sec-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.kh-sec-head h2 {
  margin: 0;
  font-size: 1.32rem;
  color: var(--kb-text);
}
.kh-sec-head span,
.kh-sec-head a {
  font-size: 0.88rem;
  color: var(--kb-primary);
  text-decoration: none;
}
.kh-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
@media (max-width: 1024px) {
  .kh-grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 600px) {
  .kh-grid-4 {
    grid-template-columns: 1fr;
  }
}
.kh-hub-card {
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
  border-radius: 12px;
  padding: 1.05rem;
  display: flex;
  flex-direction: column;
}
.kh-hub-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.08rem;
}
.kh-hub-card h3 a {
  color: var(--kb-text);
  text-decoration: none;
}
.kh-hub-card h3 a:hover {
  color: var(--kb-primary);
}
.kh-hub-card p {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  color: var(--kb-text-muted);
  line-height: 1.55;
}
.kh-topic-links {
  list-style: none;
  padding: 0;
  margin: 0 0 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.kh-topic-links a {
  display: inline-block;
  padding: 0.18rem 0.55rem;
  border-radius: 6px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  font-size: 0.8rem;
  color: var(--kb-text);
  text-decoration: none;
}
.kh-topic-links a:hover {
  border-color: var(--kb-primary);
  color: var(--kb-primary);
}
.kh-more {
  margin-top: auto;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--kb-primary);
  text-decoration: none;
}
.kh-path-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 0.8rem;
}
.kh-path-card {
  text-decoration: none !important;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.kh-step {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--kb-primary);
}
.kh-path-title {
  font-weight: 700;
  color: var(--kb-text);
  font-size: 0.94rem;
}
.kh-path-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--kb-text-muted);
  line-height: 1.5;
}
.kh-link-card {
  text-decoration: none !important;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.kh-card-title {
  font-weight: 700;
  color: var(--kb-text);
  line-height: 1.45;
}
.kh-card-note {
  margin: 0;
  font-size: 0.84rem;
  color: var(--kb-text-muted);
}
.kh-client-pills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 0.8rem;
}
.kh-client-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-decoration: none !important;
  color: var(--kb-text);
}
.kh-client-box span {
  font-size: 0.82rem;
  color: var(--kb-text-muted);
}
.kh-sub-banners {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-top: 0.8rem;
}
@media (max-width: 720px) {
  .kh-sub-banners {
    grid-template-columns: 1fr;
  }
}
.kh-sub-banners span {
  font-size: 0.85rem;
  color: var(--kb-text-muted);
}
.kh-commercial-note {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  color: var(--kb-text-muted);
}
.kh-brand-quick {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.8rem;
}
.kh-brand-chip {
  text-decoration: none !important;
  color: var(--kb-text);
}
.kh-brand-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.kh-brand-price {
  font-size: 0.82rem;
  color: var(--kb-text-muted);
}
.kh-db-cta {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
