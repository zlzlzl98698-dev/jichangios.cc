export type DataStatus = 'measured' | 'vendor' | 'partial' | 'historical'
export type ClientAccessMode = 'both' | 'dedicated_only' | 'third_party' | 'unverified'
export type BillingCycle =
  | 'monthly'
  | 'quarterly'
  | 'semi_annual'
  | 'annual'
  | 'two_year'
  | 'three_year'
  | 'one_time'

export type UnlockStatus =
  | 'measured_supported'
  | 'vendor_claimed'
  | 'node_dependent'
  | 'measured_failed'
  | 'unverified'

export interface BrandPricingTier {
  name: string
  cycle: BillingCycle
  cycleLabel: string
  price: number
  monthlyEquivalent?: number
  trafficLabel: string
  resetCycle: string
  highlightNote?: string
}

export interface SpeedTestRow {
  region: string
  latencyMs: number | null
  downloadMbps: number | null
  uploadMbps?: number | null
  packetLoss?: string
  note?: string
}

export interface BrandSpeedReport {
  testDate: string
  environment: string
  isPeakHour: boolean
  dataOrigin: 'measured' | 'vendor' | 'unverified'
  summaryNote: string
  rows: SpeedTestRow[]
  screenshots?: {
    src: string
    caption: string
    alt: string
  }[]
}

export interface BrandUnlockEntry {
  service: 'ChatGPT' | 'Claude' | 'Gemini' | 'Netflix' | 'Disney+' | 'YouTube' | 'HBO Max' | 'TikTok' | 'Spotify'
  status: UnlockStatus
  detail: string
}

export interface BrandEntity {
  slug: string
  rankOrder: number
  isFeaturedPartner?: boolean
  name: string
  englishName?: string
  aliases: string[]
  logo?: string
  accentColor: string
  foundedYear: string
  lineType: string
  lineCategory: 'IEPL专线' | 'IPLC专线' | 'BGP中转' | '混合线路' | '待核实'
  protocols: string[]
  clientMode: ClientAccessMode
  clientModeLabel: string
  supportedClients: string[]
  deviceLimit: string
  regionsSummary: string
  nodeCountLabel: string
  paymentMethods: string[]
  promoCode?: string
  promoDiscount?: string
  promoNote?: string
  /** 最低实际月付价格（如无月付或未披露则为 null） */
  lowestMonthlyPrice: number | null
  /** 年付或促销折算月均成本（严禁冒充真实月付价） */
  lowestAnnualEquivalentMonthly: number | null
  entryPriceDisplay: string
  tiers: BrandPricingTier[]
  tiersIncompleteNote?: string
  speedReport: BrandSpeedReport
  unlockMatrix: BrandUnlockEntry[]
  dataStatus: DataStatus
  dataStatusLabel: string
  discrepancies: string[]
  verifiedDate: string
  updatedDate: string
  summary: string
  pros: string[]
  limitations: string[]
  suitableFor: string[]
  notSuitableFor: string[]
  riskNotes: string[]
  sources: string[]
  reviewPath?: string
}
