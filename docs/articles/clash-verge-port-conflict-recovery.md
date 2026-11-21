---
headline: "Clash 端口占用及异常退出后系统代理残留修复"
title: "Clash 端口 7897/7890 被占用及异常退出后系统代理残留彻底修复（2026）"
description: "解决 Clash Verge Rev 启动报错 listen tcp 127.0.0.1:7897 bind error、端口冲突排查定位进程 PID，以及强制关机或崩溃退出后浏览器打不开任何网页的系统代理与 DNS 清理教程。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - 端口占用
  - 系统代理残留
  - 故障排查
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "为什么关掉 Clash Verge 甚至卸载软件后，连百度、淘宝等国内网站都上不去了？"
    a: "这是因为断电关机或任务管理器强杀进程时，Clash 没能触发正常退出钩子来关闭系统代理设置，导致浏览器一直把所有请求发向已经关闭的 127.0.0.1:7897 端口，报 ERR_PROXY_CONNECTION_FAILED。"
  - q: "怎么最快速一步清理干净残留系统代理？"
    a: "最省事的方法是重新打开一次 Clash Verge Rev，在系统托盘右键点击「退出（Quit）」，客户端正常退出流程会自动把注册表/系统代理开关复位为关闭。"
  - q: "报错 bind: Only one usage of each socket address 怎么彻底解决端口被占？"
    a: "先用 netstat -ano | findstr :7897（macOS/Linux 用 lsof -i :7897）查出占用端口的进程 PID 并结束冲突进程；或者直接在 Clash Verge「设置 → Clash 设置 → 混合端口」改为 17897 后保存。"
  - q: "系统代理已经关闭，但依然提示 DNS_PROBE_FINISHED_BAD_CONFIG 怎么回事？"
    a: "这往往是开启过 TUN 模式后异常退出的 DNS 残留。重新打开软件开关一次 TUN 并正常关闭，或在系统网络连接属性中把 IPv4 DNS 恢复为「自动获得 DNS 服务器地址」。"
related:
  - title: "连接失败与常见报错全手册"
    link: "/guides/clash-verge-errors"
    description: "查看其他日志错误码与解决步骤。"
    tag: "排障"
  - title: "Clash Verge DNS 设置详解"
    link: "/guides/clash-verge-dns"
    description: "排查异常退出后的 DNS 网卡残留。"
    tag: "DNS"
  - title: "Windows 安装与服务模式配置"
    link: "/guides/clash-verge-windows"
    description: "规范清理旧版 Clash for Windows 避免双端口冲突。"
    tag: "基础"
---

# Clash 端口占用及异常退出后系统代理残留修复

<TutorialPage
  quick-answer="启动报错端口被占用（bind: Only one usage of each socket address），直接清理占用 7897 的残留 mihomo 进程或在设置将混合端口改为 17897 即可；若强退或断电后连国内网站也彻底断网，只需关闭系统网络设置里指向 127.0.0.1:7897 的手动代理，或重新启动一次 Clash Verge 再正常退出。"
  applies-to="Windows 10/11 / macOS / Linux"
  verified-date="2026-11-20"
/>

## 一、两大常见“突发故障”快速区分

| 症状表现 | 真实原因 | 一眼识别方法 |
| :--- | :--- | :--- |
| **软件打不开/红字提示 `bind error`** | `7897`（或 `7890` / `9097`）端口已经被另一个客户端或僵尸内核抢先占用了 | 软件刚刚开启就报错，节点列表测速全无响应 |
| **软件已经关了，全电脑国内国外全面断网** | 系统代理依然停留在 `127.0.0.1:7897`（或 TUN 网卡 DNS 停留在假地址），但后端代理早已停止 | 浏览器提示 `ERR_PROXY_CONNECTION_FAILED` 或 `DNS_PROBE_FINISHED_BAD_CONFIG` |

---

## 二、第一步：定位并清理被占用的端口

### 1. Windows PowerShell 查端口真凶与一键释放

