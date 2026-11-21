<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import type { UnlockStatus } from '../../data/brands/types'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))

function statusMeta(status: UnlockStatus) {
  switch (status) {
    case 'measured_supported':
      return { label: 'Measured · Supported', dot: 'obs-dot--green' }
    case 'vendor_claimed':
      return { label: 'Vendor Claimed', dot: 'obs-dot--blue' }
    case 'node_dependent':
      return { label: 'Partial / 视节点', dot: 'obs-dot--amber' }
    case 'measured_failed':
      return { label: 'Measured · Failed', dot: 'obs-dot--red' }
    default:
      return { label: 'Not Tested', dot: 'obs-dot--slate' }
  }
}
</script>

<template>
  <section v-if="brand" class="observatory-panel" aria-label="流媒体与 AI 服务可用性矩阵">
    <div class="observatory-header">
      <div>
        <h3 class="observatory-title">{{ brand.name }} · Service Availability Matrix</h3>
        <div class="observatory-sub">
          严格区分「独立/清单测试记录」「品牌方宣称」「部分节点支持」与「暂未测试」
        </div>
      </div>
      <span class="obs-status-pill obs-mono">
        <span class="obs-dot obs-dot--blue" />
        Verified {{ brand.verifiedDate }}
      </span>
    </div>

    <div class="matrix-grid">
      <div v-for="item in brand.unlockMatrix" :key="item.service" class="matrix-card">
        <div class="matrix-top">
          <span class="matrix-service">{{ item.service }}</span>
          <span class="obs-status-pill">
            <span class="obs-dot" :class="statusMeta(item.status).dot" />
            {{ statusMeta(item.status).label }}
          </span>
        </div>
        <div class="matrix-detail">{{ item.detail }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.matrix-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}
@media (max-width: 768px) {
  .matrix-grid {
    grid-template-columns: 1fr;
  }
}
.matrix-card {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 0.72rem 0.85rem;
}
.matrix-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}
.matrix-service {
  font-weight: 700;
  color: #f8fafc;
}
.matrix-detail {
  font-size: 0.8rem;
  color: var(--obs-muted);
  line-height: 1.5;
}
</style>
