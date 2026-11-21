<script setup lang="ts">
export interface DownloadPackage {
  os: string
  arch: string
  format: string
  channel: string
  url: string
  note: string
}

defineProps<{
  title?: string
  packages: DownloadPackage[]
}>()
</script>

<template>
  <section class="dl-box">
    <h3 v-if="title">{{ title }}</h3>
    <div class="dl-table-wrap">
      <table>
        <thead>
          <tr>
            <th>操作系统</th>
            <th>芯片架构</th>
            <th>安装包格式</th>
            <th>官方渠道</th>
            <th>选包说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in packages" :key="i">
            <td><strong>{{ p.os }}</strong></td>
            <td><code>{{ p.arch }}</code></td>
            <td>{{ p.format }}</td>
            <td>
              <a :href="p.url" target="_blank" rel="nofollow noopener">
                {{ p.channel }}
              </a>
            </td>
            <td>{{ p.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.dl-box {
  margin: 1.15rem 0;
}
.dl-table-wrap {
  overflow-x: auto;
}
</style>
