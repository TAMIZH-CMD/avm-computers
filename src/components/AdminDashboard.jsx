import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Check, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  ShieldCheck,
  LogOut,
  Lock,
  UserCheck,
  Layers,
  Coins,
  Bell,
  Database
} from 'lucide-react';
import { useAlerts } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';
import { useServicesAndPricing } from '../context/ServicePriceContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { AdminServicesTab } from './AdminServicesTab';
import { AdminPricingTab } from './AdminPricingTab';

export const AdminDashboard = ({ onBackToPublic }) => {
  const { alerts, addAlert, updateAlert, deleteAlert, resetAlerts } = useAlerts();
  const { currentUser, logout } = useAuth();
  const { totalServices, totalPlans } = useServicesAndPricing();

  const [activeAdminTab, setActiveAdminTab] = useState('services'); // 'services' | 'pricing' | 'alerts'

  const handleLogout = () => {
    logout();
    if (onBackToPublic) onBackToPublic();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Govt Scheme');
  const [priority, setPriority] = useState('normal');
  const [author, setAuthor] = useState(currentUser?.username ? `Manirathanam (${currentUser.username})` : 'CSC VLE Operator');
  const [date, setDate] = useState('2026-10-10');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  // Preset sample tech images for one-click selection
  const imagePresets = [
    { label: 'Government Seal / Document', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Exam / Student Form', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80' },
    { label: 'Agriculture / Farmer Welfare', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80' },
    { label: 'Ration / Citizen Camp', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Land & Property Deed', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleStartEdit = (alert) => {
    setIsEditing(true);
    setEditingId(alert.id);
    setTitle(alert.title);
    setCategory(alert.category);
    setPriority(alert.priority);
    setAuthor(alert.author || 'CSC VLE Operator');
    setDate(alert.date || '2026-10-10');
    setImageUrl(alert.imageUrl || '');
    setContent(alert.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setCategory('Govt Scheme');
    setPriority('normal');
    setAuthor('CSC VLE Operator');
    setDate('2026-10-10');
    setImageUrl('');
    setContent('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide both Title and Content text.');
      return;
    }

    const payload = {
      title: title.trim(),
      category,
      priority,
      author: author.trim(),
      date,
      imageUrl: imageUrl.trim(),
      content: content.trim()
    };

    if (isEditing && editingId) {
      updateAlert(editingId, payload);
      setSuccessMessage('Circular updated successfully! Public website updated.');
      setIsEditing(false);
      setEditingId(null);
    } else {
      addAlert(payload);
      setSuccessMessage('New announcement published live to the public News page!');
    }

    clearForm();
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleDelete = (id, alertTitle) => {
    if (window.confirm(`Are you sure you want to delete "${alertTitle}"?`)) {
      deleteAlert(id);
      if (editingId === id) handleCancelEdit();
      setSuccessMessage('Item deleted.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset announcements to default government circulars?')) {
      resetAlerts();
      clearForm();
      setIsEditing(false);
      setSuccessMessage('Reset to sample feed successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div className="flex items-start gap-3.5">
            <img 
              src="/logo.jpg" 
              alt="AVM Computers" 
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-md shrink-0" 
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                  Operator Dashboard
                </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Lock className="w-3 h-3 text-emerald-700" />
                <span>256-Bit Encrypted Session</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <UserCheck className="w-3 h-3 text-slate-600" />
                <span>Logged in as: <strong className="font-bold text-slate-900">{currentUser?.username || 'manirathanam'}</strong></span>
              </span>
              {isSupabaseConfigured() ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                  <Database className="w-3 h-3 text-sky-600" />
                  <span>Supabase Cloud: Connected</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  <Database className="w-3 h-3 text-slate-500" />
                  <span>Local Storage Mode</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              AVM E-Sevai Central Administration Suite
            </h1>
            <p className="text-xs text-slate-500">
              Manage live citizen e-Services, transparent fee structures, and public circulars. Changes update the public website immediately.
            </p>
          </div>
        </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeAdminTab === 'alerts' && (
              <button
                onClick={handleResetData}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Restore standard sample announcements"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Alerts</span>
              </button>
            )}

            <button
              onClick={onBackToPublic}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>View Public Portal</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Lock Admin Portal and Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>Lock & Sign Out</span>
            </button>
          </div>
        </div>

        {/* Master Admin Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 text-xs">
          <button
            type="button"
            onClick={() => setActiveAdminTab('services')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeAdminTab === 'services'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage E-Services Catalog</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeAdminTab === 'services' ? 'bg-emerald-800 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              {totalServices}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab('pricing')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeAdminTab === 'pricing'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Manage Prices & Govt Fees</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeAdminTab === 'pricing' ? 'bg-emerald-800 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              {totalPlans}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab('alerts')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeAdminTab === 'alerts'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Circulars & News Alerts</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeAdminTab === 'alerts' ? 'bg-emerald-800 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              {alerts.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Services Catalog */}
        {activeAdminTab === 'services' && <AdminServicesTab />}

        {/* Tab 2: Pricing & Rates */}
        {activeAdminTab === 'pricing' && <AdminPricingTab />}

        {/* Tab 3: Circulars & Alerts */}
        {activeAdminTab === 'alerts' && (
          <div className="space-y-6">
            {/* Success Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700">Live in LocalStorage</span>
              </div>
            )}

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total Circulars</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{alerts.length}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Urgent Deadlines</span>
            <p className="text-xl font-bold text-red-600 mt-0.5">
              {alerts.filter(a => a.priority === 'high').length}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Public Feed Sync</span>
            <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Real-time State & LocalStorage
            </p>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                {isEditing ? <Edit3 className="w-4 h-4 text-amber-600" /> : <Plus className="w-4 h-4 text-emerald-700" />}
                <span>{isEditing ? 'Edit Circular Notice' : 'Publish New Circular Notice'}</span>
              </h3>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              
              {/* Title */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Circular Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Free Aadhaar Document Update Deadline"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 placeholder-slate-400"
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Urgent Alert">🚨 Urgent Alert</option>
                    <option value="Govt Scheme">📜 Govt Scheme</option>
                    <option value="Shop Announcement">📢 Center Notice</option>
                    <option value="Tech Tip">💡 Citizen Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="normal">Normal Notice</option>
                    <option value="high">Urgent / Red Banner</option>
                  </select>
                </div>
              </div>

              {/* Author & Date */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Desk / Operator</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Image Upload & Presets */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Circular Image (Upload from Gallery / Files)
                </label>

                {/* File Upload Zone */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
                    imageUrl
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/30'
                  }`}
                  onClick={() => document.getElementById('admin-image-upload').click()}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50'); }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50'); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50');
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setImageUrl(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                >
                  <input
                    id="admin-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setImageUrl(ev.target.result);
                        reader.readAsDataURL(file);
                      }
                      e.target.value = '';
                    }}
                  />

                  {imageUrl ? (
                    <div className="space-y-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="max-h-36 mx-auto rounded-lg shadow-sm object-cover border border-slate-200"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Image attached
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setImageUrl(''); }}
                          className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 font-semibold hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); document.getElementById('admin-image-upload').click(); }}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold hover:bg-slate-200 transition-colors"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 space-y-1.5">
                      <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        Tap to upload from Gallery / Files
                      </p>
                      <p className="text-[10px] text-slate-400">
                        or drag & drop an image here • JPG, PNG, WebP supported
                      </p>
                    </div>
                  )}
                </div>

                {/* Preset Quick Images (alternative) */}
                <div className="mt-2">
                  <span className="text-[10px] font-semibold text-slate-500 block mb-1">Or use a quick preset image:</span>
                  <div className="flex flex-wrap gap-1">
                    {imagePresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                          imageUrl === preset.url
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Circular Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Official instructions, documents required, and last date..."
                  className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 leading-relaxed text-xs resize-y"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                  isEditing
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Publish Notice Live'}</span>
              </button>

            </form>
          </div>

          {/* Right Column: Existing Items List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                Published Notices ({alerts.length})
              </h3>
              <span className="text-xs text-slate-500">Edit or Delete anytime</span>
            </div>

            <div className="space-y-2.5">
              {alerts.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border bg-white flex flex-col sm:flex-row items-start justify-between gap-3 shadow-sm ${
                    editingId === item.id
                      ? 'border-amber-500 ring-1 ring-amber-300'
                      : item.priority === 'high'
                      ? 'border-red-300 bg-red-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-slate-100 border border-slate-200 hidden sm:block"
                      />
                    )}

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                            item.priority === 'high'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.date}</span>
                        <span className="text-[11px] text-slate-400">• {item.author}</span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
          </div>
        )}

      </div>
    </div>
  );
};
