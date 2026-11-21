export interface ClusterArticleRef {
  title: string
  link: string
  tag?: string
}

export interface Level3Cluster {
  id: string
  topicLink: string
  title: string
  intent: string
  targetUser: string
  summary: string
  keyPoints: string[]
  publishedArticles: ClusterArticleRef[]
  plannedCount: number
}

/**
 * 全站 56 个三级文档集群结构化索引（28 个二级专题 × 2）
 * 仅链接真实已发布的 Markdown 页面，未撰写文章只展示规划计数，不产生死链。
 */
export const LEVEL3_CLUSTERS: Level3Cluster[] = [
  // ① 机场推荐 (C01 - C14)
  {
    id: 'C01',
    topicLink: '/airport/recommended',
    title: '机场选购核心标准',
    intent: 'investigational',
    targetUser: '初次或换机挑选机场服务的用户',
    summary: '围绕客户端开放度、协议透明度、计费周期口径与客服响应建立客观筛选底线。',
    keyPoints: ['区分通用订阅与封闭专属 App', '核对真实月付门槛与年付折算价', '识别 VLESS / Trojan / Hysteria 2 协议兼容度'],
    publishedArticles: [
      { title: '31 家机场品牌交互筛选库', link: '/brands/', tag: '数据库' },
      { title: '专属客户端 vs 通用订阅机场对比', link: '/comparisons/dedicated-client-vs-third-party', tag: '对比' }
    ],
    plannedCount: 8
  },
  {
    id: 'C02',
    topicLink: '/airport/recommended',
    title: '不同场景机场匹配',
    intent: 'investigational',
    targetUser: 'AI 办公、流媒体追剧、跨境电商与多端家庭用户',
    summary: '按使用场景拆分：AI 工具稳定性、Netflix/Disney+ 解锁、TikTok 直播与多终端并发。',
    keyPoints: ['AI 固定节点策略组建议', '多设备不限并发与 1 倍计费核查', '一次性不限时流量包互备方案'],
    publishedArticles: [
      { title: 'AI 工具解锁适配对比（ChatGPT / Claude / Gemini）', link: '/comparisons/ai-tools-unlock-comparison', tag: '对比' },
      { title: '光速云深度独立评测', link: '/reviews/guangsuyun', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C03',
    topicLink: '/airport/ranking',
    title: '榜单评测维度设计',
    intent: 'investigational',
    targetUser: '对比多家榜单、避免盲信广告排名的用户',
    summary: '拆解晚高峰 vs 非晚高峰测试差异、9Gbps 机房测速 vs 家庭宽带体感差异。',
    keyPoints: ['核查测试时间戳与时段', '区分 TLS RTT 与 HTTPS 延迟', '保留 0B/KB 异常节点原始记录'],
    publishedArticles: [
      { title: '独立品牌评测中心（17 篇实测解读）', link: '/reviews/', tag: '评测' },
      { title: '节点检测与测速读图指南', link: '/resources/node-testing', tag: '方法论' }
    ],
    plannedCount: 8
  },
  {
    id: 'C04',
    topicLink: '/airport/ranking',
    title: '排名核查与商业披露',
    intent: 'investigational',
    targetUser: '关注推荐真实性与品牌去重透明度的用户',
    summary: '公开商业推广链接披露规范，分离商业合作排序与技术实测档案。',
    keyPoints: ['32 条清单去重合并为 31 家实体', '识别 Firefly/微风等同系关联', '缺失数据统一标为待核实'],
    publishedArticles: [
      { title: '机场风险情报与实体审计', link: '/resources/intelligence', tag: '情报' },
      { title: '光速云 vs 暮光加速 vs 飞猫云横评', link: '/comparisons/guangsuyun-vs-muguang-vs-feimao', tag: '对比' }
    ],
    plannedCount: 8
  },
  {
    id: 'C05',
    topicLink: '/airport/value',
    title: '月付性价比档位分析',
    intent: 'investigational',
    targetUser: '预算 ¥15–¥30/月、拒绝大额资金绑定的务实用户',
    summary: '聚焦 ¥18–¥25/月主力性价比区间（极连云、光年梯、唯兔云、一翻云、暮光、二猫云、光速云极速版）。',
    keyPoints: ['对比 ¥18/¥20/¥25 档位流量额度', '核对优惠码折扣适用范围', '筛选支持 Clash 通用订阅的高性价比方案'],
    publishedArticles: [
      { title: '唯兔云独立评测（¥19.9/150GB IPLC）', link: '/reviews/weitu', tag: '评测' },
      { title: '一翻云独立评测（¥20/150GB 三协议）', link: '/reviews/yifan', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C06',
    topicLink: '/airport/value',
    title: '流量倍率与周期计算',
    intent: 'investigational',
    targetUser: '需要核算真实单 GB 成本与不限时包划算度的用户',
    summary: '讲透节点倍率、月付折算陷阱以及一次性不限时流量包在低频备用场景中的成本优势。',
    keyPoints: ['1 倍 vs 高倍率真实可用流量折算', '年付小包通常不打折规则', '不限时包适合每月 15GB 以下备用'],
    publishedArticles: [
      { title: '2026 一次性不限时流量包机场对比', link: '/articles/one-time-traffic-airport-guide', tag: '对比' },
      { title: '机场常见问题 FAQ（倍率与周期）', link: '/resources/faq', tag: 'FAQ' },
      { title: '套餐优惠与折扣码汇总', link: '/offers/', tag: '优惠' }
    ],
    plannedCount: 8
  },
  {
    id: 'C07',
    topicLink: '/airport/stable',
    title: '专线与 BGP 架构解析',
    intent: 'investigational',
    targetUser: '对掉线敏感的远程办公与开发用户',
    summary: '解析 IEPL / IPLC 内网专线、三网 BGP 入口以及多协议抗阻断能力对稳定性的决定作用。',
    keyPoints: ['IEPL/IPLC 绕过公网拥堵段原理', 'VLESS-Reality 与 Hysteria 2 弱网抗丢包', '2020–2023 老牌运营周期核查'],
    publishedArticles: [
      { title: '光速云双线路架构评测', link: '/reviews/guangsuyun', tag: '评测' },
      { title: '星岛梦 2020 老牌评测', link: '/reviews/xingdaomeng', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C08',
    topicLink: '/airport/stable',
    title: '晚高峰稳定性检验',
    intent: 'investigational',
    targetUser: '主要在 20:00–23:00 高峰用网的用户',
    summary: '教用户区分白天满速截图与晚高峰 21:00–22:46 真实负载表现，建立主备双线冗余策略。',
    keyPoints: ['查看 21:00–22:46 实测时间窗口', '三网（电信/联通/移动）跨运营商差异', '跨上游系主备双机场容灾搭配'],
    publishedArticles: [
      { title: '晚高峰机场稳定性本地实测与 curl 方法', link: '/articles/airport-peak-hour-testing-guide', tag: '实测' },
      { title: '极连云 22:46 晚间实测分析', link: '/reviews/jilian', tag: '评测' },
      { title: '宇宙云 21:04 晚间实测分析', link: '/reviews/yuzhou', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C09',
    topicLink: '/airport/cheap',
    title: '极限平价档对比',
    intent: 'investigational',
    targetUser: '查询 5.6 元–9 元入门档位真实情况的预算敏感用户',
    summary: '拆解闪电鼠、大佬云、云界线、榴莲云、环球梯同质化现状与 ¥7–¥9 年付小包阵营。',
    keyPoints: ['5.6 元组缺实测与链接格式异常核查', '榴莲云协议未明差异', '¥84–¥99 年付小包信息透明度对比'],
    publishedArticles: [
      { title: '5.6 元极限平价档五家横评', link: '/comparisons/budget-iepl-5-yuan-tier', tag: '对比' },
      { title: '飞猫云独立评测（学生版 ¥84/年）', link: '/reviews/feimao', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C10',
    topicLink: '/airport/cheap',
    title: '低价年付防踩坑',
    intent: 'investigational',
    targetUser: '准备入手低价年付套餐前的风控自查用户',
    summary: '总结低价年付常见的优惠码不适用条款、专属客户端绑定与“特殊商品不支持退款”边界。',
    keyPoints: ['核实年付特价小包是否禁用折扣码', '避免将单一超低价年付作唯一主力', '第一单尽量用短周期实测'],
    publishedArticles: [
      { title: '年付折算均价 vs 真实月付防踩坑', link: '/articles/airport-annual-vs-monthly-math', tag: '避坑' },
      { title: '跑路预警与高危特征识别', link: '/resources/risk-alerts', tag: '风控' },
      { title: '微风网络价格口径差异评测', link: '/reviews/weifeng', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C11',
    topicLink: '/airport/free-proxy',
    title: '免费方案安全风险',
    intent: 'informational',
    targetUser: '考虑使用免费梯子或公开节点池的用户',
    summary: '揭示无商业模式免费梯子的流量审计、跳过 TLS 证书校验（skip-cert-verify）及住宅出口滥用风险。',
    keyPoints: ['禁止登录网银/支付/工作邮箱', '警惕非开源“破解永久免费端”', '核查 YAML skip-cert-verify 设置'],
    publishedArticles: [
      { title: '免费节点应急使用守则', link: '/resources/free-nodes', tag: '情报' },
      { title: '免费 VPN 风险拆解', link: '/vpn/free-vpn', tag: 'VPN' }
    ],
    plannedCount: 8
  },
  {
    id: 'C12',
    topicLink: '/airport/free-proxy',
    title: '低成本合规替代思路',
    intent: 'informational',
    targetUser: '每月流量需求极低、寻求安全低预算替代的用户',
    summary: '提供月均几元级可控成本或开源自建方案，取代来历不明的免费软件。',
    keyPoints: ['一次性不限时流量包长期摊薄成本', 'GitHub 开源通用客户端隔离配置', '个人 VPS 部署 sing-box/Xray 思路'],
    publishedArticles: [
      { title: '性价比机场单 GB 核算指南', link: '/airport/value', tag: '专题' },
      { title: 'Clash Verge Rev 官方安全下载', link: '/clash/verge-download', tag: '下载' }
    ],
    plannedCount: 8
  },
  {
    id: 'C13',
    topicLink: '/airport/getting-started',
    title: '代理基础概念入门',
    intent: 'informational',
    targetUser: '零基础刚接触机场、订阅与代理软件的新手',
    summary: '用通俗语言讲清客户端软件与机场订阅的关系、VLESS/Trojan 协议及 Rule/Global 模式区别。',
    keyPoints: ['软件外壳与节点订阅彼此独立', '为什么必须用 Mihomo/sing-box 现代核心', 'Rule 模式日常省流量的原理'],
    publishedArticles: [
      { title: '新手五步帮助指南', link: '/resources/beginner-help', tag: '入门' },
      { title: 'Clash Meta (Mihomo) 内核解析', link: '/clash/meta', tag: '内核' }
    ],
    plannedCount: 8
  },
  {
    id: 'C14',
    topicLink: '/airport/getting-started',
    title: '首次配置完整流程',
    intent: 'informational',
    targetUser: '准备在电脑或手机完成第一次科学上网配置的用户',
    summary: '串联客户端下载、订阅粘贴导入、节点延迟测速与系统代理开关的端到端指南。',
    keyPoints: ['Windows/macOS 优先 Clash Verge Rev', 'iOS 与 Android 客户端选型区分', '连接失败首选校准系统时间'],
    publishedArticles: [
      { title: 'Clash Verge Rev Windows 安装教程', link: '/guides/clash-verge-windows', tag: 'Windows' },
      { title: 'Clash Verge Rev 订阅导入教程', link: '/guides/clash-verge-subscription-setup', tag: '订阅' }
    ],
    plannedCount: 8
  },

  // ② VPN 与加速器 (C15 - C28)
  {
    id: 'C15',
    topicLink: '/vpn/recommended',
    title: '商业 VPN 适用场景',
    intent: 'investigational',
    targetUser: '对比传统海外商业 VPN 与分流机场的用户',
    summary: '从 WireGuard/OpenVPN 协议特点与国际抗干扰能力比较两者适用边界。',
    keyPoints: ['商业 VPN 在跨国办公与审计合规的优势', '复杂网络环境下专线机场的连通率差异', '本地国内外分流体验对照'],
    publishedArticles: [
      { title: '加速器对比：专属客户端 vs 通用订阅', link: '/vpn/comparison', tag: '对比' }
    ],
    plannedCount: 8
  },
  {
    id: 'C16',
    topicLink: '/vpn/recommended',
    title: '隐私与合规选择要点',
    intent: 'investigational',
    targetUser: '关注无日志审计、DNS 防泄漏与软件开源度用户',
    summary: '建立面向隐私敏感场景的客户端选择和本地防泄漏验证清单。',
    keyPoints: ['第三方独立无日志审计识别', 'Fake-IP 与远端 DNS 解析防泄漏', '避免使用来源不明的免费代理端'],
    publishedArticles: [
      { title: 'Clash Verge Rev DNS 分流与防泄漏', link: '/guides/clash-verge-dns', tag: '教程' }
    ],
    plannedCount: 8
  },
  {
    id: 'C17',
    topicLink: '/vpn/free-vpn',
    title: '免费 VPN 限制分析',
    intent: 'informational',
    targetUser: '测试免费 VPN 为什么限速断连的用户',
    summary: '分析正规免费体验版的流量配额、单设备限速与节点拥堵风控现象。',
    keyPoints: ['2GB–10GB 配额与 1–5Mbps 限速', '公共 IP 被 ChatGPT/Cloudflare 高频拦截', '夜间高峰丢包规律'],
    publishedArticles: [
      { title: '免费梯子与节点安全指南', link: '/airport/free-proxy', tag: '专题' }
    ],
    plannedCount: 8
  },
  {
    id: 'C18',
    topicLink: '/vpn/free-vpn',
    title: '安全审计与隐私风险',
    intent: 'informational',
    targetUser: '排查免费安卓 APK 与浏览器插件隐患的用户',
    summary: '识别把用户宽带当成共享住宅出口、植入广告追踪或篡改根证书的高危免费软件。',
    keyPoints: ['检查设备是否被要求安装陌生 CA 证书', '远离国内应用商店山寨 VPN', '使用 GitHub 开源客户端核验哈希'],
    publishedArticles: [
      { title: '安装包 SHA-256 哈希校验指南', link: '/articles/clash-verge-checksum-verify', tag: '安全' }
    ],
    plannedCount: 8
  },
  {
    id: 'C19',
    topicLink: '/vpn/mobile-vpn',
    title: 'iOS 代理方案与商店提示',
    intent: 'informational',
    targetUser: 'iPhone / iPad 需要选装外区代理客户端的用户',
    summary: '区分美区付费应用（Shadowrocket/Stash/Quantumult X/Surge）与免费开源方案（Karing/Streisand/Clash Mi）。',
    keyPoints: ['千万不要在系统 iCloud 登录共享账号', '仅登录 App Store 下载应用', '看清专属 App 机场无法导入小火箭'],
    publishedArticles: [
      { title: 'Shadowrocket 小火箭规则与按需连接教程', link: '/articles/shadowrocket-rules-setup', tag: '实战' },
      { title: 'iOS / iPad 客户端详细使用指南', link: '/guides/ios-clients', tag: 'iOS' }
    ],
    plannedCount: 8
  },
  {
    id: 'C20',
    topicLink: '/vpn/mobile-vpn',
    title: 'Android 分流与后台保活',
    intent: 'informational',
    targetUser: '安卓手机遇到锁屏断连或耗电过快的用户',
    summary: '覆盖 v2rayNG / FlClash / Hiddify / Karing 选型、国产 ROM 后台白名单与分应用绕过设置。',
    keyPoints: ['谨防 Google Play 假冒 NekoBox', '开启电池无限制与锁屏卡片锁定', '国内高频 App 绕过 VPN 分流省电'],
    publishedArticles: [
      { title: 'Android 避坑：远离 Play 假冒 NekoBox 与保活', link: '/articles/android-nekobox-security-and-alternatives', tag: '安全' },
      { title: 'Android 安卓代理客户端指南', link: '/guides/android-clients', tag: 'Android' }
    ],
    plannedCount: 8
  },
  {
    id: 'C21',
    topicLink: '/vpn/software-reviews',
    title: '软件客户端评估体系',
    intent: 'investigational',
    targetUser: '对比多款代理客户端长期维护状态的用户',
    summary: '从开源提交频率、内核协议覆盖、TUN/DNS 稳定性与文档完善度评估代理软件。',
    keyPoints: ['Clash Verge Rev / v2rayN / FlClash 维护对比', 'Mihomo Party 需关注维护状态提示', 'OpenWrt 固件版本硬性依赖核对'],
    publishedArticles: [
      { title: '2026 全平台客户端矩阵（22 款）', link: '/guides/multi-platform-clients', tag: '矩阵' },
      { title: 'Windows 客户端生态对比', link: '/guides/windows-clients', tag: 'Windows' }
    ],
    plannedCount: 8
  },
  {
    id: 'C22',
    topicLink: '/vpn/software-reviews',
    title: '常见营销话术拆解',
    intent: 'investigational',
    targetUser: '辨别“永不跑路、全平台秒开、100%解锁”宣传的用户',
    summary: '拆解广告文案与真实实测（如单线程 9Gbps 测速机 vs 家庭宽带、仅 APP 解锁）之间的信息差。',
    keyPoints: ['识别 vendor_claimed 品牌自述口径', '警惕“折算月均价”充当真实月付价', '看懂实测截图里的 0B 与送中'],
    publishedArticles: [
      { title: '节点检测与测速读图指南', link: '/resources/node-testing', tag: '情报' }
    ],
    plannedCount: 8
  },
  {
    id: 'C23',
    topicLink: '/vpn/accelerator',
    title: '跨境办公加速策略',
    intent: 'investigational',
    targetUser: '需要稳定访问 GitHub、Docker、SSH 与跨境后台的开发者/运营',
    summary: '覆盖终端/WSL2/Docker 代理打通、TUN 虚拟网卡与 TikTok 跨区直连环境稳定要点。',
    keyPoints: ['WSL2 mirrored 网络模式配置', 'Docker Desktop 手动代理与绕过清单', '多线 BGP 入口降低跨省抖动'],
    publishedArticles: [
      { title: 'Clash Verge 配合 WSL2 / Docker / Git 代理', link: '/articles/clash-verge-wsl2-docker-proxy', tag: '开发' }
    ],
    plannedCount: 8
  },
  {
    id: 'C24',
    topicLink: '/vpn/accelerator',
    title: 'AI 与流媒体分流要求',
    intent: 'investigational',
    targetUser: '日常高频使用 ChatGPT / Claude / Gemini / Netflix 的用户',
    summary: '解释为什么不能用自动测速组跑 AI，并给出独立的策略组固定节点与原生 IP 核验方法。',
    keyPoints: ['香港节点 OpenAI 多限仅 APP', 'Gemini 在多数品牌属视节点而定', '用 Script 覆写建立独立 AI-Dedicated 组'],
    publishedArticles: [
      { title: 'AI 工具解锁适配对比', link: '/comparisons/ai-tools-unlock-comparison', tag: '对比' },
      { title: 'Clash Verge 全局覆写实战', link: '/articles/clash-verge-override-script', tag: '进阶' }
    ],
    plannedCount: 8
  },
  {
    id: 'C25',
    topicLink: '/vpn/comparison',
    title: '专属 App 与通用客户端对比',
    intent: 'investigational',
    targetUser: '在“一键登录省事”与“Clash 自由度”之间权衡的用户',
    summary: '按 31 家品牌实态分布对比封闭专属端、纯通用订阅与双支持模式的迁移成本。',
    keyPoints: ['8 家已核实品牌仅限专属客户端', '9 家支持自研+通用双模式', '软路由用户必须选通用订阅'],
    publishedArticles: [
      { title: '专属客户端 vs 通用订阅对比', link: '/comparisons/dedicated-client-vs-third-party', tag: '对比' }
    ],
    plannedCount: 8
  },
  {
    id: 'C26',
    topicLink: '/vpn/comparison',
    title: '传输协议延迟与抗封锁',
    intent: 'investigational',
    targetUser: '关注 VLESS、Trojan、Hysteria 2 与 Shadowsocks 区别的用户',
    summary: '从握手 RTT、UDP/QUIC 弱网抗丢包及客户端核心要求角度对比四大主流协议。',
    keyPoints: ['VLESS-Reality 伪装与低开销优势', 'Hysteria 2 在高丢包跨境线路提速表现', 'Shadowsocks 在全端轻量化兼容性'],
    publishedArticles: [
      { title: 'Hysteria 2 vs VLESS-Reality 协议深度对比', link: '/articles/hysteria2-vs-vless-reality', tag: '对比' },
      { title: '一翻云三协议 IEPL 独立评测', link: '/reviews/yifan', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C27',
    topicLink: '/vpn/reliable-vpn',
    title: '可靠性评估四要素',
    intent: 'investigational',
    targetUser: '寻求长期省心使用标准的用户',
    summary: '建立协议现代性、多地区节点冗余、短周期试错门槛与资料诚实度四维评分框架。',
    keyPoints: ['至少具备港/日/新/美多地区切换能力', '明确披露数据缺口（如可信云案例）', '支持先月付验证再考虑长期周期'],
    publishedArticles: [
      { title: '可信云透明度与测速评测', link: '/reviews/kexin', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C28',
    topicLink: '/vpn/reliable-vpn',
    title: '多方案冗余配置思路',
    intent: 'investigational',
    targetUser: '不能容忍单家机场突发故障断联的重度用户',
    summary: '讲解“主力月付专线 + 跨上游系一次性不限时包”双备份组合，以及在 Clash Verge 中快速切配置。',
    keyPoints: ['避开同系关联品牌同日宕机', '利用不限时包零月租长期留存备份', 'Clash Verge 一键切换订阅配置'],
    publishedArticles: [
      { title: '机场风险情报与同系关联梳理', link: '/resources/intelligence', tag: '情报' }
    ],
    plannedCount: 8
  },

  // ③ Clash 客户端 (C29 - C42)
  {
    id: 'C29',
    topicLink: '/clash/recommended',
    title: '桌面端 Clash 生态对比',
    intent: 'informational',
    targetUser: '在 Clash Verge Rev、FlClash、Nyanpasu 与 v2rayN 间选型的桌面用户',
    summary: '覆盖 Windows / macOS / Linux 主力客户端内核差异、内存占用与维护活跃度。',
    keyPoints: ['为什么原版 Clash for Windows 已淘汰', 'Clash Verge Rev 与 FlClash 定位差异', 'Mihomo Party 维护状态需核实提醒'],
    publishedArticles: [
      { title: 'Windows 客户端推荐对比', link: '/guides/windows-clients', tag: 'Windows' },
      { title: '2026 全平台客户端矩阵', link: '/guides/multi-platform-clients', tag: '矩阵' }
    ],
    plannedCount: 8
  },
  {
    id: 'C30',
    topicLink: '/clash/recommended',
    title: '移动端与路由器替代方案',
    intent: 'informational',
    targetUser: '需要在手机与 OpenWrt 软路由联动 Clash 订阅的用户',
    summary: '打通桌面 Clash 之外的 iOS（Stash/Shadowrocket/Clash Mi）、Android（FlClash/CMFA）与软路由（OpenClash/Nikki）。',
    keyPoints: ['iOS 付费与免费客户端明确区分', 'OpenWrt Nikki 需 24.10+ 固件', 'NekoBox Play 商店防假冒警告'],
    publishedArticles: [
      { title: 'iOS 客户端使用指南', link: '/guides/ios-clients', tag: 'iOS' },
      { title: 'Android 客户端使用指南', link: '/guides/android-clients', tag: 'Android' },
      { title: 'OpenWrt 软路由代理指南', link: '/guides/openwrt-routing', tag: 'OpenWrt' }
    ],
    plannedCount: 8
  },
  {
    id: 'C31',
    topicLink: '/clash/verge',
    title: 'Clash Verge Rev 特性详解',
    intent: 'informational',
    targetUser: '想系统了解 Clash Verge Rev 功能模块的新用户',
    summary: '解析 Tauri+Rust 架构、内置 Mihomo 内核、Service Mode 服务模式与配置覆写能力。',
    keyPoints: ['内存与启动性能优于旧 Electron 端', 'Service Mode 解锁无 UAC 弹窗 TUN', 'Merge/Script 保护本地规则不被覆盖'],
    publishedArticles: [
      { title: 'Clash Verge Rev Windows 安装指南', link: '/guides/clash-verge-windows', tag: 'Windows' },
      { title: 'Clash Verge Rev macOS 安装指南', link: '/guides/clash-verge-macos', tag: 'macOS' }
    ],
    plannedCount: 8
  },
  {
    id: 'C32',
    topicLink: '/clash/verge',
    title: '版本演进与安全获取',
    intent: 'informational',
    targetUser: '重装换机或关注官方连续维护分支的用户',
    summary: '说明原版 Clash Verge 归档后 Rev 接力分支的定位、配置备份与跨电脑无损迁移方法。',
    keyPoints: ['唯一官方仓库 github.com/clash-verge-rev', '内置本地/WebDAV 备份恢复流程', '注意保护 profiles.yaml 中的订阅 Token'],
    publishedArticles: [
      { title: 'Clash Verge 备份与跨电脑迁移', link: '/articles/clash-verge-backup-migration', tag: '迁移' }
    ],
    plannedCount: 8
  },
  {
    id: 'C33',
    topicLink: '/clash/verge-download',
    title: '官方安装包与架构识别',
    intent: 'informational',
    targetUser: '准备下载安装但分不清 x64/arm64/aarch64/DEB/RPM 的用户',
    summary: '对照 Windows、macOS（M 系列 vs Intel）与 Linux 各发行版准确挑包。',
    keyPoints: ['Mac M1–M4 必须选 aarch64.dmg', 'Win 普通电脑选 x64-setup.exe', 'Ubuntu AppImage 缺 libfuse2 处理'],
    publishedArticles: [
      { title: 'Clash Verge Rev Linux 部署指南', link: '/guides/clash-verge-linux', tag: 'Linux' }
    ],
    plannedCount: 8
  },
  {
    id: 'C34',
    topicLink: '/clash/verge-download',
    title: '安装前安全校验与防伪',
    intent: 'informational',
    targetUser: '防范搜索引擎假冒中文官网与篡改安装包的用户',
    summary: '提供 PowerShell Get-FileHash 与 macOS shasum 校验 SHA-256 摘要实操命令。',
    keyPoints: ['拒绝搜狗/百度广告位假“中文官网”', '逐字核对 Release .sha256 文件', '解除 macOS Gatekeeper 隔离的规范指令'],
    publishedArticles: [
      { title: '安装包 SHA-256 哈希校验指南', link: '/articles/clash-verge-checksum-verify', tag: '安全' }
    ],
    plannedCount: 8
  },
  {
    id: 'C35',
    topicLink: '/clash/verge-subscription',
    title: '订阅导入与更新策略',
    intent: 'informational',
    targetUser: '刚拿到机场订阅 URL 准备导入 Clash Verge 的用户',
    summary: '手把手完成手动粘贴 URL 导入、选中配置卡片、设置 12–24 小时自动刷新与节点测速。',
    keyPoints: ['手动粘贴比 Deep Link 一键导入更稳', '开启“使用代理更新”绕过域名阻断', '定时更新间隔建议 720–1440 分钟'],
    publishedArticles: [
      { title: 'Clash Verge 订阅导入与更新全教程', link: '/guides/clash-verge-subscription-setup', tag: '实战' }
    ],
    plannedCount: 8
  },
  {
    id: 'C36',
    topicLink: '/clash/verge-subscription',
    title: '常见订阅解析报错处理',
    intent: 'informational',
    targetUser: '遇到 HTTP 403/404、YAML syntax error 或无节点显示的用户',
    summary: '定位 Token 重置、误复制网页 HTML、机场仅专属客户端以及在线订阅转换隐私风险。',
    keyPoints: ['HTTP 403/404 需去后台重新复制新链接', '排查网页登录页误当作 YAML 订阅', '避免把订阅密钥喂给陌生在线转换站'],
    publishedArticles: [
      { title: '订阅问题排查大全', link: '/resources/subscription-issues', tag: '排障' }
    ],
    plannedCount: 8
  },
  {
    id: 'C37',
    topicLink: '/clash/meta',
    title: 'Mihomo 现代协议支持',
    intent: 'informational',
    targetUser: '需要连接 VLESS-Reality、Hysteria 2 与 TUIC 节点的用户',
    summary: '详解 Mihomo 内核如何替代停更原版 Clash 内核并引入 Sniffer 域名嗅探解决纯 IP 分流难题。',
    keyPoints: ['支持 VLESS/Reality/Hysteria2/TUIC', 'Sniffer 从 TLS SNI 还原真实域名', '解决浏览器 DoH 绕过系统 DNS 导致的误分流'],
    publishedArticles: [
      { title: 'Clash Meta (Mihomo) 内核深度解析', link: '/clash/meta', tag: '内核' }
    ],
    plannedCount: 8
  },
  {
    id: 'C38',
    topicLink: '/clash/meta',
    title: 'Rule Provider 与覆写脚本',
    intent: 'informational',
    targetUser: '希望在不破坏自动订阅的前提下自定义规则与脚本的进阶玩家',
    summary: '提供可直接复制的 Merge YAML 与 JavaScript 覆写模板，以及 `.mrs` 二进制规则集配置。',
    keyPoints: ['prepend-rules 优先命中自定义域名', 'JS 脚本剔除“到期/剩余流量”信息假节点', '.mrs 二进制规则极速低内存加载'],
    publishedArticles: [
      { title: 'Merge 与 Script 全局覆写实战', link: '/articles/clash-verge-override-script', tag: '覆写' },
      { title: 'Rule Provider (.mrs) 规则集指南', link: '/articles/clash-verge-rule-provider', tag: '规则' }
    ],
    plannedCount: 8
  },
  {
    id: 'C39',
    topicLink: '/clash/tutorials',
    title: '规则/全局/直连模式配置',
    intent: 'informational',
    targetUser: '分不清 Rule/Global/Direct 以及四大策略组区别的用户',
    summary: '系统拆解运行模式切换边界与 `select / url-test / fallback / load-balance` 策略组调优。',
    keyPoints: ['日常 95% 保持 Rule 规则模式', 'AI 策略组切勿使用 load-balance 或高频 url-test', 'url-test tolerance 建议调高至 80–100ms'],
    publishedArticles: [
      { title: '策略组类型详解（select/url-test/fallback）', link: '/articles/clash-verge-proxy-groups-explained', tag: '策略' }
    ],
    plannedCount: 8
  },
  {
    id: 'C40',
    topicLink: '/clash/tutorials',
    title: 'DNS 与 TUN 高级实战',
    intent: 'informational',
    targetUser: '需要配置 Fake-IP、TUN 虚拟网卡以及打通 WSL2/Docker 的用户',
    summary: '讲透 Fake-IP vs Redir-Host 机制、Service Mode 授权安装与开发工具全链路代理打通。',
    keyPoints: ['Fake-IP 提速与防泄漏机理', '安装 Service Mode 启用稳定 TUN', 'Windows 11 WSL2 mirrored 网络无缝代理'],
    publishedArticles: [
      { title: 'DNS 分流与 Fake-IP 原理', link: '/guides/clash-verge-dns', tag: 'DNS' },
      { title: 'TUN 模式开启与排障', link: '/guides/clash-verge-tun', tag: 'TUN' },
      { title: 'WSL2 / Docker / Git 代理指南', link: '/articles/clash-verge-wsl2-docker-proxy', tag: '开发' }
    ],
    plannedCount: 8
  },
  {
    id: 'C41',
    topicLink: '/clash/troubleshooting',
    title: '连接与延迟超时排障',
    intent: 'informational',
    targetUser: '遇到全节点 Timeout、TLS 握手失败或节点绿灯仍连不上的用户',
    summary: '按日志报错关键词（`i/o timeout`、`x509`、`EOF`）给出逐项定位与修复流程。',
    keyPoints: ['系统时间误差超 60 秒致 TLS 全挂', '排查杀毒软件拦截 mihomo.exe 联网', '开启 info 日志查看规则真实命中走向'],
    publishedArticles: [
      { title: 'Clash Verge 连接失败与超时排查手册', link: '/guides/clash-verge-errors', tag: '排障' }
    ],
    plannedCount: 8
  },
  {
    id: 'C42',
    topicLink: '/clash/troubleshooting',
    title: 'TUN 与本地网络冲突修复',
    intent: 'informational',
    targetUser: '遇到 UWP 商店无法联网、7897 端口占用或退软件后断网的用户',
    summary: '针对 UWP Loopback 豁免、端口冲突排查、其他加速器网卡抢占与系统代理残留提供根治指令。',
    keyPoints: ['UWP 应用环回豁免一键工具与 PowerShell 命令', 'netstat/lsof 排查 7897 占用或改用 17897', '优雅退出清理 127.0.0.1:7897 代理残留'],
    publishedArticles: [
      { title: 'Windows UWP 环回豁免教程', link: '/articles/clash-verge-uwp-loopback', tag: 'UWP' },
      { title: '端口占用与系统代理残留修复', link: '/articles/clash-verge-port-conflict-recovery', tag: '修复' }
    ],
    plannedCount: 8
  },

  // ④ 资源与情报 (C43 - C56)
  {
    id: 'C43',
    topicLink: '/resources/free-nodes',
    title: '公开节点安全与时效',
    intent: 'informational',
    targetUser: '测试公开节点池但担心安全性与稳定度的用户',
    summary: '评估免费公开节点存活周期、共用 IP 风控污染与证书安全审计要点。',
    keyPoints: ['存活常以小时至数天计', '共用 IP 高概率遭 Cloudflare/OpenAI 拦截', '隔离测试禁止登录核心账户'],
    publishedArticles: [
      { title: '免费梯子与节点安全指南', link: '/airport/free-proxy', tag: '安全' }
    ],
    plannedCount: 8
  },
  {
    id: 'C44',
    topicLink: '/resources/free-nodes',
    title: '自测延迟与解锁校验',
    intent: 'informational',
    targetUser: '拿到临时节点想验证真实可用性的用户',
    summary: '用客户端延迟测试、本地 curl 响应检查与基础 TLS 校验替代盲目测速。',
    keyPoints: ['区分 TCP 延迟与真实 HTTPS 首字节响应', '检查配置是否暗开 skip-cert-verify', '用毕及时关闭或清理测试配置'],
    publishedArticles: [
      { title: '节点检测与测速读图指南', link: '/resources/node-testing', tag: '检测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C45',
    topicLink: '/resources/risk-alerts',
    title: '机场风险识别指标',
    intent: 'informational',
    targetUser: '希望避开跑路盘与套壳新站的用户',
    summary: '总结超低价长周期促销、工单失联、长期不公布协议且强制封闭客户端五大风险信号。',
    keyPoints: ['警惕违背专线成本的超低两年/三年付', '识别无实测却承诺“永不跑路/0丢包”话术', '留意运营域名频繁变更且无公告'],
    publishedArticles: [
      { title: '机场风险情报与实体审计', link: '/resources/intelligence', tag: '情报' }
    ],
    plannedCount: 8
  },
  {
    id: 'C46',
    topicLink: '/resources/risk-alerts',
    title: '周期选择与防跑路策略',
    intent: 'informational',
    targetUser: '决定先买月付还是直接买年付的用户',
    summary: '提供分阶段资金控制模型与跨上游系冗余方案，降低不可退费预付损失。',
    keyPoints: ['首单月付验证 1–2 周晚高峰', '主备机场避免同属一家上游系', '留存通用订阅以便随时切换线路'],
    publishedArticles: [
      { title: '性价比与周期计算指南', link: '/airport/value', tag: '选型' }
    ],
    plannedCount: 8
  },
  {
    id: 'C47',
    topicLink: '/resources/faq',
    title: '购买与计费高频问答',
    intent: 'informational',
    targetUser: '对流量倍率、设备限制与优惠码规则有疑问的用户',
    summary: '集中解答倍率扣费、不限设备风控边界、年付折算均价差异及特殊商品不退款规定。',
    keyPoints: ['1 倍与高倍节点扣量差别', '为什么优惠码常排除年付特价小包', '不限设备自用与合租封号边界'],
    publishedArticles: [
      { title: '优惠码与周期折扣汇总', link: '/offers/', tag: '优惠' }
    ],
    plannedCount: 8
  },
  {
    id: 'C48',
    topicLink: '/resources/faq',
    title: '使用与解锁常见问题',
    intent: 'informational',
    targetUser: '遇到 YouTube 送中、Gemini 地区限制或无法导入 Clash 的用户',
    summary: '解答“仅 APP(HK)”、“YT 送中”与“专属客户端无法导出订阅”高频疑问。',
    keyPoints: ['香港节点为何经常不支持 Gemini', '什么是 YouTube 送中及切换方案', '仅专属端品牌不支持软路由'],
    publishedArticles: [
      { title: 'AI 工具解锁适配对比', link: '/comparisons/ai-tools-unlock-comparison', tag: '对比' }
    ],
    plannedCount: 8
  },
  {
    id: 'C49',
    topicLink: '/resources/intelligence',
    title: '同系品牌关联梳理',
    intent: 'investigational',
    targetUser: '希望排查多机场是否同源的进阶用户',
    summary: '记录 Firefly 重复条目合并、Firefly/微风同系说明及 5.6 元同质化集群关联。',
    keyPoints: ['Firefly 第8项与第32项去重合并', '微风/Firefly/飞鸟/一云梯同系关系', '5.6 元五家同规格集群对比'],
    publishedArticles: [
      { title: 'Firefly 萤火虫去重审计评测', link: '/reviews/firefly', tag: '评测' },
      { title: '5.6 元极限平价档五家横评', link: '/comparisons/budget-iepl-5-yuan-tier', tag: '对比' }
    ],
    plannedCount: 8
  },
  {
    id: 'C50',
    topicLink: '/resources/intelligence',
    title: '数据缺口与历史档案说明',
    intent: 'investigational',
    targetUser: '核查历史档案有效性与链接异常的品牌研究员',
    summary: '公布 2026-08-09 历史记录、缺失测速项、链接缺 `#` 差异与可信云 `date-inferred` 标注。',
    keyPoints: ['云界线/环球梯缺 # 与榴莲云缺斜杠', '隐形人 10-19 测速表空白现状', '灵动云/浪网/EdgeNova 停留在 08-09 档案'],
    publishedArticles: [
      { title: '灵动云历史实测解析', link: '/reviews/lingdongyun', tag: '评测' },
      { title: '隐形人缺口审计评测', link: '/reviews/yinxingren', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C51',
    topicLink: '/resources/node-testing',
    title: '速度与延迟指标解读',
    intent: 'informational',
    targetUser: '想真正看懂 MiaoKo 与 MAI-TEST-BOT 测速图的读者',
    summary: '拆解 TLS RTT、HTTPS 延迟、5Gbps vs 9Gbps 32 线程带宽环境及非晚高峰测试局限。',
    keyPoints: ['TLS RTT 低但 HTTPS 高代表落地拥堵', '机房 9Gbps 单线程测上限而非家宽实速', '保留 0B/KB 失效节点不美化结论'],
    publishedArticles: [
      { title: '光速云 2026-08-19 双批图包解析', link: '/reviews/guangsuyun', tag: '评测' },
      { title: '极连云 22:46 晚间实测分析', link: '/reviews/jilian', tag: '评测' }
    ],
    plannedCount: 8
  },
  {
    id: 'C52',
    topicLink: '/resources/node-testing',
    title: 'AI 与流媒体解锁检测方法',
    intent: 'informational',
    targetUser: '需要分清“解锁(地区)”“仅APP”和“送中(CN)”的用户',
    summary: '解读流媒体御三家（YT/NF/D+）及 OpenAI/Gemini 测试脚本结果与常见误判。',
    keyPoints: ['仅 APP(HK) 与完整网页解锁差异', 'YouTube 送中与落地地区识别偏移', '不可用单一速度图反推 AI 解锁'],
    publishedArticles: [
      { title: '灵动云 60 解锁实测案例', link: '/reviews/lingdongyun', tag: '案例' }
    ],
    plannedCount: 8
  },
  {
    id: 'C53',
    topicLink: '/resources/subscription-issues',
    title: 'HTTP 订阅错误排查',
    intent: 'informational',
    targetUser: '订阅更新出现 403/404/EOF/超时报错的用户',
    summary: '按 HTTP 状态码与本地网络报错定位订阅过期、域名阻断或端口代理干扰。',
    keyPoints: ['403/404 代表 Token 重置或套餐到期', '勾选“使用代理更新”解决域名阻断', '排查本地时间与证书校验报错'],
    publishedArticles: [
      { title: 'Clash Verge 订阅导入与更新', link: '/guides/clash-verge-subscription-setup', tag: '教程' }
    ],
    plannedCount: 8
  },
  {
    id: 'C54',
    topicLink: '/resources/subscription-issues',
    title: '格式兼容与安全转换',
    intent: 'informational',
    targetUser: '遇到 YAML parse error 或想转换订阅格式的用户',
    summary: '解释纯 Base64 链接、网页 HTML 误当订阅、以及不要向陌生在线转换站泄露订阅 Token。',
    keyPoints: ['识别 HTML 登录页返回导致的 YAML 报错', '现代 Mihomo/sing-box 多格式原生支持', '保护个人订阅密钥防泄密原则'],
    publishedArticles: [
      { title: 'Clash 故障排查中心', link: '/clash/troubleshooting', tag: '排障' }
    ],
    plannedCount: 8
  },
  {
    id: 'C55',
    topicLink: '/resources/beginner-help',
    title: '新手五步入门清单',
    intent: 'informational',
    targetUser: '从零开始按顺序完成买前核对与安装配置的新人',
    summary: '提供“盘点设备 → 选官方软件 → 核对价目规则 → 导入规则模式 → 收藏排障手册”五步落地清单。',
    keyPoints: ['先明确是否需要第三方通用订阅', '按系统从 GitHub/外区商店下载', '先月付验证稳定度再考虑年付'],
    publishedArticles: [
      { title: '科学上网零基础入门（2026）', link: '/airport/getting-started', tag: '入门' },
      { title: '全平台客户端矩阵', link: '/guides/multi-platform-clients', tag: '软件' }
    ],
    plannedCount: 8
  },
  {
    id: 'C56',
    topicLink: '/resources/beginner-help',
    title: '术语词典与常见误区',
    intent: 'informational',
    targetUser: '被 IEPL、Mihomo、TUN、Fake-IP、送中名词绕晕的新手',
    summary: '用一句话白话解释代理圈高频技术与商业术语，纠正新手常见操作误区。',
    keyPoints: ['IEPL/IPLC 与 BGP 中转含义', 'Mihomo 内核与 TUN 虚拟网卡概念', '区分原生 IP、送中与倍率扣费'],
    publishedArticles: [
      { title: 'Clash Verge DNS 与 Fake-IP 详解', link: '/guides/clash-verge-dns', tag: 'DNS' }
    ],
    plannedCount: 8
  }
]

export function getClustersByTopic(topicLink: string): Level3Cluster[] {
  const clean = topicLink.replace(/\.html$/, '')
  return LEVEL3_CLUSTERS.filter((c) => c.topicLink === clean)
}
