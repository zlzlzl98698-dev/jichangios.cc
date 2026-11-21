---
title: "Clash Verge Rev TUN 模式开启教程、协议栈选型与网卡冲突排查（2026）"
description: "详解如何在 Windows/macOS/Linux 上为 Clash Verge Rev 安装服务模式并开启 TUN 虚拟网卡，对比 System / gVisor / Mixed 协议栈差异，解决 CLI、Docker、游戏及企业 VPN 虚拟网卡冲突与断网恢复问题。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge TUN 模式
  - 服务模式
  - 虚拟网卡
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "点击「TUN 模式」开关后立刻自动弹回关闭状态是怎么回事？"
    a: "90% 是因为尚未安装或未激活「服务模式（Service Mode）」，或者客户端大版本更新后后台服务版本不匹配。请在设置中先卸载旧服务再重新安装并授权 UAC / 管理员密码。"
  - q: "TUN 协议栈选 System、gVisor 还是 Mixed？"
    a: "日常推荐首选 Mixed（TCP 走 System、UDP 走 gVisor），在性能与跨平台兼容性之间最均衡；遇个别程序网卡崩溃或 Docker/WSL 问题再尝试切换 gVisor。"
  - q: "开启 TUN 后，系统代理还需要同时打开吗？"
    a: "通常不需要。开启 TUN 后系统底层流量已由虚拟网卡接管，同时开系统代理极少数情况下会造成某些应用双重走代理或环回报错；一般建议二选一，开 TUN 时关掉「系统代理」。"
  - q: "为什么一开 TUN 模式，192.168.1.1 路由器后台或 NAS 就打不开了？"
    a: "配置中可能缺少私有 IP 排除段（route-exclude-address）或规则被改成了全局。检查规则组是否处于 Rule 模式，并在 TUN 设置保留内网直连段。"
related:
  - title: "常见错误与超时排查手册"
    link: "/guides/clash-verge-errors"
    description: "解决开启 TUN 后断网、网卡冲突与进程报错。"
    tag: "排障"
  - title: "Windows 安装与服务权限"
    link: "/guides/clash-verge-windows"
    description: "回顾 Windows UAC 授权与防火墙放行。"
    tag: "基础"
  - title: "WSL2 与 Docker 镜像代理"
    link: "/articles/clash-verge-wsl2-docker-proxy"
    description: "结合 TUN 或局域网监听让容器畅通连接。"
    tag: "进阶"
---

# Clash Verge Rev TUN 模式开启教程与冲突排查

<TutorialPage
  quick-answer="「系统代理」只对浏览器等少数主动读取代理设置的软件有效；想让 PowerShell/Terminal、Git、Python、Docker、桌面游戏、Discord 客户端或 UWP 应用全部按规则分流，必须先在「设置」安装激活「服务模式（Service Mode）」，再打开「TUN 模式」开关。"
  applies-to="Clash Verge Rev (Windows / macOS / Linux)"
  verified-date="2026-11-20"
/>

<ProxyArchitectureDiagram mode="tun" />

## 一、开启 TUN 模式的四步标准流程

<TutorialSteps
  heading="Service Mode 安装 + TUN 虚拟网卡启停流程"
  :steps="[
    {
      title: '1. 安装并激活服务模式（Windows / macOS 必做）',
      detail: '打开 Clash Verge Rev → 「设置」→ 找到「服务模式（Service Mode）」右侧安装按钮，授予管理员权限 / UAC 或触控 ID，确认状态灯变为绿色且提示服务已激活。'
    },
    {
      title: '2. 配置 TUN 协议栈与关键勾选项',
      detail: '点开「TUN 模式」旁边的设置图标：建议勾选「自动路由（Auto Route）」「自动检测出口网卡（Auto Detect Interface）」与「DNS 劫持（53 端口）」；「堆栈（Stack）」首选 Mixed。'
    },
    {
      title: '3. 打开 TUN 开关并关闭重复的「系统代理」',
      detail: '打开「TUN 模式」开关后，建议顺手关闭上方的「系统代理」开关。单留 TUN 一套链路接管流量最干净，也能避免个别开发工具重复读取系统代理导致本地回环失败。'
    },
    {
      title: '4. 从命令行与连接面板验证是否真正走过虚拟网卡',
      detail: '在系统终端测试外部 HTTPS 连通状态，并打开软件左侧「连接 (Connections)」面板查看进程名称（如 powershell.exe、git.exe、curl）是否被正常记录和分流。'
    }
  ]"
/>

---

## 二、协议栈（Stack）怎么选：`System` vs `gVisor` vs `Mixed`

| TUN 堆栈类型 | 技术处理方式 | 优点 | 局限与适用场景 |
| :--- | :--- | :--- | :--- |
| **`Mixed`（首选默认）** | TCP 走宿主机协议栈、UDP 走用户态 `gVisor` | 兼顾高吞吐下载速度与 UDP 游戏/QUIC 兼容性 | 覆盖 95% Windows/macOS 日常与开发需求 |
| **`System`** | TCP/UDP 均走系统底层网络栈 | CPU 占用最低，千兆内网传输与测速极限性能最好 | 少数复杂网络路由或防火墙环境下 UDP 易被宿主机丢包 |
| **`gVisor`** | 完全在用户态独立模拟 TCP/IP 协议栈 | 与宿主机内核路由表隔离度最高，极少和奇怪网卡打架 | 超高并发下载时内存和 CPU 占用略高 |

