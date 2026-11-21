<script setup lang="ts">
export type DiagramMode = 'windows-service' | 'tun' | 'dns' | 'openwrt' | 'client'

const props = withDefaults(
  defineProps<{
    mode?: DiagramMode
    title?: string
  }>(),
  {
    mode: 'tun',
    title: ''
  }
)

interface FlowNode {
  label: string
  sub: string
  tone?: 'neutral' | 'primary' | 'warn' | 'ok'
}

interface FlowLane {
  name: string
  badge: string
  nodes: FlowNode[]
  note: string
}

const PRESETS: Record<DiagramMode, { defaultTitle: string; lanes: FlowLane[] }> = {
  'windows-service': {
    defaultTitle: 'Windows 桌面代理与 Service Mode 权限分层示意图',
    lanes: [
      {
        name: '普通用户态（无需管理员权限）',
        badge: '系统代理模式',
        nodes: [
          { label: '浏览器 / 桌面应用', sub: '读取 Windows 代理设置', tone: 'neutral' },
          { label: '127.0.0.1:7897', sub: 'Mixed 混合监听端口', tone: 'primary' },
          { label: 'Mihomo 内核', sub: 'Rule 规则匹配与出站', tone: 'ok' }
        ],
        note: '优点：无需 UAC 服务授权；局限：PowerShell、Git、Docker、游戏与 UWP 默认不读取系统代理。'
      },
      {
        name: '系统服务态（Service Mode + TUN）',
        badge: '全流量接管',
        nodes: [
          { label: '任意本地进程', sub: '终端 / IDE / 游戏 / UWP', tone: 'neutral' },
          { label: 'Clash Verge Service', sub: 'Windows 后台服务提权创建虚拟网卡', tone: 'warn' },
          { label: 'utun / Wintun 网卡', sub: '绕过应用设置直接捕获路由表流量', tone: 'primary' },
          { label: 'Mihomo 内核', sub: 'Sniffer 嗅探 + DNS + 分流', tone: 'ok' }
        ],
        note: '重装或大版本升级后若 TUN 开关自动弹回，需在设置中先卸载旧服务再重新安装服务模式。'
      }
    ]
  },
  tun: {
    defaultTitle: '系统代理 vs TUN 虚拟网卡分流路径对比',
    lanes: [
      {
        name: '路径 A：系统代理 (System Proxy)',
        badge: '7897 端口转发',
        nodes: [
          { label: '支持 HTTP/SOCKS 的应用', sub: 'Chrome / Edge / Safari', tone: 'neutral' },
          { label: '本地环回端口', sub: '127.0.0.1:7897', tone: 'primary' },
          { label: 'DIRECT / 代理节点', sub: '按域名与规则出站', tone: 'ok' }
        ],
        note: '适合日常网页浏览；关闭软件或崩溃前若未自动还原系统代理，可能出现“关闭客户端后断网”。'
      },
      {
        name: '路径 B：TUN 虚拟网卡 (L3 路由接管)',
        badge: '全局/规则透明接管',
        nodes: [
          { label: '全系统 IPv4/IPv6 流量', sub: '含 CLI / 容器 / 游戏客户端', tone: 'neutral' },
          { label: '虚拟网卡 + Auto Route', sub: '排除内网段 192.168.0.0/16', tone: 'primary' },
          { label: 'Fake-IP / Sniffer', sub: '还原目标域名防止仅凭 IP 误判', tone: 'warn' },
          { label: 'DIRECT / 代理节点', sub: '直连或隧道加密出站', tone: 'ok' }
        ],
        note: '切忌与第三方网游加速器、企业 SSL VPN 同时开启虚拟网卡，避免默认路由表互相覆盖。'
      }
    ]
  },
  dns: {
    defaultTitle: 'Mihomo DNS 解析链路：Fake-IP vs Redir-Host 对照',
    lanes: [
      {
        name: 'Fake-IP 模式（推荐默认）',
        badge: '零跨境 DNS 等待',
        nodes: [
          { label: '客户端发起域名请求', sub: '如 github.com', tone: 'neutral' },
          { label: '本地 Fake-IP 池', sub: '毫秒返回 198.18.x.x 假地址', tone: 'primary' },
          { label: '节点隧道直传域名', sub: '由远端落地机解析真实海外 IP', tone: 'ok' }
        ],
        note: '国内域名仍可按 nameserver-policy 交由 223.5.5.5 / 119.29.29.29 等国内 DoH 解析，避免 CDN 调度绕远。'
      },
      {
        name: 'Redir-Host 模式（兼容性兜底）',
        badge: '本地先拿真实 IP',
        nodes: [
          { label: '客户端发起域名请求', sub: '内网工具 / 特定反作弊环境', tone: 'neutral' },
          { label: '本地 DNS 并发查询', sub: 'DoH / fallback 过滤污染 IP', tone: 'warn' },
          { label: '按真实 IP / 域名匹配规则', sub: '连接直连或远端节点', tone: 'ok' }
        ],
        note: '若仅使用个别内网办公系统排斥 198.18.0.1/16 假 IP，优先将其加入 fake-ip-filter 即可，无需全局降级。'
      }
    ]
  },
  openwrt: {
    defaultTitle: 'OpenWrt 软路由透明代理与旁路由网关拓扑',
    lanes: [
      {
        name: '场景 A：主路由一体化模式（推荐结构简单）',
        badge: '单网关无环路',
        nodes: [
          { label: '局域网终端', sub: '手机 / PC / 电视 / 游戏机', tone: 'neutral' },
          { label: 'OpenWrt 主路由', sub: 'DHCP + nftables/fw4 + 透明代理', tone: 'primary' },
          { label: 'OpenClash / Nikki / HomeProxy', sub: '国内直连 · 海外分流', tone: 'ok' }
        ],
        note: '安装前必核：系统版本（Nikki 要求 24.10+）、架构（x86_64/aarch64）与可用 Overlay 闪存空间。'
      },
      {
        name: '场景 B：旁路由网关模式（不改现有硬路由拨号）',
        badge: '注意防环路',
        nodes: [
          { label: '主路由（拨号 + DHCP）', sub: '关闭冗余分流，仅下发网关/DNS 指向旁路由', tone: 'neutral' },
          { label: 'OpenWrt 旁路由', sub: '关闭自身 DHCP 服务，开启 IP 伪装 (SNAT)', tone: 'warn' },
          { label: '局域网代理出口', sub: '仅支持提供通用订阅链接的机场', tone: 'ok' }
        ],
        note: '严禁主旁路由同时互指网关或双开 DHCP 广播；仅提供专属 App 的机场无法直接在软路由加载订阅。'
      }
    ]
  },
  client: {
    defaultTitle: '第三方通用客户端 vs 机场专属客户端接入链路对照',
    lanes: [
      {
        name: '通用订阅模式（跨设备可迁移）',
        badge: '开放生态',
        nodes: [
          { label: '机场标准订阅 URL', sub: 'YAML / Base64 / sing-box', tone: 'neutral' },
          { label: '第三方开源/商店客户端', sub: 'Clash Verge Rev / v2rayNG / 小火箭', tone: 'primary' },
          { label: '自定义规则与多机场切换', sub: '支持本地覆写、备份与软路由部署', tone: 'ok' }
        ],
        note: '可自行核对 GitHub SHA-256 发布校验值与开源社区版本更新，不被单一商家绑定。'
      },
      {
        name: '专属客户端模式（一键登录即用）',
        badge: '闭环封装',
        nodes: [
          { label: '商家账号密码', sub: '官网发布专用安装包', tone: 'neutral' },
          { label: '定制封装 App', sub: '内置节点同步与一键连接', tone: 'warn' },
          { label: '固定可用平台范围', sub: '无法直接导入小火箭 / OpenClash 等通用端', tone: 'neutral' }
        ],
        note: '适合不愿折腾配置的纯新手；买前需确认商家是否提供你常用的全部系统客户端。'
      }
    ]
  }
}

