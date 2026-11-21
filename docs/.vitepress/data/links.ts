export interface BrandLinkEntry {
  slug: string
  name: string
  registerUrl: string
  alternateHistoricalUrl?: string
  linkStatusNote?: string
}

/**
 * 全站唯一品牌推广链接中心
 * 所有商业注册链接必须由此文件统一导出，禁止在 Markdown 中硬编码。
 * 渲染时必须附加 target="_blank" rel="nofollow sponsored noopener"。
 */
export const BRAND_LINKS: Record<string, BrandLinkEntry> = {
  guangsuyun: {
    slug: 'guangsuyun',
    name: '光速云',
    registerUrl: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y'
  },
  muguang: {
    slug: 'muguang',
    name: '暮光加速',
    registerUrl: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3'
  },
  feimao: {
    slug: 'feimao',
    name: '飞猫云',
    registerUrl: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y'
  },
  weifeng: {
    slug: 'weifeng',
    name: '微风网络',
    registerUrl: 'https://edp01.breezenetaff.com/#/?code=t3huofyI'
  },
  dalaoyun: {
    slug: 'dalaoyun',
    name: '大佬云',
    registerUrl: 'https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN'
  },
  xingdaomeng: {
    slug: 'xingdaomeng',
    name: '星岛梦',
    registerUrl: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR'
  },
  ermao: {
    slug: 'ermao',
    name: '二猫云',
    registerUrl: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW'
  },
  wuyou: {
    slug: 'wuyou',
    name: '无忧链接',
    registerUrl: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL'
  },
  weitu: {
    slug: 'weitu',
    name: '唯兔云',
    registerUrl: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA'
  },
  firefly: {
    slug: 'firefly',
    name: 'Firefly 萤火虫',
    registerUrl: 'https://vip02.fireflyaff.com/#/?code=2n7VURre',
    alternateHistoricalUrl: 'https://vip02.fireflyaff.com/#/?code=jTp9wSgZ',
    linkStatusNote: '清单第8项与文末历史条目均指向同一注册主域，仅推荐码不同；当前默认采用主表推荐码。'
  },
  yuzhou: {
    slug: 'yuzhou',
    name: '宇宙云',
    registerUrl: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1'
  },
  u1s1: {
    slug: 'u1s1',
    name: 'U1S1',
    registerUrl: 'https://guangs.vipaff.cc/#/?code=xhX5X22f'
  },
  lingmao: {
    slug: 'lingmao',
    name: '灵猫网络',
    registerUrl: 'https://vip01.civetnet.com/#/?code=8MIAyxak'
  },
  jilian: {
    slug: 'jilian',
    name: '极连云',
    registerUrl: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu'
  },
  guangnian: {
    slug: 'guangnian',
    name: '光年梯',
    registerUrl: 'https://guangs.gntaff.com/#/?code=X1FoxjGE'
  },
  yifan: {
    slug: 'yifan',
    name: '一翻云',
    registerUrl: 'https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r'
  },
  sogo: {
    slug: 'sogo',
    name: 'SOGO 云',
    registerUrl: 'https://guangs.sogoyunaff.cc/#/?code=327Vs0w7'
  },
  kexin: {
    slug: 'kexin',
    name: '可信云',
    registerUrl: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY'
  },
  sujie: {
    slug: 'sujie',
    name: '速界',
    registerUrl: 'https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB'
  },
  shanyue: {
    slug: 'shanyue',
    name: '闪跃',
    registerUrl: 'https://vip02.flashleapaff.com/#/?code=3lgzm9mm'
  },
  quanqiu: {
    slug: 'quanqiu',
    name: '全球云',
    registerUrl: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C'
  },
  shandianshu: {
    slug: 'shandianshu',
    name: '闪电鼠',
    registerUrl: 'https://qwerty.shandianshuaff.com/#/?code=rUE75iYh'
  },
  yunjiexian: {
    slug: 'yunjiexian',
    name: '云界线',
    registerUrl: 'https://qwerty.yunjiexianaff.com/?code=aycnwNUi',
    alternateHistoricalUrl: 'https://qwerty.yunjiexianaff.com/?code=HBaZ91c6',
    linkStatusNote: '该链接缺少 # 哈希路由符号，且清单正文与汇总表推荐码不同（aycnwNUi / HBaZ91c6），注册前请确认页面正常加载。'
  },
  liulianyun: {
    slug: 'liulianyun',
    name: '榴莲云',
    registerUrl: 'https://qwerty.liulianyunaff.com#/?code=hS5pvbfE',
    linkStatusNote: '域名后直接拼接 #/?code=...（无斜杠），属于已知格式差异。'
  },
  shenxing: {
    slug: 'shenxing',
    name: '神行加速',
    registerUrl: 'https://qwerty.shenxingaff.com/#/?code=gawDQqVE'
  },
  huanqiuti: {
    slug: 'huanqiuti',
    name: '环球梯',
    registerUrl: 'https://qwerty.huanqiutiaff.com/?code=9I4KRNPH',
    linkStatusNote: '该链接缺少 # 哈希路由符号，访问前请确认页面可正常跳转。'
  },
  yinxingren: {
    slug: 'yinxingren',
    name: '隐形人',
    registerUrl: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT'
  },
  tiziyun: {
    slug: 'tiziyun',
    name: '梯子云',
    registerUrl: 'https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0'
  },
  lingdongyun: {
    slug: 'lingdongyun',
    name: '灵动云',
    registerUrl: 'https://varnexa.lingdongaff.com/#/?code=wZvEhEoI',
    linkStatusNote: '来自 2026-08-09 历史品牌库记录，不保证当前仍有效。'
  },
  langwang: {
    slug: 'langwang',
    name: '浪网',
    registerUrl: 'https://varnexa.wavenetaff.com/#/?code=xwAM4tTd',
    linkStatusNote: '来自 2026-08-09 历史品牌库记录，不保证当前仍有效。'
  },
  edgenova: {
    slug: 'edgenova',
    name: '边缘节点 EdgeNova',
    registerUrl: 'https://work.edgenovaaff.cc/#/register?code=cl3iB5YG',
    linkStatusNote: '来自 2026-08-09 历史品牌库记录，不保证当前仍有效。'
  }
}

export function getBrandLink(slug: string): BrandLinkEntry | undefined {
  return BRAND_LINKS[slug]
}
