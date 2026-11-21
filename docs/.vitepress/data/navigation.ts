import type { DefaultTheme } from 'vitepress'
import { ALL_BRANDS } from './brands'

export interface TopicEntry {
  title: string
  link: string
  description: string
  clusterNames: [string, string]
}

export interface PrimarySection {
  id: 'airport' | 'vpn' | 'clash' | 'resources'
  title: string
  link: string
  description: string
  topics: TopicEntry[]
}

export const PRIMARY_SECTIONS: PrimarySection[] = [
  {
    id: 'airport',
    title: '机场推荐',
    link: '/airport/',
    description: '基于实测数据、线路架构与计费透明度的机场选购指南与专题集合',
    topics: [
      {
        title: '机场推荐',
        link: '/airport/recommended',
        description: '按需求场景与预算分层的机场挑选标准与核查清单',
        clusterNames: ['机场选购核心标准', '不同场景机场匹配']
      },
      {
        title: '机场排行',
        link: '/airport/ranking',
        description: '区分实测表现与商业合作的客观参考框架',
        clusterNames: ['榜单评测维度设计', '排名核查与商业披露']
      },
      {
        title: '性价比机场',
        link: '/airport/value',
        description: '单位流量成本、年付折算与月付门槛平衡分析',
        clusterNames: ['月付性价比档位分析', '流量倍率与周期计算']
      },
      {
        title: '稳定机场',
        link: '/airport/stable',
        description: 'IEPL/IPLC 专线架构、晚高峰冗余与长期运维观察',
        clusterNames: ['专线与 BGP 架构解析', '晚高峰稳定性检验']
      },
      {
        title: '便宜机场',
        link: '/airport/cheap',
        description: '5.6 元至 15 元入门档位的真实成本与风险提示',
        clusterNames: ['极限平价档对比', '低价年付防踩坑']
      },
      {
        title: '免费梯子',
        link: '/airport/free-proxy',
        description: '免费试用、开源节点池与安全隐私边界说明',
        clusterNames: ['免费方案安全风险', '低成本合规替代思路']
      },
      {
        title: '科学上网',
        link: '/airport/getting-started',
        description: '零基础了解节点、订阅链接、协议与客户端配合方式',
        clusterNames: ['代理基础概念入门', '首次配置完整流程']
      }
    ]
  },
  {
    id: 'vpn',
    title: 'VPN 与加速器',
    link: '/vpn/',
    description: '传统 VPN、游戏/跨境加速器与机场代理方案的协议原理及场景对照',
    topics: [
      {
        title: 'VPN 推荐',
        link: '/vpn/recommended',
        description: '商业 VPN 与规则分流机场的适用场景划分',
        clusterNames: ['商业 VPN 适用场景', '隐私与合规选择要点']
      },
      {
        title: '免费 VPN',
        link: '/vpn/free-vpn',
        description: '免费 VPN 限速机制、数据收集风险与替代策略',
        clusterNames: ['免费 VPN 限制分析', '安全审计与隐私风险']
      },
      {
        title: '手机 VPN',
        link: '/vpn/mobile-vpn',
        description: 'iOS 与 Android 移动网络环境下的客户端与耗电优化',
        clusterNames: ['iOS 代理方案与商店提示', 'Android 分流与后台保活']
      },
      {
        title: 'VPN 软件评测',
        link: '/vpn/software-reviews',
        description: '连接稳定性、协议透明度与客户端体验评测维度',
        clusterNames: ['软件客户端评估体系', '常见营销话术拆解']
      },
      {
        title: 'VPN 加速器',
        link: '/vpn/accelerator',
        description: '跨境办公、AI 工具与流媒体场景的延迟与路由优化',
        clusterNames: ['跨境办公加速策略', 'AI 与流媒体分流要求']
      },
      {
        title: '加速器对比',
        link: '/vpn/comparison',
        description: '专属客户端加速器 vs Clash 通用订阅横向对比',
        clusterNames: ['专属 App 与通用客户端对比', '传输协议延迟与抗封锁']
      },
      {
        title: '好用的 VPN',
        link: '/vpn/reliable-vpn',
        description: '衡量“好用”的四大核心指标：协议、备份、客服与透明度',
        clusterNames: ['可靠性评估四要素', '多方案冗余配置思路']
      }
    ]
  },
  {
    id: 'clash',
    title: 'Clash 客户端',
    link: '/clash/',
    description: 'Clash Verge Rev 与 Mihomo 内核安装、订阅导入、DNS/TUN 配置及排障知识库',
    topics: [
      {
        title: 'Clash 推荐',
        link: '/clash/recommended',
        description: 'Windows、macOS、Linux、Android、iOS 生态客户端选型',
        clusterNames: ['桌面端 Clash 生态对比', '移动端与路由器替代方案']
      },
      {
        title: 'Clash Verge',
        link: '/clash/verge',
        description: 'Clash Verge Rev 核心功能、Mihomo 内核与架构简介',
        clusterNames: ['Clash Verge Rev 特性详解', '版本演进与安全获取']
      },
      {
        title: 'Clash Verge 下载',
        link: '/clash/verge-download',
        description: 'GitHub 官方 Release 渠道、芯片架构区分与校验方法',
        clusterNames: ['官方安装包与架构识别', '安装前安全校验与防伪']
      },
      {
        title: 'Clash Verge 订阅',
        link: '/clash/verge-subscription',
        description: '订阅链接导入、定时更新、UA 与订阅转换注意事项',
        clusterNames: ['订阅导入与更新策略', '常见订阅解析报错处理']
      },
      {
        title: 'Clash Meta',
        link: '/clash/meta',
        description: 'Mihomo (Clash.Meta) 内核对 VLESS、Hysteria 2 与覆写的支持',
        clusterNames: ['Mihomo 现代协议支持', 'Rule Provider 与覆写脚本']
      },
      {
        title: 'Clash 使用教程',
        link: '/clash/tutorials',
        description: '从零完成代理模式选择、DNS 分流与 TUN 模式开启',
        clusterNames: ['规则/全局/直连模式配置', 'DNS 与 TUN 高级实战']
      },
      {
        title: 'Clash 故障排查',
        link: '/clash/troubleshooting',
        description: '节点超时、无法连接、端口占用与系统代理失效定位手册',
        clusterNames: ['连接与延迟超时排障', 'TUN 与本地网络冲突修复']
      }
    ]
  },
  {
    id: 'resources',
    title: '资源与情报',
    link: '/resources/',
    description: '节点测试方法、机场跑路预警信号、订阅报错解析与全站 FAQ 汇总',
    topics: [
      {
        title: '免费节点',
        link: '/resources/free-nodes',
        description: '公开节点测试思路、临时应急与安全注意事项',
        clusterNames: ['公开节点安全与时效', '自测延迟与解锁校验']
      },
      {
        title: '跑路预警',
        link: '/resources/risk-alerts',
        description: '识别高风险运营特征、异常低价套路与资金止损原则',
        clusterNames: ['机场风险识别指标', '周期选择与防跑路策略']
      },
      {
        title: '机场 FAQ',
        link: '/resources/faq',
        description: '新手关于流量倍率、设备数、优惠码与退款的高频问答',
        clusterNames: ['购买与计费高频问答', '使用与解锁常见问题']
      },
      {
        title: '机场风险情报',
        link: '/resources/intelligence',
        description: '同系品牌识别、历史档案核对与推广链接异常记录',
        clusterNames: ['同系品牌关联梳理', '数据缺口与历史档案说明']
      },
      {
        title: '节点检测',
        link: '/resources/node-testing',
        description: 'TLS RTT、HTTPS 延迟、MiaoKo 测速与流媒体检测读图指南',
        clusterNames: ['速度与延迟指标解读', 'AI 与流媒体解锁检测方法']
      },
      {
        title: '订阅问题',
        link: '/resources/subscription-issues',
        description: '403/404、YAML 解析失败、专属客户端迁移与订阅转换',
        clusterNames: ['HTTP 订阅错误排查', '格式兼容与安全转换']
      },
      {
        title: '新手帮助',
        link: '/resources/beginner-help',
        description: '新手第一步：选客户端、选套餐周期、避免踩坑的完整路径',
        clusterNames: ['新手五步入门清单', '术语词典与常见误区']
      }
    ]
  }
]

