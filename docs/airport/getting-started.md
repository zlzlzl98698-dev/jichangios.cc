---
title: "科学上网零基础入门（2026）- 从原理、选软件到首次连线的完整教程"
description: "写给完全零基础新人的科学上网入门百科：搞懂代理客户端与机场订阅的区别、VLESS/Trojan/Hysteria2 协议常识、各平台软件选择与五步实操连线。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "机场推荐"
tags:
  - 科学上网
  - 新手教程
  - Clash Verge Rev
  - 订阅导入
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "为什么下载安装了 Clash Verge Rev 或 Shadowrocket 之后还是不能直接上 Google？"
    a: "因为 Clash Verge Rev 和 Shadowrocket 只是“客户端软件壳”，本身不包含任何海外服务器节点。您需要先向服务商获取订阅链接（或自建节点）并导入客户端、选中节点且开启「系统代理」开关后才能联网。"
  - q: "机场提供的专属客户端和 Clash 通用客户端有什么不同？"
    a: "专属客户端由服务商自己开发，下载登录后一键可用，但通常无法导入其他家订阅也不支持软路由；Clash/Shadowrocket 属于开源或通用客户端，需要自己复制粘贴订阅链接，但自由度高、可分流、支持多机场随时切换。"
  - q: "手机和电脑可以共用同一个机场账号吗？"
    a: "绝大多数支持通用订阅的机场允许同时在手机和电脑导入同一条订阅链接，具体能同时在线几台设备取决于套餐的设备数限制（很多品牌标注个人自用不限设备数，但禁止多人公开合租）。"
related:
  - title: "新手五步帮助中心"
    link: "/resources/beginner-help"
    description: "汇总新手必懂词汇与第一步决策清单。"
    tag: "帮助"
  - title: "Clash Verge Rev Windows 安装教程"
    link: "/guides/clash-verge-windows"
    description: "完成概念入门后的电脑端安装第一步。"
    tag: "Windows"
  - title: "iOS / Android 手机端指南"
    link: "/vpn/mobile-vpn"
    description: "了解苹果外区下载提示与安卓避坑提醒。"
    tag: "移动端"
---

# 科学上网零基础入门（2026）：完整概念与首次配置教程

<TutorialPage
  quick-answer="科学上网的运转靠两件东西配合：「代理客户端软件」（相当于播放器）+「节点订阅配置」（相当于片源）。第一步按你的设备从官方渠道装好通用客户端（电脑推荐 Clash Verge Rev，安卓推荐 FlClash/v2rayNG，iPhone 推荐 Shadowrocket 或免费替代 Karing）；第二步导入服务商提供的订阅链接、选一个低延迟地区节点并保持「规则模式」，打开系统代理即可开始使用。"
  applies-to="Windows / macOS / iPhone / iPad / Android / Linux 零基础用户"
  verified-date="2026-11-20"
/>

## 一、零基础必须先弄懂的五个核心概念

### 1. 客户端软件 vs 机场节点（不要混为一谈）
- **代理客户端**：负责在你的电脑或手机上接管网络请求、判断哪些网址需要走海外代理、并加密打包转发的本地工具。例如电脑端的 **Clash Verge Rev**、安卓端的 **v2rayNG / FlClash**、iOS 端的 **Shadowrocket（小火箭）**，软件本身大多免费开源（iOS 部分软件在 App Store 收费）。
- **节点订阅（机场服务）**：在海外部署的代理中转服务器群。服务商通过一条 `https://...` 开头的**订阅链接（Subscription URL）**把几十个香港、日本、新加坡、美国节点下发到你的客户端里。

### 2. 什么是“机场”？为什么叫这个名字？
早期基于 Shadowsocks 的客户端图标是一架小飞机，后来专门提供多地区节点订阅的服务商就被大家习惯性称为“机场”，每一台海外代理线路服务器则叫作“节点”。

### 3. 常见协议（VLESS / Trojan / Hysteria 2 / Shadowsocks）是什么？
它们代表客户端与服务器之间暗号与加密传输的格式规范。目前现代机场主流使用 **VLESS（含 Reality）**、**Trojan** 与 **Hysteria 2**。正因为这些新协议出现得比老版 Clash 更晚，**新手千万不要再去找老旧的 Clash for Windows，请直接使用内置 Mihomo 核心的 Clash Verge Rev 或基于 sing-box 的 Karing/Hiddify**。

### 4. 规则模式（Rule）vs 全局模式（Global）
- **规则模式（日常必选）**：客户端内置了一份“中国大陆域名与 IP 白名单”。打开淘宝、微信、B站、网银时直接走本地宽带不绕路也不扣流量；只有访问 Google、GitHub、ChatGPT、Netflix 等海外域名时才走代理节点。
- **全局模式（仅排查用）**：把所有网络请求一股脑全发去海外节点，会导致国内网页变慢并消耗大量付费流量。

