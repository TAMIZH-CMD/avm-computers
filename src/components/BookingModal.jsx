import React, { useState } from 'react';
import { 
  X, 
  FileCheck2, 
  CheckCircle, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useServicesAndPricing } from '../context/ServicePriceContext';
import { useApplications } from '../context/ApplicationContext';

export const BookingModal = ({ isOpen, onClose, initialService = null }) => {
  const { services } = useServicesAndPricing();
  const { addApplication } = useApplications();
  const [applicantType, setApplicantType] = useState('Individual / Citizen');
  const [selectedService, setSelectedService] = useState(
    initialService?.title || 'Revenue & E-District Certificates'
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const randomAppNo = `TN-${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`;
    const maskedAadhaar = aadhaar ? `XXXX-XXXX-${aadhaar.slice(-4)}` : 'Not provided';

    setConfirmedTicket({
      ticketId: randomAppNo,
      name,
      applicantType,
      selectedService,
      phone,
      aadhaar: maskedAadhaar
    });

    // Save directly to ApplicationContext (syncs to LocalStorage & Supabase)
    addApplication({
      ticket_id: randomAppNo,
      applicant_type: applicantType,
      selected_service: selectedService,
      name: name.trim(),
      phone: phone.trim(),
      aadhaar: maskedAadhaar,
      notes: notes.trim()
    });
  };

  const handleSendToWhatsApp = () => {
    const text = `வணக்கம் AVM E-Sevai! I want to apply for a service:\n- Name: ${name || 'Citizen'}\n- Phone: ${phone || 'N/A'}\n- Service Needed: ${selectedService}\n- Notes/Details: ${notes || 'Standard application'}`;
    const url = `https://wa.me/918973842931?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">E-Sevai Online Application Desk</h3>
              <p className="text-[11px] text-slate-500">TNeGA e-District & CSC Government Gateway</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          {confirmedTicket ? (
            /* Confirmation Screen */
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Application Initiated
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  Thank You, {confirmedTicket.name}!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mt-0.5">
                  Your e-Sevai request reference has been created. Bring your original Aadhaar and required proofs to our center or send via WhatsApp for immediate filing.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 max-w-xs mx-auto text-left space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Temp Ref No:</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">{confirmedTicket.ticketId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Service:</span>
                  <span className="text-slate-900 font-semibold">{confirmedTicket.selectedService}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Phone:</span>
                  <span className="text-slate-900 font-semibold">{confirmedTicket.phone}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Documents on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Category Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                  1. Applicant Category
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Individual / Citizen', 'Student / Candidate', 'Farmer / Land Owner'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setApplicantType(d)}
                      className={`p-1.5 rounded-lg text-center font-semibold transition-all text-xs border ${
                        applicantType === d
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Requested */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                  2. Select Government Service / Certificate
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 text-xs"
                >
                  {services.map((s) => (
                    <option key={s.id} value={`${s.title} (${s.tamilTitle})`}>
                      {s.title} - {s.tamilTitle} ({s.priceStarting})
                    </option>
                  ))}
                  <option value="General E-Sevai Inquiry">
                    Other E-Governance & Scheme Verification
                  </option>
                </select>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="As per Aadhaar Card"
                    className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                    Mobile Number (OTP linked) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 89738 42931"
                    className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 text-xs"
                  />
                </div>
              </div>

              {/* Optional Aadhaar */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                  Last 4 digits of Aadhaar (Optional)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  placeholder="e.g. 5432"
                  className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono text-xs"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                  Specific Requirements or Proof Documents Available
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Applying for First Graduate certificate for TNEA counselling..."
                  className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 resize-none text-xs"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Submit Service Request</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs border border-emerald-300 flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Send on WhatsApp</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Confidential
          </span>
          <span>Official TNeGA e-District Partner</span>
        </div>

      </div>
    </div>
  );
};