```powershell
# 1. 查找占用 7897 或 9097 控制端口的进程 PID（看最右侧数字）
netstat -ano | findstr ":7897 :7890 :9097"

# 2. 假设上一条返回的 PID 是 14520，查它到底是什么程序
tasklist | findstr 14520

# 3. 常见残留进程名如 clash-win64.exe / verge-mihomo.exe / v2rayN.exe
#    确认非正常使用中的程序后可直接结束（把 14520 替换成实际 PID）：
taskkill /PID 14520 /F
```

> **懒人改端口法**：如果你机器上确实需要长期同时留着另一套代理或服务占着 `7897`，无需删旧软件——打开 Clash Verge Rev → 「设置 → Clash 设置 → **混合端口 (Mixed Port)**」，改成 `17897`（控制端口按提示一并避开 `9097`）保存后重启内核即可。

### 2. macOS / Linux 查端口与终止僵尸内核

```bash
# 查看 7897 占用情况
lsof -i :7897

# 若确认是旧版残留 clash/mihomo 僵尸进程（先核对 PID）
kill -9 <PID>
```

---

## 三、第二步：彻底清理异常退出残留的系统代理

当电脑突然蓝屏、断电或直接在任务管理器强杀软件时，软件内置的“退出自动还原系统代理”代码来不及运行。按系统执行下方清理即可瞬间恢复网络：

### 方法 A：Windows 图形界面或一句 PowerShell 秒恢复

- **图形界面操作**：按 `Win + I` → 「网络和 Internet」→「代理」→ 查看下方「手动设置代理」→ 点击「编辑」将**使用代理服务器**关闭并保存；
- **PowerShell 一行强制清理（最快）**：

```powershell
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0
```

> 同时检查下方「自动设置脚本（PAC）」开关是否也被其他软件填入，若有非工作需要的脚本地址一并关闭。

### 方法 B：macOS 图形界面或 `networksetup` 恢复

- **图形界面操作**：打开「系统设置」→「网络」→ 选中当前使用的 Wi-Fi / 以太网 →「详细信息」→「代理」→ 取消勾选 `网页代理 (HTTP)`、`安全网页代理 (HTTPS)` 与 `SOCKS 代理`，点击「好」。
- **Terminal 终端检查**（替换 `"Wi-Fi"` 为实际网络服务名）：

```bash
networksetup -setwebproxystate "Wi-Fi" off
networksetup -setsecurewebproxystate "Wi-Fi" off
networksetup -setsocksfirewallproxystate "Wi-Fi" off
```

### 方法 C：如果开了 TUN 模式崩溃导致 DNS 断网

如果清理完系统代理仍提示 `DNS_PROBE_FINISHED_BAD_CONFIG`，按以下顺序二选一处理：
1. **重新启动 Clash Verge Rev → 开关一次 TUN 模式 → 右键托盘点击「退出 (Quit)」**；
2. 打开系统网卡 IPv4 属性，确认「DNS 服务器分配」恢复为**自动 (DHCP)**，并在 PowerShell 执行 `ipconfig /flushdns`。

---

## 四、常见问题（FAQ）

<FAQSection
  title="端口与残留清理 FAQ"
  :items="[
    {
      q: '为什么关掉 Clash Verge 甚至卸载软件后，连国内网站都上不去了？',
      a: '强行关机或强杀进程时，浏览器代理设置未同步还原，依然向已停止监听的 127.0.0.1:7897 发送流量。到系统代理设置关闭代理开关或跑一次上面那条 Set-ItemProperty 命令即可秒恢复。'
    },
    {
      q: '怎样避免以后每次电脑关机或重启后发生残留断网？',
      a: '养成良好习惯：需要关软件时点右下角系统托盘右键「退出（Quit）」，尽量不要在任务管理器直接强杀 clash-verge.exe；若日常经常意外断电，使用 TUN 模式时更推荐正常关机。'
    },
    {
      q: '把混合端口改成 17897 后，以前给 Git / Docker / 终端配过的代理要不要同步改？',
      a: '需要！你在 Git、PowerShell 或 Docker Desktop 手动填过的端口号必须与 Clash Verge 实际监听的混合端口保持一致，否则命令行会报 Connection Refused。'
    }
  ]"
/>
