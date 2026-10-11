import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: "S. Murugesan",
      role: "Farmer, Melur",
      rating: 5,
      review: "I needed my Patta copy and FMB field sketch urgently for crop loan approval. The operator at AVM E-Sevai downloaded and printed the digitally signed copy in just 5 minutes. Very helpful and polite service.",
      tag: "Patta & Chitta Record"
    },
    {
      name: "Anitha Venkatesh",
      role: "Engineering Student",
      rating: 5,
      review: "Applied for First Graduate Certificate and Income Certificate for TNEA college counselling. Both certificates were verified by VAO and approved by Tahsildar within 4 days. Zero hassle!",
      tag: "First Graduate Certificate"
    },
    {
      name: "R. Balakrishnan",
      role: "Shopkeeper",
      rating: 5,
      review: "We had to add our newborn baby's name to our Smart Ration Card and update address. They uploaded the birth proof to the TNEPDS portal cleanly, and we got our updated card approved in a week.",
      tag: "Smart Ration Card"
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Citizen Reviews
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Citizens & Students
          </h2>

          <p className="text-slate-600 text-sm">
            Read how we help local families, students, and farmers get their government documents fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {r.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  "{r.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{r.name}</h4>
                  <p className="text-[11px] text-slate-500">{r.role}</p>
                </div>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
