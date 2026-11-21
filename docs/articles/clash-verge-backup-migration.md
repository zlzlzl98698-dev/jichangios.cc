---
title: "Clash Verge Rev 配置文件备份、恢复与跨电脑迁移指南（2026）"
description: "手把手指导在重装系统、升级硬件或换机前完整备份 Clash Verge Rev 的订阅列表、Merge/Script 本地覆写规则与系统偏好，包含 WebDAV 云同步、离线目录拷贝及还原后 Service Mode 报错处理。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge 备份
  - 配置迁移
  - Clash Verge Rev
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "导出本地备份压缩包时，里面包含的机场订阅链接安全吗？可以发到网盘吗？"
    a: "极度敏感，切勿上传到公开分享链接或未加密网盘！备份包里的 profiles.yaml 完整保存了你所有机场订阅地址和账户 Token，任何拿到它的人都可以直接使用你的流量或重置订阅。"
  - q: "跨电脑还原配置后，系统代理能用但 TUN 模式打不开怎么办？"
    a: "配置文件可以迁移，但 Windows/macOS 底层的「服务模式（Service Mode）」是操作系统级守护服务，必须在新电脑的「设置 → Clash 设置 → 服务模式」重新点击安装一次并授予管理员权限。"
  - q: "从 Windows 备份的配置可以直接导入到 macOS 或 Linux 吗？"
    a: "绝大多数订阅列表、Merge 与 Script 覆写文件都能跨系统通用；但要注意查看个别系统专有设置（如 UWP 豁免或 Windows 特有网卡名称绑定），还原后若报错优先检查 TUN 网卡出口设置。"
  - q: "旧电脑系统崩溃进不了界面了，只留着硬盘数据还能找回配置文件吗？"
    a: "可以。直接从旧硬盘对应用户目录下拷贝 io.github.clash-verge-rev.clash-verge-rev 配置目录中的 profiles.yaml 与 profiles/ 文件夹到新电脑同位置即可。"
related:
  - title: "Clash Verge Rev Windows 安装教程"
    link: "/guides/clash-verge-windows"
    description: "在新电脑完成安装后恢复备份配置。"
    tag: "安装"
  - title: "全局覆写（Merge / Script）实战"
    link: "/articles/clash-verge-override-script"
    description: "备份后如何长期维护互不干扰的本地规则扩展。"
    tag: "进阶"
  - title: "Clash Verge Rev 特性与版本说明"
    link: "/clash/verge"
    description: "了解客户端各模块功能。"
    tag: "基础"
---

# Clash Verge Rev 配置文件备份、恢复与跨电脑迁移

<TutorialPage
  quick-answer="Clash Verge Rev 原生自带「本地导出/导入备份」与「WebDAV 云端同步备份」。重装系统或换新电脑前，只需在「设置 → 备份设置」一键导出完整压缩包（包含全部订阅 URL、本地 Merge/Script 覆写规则与客户端参数），在新机安装软件后导入还原并重装一次 Service Mode 即可无缝衔接。"
  applies-to="Clash Verge Rev (Windows / macOS / Linux)"
  verified-date="2026-11-20"
/>

## 一、备份里保存了哪些核心文件？各有什么用？

不论使用内置备份功能还是手工打包目录，核心数据由以下三部分组成：

| 核心文件 / 文件夹 | 存放内容 | 丢失影响 |
| :--- | :--- | :--- |
| **`profiles.yaml`** | 全部订阅卡片元数据、订阅 URL（含 Token）、自动更新周期与当前激活项 | 需去每家机场官网重新复制订阅链接导入 |
| **`profiles/` 目录** | 各订阅缓存 YAML 正文，以及你辛苦写的 **`Merge` / `Script` 局部覆写脚本** | 自己编写的 AI 分流与内网直连脚本会全部丢失 |
| **`verge.yaml` / `clash.yaml`** | 界面语言、混合端口号（如 `7897`/`17897`）、TUN 栈设置与日志级别 | 软件重置回出厂默认选项，但可手动重配 |

---

## 二、图形界面备份与 WebDAV 跨设备同步步骤