### 5. 通用订阅模式 vs 服务商专属客户端
在选购节点服务前一定要看清：
- **通用订阅模式**：官网提供一条 Clash 或通用订阅链接，你可以自由在电脑 Clash Verge、手机小火箭、甚至家里 OpenWrt 软路由上通用；
- **专属客户端模式**：服务商只让你下载它自己封装的 App 登录即连，**不提供订阅链接**。虽然省去了导入订阅这一步，但无法使用开源软件和软路由。

## 二、不同设备应该安装什么官方软件？

| 你的设备 | 推荐安装的通用客户端 | 官方获取途径与提示 |
| :--- | :--- | :--- |
| **Windows 10/11** | **Clash Verge Rev** / v2rayN / FlClash | 从 GitHub 官方 Releases 下载（核对 x64/arm64） |
| **macOS 苹果电脑** | **Clash Verge Rev** / FlClash / Surge Mac | 从 GitHub 下载（M 芯片选 `aarch64.dmg`，Intel 选 `x64.dmg`） |
| **iPhone / iPad** | **Shadowrocket / Stash**（付费）或 **Karing / Streisand / Clash Mi**（免费） | 需使用非中国大陆区 Apple ID 登录 App Store 下载（切勿在系统 iCloud 登录共享号） |
| **Android 安卓** | **v2rayNG / FlClash / Hiddify / Karing** | 从 GitHub 官方 Releases 下载 APK（不要下载 Play 商店假冒 NekoBox） |
| **OpenWrt 软路由** | **OpenClash / PassWall2 / Nikki / HomeProxy** | 需核对系统版本与防火墙类型；Nikki 明确要求 OpenWrt 24.10+ |

## 三、首次配置标准五步全流程

<TutorialSteps
  heading="第一次从零完成科学上网连线"
  :steps="[
    { title: '1. 下载并安装对应平台的官方客户端', detail: '参考上表获取正版开源或商店软件。Windows 若遇 SmartScreen 弹窗点「更多信息 → 仍要运行」；macOS 若提示已损坏则在终端清除 quarantine 隔离属性。', tip: '详细安装指引可直接查看 Clash Verge Windows/macOS 安装教程。' },
    { title: '2. 准备一条有效订阅链接（或检查专属 App）', detail: '登录您选定的节点服务面板，找到「复制 Clash 订阅链接」（URL 通常以 https:// 开头带有 token/code 参数）。' },
    { title: '3. 将订阅 URL 导入客户端并刷新', detail: '打开 Clash Verge Rev → 左侧点击「配置」→ 粘贴链接到顶部输入框 → 点击「导入」→ 等待下方卡片显示套餐流量与节点数，并点选该卡片使其激活。' },
    { title: '4. 测试节点延迟并挑选地区', detail: '切换到左侧「代理」页，确保顶部运行模式处于「规则 (Rule)」。点击策略组旁的测速按钮，选择香港、日本或新加坡等延迟较低且绿灯正常的节点（使用 ChatGPT/Gemini 时建议固定选新加坡/日本/美国节点）。' },
    { title: '5. 打开「系统代理」开关并验证网页访问', detail: '前往左侧「设置」打开「系统代理」开关，然后打开浏览器访问国际网页验证；若命令行终端或游戏也要走分流，再安装「服务模式」并打开「TUN 模式」。' }
  ]"
/>

## 四、新手连不上网？先看这三条排查顺序

1. **电脑时间差超过 1 分钟**：VLESS/Trojan 节点对系统时钟要求严格，打开系统「自动同步时间」往往立刻从全红 Timeout 恢复正常；
2. **忘记选中配置或忘记开系统代理**：导入订阅后一定要点击一下配置卡片让它变成高亮激活状态，并在设置开启「系统代理」；
3. **软件内已直连模式**：检查「代理」页面顶部是不是误点成了 `直连 (Direct)`。

更多报错日志定位请直达：[Clash 故障排查中心](/clash/troubleshooting)。

## 五、常见问题（FAQ）

<FAQSection
  title="科学上网入门常见问答"
  :items="[
    { q: '为什么下载安装了 Clash Verge Rev 或 Shadowrocket 之后还是不能直接上 Google？', a: '因为 Clash Verge Rev 和 Shadowrocket 只是“客户端软件壳”，本身不包含任何海外服务器节点。您需要先向服务商获取订阅链接（或自建节点）并导入客户端、选中节点且开启「系统代理」开关后才能联网。' },
    { q: '机场提供的专属客户端和 Clash 通用客户端有什么不同？', a: '专属客户端由服务商自己开发，下载登录后一键可用，但通常无法导入其他家订阅也不支持软路由；Clash/Shadowrocket 属于开源或通用客户端，需要自己复制粘贴订阅链接，但自由度高、可分流。' },
    { q: '手机和电脑可以共用同一个机场账号吗？', a: '绝大多数支持通用订阅的机场允许同时在手机和电脑导入同一条订阅链接，具体能同时在线几台设备取决于套餐的设备数限制。' }
  ]"
/>

<ClusterDirectory topic-link="/airport/getting-started" />
