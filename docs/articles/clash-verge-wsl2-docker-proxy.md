---
title: "Clash Verge Rev 配合 WSL2、Docker 与 Git 终端代理配置指南（2026）"
description: "彻底解决 Windows 下 WSL2 (Ubuntu) 子系统、Docker Desktop / Linux dockerd 拉取镜像、Git/npm/pip 命令行不走 Clash Verge 代理的难题，对比 TUN 模式与 WSL2 Mirrored 镜像网络最新实践。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - WSL2 代理
  - Docker 代理
  - Clash Verge TUN
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "Windows 11 下让 WSL2 走代理，用 Mirrored 镜像模式还是传统 NAT + Allow LAN 好？"
    a: "Windows 11 22H2+ 强烈推荐使用官方 networkingMode=mirrored（镜像网络模式）并配合 autoProxy=true，WSL2 可以直接访问宿主机 127.0.0.1:7897 且不用开允许局域网和改复杂防火墙规则；仅老版本 Windows 10 才需退回传统 NAT + Allow LAN。"
  - q: "为什么已经在 Clash Verge 开了系统代理，git clone 和 docker pull 还是超慢或 Connection timed out？"
    a: "Git 与 Docker 守护进程默认不会主动读取 Windows 用户态的 IE/WinINet 系统代理设置。Git 需要单独设 http.proxy，Docker Desktop 需要在 Settings → Resources → Proxies 填入 127.0.0.1:7897（或者直接开启 Clash Verge TUN 模式）。"
  - q: "开启了 TUN 模式之后，WSL2 还是连接不到外网怎么办？"
    a: "检查两个位置：1. 确保 Clash Verge 的 TUN 配置启用了 DNS 劫持和 Auto Route；2. 若 WSL2 在传统 NAT 模式下把 DNS 设死向宿主机虚拟网关却被 Windows 防火墙拦截了 UDP 53 入站，建议切回 Mirrored 模式并开启 dnsTunneling=true。"
  - q: "配置了 Git 代理后如何临时访问国内 Gitee 或公司内网 GitLab 不绕远？"
    a: "使用 git config --global http.https://github.com.proxy http://127.0.0.1:7897 仅针对 GitHub 指定域名走代理，其余内网与国内仓库天然直连！"
related:
  - title: "TUN 模式开启与冲突排查"
    link: "/guides/clash-verge-tun"
    description: "了解 TUN 虚拟网卡为何能接管大多数 CLI 流量。"
    tag: "基础"
  - title: "连接超时与报错排查"
    link: "/guides/clash-verge-errors"
    description: "排查防火墙阻断或端口冲突问题。"
    tag: "排障"
  - title: "Linux DEB/RPM/AppImage 安装"
    link: "/guides/clash-verge-linux"
    description: "查阅原生 Linux 下 systemd dockerd 服务代理配置。"
    tag: "Linux"
---

# Clash Verge Rev 配合 WSL2、Docker 与 Git 终端代理配置

<TutorialPage
  quick-answer="在 Windows 上让 Git、Docker 与 WSL2 顺畅走 Clash Verge Rev 代理，最现代的做法有三招：1. Windows 11 22H2+ 为 WSL2 开启 networkingMode=mirrored 镜像网络自动直连宿主机 127.0.0.1:7897；2. Docker Desktop 在 Settings → Proxies 显式填写代理端口；3. 日常开发直接开启 Service Mode + TUN 模式一劳永逸。"
  applies-to="Windows 10/11 + WSL2 / Docker Desktop / Git Bash / PowerShell"
  verified-date="2026-11-20"
/>

## 一、开发工具代理方案快速决策矩阵

| 工具环境 | 方案 1：仅开 TUN 模式是否够用 | 方案 2：不用 TUN 时的显式直指写法 | 推荐度最高做法 |
| :--- | :--- | :--- | :--- |
| **PowerShell / CMD** | 是 | `$env:HTTPS_PROXY="http://127.0.0.1:7897"` | TUN 或临时变量 |
| **Git（仅加速 GitHub）** | 是 | `git config --global http.https://github.com.proxy http://127.0.0.1:7897` | **按域名定向配 Git 代理最不影响内网** |
| **Docker Desktop** | 视 WSL 后端设置而定 | Settings → Resources → Proxies 填 `http://127.0.0.1:7897` | **建议在 Docker 设置显式填写 + Bypass** |
| **WSL2 (Win11 22H2+)** | **Mirrored 模式下极佳** | `.wslconfig` 配 `networkingMode=mirrored` + `autoProxy=true` | **微软原生镜像网络模式** |
| **WSL2 (Windows 10 老 NAT)** | 需配合防火墙放行 | Clash 开 `允许局域网 (Allow LAN)` + 指向宿主机网关 IP | 升级 Win11 或加防火墙入站规则 |

---

## 二、Git 与 PowerShell / npm / pip 精细代理

### 1. Git 推荐写法（只让 GitHub 走代理，绝不影响公司内网 GitLab）

与其全局把所有 Git 仓库塞进代理导致内网 `gitlab.corp` 报错，不如**按域名前缀精准挂载代理**：

