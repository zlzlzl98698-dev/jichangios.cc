---
title: "Clash Verge Rev macOS 安装教程（2026）- Apple Silicon 与 Intel 区分"
description: "详细讲解在 macOS（Sonoma / Sequoia）上安装 Clash Verge Rev：精准区分 M 系列芯片 aarch64 与 Intel x64 dmg、解除 Gatekeeper“已损坏”提示、授权系统代理与 TUN utun 网卡及终端代理设置。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge macOS
  - Apple Silicon
  - 安装教程
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
softwareApp:
  name: "Clash Verge Rev"
  os: "macOS"
  category: "NetworkingApplication"
faq:
  - q: "macOS 打开 Clash Verge 提示“已损坏，无法打开，应移到废纸篓”怎么办？"
    a: "这是 macOS Gatekeeper 对未经过苹果公证（Notarization）开源应用的常规隔离机制。将应用拖入「应用程序」文件夹后，在终端执行 sudo xattr -r -d com.apple.quarantine \"/Applications/Clash Verge.app\" 即可正常打开。"
  - q: "Mac 应该下载 aarch64.dmg 还是 x64.dmg？"
    a: "M1/M2/M3/M4 系列芯片 Mac 请务必下载 aarch64.dmg（arm64 原生版）；老款 Intel 处理器 Mac 下载 x64.dmg。"
  - q: "为什么 Safari 和 Chrome 能连外网，但 Mac 终端（Terminal / iTerm2 / Homebrew）不走代理？"
    a: "macOS 的系统代理设置主要作用于基于 CFNetwork 的桌面应用与浏览器，终端 shell（zsh/bash）默认不自动继承系统代理，需要在终端导入 http_proxy/https_proxy 环境变量或直接开启 TUN 模式。"
  - q: "Mac 休眠唤醒后突然全部网站打不开怎么办？"
    a: "部分情况下合盖休眠会挂起或重置虚拟网卡接口，先点击切换关闭再重新开启 TUN 开关，或检查系统设置 → 网络中的 DNS 是否残留旧虚拟地址。"
related:
  - title: "Clash Verge 官方下载渠道"
    link: "/clash/verge-download"
    description: "查看 GitHub Releases 安装包校验方法。"
    tag: "下载"
  - title: "订阅导入与更新教程"
    link: "/guides/clash-verge-subscription-setup"
    description: "导入机场配置文件并开始测速连线。"
    tag: "下一步"
  - title: "TUN 模式开启与虚拟网卡排查"
    link: "/guides/clash-verge-tun"
    description: "深入了解 macOS utun 虚拟网卡与服务模式权限。"
    tag: "进阶"
---

# Clash Verge Rev macOS 安装教程（2026）

<TutorialPage
  quick-answer="在 Mac 上安装 Clash Verge Rev，务必先通过左上角 「关于本机」确认芯片类型：Apple Silicon（M1/M2/M3/M4）下载 aarch64.dmg，Intel 芯片下载 x64.dmg。拖入「应用程序」文件夹后如被系统拦截提示“已损坏”，在终端运行 sudo xattr -r -d com.apple.quarantine 清除隔离属性即可打开。"
  applies-to="macOS 12 Monterey / 13 Ventura / 14 Sonoma / 15 Sequoia"
  verified-date="2026-11-20"
/>

<VersionInfo
  software-name="Clash Verge Rev"
  core-name="Mihomo (Clash.Meta)"
  :platforms="['macOS (Apple Silicon)', 'macOS (Intel)']"
  official-channel="GitHub: clash-verge-rev/clash-verge-rev/releases"
  verified-date="2026-11-20"
/>

<ProxyArchitectureDiagram mode="tun" title="macOS 系统代理与 utun 虚拟网卡分流对照" />

## 一、精准区分 Mac 芯片架构与安装方式

下载错误架构虽然在 Apple Silicon 上可能被 Rosetta 2 强行转译打开，但容易出现功耗偏高、TUN 辅助服务无法注册等问题。

