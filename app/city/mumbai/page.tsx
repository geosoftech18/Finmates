import HeroSection from '@/components/city/mumbai/HeroSection';
import LocalMarketSection from '@/components/city/mumbai/LocalMarketSection';
import ServicesGrid from '@/components/city/mumbai/ServicesGrid';
import ProcessTimeline from '@/components/city/mumbai/ProcessTimeline';
import TrustSection from '@/components/city/mumbai/TrustSection';
import LocationSection from '@/components/city/mumbai/LocationSection';
import FAQSection from '@/components/city/mumbai/FAQSection';
import AboutSection from '@/components/city/mumbai/AboutSection';
import CoreServices from '@/components/city/mumbai/CoreServices';
import Industries from '@/components/city/mumbai/Industries';
import LongFormContent from '@/components/city/mumbai/LongFormContent';
import FooterTop from '@/components/city/mumbai/Footer-top';
import Footer from '@/components/footer';
import MagnetIcon from '@/components/MagneticCursor';
import FinmatesHeader from '@/components/header2';
import ServiceAreas from '@/components/city/mumbai/ServiceAreas';
import { ConsultationModalProvider } from '@/components/city/mumbai/ConsultationModal';
import CTASection from '@/components/city/mumbai/CTASection';


export default function Home() {
  return (
    <ConsultationModalProvider>
      <div className="mumbai-page min-h-screen bg-white text-p-3">
       <MagnetIcon/>
       <FinmatesHeader/>
      <main className="mt-20">
      <HeroSection />
      <LocalMarketSection />
      <AboutSection />
      <ServicesGrid />
      <ProcessTimeline />
      <TrustSection />
      <CoreServices />
      <Industries />
      <ServiceAreas />
      <LocationSection />
      <CTASection/>
      <FAQSection />
      <LongFormContent />
      <FooterTop />
      <Footer/>
      </main>
      </div>
    </ConsultationModalProvider>
  );
}
