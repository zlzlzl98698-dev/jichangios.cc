<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
  verdict: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <section v-if="brand" class="rev-summary">
    <div class="rev-head">
      <div>
        <div class="rev-kicker">独立评测摘要 · Investigational Verdict</div>
        <h3 class="rev-title">{{ brand.name }} 综合核实结论</h3>
      </div>
      <span class="kb-badge kb-badge--review">{{ brand.dataStatusLabel }}</span>
    </div>
    <p class="rev-verdict">{{ verdict }}</p>
    <div class="rev-cols">
      <div>
        <strong>核心优势</strong>
        <ul>
          <li v-for="p in brand.pros" :key="p">{{ p }}</li>
        </ul>
      </div>
      <div>
        <strong>已知限制与缺口</strong>
        <ul>
          <li v-for="l in brand.limitations" :key="l">{{ l }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rev-summary {
  border: 1px solid #a7f3d0;
  background: var(--kb-bg-soft);
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  margin: 1rem 0 1.4rem;
}
.dark .rev-summary {
  border-color: rgba(16, 185, 129, 0.35);
}
.rev-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.rev-kicker {
  font-size: 0.78rem;
  font-weight: 700;
  color: #047857;
}
.dark .rev-kicker {
  color: #6ee7b7;
}
.rev-title {
  margin: 0.15rem 0 0 !important;
  font-size: 1.08rem !important;
}
.rev-verdict {
  margin: 0.65rem 0 0.9rem;
  font-size: 0.95rem;
  color: var(--kb-text);
}
.rev-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  font-size: 0.88rem;
}
@media (max-width: 700px) {
  .rev-cols {
    grid-template-columns: 1fr;
  }
}
.rev-cols ul {
  margin: 0.35rem 0 0;
  padding-left: 1.15rem;
}
</style>
