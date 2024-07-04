import HeroSection from '@/components/HeroSection'
import NewReleasesSection from '@/components/NewReleasesSection'
import UserReviewsSection from '@/components/UserReviewsSection'
import AnimeScheduleSection from '@/components/AnimeScheduleSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4">
        <NewReleasesSection />
        <UserReviewsSection />
        <AnimeScheduleSection />
      </div>
    </div>
  )
}