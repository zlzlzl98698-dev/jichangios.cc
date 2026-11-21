---
title: "Firefly 萤火虫独立评测（2026）- IPLC 原生 IP、专属端转向与实体合并审计"
description: "独立评测 Firefly 萤火虫机场：公开记录原始清单重复条目去重过程、IPLC+VLESS 原生 IP 优势、2026 年 10 月起停供第三方订阅转纯专属端限制、支付宝/USDT 支付及与微风/飞鸟同系渊源。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "独立评测"
tags:
  - Firefly评测
  - 萤火虫机场
  - IPLC专线
author: "机场苹果编辑部"
pageType: review
searchIntent: investigational
draft: false
affiliateDisclosure: true
brandSlugs:
  - firefly
sources:
  - 32家机场品牌清单.txt
faq:
  - q: "Firefly 萤火虫以前是不是可以导入 Clash，现在为什么不行了？"
    a: "是的。根据最新核实记录，Firefly 自 2026 年 10 月起全面停供第三方订阅链接，现阶段仅允许使用官方自研专属客户端账号登录，无法再导进 Clash Verge Rev、Shadowrocket 或 OpenWrt 软路由。"
  - q: "优惠码 firefly（8折）可以用在 ¥96 年付版上吗？"
    a: "明确不能。品牌规则写明新用户 8 折码 firefly 不适用于年付版（年付版为 ¥96/年，每月 60GB），仅能用于 Lite/Plus/Blaze/Nova 等正价或月付档位。"
  - q: "什么是“同系关系”？为什么本站特别提示 Firefly 与微风、飞鸟、一云梯同系？"
    a: "历史品牌库档案明确记载 Firefly 与微风、飞鸟、一云梯存在同一团队/关联后台同系背景。如果用户想要搭建“主机场 + 备用机场”跨供应商防风险方案，切忌把主用和备用都买在同一个技术/运维体系里。"
  - q: "Firefly 的支付方式有什么限制？有微信支付吗？"
    a: "历史资料明确记录仅支持支付宝与 USDT，不支持微信支付；但具体实时支付渠道仍以结算收银台当前显示为准。"
related:
  - title: "微风网络独立评测"
    link: "/reviews/weifeng"
    description: "查看同一关联体系内另一品牌（IEPL + VLESS）的口径核实。"
    tag: "同系"
  - title: "专属客户端 vs 通用订阅机场对照"
    link: "/comparisons/dedicated-client-vs-third-party"
    description: "对比 2026.10 收紧订阅后各家品牌的客户端格局。"
    tag: "对比"
  - title: "Firefly 萤火虫品牌档案"
    link: "/brands/firefly"
    description: "查看各档月付、不限时包与官方条款提示。"
    tag: "档案"
---

# Firefly 萤火虫独立评测（2026）

<ReviewPage
  slug="firefly"
  verdict="Firefly 萤火虫定位 IPLC 专线 + VLESS 协议与原生 IP 解锁，提供免翻墙直连官网与 7×24 在线客服（夜间 AI 值守），2026-10-19 非晚高峰香港实测 27ms / 547Mbps、新加坡 445Mbps、美国 30Mbps（同批偏高）。硬性制约在于：2026 年 10 月起已停供第三方订阅仅限自研客户端、历史记录不支持微信支付，且经本站合并去重审计并注明其与微风/飞鸟/一云梯同系。"
/>

<BrandInfrastructureSnapshot slug="firefly" />

## 一、实名去重审计与同系情报（透明披露）

在全面盘点原始《32家机场品牌清单.txt》时，本站发现两条指向同一主体的重复记录并做了规范合并：
1. **清单主项 `## 8. Firefly（firefly）`**：含 2026-10-19 基准测速与主体价格；
2. **清单文末历史条目 `Firefly 萤火虫`**：含 2026-08-09 品牌库历史档案、同系背景及免翻墙特性。

两者核对结果：**官网域名、Lite/Plus/Blaze/Nova/年付版/不限时完整套餐价格表，以及 8 折优惠码 `firefly`（年付版不适用）完全一致**。本站据此合并为单一权威实体，并将历史条目中两条关键一手情报并入风险提示：
- **关联体系警示**：历史档案记录 Firefly 与 **微风、飞鸟、一云梯** 存在明确同系关系——做双机场容灾防断网备份时应避开同一体系内部互备；
- **客户端模式转向**：2026 年 10 月起全面转为仅支持专属客户端登录，不再向外提供订阅链接。

---

## 二、分场景实态与 2026-10-19 测速解读

<NetworkPerformanceReport slug="firefly" />
<StreamingAvailabilityMatrix slug="firefly" />

| 评估维度 | 实态说明 | 评测结论 |
| :--- | :--- | :--- |
| **速度基准（10-19 非晚高峰）** | 香港 `27ms / 547Mbps`、新加坡 `42ms / 445Mbps`、**美国 `143ms / 30Mbps`** | 亚太主力表现稳健，美国下载相对同批不少 `14–19Mbps` 的品牌更高一截 |
| **原生 IP 与流媒体 / AI** | 主打原生 IP；清单支持 Netflix / Disney+ / ChatGPT / Claude | 常规流媒体与 AI 覆盖不错，但 **Gemini 仍标“视节点而定”** |
| **客户端与软路由** | **2026.10 起仅专属端**，无订阅 URL | 完全无缘 Clash Verge Rev / 小火箭 / OpenWrt 软路由 |
| **客服与官网访问** | 免翻墙直连官网 + 7×24 客服（夜间 AI 值守） | 遇到官网被阻或突发断连时沟通查找成本更低 |

---

## 三、套餐结构、优惠限制与替代建议

<BrandPricingTable slug="firefly" />

- **宣传用语与真实限制区分**：品牌资料所称“不限速”“8 年资深技术团队”等属于 `vendor_claimed` 自述口径（且站端本身当前上线年份并未如光速云/星岛梦般明确单列）；
- **支付与优惠门槛**：历史资料标明支持 **支付宝、USDT**（不支持微信），新用户 8 折码 `firefly` 仅限非年付常规套餐，**¥96 年付版不适用**；如需先试跑一个月，建议看 **Lite 月付（¥25/月，配合 8 折码实付可降低体验门槛）**；
- **同梯队开放订阅替代参照**：如果你看重同价位原生/专线体验但坚持需要 **Clash / 小火箭通用订阅**，建议对比 [光速云评测](/reviews/guangsuyun) 或 [唯兔云评测](/reviews/weitu)。

---

## 四、常见问题（FAQ）

<FAQSection
  title="Firefly 萤火虫评测 FAQ"
  :items="[
    {
      q: 'Firefly 萤火虫支持导入 Clash Verge Rev 或 Shadowrocket 吗？',
      a: '不支持。最新资料明确显示自 2026 年 10 月起不再提供第三方订阅链接，只能下载使用官方自研专属客户端。'
    },
    {
      q: '8 折优惠码 firefly 为什么在年付版结算用不了？',
      a: '品牌优惠规定明确写着“年付版不适用”，该 8 折新用户折扣仅能用在标准月付/多周期等正价档位。'
    },
    {
      q: '怎么理解本站提示的“和微风、飞鸟同系”？',
      a: '在多机场备用场景中，同系品牌可能共享部分上游线路或运维策略。如果您已经买了 Firefly 作主力，备用机场最好跨体系挑选如光速云、星岛梦或一翻云，分散风险效果才真正成立。'
    }
  ]"
/>
