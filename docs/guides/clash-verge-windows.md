---
title: "Clash Verge Rev Windows 安装与权限配置教程（2026）"
description: "手把手指导在 Windows 10/11 安装 Clash Verge Rev：区分 x64/arm64 安装包与便携版、处理 SmartScreen 拦截、清理 Clash for Windows 冲突残留、安装 Service Mode 服务模式并排查权限报错。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge Windows
  - 安装教程
  - Clash Verge Rev
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
softwareApp:
  name: "Clash Verge Rev"
  os: "Windows 10, Windows 11"
  category: "NetworkingApplication"
faq:
  - q: "Windows 提示“Windows 已保护你的电脑（SmartScreen）”怎么办？"
    a: "由于开源桌面软件未必购买商业 EV 代码签名证书，确认下载自 github.com/clash-verge-rev/clash-verge-rev/releases 并核对 SHA-256 后，点击「更多信息」→「仍要运行」即可。"
  - q: "一定要安装服务模式（Service Mode）吗？"
    a: "如果只用 Chrome/Edge 等支持系统代理的浏览器，不安装服务模式也能正常上网；但如果需要开启 TUN 模式接管 PowerShell、Git、Docker、游戏或 UWP 应用，必须安装服务模式。"
  - q: "安装版 setup.exe 与便携版 portable.zip 该怎么选？"
    a: "常规个人电脑建议选择 x64-setup.exe，自动配置开始菜单与服务模式目录权限最省心；仅在无管理员写入系统目录权限、或需要将软件整体放入 U 盘/非系统盘随身携带时，才选便携版。"
  - q: "曾经装过旧版 Clash for Windows，可以直接覆盖安装吗？"
    a: "不建议直接混用。两者默认混合端口、系统代理注册表项与虚拟网卡驱动容易冲突，应先在旧软件中取消「系统代理」与「TUN Mode」开关，彻底退出并卸载后再装 Clash Verge Rev。"
related:
  - title: "订阅导入与策略组配置"
    link: "/guides/clash-verge-subscription-setup"
    description: "安装完成后的下一步：导入订阅并切换低延迟节点。"
    tag: "下一步"
  - title: "TUN 模式开启与服务授权"
    link: "/guides/clash-verge-tun"
    description: "深入配置虚拟网卡模式与防火墙放行。"
    tag: "进阶"
  - title: "端口被占用与进程恢复"
    link: "/articles/clash-verge-port-conflict-recovery"
    description: "排查 7890 / 7897 端口冲突与异常退出断网。"
    tag: "排障"
  - title: "安装包 SHA-256 校验方法"
    link: "/articles/clash-verge-checksum-verify"
    description: "下载 exe 后用一行 PowerShell 验证文件未被篡改。"
    tag: "安全"
---

# Clash Verge Rev Windows 安装与权限配置教程（2026）

<TutorialPage
  quick-answer="在 Windows 10/11 上安装 Clash Verge Rev，只需从 GitHub 官方仓库下载 x64-setup.exe 安装包（绝大多数 64 位电脑）并按向导安装；遇到 Microsoft Defender SmartScreen 提示时点击「更多信息 → 仍要运行」；如只需浏览器上网可直接使用「系统代理」，需要接管终端、Docker、游戏或 UWP 应用时再于「设置」安装「服务模式（Service Mode）」。"
  applies-to="Windows 10 (1909+) / Windows 11 (x64 / arm64)"
  verified-date="2026-11-20"
/>

<VersionInfo
  software-name="Clash Verge Rev"
  core-name="Mihomo (Clash.Meta)"
  :platforms="['Windows 10', 'Windows 11']"
  official-channel="GitHub: clash-verge-rev/clash-verge-rev/releases"
  verified-date="2026-11-20"
/>

<ProxyArchitectureDiagram mode="windows-service" />

## 一、安装前准备与架构核对（含安装包对照表）

在双击安装前，花 1 分钟确认电脑 CPU 架构与安装包类型，能直接避免 80% 的“打不开”“白屏”或“无法启动服务模式”报错。

### 1. 用一行命令确认系统架构与可用端口

按 `Win + X` 打开「终端 (PowerShell)」，执行以下命令核查 CPU 架构，并确认默认端口（`7897` / `9097`）未被残留代理软件占用：

```powershell
# 1) 查看操作系统与处理器架构（AMD64 对应 x64 安装包，ARM64 对应 arm64 安装包）
$env:PROCESSOR_ARCHITECTURE

# 2) 检查 7890 / 7897 代理端口是否已被旧客户端占用（无输出表示空闲）
netstat -ano | findstr ":7890 :7897 :9097"
```

### 2. 官方安装包后缀选择对照

