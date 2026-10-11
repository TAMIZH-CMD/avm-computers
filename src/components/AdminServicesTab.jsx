import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Check, 
  Layers, 
  Search, 
  Clock, 
  Sparkles,
  FileText,
  Landmark,
  CreditCard,
  BadgeCheck,
  HandHelping,
  GraduationCap
} from 'lucide-react';
import { useServicesAndPricing } from '../context/ServicePriceContext';

const iconMap = {
  FileText,
  Landmark,
  CreditCard,
  BadgeCheck,
  HandHelping,
  GraduationCap,
  Sparkles
};

export const AdminServicesTab = () => {
  const { services, addService, updateService, deleteService, resetServices } = useServicesAndPricing();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [tamilTitle, setTamilTitle] = useState('');
  const [category, setCategory] = useState('Government Certificates');
  const [turnaround, setTurnaround] = useState('3 - 7 Working Days');
  const [govtFee, setGovtFee] = useState('₹60 Govt Fee');
  const [priceStarting, setPriceStarting] = useState('₹100');
  const [icon, setIcon] = useState('FileText');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [documentsRequired, setDocumentsRequired] = useState('');
  const [popular, setPopular] = useState(false);

  // Quick Preset Samples
  const servicePresets = [
    {
      title: 'Passport Seva (Fresh / Renewal)',
      tamilTitle: 'பாஸ்போர்ட் புதியது / புதுப்பித்தல்',
      category: 'Citizen ID Services',
      turnaround: '2 - 4 Days Appointment',
      govtFee: '₹1,500 Govt Fee',
      priceStarting: '₹150',
      icon: 'BadgeCheck',
      description: 'End-to-end online passport application filing, appointment scheduling at nearest PSK/POPSK, and document upload.',
      features: 'Fresh & Reissue Passport Form 1\nAppointment Slot Booking at PSK\nAnnexure & Affidavits Preparation\nPolice Verification Guidance',
      documentsRequired: 'Aadhaar Card, 10th/12th Marksheet, Voter ID or Bank Passbook, 2 Photos',
      popular: true
    },
    {
      title: 'TNEB Electricity Bill Name Transfer',
      tamilTitle: 'மின் இணைப்பு பெயர் மாற்றம் (TANGEDCO)',
      category: 'Civil Supplies',
      turnaround: '7 - 14 Days',
      govtFee: 'Official TNEB Rates',
      priceStarting: '₹120',
      icon: 'Sparkles',
      description: 'Online application for consumer ownership name transfer in TANGEDCO EB service connections after property purchase.',
      features: 'Online Ownership Shift Filing\nProperty Tax & Patta Document Upload\nChallan Payment Verification\nJunior Engineer Inspection Follow-up',
      documentsRequired: 'Latest EB Bill Receipt, Property Sale Deed copy, Patta Copy, Aadhaar Card',
      popular: false
    },
    {
      title: 'EPFO PF Claim & UAN KYC Linking',
      tamilTitle: 'பிஎஃப் பணம் திரும்பப் பெறுதல் (EPFO)',
      category: 'Citizen Welfare',
      turnaround: '3 - 7 Working Days',
      govtFee: '₹0 (Free Portal)',
      priceStarting: '₹150',
      icon: 'HandHelping',
      description: 'Complete provident fund withdrawal (Form 19, 10C, 31 Advance), pension claims, and Aadhaar-Bank KYC linking.',
      features: 'UAN Member Portal Activation\nAadhaar & Bank Account KYC Approval\nPF Advance & Final Settlement Claim\nOnline Claim Tracking to Credit',
      documentsRequired: 'UAN Number, Aadhaar linked Mobile OTP, Bank Cancelled Cheque / Passbook',
      popular: true
    }
  ];

  const handleApplyPreset = (preset) => {
    setTitle(preset.title);
    setTamilTitle(preset.tamilTitle);
    setCategory(preset.category);
    setTurnaround(preset.turnaround);
    setGovtFee(preset.govtFee);
    setPriceStarting(preset.priceStarting);
    setIcon(preset.icon);
    setDescription(preset.description);
    setFeatures(preset.features);
    setDocumentsRequired(preset.documentsRequired);
    setPopular(preset.popular);
  };

  const handleStartEdit = (service) => {
    setIsEditing(true);
    setEditingId(service.id);
    setTitle(service.title || '');
    setTamilTitle(service.tamilTitle || '');
    setCategory(service.category || 'Government Certificates');
    setTurnaround(service.turnaround || '3 - 7 Working Days');
    setGovtFee(service.govtFee || '₹60 Govt Fee');
    setPriceStarting(service.priceStarting || '₹100');
    setIcon(service.icon || 'FileText');
    setDescription(service.description || '');
    setFeatures(Array.isArray(service.features) ? service.features.join('\n') : (service.features || ''));
    setDocumentsRequired(service.documentsRequired || '');
    setPopular(!!service.popular);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setTamilTitle('');
    setCategory('Government Certificates');
    setTurnaround('3 - 7 Working Days');
    setGovtFee('₹60 Govt Fee');
    setPriceStarting('₹100');
    setIcon('FileText');
    setDescription('');
    setFeatures('');
    setDocumentsRequired('');
    setPopular(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide at least a Service Title and Description.');
      return;
    }

    const payload = {
      title: title.trim(),
      tamilTitle: tamilTitle.trim() || title.trim(),
      category,
      turnaround: turnaround.trim(),
      govtFee: govtFee.trim(),
      priceStarting: priceStarting.trim(),
      icon,
      description: description.trim(),
      features: features.trim(),
      documentsRequired: documentsRequired.trim(),
      popular
    };

    if (isEditing && editingId) {
      updateService(editingId, payload);
      setSuccessMessage('Service updated successfully! Live website catalog updated.');
      setIsEditing(false);
      setEditingId(null);
    } else {
      addService(payload);
      setSuccessMessage('New Service published live to public Services section and Booking Form!');
    }

    clearForm();
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleDelete = (id, serviceTitle) => {
    if (window.confirm(`Are you sure you want to delete "${serviceTitle}" from the public catalog?`)) {
      deleteService(id);
      if (editingId === id) handleCancelEdit();
      setSuccessMessage('Service removed.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Restore official default e-Sevai & CSC services list?')) {
      resetServices();
      clearForm();
      setIsEditing(false);
      setSuccessMessage('Services catalog restored to default.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const filteredServicesList = services.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (s.title || '').toLowerCase().includes(q) ||
      (s.tamilTitle || '').toLowerCase().includes(q) ||
      (s.category || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Top Controls & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <span>E-Sevai & CSC Services Catalog Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Add new government schemes, certificate applications, or ID services. Changes update the public website & booking form in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Restore original standard services"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Default Services</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
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
          <span className="text-xs text-slate-500 font-medium">Active Services Catalog</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{services.length}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Featured / Popular</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">
            {services.filter(s => s.popular).length}
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Service Categories</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">
            {new Set(services.map(s => s.category)).size}
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
              <span>{isEditing ? 'Edit Service Details' : 'Add New E-Sevai Service'}</span>
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

          {/* Quick Preset Buttons for Admin */}
          {!isEditing && (
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 block">⚡ Quick 1-Click Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                {servicePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="text-[10px] font-semibold bg-white border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    + {preset.title.split(' ')[0]} {preset.title.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            
            {/* Title (English) */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                Service Title (English) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Passport Seva (Fresh / Renewal)"
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
                required
              />
            </div>

            {/* Title (Tamil) */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                Tamil Title (தமிழ் பெயர்)
              </label>
              <input
                type="text"
                value={tamilTitle}
                onChange={(e) => setTamilTitle(e.target.value)}
                placeholder="e.g. பாஸ்போர்ட் புதியது / புதுப்பித்தல்"
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Category & Icon */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Government Certificates">Government Certificates</option>
                  <option value="Revenue & Land">Revenue & Land</option>
                  <option value="Civil Supplies">Civil Supplies</option>
                  <option value="Citizen ID Services">Citizen ID Services</option>
                  <option value="Citizen Welfare">Citizen Welfare</option>
                  <option value="Student & Employment">Student & Employment</option>
                  <option value="Commercial & Business">Commercial & Business</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Display Icon</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="FileText">FileText (Certificates)</option>
                  <option value="Landmark">Landmark (Land & Revenue)</option>
                  <option value="CreditCard">CreditCard (Ration/Cards)</option>
                  <option value="BadgeCheck">BadgeCheck (PAN/Aadhaar/ID)</option>
                  <option value="HandHelping">HandHelping (Welfare/Pension)</option>
                  <option value="GraduationCap">GraduationCap (Exams/Students)</option>
                  <option value="Sparkles">Sparkles (Special/Utility)</option>
                </select>
              </div>
            </div>

            {/* Govt Fee & Service Charge */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Govt Portal Fee</label>
                <input
                  type="text"
                  value={govtFee}
                  onChange={(e) => setGovtFee(e.target.value)}
                  placeholder="e.g. ₹60 Govt Fee"
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Service Charge</label>
                <input
                  type="text"
                  value={priceStarting}
                  onChange={(e) => setPriceStarting(e.target.value)}
                  placeholder="e.g. ₹100"
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono font-bold text-emerald-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Turnaround</label>
                <input
                  type="text"
                  value={turnaround}
                  onChange={(e) => setTurnaround(e.target.value)}
                  placeholder="e.g. 3 - 7 Days"
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                Detailed Service Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what the service is, why citizens need it, and how it is processed..."
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 leading-relaxed"
                required
              />
            </div>

            {/* Features (One per line) */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center justify-between">
                <span>Key Sub-Services / Features</span>
                <span className="text-[10px] text-slate-400 font-normal">One item per line</span>
              </label>
              <textarea
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Feature 1 (e.g. Online e-challan payment)&#10;Feature 2 (e.g. Document scanning & resize)&#10;Feature 3 (e.g. Watermarked printout)"
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono text-[11px]"
              />
            </div>

            {/* Documents Required */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                Mandatory Documents Required
              </label>
              <input
                type="text"
                value={documentsRequired}
                onChange={(e) => setDocumentsRequired(e.target.value)}
                placeholder="e.g. Aadhaar Card, Smart Ration Card, Photo, TC"
                className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Popular Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span className="font-semibold text-slate-800">
                  Highlight as Popular Service (பிரபல சேவை)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isEditing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isEditing ? 'Save Changes & Update Public Catalog' : 'Publish New E-Service Now'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Services List Column */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Published Services ({filteredServicesList.length})
              </h3>
              <span className="text-xs text-slate-500">Live in citizen portal and booking modal</span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter services..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 w-full sm:w-48"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredServicesList.map((service) => {
              const IconComp = iconMap[service.icon] || FileText;
              return (
                <div
                  key={service.id}
                  className={`p-4 rounded-xl border bg-white flex flex-col sm:flex-row items-start justify-between gap-3 shadow-sm transition-all ${
                    editingId === service.id
                      ? 'border-amber-500 ring-1 ring-amber-300'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Popular
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded">
                          {service.priceStarting}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <span>{service.title}</span>
                      </h4>
                      <p className="text-[11px] text-emerald-900 font-medium">
                        {service.tamilTitle}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-0.5">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{service.turnaround}</span>
                        </span>
                        <span>•</span>
                        <span>Govt Fee: <strong>{service.govtFee}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleStartEdit(service)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(service.id, service.title)}
                      className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredServicesList.length === 0 && (
              <div className="p-8 text-center bg-white border border-dashed border-slate-300 rounded-xl text-slate-500 text-xs">
                No services found matching "{searchQuery}".
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
