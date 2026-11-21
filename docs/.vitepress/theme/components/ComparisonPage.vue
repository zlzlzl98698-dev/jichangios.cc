<script setup lang="ts">
defineProps<{
  methodology: string
  dataDate: string
  scopeNote: string
}>()
</script>

<template>
  <section class="cmp-banner">
    <div class="cmp-kicker">横向对比说明 · 统一评估基准</div>
    <p class="cmp-text">{{ methodology }}</p>
    <div class="cmp-meta">
      <span><strong>数据截止与核实日期：</strong>{{ dataDate }}</span>
      <span> · </span>
      <span><strong>对比范围：</strong>{{ scopeNote }}</span>
    </div>
  </section>
</template>

<style scoped>
.cmp-banner {
  border: 1px solid #ddd6fe;
  border-left: 4px solid #6d28d9;
  border-radius: 10px;
  padding: 0.95rem 1.1rem;
  margin: 1rem 0 1.35rem;
  background: var(--kb-bg-soft);
}
.dark .cmp-banner {
  border-color: rgba(139, 92, 246, 0.4);
}
.cmp-kicker {
  font-size: 0.78rem;
  font-weight: 700;
  color: #6d28d9;
  margin-bottom: 0.3rem;
}
.dark .cmp-kicker {
  color: #c4b5fd;
}
.cmp-text {
  margin: 0;
  font-size: 0.94rem;
}
.cmp-meta {
  margin-top: 0.5rem;
  font-size: 0.84rem;
  color: var(--kb-text-muted);
}
</style>
