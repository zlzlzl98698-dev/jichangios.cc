<script setup lang="ts">
export interface TroubleshootCase {
  symptom: string
  cause: string
  solution: string
}

defineProps<{
  title?: string
  cases: TroubleshootCase[]
}>()
</script>

<template>
  <section class="ts-wrap">
    <h3 v-if="title">{{ title }}</h3>
    <div class="ts-grid">
      <div v-for="(c, idx) in cases" :key="idx" class="ts-card">
        <div class="ts-symptom">现象：{{ c.symptom }}</div>
        <div class="ts-cause"><strong>常见原因：</strong>{{ c.cause }}</div>
        <div class="ts-solution"><strong>处理步骤：</strong>{{ c.solution }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin: 1rem 0;
}
.ts-card {
  border: 1px solid var(--kb-border);
  border-left: 4px solid #dc2626;
  border-radius: 10px;
  background: var(--kb-bg);
  padding: 0.9rem 1.05rem;
}
.ts-symptom {
  font-weight: 700;
  color: var(--kb-text);
  margin-bottom: 0.35rem;
}
.ts-cause,
.ts-solution {
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}
</style>
