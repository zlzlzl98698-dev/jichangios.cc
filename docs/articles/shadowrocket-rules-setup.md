---
title: "iPhone Shadowrocket（小火箭）规则分流、按需连接与防断流完整配置教程（2026）"
description: "详述 iPhone / iPad Shadowrocket（小火箭）导入订阅、配置“全局路由：配置 (Config)”国内直连规则、启用按需连接（On Demand）防 Wi-Fi 切 5G 断流及省电设置，附 ChatGPT 节点挑选与版本升级提示。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "VPN 与加速器"
tags:
  - Shadowrocket
  - iOS 客户端
  - 规则分流
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "Shadowrocket 开启后应该选择「全局路由：配置」还是「代理」？"
    a: "日常固定必须选「配置（Config）」！如果停留在「代理」，意味着微信图片、淘宝视频、国内百度网盘也会绕去海外节点再转回来，不仅极其费电还会把手机国内网速拖慢并白耗机场流量。"
  - q: "从家里 Wi-Fi 出门切换成 5G 数据后，顶部 VPN 图标明明还在却打不开外网怎么办？"
    a: "在 Shadowrocket 底部「设置 → 按需连接（On Demand）」开启总开关；遇到网络接口切换（Wi-Fi ↔ 蜂窝）时 iOS 系统会自动触发底层通道重连刷新，告别锁屏和出门假死。"
  - q: "用 Shadowrocket 访问 ChatGPT / Claude App 经常提示风险拦截或地区不支持怎么办？"
    a: "1. 确保规则将 openai.com / anthropic.com 等域名匹配到非香港海外节点；2. 不要开着“随机/自动延迟切换”来回跳地区；3. 若连机场普通香港节点提示不可用，手动选新加坡、日本或美国节点固定连接。"
  - q: "导入新机场节点后报错 Protocol not supported 或连不上 VLESS-Reality / Hysteria 2 怎么回事？"
    a: "多是因为手机里装的是多年前老版本 Shadowrocket。请用你当初已购买该软件的同个外区 Apple ID 登录 App Store，检查更新至最新版本后再重新刷新订阅。"
related:
  - title: "iOS / iPad 客户端详细指南"
    link: "/guides/ios-clients"
    description: "对比小火箭、Stash、Quantumult X 付费情况与免费替代。"
    tag: "iOS"
  - title: "手机 VPN 移动端优化"
    link: "/vpn/mobile-vpn"
    description: "了解外区 Apple ID 下载安全规范（严禁登录系统 iCloud）。"
    tag: "专题"
  - title: "Clash Verge 订阅参数解读"
    link: "/clash/verge-subscription"
    description: "搞懂为什么部分仅专属端机场无法导入小火箭。"
    tag: "订阅"
---

# iPhone Shadowrocket（小火箭）规则分流、按需连接与防断流教程

<TutorialPage
  quick-answer="装好 Shadowrocket 后最忌讳长期开在「全局路由：代理」模式（耗电且让微信/淘宝绕远）。正确配置顺序是：1. 首页将「全局路由」切换为「配置（Config）」并选用含国内直连的分流规则；2. 在「设置 → 订阅」打开自动更新；3. 在「设置 → 按需连接」开启自动重连，彻底治好熄屏与 Wi-Fi 切 5G 断流。"
  applies-to="iPhone / iPad (iOS 15+ / iPadOS 15+)"
  verified-date="2026-11-20"
/>

## 一、三步规范导入订阅并开启自动刷新

<TutorialSteps
  heading="Shadowrocket 初次导入与定时维护步骤"
  :steps="[
    {
      title: '1. 复制兼容订阅（确认机场支持第三方通用订阅）',
      detail: '登录服务商面板，复制「Shadowrocket 订阅链接」或「通用订阅地址」。注意如服务商明确只给自研专用端不开放订阅链接，则小火箭无法导入。'
    },
    {
      title: '2. 粘贴或扫描一键导入',
      detail: '打开小火箭首页 → 点击右上角 + 号 → 类型保留默认 Subscribe → 将链接粘贴到 URL 栏，备注写上品牌名称方便区分多条备用订阅 → 点右上角「保存」。也可在机场官网直接点“一键导入 Shadowrocket”。'
    },
    {
      title: '3. 配置“打开时更新订阅”避免手动刷新繁琐',
      detail: '进入底部「设置 → 订阅」：打开「打开时更新」开关；如果有节点维护变更，每次打开 App 即可自动同步新节点列表，无需反复左滑删改。'
    }
  ]"
/>

---

## 二、最核心设置：看懂首页「全局路由」四种模式