| GitHub Release 文件名特征 | 适用设备与场景 | 权限要求 | 说明与建议 |
| :--- | :--- | :--- | :--- |
| `*_x64-setup.exe` | **绝大多数 Intel / AMD 64 位台式机与笔记本（首选）** | 标准安装需 UAC 授权（或仅当前用户安装） | 自动创建桌面快捷方式与注册卸载项，服务模式兼容性最佳 |
| `*_arm64-setup.exe` | 高通骁龙 X Elite / Snapdragon 笔记本等 Windows ARM64 设备 | 同上 | 切勿在 ARM64 机器强行用 x64 转译跑 TUN 虚拟网卡，性能损耗明显 |
| `*_x64_portable.zip` | 不想写入注册表、需跨电脑放移动硬盘随身使用的场景 | 标准运行无需安装；装服务模式仍需管理员权限 | 解压路径不要包含中文、空格或放在 `OneDrive` 同步文件夹内 |

### 3. 清理旧版冲突客户端（Clash for Windows 等）

如果这台电脑曾装过早已停止维护的 `Clash for Windows` 或其他代理软件，请务必按顺序清理后再装新版本：

1. 先打开旧软件，**手动关闭「System Proxy（系统代理）」和「TUN Mode / Mixin」开关**，避免关闭后浏览器仍卡在旧端口导致“断网”；
2. 打开任务管理器（`Ctrl + Shift + Esc`），检查并结束残留的 `clash-win64.exe`、`Clash for Windows.exe` 或旧版 `Clash Core Service`；
3. 如果旧软件开启过“以系统代理启动”，可运行下方 PowerShell 检查 Windows 注册表当前代理状态是否为 `0`（已关闭）：

```powershell
Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" |
  Select-Object ProxyEnable, ProxyServer, ProxyOverride
```

> 安全提醒：切勿在第三方网盘或搜索广告下载“绿色汉化官网版 Clash for Windows”，请通过 [安装包 SHA-256 校验教程](/articles/clash-verge-checksum-verify) 核验官方原版完整性。

---

## 二、Windows 安装与初始权限配置五步法

<TutorialSteps
  heading="从安装包启动到服务模式就绪的完整步骤"
  :steps="[
    {
      title: '1. 绕过 SmartScreen 拦截并完成英文路径安装',
      detail: '双击 x64-setup.exe 后，若出现「Windows 已保护你的电脑」蓝窗，点击文字链接「更多信息」→ 按钮「仍要运行」。安装路径建议保持默认或设为纯英文目录（例如 C:\\Program Files\\Clash Verge 或 D:\\Tools\\ClashVerge），避免极少数权限脚本或内核路径转义异常。'
    },
    {
      title: '2. 处理 WebView2 运行时（仅老系统需要）',
      detail: 'Clash Verge Rev 桌面界面依赖 Microsoft Edge WebView2。Windows 11 默认自带无需操作；若老版本 Windows 10 启动后界面全白或弹窗提示缺少 WebView2，从微软官网下载 Evergreen Bootstrapper 安装后重启客户端即可。'
    },
    {
      title: '3. 切换简体中文并核对默认内核',
      detail: '打开软件，点击左侧菜单最下方「Settings（设置）」→ 将 Language 下拉改为「简体中文」。在同一页面查看「Clash 内核」是否为默认激活的 Mihomo（支持 VLESS-Reality、Hysteria 2 等现代协议）。'
    },
    {
      title: '4. 按需安装服务模式（Service Mode）',
      detail: '在「设置 → Clash 设置」中找到「服务模式」一行，点击右侧安装/盾牌图标，在 Windows UAC 提权弹框中点击「是」。等待约 2–3 秒，状态图标转为绿色“服务已运行”，此后开启 TUN 模式无需每次输入管理员密码。'
    },
    {
      title: '5. 按需开启开机自启与 UWP 环回豁免',
      detail: '常驻设备建议开启「开机自启」与「静默启动（启动后最小化到右下角托盘）」；若需要使用 Microsoft Store、Xbox 应用、Edge 扩展或邮件客户端等 UWP 应用走代理，点击「UWP 应用联网豁免」按需勾选放行。'
    }
  ]"
/>

---

## 三、权限、防火墙与杀毒软件白名单配置

Windows 环境下最容易出现“软件开着却所有节点超时”或“服务模式点不动”，通常与以下三类系统安全策略有关：

