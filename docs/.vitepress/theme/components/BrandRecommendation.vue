<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import BrandCard from './BrandCard.vue'
import AffiliateDisclosure from './AffiliateDisclosure.vue'

const props = defineProps<{
  slugs: string[]
  title?: string
  showRegister?: boolean
}>()

const hasBrands = computed(() => props.slugs.some((s) => Boolean(getBrandBySlug(s))))
</script>

<template>
  <section v-if="hasBrands" class="brec-wrap">
    <h2 v-if="title">{{ title }}</h2>
    <AffiliateDisclosure compact />
    <BrandCard v-for="slug in slugs" :key="slug" :slug="slug" :show-register="showRegister" />
  </section>
</template>

<style scoped>
.brec-wrap {
  margin: 1.5rem 0;
}
</style>
