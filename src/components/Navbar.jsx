import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  PhoneCall, 
  Menu, 
  X, 
  Search, 
  Clock,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useAlerts } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenBooking, 
  onOpenTracker 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { urgentCount } = useAlerts();
  const { isAuthenticated, currentUser } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'E-Services (சேவைகள்)' },
    { id: 'pricing', label: 'Govt Fees (கட்டணம்)' },
    { 
      id: 'news', 
      label: 'Govt Alerts & Deadlines', 
      badge: urgentCount > 0 ? `${urgentCount} Urgent` : null 
    },
    { id: 'tracker', label: 'Track Application' },
    { id: 'contact', label: 'Contact Center' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (id === 'tracker' && onOpenTracker) {
      onOpenTracker();
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top official info strip */}
      <div className="bg-emerald-800 text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              அரசு அங்கீகாரம் பெற்ற இ-சேவை மையம் • CSC Digital Seva Kendra
            </span>
            <span className="hidden md:inline-block text-emerald-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-100">
              <Clock className="w-3.5 h-3.5" />
              Open: Mon - Sat: 8:30 AM – 8:30 PM
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href="tel:918973842931" 
              className="flex items-center gap-1.5 text-white hover:text-emerald-200 font-semibold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call: +91 89738 42931</span>
            </a>

            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                activeTab === 'admin' 
                  ? 'bg-amber-400 text-slate-900 font-bold' 
                  : isAuthenticated
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 ring-1 ring-emerald-400/50'
                  : 'bg-emerald-900/70 text-emerald-100 hover:bg-emerald-900 border border-emerald-700/50'
              }`}
            >
              {isAuthenticated ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
              ) : (
                <Lock className="w-3 h-3 text-amber-300" />
              )}
              <span>
                {activeTab === 'admin' 
                  ? (isAuthenticated ? 'Exit Admin' : 'Exit Login') 
                  : (isAuthenticated ? `Admin (${currentUser?.username || 'Active'})` : 'Admin Portal')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main clean navigation bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <div className="relative">
                <img 
                  src="/logo.jpg" 
                  alt="AVM Computers" 
                  className="w-12 h-12 rounded-xl object-cover shadow-md border border-slate-200 group-hover:scale-105 transition-transform" 
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <span className="text-2xl font-black tracking-wider text-slate-900 group-hover:text-emerald-700 transition-colors">
                AVM COMPUTERS
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-200">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Buttons */}
            <div className="hidden sm:flex items-center space-x-2.5">
              <button
                onClick={onOpenTracker}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all flex items-center gap-1.5"
                title="Check Application Status"
              >
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Track Status</span>
              </button>

              <button
                id="header-book-cta"
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Apply Online</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg sm:hidden"
              >
                Apply
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full py-2.5 px-4 text-center rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Track Application (விண்ணப்ப நிலை)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 text-center rounded-lg text-xs font-bold text-white bg-emerald-700 flex items-center justify-center gap-2 shadow-sm"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Apply for Certificate Now</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
