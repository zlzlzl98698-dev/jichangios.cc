---
title: "Windows UWP 应用无法走 Clash 代理？Loopback 环回豁免配置教程（2026）"
description: "深度解释为什么 Microsoft Store、Xbox、Copilot、Windows Terminal、Mail、OneNote 等 UWP 应用默认无法访问 Clash 本地代理，详述 Clash Verge Rev 一键豁免、CheckNetIsolation 命令行批量放行以及与 TUN 模式差异。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - UWP 环回豁免
  - Windows 代理
  - Clash Verge Rev
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "为什么Chrome都能上网，Windows 自带的 Microsoft Store / Xbox 还是提示“请检查你的网络”？"
    a: "Windows 系统对 UWP（现代商店类应用）强制实施了 AppContainer 沙盒隔离，默认禁止它们向本机环回地址 127.0.0.1 发起网络请求，因此尽管读取了系统代理地址 127.0.0.1:7897，连接在内核层会被系统拦截。"
  - q: "Clash Verge Rev 的「UWP 工具」一键放行安全吗？"
    a: "安全。它底层调用的就是微软官方自带命令 CheckNetIsolation.exe 来写入豁免白名单，仅允许被勾选的应用访问本地代理环回端口，不影响系统防火墙外网隔离。"
  - q: "我已经开了 Clash Verge 的 TUN 模式，还需要挨个设置 UWP 环回豁免吗？"
    a: "通常不需要。TUN 模式下 UWP 应用把流量正常发向公网/虚拟网卡路由，不涉及访问 127.0.0.1 本地环回端口，因此可绕过沙盒环回限制直接分流。"
  - q: "点击 Save Changes 保存豁免后依然不生效怎么排查？"
    a: "必须在完成豁免保存后彻底关闭重开一次对应的 UWP 应用；此外如部分微软商店应用依赖后台网络服务，也可配合检查系统时间同步与规则分流是否将微软下载域名放进了有效出站组。"
related:
  - title: "Clash Verge Rev Windows 安装教程"
    link: "/guides/clash-verge-windows"
    description: "安装服务模式与初始权限设置。"
    tag: "基础"
  - title: "TUN 模式开启与冲突排查"
    link: "/guides/clash-verge-tun"
    description: "了解 TUN 模式如何绕开系统代理限制。"
    tag: "进阶"
  - title: "WSL2、Docker 与 Git 代理"
    link: "/articles/clash-verge-wsl2-docker-proxy"
    description: "同样常遇本地环回与隔离问题的开发工具代理方案。"
    tag: "开发"
---

# Windows UWP 应用无法走 Clash 代理？Loopback 环回豁免教程

<TutorialPage
  quick-answer="Windows 出于 AppContainer 沙盒隔离机制，默认禁止 UWP（Microsoft Store 商店类）应用访问本机 127.0.0.1 环回端口；因此在纯「系统代理」模式下商店或自带应用总会报“无网络”。最快解决方式是在 Clash Verge Rev「设置」打开 UWP 应用联网豁免工具勾选保存，或者直接安装服务模式开启 TUN。"
  applies-to="Windows 10 / Windows 11"
  verified-date="2026-11-20"
/>

## 一、底层原因：为什么常规应用能上，UWP 却连不上？

1. 普通桌面应用（Chrome、Firefox、桌面软件）读取 Windows 系统代理 `127.0.0.1:7897` 后可以直接建立到本地环回的 TCP 连接；
2. 而来自 **Microsoft Store（或部分 Edge 内部组件、Xbox App、Minecraft 基岩版、Windows Copilot、OneNote UWP）** 的沙盒进程，被微软系统内核策略严格禁止访问 `127.0.0.1` / `localhost` 环回；
3. 所以就算你的 Clash 测速正常、系统代理开关也是开着的，只要不放行环回权限或改走 TUN 虚拟网卡，这类 UWP 应用发往代理端口的请求一出门就会被操作系统静默丢弃。

---

## 二、解决方案对比：按自己习惯二选一