1. **Windows Defender 防火墙放行**：首次启用系统代理或 TUN 虚拟网卡时，系统会弹出防火墙放行提示，请**同时勾选「专用网络」与「公用网络」**再点击「允许访问」。如之前误点了取消，可在 PowerShell（管理员）中检查是否有阻止规则，或在「Windows 安全中心 → 防火墙和网络保护 → 允许应用通过防火墙」中手动放行 `clash-verge.exe` 与 `verge-mihomo.exe`。
2. **第三方安全软件误报隔离**：火绒、360 安全卫士、腾讯电脑管家等国产安全软件有时会将内核进程 `verge-mihomo.exe` 或 `clash-verge-service.exe` 识别为代理可疑进程而静默隔离。若出现“内核启动失败（Core Error）”，请检查安全软件的「隔离区」，恢复文件并将安装目录与 `%APPDATA%\io.github.clash-verge-rev.clash-verge-rev` 加入信任白名单。
3. **公司域控电脑权限受限处理**：若在公司电脑上没有本地管理员权限安装 `Service Mode`，**不要强行安装服务模式**。改用“仅系统代理模式 + 在 Git/VS Code/终端手动配置 `http://127.0.0.1:7897`”，详见 [WSL2、Docker 与终端代理指引](/articles/clash-verge-wsl2-docker-proxy)。

### 服务模式状态命令行自检

如果你怀疑 Service Mode 安装了但后台服务没有起来，可直接执行以下 PowerShell 查看服务运行状态：

```powershell
# 查看 Clash Verge 后台服务是否处于 Running 状态
Get-Service | Where-Object { $_.DisplayName -match "Clash|Verge" -or $_.Name -match "clash|verge" }

# 验证混合端口 7897 是否正常监听
Test-NetConnection -ComputerName 127.0.0.1 -Port 7897
```

---

## 四、常见安装与权限报错排查

<TroubleshootingGuide
  title="Windows 安装阶段高频报错对应处理"
  :cases="[
    {
      symptom: '安装服务模式提示 Access Denied 或状态一直转圈/灰色不可点击',
      cause: '当前 Windows 登录账户非管理员，或者安全软件拦截了系统服务注册（sc create）。',
      solution: '右键桌面 Clash Verge Rev 图标选择「以管理员身份运行」一次，点击安装服务模式；成功激活后关闭软件，以后正常双击启动即可保持服务可用。'
    },
    {
      symptom: '软件启动瞬间闪退或右下角弹窗提示端口 7897 已被占用',
      cause: '上次异常关机残留了 mihomo 进程，或者电脑上同时打开了 v2rayN / 机场自研客户端 / 游戏加速器占用了同一端口。',
      solution: '先彻底退出其他代理工具并在任务管理器结束 clash/mihomo 进程；或在设置中将默认「混合端口」从 7897 改为 17897 后重启内核。'
    },
    {
      symptom: '开启 UWP / Microsoft Store 仍然无法联网',
      cause: 'Windows UWP 沙盒默认禁止访问 127.0.0.1 本地环回接口。',
      solution: '点击设置中的「UWP 应用联网豁免」全选或勾选对应商店应用，保存后再重试；若已开启 TUN 模式，多数流量也可直接由虚拟网卡接管。'
    }
  ]"
/>

---

## 五、常见问题（FAQ）

<FAQSection
  title="Windows 安装 FAQ"
  :items="[
    {
      q: 'Windows 提示“Windows 已保护你的电脑（SmartScreen）”怎么办？',
      a: '这是微软系统对未购买商业 EV 代码签名证书的开源安装包触发的常规提醒。只要确认文件来自 github.com/clash-verge-rev/clash-verge-rev/releases 且 SHA-256 哈希一致，点击「更多信息」→「仍要运行」即可。'
    },
    {
      q: '一定要安装服务模式（Service Mode）吗？',
      a: '不一定。如果你平时只用 Chrome/Edge 看网页，保持服务模式未安装、只开「系统代理」也能正常使用；只有当你需要开启 TUN 模式接管终端、Docker、游戏客户端或 UWP 应用时才需要安装。'
    },
    {
      q: '升级 Clash Verge Rev 新版本需要卸载重装吗？',
      a: '大多数常规小版本可以直接在软件内检查更新或下载新版 setup.exe 覆盖安装，原有订阅配置与本地规则保留在 AppData 中不会丢失。但遇到大版本升级服务模式协议变更时，如果 TUN 无法开启，先点击「卸载服务」再重装服务即可。'
    },
    {
      q: '配置文件与订阅保存在电脑哪个文件夹？重装系统前怎么备份？',
      a: 'Windows 配置目录默认位于 %APPDATA%\\io.github.clash-verge-rev.clash-verge-rev\\。重装系统前可在「设置 → 备份设置」一键导出完整压缩包，详见跨电脑备份迁移教程。'
    }
  ]"
/>

## 下一步建议

- 安装完成后，按 [Clash Verge Rev 订阅导入教程](/guides/clash-verge-subscription-setup) 添加服务商配置文件并测速切换节点；
- 需要开发命令行、游戏或全应用分流，继续阅读 [TUN 模式开启与虚拟网卡排障](/guides/clash-verge-tun)。
