---
title: "Mihomo Rule Provider 与二进制规则集 MRS 配置指南（2026）"
description: "解析 Clash Meta (Mihomo) 内核的 Rule Provider 机制与 .mrs 二进制规则集优势，解决万行明文规则启动卡顿、内存占用过高的问题，附可复制 yaml/text/mrs 配置写法与更新排查。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Rule Provider
  - Mihomo
  - Clash Meta
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "为什么传统的万行 rules 配置越来越被 Rule Provider 淘汰？"
    a: "把数万条规则全塞在主 YAML 文件的 rules 数组里会导致订阅体积动辄好几 MB，客户端冷启动解析耗时数秒、内存开销显著膨胀，而且每次只为改几条域名就要整份重下。Rule Provider 将规则拆分外部按需定时增量更新。"
  - q: ".mrs 格式跟 .yaml / .text 规则集核心优势是什么？"
    a: ".mrs 是 Mihomo 内核专门推出的二进制前缀树（Trie）规则格式，文件体积更小、客户端启动读取几乎零解析开销、内存中以紧凑结构存储，在低内存软路由和移动端尤其明显。"
  - q: "为什么 IP 类规则集（behavior: ipcidr）强烈建议在 rules 里加上 ,no-resolve？"
    a: "如果规则是 IP 段且没有 no-resolve，Mihomo 会在仅仅匹配一条域名请求时被迫先做一次本地 DNS 解析拿到 IP 才能对比 CIDR，这不仅拖慢网页速度，而且对依赖 Fake-IP 远端解析的站点容易造成本地 DNS 泄漏。"
  - q: "Rule Provider 的远程规则一直更新下载失败（超时的红字日志）怎么解决？"
    a: "国内直连拉取 GitHub/CDN 上的规则集偶发被阻断。在 rule-providers 对应条目下增加 proxy: 🚀 节点选择（与主选择组名称一致），或将 URL 替换为可靠镜像/确认 Clash Verge 允许代理更新即可。"
related:
  - title: "Clash Verge 全局覆写实战"
    link: "/articles/clash-verge-override-script"
    description: "学习通过 Merge/Script 向任何机场订阅注入 Rule Provider。"
    tag: "实战"
  - title: "Clash Meta (Mihomo) 内核解析"
    link: "/clash/meta"
    description: "了解 Mihomo 内核的其它核心特性。"
    tag: "内核"
  - title: "DNS 设置与 Fake-IP 原理"
    link: "/guides/clash-verge-dns"
    description: "理清规则匹配顺序与 no-resolve 对 DNS 解析的影响。"
    tag: "DNS"
---

# Mihomo Rule Provider 与二进制规则集 (.mrs) 配置指南

<TutorialPage
  quick-answer="当分流规则膨胀到数万条时，直接把规则塞进 YAML 的 rules 列表会导致客户端启动慢、内存飙升。Mihomo 内核提供的 rule-providers 支持远程按周期增量拉取，且配合紧凑的 .mrs 二进制规则格式可以实现毫秒级加载与极低内存占用。"
  applies-to="Clash Verge Rev / FlClash / OpenClash / Nikki (Mihomo 内核)"
  verified-date="2026-11-20"
/>

## 一、`yaml`、`text` 与 `mrs` 三种规则集格式对照

| `format` 类型 | 存储形态 | 加载速度与内存开销 | 适用客户端范围 |
| :--- | :--- | :--- | :--- |
| **`yaml`** | 传统 YAML 列表（带 `- DOMAIN-SUFFIX,...`） | 体积大，纯文本反序列化慢、内存占用高 | 兼顾老版 Clash 内核与所有现代 Mihomo 客户端 |
| **`text`** | 纯文本每行一条域名或 CIDR（如 `+.openai.com`） | 体积比 YAML 小约 30%–40% | 仅限 Mihomo (`Clash.Meta`) 系列内核 |
| **`mrs`（首选）** | Mihomo 预编译二进制前缀树格式 | **体积极小、加载近乎毫秒级、低内存软路由友好** | **现代 Mihomo 内核（Clash Verge Rev / FlClash / OpenClash / Nikki）** |

