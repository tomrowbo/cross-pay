export const metadata = {
  title: 'About us - Open PRO',
  description: 'Page description',
}

import HeroAbout from '@/components/hero-about'
import TeamImages from '@/components/team-images'
import Timeline from '@/components/timeline'
import Team from '@/components/team'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Career from '@/components/career'
import Clients from '@/components/clients'
import Newsletter from '@/components/newsletter'

export default function About() {
  return (
    <>
      <HeroAbout />
      <TeamImages />
      <Timeline />
      <Team />
      <TestimonialsCarousel />
      <Career />
      <Clients />
      <Newsletter />
    </>
  )
}