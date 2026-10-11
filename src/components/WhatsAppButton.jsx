import React, { useState } from 'react';
import { Send, X, ShieldCheck, Clock } from 'lucide-react';

export const WhatsAppButton = ({ businessPhone = "918973842931" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("வணக்கம்! Hi, I need assistance with an E-Sevai / CSC online certificate service: ");

  const quickPrompts = [
    "Hi, I need help applying for Income / Community / Nativity Certificate.",
    "Hi, I want to download Patta / Chitta or Encumbrance Certificate (EC).",
    "Hi, how to add a name or change address in my Smart Ration Card?",
    "Hi, I need a New PAN Card (e-PAN & physical card) application.",
    "Hi, I want to apply for TNPSC / Govt Exam online."
  ];

  const handleSend = (textToSend) => {
    const message = textToSend || customMsg || "Hi, I need assistance with E-Sevai / CSC government service...";
    const url = `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-800/50 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/30">
                  🏛️
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-base leading-tight">AVM E-Sevai Help Desk</h4>
                <div className="flex items-center space-x-1.5 text-xs text-emerald-100 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>CSC VLE Operator Online • Quick Response</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-900/95 text-slate-200 text-sm space-y-3">
            <div className="bg-slate-800/90 p-3 rounded-xl rounded-tl-none border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
              👋 வணக்கம்! Need assistance with Government Certificates, Patta/Chitta, Ration Card, PAN Card, or Exam Applications? Select below or chat directly:
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Popular Services:</p>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left text-xs bg-slate-800/60 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-500/50 p-2.5 rounded-lg border border-slate-700/60 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{prompt.replace("Hi, ", "")}</span>
                  <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                rows={2}
                placeholder="Type your E-Sevai inquiry or required service..."
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 placeholder-slate-500 resize-none"
              />
              <button
                onClick={() => handleSend(customMsg)}
                className="w-full mt-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-medium rounded-lg text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Chat with E-Sevai Operator</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust footer */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authorized CSC Center
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Mon-Sat: 8:30am - 8:30pm
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
        aria-label="Contact via WhatsApp Support"
      >
        {/* Pulsating ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75"></span>

        {/* WhatsApp Icon SVG */}
        <div className="relative z-10 w-7 h-7 flex items-center justify-center">
          <svg
            className="w-7 h-7 fill-current drop-shadow"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.956.565 3.784 1.543 5.336L2 22l4.781-1.516c1.503.882 3.25 1.391 5.25 1.391 5.536 0 10.031-4.495 10.031-10.031S17.567 2 12.031 2zm0 18.281c-1.758 0-3.385-.492-4.781-1.344l-.344-.203-3.141 1 1-3.078-.227-.359a8.167 8.167 0 0 1-1.289-4.266c0-4.555 3.703-8.281 8.281-8.281 4.578 0 8.281 3.703 8.281 8.281 0 4.578-3.703 8.25-8.281 8.25zm4.828-6.172c-.266-.133-1.562-.773-1.805-.859-.242-.094-.422-.133-.602.133s-.695.859-.852 1.047c-.156.188-.312.203-.578.07a7.276 7.276 0 0 1-2.148-1.328 8.083 8.083 0 0 1-1.484-1.852c-.156-.266-.016-.406.117-.539.125-.125.266-.312.406-.469.133-.156.172-.266.258-.438.086-.172.047-.328-.023-.469-.07-.133-.602-1.453-.828-1.992-.219-.531-.445-.453-.609-.461-.156-.008-.336-.008-.516-.008s-.469.07-.719.344c-.242.266-.938.914-.938 2.234 0 1.32 1.008 2.594 1.148 2.781.141.188 1.984 3.031 4.805 4.25.672.289 1.195.461 1.602.594.672.211 1.289.18 1.773.109.539-.078 1.562-.641 1.781-1.258.219-.617.219-1.148.156-1.258-.062-.109-.242-.172-.508-.305z" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-start leading-none pr-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span> E-Sevai Help
          </span>
          <span className="text-sm font-bold tracking-tight">Need E-Service? WhatsApp Now</span>
        </div>
      </button>
    </div>
  );
};
