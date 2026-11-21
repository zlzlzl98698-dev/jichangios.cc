<script setup lang="ts">
import { computed } from 'vue'
import { getClustersByTopic } from '../../data/clusters'

const props = defineProps<{
  topicLink: string
  heading?: string
}>()

const clusters = computed(() => getClustersByTopic(props.topicLink))
</script>

<template>
  <section v-if="clusters.length" class="cd-wrap">
    <h2 class="cd-heading">{{ heading || '本专题三级文档集群导航' }}</h2>
    <p class="cd-intro">
      以下展示本专题下属的三级内容集群、核心核查要点及已发布的实战延伸阅读（未发布长尾规划保持待撰写状态，无空链接）。
    </p>
    <div class="cd-grid">
      <article v-for="c in clusters" :key="c.id" class="cd-card">
        <div class="cd-top">
          <span class="cd-id obs-mono">{{ c.id }}</span>
          <span class="kb-badge">意图：{{ c.intent }}</span>
        </div>
        <h3 class="cd-title">{{ c.title }}</h3>
        <div class="cd-target"><strong>目标用户：</strong>{{ c.targetUser }}</div>
        <p class="cd-summary">{{ c.summary }}</p>
        <ul class="cd-points">
          <li v-for="pt in c.keyPoints" :key="pt">{{ pt }}</li>
        </ul>

        <div class="cd-links-box">
          <div class="cd-links-label">
            已发布延伸阅读（集群共规划 {{ c.plannedCount }} 篇）：
          </div>
          <ul class="cd-links">
            <li v-for="art in c.publishedArticles" :key="art.link">
              <a :href="art.link">
                <span v-if="art.tag" class="cd-tag">[{{ art.tag }}]</span>
                {{ art.title }}
              </a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cd-wrap {
  margin: 2rem 0 1.2rem;
}
.cd-heading {
  margin-bottom: 0.45rem !important;
}
.cd-intro {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: var(--kb-text-muted);
}
.cd-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (max-width: 768px) {
  .cd-grid {
    grid-template-columns: 1fr;
  }
}
.cd-card {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-bg-soft);
  padding: 1.05rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.cd-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.cd-id {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--kb-primary);
  background: var(--kb-bg-blue-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}
.cd-title {
  margin: 0 !important;
  font-size: 1.08rem !important;
  color: var(--kb-text);
}
.cd-target {
  font-size: 0.84rem;
  color: var(--kb-text-muted);
}
.cd-summary {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.65;
}
.cd-points {
  margin: 0.1rem 0 0.4rem;
  padding-left: 1.15rem;
  font-size: 0.86rem;
  color: var(--vp-c-text-2);
}
.cd-links-box {
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--kb-border);
}
.cd-links-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--kb-text-muted);
  margin-bottom: 0.35rem;
}
.cd-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.cd-links a {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--kb-primary);
  text-decoration: none;
}
.cd-links a:hover {
  text-decoration: underline;
}
.cd-tag {
  font-weight: 500;
  color: var(--kb-text-muted);
  margin-right: 0.25rem;
}
</style>
