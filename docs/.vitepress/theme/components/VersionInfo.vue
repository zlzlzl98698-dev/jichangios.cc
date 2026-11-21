<script setup lang="ts">
defineProps<{
  softwareName: string
  coreName: string
  platforms: string[]
  officialChannel: string
  verifiedDate: string
  caution?: string
}>()
</script>

<template>
  <div class="ver-box">
    <div class="ver-row">
      <span><strong>软件名称：</strong>{{ softwareName }}</span>
      <span><strong>底层内核：</strong><code>{{ coreName }}</code></span>
      <span><strong>支持平台：</strong>{{ platforms.join(' / ') }}</span>
      <span><strong>官方获取渠道：</strong>{{ officialChannel }}</span>
      <span><strong>核实日期：</strong>{{ verifiedDate }}</span>
    </div>
    <p v-if="caution" class="ver-caution">注意：{{ caution }}</p>
  </div>
</template>

<style scoped>
.ver-box {
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
}
.ver-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.4rem;
}
.ver-caution {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  color: #b45309;
}
.dark .ver-caution {
  color: #fcd34d;
}
</style>
