<script setup lang="ts">
import { computed, ref } from 'vue'
import { ALL_BRANDS, BRAND_COUNT_AUDIT } from '../../data/brands'
import type { ClientAccessMode } from '../../data/brands/types'
import AffiliateDisclosure from './AffiliateDisclosure.vue'

const query = ref('')
const lineFilter = ref('all')
const clientFilter = ref<'all' | ClientAccessMode>('all')
const priceFilter = ref<'all' | 'under10_annual' | 'monthly_under20' | 'monthly_20_30'>('all')
const sortBy = ref<'order' | 'price_asc' | 'data_richness'>('order')

function resetFilters() {
  query.value = ''
  lineFilter.value = 'all'
  clientFilter.value = 'all'
  priceFilter.value = 'all'
  sortBy.value = 'order'
}

const filteredBrands = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = ALL_BRANDS.filter((b) => {
    if (q) {
      const haystack = [
        b.name,
        b.englishName || '',
        ...b.aliases,
        b.lineType,
        ...b.protocols,
        b.summary,
        b.promoCode || ''
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (lineFilter.value !== 'all' && b.lineCategory !== lineFilter.value) return false
    if (clientFilter.value !== 'all' && b.clientMode !== clientFilter.value) return false
    if (priceFilter.value === 'under10_annual') {
      if (b.lowestAnnualEquivalentMonthly === null || b.lowestAnnualEquivalentMonthly > 10) return false
    } else if (priceFilter.value === 'monthly_under20') {
      if (b.lowestMonthlyPrice === null || b.lowestMonthlyPrice > 20) return false
    } else if (priceFilter.value === 'monthly_20_30') {
      if (b.lowestMonthlyPrice === null || b.lowestMonthlyPrice < 20 || b.lowestMonthlyPrice > 30) return false
    }
    return true
  })

  return [...list].sort((a, b) => {
    if (sortBy.value === 'price_asc') {
      const pa = a.lowestMonthlyPrice ?? a.lowestAnnualEquivalentMonthly ?? 999
      const pb = b.lowestMonthlyPrice ?? b.lowestAnnualEquivalentMonthly ?? 999
      return pa - pb
    }
    if (sortBy.value === 'data_richness') {
      const score = (x: typeof a) =>
        (x.speedReport.rows.length > 0 ? 3 : 0) +
        (x.tiers.length > 1 ? 2 : 0) +
        (x.reviewPath ? 1 : 0)
      return score(b) - score(a) || a.rankOrder - b.rankOrder
    }
    return a.rankOrder - b.rankOrder
  })
})
</script>

