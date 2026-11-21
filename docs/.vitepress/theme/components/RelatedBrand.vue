<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slugs: string[]
  title?: string
}>()

const items = computed(() =>
  props.slugs.map((s) => getBrandBySlug(s)).filter((b): b is NonNullable<typeof b> => Boolean(b))
)
</script>

<template>
  <section v-if="items.length" class="rel-brands">
    <h3>{{ title || '相关品牌资料入口' }}</h3>
    <div class="kb-card-grid">
      <div v-for="b in items" :key="b.slug" class="kb-card">
        <div class="rb-top">
          <strong>{{ b.name }}</strong>
          <span class="kb-badge">{{ b.lineCategory }}</span>
        </div>
        <p class="rb-desc">{{ b.entryPriceDisplay }}</p>
        <div class="rb-links">
          <a :href="`/brands/${b.slug}`">品牌详情 →</a>
          <a v-if="b.reviewPath" :href="b.reviewPath">独立评测 →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rb-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.rb-desc {
  margin: 0 0 0.6rem;
  font-size: 0.85rem;
  color: var(--kb-text-muted);
}
.rb-links {
  display: flex;
  gap: 1rem;
  font-size: 0.86rem;
  font-weight: 600;
}
</style>
