import React, { useState } from 'react';
import { Check, ArrowRight, AlertCircle } from 'lucide-react';
import { useServicesAndPricing } from '../context/ServicePriceContext';

export const Pricing = ({ onSelectPlan }) => {
  const { pricingPlans, businessPlans } = useServicesAndPricing();
  const [activeTab, setActiveTab] = useState('consumer');

  return (
    <section id="pricing" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Govt Prescribed Rates
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transparent Government & Service Fees
          </h2>

          <p className="text-slate-600 text-sm">
            Official Government portal fees + nominal operator scanning and uploading charges. Official e-Challan receipt provided.
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-lg bg-slate-200 border border-slate-300 mt-2">
            <button
              onClick={() => setActiveTab('consumer')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'consumer'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Citizen Certificates (சான்றிதழ்கள்)
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'business'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business & Legal Drafting
            </button>
          </div>
        </div>

        {/* Consumer Cards Grid */}
        {activeTab === 'consumer' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl bg-white p-5 border flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-800">
                      {plan.tamilService}
                    </span>
                    {plan.badge && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{plan.service}</h3>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-black text-emerald-800">{plan.price}</span>
                    <span className="text-xs font-semibold text-slate-500">({plan.time})</span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100">{plan.note}</p>

                  {/* Checklist */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {plan.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      plan.popular
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Apply for {plan.price}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Commercial Plans */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {businessPlans.map((plan, index) => (
              <div
                key={plan.id || index}
                className="rounded-xl bg-white p-6 border border-slate-200 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{plan.title}</h3>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Authorized
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black text-emerald-800">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-semibold">{plan.period}</span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                    🎯 For: {plan.target}
                  </p>

                  <div className="space-y-2">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan({ service: `${plan.title} (${plan.price})` })}
                  className="w-full mt-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-sm"
                >
                  Apply Commercial Service
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Guarantee Banner */}
        <div className="mt-8 rounded-lg bg-white border border-slate-200 p-3.5 max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-slate-700 text-center sm:text-left shadow-sm">
          <AlertCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>
            <strong>Official Receipt Guarantee:</strong> An official Government portal e-challan / payment receipt is handed over to you immediately upon application submission.
          </span>
        </div>

      </div>
    </section>
  );
};