### 1. 用界面或终端命令确认 Mac 架构

- **图形界面确认**：点击屏幕左上角 `` →「关于本机」；
- **终端命令一行确认**（在「终端 / Terminal」执行）：

```bash
# 输出 arm64 表示 Apple Silicon (M1–M4)，选择 aarch64.dmg
# 输出 x86_64 表示 Intel 处理器，选择 x64.dmg
uname -m
```

### 2. Mac 安装包与 Homebrew 安装对照

| 获取途径 | 适用文件名 / 指令 | 特点与提醒 |
| :--- | :--- | :--- |
| **Apple Silicon (M 系列)** | `*aarch64.dmg` | 原生 ARM64 运行，低功耗，建议所有 M 芯片 Mac 首选 |
| **Intel x86_64 Mac** | `*x64.dmg` | 适用 2020 年前旧款 Intel MacBook / iMac |
| **Homebrew Cask（可选）** | `brew install --cask clash-verge-rev` | 适合习惯命令行管理的开发者；社区维护 formula，安装后同样需要清除隔离属性或按提示授权 |

---

## 二、安装、解除 Gatekeeper 隔离与权限配置

<TutorialSteps
  heading="macOS 安装与首次启动完整步骤"
  :steps="[
    {
      title: '1. 挂载 DMG 并拖入 Applications（应用程序）',
      detail: '双击下载好的 .dmg 镜像，在弹出窗口中将 Clash Verge 图标拖拽到右侧 Applications 文件夹，切勿直接从挂载镜像内双击运行。'
    },
    {
      title: '2. 解除 macOS“已损坏 / 无法验证开发者”隔离限制',
      detail: '开源项目通常未经 Apple 公证，首次打开常弹出“已损坏，应移到废纸篓”。先确认安装包来自 GitHub 官方仓库后，打开系统「终端」运行下方指令，输入 Mac 开机密码（输入过程屏幕不显示星号）并回车：',
      command: 'sudo xattr -r -d com.apple.quarantine /Applications/Clash\\ Verge.app',
      tip: '如果不确定应用程序实际名称，可直接输入 sudo xattr -r -d com.apple.quarantine 后留一个空格，把「应用程序」里的软件图标直接拖进终端窗口。'
    },
    {
      title: '3. 授权系统代理或安装 Service Mode',
      detail: '打开软件进入「设置」，开启「系统代理」或安装「服务模式（用于 TUN）」时，macOS 会弹出系统权限认证窗口，使用触控 ID 或开机密码授权即可。'
    },
    {
      title: '4. 验证 Safari / 桌面端与终端网络接入',
      detail: '开启系统代理后，Safari、Chrome、微信等可立即按规则分流；若需要让终端里的 curl、git、brew、pip 走代理，执行软件设置内复制的环境变量命令或开启 TUN 模式。'
    }
  ]"
/>

---

## 三、macOS 终端代理配置与实用排查命令

macOS 默认只对图形应用下发系统代理（`scutil --proxy`），**zsh / bash 命令行工具不会自动读取系统代理**。在日常开发中推荐两种方案：

### 方案 A：一键别名函数（不用 TUN 时最灵活）

将下方函数写入 `~/.zshrc`，需要使用代理时在终端输入 `proxy_on`，关闭输入 `proxy_off`（默认混合端口以软件设置为准，常见为 `7897`）：

```bash
# 添加到 ~/.zshrc 并执行 source ~/.zshrc
proxy_on() {
  export http_proxy="http://127.0.0.1:7897"
  export https_proxy="http://127.0.0.1:7897"
  export all_proxy="socks5://127.0.0.1:7897"
  echo "Terminal proxy enabled on 127.0.0.1:7897"
}

proxy_off() {
  unset http_proxy https_proxy all_proxy
  echo "Terminal proxy disabled"
}
```

