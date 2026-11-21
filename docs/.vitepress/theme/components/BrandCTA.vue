<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import RegistrationButton from './RegistrationButton.vue'
import AffiliateDisclosure from './AffiliateDisclosure.vue'

const props = defineProps<{
  slug: string
  heading?: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <aside v-if="brand" class="bcta-box">
    <div class="bcta-head">
      <div>
        <div class="bcta-eyebrow">已披露商业入口 · 品牌详情直达</div>
        <h3 class="bcta-title">{{ heading || `${brand.name} 官方注册与套餐核实入口` }}</h3>
      </div>
      <span class="kb-badge kb-badge--commercial">核实日期 {{ brand.verifiedDate }}</span>
    </div>
    <p class="bcta-info">
      {{ brand.entryPriceDisplay }}
      <span v-if="brand.promoCode"> · 优惠码：<code>{{ brand.promoCode }}</code></span>
    </p>
    <div class="bcta-actions">
      <RegistrationButton :slug="brand.slug" />
      <a :href="`/brands/${brand.slug}`" class="kb-btn-secondary">完整套餐与参数页</a>
    </div>
    <AffiliateDisclosure compact />
  </aside>
</template>

<style scoped>
.bcta-box {
  border: 1px solid #fde68a;
  background: var(--kb-bg-soft);
  border-radius: 12px;
  padding: 1.05rem 1.15rem;
  margin: 1.35rem 0;
}
.dark .bcta-box {
  border-color: rgba(245, 158, 11, 0.4);
}
.bcta-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.bcta-eyebrow {
  font-size: 0.76rem;
  font-weight: 600;
  color: #b45309;
}
.dark .bcta-eyebrow {
  color: #fcd34d;
}
.bcta-title {
  margin: 0.15rem 0 0 !important;
  font-size: 1.05rem !important;
}
.bcta-info {
  margin: 0.55rem 0 0.8rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.bcta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.8rem;
}
</style>
