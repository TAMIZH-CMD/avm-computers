import React from 'react';
import { Building2, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="AVM Computers" 
                className="w-11 h-11 rounded-xl object-cover border border-slate-700 shadow-md" 
              />
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  AVM Computers <span className="text-emerald-400">E-Sevai & CSC</span>
                </span>
                <span className="text-[11px] font-semibold text-amber-400 block">
                  ஏ.வி.எம் கம்ப்யூட்டர்ஸ்
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              அரசு இ-சேவை மையம் • Authorized TNeGA e-District and CSC Digital Seva Kendra for citizens, students, and businesses.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Government Certified VLE Operator</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-slate-400">
              {['Home', 'Services', 'Pricing', 'News & Alerts', 'Contact'].map((item) => {
                const targetId = item === 'News & Alerts' ? 'news' : item.toLowerCase();
                return (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate(targetId)}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Operator Portal (/admin)</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-amber-950/70 text-amber-300 border border-amber-600/40">🔒 Secure</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Major Services</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Income & Community Certificates</li>
              <li>Patta, Chitta & FMB Sketch</li>
              <li>Encumbrance Certificate (EC)</li>
              <li>Smart Ration Card Updates</li>
              <li>New PAN Card (NSDL/UTI)</li>
              <li>TNPSC & Govt Exam Forms</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Center Help Desk</h4>
            <div className="space-y-1 text-slate-400">
              <p>Helpline: +91 89738 42931</p>
              <p>WhatsApp: +91 89738 42931</p>
              <p>Mon - Sat: 8:30 AM - 8:30 PM</p>
              <p>Sunday: 9:30 AM - 2:00 PM</p>
              <p className="text-emerald-400 font-semibold pt-1">Zero Error Online Filing</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 AVM Computers E-Sevai Maiyam & CSC Center. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="hover:text-slate-400 transition-colors"
            >
              Staff Login
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
