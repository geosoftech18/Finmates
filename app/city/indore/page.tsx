import HeroSection from '@/components/city/indore/HeroSection';
import LocalMarketSection from '@/components/city/indore/LocalMarketSection';
import ServicesGrid from '@/components/city/indore/ServicesGrid';
import ProcessTimeline from '@/components/city/indore/ProcessTimeline';
import TrustSection from '@/components/city/indore/TrustSection';
import LocationSection from '@/components/city/indore/LocationSection';
import FAQSection from '@/components/city/indore/FAQSection';
import AboutSection from '@/components/city/indore/AboutSection';
import CostCapabilityMatrix from '@/components/city/indore/CostCapabilityMatrix';
import Section203Guide from '@/components/city/indore/Section203Guide';
import CoreServices from '@/components/city/indore/CoreServices';
import SectorEdge from '@/components/city/indore/SectorEdge';
import DigitalInfrastructure from '@/components/city/indore/DigitalInfrastructure';
import PricingTiers from '@/components/city/indore/PricingTiers';
import Industries from '@/components/city/indore/Industries';
import LongFormContent from '@/components/city/indore/LongFormContent';
import FooterTop from '@/components/city/indore/Footer-top';
import Footer from '@/components/footer';
import MagnetIcon from '@/components/MagneticCursor';
import FinmatesHeader from '@/components/header2';
import ServiceAreas from '@/components/city/indore/ServiceAreas';
import { ConsultationModalProvider } from '@/components/city/indore/ConsultationModal';
import CTASection from '@/components/city/indore/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { pageCanonical } from '@/lib/seo';
import { buildServiceJsonLd, buildWebPageJsonLd } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Virtual CFO Services in Indore | FinMates',
  description:
    'Hire a Virtual CFO in Indore without the full-time cost. FinMates delivers strategic financial leadership for startups, MSMEs & manufacturers across Madhya Pradesh. Book a free consultation today.',
  generator: 'GEO SOFTECH',
  ...pageCanonical('/city/indore'),
  openGraph: {
    title: 'Virtual CFO Services in Indore | FinMates',
    description:
      'Hire a Virtual CFO in Indore without the full-time cost. FinMates delivers strategic financial leadership for startups, MSMEs & manufacturers across Madhya Pradesh.',
    url: 'https://www.finmates.in/city/indore',
    siteName: 'FinMates',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual CFO Services in Indore | FinMates',
    description:
      'Hire a Virtual CFO in Indore without the full-time cost. FinMates delivers strategic financial leadership for startups, MSMEs & manufacturers across Madhya Pradesh.',
  },
  keywords: [
    'Virtual CFO Indore',
    'CFO services Indore',
    'outsourced CFO Madhya Pradesh',
    'fractional CFO Indore',
    'financial advisory Pithampur',
    'Virtual CFO for MSME Indore',
  ],
}

export default function IndoreCityPage() {
  return (
    <ConsultationModalProvider>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: 'Virtual CFO Services in Indore',
            description:
              'Hire a Virtual CFO in Indore without the full-time cost. FinMates delivers strategic financial leadership for startups, MSMEs and manufacturers across Madhya Pradesh.',
            path: '/city/indore',
          }),
          buildServiceJsonLd({
            name: 'Virtual CFO Services in Indore',
            description:
              'Virtual CFO services in Indore for startups, MSMEs and manufacturers — strategic financial leadership without full-time CFO cost.',
            path: '/city/indore',
            serviceType: 'Virtual CFO Services',
            areaServed: 'Indore, India',
          }),
        ]}
      />
      <div className="indore-page min-h-screen bg-white text-p-3">
        <MagnetIcon />
        <FinmatesHeader />
        <main className="mt-20">
          <HeroSection />
          <LocalMarketSection />
          <AboutSection />
          <CostCapabilityMatrix />
          <Section203Guide />
          <ServicesGrid />
          <ProcessTimeline />
          <TrustSection />
          <CoreServices />
          <SectorEdge />
          <DigitalInfrastructure />
          <PricingTiers />
          <Industries />
          <ServiceAreas />
          <LocationSection />
          <FAQSection />
          <LongFormContent />
          <CTASection />
          <FooterTop />
          <Footer />
        </main>
      </div>
    </ConsultationModalProvider>
  )
}
