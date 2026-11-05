import { useEffect } from 'react'
import HeroSection from '../components/home/HeroSection'
import FeaturedColleges from '../components/home/FeaturedColleges'
import ExploreByCourse from '../components/home/ExploreByCourse'
import StudentsCarousel from '../components/home/StudentsCarousel'
import HowItWorks from '../components/home/HowItWorks'
import HomeCta from '../components/home/HomeCta'

export default function Home() {
  useEffect(() => {
    document.title = 'Bite Connect — Discover Colleges, Explore Courses, Connect with Students'
  }, [])

  return (
    <>
      <HeroSection />
      <FeaturedColleges />
      <ExploreByCourse />
      <StudentsCarousel />
      <HowItWorks />
      <HomeCta />
    </>
  )
}
