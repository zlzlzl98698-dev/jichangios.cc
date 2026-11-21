---
title: "Clash Verge Rev 官方下载指南（2026）- 多系统安装包区分与校验"
description: "Clash Verge Rev 官方 GitHub Release 下载完整说明：Windows (x64/arm64/便携版)、macOS (M1-M4 aarch64 vs Intel x64)、Linux (DEB/RPM/AppImage) 选包及 SHA-256 防仿冒校验。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge 下载
  - Clash Verge Rev
  - 安装包架构
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
softwareApp:
  name: "Clash Verge Rev"
  os: "Windows, macOS, Linux"
  category: "NetworkingApplication"
faq:
  - q: "macOS 应该下载 aarch64 还是 x64 安装包？"
    a: "搭载 M1 / M2 / M3 / M4 芯片的 Apple Silicon Mac 请下载 aarch64.dmg；2020 年前旧款 Intel 芯片 Mac 请下载 x64.dmg。"
  - q: "为什么不要通过搜索引擎广告下载 Clash Verge？"
    a: "搜索广告中常出现拼写相近的仿冒中文网站，安装包可能被植入木马或恶意篡改代理配置；开源客户端应始终从 GitHub 官方 Releases 下载并核对 SHA-256 校验值。"
  - q: "Windows 的 setup.exe 和 portable.zip 有什么区别？"
    a: "setup.exe 是标准安装版，支持自动写入开始菜单快捷方式、开机自启与卸载清理；portable.zip 为免安装便携压缩包，适合放到 U 盘或无管理员安装权限的办公环境，但部分服务模式功能可能受目录权限影响。"
related:
  - title: "安装包 SHA-256 哈希校验实操"
    link: "/articles/clash-verge-checksum-verify"
    description: "用 PowerShell / Terminal 两条命令验证下载文件未被篡改。"
    tag: "安全"
  - title: "Windows 安装与服务模式配置"
    link: "/guides/clash-verge-windows"
    description: "下载后的安装向导、SmartScreen 与防火墙放行步骤。"
    tag: "Windows"
  - title: "macOS 安装与芯片架构识别"
    link: "/guides/clash-verge-macos"
    description: "解除 Gatekeeper “已损坏无法打开”拦截。"
    tag: "macOS"
---

# Clash Verge Rev 官方下载指南（2026）

<TutorialPage
  quick-answer="Clash Verge Rev 唯一的官方开源发布渠道为 GitHub 仓库 github.com/clash-verge-rev/clash-verge-rev/releases。绝大多数 Windows 台式机/笔记本下载 x64-setup.exe；搭载 M1–M4 芯片的 Mac 选 aarch64.dmg，老款 Intel Mac 选 x64.dmg；Ubuntu/Debian 选 .deb，Fedora 选 .rpm，其余 Linux 发行版选 .AppImage。"
  applies-to="Windows 10/11、macOS 12+、Ubuntu/Debian/Fedora/Arch Linux"
  verified-date="2026-11-20"
/>

## 一、全平台官方安装包对照表（按设备架构选包）

下载前在 GitHub Releases 页面展开最新的稳定版 `Assets` 列表，严格按下列系统与 CPU 架构对应下载：

<SoftwareDownload
  title="Clash Verge Rev 官方安装包格式与架构对照"
  :packages="[
    { os: 'Windows 10/11 (主流)', arch: 'x64 (amd64)', format: 'x64-setup.exe', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: '99% Intel/AMD 处理器电脑首选标准安装版' },
    { os: 'Windows 10/11 (免安装)', arch: 'x64 (amd64)', format: 'x64_portable.zip', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: '解压即用的便携版，配置保存在同目录' },
    { os: 'Windows on ARM', arch: 'arm64', format: 'arm64-setup.exe', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: '仅高通骁龙笔记本（Surface Pro X/ARM 等）使用' },
    { os: 'macOS (Apple Silicon)', arch: 'aarch64', format: 'aarch64.dmg', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: 'M1 / M2 / M3 / M4 全系列苹果自研芯片专用' },
    { os: 'macOS (Intel)', arch: 'x64', format: 'x64.dmg', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: '早期 Intel 处理器 Mac 专用，切勿混用' },
    { os: 'Linux (Debian/Ubuntu)', arch: 'amd64 / arm64', format: '.deb', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: '执行 sudo apt install ./Clash.Verge_*.deb 安装' },
    { os: 'Linux (Fedora/RHEL)', arch: 'x86_64', format: '.rpm', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: '执行 sudo dnf install ./Clash.Verge-*.rpm 安装' },
    { os: 'Linux 通用桌面', arch: 'amd64', format: '.AppImage', channel: 'GitHub Releases (clash-verge-rev)', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases', note: 'chmod +x 后运行，Ubuntu 22.04+ 需确保已装 libfuse2' }
  ]"
/>

## 二、怎么快速确认自己电脑的 CPU 架构？