很多新手买完流量包一个月跑掉几百 GB、手机一天两充，90% 是不小心选错了全局路由：

| 全局路由模式 | 流量调度逻辑 | 对国内 App（微信/抖音/淘宝）的影响 | 建议用途 |
| :--- | :--- | :--- | :--- |
| **`配置（Config）`（唯一推荐日常使用）** | 按生效规则表精准分流：**国内域名直连、海外与被屏蔽站点走节点** | 无感知、全速直连不耗任何机场流量 | **99% 日常长期保持此模式** |
| **`代理（Proxy）`** | 所有流量一刀切走代理节点 | 极大拖慢国内软件、极度耗电、疯狂消耗订阅流量 | 仅用于排查某个特定规则是否写漏 |
| **`直连（Direct）`** | 所有连接跳过节点直接出网（仅充当本机 DNS/统计壳） | 同未开代理 | 临时测试本地带宽环境 |
| **`场景（Scene）`** | 根据不同 Wi-Fi 名称（SSID）或 5G 状态自动切模式/节点 | 可做到“连公司 Wi-Fi 用代理、连家里软路由 Wi-Fi 全直连” | 多环境老手自动化神技 |

> 如何检查是否已有分流规则？点击小火箭底部「**配置（Config）**」栏，确认上方“本地文件”里已选中且应用了一套规则配置（如默认 `default.conf` 已含基础中国直连 IP/域名规则，或点击「使用配置」加载开源规则配置）。

---

## 三、开启「按需连接（On Demand）」告别切网假死与省电

iOS 的 NetworkExtension 机制在手机从室内 Wi-Fi 走出门切换 5G 蜂窝网络、或从隧道/地铁出来时，常会让老 VPN 连接挂在半死状态，表现就是图标还在、网页就是转圈。

### 开启与高级「家里直连、出门自动连」技巧：
1. 进入小火箭底部「**设置 → 按需连接（On Demand）**」；
2. 打开最上方 **「按需连接」** 开关（可同时勾选按需自动启动，注意按需打开后在系统「设置 → VPN」内手动关闭可能会被自动拉起，要彻底关掉请先回小火箭首页关闭总开关）；
3. **软路由家庭用户专享省电技巧**：如果家里路由器已经配置好了 OpenClash 透明代理，点击「**仅直连 SSID / 连接规则**」把自家 Wi-Fi 名称填进去设为 `Disconnect`（断开）；以后一进家门自动断掉手机小火箭省电直享家庭高速网络，一出门脱离 Wi-Fi 自动在后台秒挂 5G 代理。

---

## 四、使用 AI 工具、现代协议与防封号注意事项

1. **AI（ChatGPT / Claude / Gemini）稳定使用习惯**：在小火箭首页点击节点右侧「连通性测试」选出低延迟可通节点后，保持使用新加坡、日本或美国等合规支持地区节点即可，**尽量不要开启首页“负载均衡”或频繁切换不同国家节点**；
2. **协议支持升级提醒**：如果新订阅里带 `VLESS-Reality` 或 `Hysteria 2` 节点无法连接，请用你当初购买小火箭的同一个外区 Apple ID 登录 **App Store** 将 Shadowrocket 更新至最新版（切记：**只登录在 App Store 商店内，严禁在系统设置 iCloud 登录共享未知账号**，防锁机风险详见 [iOS 客户端安全指南](/guides/ios-clients)）。

---

## 五、常见问题（FAQ）

<FAQSection
  title="Shadowrocket 小火箭使用 FAQ"
  :items="[
    {
      q: 'Shadowrocket 开启后应该选择「全局路由：配置」还是「代理」？',
      a: '日常务必选「配置（Config）」。选「代理」会让所有国内视频、图片和微信消息全部先绕出国外节点，不仅网速慢、耗手机电量，而且极度浪费每月套餐流量。'
    },
    {
      q: '切换 Wi-Fi 与 5G 时 VPN 图标仍在但网页加载不出怎么解决？',
      a: '开启「设置 → 按需连接」后会自动重建底层隧道；若偶发卡在旧连接，回小火箭首页关开一次大开关或使用带“按需规则”的规则集即可刷新。'
    },
    {
      q: '小火箭测速界面显示延迟很大，甚至部分超时，但实际上网还能打开？',
      a: '在「设置 → 测速方法」里，TCP 测速与 CONNECT/ICMP（URL 测试）结果差异很大。建议在设置把测速方法设为 CONNECT（HTTPS 真实握手测速），测出的毫秒数和实际可用性最贴近。'
    }
  ]"
/>
