---
title: "Clash Verge Rev DNS 设置与 Fake-IP / Redir-Host 分流详解（2026）"
description: "深入解释 Clash Verge Rev 与 Mihomo 内核中的 DNS 解析链路，对比 Fake-IP 与 Redir-Host 优缺点，附可复制 nameserver-policy / fake-ip-filter 配置模板与防 DNS 泄漏测试方法。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge DNS
  - Fake-IP
  - Mihomo
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "Fake-IP 和 Redir-Host 到底选哪个更合适？"
    a: "绝大多数日常用户保持机场订阅默认的 Fake-IP 模式即可，访问海外站点极快且天生防 DNS 污染；仅当特定内网办公客户端、校园网认证或联机游戏反作弊排斥 198.18.0.x 虚拟地址时，优先将相应域名加入 fake-ip-filter，其次才考虑切 Redir-Host。"
  - q: "退出 Clash Verge 后电脑彻底无法解析任何域名（DNS_PROBE_FINISHED_BAD_CONFIG）怎么修复？"
    a: "这是 TUN 模式异常崩溃或强杀进程后网卡 DNS 仍停留在 198.18.0.2 所致。重新打开 Clash Verge 开关一次 TUN 并正常退出即可清理，也可在系统网络适配器中改回「自动获得 DNS 服务器地址（DHCP）」。"
  - q: "打开国内网站（淘宝/网盘/B站）速度明显变慢甚至定位到海外节点怎么办？"
    a: "检查配置中的 default-nameserver 或 nameserver-policy 是否误用 8.8.8.8/1.1.1.1 解析国内域名；应通过 geosite:cn 配置交由国内 DoH（如 223.5.5.5 / 119.29.29.29）负责国内域名解析。"
  - q: "Chrome / Edge 的“安全 DNS (DoH)”会导致 Clash 分流规则失效吗？"
    a: "会部分绕过本地 53 端口劫持，导致 Clash 日志中看到浏览器直接连向加密 DNS 的 IP。关闭浏览器自带安全 DNS，或开启 Mihomo Sniffer 域名嗅探即可恢复按域名准确分流。"
related:
  - title: "TUN 模式开启与排障"
    link: "/guides/clash-verge-tun"
    description: "TUN 模式下如何与 Fake-IP 配合工作。"
    tag: "下一步"
  - title: "Mihomo 内核能力介绍"
    link: "/clash/meta"
    description: "了解 Sniffer 域名嗅探与规则匹配机理。"
    tag: "内核"
  - title: "局部覆写（Merge / Script）配置"
    link: "/articles/clash-verge-override-script"
    description: "安全向所有订阅统一追加自己的 fake-ip-filter 或 nameserver-policy。"
    tag: "高级"
---

# Clash Verge Rev DNS 设置与 Fake-IP 分流详解

<TutorialPage
  quick-answer="绝大多数场景下，保留订阅默认配置的 Fake-IP 模式即可获得最快的网页首屏加载并隔绝本地 DNS 污染。遇到个别局域网域名、校园网认证或游戏联机冲突时，优先使用 fake-ip-filter 放行指定域名；只有在全局工具必须拿到真实 IP 时再切换为 Redir-Host。"
  applies-to="Clash Verge Rev / Mihomo 内核"
  verified-date="2026-11-20"
/>

<ProxyArchitectureDiagram mode="dns" />

## 一、Fake-IP vs Redir-Host 技术维度深度对比

| 对比维度 | Fake-IP（现代主流默认） | Redir-Host（传统真实 IP 映射） |
| :--- | :--- | :--- |
| **本地响应地址** | 立刻分配 `198.18.0.1/16` 保留网段假 IP | 等待本地 DNS 返回真实公网/内网 IP |
| **首屏延迟与速度** | **更快**，省去一次本地跨境 DoH 解析等待 | 偏慢，必须先拿真实 IP 才能触发后续分流判断 |
| **防 DNS 泄漏能力** | **极佳**，海外域名直接随节点隧道送至落地机解析 | 需同时配好 `nameserver-policy` 与 `fallback-filter`，否则仍可能泄漏 |
| **GeoIP 与规则匹配效率** | 几乎只看域名规则（不依赖先查 IP 再倒推） | 对依赖 `IP-CIDR`、`GEOIP` 的规则依赖更强 |
| **典型兼容边界** | 少数内网域名、Steam P2P、游戏反作弊、企业客户端排斥假 IP | 兼容所有需真实 IP 的老软件，但要注意避免 CDN 节点绕远 |

---

## 二、可复制的 Mihomo DNS + Sniffer 覆写参考配置

如果你使用「全局合并配置（Merge）」或自建配置文件，可参考下方的平衡型分段结构：**国内域名用国内 DoH 保持 CDN 最优、海外域名交给 `proxy-server-nameserver` 与远端节点、同时把常见内网与游戏校验域加入 `fake-ip-filter`**：

