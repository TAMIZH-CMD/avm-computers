import React, { useState } from 'react';
import { 
  FileCheck, 
  Clock, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Landmark,
  ShieldCheck
} from 'lucide-react';

export const Hero = ({ onOpenBooking, onEnquireService }) => {
  const [serviceCategory, setServiceCategory] = useState('Income Certificate');

  const serviceSpecs = {
    'Income Certificate': {
      tamil: "வருமான சான்றிதழ்",
      docs: "Aadhaar Card, Smart Ration Card, Photo, Salary Slip / Self Income Declaration",
      time: "3 - 7 Working Days",
      fee: "₹100 (₹60 Govt Fee incl.)",
      authority: "Tahsildar Digital Sign with QR Code"
    },
    'Community Certificate': {
      tamil: "சாதி சான்றிதழ்",
      docs: "Aadhaar, Ration Card, School TC / Parents' Community Certificate, Photo",
      time: "3 - 7 Working Days",
      fee: "₹100 (₹60 Govt Fee incl.)",
      authority: "Zonal Deputy Tahsildar Approval"
    },
    'Patta / Chitta & EC': {
      tamil: "பட்டா / சிட்டா & வில்லங்கம் (EC)",
      docs: "Survey Number, Sub-division, Village/Taluk or Previous Deed Number",
      time: "Instant Download (5 Mins)",
      fee: "From ₹40",
      authority: "Digitally Signed Land Record"
    },
    'Smart Ration Card': {
      tamil: "ஸ்மார்ட் ரேஷன் கார்டு சேவைகள்",
      docs: "Family Aadhaar cards, Child Birth Certificate / Gas bill / Address Proof",
      time: "5 - 12 Working Days",
      fee: "From ₹60",
      authority: "Taluk Supply Officer (TSO)"
    },
    'New PAN Card': {
      tamil: "புதிய பான் கார்டு (e-PAN)",
      docs: "Aadhaar Card with linked Mobile OTP or Biometric fingerprint scan",
      time: "e-PAN in 48-72 Hrs",
      fee: "₹150 (Physical Card by Post)",
      authority: "Income Tax Dept / NSDL-UTI"
    }
  };

  const currentSpec = serviceSpecs[serviceCategory] || serviceSpecs['Income Certificate'];

  return (
    <section className="bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Landmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>அரசு இ-சேவை மையம் • Authorized TNeGA & CSC Kendra</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Fast, Error-Free <br className="hidden sm:inline" />
              <span className="text-emerald-700">E-Sevai & CSC</span> Citizen Services
            </h1>

            {/* Tamil Subheading */}
            <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 inline-block px-3 py-1.5 rounded-lg border border-emerald-200">
              வருவாய் சான்றிதழ்கள், பட்டா/சிட்டா, ஸ்மார்ட் ரேஷன் கார்டு, பான் கார்டு & அரசுத் திட்டங்கள்
            </p>

            {/* Subtitle Value Proposition */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Apply for Income, Community, Nativity, First Graduate certificates, Patta/Chitta, Smart Ration Card updates, and Online Exam applications with certified operators. Zero errors & official government receipts.
            </p>

            {/* Bullet Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Authorized CSC VLE</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Govt Fixed Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>SMS Status Alerts</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                id="hero-book-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Apply for Certificate Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>View All Services (அனைத்தும்)</span>
              </a>
            </div>

            {/* Trust Proof */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 leading-none">10,000+ Approved</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">8+ Years in Service</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-slate-600 text-xs font-medium">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>TNeGA e-District Certified Operator</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Simple Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">E-Sevai Service & Proof Guide</h3>
                  <p className="text-[11px] text-slate-500">Select certificate to check required documents</p>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Govt Norms
                </span>
              </div>

              {/* Service Chips */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Certificate / Service:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Income Certificate', 'Community Certificate', 'Patta / Chitta & EC', 'Smart Ration Card', 'New PAN Card'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setServiceCategory(s)}
                      className={`p-2 text-xs font-semibold rounded-lg text-left transition-all border ${
                        serviceCategory === s
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Details Box */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 block">
                      {currentSpec.tamil}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{serviceCategory}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-semibold block">Total Fee</span>
                    <p className="text-sm font-extrabold text-emerald-700">{currentSpec.fee}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 text-[11px]">Required Documents:</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed bg-white p-2 rounded border border-slate-200 text-[11px]">
                      {currentSpec.docs}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-0.5">
                    <div className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{currentSpec.time}</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{currentSpec.authority}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onEnquireService({ device: "E-Sevai Certificate", symptom: `${serviceCategory} (${currentSpec.tamil})` })}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Apply Now on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
