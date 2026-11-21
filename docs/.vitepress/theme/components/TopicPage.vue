<script setup lang="ts">
export interface TopicClusterLink {
  title: string
  link: string
  description: string
}

defineProps<{
  summary: string
  clusters: TopicClusterLink[]
}>()
</script>

<template>
  <section class="topic-hub">
    <p class="topic-summary">{{ summary }}</p>
    <div class="kb-card-grid">
      <a v-for="c in clusters" :key="c.link" :href="c.link" class="kb-card topic-card">
        <div class="topic-title">{{ c.title }}</div>
        <p class="topic-desc">{{ c.description }}</p>
        <span class="topic-go">进入阅读 →</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.topic-summary {
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  font-size: 0.95rem;
}
.topic-card {
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
}
.topic-title {
  font-weight: 700;
  color: var(--kb-text);
  margin-bottom: 0.35rem;
}
.topic-desc {
  margin: 0 0 0.6rem;
  font-size: 0.86rem;
  color: var(--kb-text-muted);
  line-height: 1.55;
}
.topic-go {
  margin-top: auto;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--kb-primary);
}
</style>
