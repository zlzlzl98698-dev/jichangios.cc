<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import RegistrationButton from './RegistrationButton.vue'
import AffiliateDisclosure from './AffiliateDisclosure.vue'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <section v-if="brand" class="com-hero">
    <AffiliateDisclosure compact />
    <div class="com-card">
      <div class="com-top">
        <div class="com-id">
          <img v-if="brand.logo" :src="brand.logo" :alt="`${brand.name} Logo`" class="com-logo" />
          <div v-else class="com-monogram" :style="{ backgroundColor: brand.accentColor }">
            {{ brand.name.slice(0, 2) }}
          </div>
          <div>
            <div class="com-eyebrow">品牌与套餐资料页 · Transactional Profile</div>
            <h2 class="com-title">{{ brand.name }}</h2>
            <div class="com-sub">
              {{ brand.foundedYear }} · {{ brand.lineType }}
            </div>
          </div>
        </div>
        <span class="kb-badge kb-badge--commercial">核实 {{ brand.verifiedDate }}</span>
      </div>

      <p class="com-summary">{{ brand.summary }}</p>

      <div class="com-grid">
        <div><strong>起步与价格口径：</strong>{{ brand.entryPriceDisplay }}</div>
        <div><strong>支持协议：</strong><code>{{ brand.protocols.join(' / ') }}</code></div>
        <div><strong>客户端与订阅：</strong>{{ brand.clientModeLabel }}</div>
        <div><strong>设备限制：</strong>{{ brand.deviceLimit }}</div>
        <div><strong>支付方式：</strong>{{ brand.paymentMethods.join(' / ') }}</div>
        <div>
          <strong>优惠码：</strong>
          <code v-if="brand.promoCode">{{ brand.promoCode }}</code>
          <span v-else>待核实</span>
          <span v-if="brand.promoDiscount">（{{ brand.promoDiscount }}）</span>
        </div>
      </div>

      <div class="com-cta-row">
        <RegistrationButton :slug="brand.slug" />
        <a v-if="brand.reviewPath" :href="brand.reviewPath" class="kb-btn-secondary">
          查看独立评测分析 →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.com-card {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  padding: 1.2rem;
  background: var(--kb-bg);
  margin: 0.75rem 0 1.4rem;
}
.com-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}
.com-id {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.com-logo,
.com-monogram {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}
.com-monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
}
.com-eyebrow {
  font-size: 0.76rem;
  color: #b45309;
  font-weight: 600;
}
.dark .com-eyebrow {
  color: #fcd34d;
}
.com-title {
  margin: 0.1rem 0 0 !important;
  border-top: none !important;
  padding-top: 0 !important;
  font-size: 1.35rem !important;
}
.com-sub {
  font-size: 0.85rem;
  color: var(--kb-text-muted);
}
.com-summary {
  margin: 0.85rem 0;
  font-size: 0.95rem;
}
.com-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.5rem 1rem;
  padding: 0.8rem 0.95rem;
  border-radius: 8px;
  background: var(--kb-bg-soft);
  font-size: 0.86rem;
  margin-bottom: 1rem;
}
.com-cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.85rem;
}
</style>
