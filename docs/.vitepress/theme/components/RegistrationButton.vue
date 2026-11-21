<script setup lang="ts">
import { computed } from 'vue'
import { getBrandLink } from '../../data/links'

const props = defineProps<{
  slug: string
  label?: string
  variant?: 'primary' | 'secondary'
  showNote?: boolean
}>()

const entry = computed(() => getBrandLink(props.slug))
</script>

<template>
  <div v-if="entry" class="reg-btn-wrap">
    <a
      :href="entry.registerUrl"
      target="_blank"
      rel="nofollow sponsored noopener"
      :class="variant === 'secondary' ? 'kb-btn-secondary' : 'kb-btn-primary'"
    >
      <span>{{ label || `前往 ${entry.name} 注册入口` }}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
    <p class="reg-btn-disclosure">
      含推广链接：通过该入口注册可能为本站带来佣金，不影响用户支付价格。
    </p>
    <p v-if="showNote !== false && entry.linkStatusNote" class="reg-btn-note">
      提示：{{ entry.linkStatusNote }}
    </p>
  </div>
</template>

<style scoped>
.reg-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  margin: 0.5rem 0;
}
.reg-btn-disclosure {
  margin: 0;
  font-size: 0.78rem;
  color: var(--kb-text-muted);
  line-height: 1.5;
}
.reg-btn-note {
  margin: 0;
  font-size: 0.78rem;
  color: #b45309;
  line-height: 1.5;
}
.dark .reg-btn-note {
  color: #fcd34d;
}
</style>