<template>
  <section class="db-wrap">
    <AffiliateDisclosure />

    <div class="db-audit-bar">
      <span>
        已收录独立品牌实体：<strong>{{ BRAND_COUNT_AUDIT.uniqueEntities }} 家</strong>
        （原始清单 {{ BRAND_COUNT_AUDIT.sourceListEntries }} 条记录，已去重合并 Firefly 重复条目）
      </span>
      <span>最近全库核实：2026-11-20</span>
    </div>

    <div class="db-controls">
      <input
        v-model="query"
        type="search"
        class="db-input"
        placeholder="搜索品牌名、协议（VLESS/Trojan）、优惠码或特性..."
        aria-label="搜索机场品牌"
      />
      <select v-model="lineFilter" class="db-select" aria-label="按线路筛选">
        <option value="all">全部线路类型</option>
        <option value="IEPL专线">IEPL 专线</option>
        <option value="IPLC专线">IPLC 专线</option>
        <option value="BGP中转">BGP 中转</option>
        <option value="混合线路">混合 / 轻量</option>
      </select>
      <select v-model="clientFilter" class="db-select" aria-label="按客户端模式筛选">
        <option value="all">全部客户端模式</option>
        <option value="both">自研 + 第三方订阅</option>
        <option value="third_party">支持第三方订阅</option>
        <option value="dedicated_only">仅专属客户端</option>
        <option value="unverified">待核实</option>
      </select>
      <select v-model="priceFilter" class="db-select" aria-label="按价格筛选">
        <option value="all">全部价格档位</option>
        <option value="under10_annual">年付折算 ≤ ¥10/月</option>
        <option value="monthly_under20">真实月付 ≤ ¥20/月</option>
        <option value="monthly_20_30">真实月付 ¥20–30/月</option>
      </select>
      <select v-model="sortBy" class="db-select" aria-label="排序方式">
        <option value="order">默认收录顺序</option>
        <option value="data_richness">资料完整度优先</option>
        <option value="price_asc">入门价格从低到高</option>
      </select>
    </div>

    <div class="db-count-row">
      <span>当前匹配：<strong>{{ filteredBrands.length }}</strong> / {{ ALL_BRANDS.length }} 家</span>
      <button v-if="query || lineFilter !== 'all' || clientFilter !== 'all' || priceFilter !== 'all'" type="button" class="db-reset" @click="resetFilters">
        重置筛选
      </button>
    </div>

    <div v-if="filteredBrands.length > 0" class="db-grid">
      <article v-for="b in filteredBrands" :key="b.slug" class="db-card">
        <div class="db-card-head">
          <div class="db-id">
            <img v-if="b.logo" :src="b.logo" :alt="`${b.name} Logo`" class="db-logo" loading="lazy" />
            <div v-else class="db-monogram" :style="{ backgroundColor: b.accentColor }">
              {{ b.name.slice(0, 2) }}
            </div>
            <div>
              <h3 class="db-title">
                <a :href="`/brands/${b.slug}`">{{ b.name }}</a>
              </h3>
              <div class="db-sub">{{ b.foundedYear }} · {{ b.lineCategory }}</div>
            </div>
          </div>
          <span class="kb-badge">{{ b.dataStatusLabel }}</span>
        </div>

        <p class="db-summary">{{ b.summary }}</p>

        <ul class="db-meta-list">
          <li><strong>价格：</strong>{{ b.entryPriceDisplay }}</li>
          <li><strong>协议：</strong><code>{{ b.protocols.join(' / ') }}</code></li>
          <li><strong>客户端：</strong>{{ b.clientModeLabel }}</li>
          <li><strong>核实：</strong>{{ b.verifiedDate }}</li>
        </ul>

        <div class="db-actions">
          <a :href="`/brands/${b.slug}`" class="kb-btn-primary">详情与套餐</a>
          <a v-if="b.reviewPath" :href="b.reviewPath" class="kb-btn-secondary">独立评测</a>
        </div>
      </article>
    </div>

    <div v-else class="db-empty">
      <p>未找到符合当前筛选条件的品牌。</p>
      <button type="button" class="kb-btn-secondary" @click="resetFilters">查看全部 {{ ALL_BRANDS.length }} 家品牌</button>
    </div>
  </section>
</template>

<style scoped>
.db-audit-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: var(--kb-bg-soft);
  font-size: 0.86rem;
  margin-bottom: 1rem;
}
.db-controls {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}
.db-input {
  grid-column: 1 / -1;
}
@media (max-width: 768px) {
  .db-controls {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 540px) {
  .db-controls {
    grid-template-columns: 1fr;
  }
}
.db-input,
.db-select {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
  color: var(--kb-text);
  font-size: 0.88rem;
}
.db-count-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--kb-text-muted);
  margin-bottom: 1rem;
}
.db-reset {
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
  color: var(--kb-primary);
  border-radius: 6px;
  padding: 0.25rem 0.65rem;
  cursor: pointer;
  font-size: 0.82rem;
}
.db-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1rem;
}
.db-card {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-bg);
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.db-card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.db-id {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.db-logo,
.db-monogram {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.db-monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.88rem;
}
.db-title {
  margin: 0 !important;
  font-size: 1.02rem !important;
}
.db-title a {
  text-decoration: none;
  color: var(--kb-text);
}
.db-title a:hover {
  color: var(--kb-primary);
}
.db-sub {
  font-size: 0.8rem;
  color: var(--kb-text-muted);
}
.db-summary {
  margin: 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.db-meta-list {
  list-style: none;
  padding: 0.65rem 0.8rem;
  margin: 0;
  border-radius: 8px;
  background: var(--kb-bg-soft);
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.db-actions {
  margin-top: auto;
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}
.db-empty {
  padding: 2rem 1rem;
  text-align: center;
  border: 1px dashed var(--kb-border);
  border-radius: 12px;
  color: var(--kb-text-muted);
}
</style>