### 1. Windows 系统查看方法
1. 同时按下快捷键 `Win + I` 打开系统「设置」→ 进入「系统」→「系统信息（关于）」。
2. 在「设备规格」找到「系统类型」：
   - 显示 **`64 位操作系统，基于 x64 的处理器`** → 下载 `x64-setup.exe`；
   - 显示 **`基于 ARM 的处理器`** → 下载 `arm64-setup.exe`。
3. 如不想查看图形界面，在 PowerShell 输入 `$env:PROCESSOR_ARCHITECTURE`，输出 `AMD64` 即为 `x64`。

### 2. macOS 查看方法
1. 点击屏幕左上角苹果图标 `` → 选择「关于本机」。
2. 看到 **`芯片：Apple M1 / M2 / M3 / M4`** → 务必下载 **`aarch64.dmg`**；
3. 看到 **`处理器：Intel Core ...`** → 下载 **`x64.dmg`**。
4. 也可在终端运行 `uname -m`：输出 `arm64` 选 `aarch64.dmg`，输出 `x86_64` 选 `x64.dmg`。

### 3. Linux 查看方法
在终端执行 `uname -m` 与 `cat /etc/os-release`：
- `x86_64` + Ubuntu/Debian/Mint/Pop!_OS → 下载 `amd64.deb`；
- `aarch64` + 树莓派/ARM 桌面 Linux → 下载 `arm64.deb` 或对应 ARM 包；
- Arch Linux / Manjaro 用户除 `.AppImage` 外，也可查阅官方 AUR 维护状态并核对上游源。

## 三、识别仿冒官网与安装包安全校验（极其重要）

代理客户端会直接接管系统的本地网络与订阅凭据，近年来黑灰产常购买搜索引擎推广位，伪造 `clashverge-*.com / clash-cn.*` 等所谓“中文官方下载站”。下载前务必坚持以下四条防伪准则：

1. **逐字核对仓库路径**：官方仓库地址固定为 `https://github.com/clash-verge-rev/clash-verge-rev`，开发者与组织名称为 `clash-verge-rev`。凡是诱导先下载所谓“高速下载器”、捆绑安装压缩包或带有莫名其妙 `.msi` 安装程序的网站一律关闭。
2. **避免直接选 Pre-release 测试版**：新手优先选择带有绿色 **`Latest`** 标签的正式版，除非明确需要测试某个新修复的 PR。
3. **验证 SHA-256 校验值**：在 GitHub Release 页面通常附带 `.sha256` 文件或校验摘要文本。下载完成后，在本地运行一行系统内置命令即可确认文件比特级一致（详细步骤见 [SHA-256 哈希校验实操](/articles/clash-verge-checksum-verify)）：
   - Windows PowerShell：`Get-FileHash .\Clash.Verge_*.exe -Algorithm SHA256`
   - macOS / Linux：`shasum -a 256 Clash.Verge_*.dmg`
4. **国内直连 GitHub 较慢时的安全替代思路**：不要去百度网盘随便搜未知网友分享的附件；可优先通过手机热点切换网络、或通过已经信任的已有开源镜像/先行环境获取，且**获取后必须再次对比官方 Release 页的 SHA-256 值**。

## 四、下载后的不同系统首次启动提醒

- **Windows**：双击 `.exe` 时若系统弹出 Microsoft Defender SmartScreen 蓝屏提示“Windows 已保护你的电脑”，这是因为独立开源项目未购买商业签名证书。确认仓库来源正确且 SHA-256 一致后，点「更多信息」→「仍要运行」即可。
- **macOS**：将软件拖入 `Applications` 后首次打开若提示“已损坏，无法打开”，并非文件真的损坏，而是 Gatekeeper 隔离标记所致。打开终端执行 `sudo xattr -r -d com.apple.quarantine /Applications/Clash\ Verge.app` 即可解除（详见 [macOS 安装指南](/guides/clash-verge-macos)）。

## 五、常见问题（FAQ）

<FAQSection
  title="下载与安装选包 FAQ"
  :items="[
    { q: 'macOS 应该下载 aarch64 还是 x64 安装包？', a: '搭载 M1 / M2 / M3 / M4 芯片的 Apple Silicon Mac 请下载 aarch64.dmg；旧款 Intel 芯片 Mac 请下载 x64.dmg。' },
    { q: '为什么不要通过搜索引擎广告下载 Clash Verge？', a: '搜索广告中常出现仿冒官网，可能植入木马或篡改代理配置；开源客户端应始终从官方 GitHub Releases 下载并核对发布签名/校验值。' },
    { q: 'Windows 的 setup.exe 和 portable.zip 有什么区别？', a: 'setup.exe 是标准安装版，支持写入快捷方式与系统服务模式；portable.zip 为免安装便携包，适合受限办公环境。' },
    { q: '安装新版本前需要手动卸载旧版 Clash Verge Rev 吗？', a: '正常同分支升级可直接覆盖安装或使用客户端内自动检查更新功能（建议提前导出一次配置备份）；但如果是从已归档原版 Clash Verge 或 CFW 迁移，建议先备份订阅链接再全新安装。' }
  ]"
/>

<ClusterDirectory topic-link="/clash/verge-download" />