/**
 * 严格保留 4 个一级导航，桌面端支持下拉，移动端折叠。
 * 品牌数据库通过首页和专题内链进入，不增设第五个一级导航。
 */
export function buildNav(): DefaultTheme.NavItem[] {
  return PRIMARY_SECTIONS.map((sec) => ({
    text: sec.title,
    activeMatch: `^/${sec.id}/`,
    items: [
      { text: `${sec.title}首页`, link: sec.link },
      ...sec.topics.map((t) => ({
        text: t.title,
        link: t.link
      }))
    ]
  }))
}

export function buildSidebar(): DefaultTheme.Sidebar {
  return {
    '/airport/': [
      {
        text: '机场推荐专题',
        collapsed: false,
        items: [
          { text: '专题总览', link: '/airport/' },
          ...PRIMARY_SECTIONS[0].topics.map((t) => ({ text: t.title, link: t.link }))
        ]
      },
      {
        text: '相关评测与品牌库',
        collapsed: false,
        items: [
          { text: '独立评测中心', link: '/reviews/' },
          { text: '品牌横向对比', link: '/comparisons/' },
          { text: '31 家品牌数据库', link: '/brands/' }
        ]
      }
    ],
    '/vpn/': [
      {
        text: 'VPN 与加速器专题',
        collapsed: false,
        items: [
          { text: '专题总览', link: '/vpn/' },
          ...PRIMARY_SECTIONS[1].topics.map((t) => ({ text: t.title, link: t.link }))
        ]
      },
      {
        text: '跨平台客户端手册',
        collapsed: false,
        items: [
          { text: '全平台客户端选型', link: '/guides/multi-platform-clients' },
          { text: 'iOS 客户端教程', link: '/guides/ios-clients' },
          { text: 'Android 客户端教程', link: '/guides/android-clients' }
        ]
      }
    ],
    '/clash/': [
      {
        text: 'Clash 核心专题',
        collapsed: false,
        items: [
          { text: 'Clash 知识库首页', link: '/clash/' },
          ...PRIMARY_SECTIONS[2].topics.map((t) => ({ text: t.title, link: t.link }))
        ]
      },
      {
        text: 'Clash Verge Rev 实战教程',
        collapsed: false,
        items: [
          { text: 'Windows 安装与权限指南', link: '/guides/clash-verge-windows' },
          { text: 'macOS 安装与架构选择', link: '/guides/clash-verge-macos' },
          { text: 'Linux (DEB/RPM/AppImage)', link: '/guides/clash-verge-linux' },
          { text: '订阅导入与自动更新', link: '/guides/clash-verge-subscription-setup' },
          { text: 'DNS 分流与 Fake-IP 详解', link: '/guides/clash-verge-dns' },
          { text: 'TUN 模式开启与排障', link: '/guides/clash-verge-tun' },
          { text: '连接失败与节点超时排查', link: '/guides/clash-verge-errors' }
        ]
      },
      {
        text: '全平台客户端扩展',
        collapsed: true,
        items: [
          { text: 'Windows 客户端生态', link: '/guides/windows-clients' },
          { text: 'iOS 客户端指南', link: '/guides/ios-clients' },
          { text: 'Android 客户端指南', link: '/guides/android-clients' },
          { text: 'OpenWrt 软路由指南', link: '/guides/openwrt-routing' }
        ]
      },
      {
        text: '进阶配置与排障专题',
        collapsed: false,
        items: [
          { text: 'Merge 与 Script 全局覆写', link: '/articles/clash-verge-override-script' },
          { text: 'Rule Provider (.mrs) 规则集', link: '/articles/clash-verge-rule-provider' },
          { text: 'WSL2 / Docker / Git 代理配置', link: '/articles/clash-verge-wsl2-docker-proxy' },
          { text: 'select / url-test 策略组详解', link: '/articles/clash-verge-proxy-groups-explained' },
          { text: 'Windows UWP 环回豁免', link: '/articles/clash-verge-uwp-loopback' },
          { text: '端口占用与代理残留修复', link: '/articles/clash-verge-port-conflict-recovery' },
          { text: '配置备份与跨设备迁移', link: '/articles/clash-verge-backup-migration' },
          { text: '安装包 SHA-256 安全校验', link: '/articles/clash-verge-checksum-verify' }
        ]
      }
    ],
    '/articles/': [
      {
        text: 'Clash Verge Rev 进阶与排障专题',
        collapsed: false,
        items: [
          { text: 'Merge 与 Script 全局覆写', link: '/articles/clash-verge-override-script' },
          { text: 'Rule Provider (.mrs) 规则集', link: '/articles/clash-verge-rule-provider' },
          { text: 'WSL2 / Docker / Git 代理配置', link: '/articles/clash-verge-wsl2-docker-proxy' },
          { text: 'select / url-test 策略组详解', link: '/articles/clash-verge-proxy-groups-explained' },
          { text: 'Windows UWP 环回豁免', link: '/articles/clash-verge-uwp-loopback' },
          { text: '端口占用与代理残留修复', link: '/articles/clash-verge-port-conflict-recovery' },
          { text: '配置备份与跨设备迁移', link: '/articles/clash-verge-backup-migration' },
          { text: '安装包 SHA-256 安全校验', link: '/articles/clash-verge-checksum-verify' }
        ]
      },
      {
        text: '机场选型与协议实测专题',
        collapsed: false,
        items: [
          { text: 'Shadowrocket 规则与按需连接', link: '/articles/shadowrocket-rules-setup' },
          { text: 'Android 避坑与后台保活设置', link: '/articles/android-nekobox-security-and-alternatives' },
          { text: 'Hysteria 2 vs VLESS-Reality', link: '/articles/hysteria2-vs-vless-reality' },
          { text: '2026 一次性不限时流量包对比', link: '/articles/one-time-traffic-airport-guide' },
          { text: '晚高峰本地宽带与 curl 测试', link: '/articles/airport-peak-hour-testing-guide' },
          { text: '年付折算均价 vs 真实月付防坑', link: '/articles/airport-annual-vs-monthly-math' }
        ]
      },
      {
        text: '基础安装与核心路径',
        collapsed: false,
        items: [
          { text: 'Clash 知识库首页', link: '/clash/' },
          { text: 'Windows 安装教程', link: '/guides/clash-verge-windows' },
          { text: 'macOS 安装教程', link: '/guides/clash-verge-macos' },
          { text: '订阅导入与自动更新', link: '/guides/clash-verge-subscription-setup' },
          { text: 'DNS 与 Fake-IP 详解', link: '/guides/clash-verge-dns' },
          { text: 'TUN 模式开启与排障', link: '/guides/clash-verge-tun' },
          { text: '连接超时全排查手册', link: '/guides/clash-verge-errors' }
        ]
      }
    ],
    '/guides/': [
      {
        text: 'Clash Verge Rev 学习路径',
        collapsed: false,
        items: [
          { text: '1. 软件定位与版本说明', link: '/clash/verge' },
          { text: '2. 官方安全下载指引', link: '/clash/verge-download' },
          { text: '3. Windows 安装教程', link: '/guides/clash-verge-windows' },
          { text: '4. macOS 安装教程', link: '/guides/clash-verge-macos' },
          { text: '5. Linux 部署教程', link: '/guides/clash-verge-linux' },
          { text: '6. 订阅导入与更新', link: '/guides/clash-verge-subscription-setup' },
          { text: '7. DNS 与规则分流', link: '/guides/clash-verge-dns' },
          { text: '8. TUN 模式配置', link: '/guides/clash-verge-tun' },
          { text: '9. 常见错误与超时排查', link: '/guides/clash-verge-errors' }
        ]
      },
      {
        text: '多平台客户端手册',
        collapsed: false,
        items: [
          { text: '全平台客户端矩阵', link: '/guides/multi-platform-clients' },
          { text: 'Windows 客户端对比', link: '/guides/windows-clients' },
          { text: 'Android 客户端指南', link: '/guides/android-clients' },
          { text: 'iOS / iPad 客户端指南', link: '/guides/ios-clients' },
          { text: 'OpenWrt 软路由客户端', link: '/guides/openwrt-routing' }
        ]
      }
    ],
    '/resources/': [
      {
        text: '资源与情报专题',
        collapsed: false,
        items: [
          { text: '专题总览', link: '/resources/' },
          ...PRIMARY_SECTIONS[3].topics.map((t) => ({ text: t.title, link: t.link }))
        ]
      }
    ],
    '/reviews/': [
      {
        text: '独立评测中心',
        collapsed: false,
        items: [
          { text: '评测方法与数据说明', link: '/reviews/' },
          { text: '光速云深度评测', link: '/reviews/guangsuyun' },
          { text: '暮光加速评测', link: '/reviews/muguang' },
          { text: '飞猫云评测', link: '/reviews/feimao' },
          { text: '微风网络评测', link: '/reviews/weifeng' },
          { text: '星岛梦评测', link: '/reviews/xingdaomeng' },
          { text: '二猫云评测', link: '/reviews/ermao' },
          { text: '唯兔云评测', link: '/reviews/weitu' },
          { text: 'Firefly 萤火虫评测', link: '/reviews/firefly' },
          { text: '宇宙云评测', link: '/reviews/yuzhou' },
          { text: '极连云评测', link: '/reviews/jilian' },
          { text: '光年梯评测', link: '/reviews/guangnian' },
          { text: '一翻云评测', link: '/reviews/yifan' },
          { text: '可信云评测', link: '/reviews/kexin' },
          { text: '速界评测', link: '/reviews/sujie' },
          { text: '隐形人评测', link: '/reviews/yinxingren' },
          { text: '梯子云评测', link: '/reviews/tiziyun' },
          { text: '灵动云历史实测解析', link: '/reviews/lingdongyun' }
        ]
      },
      {
        text: '横向对比研究',
        collapsed: false,
        items: [
          { text: '横向对比索引', link: '/comparisons/' },
          { text: '光速云 vs 暮光 vs 飞猫云', link: '/comparisons/guangsuyun-vs-muguang-vs-feimao' },
          { text: '5.6 元极限平价档横评', link: '/comparisons/budget-iepl-5-yuan-tier' },
          { text: '专属客户端 vs 通用订阅', link: '/comparisons/dedicated-client-vs-third-party' },
          { text: 'AI 工具解锁适配对比', link: '/comparisons/ai-tools-unlock-comparison' }
        ]
      }
    ],
    '/comparisons/': [
      {
        text: '品牌横向对比',
        collapsed: false,
        items: [
          { text: '横向对比总览', link: '/comparisons/' },
          { text: '光速云 vs 暮光 vs 飞猫云', link: '/comparisons/guangsuyun-vs-muguang-vs-feimao' },
          { text: '5.6 元极限平价档横评', link: '/comparisons/budget-iepl-5-yuan-tier' },
          { text: '专属客户端 vs 通用订阅', link: '/comparisons/dedicated-client-vs-third-party' },
          { text: 'AI 工具解锁适配对比', link: '/comparisons/ai-tools-unlock-comparison' }
        ]
      },
      {
        text: '独立品牌评测',
        collapsed: true,
        items: [
          { text: '光速云深度评测', link: '/reviews/guangsuyun' },
          { text: '暮光加速评测', link: '/reviews/muguang' },
          { text: '飞猫云评测', link: '/reviews/feimao' },
          { text: 'Firefly 萤火虫评测', link: '/reviews/firefly' }
        ]
      }
    ],
    '/brands/': [
      {
        text: '品牌与套餐数据库',
        collapsed: false,
        items: [
          { text: '全部品牌数据库 (31家)', link: '/brands/' },
          { text: '套餐优惠与折扣汇总', link: '/offers/' }
        ]
      },
      {
        text: '重点核实品牌',
        collapsed: false,
        items: ALL_BRANDS.slice(0, 12).map((b) => ({
          text: b.name,
          link: `/brands/${b.slug}`
        }))
      },
      {
        text: '其余收录品牌 (13–31)',
        collapsed: true,
        items: ALL_BRANDS.slice(12).map((b) => ({
          text: b.name,
          link: `/brands/${b.slug}`
        }))
      }
    ],
    '/offers/': [
      {
        text: '商业优惠与披露',
        collapsed: false,
        items: [
          { text: '套餐与优惠码汇总', link: '/offers/' },
          { text: '31 家品牌数据库', link: '/brands/' },
          { text: '光速云品牌详情', link: '/brands/guangsuyun' }
        ]
      }
    ]
  }
}

