import HeroSection from '@/components/city/mumbai/HeroSection';
import LocalMarketSection from '@/components/city/mumbai/LocalMarketSection';
import ServicesGrid from '@/components/city/mumbai/ServicesGrid';
import ProcessTimeline from '@/components/city/mumbai/ProcessTimeline';
import TrustSection from '@/components/city/mumbai/TrustSection';
import LocationSection from '@/components/city/mumbai/LocationSection';
import FAQSection from '@/components/city/mumbai/FAQSection';
import AboutSection from '@/components/city/mumbai/AboutSection';
import CostCapabilityMatrix from '@/components/city/mumbai/CostCapabilityMatrix';
import Section203Guide from '@/components/city/mumbai/Section203Guide';
import CoreServices from '@/components/city/mumbai/CoreServices';
import SectorEdge from '@/components/city/mumbai/SectorEdge';
import DigitalInfrastructure from '@/components/city/mumbai/DigitalInfrastructure';
// import PricingTiers from '@/components/city/mumbai/PricingTiers';
import Industries from '@/components/city/mumbai/Industries';
import LongFormContent from '@/components/city/mumbai/LongFormContent';
import FooterTop from '@/components/city/mumbai/Footer-top';
import Footer from '@/components/footer';
import MagnetIcon from '@/components/MagneticCursor';
import FinmatesHeader from '@/components/header2';
import ServiceAreas from '@/components/city/mumbai/ServiceAreas';
import { ConsultationModalProvider } from '@/components/city/mumbai/ConsultationModal';
import CTASection from '@/components/city/mumbai/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { pageCanonical } from '@/lib/seo';
import { buildServiceJsonLd, buildWebPageJsonLd } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Virtual CFO Services in Mumbai | FinMates',
  description:
    'Hire a Virtual CFO in Mumbai without the full-time cost. FinMates delivers strategic financial leadership for startups & SMEs. Book a free consultation today.',
  generator: 'GEO SOFTECH',
  ...pageCanonical('/city/mumbai'),
  openGraph: {
    title: 'Virtual CFO Services in Mumbai | FinMates',
    description:
      'Hire a Virtual CFO in Mumbai without the full-time cost. FinMates delivers strategic financial leadership for startups & SMEs.',
    url: 'https://www.finmates.in/city/mumbai',
    siteName: 'FinMates',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual CFO Services in Mumbai | FinMates',
    description:
      'Hire a Virtual CFO in Mumbai without the full-time cost. FinMates delivers strategic financial leadership for startups & SMEs.',
  },
}

export default function Home() {
  return (
    <ConsultationModalProvider>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: 'Virtual CFO Services in Mumbai',
            description:
              'Hire a Virtual CFO in Mumbai without the full-time cost. FinMates delivers strategic financial leadership for startups & SMEs.',
            path: '/city/mumbai',
          }),
          buildServiceJsonLd({
            name: 'Virtual CFO Services in Mumbai',
            description:
              'Virtual CFO services in Mumbai for startups and SMEs — strategic financial leadership without full-time CFO cost.',
            path: '/city/mumbai',
            serviceType: 'Virtual CFO Services',
            areaServed: 'Mumbai, India',
          }),
        ]}
      />
      <div className="mumbai-page min-h-screen bg-white text-p-3">
       <MagnetIcon/>
       <FinmatesHeader/>
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
      {/* <PricingTiers /> */}
      <Industries />
      <ServiceAreas />
      <LocationSection />
      <FAQSection />
      <LongFormContent />
      <CTASection/>
      <FooterTop />
      <Footer/>
      </main>
      </div>
    </ConsultationModalProvider>
  );
}