> 注意：`behavior`（规则行为类型）必须与规则内容严格匹配，常见三种：`domain`（纯域名树）、`ipcidr`（纯 IP 段）、`classical`（混合写法如 `PROCESS-NAME` / `DOMAIN-KEYWORD`，注意 `classical` 目前不打包为 `.mrs`）。

---

## 二、标准可复制 `rule-providers` + `RULE-SET` 模板

通过「全局 Merge 覆写」或自定义配置声明规则集后，在 `rules`（或 `prepend-rules`）中用 `RULE-SET` 引用（将目标策略组名改为你配置中实际存在的名字）：

```yaml
rule-providers:
  # 1. 私网段二进制集合（强烈推荐）
  private_ip:
    type: http
    behavior: ipcidr
    format: mrs
    url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/private.mrs"
    path: ./ruleset/private_ip.mrs
    interval: 86400

  # 2. 国内常见直连域名二进制集合
  cn_domain:
    type: http
    behavior: domain
    format: mrs
    url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs"
    path: ./ruleset/cn_domain.mrs
    interval: 86400

  # 3. 国内 IP 段二进制集合
  cn_ip:
    type: http
    behavior: ipcidr
    format: mrs
    url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs"
    path: ./ruleset/cn_ip.mrs
    interval: 86400

rules:
  - RULE-SET,private_ip,DIRECT,no-resolve
  - RULE-SET,cn_domain,DIRECT
  - RULE-SET,cn_ip,DIRECT,no-resolve
```

---

## 三、编写规则顺序与性能避坑三条铁律

1. **所有 `ipcidr` 类 `RULE-SET` 后必须加 `,no-resolve`（除非你非常明确必须先查真实 IP）**：
   - **原因**：流量进来匹配到 `RULE-SET,cn_ip,DIRECT` 时如果忘了写 `no-resolve`，即使用户开启 Fake-IP，内核也不得不中断并先在本地发起一次 DNS 查询，白白增加延时，还可能导致域名被提前在本地泄漏解析；
   - **正确顺序**：**先放域名类规则（`DOMAIN` / `cn_domain`），再放带 `no-resolve` 的 IP 段规则（`cn_ip`），最后 `MATCH` 兜底**。
2. **注意 `proxy` 拉取通道避免规则集死锁**：
   - 在网络受限环境下，可以在对应的 `rule-provider` 条目中添加 `proxy: 🚀 节点选择`，告诉内核通过代理组更新规则集；但注意若所有节点都还没拉通时的冷启动阶段，`jsdelivr` 等可用国内镜像源通常更稳。
3. **软路由低内存注意清理过期 `ruleset/` 缓存**：
   - `path: ./ruleset/xxx.mrs` 会把规则持久化存盘，重命名规则名后旧文件名会保留在配置文件夹中，可在客户端缓存清理或目录里适时整理。

---

## 四、常见问题（FAQ）

<FAQSection
  title="Rule Provider 与 .mrs FAQ"
  :items="[
    {
      q: '为什么要用 .mrs 替代传统把几万行 rules 写死在配置文件里？',
      a: '.mrs 是二进制前缀树结构，体积更小、无需启动时逐行文本正则/字符串解析，在内存只有一两百 MB 的嵌入式路由器或手机端都能毫秒级加载完数十万域名。'
    },
    {
      q: 'Rule Provider 的 behavior 字段选错会怎样？',
      a: 'Mihomo 内核重载配置时会直接报错退出解析（例如把包含 PROCESS-NAME 的列表标成 domain）。纯域名文件写 domain，纯 IP 段写 ipcidr，混合规则语法只能用 classical（配合 yaml/text）。'
    },
    {
      q: 'rules 里面的 ,no-resolve 参数到底加在哪里？',
      a: '只加在 IP 类规则结尾（包括 IP-CIDR、GEOIP 以及 behavior 为 ipcidr 的 RULE-SET），如 RULE-SET,cn_ip,DIRECT,no-resolve；纯域名 RULE-SET 不需要也不触发 DNS 解析。'
    }
  ]"
/>
