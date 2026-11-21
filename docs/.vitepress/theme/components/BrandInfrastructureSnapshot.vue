<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <section v-if="brand" class="observatory-panel" aria-label="品牌基础设施快照">
    <div class="observatory-header">
      <div>
        <h3 class="observatory-title">{{ brand.name }} · Infrastructure Service Snapshot</h3>
        <div class="observatory-sub">{{ brand.dataStatusLabel }}</div>
      </div>
      <span class="obs-status-pill obs-mono" :style="{ borderColor: brand.accentColor }">
        <span class="obs-dot obs-dot--green" :style="{ backgroundColor: brand.accentColor }" />
        {{ brand.lineCategory }}
      </span>
    </div>

    <div class="snap-grid">
      <div class="snap-item">
        <div class="snap-k">运营起点</div>
        <div class="snap-v">{{ brand.foundedYear }}</div>
      </div>
      <div class="snap-item">
        <div class="snap-k">协议体系</div>
        <div class="snap-v obs-mono">{{ brand.protocols.join(' / ') }}</div>
      </div>
      <div class="snap-item">
        <div class="snap-k">客户端模式</div>
        <div class="snap-v">{{ brand.clientModeLabel }}</div>
      </div>
      <div class="snap-item">
        <div class="snap-k">设备连接限制</div>
        <div class="snap-v">{{ brand.deviceLimit }}</div>
      </div>
      <div class="snap-item">
        <div class="snap-k">节点规模</div>
        <div class="snap-v">{{ brand.nodeCountLabel }}</div>
      </div>
      <div class="snap-item">
        <div class="snap-k">价格入门口径</div>
        <div class="snap-v">{{ brand.entryPriceDisplay }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.snap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}
@media (max-width: 768px) {
  .snap-grid {
    grid-template-columns: 1fr;
  }
}
.snap-item {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 0.72rem 0.85rem;
}
.snap-k {
  font-size: 0.76rem;
  color: var(--obs-muted);
  margin-bottom: 0.25rem;
}
.snap-v {
  font-size: 0.88rem;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.45;
}
</style>