---

## 三、TUN 核心 YAML 配置与排查验证命令

如果订阅自带规则缺少以下字段，可通过局部 Merge 覆写确保 TUN 安全启用而不劫持局域网与私网地址：

```yaml
tun:
  enable: true
  stack: mixed
  auto-route: true
  auto-redirect: true # Linux 平台支持时显著提升转发性能
  auto-detect-interface: true
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
  # 保留路由器后台、公司私网与局域网直连，避免误接管
  route-exclude-address:
    - 192.168.0.0/16
    - 10.0.0.0/8
    - 172.16.0.0/12
```

### 开启后验证虚拟网卡与路由是否生效

```powershell
# Windows: 查看虚拟网卡适配器（如 Meta / Clash）是否已生成且处于 Up 状态
Get-NetAdapter | Where-Object { $_.InterfaceDescription -match "Meta|Wintun|Clash|TAP" }

# 验证命令行是否直接走通代理与分流（无需额外 export HTTP_PROXY）
curl.exe -I https://www.google.com
```

```bash
# macOS / Linux: 查看生成的 utun 或 Meta 虚拟网卡
ifconfig | grep -E "utun|Meta" -A 3
```

---

## 四、虚拟网卡冲突与断网高频排查

<TroubleshootingGuide
  title="TUN 模式五大高发冲突及解决方法"
  :cases="[
    {
      symptom: '点开 TUN 开关后过两秒又自动跳回关闭',
      cause: '后台服务版本过旧（例如升级软件主体后未同步更新服务），或安全软件阻止服务注册虚拟网卡驱动。',
      solution: '点击「服务模式」旁管理图标 → 先点击「卸载服务（Uninstall）」，关闭重启客户端后再点击「安装服务（Install）」。'
    },
    {
      symptom: '同时开着 UU / 雷神等游戏加速器或企业 VPN 后完全上不了网',
      cause: '多个虚拟网卡软件同时抢占默认路由跃点数（Metric = 0），导致数据包在两块虚拟网卡间死循环或被丢弃。',
      solution: '不要同时运行多款 TUN/虚拟网卡工具。使用网游加速器时先关掉 Clash Verge TUN；访问公司内网 VPN 时将 Clash 切回纯系统代理或退出。'
    },
    {
      symptom: '开启 TUN 后整个 Wi-Fi 显示“无 Internet 连接”或所有网页全超时',
      cause: '未勾选 auto-detect-interface（自动检测出口网卡），或者防火墙拦截了 Mihomo 内核的出站报文。',
      solution: '在 TUN 设置确保勾选「自动检测出口网卡」；检查 Windows 防火墙或第三方安全软件是否放行了 clash-verge.exe 与 verge-mihomo.exe。'
    },
    {
      symptom: '本地 192.168.x.x 路由器后台或打印机无法访问',
      cause: '未正确保留内网私有地址直连，或当前全局运行模式误改为 Global。',
      solution: '切回「规则 (Rule)」模式，并在 TUN 设置中确认内网 CIDR（192.168.0.0/16、10.0.0.0/8）位于排除列表内。'
    },
    {
      symptom: '关闭 TUN 或软件意外崩溃后电脑依然断网',
      cause: '虚拟网卡虽然撤销，但适配器上的临时 DNS（198.18.0.2）未成功退回 DHCP。',
      solution: '重新打开 Clash Verge 开关一次 TUN 并正常关闭；或在系统网络适配器属性里把 IPv4 DNS 手动改回「自动获取 DNS」。'
    }
  ]"
/>

---

## 五、常见问题（FAQ）

<FAQSection
  title="TUN 模式常见问答"
  :items="[
    {
      q: '点击「TUN 模式」开关后立刻自动弹回关闭状态是怎么回事？',
      a: '多数源于服务模式未成功运行或客户端升级后服务与主程序版本错配。先在「服务模式」界面卸载旧服务并重启软件再重新安装服务即可。'
    },
    {
      q: 'TUN 协议栈选 System、gVisor 还是 Mixed？',
      a: '普通用户推荐首选 Mixed；如发现某些局域网软件异常可试切 gVisor；追求千兆吞吐最低 CPU 占用的 Linux/桌面端再对比 System。'
    },
    {
      q: '开了 TUN 还需要顺便开系统代理吗？',
      a: '不建议同时开启，只开 TUN 即可覆盖全部浏览与桌面软件；同时开只在极少数旧软件强制要求读系统注册表时备选。'
    },
    {
      q: '开 TUN 模式会明显费电或拖慢本地访问速度吗？',
      a: '所有流量先经过 Mihomo 内核分流会有轻微 CPU 消耗（现代 PC 通常 <1%），国内直连流量虽经过一层本地路由转发，但开启正确直连规则与 Mixed 栈后，体感上与裸连几乎无差异。'
    }
  ]"
/>
