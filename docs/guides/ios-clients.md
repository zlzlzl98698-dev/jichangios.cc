---
title: "iOS / iPadOS 代理客户端指南（2026）- 小火箭、Stash、圈 X 与免费替代对比"
description: "详述 iPhone / iPad 客户端选型：准确区分美区 App Store 付费应用（Shadowrocket、Stash、Quantumult X、Surge 5）与免费开源替代（Karing、Streisand、Clash Mi、sing-box SFI、Hiddify），兼顾外区 Apple ID 安全警示与按需连接省电要点。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Shadowrocket
  - iOS 客户端
  - Stash
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "Shadowrocket（小火箭）、Stash 和 Quantumult X 在 App Store 是免费的吗？"
    a: "均不是免费应用。根据美区 App Store 核实记录，Shadowrocket、Stash 与 Quantumult X 均显示为付费应用，Surge 5 含应用内购买；如果不想花钱购买外区 App，可直接选用 Karing、Streisand、Clash Mi、sing-box (SFI) 或 Hiddify 等免费方案。"
  - q: "为了下载小火箭，可以把买来或网上找来的外区 Apple ID 登录在 iPhone「设置 → iCloud」吗？"
    a: "绝对禁止！千万不要在系统设置顶部的 Apple ID / iCloud 登录陌生人提供的共享账号，否则存在远程锁机抹除数据或同步泄漏通讯录照片的极高风险。正确做法是只在「App Store」右上角头像内切换登录你自己注册的外区 ID。"
  - q: "买了付费小火箭后，为什么有些机场的节点还是不能导入？"
    a: "少数机场明确采取「仅限自研客户端、不提供第三方订阅链接」策略，不开放 Shadowrocket/Clash 通用订阅 URL。依赖小火箭或 Stash 的用户，购买机场前必须确认支持第三方订阅导入。"
  - q: "iPhone 开着代理待机特别费电，或者在 Wi-Fi 与 5G 切换时断连怎么优化？"
    a: "推荐在小火箭开启「按需连接（On Demand）」配合规则模式分流国内站点直连；使用 Hysteria 2 等 QUIC 协议或切回 Wi-Fi 时如发现临时假死，在控制中心重连或重开 VPN 开关即可。"
related:
  - title: "Shadowrocket 小火箭规则与按需连接教程"
    link: "/articles/shadowrocket-rules-setup"
    description: "深入配置小火箭白名单/黑名单、按需自动重连与国内直连省电。"
    tag: "专题"
  - title: "手机 VPN 选型建议"
    link: "/vpn/mobile-vpn"
    description: "了解苹果端与安卓端的使用差异。"
    tag: "专题"
  - title: "订阅导入通用说明"
    link: "/clash/verge-subscription"
    description: "搞懂不同订阅参数与格式区别。"
    tag: "订阅"
---

# iOS / iPadOS 代理客户端指南（2026）

<TutorialPage
  quick-answer="iPhone / iPad 通用代理客户端因中国区商店下架规定，通常需在非中国大陆区（如美区/港区）App Store 获取。核实记录显示：Shadowrocket（小火箭）、Stash 与 Quantumult X 均显示为付费应用，Surge 5 含应用内购买；免费客户端可直接选用 Karing、Streisand、Clash Mi、Hiddify 或 sing-box (SFI)。"
  applies-to="iPhone / iPad (iOS 15+ / iPadOS 15+)"
  verified-date="2026-11-20"
/>

## 一、iOS 付费 vs 免费通用客户端完整对照表

| 客户端名称 | 获取渠道 | 商店收费性质（以对应外区 Store 为准） | 核心协议与规则定位 | 适合人群 |
| :--- | :--- | :--- | :--- | :--- |
| **Shadowrocket（小火箭）** | 外区 App Store | **付费应用** | 几乎兼容全协议、导入通用或 Clash 节点，界面直观带连接日志 | **普及度最高，绝大多数 iOS 用户首选** |
| **Stash** | 外区 App Store | **付费应用** | 原生 Clash 风格策略组、规则、Override 覆写 | 电脑重度用 Clash Verge，想同步同套规则的用户 |
| **Quantumult X（圈 X）** | 外区 App Store | **付费应用** | 强规则分流、HTTP 重写、自定义脚本、细粒度 DNS | 喜欢研究脚本去广告/深度折腾分流的玩家 |
| **Surge 5** | 外区 App Store | **含应用内购买** | 顶级网络调试、流量抓包、规则与网关模式 | 开发者与重度专业网络运维人群 |
| **Karing** | 外区 Store / GitHub | **免费** | sing-box 核心，兼容多种机场订阅并支持跨端同步 | **不想花钱买 App 的新手首推免费方案** |
| **Streisand** | 外区 App Store | **免费** | 支持 VLESS / VMess / Trojan / Hysteria 2 等 | 只需干净简洁免费通用订阅与单节点用户 |
| **Clash Mi** | Store / GitHub | **免费开源** | Mihomo 内核，支持原生 Clash YAML | 希望免费体验 Clash YAML 逻辑的用户 |
| **sing-box (SFI)** | 外区 App Store | **免费开源** | 官方主线 sing-box 客户端 | 使用原生态 sing-box JSON 配置文件的进阶玩家 |
| **Hiddify** | 外区 App Store | **免费开源** | 自动择优连接、兼容常见订阅 | 跨平台求简免费替代方案 |

