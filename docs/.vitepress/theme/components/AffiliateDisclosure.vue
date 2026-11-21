<script setup lang="ts">
import { SITE_CONFIG } from '../../data/site'

defineProps<{
  compact?: boolean
  customNote?: string
}>()
</script>

<template>
  <aside class="kb-disclosure" :class="{ 'kb-disclosure--compact': compact }" aria-label="商业关系披露">
    <strong>商业合作与链接说明：</strong>
    {{ customNote || SITE_CONFIG.affiliateDisclosureText }}
  </aside>
</template>

<style scoped>
.kb-disclosure--compact {
  margin: 0.65rem 0;
  padding: 0.55rem 0.85rem;
  font-size: 0.82rem;
}
</style>
