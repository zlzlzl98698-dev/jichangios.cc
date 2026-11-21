<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

export interface FAQItem {
  q: string
  a: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    items?: FAQItem[]
    /** 仅当单一页面拆分为多组 FAQ 时传 true，以保留各自子集并由 frontmatter.faq 聚合全量 Schema */
    customOnly?: boolean
  }>(),
  {
    items: () => [],
    customOnly: false
  }
)

const { frontmatter } = useData()

/**
 * 默认优先消费 frontmatter.faq 作为单一权威数据源，保证可见 DOM 与 JSON-LD FAQPage 100% 一致，
 * 从源头消除 Hidden Schema 或问答文字偏差。
 */
const resolvedItems = computed<FAQItem[]>(() => {
  const fmFaq = frontmatter.value?.faq
  if (!props.customOnly && Array.isArray(fmFaq) && fmFaq.length > 0) {
    return fmFaq as FAQItem[]
  }
  return props.items || []
})
</script>

<template>
  <section v-if="resolvedItems.length > 0" class="faq-section">
    <h2 v-if="title">{{ title }}</h2>
    <div class="faq-list">
      <details v-for="(item, idx) in resolvedItems" :key="idx" class="faq-item" :open="idx === 0">
        <summary class="faq-q">{{ item.q }}</summary>
        <div class="faq-a">{{ item.a }}</div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: 0.8rem 0 1.4rem;
}
.faq-item {
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: var(--kb-bg-soft);
  padding: 0.75rem 1rem;
}
.faq-q {
  cursor: pointer;
  font-weight: 600;
  color: var(--kb-text);
  list-style: none;
}
.faq-a {
  margin-top: 0.55rem;
  font-size: 0.94rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}
</style>
