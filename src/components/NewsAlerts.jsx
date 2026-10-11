import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  X, 
  ExternalLink, 
  Landmark,
  Info
} from 'lucide-react';
import { useAlerts } from '../context/AlertContext';

export const NewsAlerts = () => {
  const { alerts } = useAlerts();
  const [expandedId, setExpandedId] = useState(null);
  const [dismissed, setDismissed] = useState([]);

  const visibleAlerts = alerts.filter(a => !dismissed.includes(a.id));

  if (visibleAlerts.length === 0) return null;

  const getPriorityStyles = (alert) => {
    const isUrgent = alert.priority === 'high' || alert.category === 'Urgent Alert';
    if (isUrgent) {
      return {
        dot: 'bg-red-500',
        badge: 'bg-red-50 text-red-700 border-red-200',
        label: '🚨 Urgent'
      };
    }
    if (alert.category === 'Govt Scheme') {
      return {
        dot: 'bg-blue-500',
        badge: 'bg-blue-50 text-blue-700 border-blue-200',
        label: '📜 Govt Scheme'
      };
    }
    return {
      dot: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: '📢 Notice'
    };
  };

  return (
    <section id="news" className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Notifications & Govt Alerts
              </h3>
              <p className="text-[11px] text-slate-500">
                அறிவிப்புகள் • {visibleAlerts.length} active updates
              </p>
            </div>
          </div>

          {visibleAlerts.some(a => a.priority === 'high') && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 animate-pulse">
              {visibleAlerts.filter(a => a.priority === 'high').length} Urgent
            </span>
          )}
        </div>

        {/* Notification List */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 divide-y divide-slate-100 overflow-hidden max-h-[320px] overflow-y-auto">
          {visibleAlerts.map((alert) => {
            const styles = getPriorityStyles(alert);
            const isExpanded = expandedId === alert.id;

            return (
              <div
                key={alert.id}
                className="bg-white hover:bg-slate-50/80 transition-colors"
              >
                {/* Notification Row */}
                <div className="flex items-start gap-3 px-4 py-3">
                  
                  {/* Priority Dot */}
                  <div className="mt-1.5 flex-shrink-0">
                    <span className={`block w-2 h-2 rounded-full ${styles.dot}`}></span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${styles.badge}`}>
                        {styles.label}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {alert.date}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                      {alert.title}
                    </h4>

                    {!isExpanded && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {alert.content}
                      </p>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-2 space-y-2 animate-in fade-in duration-150">
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          {alert.content}
                        </p>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/918973842931?text=${encodeURIComponent(`வணக்கம்! I have a question regarding: ${alert.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] transition-all"
                          >
                            <span>Ask on WhatsApp</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>

                          <span className="text-[10px] text-slate-400">
                            by {alert.author || 'E-Sevai Desk'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                      title={isExpanded ? 'Collapse' : 'Read more'}
                    >
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <button
                      onClick={() => setDismissed(prev => [...prev, alert.id])}
                      className="p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      title="Dismiss"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <Info className="w-3 h-3" />
          <span>Visit our center with original Aadhaar & Ration Card for any government service</span>
        </div>

      </div>
    </section>
  );
};
