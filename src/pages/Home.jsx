import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import NewArrivals from '../components/home/NewArrivals'
import EditorialBanner from '../components/home/EditorialBanner'
import GenderPanels from '../components/home/GenderPanels'
import BestSellers from '../components/home/BestSellers'
import PromoBanner from '../components/home/PromoBanner'
import BrandBenefits from '../components/home/BrandBenefits'
import Newsletter from '../components/home/Newsletter'
import InstagramGallery from '../components/home/InstagramGallery'
import usePageMeta from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta('', 'VELORA — premium men’s and women’s fashion. Discover timeless essentials and contemporary pieces. Define your everyday.')
  return (
    <>
      <HeroSection />
      <CategorySection />
      <NewArrivals />
      <EditorialBanner />
      <GenderPanels />
      <BestSellers />
      <PromoBanner />
      <BrandBenefits />
      <Newsletter />
      <InstagramGallery />
    </>
  )
}
