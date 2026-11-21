<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slugs: string[]
  title?: string
}>()

const brands = computed(() =>
  props.slugs.map((s) => getBrandBySlug(s)).filter((b): b is NonNullable<typeof b> => Boolean(b))
)
</script>

<template>
  <section v-if="brands.length" class="bcomp-wrap">
    <h3 v-if="title">{{ title }}</h3>
    <div class="bcomp-scroll">
      <table>
        <thead>
          <tr>
            <th>对比维度</th>
            <th v-for="b in brands" :key="b.slug">
              <a :href="`/brands/${b.slug}`">{{ b.name }}</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>运营起点</strong></td>
            <td v-for="b in brands" :key="b.slug">{{ b.foundedYear }}</td>
          </tr>
          <tr>
            <td><strong>线路架构</strong></td>
            <td v-for="b in brands" :key="b.slug">{{ b.lineCategory }}（{{ b.lineType }}）</td>
          </tr>
          <tr>
            <td><strong>传输协议</strong></td>
            <td v-for="b in brands" :key="b.slug"><code>{{ b.protocols.join(' / ') }}</code></td>
          </tr>
          <tr>
            <td><strong>客户端模式</strong></td>
            <td v-for="b in brands" :key="b.slug">{{ b.clientModeLabel }}</td>
          </tr>
          <tr>
            <td><strong>价格口径</strong></td>
            <td v-for="b in brands" :key="b.slug">{{ b.entryPriceDisplay }}</td>
          </tr>
          <tr>
            <td><strong>设备限制</strong></td>
            <td v-for="b in brands" :key="b.slug">{{ b.deviceLimit }}</td>
          </tr>
          <tr>
            <td><strong>优惠码</strong></td>
            <td v-for="b in brands" :key="b.slug">
              <code v-if="b.promoCode">{{ b.promoCode }}</code>
              <span v-else>待核实</span>
            </td>
          </tr>
          <tr>
            <td><strong>资料状态</strong></td>
            <td v-for="b in brands" :key="b.slug">{{ b.dataStatusLabel }}（{{ b.verifiedDate }}）</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.bcomp-wrap {
  margin: 1.25rem 0;
}
.bcomp-scroll {
  overflow-x: auto;
}
</style>