| 解决方案 | 操作门槛 | 是否需管理员权限 | 适用特点 |
| :--- | :--- | :---: | :--- |
| **方法 A：Clash Verge 内置 UWP 豁免工具** | 图形化点选、20 秒完成 | 需要（仅保存一次） | 不想开 TUN 模式时的**最轻量零额外开销方案** |
| **方法 B：PowerShell `CheckNetIsolation` 命令** | 复制 1 条指令即可 | 需要（管理员 PowerShell） | 适合精准放行单个包，或排查哪些 App 被放行过 |
| **方法 C：直接开启 TUN 模式** | 装 Service Mode 后一键开启 | 需要（装服务时授权一次） | 不仅解决全部 UWP，连带 Git、终端、游戏也一并接管 |

---

## 三、图形界面与管理员命令实操步骤

<TutorialSteps
  heading="在 Clash Verge Rev 中放行 UWP 应用三步法"
  :steps="[
    {
      title: '1. 打开客户端「UWP 应用联网豁免」入口',
      detail: '进入 Clash Verge Rev 左侧「设置 (Settings)」→ 找到「Windows 相关设置 / UWP 工具」并点击打开内置管理器（在弹窗授权时点击允许）。'
    },
    {
      title: '2. 精准勾选需要联网的商店应用（或全选）',
      detail: '在列表找到 Microsoft Store、Xbox、Microsoft Copilot、Windows Mail 等目标应用勾选（不确定时也可直接点击右上角 Exempt All 后 Save Changes）。'
    },
    {
      title: '3. 彻底关闭重开目标 UWP 应用生效',
      detail: '部分商店应用在后台处于挂起态，保存白名单后建议先在任务管理器结束相应应用进程再重新打开测试连通性。'
    }
  ]"
/>

### 命令行管理与精准排错（管理员 PowerShell）

如果软件内置 UWP 列表没弹出，或者想脚本化查看当前已经有哪些系统应用拿到了本地环回豁免权，可直接运行 Windows 原生 `CheckNetIsolation` 工具：

```powershell
# 1. 列出当前所有已启用 Loopback 环回豁免的 UWP 应用包名
CheckNetIsolation LoopbackExempt -s

# 2. 为 Microsoft Store 微软商店单独添加豁免（需管理员 PowerShell）
CheckNetIsolation LoopbackExempt -a -n="Microsoft.WindowsStore_8wekyb3d8bbwe"

# 3. 为常见 Xbox / 游戏服务组件查找包全名并按需放行：
Get-AppxPackage *xbox* | Select-Object Name, PackageFamilyName
# 找到对应 PackageFamilyName 后套入下句格式即可：
# CheckNetIsolation LoopbackExempt -a -n="<PackageFamilyName>"
```

---

## 四、常见问题排查（FAQ）

<FAQSection
  title="UWP 代理常见疑问"
  :items="[
    {
      q: '为什么 Chrome 能正常访问外网，Microsoft Store 和 Xbox App 却一直报无网络？',
      a: '因为 Windows 沙盒策略禁止 UWP 应用访问 127.0.0.1 代理监听端口。使用 Clash Verge 内置的 UWP 豁免工具勾选保存，或者直接打开 TUN 模式即可。'
    },
    {
      q: '如果开启了全部 UWP 应用豁免（Exempt All），会不会降低系统安全性？',
      a: '环回豁免仅允许本地商店应用连接到本机 127.0.0.1 等环回端口，并没有对外网开放电脑端口，日常家用完全可控；追求最小权限则只勾 Microsoft Store 等需要的条目即可。'
    },
    {
      q: '豁免了微软商店之后能打开首页了，但下载大型游戏/更新系统镜像还是超慢怎么回事？',
      a: '许多微软 CDN 下载域名本身直连速度跑满带宽反而比经机场节点快且省流量。遇到仅商店登录/搜索打不开，下载走直连时慢，可在 Clash 规则中确认 Microsoft Store 下载大文件域名按需直连或选高带宽节点。'
    }
  ]"
/>
