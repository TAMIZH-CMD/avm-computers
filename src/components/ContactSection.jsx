import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check 
} from 'lucide-react';

import { useApplications } from '../context/ApplicationContext';

export const ContactSection = () => {
  const { addApplication } = useApplications();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: 'Income Certificate',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    // Save order / inquiry directly to Admin Portal
    addApplication({
      ticket_id: `ORD-${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`,
      applicant_type: 'Online Web Order',
      selected_service: formData.device || 'Certificate Order',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      aadhaar: formData.email ? `Email: ${formData.email}` : 'Not provided',
      notes: formData.message.trim() || 'Online citizen order request from contact section'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', device: 'Income Certificate', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Center Location & Help
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact AVM E-Sevai Maiyam
          </h2>

          <p className="text-slate-600 text-sm">
            Visit our center with your original documents or send your inquiry directly to our operator desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Center Information</h3>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Center Address</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      AVM E-Sevai & CSC Center<br />
                      No. 14, Main Road, Bus Stand Opposite<br />
                      Tamil Nadu - 600001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone & WhatsApp</span>
                    <p className="text-slate-600 mt-0.5">
                      Helpline: <a href="tel:918973842931" className="text-emerald-700 font-bold hover:underline">+91 89738 42931</a><br />
                      WhatsApp: <a href="https://wa.me/918973842931" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">+91 89738 42931</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries</span>
                    <p className="text-slate-600 mt-0.5">
                      avmesevai@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Working Hours (வேலை நேரம்)</span>
              </div>

              <div className="space-y-1.5 text-slate-600 pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Monday – Saturday</span>
                  <span className="font-bold text-emerald-700">8:30 AM – 8:30 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday</span>
                  <span className="font-semibold text-slate-500">9:30 AM – 2:00 PM (Half Day)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Send Service Inquiry to Operator</h3>
              <p className="text-xs text-slate-500">
                Have a question regarding any certificate or required documents? Leave your message below.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Our operator will contact you shortly via phone or WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Applicant Name"
                      className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 89738 42931"
                      className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Needed</label>
                  <select
                    value={formData.device}
                    onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Income Certificate">Income Certificate (வருமான சான்றிதழ்)</option>
                    <option value="Community Certificate">Community Certificate (சாதி சான்றிதழ்)</option>
                    <option value="Patta / Chitta">Patta / Chitta / EC (பட்டா / சிட்டா)</option>
                    <option value="Smart Ration Card">Smart Ration Card (ஸ்மார்ட் கார்டு)</option>
                    <option value="PAN Card">New PAN Card (பான் கார்டு)</option>
                    <option value="TNPSC / Police Exam">Exam Online Application (தேர்வு விண்ணப்பம்)</option>
                    <option value="Other">Other Government Scheme</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message / Query *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe what help you need or ask about document requirements..."
                    className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry to Center</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
