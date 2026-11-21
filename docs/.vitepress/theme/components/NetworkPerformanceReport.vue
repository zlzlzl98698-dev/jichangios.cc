<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))

const maxSpeed = computed(() => {
  if (!brand.value || brand.value.speedReport.rows.length === 0) return 600
  const max = Math.max(...brand.value.speedReport.rows.map((r) => r.downloadMbps || 0))
  return Math.max(max, 200)
})

const originBadge = computed(() => {
  const origin = brand.value?.speedReport.dataOrigin
  if (origin === 'measured') return { label: 'Measured Data', dot: 'obs-dot--green' }
  if (origin === 'vendor') return { label: 'Vendor Data', dot: 'obs-dot--blue' }
  return { label: 'Not Tested / Unverified', dot: 'obs-dot--slate' }
})
</script>

<template>
  <section
    v-if="brand"
    class="observatory-panel"
    :style="{ '--brand-accent': brand.accentColor }"
    aria-label="节点测速可观测性报告"
  >
    <div class="observatory-header">
      <div>
        <h3 class="observatory-title">
          {{ brand.name }} · Performance Monitoring Report
        </h3>
        <div class="observatory-sub">
          测试日期：{{ brand.speedReport.testDate }} ｜ 环境：{{ brand.speedReport.environment }}
          <span v-if="!brand.speedReport.isPeakHour && brand.speedReport.rows.length">（标注：非晚高峰基准）</span>
        </div>
      </div>
      <span class="obs-status-pill">
        <span class="obs-dot" :class="originBadge.dot" />
        {{ originBadge.label }}
      </span>
    </div>

    <p class="obs-summary-text">{{ brand.speedReport.summaryNote }}</p>

    <div v-if="brand.speedReport.rows.length > 0" class="perf-rows">
      <div v-for="row in brand.speedReport.rows" :key="row.region" class="perf-row">
        <div class="perf-region">
          <span class="perf-region-name">{{ row.region }}</span>
          <span v-if="row.note" class="perf-region-note">{{ row.note }}</span>
        </div>
        <div class="perf-metrics obs-mono">
          <span>
            延迟：
            <strong>{{ row.latencyMs !== null ? `${row.latencyMs} ms` : '待核实' }}</strong>
          </span>
          <span>
            下载：
            <strong>{{ row.downloadMbps !== null ? `${row.downloadMbps} Mbps` : '待核实' }}</strong>
          </span>
        </div>
        <div class="perf-bar-track" aria-hidden="true">
          <div
            class="perf-bar-fill"
            :style="{
              width: row.downloadMbps ? `${Math.min(100, Math.round((row.downloadMbps / maxSpeed) * 100))}%` : '0%',
              backgroundColor: brand.accentColor
            }"
          />
        </div>
      </div>
    </div>

    <div v-else class="obs-empty">
      当前暂无可核实的分地区测速数据，不做估算展示。
    </div>

    <div v-if="brand.speedReport.screenshots?.length" class="obs-shots">
      <div class="obs-shots-title">原始测试图归档（保留截图原时间与工具信息）</div>
      <div class="obs-shots-grid">
        <figure v-for="shot in brand.speedReport.screenshots" :key="shot.src" class="obs-shot-card">
          <img :src="shot.src" :alt="shot.alt" loading="lazy" decoding="async" />
          <figcaption>{{ shot.caption }}</figcaption>
        </figure>
      </div>
    </div>

    <div class="obs-footer obs-mono">
      <span>来源：{{ brand.sources.join(' / ') }}</span>
      <span>核实日期：{{ brand.verifiedDate }}</span>
    </div>
  </section>
</template>

<style scoped>
.obs-summary-text {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  color: var(--obs-muted);
  line-height: 1.65;
}
.perf-rows {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.perf-row {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 0.72rem 0.9rem;
}
.perf-region {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.perf-region-name {
  font-weight: 600;
  color: #f8fafc;
}
.perf-region-note {
  font-size: 0.76rem;
  color: var(--obs-muted);
}
.perf-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.84rem;
  color: var(--obs-muted);
  margin-bottom: 0.45rem;
}
.perf-metrics strong {
  color: #f8fafc;
}
.perf-bar-track {
  height: 6px;
  border-radius: 999px;
  background: var(--obs-surface-alt);
  overflow: hidden;
}
.perf-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.35s ease;
}
.obs-empty {
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px dashed var(--obs-border);
  color: var(--obs-muted);
  text-align: center;
}
.obs-shots {
  margin-top: 1.15rem;
  padding-top: 0.95rem;
  border-top: 1px solid var(--obs-border);
}
.obs-shots-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.65rem;
}
.obs-shots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
.obs-shot-card {
  margin: 0;
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 0.55rem;
}
.obs-shot-card img {
  width: 100%;
  border-radius: 4px;
  display: block;
}
.obs-shot-card figcaption {
  margin-top: 0.45rem;
  font-size: 0.76rem;
  color: var(--obs-muted);
  line-height: 1.45;
}
.obs-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--obs-border);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.76rem;
  color: var(--obs-muted);
}
</style>
