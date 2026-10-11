import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  MessageSquare, 
  Phone, 
  User, 
  Calendar, 
  Filter, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Edit3,
  X
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const AdminApplicationsTab = () => {
  const { applications, updateApplicationStatus, deleteApplication, resetApplications } = useApplications();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedAppForEdit, setSelectedAppForEdit] = useState(null);
  const [editingRemarks, setEditingRemarks] = useState('');
  const [editingStatus, setEditingStatus] = useState('Submitted');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Counters
  const totalCount = applications.length;
  const pendingCount = applications.filter(a => a.status === 'Submitted' || a.status === 'In Verification' || a.status === 'Under Review').length;
  const approvedCount = applications.filter(a => a.status === 'Approved' || a.status === 'Ready for Download').length;
  const completedCount = applications.filter(a => a.status === 'Completed').length;

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      (app.name && app.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.ticket_id && app.ticket_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.phone && app.phone.includes(searchQuery)) ||
      (app.selected_service && app.selected_service.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'PENDING') return app.status === 'Submitted' || app.status === 'In Verification' || app.status === 'Under Review';
    if (statusFilter === 'APPROVED') return app.status === 'Approved' || app.status === 'Ready for Download';
    if (statusFilter === 'COMPLETED') return app.status === 'Completed';
    if (statusFilter === 'REJECTED') return app.status === 'Rejected' || app.status === 'Action Required';

    return true;
  });

  const handleOpenEdit = (app) => {
    setSelectedAppForEdit(app);
    setEditingStatus(app.status);
    setEditingRemarks(app.admin_notes || '');
  };

  const handleSaveEdit = () => {
    if (!selectedAppForEdit) return;
    updateApplicationStatus(selectedAppForEdit.id, editingStatus, editingRemarks);
    setFeedbackMessage(`Application ${selectedAppForEdit.ticket_id} updated to "${editingStatus}"!`);
    setSelectedAppForEdit(null);
    setTimeout(() => setFeedbackMessage(''), 3500);
  };

  const handleDelete = (id, ticketId) => {
    if (window.confirm(`Are you sure you want to delete application "${ticketId}"?`)) {
      deleteApplication(id);
      setFeedbackMessage(`Application ${ticketId} deleted.`);
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const sendWhatsAppUpdate = (app) => {
    const cleanPhone = app.phone.replace(/\D/g, '');
    const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const message = `வணக்கம் ${app.name || 'Citizen'}! AVM E-Sevai Maiyam தகவல்:\n\n` +
      `விண்ணப்ப எண்: ${app.ticket_id}\n` +
      `சேவை: ${app.selected_service}\n` +
      `தற்போதைய நிலை: ${app.status}\n` +
      (app.admin_notes ? `குறிப்பு: ${app.admin_notes}\n\n` : '\n') +
      `விண்ணப்ப நிலையை ஆன்லைனில் சரிபார்க்க: AVM Computers E-Sevai Maiyam`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>New Submission</span>
          </span>
        );
      case 'In Verification':
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>In Verification</span>
          </span>
        );
      case 'Approved':
      case 'Ready for Download':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Approved / Ready</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Completed</span>
          </span>
        );
      case 'Rejected':
      case 'Action Required':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <AlertCircle className="w-3.5 h-3.5 text-red-700" />
            <span>Action Required</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalCount}</div>
            <div className="text-xs text-slate-500 font-medium">Total Applied</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-700">{pendingCount}</div>
            <div className="text-xs text-slate-500 font-medium">Pending Review</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-blue-700">{approvedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Approved / Ready</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{completedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Completed & Delivered</div>
          </div>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>{feedbackMessage}</span>
          <button onClick={() => setFeedbackMessage('')} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Citizen Name, Phone, or Ticket ID..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'PENDING'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('APPROVED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'APPROVED'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('COMPLETED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'COMPLETED'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApps.length === 0 ? (
          <div className="p-12 text-center bg-white border border-dashed border-slate-300 rounded-xl">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-sm">No applications found</h4>
            <p className="text-xs text-slate-400 mt-1">No certificate requests match your search or filter criteria.</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div 
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all p-4 sm:p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left Col: Ticket & Details */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-slate-900 text-amber-400 tracking-wider">
                      {app.ticket_id}
                    </span>
                    {getStatusBadge(app.status)}
                    <span className="text-[11px] text-slate-400">
                      Applied: {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>{app.name}</span>
                      <span className="text-xs font-normal text-slate-500">({app.applicant_type || 'Citizen'})</span>
                    </h3>
                    <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                      Service: <span className="text-slate-800">{app.selected_service}</span>
                    </div>
                  </div>

                  {/* Notes & Aadhaar */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="inline-flex items-center gap-1 font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Aadhaar: {app.aadhaar || 'Not provided'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <strong>{app.phone}</strong>
                    </span>
                  </div>

                  {app.notes && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 max-w-2xl leading-relaxed">
                      <strong className="text-slate-800">Citizen Note:</strong> {app.notes}
                    </div>
                  )}

                  {app.admin_notes && (
                    <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 max-w-2xl leading-relaxed">
                      <strong className="text-amber-950">Operator Remark:</strong> {app.admin_notes}
                    </div>
                  )}
                </div>

                {/* Right Col: Actions */}
                <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end lg:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                  
                  {/* WhatsApp Quick Notify Button */}
                  <button
                    onClick={() => sendWhatsAppUpdate(app)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title="Send live status update to citizen WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp Update</span>
                  </button>

                  {/* Edit Status & Remarks */}
                  <button
                    onClick={() => handleOpenEdit(app)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Change Status</span>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(app.id, app.ticket_id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Delete Application"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delete</span>
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Status Modal */}
      {selectedAppForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Update Application Status</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedAppForEdit.ticket_id} • {selectedAppForEdit.name}</p>
              </div>
              <button 
                onClick={() => setSelectedAppForEdit(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Workflow Stage</label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Submitted">1. Submitted (New Online Application)</option>
                  <option value="In Verification">2. In Verification (VAO / RI Inspection)</option>
                  <option value="Approved">3. Approved (Tahsildar Sign / Ready for Print)</option>
                  <option value="Completed">4. Completed (Delivered to Citizen)</option>
                  <option value="Action Required">5. Action Required (Document Resubmission)</option>
                  <option value="Rejected">6. Rejected</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operator Remarks / Notes</label>
                <textarea
                  rows={3}
                  value={editingRemarks}
                  onChange={(e) => setEditingRemarks(e.target.value)}
                  placeholder="e.g. Digitally signed by Tahsildar. Certificate available for physical watermark print."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedAppForEdit(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
