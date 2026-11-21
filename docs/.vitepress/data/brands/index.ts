import { BRANDS_PRIMARY } from './brands-primary'
import { BRANDS_SECONDARY } from './brands-secondary'
import { BRAND_LINKS } from '../links'
import type { BrandEntity } from './types'

export type { BrandEntity, BrandPricingTier, BrandSpeedReport, BrandUnlockEntry, DataStatus, ClientAccessMode } from './types'

export const ALL_BRANDS: BrandEntity[] = [...BRANDS_PRIMARY, ...BRANDS_SECONDARY]

export const BRAND_COUNT_AUDIT = {
  sourceListEntries: 32,
  uniqueEntities: ALL_BRANDS.length,
  mergedDuplicates: [
    {
      mergedInto: 'firefly',
      name: 'Firefly 萤火虫',
      note: '《32家机场品牌清单.txt》第8项 Firefly 与文末第32项 Firefly 萤火虫为同一实体（同域名 vip02.fireflyaff.com、同优惠码 firefly、同套餐体系），已去重合并。'
    }
  ]
} as const

export function getBrandBySlug(slug: string): BrandEntity | undefined {
  return ALL_BRANDS.find((b) => b.slug === slug)
}

export function getBrandRegisterUrl(slug: string): string | undefined {
  return BRAND_LINKS[slug]?.registerUrl
}

export function getBrandLinkNote(slug: string): string | undefined {
  return BRAND_LINKS[slug]?.linkStatusNote
}
