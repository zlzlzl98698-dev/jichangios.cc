<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import { SITE_CONFIG, type PageType, type SearchIntent } from '../data/site'
import { getBreadcrumbs } from '../data/navigation'
import AffiliateDisclosure from './components/AffiliateDisclosure.vue'
import RelatedBrand from './components/RelatedBrand.vue'
import RelatedArticles from './components/RelatedArticles.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
const route = useRoute()

const pageType = computed<PageType>(() => {
  const pt = frontmatter.value?.pageType
  if (pt === 'tutorial' || pt === 'review' || pt === 'comparison' || pt === 'commercial' || pt === 'topic') {
    return pt
  }
  return 'topic'
})

const searchIntent = computed<SearchIntent>(() => {
  const si = frontmatter.value?.searchIntent
  if (si === 'informational' || si === 'investigational' || si === 'transactional' || si === 'navigational') {
    return si
  }
  return 'informational'
})

const breadcrumbs = computed(() => getBreadcrumbs(route.path, frontmatter.value?.title || page.value.title))

const showDisclosure = computed(() => {
  // 教程区 (tutorial) 默认绝不注入商业披露/购买模块，除非该页面显式声明 affiliateDisclosure: true
  if (pageType.value === 'tutorial') {
    return frontmatter.value?.affiliateDisclosure === true
  }
  return pageType.value === 'commercial' || frontmatter.value?.affiliateDisclosure === true
})

const reviewBrandSlugs = computed<string[]>(() => {
  if (pageType.value !== 'review' && pageType.value !== 'comparison') return []
  return Array.isArray(frontmatter.value?.brandSlugs) ? frontmatter.value.brandSlugs : []
})

const relatedItems = computed(() => {
  return Array.isArray(frontmatter.value?.related) ? frontmatter.value.related : []
})

const publishedDate = computed(() =>
  frontmatter.value?.date ? String(frontmatter.value.date).slice(0, 10) : ''
)
const updatedDate = computed(() =>
  frontmatter.value?.updatedDate ? String(frontmatter.value.updatedDate).slice(0, 10) : ''
)
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="frontmatter.layout !== 'page' && !frontmatter.home" class="kb-doc-header">
        <nav class="kb-breadcrumbs" aria-label="面包屑导航">
          <template v-for="(crumb, idx) in breadcrumbs" :key="idx">
            <span v-if="idx > 0" aria-hidden="true">/</span>
            <a v-if="crumb.link" :href="crumb.link">{{ crumb.label }}</a>
            <span v-else>{{ crumb.label }}</span>
          </template>
        </nav>

        <div class="kb-meta-row">
          <span class="kb-badge" :class="`kb-badge--${pageType}`">
            {{ SITE_CONFIG.pageTypeLabels[pageType] }}
          </span>
          <span class="kb-badge">意图：{{ SITE_CONFIG.searchIntentLabels[searchIntent] }}</span>
          <span v-if="frontmatter.category">栏目：{{ frontmatter.category }}</span>
          <span v-if="publishedDate">发布：{{ publishedDate }}</span>
          <span v-if="updatedDate">更新：{{ updatedDate }}</span>
        </div>

        <AffiliateDisclosure v-if="showDisclosure" />
      </div>
    </template>

    <template #doc-after>
      <RelatedBrand
        v-if="reviewBrandSlugs.length > 0"
        :slugs="reviewBrandSlugs"
        title="相关品牌资料与已披露官方入口"
      />
      <RelatedArticles v-if="relatedItems.length > 0" :items="relatedItems" />
    </template>
  </Layout>
</template>