const currentPreset = PRESETS[props.mode] || PRESETS.tun
</script>

<template>
  <section class="pad-wrap" aria-label="架构与流程示意图">
    <div class="pad-header">
      <span class="pad-chip">架构示意图</span>
      <h3 class="pad-title">{{ props.title || currentPreset.defaultTitle }}</h3>
    </div>
    <div class="pad-lanes">
      <div v-for="lane in currentPreset.lanes" :key="lane.name" class="pad-lane">
        <div class="pad-lane-head">
          <strong>{{ lane.name }}</strong>
          <span class="pad-badge">{{ lane.badge }}</span>
        </div>
        <div class="pad-flow">
          <template v-for="(node, nIdx) in lane.nodes" :key="node.label">
            <div class="pad-node" :class="`pad-node--${node.tone || 'neutral'}`">
              <div class="pad-node-title">{{ node.label }}</div>
              <div class="pad-node-sub">{{ node.sub }}</div>
            </div>
            <div v-if="nIdx < lane.nodes.length - 1" class="pad-arrow" aria-hidden="true">→</div>
          </template>
        </div>
        <p class="pad-note">{{ lane.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pad-wrap {
  margin: 1.25rem 0;
  padding: 1.05rem 1.15rem;
  border-radius: 12px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
}
.pad-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.85rem;
}
.pad-chip {
  display: inline-block;
  padding: 0.14rem 0.55rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  background: var(--kb-bg-blue-soft);
  color: var(--kb-primary);
  border: 1px solid rgba(37, 99, 235, 0.22);
}
.pad-title {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--kb-text);
}
.pad-lanes {
  display: grid;
  gap: 0.85rem;
}
.pad-lane {
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: var(--kb-bg);
  padding: 0.85rem 0.95rem;
}
.pad-lane-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.65rem;
  font-size: 0.88rem;
  color: var(--kb-text);
}
.pad-badge {
  font-size: 0.74rem;
  padding: 0.1rem 0.48rem;
  border-radius: 6px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  color: var(--kb-text-muted);
}
.pad-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.45rem;
}
.pad-node {
  flex: 1 1 135px;
  min-width: 0;
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
}
.pad-node--primary {
  border-color: rgba(37, 99, 235, 0.42);
  background: var(--kb-bg-blue-soft);
}
.pad-node--ok {
  border-color: rgba(5, 150, 105, 0.42);
  background: rgba(5, 150, 105, 0.08);
}
.pad-node--warn {
  border-color: rgba(217, 119, 6, 0.42);
  background: rgba(217, 119, 6, 0.08);
}
.pad-node-title {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--kb-text);
  line-height: 1.35;
}
.pad-node-sub {
  margin-top: 0.2rem;
  font-size: 0.76rem;
  color: var(--kb-text-muted);
  line-height: 1.4;
}
.pad-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--kb-primary);
  font-size: 0.95rem;
  padding: 0 0.1rem;
}
.pad-note {
  margin: 0.6rem 0 0;
  font-size: 0.81rem;
  line-height: 1.55;
  color: var(--kb-text-muted);
}
@media (max-width: 640px) {
  .pad-flow {
    flex-direction: column;
  }
  .pad-arrow {
    transform: rotate(90deg);
    padding: 0.05rem 0;
  }
}
</style>
