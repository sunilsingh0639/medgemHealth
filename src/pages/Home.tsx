import HeroSection from '../components/HeroSection.tsx';
import TreatmentSearch from '../components/TreatmentSearch';
import StatsSection from '../components/StatsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TreatmentsSection from '../components/TreatmentsSection';
import DestinationsSection from '../components/DestinationsSection';
import HospitalsSection from '../components/HospitalsSection';
import DoctorsSection from '../components/DoctorsSection';
import SecondOpinionSection from '../components/SecondOpinionSection';
import JourneySection from '../components/JourneySection';
import TestimonialSlider from '../components/TestimonialSlider';
import FAQSection from '../components/FAQSection';
import ContactBanner from '../components/ContactBanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TreatmentSearch />
      <StatsSection />
      <WhyChooseUs />
      <TreatmentsSection limit={6} />
      <DestinationsSection />
      <HospitalsSection limit={6} />
      <DoctorsSection limit={6} />
      <SecondOpinionSection />
      <JourneySection />
      <TestimonialSlider />
      <FAQSection />
      <ContactBanner />
    </>
  );
}
