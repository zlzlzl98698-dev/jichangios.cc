<script setup lang="ts">
export interface StepItem {
  title: string
  detail: string
  command?: string
  tip?: string
}

defineProps<{
  heading?: string
  steps: StepItem[]
}>()
</script>

<template>
  <section class="steps-wrap">
    <h3 v-if="heading">{{ heading }}</h3>
    <ol class="steps-list">
      <li v-for="(s, idx) in steps" :key="idx" class="step-card">
        <div class="step-num">{{ idx + 1 }}</div>
        <div class="step-body">
          <div class="step-title">{{ s.title }}</div>
          <p class="step-detail">{{ s.detail }}</p>
          <pre v-if="s.command" class="step-code"><code>{{ s.command }}</code></pre>
          <p v-if="s.tip" class="step-tip">提示：{{ s.tip }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.steps-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.step-card {
  display: flex;
  gap: 0.9rem;
  padding: 0.95rem 1.05rem;
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: var(--kb-bg-soft);
}
.step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--kb-primary);
  color: #fff;
  font-weight: 700;
  font-size: 0.86rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}
.step-body {
  flex: 1;
  min-width: 0;
}
.step-title {
  font-weight: 700;
  color: var(--kb-text);
  margin-bottom: 0.25rem;
}
.step-detail {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}
.step-code {
  margin: 0.55rem 0 0;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  background: #0f172a;
  color: #e2e8f0;
  font-size: 0.84rem;
  overflow-x: auto;
}
.step-tip {
  margin: 0.45rem 0 0;
  font-size: 0.84rem;
  color: var(--kb-primary);
}
</style>
