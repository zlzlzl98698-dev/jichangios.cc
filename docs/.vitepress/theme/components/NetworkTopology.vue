<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <section v-if="brand" class="observatory-panel" aria-label="线路架构概念拓扑">
    <div class="observatory-header">
      <div>
        <h3 class="observatory-title">{{ brand.name }} · Network Path Topology（架构概念图）</h3>
        <div class="observatory-sub">
          基于品牌披露的线路类型与协议参数绘制的架构概念示意图，并非实时探针路径追踪。
        </div>
      </div>
      <span class="obs-status-pill obs-mono">
        <span class="obs-dot obs-dot--amber" />
        Architecture Concept
      </span>
    </div>

    <div class="topo-flow">
      <div class="topo-node">
        <div class="topo-node-tag obs-mono">CLIENT</div>
        <div class="topo-node-title">用户终端</div>
        <div class="topo-node-sub">{{ brand.clientModeLabel }}</div>
      </div>

      <div class="topo-arrow">
        <span class="topo-line" />
        <span class="topo-proto obs-mono">{{ brand.protocols.join(' / ') }}</span>
      </div>

      <div class="topo-node">
        <div class="topo-node-tag obs-mono">INGRESS / TRANSIT</div>
        <div class="topo-node-title">国内入口与传输通道</div>
        <div class="topo-node-sub">{{ brand.lineType }}</div>
      </div>

      <div class="topo-arrow">
        <span class="topo-line topo-line--thick" :style="{ backgroundColor: brand.accentColor }" />
        <span class="topo-proto obs-mono">{{ brand.lineCategory }}</span>
      </div>

      <div class="topo-node">
        <div class="topo-node-tag obs-mono">EGRESS NODES</div>
        <div class="topo-node-title">海外落地出口</div>
        <div class="topo-node-sub">{{ brand.regionsSummary }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.topo-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 0.65rem;
}
@media (max-width: 820px) {
  .topo-flow {
    grid-template-columns: 1fr;
  }
}
.topo-node {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 10px;
  padding: 0.85rem;
}
.topo-node-tag {
  font-size: 0.7rem;
  color: #60a5fa;
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}
.topo-node-title {
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}
.topo-node-sub {
  font-size: 0.8rem;
  color: var(--obs-muted);
  line-height: 1.45;
}
.topo-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 90px;
}
.topo-line {
  width: 100%;
  height: 2px;
  background: #475569;
}
.topo-line--thick {
  height: 4px;
  border-radius: 2px;
}
.topo-proto {
  font-size: 0.72rem;
  color: var(--obs-muted);
  text-align: center;
}
</style>