### 方案 B：macOS 常见系统状态命令行检查

```bash
# 1. 查看当前 macOS Wi-Fi 系统代理是否已正确写入与清理
scutil --proxy

# 2. 检查 Clash Verge 混合端口 7897 监听进程
lsof -i :7897

# 3. 验证通过本地代理访问外网连通性（有 HTTP 状态码输出即成功）
curl -I -x http://127.0.0.1:7897 https://www.google.com
```

> 安全提醒：**异常崩溃退出后 Mac 浏览器彻底打不开任何网页**，通常是因为系统代理仍残留在网络设置里指向了已关闭的 `127.0.0.1:7897`。打开「系统设置 → 网络 → Wi-Fi → 详细信息 → 代理」，把「网页代理 (HTTP)」「安全网页代理 (HTTPS)」「SOCKS 代理」全部关闭，或重新打开一次 Clash Verge 并手动关闭「系统代理」开关即可恢复。

---

## 四、macOS 安装与使用排查

<TroubleshootingGuide
  title="macOS 高频问题排查手册"
  :cases="[
    {
      symptom: '运行 xattr 后依然打不开，或在「系统设置 → 隐私与安全性」找不到“仍要打开”',
      cause: '执行命令时路径名字多/少空格，或文件下载不完整导致代码签包损坏。',
      solution: '先执行 ls -la /Applications | grep -i clash 核对准确路径，再对比官方 Release 页面 SHA-256 校验值；若 macOS Sequoia 15+ 仍拦截，点击软件报错弹框中的「完成」后立刻打开「系统设置 → 隐私与安全性」底部点击「仍要打开」。'
    },
    {
      symptom: 'Mac 从休眠唤醒后网页全白、节点延迟超时',
      cause: '合盖后系统释放网络接口，utun 虚拟网卡路由或服务守护进程状态未同步恢复。',
      solution: '点击顶部菜单栏 Clash 托盘图标先关闭再重新打开 TUN 开关；若频繁出现休眠断网，检查软件设置内是否启用了正常的 DNS 自动恢复选项。'
    },
    {
      symptom: '同时使用公司 VPN（如 Cisco AnyConnect）与 TUN 模式导致全部断网',
      cause: '多个客户端同时向 macOS 路由表注入默认流量入口（utun0/utun3 等冲突）。',
      solution: '需要连接公司内网 VPN 时，先关闭 Clash Verge 的 TUN 模式，仅使用系统代理配合精确的旁路/直连分流规则。'
    }
  ]"
/>

---

## 五、常见问题（FAQ）

<FAQSection
  title="macOS 安装 FAQ"
  :items="[
    {
      q: 'macOS 打开 Clash Verge 提示“已损坏，无法打开，应移到废纸篓”怎么办？',
      a: '这是 macOS Gatekeeper 对未经过苹果公证的开源应用的隔离机制。将应用拖入应用程序文件夹后，在终端执行 sudo xattr -r -d com.apple.quarantine /Applications/Clash\\ Verge.app 即可解决。'
    },
    {
      q: 'Mac 需要安装付费的 ClashX Pro 还是开源的 Clash Verge Rev？',
      a: '原版 ClashX 与 ClashX Pro 已停止更新，新系统与现代协议（如 VLESS-Reality、Hysteria 2）建议首选持续维护且基于 Mihomo 内核的 Clash Verge Rev。'
    },
    {
      q: '开启 TUN 模式后本地 NAS 或局域网设备（192.168.x.x）无法访问怎么办？',
      a: '检查当前机场订阅规则是否误删了局域网 IP-CIDR 直连规则，或在 TUN 设置中确认已排除 192.168.0.0/16 与 10.0.0.0/8 私网段。'
    },
    {
      q: '卸载或重装前配置文件保存在哪里？',
      a: 'macOS 配置目录位于 ~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/，建议升级或重装前在软件「设置 → 备份设置」先导出备份压缩包。'
    }
  ]"
/>
