<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <section v-if="brand" class="pricing-box">
    <div class="pricing-head">
      <div>
        <h3 class="pricing-title">{{ brand.name }} 套餐与计费周期核实表</h3>
        <p class="pricing-sub">
          核实日期：{{ brand.verifiedDate }} · 优惠码：
          <code v-if="brand.promoCode">{{ brand.promoCode }}</code>
          <span v-else>暂无核实优惠码</span>
          <span v-if="brand.promoDiscount">（{{ brand.promoDiscount }}）</span>
        </p>
      </div>
      <span class="kb-badge">{{ brand.entryPriceDisplay }}</span>
    </div>

    <p v-if="brand.promoNote" class="pricing-note">{{ brand.promoNote }}</p>
    <p v-if="brand.tiersIncompleteNote" class="pricing-warn">{{ brand.tiersIncompleteNote }}</p>

    <div v-if="brand.tiers.length > 0" class="pricing-table-wrap">
      <table>
        <thead>
          <tr>
            <th>套餐名称</th>
            <th>计费方式</th>
            <th>实际周期价</th>
            <th>折合月均（标注）</th>
            <th>流量额度</th>
            <th>重置周期</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in brand.tiers" :key="t.name + t.cycle">
            <td><strong>{{ t.name }}</strong></td>
            <td>{{ t.cycleLabel }}</td>
            <td class="obs-mono">¥{{ t.price }}</td>
            <td class="obs-mono">
              <span v-if="t.monthlyEquivalent">约 ¥{{ t.monthlyEquivalent }}/月（年/多月折算）</span>
              <span v-else-if="t.cycle === 'monthly'">¥{{ t.price }}/月（真实月付）</span>
              <span v-else>—</span>
            </td>
            <td>{{ t.trafficLabel }}</td>
            <td>{{ t.resetCycle }}</td>
            <td>{{ t.highlightNote || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="pricing-warn">
      当前暂无完整多档套餐价格表，请以官网实时页面为准。
    </p>
  </section>
</template>

<style scoped>
.pricing-box {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-bg);
  padding: 1.15rem;
  margin: 1.25rem 0;
}
.pricing-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.pricing-title {
  margin: 0 !important;
  font-size: 1.08rem !important;
}
.pricing-sub {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: var(--kb-text-muted);
}
.pricing-note {
  margin: 0.45rem 0 0.75rem;
  font-size: 0.86rem;
  color: var(--kb-text-muted);
}
.pricing-warn {
  margin: 0.5rem 0 0.8rem;
  padding: 0.6rem 0.85rem;
  border-radius: 8px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
  font-size: 0.86rem;
}
.dark .pricing-warn {
  background: rgba(217, 119, 6, 0.16);
  border-color: rgba(245, 158, 11, 0.35);
  color: #fcd34d;
}
.pricing-table-wrap {
  overflow-x: auto;
}
</style>
