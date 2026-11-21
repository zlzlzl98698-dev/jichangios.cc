<script setup lang="ts">
export interface RelatedLink {
  title: string
  link: string
  description?: string
  tag?: string
}

defineProps<{
  title?: string
  items: RelatedLink[]
}>()
</script>

<template>
  <section v-if="items.length" class="related-box">
    <h2 class="related-title">{{ title || '延伸阅读与相关内容' }}</h2>
    <div class="kb-card-grid">
      <a v-for="item in items" :key="item.link" :href="item.link" class="kb-card related-card">
        <div v-if="item.tag" class="related-tag">{{ item.tag }}</div>
        <div class="related-name">{{ item.title }}</div>
        <p v-if="item.description" class="related-desc">{{ item.description }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped>
.related-box {
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--kb-border);
}
.related-title {
  margin-top: 0 !important;
  border-top: none !important;
  padding-top: 0 !important;
  font-size: 1.15rem !important;
}
.related-card {
  display: block;
  text-decoration: none !important;
}
.related-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--kb-primary);
  margin-bottom: 0.25rem;
}
.related-name {
  font-weight: 700;
  color: var(--kb-text);
  margin-bottom: 0.3rem;
}
.related-desc {
  margin: 0;
  font-size: 0.85rem;
  color: var(--kb-text-muted);
  line-height: 1.55;
}
</style>