<TutorialSteps
  heading="标准导出备份与新电脑还原四步法"
  :steps="[
    {
      title: '1. 旧电脑导出完整备份或上传 WebDAV',
      detail: '打开 Clash Verge Rev 左侧「设置 (Settings)」→ 找到「备份设置（Backup Setting）」。单次换机点击「导出本地备份（Export Local Backup）」保存 .zip；多台设备长期同步可配置个人 WebDAV（如坚果云、自建 Alist/Nextcloud WebDAV）开启远端备份。'
    },
    {
      title: '2. 安全转移备份压缩包',
      detail: '使用加密 U 盘或端到端加密通道将导出的备份 zip 传到新电脑（切勿通过公开群聊或无密码共享链接传递）。'
    },
    {
      title: '3. 在新电脑安装原版客户端并导入还原',
      detail: '在新电脑先从官方 GitHub 完成安装并切换到简体中文，进入「设置 → 备份设置 → 导入本地备份（Import Local Backup）」，选定 zip 还原后按提示重启客户端。'
    },
    {
      title: '4. 新机必做收尾：重装 Service Mode 并刷一遍订阅',
      detail: '重启后会发现全部订阅卡片与脚本已经回来；如需用 TUN 模式，务必在新机设置重新点击安装「服务模式」，最后右键常用订阅点一次「更新」确认网络可用。'
    }
  ]"
/>

---

## 三、旧电脑打不开软件时的“硬盘救援”路径与命令行打包

如果你的电脑突然蓝屏只能通过 PE 或把旧硬盘挂载到读卡盒里读取文件，直接前往以下原始用户数据路径找回整个目录：

| 操作系统 | 默认配置数据文件夹真实路径 |
| :--- | :--- |
| **Windows 10 / 11** | `%APPDATA%\io.github.clash-verge-rev.clash-verge-rev\` |
| **macOS** | `~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/` |
| **Linux** | `~/.local/share/io.github.clash-verge-rev.clash-verge-rev/` |

### 快速查看与命令行打包命令

```powershell
# Windows PowerShell：直接跳转到配置目录并打开资源管理器
explorer "$env:APPDATA\io.github.clash-verge-rev.clash-verge-rev"
```

```bash
# macOS：直接将配置目录打包成桌面的加密压缩包
zip -r -e ~/Desktop/clash-verge-backup.zip ~/Library/Application\ Support/io.github.clash-verge-rev.clash-verge-rev/
```

---

## 四、常见问题与跨系统迁移排错

<TroubleshootingGuide
  title="还原配置后高发小异常解决"
  :cases="[
    {
      symptom: '导入备份后所有订阅和脚本都在，但点击 TUN 模式开关立刻弹回',
      cause: 'WebDAV 与 zip 备份只恢复用户数据，无法替新系统自动注册 Windows 服务或 macOS Helper 守护进程。',
      solution: '前往「设置 → Clash 设置 → 服务模式」点击安装激活即可。'
    },
    {
      symptom: '从 Windows 备份导入到 Mac 后报错 invalid interface / 网卡不存在',
      cause: '之前在 Windows 配置里手动死绑过某个具体物理网卡名称（interface-name: 以太网）。',
      solution: '打开本地 Merge/TUN 设置，删除固定 interface-name 指定，开启 auto-detect-interface: true 自动检测出口网卡。'
    },
    {
      symptom: '导入备份后原本好好的 Script 覆写突然报错或路径找不到',
      cause: '如果以前脚本里写死了 Windows 绝对路径（C:\\Users\\...），跨盘符或换系统后文件路径会失效。',
      solution: '尽可能通过软件内置「订阅 → 覆写」或相对 ./ruleset/ 路径引用规则文件，不要硬编码盘符路径。'
    }
  ]"
/>

## 五、常见问题（FAQ）

<FAQSection
  title="备份与迁移 FAQ"
  :items="[
    {
      q: '导出本地备份压缩包时，里面包含的机场订阅链接安全吗？',
      a: '非常敏感，profiles.yaml 包含你账户的订阅 Token，绝不可直接上传公共仓库或未加密公网分享。'
    },
    {
      q: '跨电脑还原配置后，系统代理能用但 TUN 模式打不开怎么办？',
      a: '必须在新电脑的设置里重新点击安装「服务模式（Service Mode）」并赋予系统管理员/密码权限，随后 TUN 即可正常运行。'
    },
    {
      q: '从旧版 Clash for Windows 迁移到 Clash Verge Rev，旧配置文件夹可以直接复制过去吗？',
      a: '不能直接整包覆盖！两者目录结构和覆写脚本标准不同。正确做法是先导出或复制好你原先的机场订阅链接 URL，并在 Clash Verge Rev 中重新导入订阅后按本指南使用 Merge/Script 覆写。'
    }
  ]"
/>