> 旧客户端补充说明：**OneClick、Potatso** 等早年常见工具对 `VLESS-Reality`、`Hysteria 2` 等现代协议支持与分流规则生态已明显落后，不建议作为新购配置主选工具。

---

## 二、安全登录外区 Apple ID 的铁律（必看防锁机）

苹果手机用户最常见的安全事故，就是为了省事从网络寻找“免费共享小火箭账号”并误登错地方：

<TutorialSteps
  heading="安全切换 App Store 账户下载外区应用的正确步骤"
  :steps="[
    {
      title: '1. 自己注册个人外区 Apple ID（最稳妥）',
      detail: '优先使用个人常用邮箱自助注册美区或其他非大陆区 Apple ID，自己掌握密保和双因素认证，避免以后软件更新或换手机受制于他人。'
    },
    {
      title: '2. 只允许登录在「App Store」商店内，严禁登录「设置 → iCloud」',
      detail: '打开蓝色图标的 App Store → 点击右上角个人头像 → 拉到页面最底部点「退出登录」→ 再登录外区 ID。系统总「设置」最上方的个人 Apple ID 必须始终保持你自己的主号，切勿改动！'
    },
    {
      title: '3. 下载完成后即可切回大陆区日常账号',
      detail: '安装完应用后可立即在 App Store 退回自己的国区主账号，并不影响已安装客户端的使用（仅在后续需要更新该外区应用版本时才需再次登录一次对应外区 ID）。'
    }
  ]"
/>

---

## 三、iOS 日常使用、省电与专属客户端提醒

1. **开启“按需连接 + 规则分流”防止待机耗电与断网**：苹果后台机制下，如果所有国内外 App 流量全塞给代理隧道极易加速掉电。可在 [Shadowrocket 规则与按需连接专题](/articles/shadowrocket-rules-setup) 配置完善的国内直连白名单，保持「规则 / 配置」模式而非「全局代理」。
2. **专属客户端与外区 TestFlight 区分**：如果一家机场明确写明“仅支持自研专用客户端、不提供订阅链接”，那么就算你购买了 Shadowrocket 或 Stash 也无法导入它的节点；同时注意部分机场提供的 iOS 专属端可能需要借助 TestFlight 测试名额或企业签安装（企业签存在偶尔掉签风险）。

---

## 四、常见问题（FAQ）

<FAQSection
  title="iOS 客户端常见疑问"
  :items="[
    {
      q: 'Shadowrocket、Stash 和 Quantumult X 在 App Store 是免费的吗？',
      a: '三者在美区 App Store 均显示为付费应用，Surge 5 含应用内购买。想零成本使用可选择 Karing、Streisand、Clash Mi、sing-box (SFI) 或 Hiddify 等免费客户端。'
    },
    {
      q: '为了下载小火箭，可以用淘宝或网上找的共享 Apple ID 登录 iPhone 设置吗？',
      a: '绝对不行！把他人账号登录到系统设置的 iCloud 会导致对方可能远程启用“查找我的 iPhone”直接锁死整台设备，务必只在 App Store 商店右上角切换，且不要用别人可控账号保存个人数据。'
    },
    {
      q: '开启小火箭之后切换成蜂窝数据 (5G) 或进电梯出来网页不动了怎么办？',
      a: 'Wi-Fi 与蜂窝切换时旧连接可能保持半开状态。下拉打开系统或客户端开启「按需连接」，或点击一次重连/重启 VPN 开关即可刷新路由接口。'
    },
    {
      q: 'iPad 买过一次 Shadowrocket，iPhone 同账号还能再免费下载吗？',
      a: '只要两台设备在 App Store 登录的是同一笔已购外区 Apple ID，同一软件无需重复购买即可在关联设备上下载安装。'
    }
  ]"
/>
