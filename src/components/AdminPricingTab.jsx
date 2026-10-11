import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Check, 
  Clock, 
  Sparkles,
  Coins
} from 'lucide-react';
import { useServicesAndPricing } from '../context/ServicePriceContext';

export const AdminPricingTab = () => {
  const { 
    pricingPlans, 
    addPricingPlan, 
    updatePricingPlan, 
    deletePricingPlan, 
    resetPricingPlans,
    businessPlans,
    addBusinessPlan,
    updateBusinessPlan,
    deleteBusinessPlan,
    resetBusinessPlans
  } = useServicesAndPricing();

  const [activeTab, setActiveTab] = useState('consumer'); // 'consumer' | 'business'
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Consumer Form State
  const [serviceName, setServiceName] = useState('');
  const [tamilService, setTamilService] = useState('');
  const [price, setPrice] = useState('₹100');
  const [note, setNote] = useState('Includes official ₹60 Govt portal fee + operator scanning & uploading');
  const [time, setTime] = useState('3 - 7 Days');
  const [badge, setBadge] = useState('Official e-District');
  const [popular, setPopular] = useState(false);
  const [includesText, setIncludesText] = useState('');

  // Business Form State
  const [bizTitle, setBizTitle] = useState('');
  const [bizPrice, setBizPrice] = useState('₹499');
  const [bizPeriod, setBizPeriod] = useState('one-time');
  const [bizTarget, setBizTarget] = useState('New shop owners, small traders & self-employed');
  const [bizFeaturesText, setBizFeaturesText] = useState('');

  // Presets
  const pricingPresets = [
    {
      type: 'consumer',
      service: 'First Graduate Certificate (முதல் பட்டதாரி)',
      tamilService: 'முதல் பட்டதாரி சான்றிதழ்',
      price: '₹120',
      note: 'Includes official ₹60 Govt fee + applicant proof validation',
      time: '3 - 7 Days',
      badge: 'Students Quota',
      popular: true,
      includes: 'TNeGA Revenue Department official submission\nFather/Mother 10th/12th school certificate check\nJoint declaration certificate drafting\nWatermarked Tahsildar approved certificate download'
    },
    {
      type: 'consumer',
      service: 'Aadhaar HD Waterproof PVC Smart Card Print',
      tamilService: 'ஆதார் பிவிசி ஸ்மார்ட் கார்டு அச்சிடுதல்',
      price: '₹50',
      note: 'Ultra-durable, waterproof plastic PVC card with official QR',
      time: 'Instant (5 Mins)',
      badge: 'Instant Print',
      popular: false,
      includes: 'Official UIDAI encrypted XML verification\nDual-sided 300DPI UV thermal card printing\nHigh durability scratch-proof coating\nLanyard and protective card pouch included'
    },
    {
      type: 'business',
      title: 'GST Registration & 3-Month Filing Pack',
      price: '₹999',
      period: 'package',
      target: 'Retailers, wholesalers, e-commerce sellers & contractors',
      features: 'GST Portal New Registration & ARN generation\nPrincipal place of business verification\nDigital Signature / Aadhaar OTP verification\nFirst 3 months GSTR-1 & 3B nil/sales return guidance'
    }
  ];

  const handleApplyPreset = (preset) => {
    if (preset.type === 'consumer') {
      setActiveTab('consumer');
      setServiceName(preset.service);
      setTamilService(preset.tamilService);
      setPrice(preset.price);
      setNote(preset.note);
      setTime(preset.time);
      setBadge(preset.badge);
      setPopular(preset.popular);
      setIncludesText(preset.includes);
    } else {
      setActiveTab('business');
      setBizTitle(preset.title);
      setBizPrice(preset.price);
      setBizPeriod(preset.period);
      setBizTarget(preset.target);
      setBizFeaturesText(preset.features);
    }
  };

  const handleStartEdit = (plan, type) => {
    setIsEditing(true);
    setEditingId(plan.id);
    setActiveTab(type);

    if (type === 'consumer') {
      setServiceName(plan.service || '');
      setTamilService(plan.tamilService || '');
      setPrice(plan.price || '₹100');
      setNote(plan.note || '');
      setTime(plan.time || '3 - 7 Days');
      setBadge(plan.badge || 'Official e-District');
      setPopular(!!plan.popular);
      setIncludesText(Array.isArray(plan.includes) ? plan.includes.join('\n') : (plan.includes || ''));
    } else {
      setBizTitle(plan.title || '');
      setBizPrice(plan.price || '₹499');
      setBizPeriod(plan.period || 'one-time');
      setBizTarget(plan.target || '');
      setBizFeaturesText(Array.isArray(plan.features) ? plan.features.join('\n') : (plan.features || ''));
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    clearForm();
  };

  const clearForm = () => {
    setServiceName('');
    setTamilService('');
    setPrice('₹100');
    setNote('Includes official ₹60 Govt portal fee + operator scanning & uploading');
    setTime('3 - 7 Days');
    setBadge('Official e-District');
    setPopular(false);
    setIncludesText('');

    setBizTitle('');
    setBizPrice('₹499');
    setBizPeriod('one-time');
    setBizTarget('New shop owners, small traders & self-employed');
    setBizFeaturesText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === 'consumer') {
      if (!serviceName.trim() || !price.trim()) {
        alert('Please enter both Service Name and Price.');
        return;
      }

      const payload = {
        service: serviceName.trim(),
        tamilService: tamilService.trim() || serviceName.trim(),
        price: price.trim(),
        note: note.trim(),
        time: time.trim(),
        badge: badge.trim(),
        popular,
        includes: includesText.trim()
      };

      if (isEditing && editingId) {
        updatePricingPlan(editingId, payload);
        setSuccessMessage('Pricing plan updated successfully! Live website rates updated.');
        setIsEditing(false);
        setEditingId(null);
      } else {
        addPricingPlan(payload);
        setSuccessMessage('New Pricing plan published live to citizen pricing table!');
      }
    } else {
      // Business
      if (!bizTitle.trim() || !bizPrice.trim()) {
        alert('Please enter Plan Title and Price.');
        return;
      }

      const payload = {
        title: bizTitle.trim(),
        price: bizPrice.trim(),
        period: bizPeriod.trim(),
        target: bizTarget.trim(),
        features: bizFeaturesText.trim()
      };

      if (isEditing && editingId) {
        updateBusinessPlan(editingId, payload);
        setSuccessMessage('Business Plan updated successfully!');
        setIsEditing(false);
        setEditingId(null);
      } else {
        addBusinessPlan(payload);
        setSuccessMessage('New Business Plan published live to website!');
      }
    }

    clearForm();
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleDelete = (id, title, type) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      if (type === 'consumer') {
        deletePricingPlan(id);
      } else {
        deleteBusinessPlan(id);
      }
      if (editingId === id) handleCancelEdit();
      setSuccessMessage('Plan removed.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Restore standard government pricing and commercial plans?')) {
      resetPricingPlans();
      resetBusinessPlans();
      clearForm();
      setIsEditing(false);
      setSuccessMessage('Pricing plans restored to official defaults.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-700" />
            <span>Govt Fee & Service Rates Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Configure citizen service prices, government challan breakdowns, and commercial documentation rates. Changes reflect instantly on the public website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Restore original standard pricing"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Default Rates</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-700">Live in LocalStorage</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Citizen Service Plans</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{pricingPlans.length}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Business & Drafting Plans</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{businessPlans.length}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Popular Flagged Plans</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">
            {pricingPlans.filter(p => p.popular).length}
          </p>
        </div>
      </div>

      {/* Main 2-Column: Left Form, Right List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              {isEditing ? <Edit3 className="w-4 h-4 text-amber-600" /> : <Plus className="w-4 h-4 text-emerald-700" />}
              <span>{isEditing ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}</span>
            </h3>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* Plan Type Selector Tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('consumer')}
              className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
                activeTab === 'consumer'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Citizen Certificates
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
                activeTab === 'business'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business & Legal
            </button>
          </div>

          {/* Quick Preset Templates */}
          {!isEditing && (
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 block">⚡ Quick Rate Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                {pricingPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="text-[10px] font-semibold bg-white border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    + {preset.service ? preset.service.split(' ')[0] : preset.title.split(' ')[0]} ({preset.price})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            
            {activeTab === 'consumer' ? (
              <>
                {/* Consumer Form Fields */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Service / Certificate Name *
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. First Graduate Certificate"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Tamil Title (தமிழ் பெயர்)
                  </label>
                  <input
                    type="text"
                    value={tamilService}
                    onChange={(e) => setTamilService(e.target.value)}
                    placeholder="e.g. முதல் பட்டதாரி சான்றிதழ்"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Price (கட்டணம்) *</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. ₹100"
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono font-bold text-emerald-800"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Turnaround Time</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 3 - 7 Days"
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Badge / Category Tag</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Official e-District / Popular / Instant Print"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Fee Breakdown Note (விளக்கக்குறிப்பு)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Includes official ₹60 Govt portal fee + operator scanning"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span>What's Included in this Fee</span>
                    <span className="text-[10px] text-slate-400 font-normal">One item per line</span>
                  </label>
                  <textarea
                    rows={4}
                    value={includesText}
                    onChange={(e) => setIncludesText(e.target.value)}
                    placeholder="Official portal application submission&#10;Document scanning & resizing&#10;Tracking number sent to mobile&#10;Approved certificate watermarked printout"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono text-[11px]"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={popular}
                      onChange={(e) => setPopular(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                    />
                    <span className="font-semibold text-slate-800">
                      Highlight as Featured / Most Popular Plan
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <>
                {/* Business Form Fields */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Business Plan Title *
                  </label>
                  <input
                    type="text"
                    value={bizTitle}
                    onChange={(e) => setBizTitle(e.target.value)}
                    placeholder="e.g. Rental Agreement Drafting & e-Stamping"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Price *</label>
                    <input
                      type="text"
                      value={bizPrice}
                      onChange={(e) => setBizPrice(e.target.value)}
                      placeholder="e.g. ₹350"
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono font-bold text-emerald-800"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Billing Period</label>
                    <input
                      type="text"
                      value={bizPeriod}
                      onChange={(e) => setBizPeriod(e.target.value)}
                      placeholder="e.g. per document / one-time"
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Target Audience</label>
                  <input
                    type="text"
                    value={bizTarget}
                    onChange={(e) => setBizTarget(e.target.value)}
                    placeholder="e.g. Tenants, landlords, vehicle sales & affidavits"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span>Included Scope & Services</span>
                    <span className="text-[10px] text-slate-400 font-normal">One item per line</span>
                  </label>
                  <textarea
                    rows={4}
                    value={bizFeaturesText}
                    onChange={(e) => setBizFeaturesText(e.target.value)}
                    placeholder="Stamp Paper procurement assistance&#10;Custom agreement clause drafting&#10;Notary public attestation guidance"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono text-[11px]"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isEditing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isEditing ? 'Save Changes & Update Rates' : 'Publish New Pricing Plan'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Pricing List Column */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Active Pricing Rates ({activeTab === 'consumer' ? pricingPlans.length : businessPlans.length})
              </h3>
              <span className="text-xs text-slate-500">
                Shown under {activeTab === 'consumer' ? 'Citizen Certificates tab' : 'Business & Legal Drafting tab'}
              </span>
            </div>

            <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('consumer')}
                className={`px-3 py-1 rounded-md font-semibold ${
                  activeTab === 'consumer' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                Citizen ({pricingPlans.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('business')}
                className={`px-3 py-1 rounded-md font-semibold ${
                  activeTab === 'business' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                Business ({businessPlans.length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {activeTab === 'consumer' ? (
              // Consumer Plans
              pricingPlans.map((plan, index) => (
                <div
                  key={plan.id || index}
                  className={`p-4 rounded-xl border bg-white flex flex-col sm:flex-row items-start justify-between gap-3 shadow-sm transition-all ${
                    editingId === plan.id
                      ? 'border-amber-500 ring-1 ring-amber-300'
                      : plan.popular
                      ? 'border-emerald-400 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-black text-emerald-800 font-mono">
                        {plan.price}
                      </span>
                      {plan.badge && (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {plan.badge}
                        </span>
                      )}
                      {plan.popular && (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5" /> Popular
                        </span>
                      )}
                      {plan.time && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{plan.time}</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs text-slate-900">{plan.service}</h4>
                    {plan.tamilService && (
                      <p className="text-[11px] text-emerald-900 font-medium">
                        {plan.tamilService}
                      </p>
                    )}

                    {plan.note && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                        {plan.note}
                      </p>
                    )}

                    {plan.includes && (
                      <div className="pt-1 text-[11px] text-slate-600 space-y-0.5">
                        <span className="font-semibold text-slate-700 block">Includes:</span>
                        {(Array.isArray(plan.includes) ? plan.includes : [plan.includes]).slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleStartEdit(plan, 'consumer')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(plan.id, plan.service, 'consumer')}
                      className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Business Plans
              businessPlans.map((plan, index) => (
                <div
                  key={plan.id || index}
                  className={`p-4 rounded-xl border bg-white flex flex-col sm:flex-row items-start justify-between gap-3 shadow-sm transition-all ${
                    editingId === plan.id
                      ? 'border-amber-500 ring-1 ring-amber-300'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-emerald-800 font-mono">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">{plan.title}</h4>
                    <p className="text-xs text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                      🎯 Target: {plan.target}
                    </p>

                    {plan.features && (
                      <div className="pt-1 text-[11px] text-slate-600 space-y-0.5">
                        <span className="font-semibold text-slate-700 block">Features:</span>
                        {(Array.isArray(plan.features) ? plan.features : [plan.features]).slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleStartEdit(plan, 'business')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(plan.id, plan.title, 'business')}
                      className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
