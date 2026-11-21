---
title: "Clash 策略组类型详解：select、url-test、fallback 与 load-balance 怎么选（2026）"
description: "解析 Clash / Mihomo 配置文件中四大策略组（手动选择 select、自动测速 url-test、故障转移 fallback、负载均衡 load-balance）的工作机理、tolerance/interval 参数调优及 ChatGPT/Netflix 防风控搭配方案。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash 策略组
  - url-test
  - Mihomo
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "使用 ChatGPT、Claude 或银行网站为什么不能开 url-test 自动选择？"
    a: "因为 url-test 每隔几分钟会并发测速，只要两个节点延迟差超过容差，就会瞬间切换出口国家/ASN IP。对 IP 一致性极度敏感的 AI 服务与金融站点会立刻判定账号异常跳区，触发验证甚至封禁。此类服务务必使用 select 手动锁定单一稳定节点。"
  - q: "url-test 和 fallback 有什么核心区别？"
    a: "url-test 永远抢“延迟最低”的节点，即使当前节点好用也可能会因为旁节点快了 10ms 而跳过去；fallback 则严格“守住第一个还活着”的节点，不到彻底连不上绝不切换，兼顾了固定 IP 与断线灾备。"
  - q: "load-balance（负载均衡）模式平时可以用来看视频或刷网页吗？"
    a: "不建议用于普通网页或任何需要登录账号的网站！默认轮询会让同一个网站的不同图片、API 请求散落到多个不同节点 IP 发出，极易导致登录掉线或触发反爬拦截，仅适合无状态多线程下载或测试场景。"
  - q: "如何在不修改机场原订阅的前提下，调整官方默认的测速频率（interval）与容差（tolerance）？"
    a: "不要直接编辑订阅缓存文件，而是使用 Clash Verge Rev 的 Script 全局覆写脚本，按组名改写 interval 和 tolerance 参数，每次更新订阅都会自动继承你的参数。"
related:
  - title: "全局覆写（Merge 与 Script）实战"
    link: "/articles/clash-verge-override-script"
    description: "通过 JS 脚本自动生成 AI 专用策略组与清洗失效节点。"
    tag: "实战"
  - title: "AI 工具解锁适配对比"
    link: "/comparisons/ai-tools-unlock-comparison"
    description: "了解 AI 平台解锁口径与防风控使用方式。"
    tag: "对比"
  - title: "订阅导入与自动更新教程"
    link: "/guides/clash-verge-subscription-setup"
    description: "掌握新手如何切换组内节点并执行延迟测速。"
    tag: "基础"
---

# Clash 策略组类型详解：select / url-test / fallback / load-balance

<TutorialPage
  quick-answer="日常通用代理推荐把主选择组设为 select（手动）配合 fallback（故障转移）；而访问 ChatGPT、Claude、Gemini、Netflix、PayPal 等强风控或需要固定地区的站点时，切勿把它们放进 url-test 自动测速或 load-balance 轮询，而应单独拆出一组 select 锁定单个稳定新加坡/日本/美国节点。"
  applies-to="Clash Verge Rev / FlClash / OpenClash / Stash"
  verified-date="2026-11-20"
/>

## 一、四大策略组工作逻辑全景对照

| 策略组类型 | 节点切换触发条件 | IP 稳定性 | 容灾自动切换能力 | 推荐业务场景 |
| :--- | :--- | :--- | :--- | :--- |
| **`select`（手动选择）** | **永不自动切**，仅在你界面点击切换时变 | **最高** | 无（节点挂了需要手动换） | **AI 工具（ChatGPT/Claude）、PayPal、流媒体追剧、主控切换组** |
| **`url-test`（自动选择）** | 每隔 `interval` 秒并发测速，取最低延迟且差值超 `tolerance` 时切换 | 较低（会随延迟波动跳转） | **强** | 查文档、Google 搜索、不挑 IP 国家的日常浏览 |
| **`fallback`（故障转移）** | 严格从上到下守住首个通过探测的节点，仅当彻底超时才跳下一个 | **高（平时不乱跳）** | **强** | **既不想节点频繁横跳、又希望主节点断线自动顶上的主力组** |
| **`load-balance`（负载均衡）** | 按轮询（`round-robin`）或哈希将并发连接分散到多个节点 | 极低（轮询会多 IP 并发） | 中 | 仅限无登录态的大文件多线程下载、API 压力测速；**禁用于账号登录/AI** |

---

## 二、典型 YAML 写法与防频繁切换调优

如果你自建配置或用覆写修改策略组，可参考以下标准参数，通过调大 `tolerance`（延迟容差）和 `interval`（测速周期），大幅抑制 `url-test` 的“无意义神经质跳区”：

```yaml
proxy-groups:
  # 1. 主日常入口：嵌套手动、故障转移与地区组
  - name: "🚀 节点选择"
    type: select
    proxies:
      - "🛡️ 故障转移"
      - "⚡ 自动测速"
      - "HK-01"
      - "SG-01"

  # 2. 故障转移：平时守住首选节点，只有彻底不通才跳备用
  - name: "🛡️ 故障转移"
    type: fallback
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    proxies:
      - "HK-01"
      - "SG-01"
      - "JP-01"

  # 3. 稳健型自动测速：每 10 分钟测一次，至少快 80ms 才换节点
  - name: "⚡ 自动测速"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 600
    tolerance: 80
    lazy: true # 平时无流量时暂停后台探测，节省电量和连接数
    proxies:
      - "HK-01"
      - "HK-02"
      - "SG-01"

  # 4. AI 专属手工组：死守单个低风控非香港节点
  - name: "🤖 AI-Dedicated"
    type: select
    proxies:
      - "SG-01"
      - "JP-01"
      - "US-01"
```

---

## 三、两个极易忽视的高级特性

1. **`lazy: true` 惰性测速很重要**：许多机场默认把 `interval` 设得很短且不开启 `lazy: true`，结果即便你半夜睡觉没用代理，客户端后台每两分钟也在向几十个节点批量发测速请求。开启 `lazy: true` 后，只有真正有流量通过该组时才进行周期检测，在笔记本电脑与手机软路由上省电显著。
2. **`load-balance` 如果非要用，请改 `strategy: consistent-hashing`**：至少让同一个目标域名的所有并发请求尽量落在同一个出口节点上，减少网页 CSS/图片资源错位加载；但即便如此，仍不推荐对 AI 和支付页面启用它。

---

## 四、常见问题（FAQ）

<FAQSection
  title="策略组配置 FAQ"
  :items="[
    {
      q: '为什么不能直接拿 url-test 组去跑 ChatGPT 和 Claude？',
      a: '因为只要新加坡 01 延迟 48ms、日本 01 延迟 42ms，url-test 就可能在短短几分钟里把你的会话出口在新加坡和日本之间反复切换，极易触发 AI 服务异常检测弹出验证甚至封号。AI 账号请老老实实使用 select 组固定一个可用地区节点。'
    },
    {
      q: 'url-test 中的 tolerance 参数是什么意思？设为多少合适？',
      a: 'tolerance 表示“触发切换所需延迟优势阈值（毫秒）”。比如设为 80，只有备选节点比当前节点快出至少 80ms 时才会切走；推荐 80–120ms，避免因为几毫秒日常抖动来回切换。'
    },
    {
      q: '机场下发的订阅组里面全是 url-test，怎么批量改成稳妥架构？',
      a: '不要去直接修改缓存 YAML（下次更新会覆盖）。可以在 Clash Verge Rev 编写 Script 覆写，用代码新建 AI-Dedicated（select）策略组并插在 rules 最前面。'
    }
  ]"
/>
