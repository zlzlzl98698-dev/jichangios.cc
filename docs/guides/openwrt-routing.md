---
title: "OpenWrt 软路由代理客户端指南（2026）- OpenClash / PassWall2 / Nikki / HomeProxy"
description: "详述 OpenWrt 软路由五大透明代理插件（OpenClash、PassWall2、Nikki、HomeProxy、v2rayA）的技术选型、OpenWrt 24.10 版本与 fw3/fw4 防火墙依赖、旁路由网关防环路及专属客户端不可用限制说明。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - OpenWrt
  - OpenClash
  - Nikki
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "为什么软路由上安装 Nikki 一直失败或提示依赖版本冲突？"
    a: "Nikki 官方项目明确要求 OpenWrt 24.10 及以上版本，以及适配 nftables (fw4) 的现代软件源。如果你跑的是 21.02 / 22.03 / 23.05 或早期魔改版固件，请不要强装 Nikki，优先使用 OpenClash 或 PassWall2。"
  - q: "所有机场都可以放进 OpenClash / PassWall2 吗？"
    a: "绝对不是！软路由透明代理必须依赖机场下发通用订阅链接（YAML/Base64/sing-box）。凡是仅提供自研专属 App、不开放第三方订阅的机场（如飞猫云、SOGO 云、闪跃、全球云、隐形人等）通常无法配置进 OpenClash。"
  - q: "OpenWrt 做旁路由（单臂路由）导致全屋断网或国内卡顿怎么排查？"
    a: "95% 出现在两个错误：1. 主路由与旁路由同时开启冲突 DHCP；2. 旁路由未开启防火墙 IP 动态伪装 (SNAT/Masquerading)，或网关、DNS 互相指向对方形成死循环。"
  - q: "硬路由 16MB/64MB 闪存适合安装 OpenClash 或 PassWall2 吗？"
    a: "非常不推荐。Mihomo 与 sing-box 核心本身就占用 20–35MB 存储空间，加上规则与 GeoIP/GeoSite 数据库极易撑爆小闪存路由器导致设置无法保存甚至变砖；软路由部署建议至少 256MB 以上可用空间。"
related:
  - title: "Clash Meta (Mihomo) 内核解析"
    link: "/clash/meta"
    description: "了解 OpenClash 与 Nikki 所依赖的 Mihomo 内核特性。"
    tag: "内核"
  - title: "全平台客户端矩阵"
    link: "/guides/multi-platform-clients"
    description: "查看其余终端的配套方案。"
    tag: "矩阵"
  - title: "专属客户端 vs 通用订阅对比"
    link: "/comparisons/dedicated-client-vs-third-party"
    description: "选购软路由专用机场前，分清哪些品牌支持开放订阅。"
    tag: "对比"
---

# OpenWrt 软路由代理客户端指南（2026）

<TutorialPage
  quick-answer="OpenWrt 软路由选型前必须核查四项硬件与固件门槛：1. OpenWrt 发行版本（22.03/23.05 vs 24.10+）；2. 路由器 CPU 架构（x86_64/aarch64 等）；3. 包管理器（opkg vs apk）；4. 防火墙栈（fw3/iptables vs fw4/nftables）。其中 Nikki 官方明确要求 OpenWrt 24.10 及以上版本；同时务必确认所购机场支持通用订阅。"
  applies-to="x86_64 / ARM 软路由与 OpenWrt 22.03 / 23.05 / 24.10+"
  verified-date="2026-11-20"
/>

<ProxyArchitectureDiagram mode="openwrt" />

## 一、OpenWrt 五大主流透明代理方案对照

| 插件名称 | 底层核心 | 固件与防火墙门槛 | 优势与局限 | 最适合环境 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClash** | Mihomo (Clash) | 支持 `fw3` 与 `fw4`；依赖 `dnsmasq-full` | 生态与中文文档最丰富，可直接导入标准 Clash YAML 订阅与策略覆写，但安装体积较大 | **绝大多数传统 OpenWrt 固件与 Clash 订阅用户首选** |
| **PassWall2** | Xray / sing-box | `fw3` / `fw4` 均支持 | 界面直观，单节点链接、分流规则、核心组件分离管理清晰 | 习惯单节点导入、Xray/sing-box 多协议切换的用户 |
| **Nikki** | Mihomo | **官方明确要求 OpenWrt 24.10 及以上版本 (`fw4`/`apk`/`opkg`)** | 为新版 fw4 原生设计，结构干净，性能与规则贴近现代 Mihomo | **新版官方 OpenWrt 24.10+ 固件玩家** |
| **HomeProxy** | sing-box | 依赖 `fw4` (`nftables`)、推荐 23.05+/24.10+ | OpenWrt 官方生态契合度高、原生 sing-box 透明转发 | 熟悉 sing-box 配置规范的现代固件玩家 |
| **v2rayA** | Xray / v2ray-core | 标准 Linux / 部分路由系统 | 自带独立网页 Web UI，不局限于 LuCI 界面 | 无桌面 Linux 旁路由主机、Docker 网关与常规系统 |

