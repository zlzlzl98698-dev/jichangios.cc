---
title: "Clash 使用教程大全（2026）- 运行模式、策略组、DNS 与 TUN 实战指南"
description: "Clash Verge Rev 日常使用全攻略：规则/全局/直连三大模式边界、select/url-test/fallback 策略组搭配、Fake-IP DNS 防泄漏及 TUN 虚拟网卡实操。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash 使用教程
  - TUN 模式
  - DNS 设置
  - 策略组
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "日常用“规则模式”还是“全局模式”？"
    a: "日常 95% 场景请固定使用「规则（Rule）」模式，保证国内网站直连高速、海外网站走节点分流；「全局（Global）」仅在怀疑规则漏配时临时用来对比排查。"
  - q: "为什么用 ChatGPT 或 Claude 时总提示账号异常或需要频繁验证？"
    a: "很可能是策略组使用了 url-test 自动测速或 load-balance 负载均衡，导致出口 IP 在香港、日本、新加坡之间频繁切换。AI 服务请改用 select 手动策略组并锁定到固定新加坡/日本/美国节点。"
  - q: "开了系统代理，为什么命令行 git / curl / Docker 还是直连或超时？"
    a: "多数 CLI 工具和开发软件默认不读取系统代理。只需安装 Service Mode 服务模式并开启「TUN 模式」，或在终端导出 127.0.0.1:7897 环境变量即可解决。"
related:
  - title: "DNS 分流与 Fake-IP 原理"
    link: "/guides/clash-verge-dns"
    description: "深入理解 Fake-IP 与 Redir-Host 适用边界。"
    tag: "DNS"
  - title: "TUN 模式开启与冲突排查"
    link: "/guides/clash-verge-tun"
    description: "Service Mode 安装及与加速器虚拟网卡冲突解决。"
    tag: "TUN"
  - title: "四大策略组类型详解"
    link: "/articles/clash-verge-proxy-groups-explained"
    description: "搞懂 select / url-test / fallback / load-balance。"
    tag: "策略"
---

# Clash 使用教程大全（2026）

<TutorialPage
  quick-answer="装好 Clash Verge Rev 并导入订阅后，日常使用只需掌握四件事：1. 顶部模式始终保持「规则（Rule）」；2. 网页浏览开「系统代理」，终端/开发/全机流量开「服务模式 + TUN」；3. 对 IP 敏感的 AI 与流媒体使用「手动 select 策略组」固定单一地区节点；4. 用 Merge/Script 覆写保护你的自定义规则不被自动更新冲掉。"
  applies-to="Clash Verge Rev / FlClash / Mihomo 系客户端用户"
  verified-date="2026-11-20"
/>

## 一、按阶段直达分步实战教程

- **装软件**：[Windows 安装指南](/guides/clash-verge-windows) ｜ [macOS 安装指南](/guides/clash-verge-macos) ｜ [Linux 部署指南](/guides/clash-verge-linux)
- **导订阅与选节点**：[订阅导入与定时更新](/guides/clash-verge-subscription-setup) ｜ [四大策略组详解](/articles/clash-verge-proxy-groups-explained)
- **进阶网络接管**：[DNS 与 Fake-IP 详解](/guides/clash-verge-dns) ｜ [TUN 模式开启与排障](/guides/clash-verge-tun) ｜ [WSL2 / Docker / Git 代理配置](/articles/clash-verge-wsl2-docker-proxy)
- **规则扩展与迁移**：[Merge 与 Script 覆写](/articles/clash-verge-override-script) ｜ [Rule Provider (.mrs) 配置](/articles/clash-verge-rule-provider) ｜ [备份与跨机迁移](/articles/clash-verge-backup-migration)

## 二、三大核心运行模式与策略组搭配

### 1. 运行模式怎么切不踩坑？

| 运行模式 | 流量处理规则 | 适用时机 | 常见误区 |
| :--- | :--- | :--- | :--- |
| **规则（Rule）** | 逐条匹配配置内域名/IP 规则库：国内与局域网 `DIRECT`，海外走代理 | **日常 95% 以上时间固定开启** | 误切到直连还以为节点全挂 |
| **全局（Global）** | 忽略分流规则，除私有保留段外全部走 `GLOBAL` 分组所选节点 | 仅用于排查冷门海外新站点是不是被规则漏判了直连 | 忘记切回 Rule，导致 B站/网银变慢且白扣大量机场流量 |
| **直连（Direct）** | 全部流量跳过代理直接走本地宽带 | 临时需要用本地原生 IP 环境测试 | — |

