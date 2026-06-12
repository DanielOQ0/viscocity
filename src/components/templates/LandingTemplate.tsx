'use client'

import { DataProvider } from '@/lib/directus/context'
import { Navbar } from '@/components/organisms/Navbar'
import { Hero } from '@/components/organisms/Hero'
import { BrandStory } from '@/components/organisms/BrandStory'
import { ProductMenu } from '@/components/organisms/ProductMenu'
import { Gallery } from '@/components/organisms/Gallery'
import { CTASection } from '@/components/organisms/CTASection'
import { Footer } from '@/components/organisms/Footer'
import { EventAnnouncement } from '@/components/organisms/EventAnnouncement'
import { ScrollRefresher } from '@/components/shared/ScrollRefresher'

export function LandingTemplate() {
  return (
    <DataProvider>
      <ScrollRefresher />
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <ProductMenu />
        <Gallery />
        <CTASection />
      </main>
      <Footer />
      <EventAnnouncement />
    </DataProvider>
  )
}