export interface BreadcrumbItem {
  label: string
  link?: string
}

export function getBreadcrumbs(routePath: string, currentTitle?: string): BreadcrumbItem[] {
  const clean = routePath.replace(/\.html$/, '').replace(/\/index$/, '/')
  const crumbs: BreadcrumbItem[] = [{ label: '首页', link: '/' }]

  if (clean === '/' || clean === '') return crumbs

  for (const sec of PRIMARY_SECTIONS) {
    if (clean === sec.link) {
      crumbs.push({ label: sec.title })
      return crumbs
    }
    const matchedTopic = sec.topics.find((t) => t.link === clean)
    if (matchedTopic) {
      crumbs.push({ label: sec.title, link: sec.link })
      crumbs.push({ label: matchedTopic.title })
      return crumbs
    }
  }

  if (clean.startsWith('/guides/')) {
    crumbs.push({ label: 'Clash 客户端', link: '/clash/' })
    crumbs.push({ label: currentTitle || '操作教程' })
    return crumbs
  }
  if (clean.startsWith('/reviews/')) {
    if (clean === '/reviews/') {
      crumbs.push({ label: '独立评测' })
    } else {
      crumbs.push({ label: '独立评测', link: '/reviews/' })
      crumbs.push({ label: currentTitle || '品牌评测' })
    }
    return crumbs
  }
  if (clean.startsWith('/comparisons/')) {
    if (clean === '/comparisons/') {
      crumbs.push({ label: '横向对比' })
    } else {
      crumbs.push({ label: '横向对比', link: '/comparisons/' })
      crumbs.push({ label: currentTitle || '品牌对比' })
    }
    return crumbs
  }
  if (clean.startsWith('/brands/')) {
    if (clean === '/brands/') {
      crumbs.push({ label: '品牌数据库' })
    } else {
      crumbs.push({ label: '品牌数据库', link: '/brands/' })
      crumbs.push({ label: currentTitle || '品牌详情' })
    }
    return crumbs
  }
  if (clean.startsWith('/offers/')) {
    crumbs.push({ label: '品牌数据库', link: '/brands/' })
    crumbs.push({ label: '优惠与套餐汇总' })
    return crumbs
  }
  if (clean === '/about') {
    crumbs.push({ label: '关于编辑部' })
    return crumbs
  }
  if (clean === '/methodology') {
    crumbs.push({ label: '评测方法与测试标准' })
    return crumbs
  }
  if (clean === '/privacy-and-disclaimer') {
    crumbs.push({ label: '隐私与免责声明' })
    return crumbs
  }

  if (currentTitle) crumbs.push({ label: currentTitle })
  return crumbs
}
