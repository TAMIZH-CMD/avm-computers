import React, { useState } from 'react';
import { 
  FileText, 
  Landmark, 
  CreditCard, 
  BadgeCheck, 
  HandHelping, 
  GraduationCap, 
  Check, 
  Clock, 
  ArrowRight, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useServicesAndPricing } from '../context/ServicePriceContext';

const iconMap = {
  FileText: FileText,
  Landmark: Landmark,
  CreditCard: CreditCard,
  BadgeCheck: BadgeCheck,
  HandHelping: HandHelping,
  GraduationCap: GraduationCap,
  Sparkles: Sparkles
};

export const Services = ({ onSelectService }) => {
  const { services } = useServicesAndPricing();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services (அனைத்தும்)' },
    { id: 'revenue', label: 'Revenue Certificates (வருவாய்)' },
    { id: 'land', label: 'Land & Patta/Chitta (நிலம்)' },
    { id: 'cards', label: 'Ration & ID Cards (அட்டைகள்)' },
    { id: 'welfare', label: 'Welfare & Exams (திட்டங்கள்)' }
  ];

  const filteredServices = services.filter(service => {
    const id = (service.id || '').toLowerCase();
    const cat = (service.category || '').toLowerCase();
    if (filter === 'revenue') return id.includes('revenue') || cat.includes('revenue') || cat.includes('certificate');
    if (filter === 'land') return id.includes('land') || cat.includes('land');
    if (filter === 'cards') return id.includes('ration') || id.includes('identity') || cat.includes('card') || cat.includes('civil');
    if (filter === 'welfare') return id.includes('welfare') || id.includes('exam') || cat.includes('welfare');
    return true;
  });

  return (
    <section id="services" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Citizen Online Portal
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Core E-Sevai & CSC Services
          </h2>

          <p className="text-slate-600 text-sm">
            Government certificates, land revenue records, and welfare schemes processed with zero errors.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  filter === cat.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || FileText;
            return (
              <div
                key={service.id}
                className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all"
              >
                <div>
                  {/* Top: Icon + Turnaround */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{service.turnaround}</span>
                    </div>
                  </div>

                  {/* Title & Tamil Subtitle */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 block">
                      {service.tamilTitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-100">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Documents Required */}
                  {service.documentsRequired && (
                    <div className="mb-4 p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                      <strong className="text-emerald-800">Proofs Needed:</strong> {service.documentsRequired}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer: Price & CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Fee from</span>
                    <span className="text-base font-extrabold text-emerald-800">{service.priceStarting}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/918973842931?text=${encodeURIComponent(`வணக்கம்! I want to enquire regarding: ${service.title} (${service.tamilTitle})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => onSelectService(service)}
                      className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all flex items-center gap-1"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Commercial Banner */}
        <div className="mt-10 rounded-xl bg-slate-50 border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-slate-900">Need Rental Agreements, Udyam MSME, or FSSAI Food Licenses?</h4>
            <p className="text-xs text-slate-600">We provide official e-Stamping, legal drafting, and business registration certificates.</p>
          </div>
          <button
            onClick={() => onSelectService({ title: "Legal & Business Documentation Inquiry" })}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex-shrink-0"
          >
            Enquire Commercial Services
          </button>
        </div>

      </div>
    </section>
  );
};
