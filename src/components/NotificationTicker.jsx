import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, ChevronRight, X, Calendar, AlertTriangle, Megaphone } from 'lucide-react';
import { useAlerts } from '../context/AlertContext';

export const NotificationTicker = () => {
  const { alerts } = useAlerts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (alerts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % alerts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [alerts.length]);

  if (dismissed || alerts.length === 0) return null;

  const current = alerts[currentIndex];
  const isUrgent = current.priority === 'high';

  const goNext = () => setCurrentIndex(prev => (prev + 1) % alerts.length);
  const goPrev = () => setCurrentIndex(prev => (prev - 1 + alerts.length) % alerts.length);

  return (
    <div id="news" className={`border-b ${isUrgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-start gap-4">

          {/* Large Icon */}
          <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-sm ${isUrgent ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-amber-100 text-amber-600 border border-amber-200'}`}>
            {isUrgent ? <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" /> : <Megaphone className="w-6 h-6 sm:w-7 sm:h-7" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Top Row: Badge + Date */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[10px] sm:text-xs font-bold uppercase px-2 py-0.5 rounded border ${isUrgent ? 'bg-red-100 text-red-700 border-red-300' : 'bg-amber-100 text-amber-700 border-amber-300'}`}>
                {isUrgent ? '🚨 Urgent Alert' : '📢 ' + current.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {current.date}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                — by {current.author || 'E-Sevai Desk'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1">
              {current.title}
            </h3>

            {/* Content preview */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
              {current.content}
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Dismiss all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Navigation */}
            {alerts.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={goPrev}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-slate-400 min-w-[28px] text-center">
                  {currentIndex + 1}/{alerts.length}
                </span>
                <button
                  onClick={goNext}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