```bash
# 仅针对 GitHub 走 Clash Verge 默认混合端口 7897（内网/国内仓库保持直连）
git config --global http.https://github.com.proxy http://127.0.0.1:7897
git config --global https.https://github.com.proxy http://127.0.0.1:7897

# 若使用 Git SSH (ssh://git@github.com) 被阻断，可加进 ~/.ssh/config 走 443 + HTTP 代理：
# Host github.com
#   Hostname ssh.github.com
#   Port 443
#   ProxyCommand connect -H 127.0.0.1:7897 %h %p
```

### 2. PowerShell 当前会话代理函数（放进 `$PROFILE` 随叫随用）

```powershell
function proxy-on {
  $env:HTTP_PROXY = "http://127.0.0.1:7897"
  $env:HTTPS_PROXY = "http://127.0.0.1:7897"
  $env:ALL_PROXY = "socks5://127.0.0.1:7897"
  Write-Host "Shell proxy -> 127.0.0.1:7897" -ForegroundColor Green
}

function proxy-off {
  Remove-Item Env:HTTP_PROXY, Env:HTTPS_PROXY, Env:ALL_PROXY -ErrorAction SilentlyContinue
  Write-Host "Shell proxy cleared" -ForegroundColor Yellow
}
```

---

## 三、WSL2 完整配置（Win11 Mirrored 首选 vs Win10 NAT 兼容）

### 方案 A（推荐 · Windows 11 22H2+）：开启 Mirrored 镜像网络

在 Windows 当前用户目录 `C:\Users\<你的用户名>\.wslconfig` 新建或追加以下内容：

```ini
[wsl2]
networkingMode=mirrored
dnsTunneling=true
autoProxy=true
```

保存后在 PowerShell 运行 `wsl --shutdown` 彻底重启 WSL，再次进入 Ubuntu 后执行测试：
```bash
# 检查自动同步到的宿主机代理变量与 127.0.0.1 互通情况
echo $HTTP_PROXY
curl -I https://www.google.com
```

### 方案 B（Windows 10 / 传统 NAT 架构）

Windows 10 NAT 下 WSL2 处于独立子网，无法直接把 `127.0.0.1` 指回宿主机：
1. 在 Clash Verge Rev「设置」打开 **允许局域网（Allow LAN）**；
2. 用管理员 PowerShell 允许 WSL 虚拟网卡访问宿主端口，避免 Windows 防火墙静默拦截：
   ```powershell
   New-NetFirewallRule -DisplayName "WSL Clash Proxy" -Direction Inbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
   ```
3. 在 WSL2 `~/.bashrc` 或当前终端获取宿主机网关 IP 并导出代理：
   ```bash
   export HOST_IP=$(ip route show | grep -i default | awk '{ print $3}')
   export http_proxy="http://${HOST_IP}:7897"
   export https_proxy="http://${HOST_IP}:7897"
   ```

---

## 四、Docker Desktop 与原生 Linux `dockerd` 镜像拉取代理

### 1. Windows / macOS Docker Desktop
打开 Docker Desktop → **Settings → Resources → Proxies** → 开启 **Manual proxy configuration**：
- **Web Server (HTTP)**：`http://127.0.0.1:7897`
- **Secure Web Server (HTTPS)**：`http://127.0.0.1:7897`
- **Bypass proxy settings for these hosts & domains**：`localhost,127.0.0.1,*.local`
- 点击 **Apply & Restart**。

### 2. 原生 Linux 服务器或 WSL 内独立 Docker Engine (`systemd`)

注意在容器构建阶段（`docker build`）如果还要走代理，仅仅靠环境变量不够，拉取镜像走的是 `dockerd` 守护进程，需创建 `/etc/systemd/system/docker.service.d/http-proxy.conf`：

```ini
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7897"
Environment="HTTPS_PROXY=http://127.0.0.1:7897"
Environment="NO_PROXY=localhost,127.0.0.1,docker.mirrors.internal"
```
随后执行 `sudo systemctl daemon-reload && sudo systemctl restart docker` 重载生效。

---

## 五、常见问题（FAQ）

<FAQSection
  title="开发与容器代理 FAQ"
  :items="[
    {
      q: 'Windows 11 下配置了 mirrored 网络模式后，还是提示 Connection refused 怎么办？',
      a: '确认编辑的文件位于 Windows 主目录 C:\\Users\\用户名\\.wslconfig（不能带 .txt 后缀），且修改后必须跑一次 wsl --shutdown 等待 8 秒再重新启动发行版；同时确认 Clash Verge 的端口与设置一致。'
    },
    {
      q: 'Docker pull 已经配置代理且加速成功，为什么 docker build 里面执行 apt update / pip install 还是失败？',
      a: '守护进程代理（dockerd）只管拉基础镜像；容器 build 内部命令网络需要通过 --network=host 结合宿主机变量，或者在 build 时显式传 --build-arg HTTP_PROXY=...。'
    },
    {
      q: '用了公司内网镜像仓库（如 harbor.internal），加了代理反而拉不下来怎么处理？',
      a: '务必在 Docker Proxies 的 Bypass 列表（或 Linux NO_PROXY 变量）中补充你的内网仓库域名和网段，如 *.internal,192.168.0.0/16。'
    }
  ]"
/>
