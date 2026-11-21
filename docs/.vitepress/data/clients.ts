export type ClientPlatform = 'Windows' | 'Android' | 'iOS' | 'macOS' | 'Linux' | 'OpenWrt'

export interface ProxyClientEntry {
  id: string
  name: string
  platforms: ClientPlatform[]
  core: string
  sourceType: 'GitHub' | 'App Store' | '官网' | '官方文档'
  costModel: '免费开源' | 'App Store 付费' | '含内购' | '待核实'
  features: string[]
  cautionNote?: string
  guideUrl?: string
}

/**
 * 基于《第三方代理客户端.txt》整理，涵盖 Windows / Android / iOS / macOS / Linux / OpenWrt
 */
export const PROXY_CLIENTS: ProxyClientEntry[] = [
  {
    id: 'clash-verge-rev',
    name: 'Clash Verge Rev',
    platforms: ['Windows', 'macOS', 'Linux'],
    core: 'Mihomo (Clash.Meta)',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['Mihomo 内核', '订阅管理', '规则分流', 'TUN 模式', '中文界面'],
    cautionNote: 'macOS 需区分 Apple Silicon (aarch64) 与 Intel (x64) 安装包；Linux 提供 DEB / RPM / AppImage。',
    guideUrl: '/clash/verge'
  },
  {
    id: 'v2rayn',
    name: 'v2rayN',
    platforms: ['Windows', 'macOS', 'Linux'],
    core: 'Xray / sing-box / Mihomo',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['多核心切换', '节点批量管理', 'VLESS / VMess / Trojan / Hysteria2'],
    guideUrl: '/guides/windows-clients'
  },
  {
    id: 'flclash',
    name: 'FlClash',
    platforms: ['Windows', 'Android', 'macOS', 'Linux'],
    core: 'Mihomo',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['跨平台一致界面', '规则分流', '订阅配置', '多架构包'],
    guideUrl: '/guides/multi-platform-clients'
  },
  {
    id: 'clash-nyanpasu',
    name: 'Clash Nyanpasu',
    platforms: ['Windows', 'macOS', 'Linux'],
    core: 'Mihomo / Clash Rust 等多内核',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['多内核管理', '配置增强', '规则编辑'],
    guideUrl: '/clash/recommended'
  },
  {
    id: 'hiddify',
    name: 'Hiddify',
    platforms: ['Windows', 'Android', 'iOS', 'macOS', 'Linux'],
    core: 'sing-box',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['多协议兼容', '自动节点选择', '远程配置', '新手友好'],
    guideUrl: '/guides/multi-platform-clients'
  },
  {
    id: 'karing',
    name: 'Karing',
    platforms: ['Windows', 'Android', 'iOS', 'macOS', 'Linux'],
    core: 'sing-box',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['多种订阅格式', '规则分流', '跨设备同步配置', '面向新手'],
    cautionNote: 'iOS 端需通过非中国区 App Store 获取。',
    guideUrl: '/guides/ios-clients'
  },
  {
    id: 'clash-mi',
    name: 'Clash Mi',
    platforms: ['Windows', 'Android', 'iOS', 'macOS', 'Linux'],
    core: 'Mihomo',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['Mihomo 内核', 'Clash YAML 配置', '轻量化跨平台'],
    cautionNote: 'iOS 端在 App Store 提供下载。',
    guideUrl: '/clash/recommended'
  },
  {
    id: 'mihomo-party',
    name: 'Mihomo Party',
    platforms: ['Windows', 'macOS', 'Linux'],
    core: 'Mihomo',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['配置与分流管理', '历史教程迁移参考'],
    cautionNote: '需单独关注项目当前维护状态，不宜未经核实即标注为持续更新首选客户端。',
    guideUrl: '/clash/meta'
  },
  {
    id: 'v2rayng',
    name: 'v2rayNG',
    platforms: ['Android'],
    core: 'Xray',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['支持单节点链接与订阅导入', '轻量稳定', 'Android 主力客户端'],
    guideUrl: '/guides/android-clients'
  },
  {
    id: 'clash-meta-android',
    name: 'Clash Meta for Android',
    platforms: ['Android'],
    core: 'Mihomo',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['Mihomo 系规则代理', 'Clash YAML 配置'],
    guideUrl: '/guides/android-clients'
  },
  {
    id: 'nekobox-android',
    name: 'NekoBox for Android',
    platforms: ['Android'],
    core: 'sing-box',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['sing-box 系客户端', '适合进阶用户'],
    cautionNote: '官方项目已提示维护资源有限，且特别警告不要使用其名称下已被第三方控制的 Google Play 版本，务必仅从官方 GitHub 获取。',
    guideUrl: '/guides/android-clients'
  },
  {
    id: 'sing-box-official',
    name: 'sing-box (SFA / SFI / SFM / Desktop)',
    platforms: ['Android', 'iOS', 'macOS', 'Linux'],
    core: 'sing-box',
    sourceType: '官方文档',
    costModel: '免费开源',
    features: ['原生 sing-box JSON 配置', '全栈现代协议支持'],
    guideUrl: '/guides/multi-platform-clients'
  },
  {
    id: 'shadowrocket',
    name: 'Shadowrocket（小火箭）',
    platforms: ['iOS'],
    core: '自研核心',
    sourceType: 'App Store',
    costModel: 'App Store 付费',
    features: ['规则代理', '订阅管理', '流量与请求查看', '兼容主流机场订阅'],
    cautionNote: '美国等非中国区 App Store 显示为付费应用，需使用对应地区账号购买下载。',
    guideUrl: '/guides/ios-clients'
  },
  {
    id: 'stash',
    name: 'Stash',
    platforms: ['iOS', 'macOS'],
    core: 'Clash 兼容核心',
    sourceType: 'App Store',
    costModel: 'App Store 付费',
    features: ['Clash 风格规则配置', '策略组', '覆写（Override）功能'],
    cautionNote: '美国 App Store 显示为付费应用，具体售价以所属商店地区为准。',
    guideUrl: '/guides/ios-clients'
  },
  {
    id: 'quantumult-x',
    name: 'Quantumult X（圈 X）',
    platforms: ['iOS'],
    core: '自研核心',
    sourceType: 'App Store',
    costModel: 'App Store 付费',
    features: ['规则分流', '请求重写', '脚本扩展', 'DNS 自定义'],
    cautionNote: '美国 App Store 显示为付费应用，配置门槛相对小火箭更高。',
    guideUrl: '/guides/ios-clients'
  },
  {
    id: 'surge',
    name: 'Surge 5 / Surge Mac',
    platforms: ['iOS', 'macOS'],
    core: '自研核心',
    sourceType: 'App Store',
    costModel: '含内购',
    features: ['高级网络代理', '流量分析与抓包调试', '专业级规则控制'],
    cautionNote: 'iOS 版含应用内购买，macOS 版需从官网获取并购买授权。',
    guideUrl: '/guides/ios-clients'
  },
  {
    id: 'streisand',
    name: 'Streisand',
    platforms: ['iOS'],
    core: '多协议核心',
    sourceType: 'App Store',
    costModel: '免费开源',
    features: ['VLESS / VMess / Trojan / Hysteria 等协议', '无需付费购买'],
    guideUrl: '/guides/ios-clients'
  },
  {
    id: 'v2raya',
    name: 'v2rayA',
    platforms: ['Linux', 'OpenWrt'],
    core: 'Xray / v2ray-core',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['Web 控制界面', '透明代理', '适合无桌面 Linux 主机或网关'],
    guideUrl: '/guides/openwrt-routing'
  },
  {
    id: 'openclash',
    name: 'OpenClash',
    platforms: ['OpenWrt'],
    core: 'Mihomo / Clash',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['OpenWrt 透明代理', '订阅管理', '细粒度规则分流'],
    cautionNote: '安装前需核对 OpenWrt 版本、CPU 架构、防火墙（fw3/fw4）与内核依赖。',
    guideUrl: '/guides/openwrt-routing'
  },
  {
    id: 'passwall2',
    name: 'PassWall2',
    platforms: ['OpenWrt'],
    core: 'Xray / sing-box',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['多核心分流', '透明代理', '访问控制'],
    guideUrl: '/guides/openwrt-routing'
  },
  {
    id: 'nikki',
    name: 'Nikki',
    platforms: ['OpenWrt'],
    core: 'Mihomo',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['Mihomo 透明代理', '策略管理'],
    cautionNote: 'Nikki 官方项目明确要求 OpenWrt 24.10 及以上版本。',
    guideUrl: '/guides/openwrt-routing'
  },
  {
    id: 'homeproxy',
    name: 'HomeProxy',
    platforms: ['OpenWrt'],
    core: 'sing-box',
    sourceType: 'GitHub',
    costModel: '免费开源',
    features: ['基于 sing-box 的路由代理管理', '现代 fw4 适配'],
    guideUrl: '/guides/openwrt-routing'
  }
]
