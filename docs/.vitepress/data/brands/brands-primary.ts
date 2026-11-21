import type { BrandEntity, BrandUnlockEntry } from './types'

function makeUnverifiedUnlock(detail = '暂无独立逐项实测数据'): BrandUnlockEntry[] {
  return [
    { service: 'ChatGPT', status: 'unverified', detail },
    { service: 'Claude', status: 'unverified', detail },
    { service: 'Gemini', status: 'unverified', detail },
    { service: 'Netflix', status: 'unverified', detail },
    { service: 'Disney+', status: 'unverified', detail },
    { service: 'YouTube', status: 'unverified', detail },
    { service: 'HBO Max', status: 'unverified', detail },
    { service: 'TikTok', status: 'unverified', detail },
    { service: 'Spotify', status: 'unverified', detail }
  ]
}

export const BRANDS_PRIMARY: BrandEntity[] = [
  {
    slug: 'guangsuyun',
    rankOrder: 1,
    isFeaturedPartner: true,
    name: '光速云',
    englishName: 'Guangsuyun',
    aliases: ['GSY', '光速云机场'],
    logo: '/logos/guangsuyun.png',
    accentColor: '#2563EB',
    foundedYear: '2020 年起运营',
    lineType: 'IEPL 专线 + 企业级内网专线（双线路架构，含 IPLC 专线描述）',
    lineCategory: 'IEPL专线',
    protocols: ['VLESS', 'Shadowsocks（见 2026-08-19 测速图）', 'AnyTLS（见 2026-08-19 测速图）'],
    clientMode: 'both',
    clientModeLabel: '自研客户端 + 支持 Clash / Shadowrocket 等第三方订阅导入',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'Mihomo 系客户端'],
    deviceLimit: '不限设备数量',
    regionsSummary: '香港×20、台湾×5、日本×10、新加坡×10、美国×10、马来西亚×2、英国、法国、德国、土耳其、泰国、巴西等',
    nodeCountLabel: '标注 57+ 核心区域节点（含 70 节点实测图记录）',
    paymentMethods: ['支付宝', '微信', 'USDT'],
    promoCode: 'AMM',
    promoDiscount: '新人优惠券（具体折扣以官网实时显示为准）',
    promoNote: '极速版与定制版支持半年 9 折 / 年付 8 折 / 两年 75 折 / 三年 7 折；147 永久套餐与轻量版不参与折扣。',
    lowestMonthlyPrice: 25,
    lowestAnnualEquivalentMonthly: 8.25,
    entryPriceDisplay: '年付 ¥99/年（折合约 ¥8.25/月）；月付 ¥25/月起',
    tiers: [
      {
        name: '光速云·致敬斯诺克147永久套餐',
        cycle: 'one_time',
        cycleLabel: '一次性付费',
        price: 147,
        trafficLabel: '247GB（不过期）',
        resetCycle: '不重置（用完为止）',
        highlightNote: '不打折；特殊商品不支持退款'
      },
      {
        name: '光速云·轻量版',
        cycle: 'annual',
        cycleLabel: '年付',
        price: 99,
        monthlyEquivalent: 8.25,
        trafficLabel: '69GB/月（另历史摘要曾记 59GB）',
        resetCycle: '每月重置',
        highlightNote: '约 ¥8.25/月为年付折算均价，非单月付价格；不打折'
      },
      {
        name: '光速云·极速版',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 25,
        trafficLabel: '168GB/月',
        resetCycle: '每月重置',
        highlightNote: '全节点 ×1 倍率，单节点最高 2.5Gbps'
      },
      {
        name: '光速云·流光版',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 34,
        trafficLabel: '268GB/月',
        resetCycle: '每月重置',
        highlightNote: '见于《32家机场品牌清单.txt》完整价目表'
      },
      {
        name: '光速云·量子版',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 68,
        trafficLabel: '568GB/月',
        resetCycle: '每月重置',
        highlightNote: '见于《32家机场品牌清单.txt》完整价目表'
      },
      {
        name: '光速云·无界版',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 138,
        trafficLabel: '900GB/月',
        resetCycle: '每月重置',
        highlightNote: '见于《32家机场品牌清单.txt》完整价目表'
      },
      {
        name: '光速云·定制套餐',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 680,
        trafficLabel: '500GB/月',
        resetCycle: '每月重置',
        highlightNote: '独享原生 IP / 独立带宽，线下/一对一确认需求'
      }
    ],
    speedReport: {
      testDate: '2026-10-19（清单汇总，非晚高峰） / 2026-08-19（MiaoKo 图包）',
      environment: '清单基准测速（非晚高峰）+ MiaoKo 自定义测试（珠海联通 9Gbps / 长沙电信 / 广西移动 / 河北联通）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote:
        '2026-10-19 非晚高峰记录显示香港 22ms / 529Mbps、新加坡 46ms / 387Mbps；2026-08-19 MiaoKo 70 节点 VLESS 单线程测速图显示香港专线均速约 375–424MB/s。',
      rows: [
        { region: '香港', latencyMs: 22, downloadMbps: 529, note: '2026-10-19 非晚高峰' },
        { region: '台湾', latencyMs: 41, downloadMbps: 114, note: '2026-10-19 非晚高峰' },
        { region: '新加坡', latencyMs: 46, downloadMbps: 387, note: '2026-10-19 非晚高峰' },
        { region: '日本', latencyMs: 57, downloadMbps: 135, note: '2026-10-19 非晚高峰' },
        { region: '美国', latencyMs: 143, downloadMbps: 18, note: '2026-10-19 非晚高峰（MiaoKo 8月单线程曾达 313–370MB/s）' }
      ],
      screenshots: [
        {
          src: '/images/brands/guangsuyun/miaoko-vless-speed-2026-08-19.jpg',
          caption: '2026-08-19 MiaoKo 订阅速度测试（VLESS 70/70 节点，珠海联通 9Gbps 单线程）',
          alt: '光速云 2026-08-19 MiaoKo VLESS 70节点测速图'
        },
        {
          src: '/images/brands/guangsuyun/miaoko-vless-unlock-2026-08-19.jpg',
          caption: '2026-08-19 MiaoKo 基础流媒体与 OpenAI 解锁矩阵（VLESS / AnyTLS 70/70 节点）',
          alt: '光速云 2026-08-19 流媒体与 OpenAI 解锁测试图'
        },
        {
          src: '/images/brands/guangsuyun/miaoko-ss-telecom-2026-08-19.jpg',
          caption: '2026-08-19 三网对比：长沙电信 @2Gbps 普通测速（Shadowsocks 62/62 节点）',
          alt: '光速云 2026-08-19 长沙电信 Shadowsocks 测速图'
        },
        {
          src: '/images/brands/guangsuyun/miaoko-ss-mobile-2026-08-19.jpg',
          caption: '2026-08-19 三网对比：广西移动 @2Gbps 普通测速（Shadowsocks 62/62 节点）',
          alt: '光速云 2026-08-19 广西移动 Shadowsocks 测速图'
        },
        {
          src: '/images/brands/guangsuyun/miaoko-ss-unicom-2026-08-19.jpg',
          caption: '2026-08-19 三网对比：河北联通 @2Gbps 普通测速（Shadowsocks 62/62 节点）',
          alt: '光速云 2026-08-19 河北联通 Shadowsocks 测速图'
        },
        {
          src: '/images/speedtests/guangsuyun-2026-08-11.png',
          caption: '2026-08-11 14:32:56 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '光速云 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'node_dependent', detail: '视节点而定，官方承认部分节点需手动切换' },
      { service: 'Claude', status: 'measured_supported', detail: '标注支持，2026-08-19 测试多节点解锁' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定（新加坡等部分节点解锁，香港多失败）' },
      { service: 'Netflix', status: 'measured_supported', detail: '多地区节点支持解锁' },
      { service: 'Disney+', status: 'measured_supported', detail: '港/日/新/美节点多支持（部分台湾节点失败）' },
      { service: 'YouTube', status: 'measured_supported', detail: '支持 4K 播放，新/台部分节点存在送中提示需留意' },
      { service: 'HBO Max', status: 'vendor_claimed', detail: '资料标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '日本/美国/新加坡部分节点支持（香港为 ALISG/部分失败）' },
      { service: 'Spotify', status: 'vendor_claimed', detail: '资料标注支持' }
    ],
    dataStatus: 'measured',
    dataStatusLabel: '含历史实测图 + 品牌完整资料',
    discrepancies: [
      '《光速云品牌信息.txt》第8行摘要写“年付折合约 8 元/月，59GB”，同文档第25行轻量版明细与《32家机场品牌清单.txt》均标为 ¥99/年、69GB/月（折合约 ¥8.25/月）。',
      '《光速云品牌信息.txt》列出 4 档套餐（147永久/轻量版/极速版/定制版），《32家机场品牌清单.txt》补充了流光版 ¥34、量子版 ¥68、无界版 ¥138 共 7 档。',
      '2026-08-19 图包同时包含 VLESS/AnyTLS（70 节点）与 Shadowsocks（62 节点）两组测速图，实际节点协议可能随期调整。'
    ],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary:
      '光速云成立于 2020 年，采用 IEPL 专线与企业级内网专线架构，支持自研客户端及 Clash、Shadowrocket 等第三方订阅导入。套餐跨度从 ¥99/年轻量版、¥147 永久流量包到 ¥680/月独享定制版。',
    pros: [
      '2020 年起运营，品牌历史相对较长',
      '同时保留自研客户端与 Clash / Shadowrocket 第三方订阅支持',
      '不限设备数量，覆盖 11+ 国家地区节点',
      '具备 2026-08-19 三网实测及 2026-10-19 测速数据参考'
    ],
    limitations: [
      'ChatGPT 与 Gemini 并非全节点稳定支持，需手动切节点',
      '特殊商品不支持退款，年付 ¥99 起步门槛不适合先试一天再退的场景',
      '轻量版与 147 永久套餐不参与多周期折扣'
    ],
    suitableFor: [
      '需要兼顾老牌稳定度与 Clash 第三方客户端的用户',
      '有日常流媒体解锁与中轻度 AI 使用需求的个人或多设备用户',
      '希望选择不限时流量包作为备用线路的用户'
    ],
    notSuitableFor: [
      '需要 100% 无脑全节点直连 Gemini 且不愿切换节点的用户',
      '必须支持无理由退款试用的纯观望用户'
    ],
    riskNotes: [
      '购买前应先用月付极速版（¥25）验证本地晚高峰与目标 AI 节点可用性，再考虑年付或永久流量包。',
      '特殊商品不支持退款，下单前需确认协议与节点覆盖。'
    ],
    sources: ['32家机场品牌清单.txt', '光速云品牌信息.txt', '光速云测试图解锁图 (2026-08-19)'],
    reviewPath: '/reviews/guangsuyun'
  },
  {
    slug: 'muguang',
    rankOrder: 2,
    name: '暮光加速',
    englishName: 'Muguang',
    aliases: ['twilight'],
    accentColor: '#6366F1',
    foundedYear: '2023 年起运营',
    lineType: 'BGP 智能调度 + 专线级出口',
    lineCategory: 'BGP中转',
    protocols: ['待核实（原文未明确标出协议名）'],
    clientMode: 'unverified',
    clientModeLabel: '覆盖 Windows / macOS / iOS / Android / Linux 全平台（未明确是否提供通用订阅）',
    supportedClients: ['Windows', 'macOS', 'iOS', 'Android', 'Linux'],
    deviceLimit: '支持多设备同时在线',
    regionsSummary: '香港、台湾、新加坡、日本、美国等',
    nodeCountLabel: '节点总数待核实',
    paymentMethods: ['待核实'],
    promoCode: 'muguang5555',
    promoDiscount: '优惠码待核实具体折扣',
    lowestMonthlyPrice: 20,
    lowestAnnualEquivalentMonthly: 9.08,
    entryPriceDisplay: '年付 ¥109/年（折合约 ¥9.08/月）；月付 ¥20/月起',
    tiers: [
      { name: '【暮光·年付轻量版】', cycle: 'annual', cycleLabel: '年付', price: 109, monthlyEquivalent: 9.08, trafficLabel: '70GB/月', resetCycle: '每月重置' },
      { name: '【暮光·基础版】', cycle: 'monthly', cycleLabel: '月付', price: 20, trafficLabel: '120GB/月', resetCycle: '每月重置' },
      { name: '【暮光·标准版】', cycle: 'monthly', cycleLabel: '月付', price: 40, trafficLabel: '240GB/月', resetCycle: '每月重置' },
      { name: '【暮光·旗舰版】', cycle: 'monthly', cycleLabel: '月付', price: 100, trafficLabel: '700GB/月', resetCycle: '每月重置' },
      { name: '【暮光·至尊版】', cycle: 'monthly', cycleLabel: '月付', price: 180, trafficLabel: '1500GB/月', resetCycle: '每月重置' },
      { name: '【暮光·不限时轻量包】', cycle: 'one_time', cycleLabel: '一次性付费', price: 219, trafficLabel: '150GB', resetCycle: '一次性' },
      { name: '【暮光·不限时标准包】', cycle: 'one_time', cycleLabel: '一次性付费', price: 529, trafficLabel: '400GB', resetCycle: '一次性' },
      { name: '【暮光·不限时大容量包】', cycle: 'one_time', cycleLabel: '一次性付费', price: 959, trafficLabel: '800GB', resetCycle: '一次性' },
      { name: '独享私人定制节点', cycle: 'monthly', cycleLabel: '月付', price: 600, trafficLabel: '500GB/月', resetCycle: '每月重置' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 26ms / 509Mbps，新加坡 43ms / 419Mbps，日本 53ms / 150Mbps（非晚高峰数据）。',
      rows: [
        { region: '香港', latencyMs: 26, downloadMbps: 509 },
        { region: '台湾', latencyMs: 40, downloadMbps: 107 },
        { region: '新加坡', latencyMs: 43, downloadMbps: 419 },
        { region: '日本', latencyMs: 53, downloadMbps: 150 },
        { region: '美国', latencyMs: 160, downloadMbps: 19 }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与完整套餐表，优惠说明有待核实',
    discrepancies: [
      '清单基础数据标出优惠码 muguang5555，但说明段落末写“目前没有查到公开的优惠码信息”，且介绍提到“9元/月起”（对应年付 ¥109/12 ≈ ¥9.08/月）。'
    ],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '暮光加速成立于 2023 年，主打 BGP 智能调度与专线级出口，面向个人和团队跨平台多设备使用，提供 70GB 年付至 1500GB 大流量月付以及多档不限时流量包。',
    pros: [
      '全平台覆盖且支持多设备同时在线',
      '流量档位从 70GB 到 1500GB 选择丰富，含不限时包',
      '官方宣称提供 7×24 小时真人客服'
    ],
    limitations: [
      '原文未明确标出底层传输协议',
      '优惠码折扣力度与“无公开优惠码”说明存在文字差异'
    ],
    suitableFor: ['多设备同时在线的跨平台个人或远程办公团队', '需要大流量月付（700GB/1500GB）的用户'],
    notSuitableFor: ['必须明确确认具体协议细节再下单的技术用户'],
    riskNotes: ['优惠码 muguang5555 实际有效性与折扣率需在结账页实测核实。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/muguang'
  },
  {
    slug: 'feimao',
    rankOrder: 3,
    name: '飞猫云',
    englishName: 'Feimao',
    aliases: ['Flycat'],
    logo: '/logos/feimao.png',
    accentColor: '#0EA5E9',
    foundedYear: '2023 年起运营',
    lineType: '轻量优化线路（非顶级纯专线定位）',
    lineCategory: '混合线路',
    protocols: ['未公开标注（走专属客户端封装）'],
    clientMode: 'dedicated_only',
    clientModeLabel: '仅专属客户端下载登录即用，不提供第三方订阅配置',
    supportedClients: ['飞猫云专属客户端'],
    deviceLimit: '待核实',
    regionsSummary: '香港、台湾、新加坡、日本、美国等亚太欧美热门地区',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'flycat888',
    promoDiscount: '汇总表标注 8 折',
    lowestMonthlyPrice: 25,
    lowestAnnualEquivalentMonthly: 7,
    entryPriceDisplay: '学生版年付 ¥84/年（折合约 ¥7/月）；月付 ¥25/月起',
    tiers: [
      { name: '飞猫·学生版', cycle: 'annual', cycleLabel: '年付', price: 84, monthlyEquivalent: 7, trafficLabel: '50GB/月', resetCycle: '每月重置' },
      { name: '飞猫·星耀版', cycle: 'monthly', cycleLabel: '月付', price: 25, trafficLabel: '150GB/月', resetCycle: '每月重置' },
      { name: '飞猫·星环版', cycle: 'monthly', cycleLabel: '月付', price: 45, trafficLabel: '300GB/月', resetCycle: '每月重置' },
      { name: '飞猫·银河版', cycle: 'monthly', cycleLabel: '月付', price: 85, trafficLabel: '600GB/月', resetCycle: '每月重置' },
      { name: '飞猫·宇宙版', cycle: 'monthly', cycleLabel: '月付', price: 150, trafficLabel: '1000GB/月', resetCycle: '每月重置' },
      { name: '飞猫·不限时套餐', cycle: 'one_time', cycleLabel: '一次性付费', price: 680, trafficLabel: '1000GB', resetCycle: '一次性' },
      { name: '飞猫·定制套餐', cycle: 'monthly', cycleLabel: '月付', price: 550, trafficLabel: '500GB/月', resetCycle: '每月重置' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 21ms / 526Mbps，新加坡 45ms / 413Mbps，台湾 41ms / 116Mbps。',
      rows: [
        { region: '香港', latencyMs: 21, downloadMbps: 526 },
        { region: '台湾', latencyMs: 41, downloadMbps: 116 },
        { region: '新加坡', latencyMs: 45, downloadMbps: 413 },
        { region: '日本', latencyMs: 54, downloadMbps: 138 },
        { region: '美国', latencyMs: 178, downloadMbps: 14 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/feimao-2026-08-11.png',
          caption: '2026-08-11 08:52:30 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '飞猫云 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与套餐表，仅支持专属客户端',
    discrepancies: [],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '飞猫云运营于 2023 年，核心定位是“新手免折腾”：不提供订阅链接，用户下载专属客户端后登录即可连接，年付学生版低至 ¥84/年（50GB/月）。',
    pros: [
      '专属客户端登录即用，免去选软件和导入订阅的学习成本',
      '学生版年付折合 ¥7/月，入门门槛较低',
      '香港与新加坡非晚高峰带宽表现较好'
    ],
    limitations: [
      '不支持 Clash Verge Rev、Shadowrocket 等第三方客户端导入订阅',
      '不以顶级纯专线高负载晚高峰体验作为核心定位'
    ],
    suitableFor: ['首次接触代理、不想折腾 Clash 配置的新手', '预算敏感且仅需轻量日常访问的学生群体'],
    notSuitableFor: ['习惯使用 Clash Verge Rev、OpenClash 软路由或自定义分流规则的进阶用户'],
    riskNotes: ['因依赖专属客户端，需确认自己全部常用设备（含路由器或 Linux）均在官方支持之列。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/feimao'
  },
  {
    slug: 'weifeng',
    rankOrder: 4,
    name: '微风网络',
    englishName: 'BreezeNet',
    aliases: ['微风机场'],
    accentColor: '#10B981',
    foundedYear: '2023 年起运营',
    lineType: 'IEPL 专线 + 原生 IP 节点',
    lineCategory: 'IEPL专线',
    protocols: ['VLESS'],
    clientMode: 'unverified',
    clientModeLabel: '使用方式待核实',
    supportedClients: ['待核实（常见 VLESS 客户端）'],
    deviceLimit: '待核实',
    regionsSummary: '香港、台湾、新加坡、日本、美国',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'flat888',
    promoDiscount: '汇总表标注 9 折',
    lowestMonthlyPrice: 27,
    lowestAnnualEquivalentMonthly: 11.42,
    entryPriceDisplay: '清风年付 ¥137/年（折合约 ¥11.42/月）；月付 ¥27/月起',
    tiers: [
      { name: '清风 (Breeze)', cycle: 'annual', cycleLabel: '年付', price: 137, monthlyEquivalent: 11.42, trafficLabel: '100GB/月', resetCycle: '每月重置' },
      { name: '乘风 (Riding)', cycle: 'monthly', cycleLabel: '月付', price: 27, trafficLabel: '200GB/月', resetCycle: '每月重置' },
      { name: '破风 (Breaking)', cycle: 'monthly', cycleLabel: '月付', price: 57, trafficLabel: '500GB/月', resetCycle: '每月重置' },
      { name: '御风 (Mastery)', cycle: 'monthly', cycleLabel: '月付', price: 127, trafficLabel: '1200GB/月', resetCycle: '每月重置' },
      { name: '信风·不限时', cycle: 'one_time', cycleLabel: '一次性付费', price: 200, trafficLabel: '270GB', resetCycle: '一次性' },
      { name: '长风·不限时', cycle: 'one_time', cycleLabel: '一次性付费', price: 370, trafficLabel: '570GB', resetCycle: '一次性' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 25ms / 546Mbps，新加坡 43ms / 384Mbps。',
      rows: [
        { region: '香港', latencyMs: 25, downloadMbps: 546 },
        { region: '台湾', latencyMs: 40, downloadMbps: 115 },
        { region: '新加坡', latencyMs: 43, downloadMbps: 384 },
        { region: '日本', latencyMs: 54, downloadMbps: 131 },
        { region: '美国', latencyMs: 167, downloadMbps: 17 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/weifeng-2026-08-11.png',
          caption: '2026-07-19 18:38:20 CST MiaoKo 测速（珠海联通 9Gbps 32线程，VLESS 50/50；台湾02 0.00B、日本05 8.00KB）',
          alt: '微风网络 2026-07-19 VLESS 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与套餐表，基础数据行与套餐表存在差异',
    discrepancies: [
      '基础数据行写“年付约7元/月 50GB/月”及汇总表写“7元档+9折”，但详细套餐表起始年付为清风 ¥137/年（100GB/月，折合约 ¥11.42/月），说明介绍中也写“11 元/月起”。'
    ],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '微风网络定位高性价比 IEPL + VLESS 专线机场，提供 7×24 小时在线客服（夜间 AI 值守），支持主流流媒体与 AI 工具。',
    pros: ['IEPL 专线配合 VLESS 协议', '提供 7×24 小时在线客服（夜间 AI 值守）', '同时提供月付、年付及不限时流量包'],
    limitations: ['基础数据摘要“7元/50GB”与详细套餐表“¥137年/100GB”存在口径差异，购买前需以官网当前列表为准'],
    suitableFor: ['看重客服响应的新手与轻中度用户'],
    notSuitableFor: ['依赖单一摘要价格做预算而不核对官网实时套餐的用户'],
    riskNotes: ['与 Firefly 萤火虫存在同系关系（清单 Firefly 历史条目提及“与微风、飞鸟和一云梯存在明确同系关系”）。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/weifeng'
  },
  {
    slug: 'dalaoyun',
    rankOrder: 5,
    name: '大佬云',
    englishName: 'Dalaoyun',
    aliases: [],
    accentColor: '#475569',
    foundedYear: '2024 年起运营',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL专线',
    protocols: ['VLESS'],
    clientMode: 'both',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    supportedClients: ['自研客户端', 'Clash / VLESS 兼容客户端'],
    deviceLimit: '待核实',
    regionsSummary: '待核实',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'dly888',
    promoDiscount: '季付及以上 7 折',
    lowestMonthlyPrice: null,
    lowestAnnualEquivalentMonthly: 5.6,
    entryPriceDisplay: '年付折合约 ¥5.6/月（60GB/月）；完整月付档位待核实',
    tiers: [
      {
        name: '入门年付档（摘要口径）',
        cycle: 'annual',
        cycleLabel: '年付折算',
        price: 67.2,
        monthlyEquivalent: 5.6,
        trafficLabel: '60GB/月',
        resetCycle: '每月重置',
        highlightNote: '资料仅提供折合约 ¥5.6/月、60GB，实际年付总价与其余月付档位待核实'
      }
    ],
    tiersIncompleteNote: '现有资料仅披露年付折合 ¥5.6/月（60GB）与季付及以上 7 折，缺少完整多档套餐表。',
    speedReport: {
      testDate: '暂无可核实实测数据',
      environment: '未提供',
      isPeakHour: false,
      dataOrigin: 'unverified',
      summaryNote: '品牌资料未提供分地区测速与延迟记录，无法评估实际晚高峰表现。',
      rows: []
    },
    unlockMatrix: makeUnverifiedUnlock('品牌资料未提供解锁实测'),
    dataStatus: 'partial',
    dataStatusLabel: '资料缺口：缺完整价目表与实测数据',
    discrepancies: ['在《32家机场品牌清单.txt》正文中排第 5，而在文末汇总表排第 22；与闪电鼠、云界线、榴莲云、环球梯规格几乎一致。'],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '大佬云是 2024 年起运营的极限平价档方案（年付折合约 ¥5.6/月、60GB/月，IEPL + VLESS，支持自研客户端与第三方订阅）。',
    pros: ['极低年付入门价格档位', '同时支持自研客户端与第三方订阅导入'],
    limitations: ['缺少独立测速与流媒体/AI 解锁实测记录', '与同档位多家机场高度同质，缺乏差异化公开卖点'],
    suitableFor: ['预算极其有限、将其作为低成本备用节点的轻度用户'],
    notSuitableFor: ['需要明确测速证据和稳定流媒体解锁保障的主力用户'],
    riskNotes: ['超低价年付方案需自行评估长期运营稳定性，建议避免一次投入过高周期。'],
    sources: ['32家机场品牌清单.txt']
  },
  {
    slug: 'xingdaomeng',
    rankOrder: 6,
    name: '星岛梦',
    englishName: 'Xingdaomeng',
    aliases: ['XDM'],
    logo: '/logos/xingdaomeng.webp',
    accentColor: '#0284C7',
    foundedYear: '2020 年起运营',
    lineType: 'IEPL 专线（1 倍流量）',
    lineCategory: 'IEPL专线',
    protocols: ['Trojan'],
    clientMode: 'third_party',
    clientModeLabel: '通用订阅（支持主流第三方客户端，具体客户端支持列表以官网为准）',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'Trojan 兼容客户端'],
    deviceLimit: '不限设备使用',
    regionsSummary: '香港、台湾、日本、美国、新加坡及韩国、东南亚等地区',
    nodeCountLabel: '亚太与东南亚覆盖较广（具体总数未标注）',
    paymentMethods: ['待核实'],
    promoCode: 'nmw888',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 25,
    lowestAnnualEquivalentMonthly: 8,
    entryPriceDisplay: '年付 ¥96/年（折合 ¥8/月）；月付 ¥25/月起',
    tiers: [
      { name: '星岛梦·贴心小包', cycle: 'annual', cycleLabel: '年付', price: 96, monthlyEquivalent: 8, trafficLabel: '60GB/月', resetCycle: '每月重置' },
      { name: '星岛梦·超量150G', cycle: 'monthly', cycleLabel: '月付', price: 25, trafficLabel: '150GB/月', resetCycle: '每月重置' },
      { name: '星岛梦·进阶300G', cycle: 'monthly', cycleLabel: '月付', price: 50, trafficLabel: '300GB/月', resetCycle: '每月重置' },
      { name: '星岛梦·闪光500G', cycle: 'monthly', cycleLabel: '月付', price: 70, trafficLabel: '500GB/月', resetCycle: '每月重置' },
      { name: '星岛梦·旗舰1T版', cycle: 'monthly', cycleLabel: '月付', price: 130, trafficLabel: '1000GB/月', resetCycle: '每月重置' },
      { name: '星岛梦·永久不限时100', cycle: 'one_time', cycleLabel: '一次性付费', price: 100, trafficLabel: '100GB', resetCycle: '一次性' },
      { name: '星岛梦·永久不限时300', cycle: 'one_time', cycleLabel: '一次性付费', price: 300, trafficLabel: '300GB', resetCycle: '一次性' },
      { name: '星岛梦·永久不限时1TB', cycle: 'one_time', cycleLabel: '一次性付费', price: 600, trafficLabel: '1000GB', resetCycle: '一次性' },
      { name: '星岛梦·定制套餐', cycle: 'monthly', cycleLabel: '月付', price: 680, trafficLabel: '500GB/月', resetCycle: '每月重置' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 27ms / 504Mbps，新加坡 44ms / 411Mbps。',
      rows: [
        { region: '香港', latencyMs: 27, downloadMbps: 504 },
        { region: '台湾', latencyMs: 41, downloadMbps: 103 },
        { region: '新加坡', latencyMs: 44, downloadMbps: 411 },
        { region: '日本', latencyMs: 57, downloadMbps: 136 },
        { region: '美国', latencyMs: 177, downloadMbps: 18 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/xingdaomeng-2026-08-11.png',
          caption: '2026-08-11 01:48:13 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '星岛梦 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持 YouTube Premium' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持跨区' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与 9 档完整套餐表',
    discrepancies: [],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '星岛梦自 2020 年起运营，采用 IEPL 专线与 Trojan 协议，1 倍流量不限设备数，覆盖亚太、欧美及韩国东南亚节点，兼顾年付、大流量月付和永久不限时包。',
    pros: ['2020 年老牌运营周期较长', '1 倍流量不限设备，适合多终端家庭', '除主流港台日新美外还延伸韩国及东南亚节点'],
    limitations: ['优惠码 nmw888 实际折扣幅度未标注'],
    suitableFor: ['多设备家庭或小团队共用', '需要韩国/东南亚地区节点或永久不限时流量包的用户'],
    notSuitableFor: ['仅依赖单一超低月付（10元以下不绑年）的用户'],
    riskNotes: ['建议结合所在省份和本地运营商先小额测试，再决定是否长期年付。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/xingdaomeng'
  },
  {
    slug: 'ermao',
    rankOrder: 7,
    name: '二猫云',
    englishName: 'Ermao',
    aliases: ['2mao'],
    logo: '/logos/ermao.webp',
    accentColor: '#F59E0B',
    foundedYear: '2023 年起运营',
    lineType: '全线 IEPL 专线',
    lineCategory: 'IEPL专线',
    protocols: ['VLESS'],
    clientMode: 'both',
    clientModeLabel: '独家定制客户端（说明同时保留通用或长期多端支持，具体以官网为准）',
    supportedClients: ['二猫云定制客户端', 'VLESS 兼容客户端（待确认订阅导出细节）'],
    deviceLimit: '不限设备连接数',
    regionsSummary: '香港、台湾、新加坡、日本、美国（注意说明段曾提及较早时期缺少新加坡节点，当前测速表已含新加坡）',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'ermao5555',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 20,
    lowestAnnualEquivalentMonthly: 7.42,
    entryPriceDisplay: '年付小包 ¥89/年（折合约 ¥7.42/月）；白猫月付 ¥20/月起',
    tiers: [
      { name: '二猫年付小包', cycle: 'annual', cycleLabel: '年付', price: 89, monthlyEquivalent: 7.42, trafficLabel: '60GB/月', resetCycle: '每月重置' },
      { name: '二猫云·不限时套餐', cycle: 'one_time', cycleLabel: '一次性付费', price: 99, trafficLabel: '100GB', resetCycle: '一次性' },
      { name: '二猫云·白猫套餐', cycle: 'monthly', cycleLabel: '月付', price: 20, trafficLabel: '130GB/月', resetCycle: '每月重置' },
      { name: '二猫云·橘猫畅玩版', cycle: 'monthly', cycleLabel: '月付', price: 40, trafficLabel: '230GB/月', resetCycle: '每月重置' },
      { name: '二猫云·牛奶猫尊享版', cycle: 'monthly', cycleLabel: '月付', price: 80, trafficLabel: '430GB/月', resetCycle: '每月重置' },
      { name: '二猫云·黑猫重度用户版', cycle: 'monthly', cycleLabel: '月付', price: 160, trafficLabel: '850GB/月', resetCycle: '每月重置' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 22ms / 481Mbps，新加坡 46ms / 407Mbps，日本 53ms / 143Mbps。',
      rows: [
        { region: '香港', latencyMs: 22, downloadMbps: 481 },
        { region: '台湾', latencyMs: 41, downloadMbps: 118 },
        { region: '新加坡', latencyMs: 46, downloadMbps: 407 },
        { region: '日本', latencyMs: 53, downloadMbps: 143 },
        { region: '美国', latencyMs: 134, downloadMbps: 17 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/ermao-2026-08-11.png',
          caption: '2026-08-11 10:45:27 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '二猫云 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'node_dependent', detail: '视节点而定，官方未给出确定承诺' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定，官方未给出确定承诺' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与套餐表，Claude/Gemini 视节点而定',
    discrepancies: ['介绍段落曾写“比同类少了新加坡这一站”，但 2026-10-19 测速表已含新加坡 46ms / 407Mbps 数据。'],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '二猫云自 2023 年运营，走全线 IEPL 专线 + VLESS 协议，不限设备连接数，配备独家定制客户端并主打长期留存（月付 ¥20 起，年付小包 ¥89）。',
    pros: ['全线 IEPL + VLESS，不限设备数量', '提供 ¥99/100GB 一次性不限时流量包', '海外技术团队主理'],
    limitations: ['Claude 与 Gemini 尚未明确全节点支持状态'],
    suitableFor: ['追求稳定留存、多终端连接且主要使用 ChatGPT/主流流媒体的用户'],
    notSuitableFor: ['强依赖 Claude/Gemini 且不想逐节点测试的用户'],
    riskNotes: ['长期三年付等超长周期价格优惠虽大，仍建议从月付或年付小包起步验证。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/ermao'
  },
  {
    slug: 'wuyou',
    rankOrder: 8,
    name: '无忧链接',
    englishName: 'WorryFree',
    aliases: ['Wuyou'],
    accentColor: '#14B8A6',
    foundedYear: '2025 年起运营',
    lineType: '专线不限速（汇总表标注订阅无需转换）',
    lineCategory: '混合线路',
    protocols: ['待核实'],
    clientMode: 'dedicated_only',
    clientModeLabel: '2026 年 10 月起主要采用官方专属客户端下载登录即用（汇总表另曾记“订阅无需转换”）',
    supportedClients: ['无忧链接专属客户端'],
    deviceLimit: '不限设备数量',
    regionsSummary: '香港、台湾、新加坡、日本、美国',
    nodeCountLabel: '节点覆盖偏基础（总数未披露）',
    paymentMethods: ['待核实'],
    promoCode: 'wuyou666',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 19,
    lowestAnnualEquivalentMonthly: 6.58,
    entryPriceDisplay: 'MINI 年付 ¥79/年（折合约 ¥6.58/月）；舒心月付 ¥19/月起',
    tiers: [
      { name: 'MINI 链接', cycle: 'annual', cycleLabel: '年付', price: 79, monthlyEquivalent: 6.58, trafficLabel: '40GB/月', resetCycle: '每月重置' },
      { name: '舒心链接', cycle: 'monthly', cycleLabel: '月付', price: 19, trafficLabel: '100GB/月', resetCycle: '每月重置' },
      { name: '省心链接', cycle: 'monthly', cycleLabel: '月付', price: 33, trafficLabel: '200GB/月', resetCycle: '每月重置' },
      { name: '随心链接', cycle: 'monthly', cycleLabel: '月付', price: 77, trafficLabel: '500GB/月', resetCycle: '每月重置' },
      { name: '忘忧链接', cycle: 'monthly', cycleLabel: '月付', price: 117, trafficLabel: '1000GB/月', resetCycle: '每月重置' },
      { name: '100G 永久不限时 无忧链接', cycle: 'one_time', cycleLabel: '一次性付费', price: 108, trafficLabel: '100GB', resetCycle: '一次性' },
      { name: '300G 永久不限时 无忧链接', cycle: 'one_time', cycleLabel: '一次性付费', price: 298, trafficLabel: '300GB', resetCycle: '一次性' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 23ms / 531Mbps，新加坡 42ms / 418Mbps，日本 55ms / 147Mbps。',
      rows: [
        { region: '香港', latencyMs: 23, downloadMbps: 531 },
        { region: '台湾', latencyMs: 41, downloadMbps: 107 },
        { region: '新加坡', latencyMs: 42, downloadMbps: 418 },
        { region: '日本', latencyMs: 55, downloadMbps: 147 },
        { region: '美国', latencyMs: 145, downloadMbps: 17 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/wuyou-1.jpg',
          caption: '2026-07-18 21:40:48 CST MiaoKo 订阅速度测试（珠海联通 9Gbps 32线程，VLESS 50/50）',
          alt: '无忧链接 2026-07-18 节点测速实测图'
        },
        {
          src: '/images/speedtests/wuyou-2.jpg',
          caption: '2026-07-18 21:47:23 CST MiaoKo 御三家流媒体解锁图（YouTube/Netflix/Disney+ 50/50，HKG-01 YT 送中）',
          alt: '无忧链接 2026-07-18 御三家流媒体解锁实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '支持 TikTok 跨区直连与直播场景' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与套餐，2025 年新站',
    discrepancies: ['汇总表称“订阅无需转换”，正文特色称“2026年10月起专属客户端下载登录即用，不用折腾订阅配置”。'],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '无忧链接成立于 2025 年，定位轻度用户与跨境电商/TikTok 直播场景，全线无倍率不限速不限设备，MINI 年付 ¥79（40GB/月）属于超低门槛档。',
    pros: ['年付门槛低（¥79/年，40GB/月）', '支持 TikTok 跨区直连与 7×24 小时在线客服', '无倍率且不限设备数'],
    limitations: ['2025 年上线品牌，运营沉淀时间较短', '入门年付仅 40GB/月，节点覆盖偏基础'],
    suitableFor: ['轻度日常浏览、跨境电商/TikTok 辅助运营及备用需求'],
    notSuitableFor: ['大流量下载或对多地区冷门节点有要求的用户'],
    riskNotes: ['新上线机场建议优先选择月付或小流量包验证稳定性。'],
    sources: ['32家机场品牌清单.txt']
  },
  {
    slug: 'weitu',
    rankOrder: 9,
    name: '唯兔云',
    englishName: 'V2yun / Weitu',
    aliases: ['V2云', '唯兔'],
    logo: '/logos/weitu.png',
    accentColor: '#EC4899',
    foundedYear: '2023 年起运营',
    lineType: 'IPLC 专线（1 倍流量，三网优化 + 智能负载均衡）',
    lineCategory: 'IPLC专线',
    protocols: ['Trojan'],
    clientMode: 'third_party',
    clientModeLabel: '通用订阅（支持主流第三方客户端）',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'Trojan 兼容客户端'],
    deviceLimit: '不限设备连接',
    regionsSummary: '香港、台湾、新加坡、日本、美国等（汇总表标注 60+ 节点）',
    nodeCountLabel: '60+ 节点（汇总表）',
    paymentMethods: ['待核实'],
    promoCode: 'weitu666',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 14.9,
    lowestAnnualEquivalentMonthly: 6.66,
    entryPriceDisplay: '年付限量款 ¥79.9/年（折合约 ¥6.66/月）；节假日限时月付 ¥14.9（常规 ¥19.9/月）',
    tiers: [
      { name: '唯兔云·年付版限量款', cycle: 'annual', cycleLabel: '年付', price: 79.9, monthlyEquivalent: 6.66, trafficLabel: '45GB/月', resetCycle: '每月重置' },
      { name: '唯兔云·年付加强专线', cycle: 'annual', cycleLabel: '年付', price: 120, monthlyEquivalent: 10, trafficLabel: '75GB/月', resetCycle: '每月重置' },
      { name: '唯兔云·节假日限时开启', cycle: 'monthly', cycleLabel: '月付', price: 14.9, trafficLabel: '100GB/月', resetCycle: '每月重置', highlightNote: '限时开启款，常规普通版 ¥19.90/月' },
      { name: '唯兔云·普通版', cycle: 'monthly', cycleLabel: '月付', price: 19.9, trafficLabel: '150GB/月', resetCycle: '每月重置' },
      { name: '唯兔云·进阶版', cycle: 'monthly', cycleLabel: '月付', price: 29.9, trafficLabel: '200GB/月', resetCycle: '每月重置' },
      { name: '唯兔云·专业版', cycle: 'monthly', cycleLabel: '月付', price: 59.9, trafficLabel: '500GB/月', resetCycle: '每月重置' },
      { name: '唯兔云·至尊版', cycle: 'monthly', cycleLabel: '月付', price: 119.9, trafficLabel: '1000GB/月', resetCycle: '每月重置' },
      { name: '唯兔云·永久不限时 100G', cycle: 'one_time', cycleLabel: '一次性付费', price: 100, trafficLabel: '100GB', resetCycle: '一次性' },
      { name: '唯兔云·永久不限时 200G', cycle: 'one_time', cycleLabel: '一次性付费', price: 160, trafficLabel: '200GB', resetCycle: '一次性' },
      { name: '唯兔云·永久不限时 500G', cycle: 'one_time', cycleLabel: '一次性付费', price: 340, trafficLabel: '500GB', resetCycle: '一次性' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 27ms / 500Mbps，新加坡 44ms / 414Mbps，日本 56ms / 147Mbps。',
      rows: [
        { region: '香港', latencyMs: 27, downloadMbps: 500 },
        { region: '台湾', latencyMs: 37, downloadMbps: 100 },
        { region: '新加坡', latencyMs: 44, downloadMbps: 414 },
        { region: '日本', latencyMs: 56, downloadMbps: 147 },
        { region: '美国', latencyMs: 179, downloadMbps: 17 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/weitu-2026-08-11.png',
          caption: '2026-08-11 13:55:08 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '唯兔云 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定（特色介绍提及支持，实测表标视节点而定）' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '含测速与 10 档完整套餐表',
    discrepancies: [],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '唯兔云自 2023 年起运营，采用 IPLC 专线与 Trojan 协议，1 倍流量、不限速、不限设备连接数，月付普通版 ¥19.90/150GB 起并设三档永久流量包。',
    pros: ['IPLC 专线 1 倍流量，月付 ¥19.9/150GB 性价比均衡', '60+ 节点且不限设备数', '三档永久不限时流量包选择灵活'],
    limitations: ['¥14.9 档仅限节假日限时开启，非全年常驻月付价'],
    suitableFor: ['兼顾日常 AI 工具与流媒体、需要中档预算 IPLC 专线的个人或家庭'],
    notSuitableFor: ['必须使用 VLESS 协议的特定客户场景'],
    riskNotes: ['优惠价与限时套餐库存可能随官网活动调整，下单前需核对结算金额。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/weitu'
  },
  {
    slug: 'firefly',
    rankOrder: 10,
    name: 'Firefly 萤火虫',
    englishName: 'Firefly',
    aliases: ['萤火虫机场', 'Firefly 机场'],
    accentColor: '#F97316',
    foundedYear: '历史资料提及 8 年团队经验（实际站点上线年份未单列）',
    lineType: 'IPLC 专线（原生 IP）',
    lineCategory: 'IPLC专线',
    protocols: ['VLESS'],
    clientMode: 'dedicated_only',
    clientModeLabel: '2026 年 10 月起采用专属客户端下载登录即用（不提供订阅链接）',
    supportedClients: ['Firefly 官方专属客户端'],
    deviceLimit: '不限客户端及设备数量',
    regionsSummary: '香港、台湾、新加坡、日本、美国',
    nodeCountLabel: '待核实',
    paymentMethods: ['支付宝', 'USDT（历史资料标注无微信）'],
    promoCode: 'firefly',
    promoDiscount: '新用户 8 折（年付版不适用）',
    promoNote: '历史资料另有季 9 / 半 85 / 年 8 折说明。',
    lowestMonthlyPrice: 25,
    lowestAnnualEquivalentMonthly: 8,
    entryPriceDisplay: '年付版 ¥96/年（折合 ¥8/月）；Lite 月付 ¥25/月起',
    tiers: [
      { name: 'Firefly 年付版', cycle: 'annual', cycleLabel: '年付', price: 96, monthlyEquivalent: 8, trafficLabel: '60GB/月', resetCycle: '每月重置' },
      { name: 'Firefly Lite', cycle: 'monthly', cycleLabel: '月付', price: 25, trafficLabel: '150GB/月', resetCycle: '每月重置', highlightNote: '另有季付 ¥67 / 半年付 ¥127 / 年付 ¥240 / 两年 ¥420 / 三年 ¥540' },
      { name: 'Firefly Plus', cycle: 'monthly', cycleLabel: '月付', price: 45, trafficLabel: '300GB/月', resetCycle: '每月重置', highlightNote: '另有季 ¥121 / 半 ¥229 / 年 ¥432 / 两年 ¥756 / 三年 ¥972' },
      { name: 'Firefly Blaze', cycle: 'monthly', cycleLabel: '月付', price: 85, trafficLabel: '600GB/月', resetCycle: '每月重置', highlightNote: '另有季 ¥229 / 半 ¥433 / 年 ¥816 / 两年 ¥1428 / 三年 ¥1836' },
      { name: 'Firefly Nova', cycle: 'monthly', cycleLabel: '月付', price: 150, trafficLabel: '1000GB/月', resetCycle: '每月重置', highlightNote: '另有季 ¥400 / 半 ¥750 / 年 ¥1360 / 两年 ¥2399 / 三年 ¥3119' },
      { name: 'Firefly 不限时', cycle: 'one_time', cycleLabel: '一次性付费', price: 100, trafficLabel: '100GB', resetCycle: '一次性' }
    ],
    speedReport: {
      testDate: '2026-10-19（主表，非晚高峰）；文末历史条目未单列测速',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 27ms / 547Mbps，新加坡 42ms / 445Mbps，美国 143ms / 30Mbps。',
      rows: [
        { region: '香港', latencyMs: 27, downloadMbps: 547 },
        { region: '台湾', latencyMs: 39, downloadMbps: 135 },
        { region: '新加坡', latencyMs: 42, downloadMbps: 445 },
        { region: '日本', latencyMs: 57, downloadMbps: 147 },
        { region: '美国', latencyMs: 143, downloadMbps: 30 }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '主表标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '主表标注支持' }
    ],
    dataStatus: 'measured',
    dataStatusLabel: '已合并重复条目（第 8 项与文末历史第 32 项）',
    discrepancies: [
      '审计发现《32家机场品牌清单.txt》中“## 8. Firefly（firefly）”与文末“Firefly 萤火虫”为同一品牌实体：相同推广主域、同优惠码 firefly、同套餐矩阵，仅推荐码与采集日期不同（2026-10-19 与 2026-08-09），已去重合并。',
      '品牌方宣传“不限速”需按 vendor_claimed 标注，并以实际网络环境为准。'
    ],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: 'Firefly 萤火虫主打 IPLC 专线与原生 IP，采用 VLESS 协议与专属客户端模式（2026 年 10 月起不提供第三方订阅链接），官网支持免翻墙直连访问。',
    pros: ['IPLC 专线 + 原生 IP，支持免翻墙访问官网', '不限设备数量，提供多周期折扣', '7×24 小时在线客服（夜间 AI 值守）'],
    limitations: ['不提供 Clash / Shadowrocket 订阅链接，仅限专属客户端', '不支持微信支付（历史资料标仅支付宝与 USDT）'],
    suitableFor: ['需要 IPLC 原生 IP 且愿意使用官方专属客户端的用户'],
    notSuitableFor: ['依赖 OpenWrt 软路由或第三方 Clash 订阅管理的进阶玩家'],
    riskNotes: ['与微风网络、飞鸟和一云梯存在同系关联，选择多机场互备时建议避免全部压在同一上游系。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/firefly'
  },
  {
    slug: 'yuzhou',
    rankOrder: 11,
    name: '宇宙云',
    englishName: 'Yuzhou Cloud',
    aliases: [],
    logo: '/logos/yuzhou.webp',
    accentColor: '#7C3AED',
    foundedYear: '待核实',
    lineType: '三网优化 + 智能负载均衡（历史资料）；汇总表另注 IEPL+VLESS+自研客户端',
    lineCategory: '混合线路',
    protocols: ['VLESS（早期资料）'],
    clientMode: 'unverified',
    clientModeLabel: '使用方式待核实（不默认专属或订阅）',
    supportedClients: ['待核实'],
    deviceLimit: '待核实',
    regionsSummary: '待核实（早期资料记 60+ 节点）',
    nodeCountLabel: '60+ 节点（历史资料）',
    paymentMethods: ['待核实'],
    promoCode: 'YUZHOU553',
    promoDiscount: '历史资料称新用户 8 折',
    lowestMonthlyPrice: null,
    lowestAnnualEquivalentMonthly: 8,
    entryPriceDisplay: '历史起步价 ¥96/年（月流量与完整月付套餐待核实）',
    tiers: [],
    tiersIncompleteNote: '现有资料不足以列出该品牌完整套餐，历史起价 ¥96/年不可直接视作当前全部套餐。',
    speedReport: {
      testDate: '2026-08-11 21:04:24 CST（实测截图快照）',
      environment: 'main 4.3.3 (696) / miaosu 4.7.0 (A11-32)，珠海联通 9Gbps 32线程，VLESS 50/50 节点',
      isPeakHour: true,
      dataOrigin: 'measured',
      summaryNote: '2026-08-11 晚间 21:04 实测截图显示香港 02–15 节点均速约 470–550MB/s（香港 01 为 0.00B），新加坡 331–523MB/s（新加坡 07 为 9.60KB），日本 22–169MB/s，美国 8–12MB/s。仅反映单日测试窗口快照。',
      rows: [
        { region: '香港（02–15，01节点0.00B）', latencyMs: 109, downloadMbps: 4200, note: '2026-08-11 21:04 9Gbps 32线程截图约 470–550MB/s' },
        { region: '台湾（01–05）', latencyMs: 160, downloadMbps: 450, note: '2026-08-11 21:04 截图约 29–77MB/s' },
        { region: '新加坡（07节点9.60KB）', latencyMs: 97, downloadMbps: 3000, note: '2026-08-11 21:04 截图正常节点约 331–523MB/s' },
        { region: '日本（01–10）', latencyMs: 140, downloadMbps: 850, note: '2026-08-11 21:04 截图约 22–169MB/s' },
        { region: '美国（01–10）', latencyMs: 243, downloadMbps: 85, note: '2026-08-11 21:04 截图约 8.3–12.4MB/s' }
      ],
      screenshots: [
        {
          src: '/images/speedtests/yuzhou-2026-08-11.png',
          caption: '2026-08-11 21:04:24 CST 珠海联通 9Gbps 32线程 VLESS 实测图（保留香港01 0.00B 与新加坡07 9.60KB 原始记录）',
          alt: '宇宙云 2026-08-11 VLESS 节点测速实测图'
        }
      ]
    },
    unlockMatrix: makeUnverifiedUnlock('待核实（2026-08-11 测速图未包含 AI/流媒体解锁检测）'),
    dataStatus: 'measured',
    dataStatusLabel: '含 2026-08-11 晚间测速原图，套餐明细待核实',
    discrepancies: ['主条目与文末汇总表描述存在早期/后期差异，当前仍缺少完整月付价格表与 AI/流媒体解锁实测。'],
    verifiedDate: '2026-08-11（测速图） / 2026-10-19（清单）',
    updatedDate: '2026-11-20',
    summary: '宇宙云具备历史 VLESS 与 60+ 节点记录，起步价曾记 ¥96/年，已补充 2026-08-11 21:04 珠海联通 9Gbps VLESS 50 节点测速原图，但当期完整月付价格表与解锁测试仍待核实。',
    pros: ['具备 2026-08-11 晚间 21:04 真实 50 节点 VLESS 测速截图归档', '历史资料提及 60+ 节点与三网优化'],
    limitations: ['缺少当前完整月付套餐价目表及客户端订阅细节', '2026-08-11 实测中出现香港01 (0.00B) 与新加坡07 (9.60KB) 个别失效节点'],
    suitableFor: ['参考 2026-08-11 晚间测速图并自行核实最新官网套餐的用户'],
    notSuitableFor: ['需要完整现行月付价目表及 AI 解锁实测才能决策的用户'],
    riskNotes: ['套餐明细缺口较大，购买前务必在官网核对最新流量与订阅模式。'],
    sources: ['32家机场品牌清单.txt', '机场测速实测资料包_2026-08-11_发布整理版_V2.zip'],
    reviewPath: '/reviews/yuzhou'
  },
  {
    slug: 'u1s1',
    rankOrder: 12,
    name: 'U1S1',
    englishName: 'U1S1',
    aliases: [],
    logo: '/logos/u1s1.png',
    accentColor: '#3B82F6',
    foundedYear: '2025 年起运营',
    lineType: 'IPLC 专线（官方宣称 2000Mbps 带宽，晚高峰不限速）',
    lineCategory: 'IPLC专线',
    protocols: ['待核实'],
    clientMode: 'unverified',
    clientModeLabel: '使用方式待核实',
    supportedClients: ['待核实'],
    deviceLimit: '不限设备同时连接',
    regionsSummary: '香港、台湾、新加坡、日本、美国',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'akaka',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 20,
    lowestAnnualEquivalentMonthly: 8,
    entryPriceDisplay: '年付 ¥96/年（折合 ¥8/月）；月付 ¥20/月起',
    tiers: [
      { name: 'u1s1·就是好用包', cycle: 'annual', cycleLabel: '年付', price: 96, monthlyEquivalent: 8, trafficLabel: '60GB/月', resetCycle: '每月重置' },
      { name: 'u1s1·普通人真够了包', cycle: 'monthly', cycleLabel: '月付', price: 20, trafficLabel: '120GB/月', resetCycle: '每月重置' },
      { name: 'u1s1·你以为用不到包', cycle: 'monthly', cycleLabel: '月付', price: 40, trafficLabel: '300GB/月', resetCycle: '每月重置' },
      { name: 'u1s1·瘾大就拉满包', cycle: 'monthly', cycleLabel: '月付', price: 100, trafficLabel: '700GB/月', resetCycle: '每月重置' },
      { name: 'u1s1·我全都要包', cycle: 'monthly', cycleLabel: '月付', price: 180, trafficLabel: '1500GB/月', resetCycle: '每月重置' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 24ms / 538Mbps，新加坡 46ms / 414Mbps，美国 134ms / 20Mbps。',
      rows: [
        { region: '香港', latencyMs: 24, downloadMbps: 538 },
        { region: '台湾', latencyMs: 39, downloadMbps: 107 },
        { region: '新加坡', latencyMs: 46, downloadMbps: 414 },
        { region: '日本', latencyMs: 57, downloadMbps: 133 },
        { region: '美国', latencyMs: 134, downloadMbps: 20 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/u1s1-2026-08-11.png',
          caption: '2026-08-11 22:33:29 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: 'U1S1 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '2025 年新品牌，含测速与 5 档套餐',
    discrepancies: ['说明文字提到“1000GB 的一次性大流量包”，但列表仅列出年付与 4 档月付套餐。'],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: 'U1S1 是 2025 年上线的新晋 IPLC 专线机场，不限设备同时连接，月付 ¥20/120GB 起并最高提供 1500GB 月付大包。',
    pros: ['不限设备连接，月付档位覆盖 120GB–1500GB', '香港与新加坡非晚高峰实测吞吐表现较高'],
    limitations: ['2025 年新品牌，长期运维与售后表现仍需观察', '优惠政策与协议细节公开较少'],
    suitableFor: ['愿意先月付尝鲜高带宽 IPLC 线路的用户'],
    notSuitableFor: ['初次体验即大额年付或要求三年以上老牌口碑的用户'],
    riskNotes: ['新上线机场建议从 ¥20 月付档起步测试，避免直接大额预付。'],
    sources: ['32家机场品牌清单.txt']
  },
  {
    slug: 'lingmao',
    rankOrder: 13,
    name: '灵猫网络',
    englishName: 'CivetNet / Lingmao',
    aliases: ['灵猫机场'],
    accentColor: '#8B5CF6',
    foundedYear: '2025 年起运营',
    lineType: '中转优化线路（1 倍流量不限速）',
    lineCategory: 'BGP中转',
    protocols: ['原文未标注'],
    clientMode: 'dedicated_only',
    clientModeLabel: '专属客户端，下载登录即用（不提供订阅链接）',
    supportedClients: ['灵猫网络专属客户端'],
    deviceLimit: '不限设备使用',
    regionsSummary: '香港、台湾、新加坡、日本、美国',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'lingmao / lmao888',
    promoDiscount: '正文标注 lingmao（8 折，年付小包不适用）；汇总表另有 lmao888',
    lowestMonthlyPrice: 25,
    lowestAnnualEquivalentMonthly: 7.08,
    entryPriceDisplay: '年付小包 ¥85/年（折合约 ¥7.08/月）；月付 Small ¥25/月起',
    tiers: [
      { name: '灵猫·年付小包', cycle: 'annual', cycleLabel: '年付', price: 85, monthlyEquivalent: 7.08, trafficLabel: '45GB/月', resetCycle: '每月重置' },
      { name: '灵猫·年付Small', cycle: 'annual', cycleLabel: '年付', price: 195, monthlyEquivalent: 16.25, trafficLabel: '150GB/月', resetCycle: '每月重置' },
      { name: '灵猫·年付Big', cycle: 'annual', cycleLabel: '年付', price: 295, monthlyEquivalent: 24.58, trafficLabel: '300GB/月', resetCycle: '每月重置' },
      { name: '灵猫·季付Big', cycle: 'quarterly', cycleLabel: '季付', price: 125, monthlyEquivalent: 41.67, trafficLabel: '300GB/月', resetCycle: '每月重置' },
      { name: '灵猫·月付Small', cycle: 'monthly', cycleLabel: '月付', price: 25, trafficLabel: '150GB/月', resetCycle: '每月重置' },
      { name: '灵猫·月付Big', cycle: 'monthly', cycleLabel: '月付', price: 45, trafficLabel: '300GB/月', resetCycle: '每月重置' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 22ms / 492Mbps，新加坡 46ms / 409Mbps，日本 57ms / 147Mbps。',
      rows: [
        { region: '香港', latencyMs: 22, downloadMbps: 492 },
        { region: '台湾', latencyMs: 40, downloadMbps: 109 },
        { region: '新加坡', latencyMs: 46, downloadMbps: 409 },
        { region: '日本', latencyMs: 57, downloadMbps: 147 },
        { region: '美国', latencyMs: 164, downloadMbps: 19 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/lingmao-2026-08-11.png',
          caption: '2026-08-11 18:45:40 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '灵猫网络 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'partial',
    dataStatusLabel: '优惠码与价格摘要存在多处口径差异',
    discrepancies: [
      '基础数据行写“19元/月 150GB/月”、优惠码 lmao888，而详情部分写月付 Small ¥25/150GB、优惠码 lingmao（8 折）；汇总表另注“19元150GB + 不限时套餐”。'
    ],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '灵猫网络是 2025 年上线的中转优化线路机场，主打 1 倍流量、不限设备与专属客户端一键连接，月付 Small ¥25/150GB，年付小包 ¥85/年。',
    pros: ['不限设备数量且 1 倍计费', '专属客户端无需折腾订阅配置'],
    limitations: ['2026 年 10 月起不提供第三方订阅链接', '基础数据行与套餐表在优惠码及 19/25 元档位存在口径差异'],
    suitableFor: ['多台个人终端共用、偏好登录即用 App 的用户'],
    notSuitableFor: ['需要在 Clash Verge Rev 或软路由导入通用订阅的用户'],
    riskNotes: ['建议先用月付测试晚高峰质量并确认优惠码实际可用性。'],
    sources: ['32家机场品牌清单.txt']
  },
  {
    slug: 'jilian',
    rankOrder: 14,
    name: '极连云',
    englishName: 'Jilian Cloud',
    aliases: [],
    logo: '/logos/jilian.png',
    accentColor: '#06B6D4',
    foundedYear: '2024 年起运营',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL专线',
    protocols: ['待核实'],
    clientMode: 'both',
    clientModeLabel: '自研客户端 + 支持第三方客户端',
    supportedClients: ['自研客户端', '第三方通用客户端'],
    deviceLimit: '待核实',
    regionsSummary: '待核实',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'ji8888',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 18,
    lowestAnnualEquivalentMonthly: null,
    entryPriceDisplay: '月付 ¥18/月（100GB/月）；完整多档套餐待核实',
    tiers: [
      {
        name: '基础月付档（摘要口径）',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 18,
        trafficLabel: '100GB/月',
        resetCycle: '每月重置',
        highlightNote: '其余周期或大流量档位原文未列出'
      }
    ],
    tiersIncompleteNote: '仅披露 18 元/月（100GB）单档资料。',
    speedReport: {
      testDate: '2026-08-11 22:46:50 CST（实测截图快照）',
      environment: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks，共 66 条记录）',
      isPeakHour: true,
      dataOrigin: 'measured',
      summaryNote: '2026-08-11 22:46 晚间截图显示：香港专线 02–20 多在 59–98MB/s（香港专线 01 为 0B），台湾 7.5–73MB/s，新加坡 11–83MB/s，日本 1.4–67MB/s，美国 5–73MB/s，另有马来/英/法/德/土/越节点。',
      rows: [
        { region: '香港专线（02–20，01为0B）', latencyMs: 31, downloadMbps: 700, note: '2026-08-11 22:46 截图约 59–98MB/s' },
        { region: '台湾（01–05）', latencyMs: 116, downloadMbps: 260, note: '2026-08-11 22:46 截图约 7.5–73.7MB/s' },
        { region: '新加坡（01–09）', latencyMs: 98, downloadMbps: 460, note: '2026-08-11 22:46 截图约 11.5–83.7MB/s' },
        { region: '日本（01–10）', latencyMs: 215, downloadMbps: 210, note: '2026-08-11 22:46 截图约 1.39–67.6MB/s' },
        { region: '美国（01–10）', latencyMs: 172, downloadMbps: 290, note: '2026-08-11 22:46 截图约 5.19–73.0MB/s' }
      ],
      screenshots: [
        {
          src: '/images/speedtests/jilian-2026-08-11.png',
          caption: '2026-08-11 22:46:50 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '极连云 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'vendor_claimed', detail: '品牌资料称“覆盖常见 AI 工具使用场景”（2026-08-11 测速图未含解锁检测）' },
      { service: 'Claude', status: 'vendor_claimed', detail: '品牌资料称覆盖常见 AI 工具场景（未独立实测）' },
      { service: 'Gemini', status: 'unverified', detail: '未单独实测' },
      { service: 'Netflix', status: 'unverified', detail: '未提供流媒体实测' },
      { service: 'Disney+', status: 'unverified', detail: '未提供流媒体实测' },
      { service: 'YouTube', status: 'unverified', detail: '未提供流媒体实测' },
      { service: 'HBO Max', status: 'unverified', detail: '未提供流媒体实测' },
      { service: 'TikTok', status: 'unverified', detail: '未提供流媒体实测' },
      { service: 'Spotify', status: 'unverified', detail: '未提供流媒体实测' }
    ],
    dataStatus: 'measured',
    dataStatusLabel: '含 2026-08-11 晚间测速原图，缺解锁实测',
    discrepancies: ['2026-08-11 实测图显示协议为 Shadowsocks、含 60+ 节点覆盖；品牌完整多档价目表仍待核实。'],
    verifiedDate: '2026-08-11（测速图） / 2026-10-19（清单）',
    updatedDate: '2026-11-20',
    summary: '极连云提供 IEPL 专线与 ¥18/月（100GB）方案，支持自研客户端与第三方订阅，已补充 2026-08-11 22:46 晚间 66 节点实测图；AI 与流媒体解锁仍待独立实测验证。',
    pros: ['18 元档即提供 IEPL 专线并兼顾自研与第三方客户端', '具备 2026-08-11 22:46 晚间真实 60+ 节点测速图归档'],
    limitations: ['缺少 AI/流媒体独立解锁测试与其余档位完整价格表', '2026-08-11 测速中香港专线 01 为 0B、日本节点 RTT 较高'],
    suitableFor: ['18 元预算区间、希望兼顾第三方客户端和 AI 工具访问的用户'],
    notSuitableFor: ['需要现成流媒体/AI 逐项解锁实测记录再下单的用户'],
    riskNotes: ['与同价位光年梯（¥18/110GB）规格接近，购买前建议月付测试本地可用性。'],
    sources: ['32家机场品牌清单.txt', '机场测速实测资料包_2026-08-11_发布整理版_V2.zip'],
    reviewPath: '/reviews/jilian'
  },
  {
    slug: 'guangnian',
    rankOrder: 15,
    name: '光年梯',
    englishName: 'Guangnian Ladder',
    aliases: ['GNT'],
    logo: '/logos/guangnian.png',
    accentColor: '#2563EB',
    foundedYear: '2025 年起运营',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL专线',
    protocols: ['VLESS'],
    clientMode: 'both',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    supportedClients: ['自研客户端', 'VLESS / Clash 兼容客户端'],
    deviceLimit: '待核实',
    regionsSummary: '待核实',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: 'gnt6666',
    promoDiscount: '待核实',
    lowestMonthlyPrice: 18,
    lowestAnnualEquivalentMonthly: null,
    entryPriceDisplay: '月付 ¥18/月（110GB/月）；完整多档套餐待核实',
    tiers: [
      {
        name: '基础月付档（摘要口径）',
        cycle: 'monthly',
        cycleLabel: '月付',
        price: 18,
        trafficLabel: '110GB/月',
        resetCycle: '每月重置',
        highlightNote: '其余档位原文未披露'
      }
    ],
    tiersIncompleteNote: '仅披露 18 元/月（110GB）档位。',
    speedReport: {
      testDate: '2026-08-11 14:38:04 CST（实测截图快照，非晚高峰）',
      environment: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks 63 节点）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '2026-08-11 14:38 截图显示香港约 43–95MB/s（RTT 25–30ms，香港05 151ms），新加坡约 87–95MB/s，日本约 15–90MB/s，美国约 1.1–38MB/s；马来西亚01 与德国01 为 0B。',
      rows: [
        { region: '香港（01–20）', latencyMs: 28, downloadMbps: 650, note: '2026-08-11 14:38 截图均速约 43–95MB/s' },
        { region: '台湾（01–05）', latencyMs: 129, downloadMbps: 440, note: '2026-08-11 14:38 截图均速约 11–75MB/s' },
        { region: '新加坡（01–10）', latencyMs: 67, downloadMbps: 730, note: '2026-08-11 14:38 截图均速约 87–95MB/s' },
        { region: '日本（01–10）', latencyMs: 80, downloadMbps: 620, note: '2026-08-11 14:38 截图均速约 15–90MB/s' },
        { region: '美国（01–10）', latencyMs: 161, downloadMbps: 120, note: '2026-08-11 14:38 截图约 1.16–38.2MB/s' }
      ],
      screenshots: [
        {
          src: '/images/speedtests/guangnian-2026-08-11.png',
          caption: '2026-08-11 14:38:04 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks 63 节点）',
          alt: '光年梯 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'vendor_claimed', detail: '品牌资料称支持常见 AI 工具场景（2026-08-11 测速图未含解锁检测）' },
      { service: 'Claude', status: 'vendor_claimed', detail: '品牌资料称支持常见 AI 工具场景' },
      { service: 'Gemini', status: 'unverified', detail: '未单独实测' },
      { service: 'Netflix', status: 'vendor_claimed', detail: '品牌资料称支持主流流媒体场景' },
      { service: 'Disney+', status: 'vendor_claimed', detail: '品牌资料称支持主流流媒体场景' },
      { service: 'YouTube', status: 'vendor_claimed', detail: '品牌资料称支持主流流媒体场景' },
      { service: 'HBO Max', status: 'unverified', detail: '未单独实测' },
      { service: 'TikTok', status: 'unverified', detail: '未单独实测' },
      { service: 'Spotify', status: 'unverified', detail: '未单独实测' }
    ],
    dataStatus: 'measured',
    dataStatusLabel: '2025 年新品牌，含 2026-08-11 测速原图',
    discrepancies: ['清单标明 VLESS 协议，而 2026-08-11 实测图展示节点为 Shadowsocks；完整多档价格表仍待补充。'],
    verifiedDate: '2026-08-11（测速图） / 2026-10-19（清单）',
    updatedDate: '2026-11-20',
    summary: '光年梯成立于 2025 年，提供 IEPL + VLESS 与 ¥18/月（110GB）方案，支持自研与第三方订阅导入，已补充 2026-08-11 14:38 63 节点测速原图；AI 与流媒体解锁尚缺独立实测。',
    pros: ['18 元档提供 110GB 流量且兼容自研与第三方订阅', '具备 2026-08-11 63 节点真实测速原图参考'],
    limitations: ['2025 年新品牌，缺少晚高峰连续性与独立解锁实测', '2026-08-11 实测中马来西亚 01 与德国 01 为 0B'],
    suitableFor: ['18 元月付预算、重视第三方订阅导入的用户'],
    notSuitableFor: ['要求长期运营口碑与独立解锁实测报告的用户'],
    riskNotes: ['作为 2025 年新品牌，建议短期月付观察晚高峰表现。'],
    sources: ['32家机场品牌清单.txt', '机场测速实测资料包_2026-08-11_发布整理版_V2.zip'],
    reviewPath: '/reviews/guangnian'
  },
  {
    slug: 'yifan',
    rankOrder: 16,
    name: '一翻云',
    englishName: '1Flyun',
    aliases: ['1fly'],
    logo: '/logos/yifan.webp',
    accentColor: '#0D9488',
    foundedYear: '2025 年起运营',
    lineType: '全节点 IEPL 物理专线 + 原生住宅 IP',
    lineCategory: 'IEPL专线',
    protocols: ['Hysteria 2', 'VLESS-Reality', 'Shadowsocks'],
    clientMode: 'third_party',
    clientModeLabel: '三协议通用订阅（支持 Hysteria 2 / VLESS-Reality / Shadowsocks 客户端）',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'Hiddify', 'v2rayN'],
    deviceLimit: '不限速、不限设备数量',
    regionsSummary: '香港、日本、美国、新加坡、台湾五地',
    nodeCountLabel: '待核实',
    paymentMethods: ['待核实'],
    promoCode: '1FLYYUN / yfy6666',
    promoDiscount: '介绍文本称 1FLYYUN 打 9 折；汇总表另注 yfy6666',
    lowestMonthlyPrice: 20,
    lowestAnnualEquivalentMonthly: 8.17,
    entryPriceDisplay: '年付小包 ¥98/年（折合约 ¥8.17/月）；轻享月付 ¥20/月起',
    tiers: [
      { name: '98¥·年付小包', cycle: 'annual', cycleLabel: '年付', price: 98, monthlyEquivalent: 8.17, trafficLabel: '60GB/月', resetCycle: '每月重置' },
      { name: '轻享版', cycle: 'monthly', cycleLabel: '月付', price: 20, trafficLabel: '150GB/月', resetCycle: '每月重置' },
      { name: '舒享版', cycle: 'monthly', cycleLabel: '月付', price: 35, trafficLabel: '350GB/月', resetCycle: '每月重置' },
      { name: '尊享版', cycle: 'monthly', cycleLabel: '月付', price: 55, trafficLabel: '600GB/月', resetCycle: '每月重置' },
      { name: '极致版', cycle: 'monthly', cycleLabel: '月付', price: 95, trafficLabel: '1.2TB/月', resetCycle: '每月重置' },
      { name: '轻享版·不限时包', cycle: 'one_time', cycleLabel: '一次性付费', price: 100, trafficLabel: '100GB', resetCycle: '一次性' },
      { name: '舒享版·不限时包', cycle: 'one_time', cycleLabel: '一次性付费', price: 200, trafficLabel: '250GB', resetCycle: '一次性' },
      { name: '尊享版·不限时包', cycle: 'one_time', cycleLabel: '一次性付费', price: 400, trafficLabel: '500GB', resetCycle: '一次性' }
    ],
    speedReport: {
      testDate: '2026-10-19（原文标注，非晚高峰）',
      environment: '清单标注基准测试（非晚高峰）',
      isPeakHour: false,
      dataOrigin: 'measured',
      summaryNote: '香港 23ms / 477Mbps，新加坡 42ms / 390Mbps，台湾 40ms / 117Mbps。',
      rows: [
        { region: '香港', latencyMs: 23, downloadMbps: 477 },
        { region: '台湾', latencyMs: 40, downloadMbps: 117 },
        { region: '新加坡', latencyMs: 42, downloadMbps: 390 },
        { region: '日本', latencyMs: 53, downloadMbps: 136 },
        { region: '美国', latencyMs: 180, downloadMbps: 20 }
      ],
      screenshots: [
        {
          src: '/images/speedtests/yifan-2026-08-11.png',
          caption: '2026-08-11 00:21:30 CST MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 32线程，Shadowsocks）',
          alt: '一翻云 2026-08-11 节点测速实测图'
        }
      ]
    },
    unlockMatrix: [
      { service: 'ChatGPT', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Claude', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Gemini', status: 'node_dependent', detail: '视节点而定' },
      { service: 'Netflix', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Disney+', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'YouTube', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'HBO Max', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'TikTok', status: 'measured_supported', detail: '清单标注支持' },
      { service: 'Spotify', status: 'measured_supported', detail: '清单标注支持' }
    ],
    dataStatus: 'measured',
    dataStatusLabel: '三协议支持 + 含测速与不限时套餐',
    discrepancies: ['优惠码同时出现 yfy6666（基础数据与汇总表）与 1FLYYUN（介绍正文称可打 9 折），需结算时核实。'],
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-20',
    summary: '一翻云成立于 2025 年，提供 IEPL 物理专线搭配原生住宅 IP，同时兼容 Hysteria 2、VLESS-Reality 与 Shadowsocks 三协议，不限设备数并提供多档不限时包。',
    pros: ['同时提供 Hysteria 2 / VLESS-Reality / Shadowsocks 三协议，客户端兼容面极广', '轻享月付 ¥20 给到 150GB 且带台湾节点', '提供三档永久不过期不限时包'],
    limitations: ['2025 年新品牌，且官方未提供免费试用', '两个优惠码（yfy6666 / 1FLYYUN）并存需实测'],
    suitableFor: ['需要 Hysteria 2 / VLESS-Reality 现代协议的 Clash Verge Rev 或 Mihomo 进阶用户', '需要永久不限时大流量备用包的用户'],
    notSuitableFor: ['必须先免费试用再付费的新手'],
    riskNotes: ['官方“晚高峰 0 丢包、单节点 2Gbps”属于品牌宣传口径，仍建议先购轻享月付实测当地晚高峰。'],
    sources: ['32家机场品牌清单.txt'],
    reviewPath: '/reviews/yifan'
  }
]
