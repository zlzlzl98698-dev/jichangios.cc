import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

import AffiliateDisclosure from './components/AffiliateDisclosure.vue'
import RegistrationButton from './components/RegistrationButton.vue'
import BrandCard from './components/BrandCard.vue'
import BrandPricingTable from './components/BrandPricingTable.vue'
import BrandComparison from './components/BrandComparison.vue'
import BrandCTA from './components/BrandCTA.vue'
import RelatedBrand from './components/RelatedBrand.vue'
import BrandRecommendation from './components/BrandRecommendation.vue'
import BrandDatabaseExplorer from './components/BrandDatabaseExplorer.vue'
import TutorialSteps from './components/TutorialSteps.vue'
import TroubleshootingGuide from './components/TroubleshootingGuide.vue'
import RelatedArticles from './components/RelatedArticles.vue'
import FAQSection from './components/FAQSection.vue'
import VersionInfo from './components/VersionInfo.vue'
import SoftwareDownload from './components/SoftwareDownload.vue'
import NetworkPerformanceReport from './components/NetworkPerformanceReport.vue'
import StreamingAvailabilityMatrix from './components/StreamingAvailabilityMatrix.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import BrandInfrastructureSnapshot from './components/BrandInfrastructureSnapshot.vue'
import TutorialPage from './components/TutorialPage.vue'
import ReviewPage from './components/ReviewPage.vue'
import ComparisonPage from './components/ComparisonPage.vue'
import CommercialPage from './components/CommercialPage.vue'
import TopicPage from './components/TopicPage.vue'
import ClusterDirectory from './components/ClusterDirectory.vue'
import HomeKnowledgeBase from './components/HomeKnowledgeBase.vue'
import ProxyArchitectureDiagram from './components/ProxyArchitectureDiagram.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AffiliateDisclosure', AffiliateDisclosure)
    app.component('RegistrationButton', RegistrationButton)
    app.component('BrandCard', BrandCard)
    app.component('BrandPricingTable', BrandPricingTable)
    app.component('BrandComparison', BrandComparison)
    app.component('BrandCTA', BrandCTA)
    app.component('RelatedBrand', RelatedBrand)
    app.component('BrandRecommendation', BrandRecommendation)
    app.component('BrandDatabaseExplorer', BrandDatabaseExplorer)
    app.component('TutorialSteps', TutorialSteps)
    app.component('TroubleshootingGuide', TroubleshootingGuide)
    app.component('RelatedArticles', RelatedArticles)
    app.component('FAQSection', FAQSection)
    app.component('VersionInfo', VersionInfo)
    app.component('SoftwareDownload', SoftwareDownload)
    app.component('NetworkPerformanceReport', NetworkPerformanceReport)
    app.component('StreamingAvailabilityMatrix', StreamingAvailabilityMatrix)
    app.component('NetworkTopology', NetworkTopology)
    app.component('BrandInfrastructureSnapshot', BrandInfrastructureSnapshot)
    app.component('TutorialPage', TutorialPage)
    app.component('ReviewPage', ReviewPage)
    app.component('ComparisonPage', ComparisonPage)
    app.component('CommercialPage', CommercialPage)
    app.component('TopicPage', TopicPage)
    app.component('ClusterDirectory', ClusterDirectory)
    app.component('HomeKnowledgeBase', HomeKnowledgeBase)
    app.component('ProxyArchitectureDiagram', ProxyArchitectureDiagram)
  }
} satisfies Theme
