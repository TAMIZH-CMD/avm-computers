import React, { useState, useEffect } from 'react';
import { AlertProvider } from './context/AlertContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ServicePriceProvider } from './context/ServicePriceContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { NotificationTicker } from './components/NotificationTicker';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BookingModal } from './components/BookingModal';
import { RepairTracker } from './components/RepairTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';


function MainApp() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'home';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  useEffect(() => {
    const handleLocation = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setActiveTab('admin');
      } else if (activeTab === 'admin') {
        setActiveTab('home');
      }
    };
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, [activeTab]);

  const handleOpenBooking = (service = null) => {
    setSelectedBookingService(service);
    setIsBookingOpen(true);
  };

  const handleEnquireService = (info) => {
    handleOpenBooking({ title: `${info.device} - ${info.symptom}` });
  };

  const handleSelectPricingPlan = (plan) => {
    handleOpenBooking({ title: `Service: ${plan.service || plan.title}` });
  };



  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">


      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'admin' ? (
          isAuthenticated ? (
            <AdminDashboard onBackToPublic={() => setActiveTab('home')} />
          ) : (
            <AdminLogin onBackToPublic={() => setActiveTab('home')} />
          )
        ) : (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking(null)}
              onEnquireService={handleEnquireService}
            />

            {/* Small notification ticker on home page */}
            <NotificationTicker />

            <Services
              onSelectService={(service) => handleOpenBooking(service)}
            />

            <Pricing
              onSelectPlan={handleSelectPricingPlan}
            />

            <Testimonials />

            <FAQ />

            <ContactSection />
          </>
        )}
      </main>

      <Footer
        onNavigate={(id) => {
          if (activeTab === 'admin') setActiveTab('home');
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenAdmin={() => {
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating High-Visibility WhatsApp Support Button */}
      <WhatsAppButton businessPhone="918973842931" />

      {/* Interactive Service Request Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedBookingService}
      />

      {/* Interactive Application Status Tracker Modal */}
      <RepairTracker
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <ServicePriceProvider>
          <ApplicationProvider>
            <MainApp />
          </ApplicationProvider>
        </ServicePriceProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
