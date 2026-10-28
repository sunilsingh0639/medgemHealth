import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import Treatments from './pages/Treatments';
import TreatmentDetails from './pages/TreatmentDetails';
import Hospitals from './pages/Hospitals';
import HospitalDetails from './pages/HospitalDetails';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Wellness from './pages/Wellness';
import About from './pages/About';
import Contact from './pages/Contact';
import Consultation from './pages/Consultation';
import SecondOpinion from './pages/SecondOpinion';
import NotFound from './pages/NotFound';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminLayout, { AdminGuard } from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminTreatments from './admin/pages/AdminTreatments';
import AdminHospitals from './admin/pages/AdminHospitals';
import AdminDoctors from './admin/pages/AdminDoctors';
import AdminDestinations from './admin/pages/AdminDestinations';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminFaqs from './admin/pages/AdminFaqs';
import AdminEnquiries from './admin/pages/AdminEnquiries';
import AdminHomePage from './admin/pages/AdminHomePage';
import AdminSettings from './admin/pages/AdminSettings';
import AdminMedia from './admin/pages/AdminMedia';

function ScrollToTop(): null {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatments/:id" element={<TreatmentDetails />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/second-opinion" element={<SecondOpinion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/homepage" element={<AdminHomePage />} />
              <Route path="/admin/treatments" element={<AdminTreatments />} />
              <Route path="/admin/hospitals" element={<AdminHospitals />} />
              <Route path="/admin/doctors" element={<AdminDoctors />} />
              <Route path="/admin/destinations" element={<AdminDestinations />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/faqs" element={<AdminFaqs />} />
              <Route path="/admin/enquiries" element={<AdminEnquiries />} />
              <Route path="/admin/media" element={<AdminMedia />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
