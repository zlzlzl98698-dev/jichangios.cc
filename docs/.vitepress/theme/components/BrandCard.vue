<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import RegistrationButton from './RegistrationButton.vue'

const props = defineProps<{
  slug: string
  showRegister?: boolean
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <article v-if="brand" class="brand-card-box">
    <div class="bc-head">
      <div class="bc-identity">
        <img v-if="brand.logo" :src="brand.logo" :alt="`${brand.name} Logo`" class="bc-logo" width="44" height="44" loading="lazy" decoding="async" />
        <div v-else class="bc-monogram" :style="{ backgroundColor: brand.accentColor }">
          {{ brand.name.slice(0, 2) }}
        </div>
        <div>
          <h3 class="bc-name">{{ brand.name }}</h3>
          <div class="bc-meta">
            <span>{{ brand.foundedYear }}</span>
            <span>·</span>
            <span>{{ brand.lineCategory }}</span>
            <span>·</span>
            <span>{{ brand.protocols.join(' / ') }}</span>
          </div>
        </div>
      </div>
      <span class="kb-badge">{{ brand.dataStatusLabel }}</span>
    </div>

    <p class="bc-summary">{{ brand.summary }}</p>

    <div class="bc-specs">
      <div><strong>价格口径：</strong>{{ brand.entryPriceDisplay }}</div>
      <div><strong>客户端：</strong>{{ brand.clientModeLabel }}</div>
      <div><strong>设备限制：</strong>{{ brand.deviceLimit }}</div>
      <div>
        <strong>优惠码：</strong>
        <code v-if="brand.promoCode">{{ brand.promoCode }}</code>
        <span v-else>待核实</span>
      </div>
    </div>

    <div class="bc-actions">
      <a :href="`/brands/${brand.slug}`" class="kb-btn-secondary">查看品牌详情与套餐</a>
      <a v-if="brand.reviewPath" :href="brand.reviewPath" class="kb-btn-secondary">查看独立评测</a>
    </div>
    <RegistrationButton v-if="showRegister" :slug="brand.slug" />
  </article>
</template>

<style scoped>
.brand-card-box {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-bg);
  padding: 1.05rem 1.15rem;
  margin: 0.9rem 0;
}
.bc-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.bc-identity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.bc-logo,
.bc-monogram {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  flex-shrink: 0;
  object-fit: cover;
}
.bc-monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
}
.bc-name {
  margin: 0 !important;
  font-size: 1.08rem !important;
}
.bc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--kb-text-muted);
}
.bc-summary {
  margin: 0 0 0.75rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}
.bc-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.45rem 0.9rem;
  padding: 0.7rem 0.85rem;
  border-radius: 8px;
  background: var(--kb-bg-soft);
  font-size: 0.85rem;
  margin-bottom: 0.85rem;
}
.bc-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