```yaml
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  # 遇到企业内网或特定服务排斥假 IP 时，先加进此处，不必全局切 Redir-Host
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "localhost.ptlogin2.qq.com"
    - "+.stun.*.*"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  nameserver-policy:
    "geosite:geolocation-!cn":
      - https://1.1.1.1/dns-query#Proxy
      - https://dns.google/dns-query#Proxy

# 建议同步开启 Sniffer：当应用绕过 53 端口直连 IP 时还原真实域名
sniffer:
  enable: true
  parse-pure-ip: true
  sniff:
    TLS:
      ports: [443, 8443]
    HTTP:
      ports: [80, 8080-8880]
```

> 提醒：`nameserver-policy` 中的 `#Proxy`（需与你的代理组名称一致，如 `节点选择`）可确保海外 DNS 查询本身也走代理出去，从根本上避免污染。若不想逐字手写，推荐通过 [Merge 与 Script 覆写模板](/articles/clash-verge-override-script) 动态合并。

---

## 三、DNS 异常与泄漏实操排查命令

### 1. 用命令行快速识别当前解析是否走入了 Fake-IP

在 Windows PowerShell 或 macOS/Linux 终端查询一个海外域名：

```powershell
# 若开启了 TUN + Fake-IP，返回 Address 通常是 198.18.x.x
nslookup github.com
```

- **看到 `198.18.x.x`**：Fake-IP + 本地接管正在正常工作；
- **关闭软件后仍看到 `198.18.x.x` 或根本超时**：说明系统网卡 DNS 残留未清理，请按 FAQ 第 2 条恢复 DHCP；
- **看到明显错误/无法连通的国内 IP（且走直连）**：检查 `browser` 是否自带了安全 DNS 或路由器开启了劫持。

### 2. 检查浏览器「安全 DNS」干扰

在 Chrome 或 Edge 地址栏打开 `chrome://settings/security`（或 `edge://settings/privacy`）：
- 将「使用安全 DNS（DoH）」关闭，交给 Clash Verge 统一分流与域名嗅探；
- 如必须保留浏览器自带 DoH，则务必确保 Mihomo 已启用上方的 `sniffer: enable: true` 配置。

---

## 四、常见 DNS 故障应对表

<TroubleshootingGuide
  title="DNS 解析与国内网速异常排查"
  :cases="[
    {
      symptom: '淘宝、百度网盘、腾讯视频等国内网站明显卡顿或匹配到海外节点',
      cause: '配置里把 8.8.8.8 放在了 nameserver 最前面，导致国内域名拿到海外 CDN 节点 IP，甚至走了国际线路绕回。',
      solution: '确保国内域名（geosite:cn）使用 223.5.5.5 / 119.29.29.29 解析，并检查软件运行模式处于「规则 (Rule)」而非「全局」。'
    },
    {
      symptom: '公司内部域名（*.corp.local）或校园网登录页面打不开',
      cause: '内网地址被 Fake-IP 拦截返回了 198.18.x.x，而公司网关不认假 IP。',
      solution: '在配置覆写中将该内网域名后缀添加到 fake-ip-filter，并在 nameserver-policy 中将其指向公司路由器或内网 DNS IP。'
    },
    {
      symptom: '开启 TUN 后，系统能翻墙但某些小众软件一直报 Host unreachable',
      cause: '软件内置了自己的 DNS 客户端或硬编码直连某个被屏蔽 DNS（如 8.8.8.8:53），没有走系统默认接口。',
      solution: '确认 TUN 设置中已启用 DNS 劫持（dns-hijack: any:53），让所有 53 端口查询都被 Mihomo 内核统一拦截接管。'
    }
  ]"
/>

---

## 五、常见问题（FAQ）

<FAQSection
  title="DNS 与分流 FAQ"
  :items="[
    {
      q: 'Fake-IP 和 Redir-Host 到底选哪个更合适？',
      a: '普通用户和 95% 场景直接用 Fake-IP 最稳最快；只在个别内网工具、游戏反作弊明确不认 198.18.x.x 时，先把那些域名放进 fake-ip-filter，确实不行再切 Redir-Host。'
    },
    {
      q: '退出 Clash Verge 后电脑完全断网、提示 DNS_PROBE_FINISHED_BAD_CONFIG 怎么办？',
      a: '在系统「网络连接」中打开当前网卡（Wi-Fi 或以太网）→ IPv4 属性，确认已切回「自动获得 IP 地址」和「自动获得 DNS 服务器地址」，或者重新启动软件开关一次 TUN 后正常退出即可。'
    },
    {
      q: 'ipv6 建议开启还是关闭？',
      a: '如果当前机场节点不支持 IPv6 出站，而本地宽带却分配了 IPv6，打开网页常因优先尝试失败再回退 IPv4 而卡顿数秒。除非确定节点全链路支持，否则推荐在 DNS 中设置 ipv6: false。'
    },
    {
      q: '什么网站可以用来检测是否存在 DNS 泄漏？',
      a: '保持默认规则访问如 browserleaks.com/dns 或 dnsleaktest.com 查看检测出来的解析服务器地区：正常分流时只应出现你所在本地运营商/国内 DoH 以及海外节点所在地区的出口 DNS。'
    }
  ]"
/>
