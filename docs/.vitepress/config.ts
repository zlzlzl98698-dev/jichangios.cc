import { defineConfig, type HeadConfig } from 'vitepress'
import { SITE_CONFIG, getAlgoliaConfig, getSearchVerificationMetas } from './data/site'
import { buildNav, buildSidebar, getBreadcrumbs } from './data/navigation'
import { ALL_BRANDS } from './data/brands'

const algolia = getAlgoliaConfig()

function normalizeCanonicalPath(relativePath: string): string {
  if (relativePath === 'index.md') return '/'
  if (relativePath.endsWith('/index.md')) {
    return '/' + relativePath.slice(0, -'index.md'.length)
  }
  return '/' + relativePath.replace(/\.md$/, '')
}

export default defineConfig({
  lang: SITE_CONFIG.lang,
  title: SITE_CONFIG.siteName,
  description: SITE_CONFIG.siteDescription,
  cleanUrls: true,
  ignoreDeadLinks: false,

  sitemap: {
    hostname: SITE_CONFIG.hostname,
    transformItems(items) {
      return items.filter((item) => {
        const u = item.url.replace(/^\//, '')
        return u !== '404' && u !== '404.html' && !u.startsWith('drafts/')
      })
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png?v=2' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico?v=2' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png?v=2' }],
    ['meta', { name: 'theme-color', content: '#2563EB' }],
    ['meta', { name: 'applicable-device', content: 'pc,mobile' }],
    ['meta', { 'http-equiv': 'Cache-Control', content: 'no-transform' }],
    ['meta', { 'http-equiv': 'Cache-Control', content: 'no-siteapp' }],
    ['meta', { property: 'og:site_name', content: SITE_CONFIG.siteName }],
    ['meta', { property: 'og:locale', content: SITE_CONFIG.locale }],
    ...getSearchVerificationMetas()
  ],

  transformHead(context) {
    const { pageData } = context
    const fm = pageData.frontmatter || {}
    if (fm.draft === true || pageData.relativePath === '404.md') {
      return [['meta', { name: 'robots', content: 'noindex, nofollow' }]]
    }

    const routePath = normalizeCanonicalPath(pageData.relativePath)
    const canonicalUrl = `${SITE_CONFIG.hostname}${routePath}`
    const pageTitle = fm.seoTitle || pageData.title || SITE_CONFIG.siteName
    const articleHeadline = fm.headline || fm.seoTitle || pageData.title || SITE_CONFIG.siteName
    const pageDesc = fm.description || pageData.description || SITE_CONFIG.siteDescription
    const ogImageUrl = fm.ogImage
      ? String(fm.ogImage).startsWith('http')
        ? String(fm.ogImage)
        : `${SITE_CONFIG.hostname}${fm.ogImage}`
      : `${SITE_CONFIG.hostname}/images/og-cover.png`
    const pageType = fm.pageType || 'topic'
    const published = fm.date ? String(fm.date).slice(0, 10) : SITE_CONFIG.lastAuditDate
    const updated = fm.updatedDate ? String(fm.updatedDate).slice(0, 10) : published

    const heads: HeadConfig[] = [
      ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:type', content: routePath === '/' ? 'website' : 'article' }],
      ['meta', { property: 'og:image', content: ogImageUrl }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: ogImageUrl }]
    ]

    if (routePath !== '/') {
      heads.push(['meta', { property: 'article:published_time', content: `${published}T00:00:00+08:00` }])
      heads.push(['meta', { property: 'article:modified_time', content: `${updated}T00:00:00+08:00` }])
      if (fm.category) {
        heads.push(['meta', { property: 'article:section', content: String(fm.category) }])
      }
    }

    const schemas: Record<string, unknown>[] = []

    if (routePath === '/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.siteName,
        url: SITE_CONFIG.hostname,
        logo: `${SITE_CONFIG.hostname}/images/site-avatar.webp`
      })
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.siteName,
        url: SITE_CONFIG.hostname,
        inLanguage: 'zh-CN',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.hostname}/brands/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    } else {
      const crumbs = getBreadcrumbs(routePath, pageTitle)
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: c.label,
          item: c.link ? `${SITE_CONFIG.hostname}${c.link}` : canonicalUrl
        }))
      })

      if (routePath === '/brands/') {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: '机场品牌数据库（31家独立品牌）',
          numberOfItems: ALL_BRANDS.length,
          itemListElement: ALL_BRANDS.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            url: `${SITE_CONFIG.hostname}/brands/${b.slug}`
          }))
        })
      } else if (fm.softwareApp && typeof fm.softwareApp === 'object') {
        const sw = fm.softwareApp as { name?: string; os?: string; category?: string }
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: sw.name || pageTitle,
          operatingSystem: sw.os || 'Windows, macOS, Linux',
          applicationCategory: sw.category || 'NetworkingApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'CNY'
          }
        })
      }

      const isCollectionHub = routePath.endsWith('/') && routePath !== '/offers/'
      const mainSchemaType = isCollectionHub
        ? 'CollectionPage'
        : pageType === 'commercial' || routePath === '/offers/'
          ? 'WebPage'
          : pageType === 'tutorial'
            ? 'TechArticle'
            : 'Article'

      schemas.push({
        '@context': 'https://schema.org',
        '@type': mainSchemaType,
        name: articleHeadline,
        headline: articleHeadline,
        description: pageDesc,
        image: ogImageUrl,
        datePublished: published,
        dateModified: updated,
        inLanguage: 'zh-CN',
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: fm.author || SITE_CONFIG.author,
          url: `${SITE_CONFIG.hostname}/about`
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.hostname,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_CONFIG.hostname}/images/site-avatar.webp`
          }
        }
      })
    }

    if (Array.isArray(fm.faq) && fm.faq.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: fm.faq.map((item: { q: string; a: string }) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        }))
      })
    }

    for (const s of schemas) {
      heads.push(['script', { type: 'application/ld+json' }, JSON.stringify(s)])
    }

    return heads
  },

  themeConfig: {
    siteTitle: '机场苹果',
    logo: { src: '/images/site-avatar.webp', alt: '机场苹果知识库头像' },
    nav: buildNav(),
    sidebar: buildSidebar(),
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    sidebarMenuLabel: '知识目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观切换',
    lightModeSwitchTitle: '切换浅色主题',
    darkModeSwitchTitle: '切换深色主题',
    notFound: {
      title: '页面未找到',
      quote: '您访问的路径不存在或已调整，请通过下方导航或全站搜索查找对应教程与品牌资料。',
      linkLabel: '返回知识库首页',
      linkText: '返回首页'
    },
    search: algolia.enabled
      ? {
          provider: 'algolia',
          options: algolia.options
        }
      : {
          provider: 'local',
          options: {
            locales: {
              root: {
                translations: {
                  button: {
                    buttonText: '搜索知识库',
                    buttonAriaLabel: '搜索全站教程与品牌'
                  },
                  modal: {
                    displayDetails: '显示章节详情',
                    resetButtonTitle: '重置搜索',
                    backButtonTitle: '关闭搜索',
                    noResultsText: '未找到相关内容：',
                    footer: {
                      selectText: '选择',
                      selectKeyAriaLabel: '回车键',
                      navigateText: '切换',
                      navigateUpKeyAriaLabel: '向上',
                      navigateDownKeyAriaLabel: '向下',
                      closeText: '关闭',
                      closeKeyAriaLabel: 'ESC'
                    }
                  }
                }
              }
            },
            _render(src, env, md) {
              const html = md.render(src, env)
              if (env.frontmatter?.draft || env.frontmatter?.search === false) return ''
              return html
            }
          }
        },
    footer: {
      message:
        '机场苹果 (jichangios.cc) · <a href="/about">关于编辑部</a> · <a href="/methodology">评测方法与测试标准</a> · <a href="/privacy-and-disclaimer">隐私与免责声明</a> · 教程区与商业推广信息严格分区标注',
      copyright: '© 2026 机场苹果 · 静态知识库由 VitePress 构建并适配 Cloudflare Pages'
    }
  }
})
