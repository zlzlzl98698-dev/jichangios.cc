export type PageType = 'tutorial' | 'review' | 'comparison' | 'commercial' | 'topic'
export type SearchIntent = 'informational' | 'investigational' | 'transactional' | 'navigational'

export const SITE_CONFIG = {
  siteName: '机场苹果',
  siteShortName: '机场苹果 · jichangios.cc',
  siteDescription:
    '机场苹果 (jichangios.cc) 是面向简体中文用户的网络代理知识库、Clash Verge Rev 客户端教程中心、独立机场评测与品牌套餐数据库。',
  hostname: 'https://jichangios.cc',
  lang: 'zh-CN',
  locale: 'zh_CN',
  author: '机场苹果编辑部',
  lastAuditDate: '2026-11-20',
  affiliateDisclosureText:
    '含推广链接：通过页面中标注的注册链接开通服务可能为本站带来佣金，不影响您的实际支付价格。评测结论与商业合作入口彼此独立标注。',
  pageTypeLabels: {
    tutorial: '教程指南',
    review: '独立评测',
    comparison: '横向对比',
    commercial: '品牌与套餐',
    topic: '专题中心'
  } satisfies Record<PageType, string>,
  searchIntentLabels: {
    informational: '信息学习',
    investigational: '调研比较',
    transactional: '品牌与套餐',
    navigational: '栏目导航'
  } satisfies Record<SearchIntent, string>
} as const

export function getSearchVerificationMetas(): [string, { name: string; content: string }][] {
  const candidates: [string, string | undefined][] = [
    ['google-site-verification', process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()],
    ['msvalidate.01', process.env.VITE_BING_SITE_VERIFICATION?.trim()],
    ['shenma-site-verification', process.env.VITE_SHENMA_SITE_VERIFICATION?.trim()],
    ['baidu-site-verification', process.env.VITE_BAIDU_SITE_VERIFICATION?.trim()]
  ]
  return candidates
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([name, content]) => ['meta', { name, content }])
}

export function getAlgoliaConfig() {
  const appId = process.env.VITE_ALGOLIA_APP_ID?.trim()
  const apiKey = process.env.VITE_ALGOLIA_API_KEY?.trim()
  const indexName = process.env.VITE_ALGOLIA_INDEX_NAME?.trim()

  if (appId && apiKey && indexName) {
    return {
      enabled: true as const,
      options: {
        appId,
        apiKey,
        indexName,
        placeholder: '搜索教程、Clash 配置、品牌评测或故障代码...',
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '全站搜索'
          },
          modal: {
            searchBox: {
              resetButtonTitle: '清空关键词',
              resetButtonAriaLabel: '清空关键词',
              cancelButtonText: '取消',
              cancelButtonAriaLabel: '取消'
            },
            startScreen: {
              recentSearchesTitle: '最近搜索',
              noRecentSearchesText: '暂无搜索记录',
              saveRecentSearchButtonTitle: '保存到最近搜索',
              removeRecentSearchButtonTitle: '移除该记录',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '取消收藏'
            },
            errorScreen: {
              titleText: '无法连接搜索服务',
              helpText: '请检查网络连接或稍后重试。'
            },
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              searchByText: '搜索提供方'
            },
            noResultsScreen: {
              noResultsText: '未找到相关内容：',
              suggestedQueryText: '建议尝试：',
              reportMissingResultsText: '认为应当包含此内容？',
              reportMissingResultsLinkText: '反馈缺失内容'
            }
          }
        }
      }
    }
  }

  return {
    enabled: false as const,
    reason: '未配置 Algolia DocSearch 环境变量 (VITE_ALGOLIA_APP_ID / VITE_ALGOLIA_API_KEY / VITE_ALGOLIA_INDEX_NAME)，已自动启用 VitePress Local Search 备用全文搜索。'
  }
}