### 2. 策略组选节点实战技巧
1. **看测速数字不能只看延迟**：在「代理」页点测速按钮看到的只是单个 HTTP 探测延迟（通常测向 Google/Cloudflare 生成响应的时间）。如果某个香港节点显示 `45ms` 但实际打开视频转圈，可能是晚高峰带宽已满，应尝试切换同地区编号靠后或新加坡/日本节点。
2. **AI 账号防风控（重要）**：OpenAI、Anthropic（Claude）与 Google Gemini 对节点地域跳变极其敏感。**不要把 `OpenAI` / `AI` 分组设成 `url-test` 或 `load-balance`**，应使用 `select`（手动选择）固定在一个延迟适中、实测支持网页与 App 解锁的新加坡、日本或美国节点（如遇香港节点仅支持 App 或不支持 Gemini，可参考 [AI 工具解锁适配对比](/comparisons/ai-tools-unlock-comparison)）。

## 三、系统代理 vs TUN 模式：到底怎么选？

```text
[浏览器 / Electron 应用] ──读取系统设置──▶ [系统代理 127.0.0.1:7897] ──▶ Mihomo 内核
[Git / curl / Docker / 游戏 / UWP] ──无视系统代理──▶ [TUN 虚拟网卡] ──▶ Mihomo 内核
```

- **轻度办公与网页浏览**：只开「**系统代理**」即可，零内核接管风险，电脑休眠唤醒也不容易影响网卡状态。
- **开发调试与全终端需求**：先在设置安装激活 **Service Mode（服务模式）**，再开启 **TUN 模式**。开启 TUN 后建议将「系统代理」关闭，避免个别程序走双重回环导致延迟增加或断流。
- **仅个别 UWP 应用无法联网（Windows）**：不想开 TUN 时，可直接用 Clash Verge 自带的 [UWP 环回豁免工具](/articles/clash-verge-uwp-loopback) 勾选放行 Microsoft Store 等应用。

## 四、DNS 设置与防泄漏核心要点

1. **优先保留 `Fake-IP` 模式**：Fake-IP 在本地瞬间返回 `198.18.0.x` 虚拟地址，把真实域名透传给远端节点解析，网页首屏打开最快且天然隔绝本地 DNS 污染。
2. **排查国内域名变慢**：确保配置中的 `direct-nameserver` 或 `nameserver-policy` 对 `geosite:cn` 域名指向了国内加密 DNS（如 `223.5.5.5`、`119.29.29.29`），避免淘宝、微信图床被解析到海外 CDN 节点。
3. **浏览器 DoH 注意事项**：若开启系统代理后发现 Clash「连接/日志」里完全抓不到某个域名的记录，请检查 Chrome / Edge 是否打开了「使用安全 DNS（内置 DoH）」。关闭浏览器内置 DoH 或开启 Mihomo `sniffer` 域名嗅探即可恢复精准分流。

## 五、优雅退出习惯（防止下次开机断网）

关闭电脑或重启前，尽量通过系统托盘右键「**退出 (Quit)**」正常结束 Clash Verge Rev，让程序触发退出清理钩子恢复系统网络代理；若因强杀进程导致国内网页也打不开，按 [端口占用与代理残留修复指南](/articles/clash-verge-port-conflict-recovery) 清理系统手动代理即可秒恢复。

## 六、常见问题（FAQ）

<FAQSection
  title="Clash 日常使用 FAQ"
  :items="[
    { q: '日常用“规则模式”还是“全局模式”？', a: '日常 95% 场景请固定使用「规则（Rule）」模式，保证国内网站直连高速、海外网站走节点分流；「全局（Global）」仅在怀疑规则漏配时临时用来对比排查。' },
    { q: '为什么用 ChatGPT 或 Claude 时总提示账号异常或需要频繁验证？', a: '很可能是策略组使用了 url-test 自动测速或 load-balance 负载均衡，导致出口 IP 在香港、日本、新加坡之间频繁切换。AI 服务请改用 select 手动策略组并锁定到固定新加坡/日本/美国节点。' },
    { q: '开了系统代理，为什么命令行 git / curl / Docker 还是直连或超时？', a: '多数 CLI 工具和开发软件默认不读取系统代理。只需安装 Service Mode 服务模式并开启「TUN 模式」，或在终端导出 127.0.0.1:7897 环境变量即可解决。' }
  ]"
/>

<ClusterDirectory topic-link="/clash/tutorials" />