---

## 二、部署前必须用 SSH 核对的四条命令行体检

刷完机别急着直接往里上传插件 IPK/APK 包，先 SSH 进路由器运行四行命令确认环境完全匹配：

```sh
# 1. 查看 OpenWrt 准确大版本（区分 22.03 / 23.05 / 24.10）
cat /etc/openwrt_release | grep DISTRIB_RELEASE

# 2. 查看精准架构与包管理器（x86_64 / aarch64_cortex-a53 等，确定用 opkg 还是 apk）
uname -m && cat /etc/openwrt_release | grep DISTRIB_ARCH
which opkg apk

# 3. 核对剩余可用空间（建议 Available >= 120MB 再放宽裕跑大型规则库）
df -h /overlay

# 4. 检查当前防火墙是否使用 fw4 (nftables)
which fw4 fw3 nft iptables
```

---

## 三、软路由“四大坑”与避雷要点

1. **购买了不支持第三方订阅的“纯专属客户端机场”**：
   - 凡明确仅支持自家专属 App、不提供通用订阅地址的品牌（如飞猫云、SOGO 云、闪跃、全球云、隐形人等），**节点根本无法导入 OpenClash 或 PassWall2**（即使部分品牌声称官方有软路由客户端，也高度依赖对方专门打包对应固件架构，限制远大于开放订阅）。
   - 如果家有软路由刚需，选购前请先核实品牌库中的客户端兼容标记。
2. **硬路由 16MB/64MB 小闪存强装大内核爆盘**：
   - 常见低配家用路由器可用 `/overlay` 不到 10MB，而一套 Mihomo + GeoIP 数据库就要占用数十 MB，强行塞入会导致路由器配置保存报错、重启失联。建议使用 **x86_64 软路由或至少 256MB+ 闪存的 ARM 设备**（或通过外接 U 盘扩容）。
3. **旁路由（单臂网关）未开 IP 伪装 & DNS 环路**：
   - 旁路由最常见的灾难就是“国内网站转圈、所有外网超时且后台抓不到日志”。核心铁律：
     - **旁路由网口只设静态 IP（例如 `192.168.1.2`）、网关填主路由（`192.168.1.1`）、关闭旁路由自身 DHCP 服务器**；
     - 在旁路由防火墙 `LAN` 区域确保打开 **IP 动态伪装（Masquerading）**（否则仅用单臂路由回包路径不对称容易丢包）；
     - 局域网设备（或由主路由 DHCP 统一）将默认网关与 DNS 指向旁路由 IP。
4. **开启 IPv6 泄漏未分流**：
   - 许多运营商宽带现在下发了公网 IPv6 地址，如果路由器没禁用或没有对 IPv6 流量正确设置透明劫持，手机/浏览器可能绕过 IPv4 分流规则直连造成海外连接失败或 DNS 泄漏。建议先关闭 IPv6 代理调试通 IPv4 后再按需启用。

---

## 四、常见问题（FAQ）

<FAQSection
  title="OpenWrt 软路由 FAQ"
  :items="[
    {
      q: '为什么软路由上安装 Nikki 一直失败或提示依赖版本冲突？',
      a: 'Nikki 官方项目明确要求 OpenWrt 24.10 及以上系统版本；23.05 及更早固件缺少对应的新版 firewall4 和软件源依赖，应选择 OpenClash 或 PassWall2。'
    },
    {
      q: '所有机场都可以放进 OpenClash / PassWall2 吗？',
      a: '不行。软路由需要标准订阅链接来自动同步节点与规则；不支持通用订阅、仅能用官网 App 的品牌无法在通用软路由插件中使用。'
    },
    {
      q: '旁路由到底让主路由指网关，还是让手机电脑手动改静态网关？',
      a: '如果全屋设备（电视、游戏机、全家手机）都要代理，直接在主路由 DHCP 选项把默认网关和 DNS 下发为旁路由 IP 最省心；如果只想自己几台设备走代理、避免影响家人，保持主路由默认网关，仅把需要代理的手机/PC 手动设静态 IP 指向旁路由即可。'
    },
    {
      q: 'OpenClash 更新内核失败连不上 GitHub 下载核心怎么办？',
      a: '提前在电脑从官方 Releases 下载对应架构的 mihomo-linux-*.gz 内核压缩包，在 OpenClash 插件设置页面手动上传至内核目录并赋予执行权限 (chmod +x) 即可。'
    }
  ]"
/>
