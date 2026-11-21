<script setup lang="ts">
defineProps<{
  quickAnswer: string
  appliesTo: string
  verifiedDate?: string
}>()
</script>

<template>
  <section class="tpl-banner tpl-banner--tutorial">
    <div class="tpl-kicker">直接结论 · Answer-First</div>
    <p class="tpl-answer">{{ quickAnswer }}</p>
    <div class="tpl-sub">
      <span><strong>适用环境：</strong>{{ appliesTo }}</span>
      <span v-if="verifiedDate"> · <strong>核实日期：</strong>{{ verifiedDate }}</span>
    </div>
  </section>
</template>

<style scoped>
.tpl-banner {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  padding: 1rem 1.15rem;
  margin: 1rem 0 1.35rem;
  background: var(--kb-bg-blue-soft);
  border-left: 4px solid var(--kb-primary);
}
.tpl-kicker {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--kb-primary);
  margin-bottom: 0.35rem;
}
.tpl-answer {
  margin: 0;
  font-weight: 600;
  color: var(--kb-text);
  line-height: 1.7;
}
.tpl-sub {
  margin-top: 0.55rem;
  font-size: 0.85rem;
  color: var(--kb-text-muted);
}
</style>
