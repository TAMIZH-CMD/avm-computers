import React, { useState } from 'react';
import { 
  Search, 
  X, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileCheck2
} from 'lucide-react';
import { SAMPLE_TICKETS } from '../data/faqData';
import { useApplications } from '../context/ApplicationContext';

export const RepairTracker = ({ isOpen, onClose }) => {
  const { getApplicationByTicketId } = useApplications();
  const [ticketInput, setTicketInput] = useState('TN-520241014');
  const [ticketData, setTicketData] = useState(SAMPLE_TICKETS['TN-520241014']);
  const [hasSearched, setHasSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = ticketInput.trim().toUpperCase();

    // Check live applied certificates first
    const liveApp = getApplicationByTicketId(query);
    if (liveApp) {
      const step = liveApp.step || 1;
      setTicketData({
        ticketId: liveApp.ticket_id,
        customerName: liveApp.name,
        device: liveApp.selected_service,
        issue: liveApp.notes || 'Certificate Application via AVM E-Sevai Maiyam',
        status: liveApp.status,
        step: step,
        estimatedCost: 'Govt Fees Incl.',
        dateReceived: new Date(liveApp.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        technician: 'AVM Computers e-District Operator Desk',
        history: [
          { step: 1, label: 'E-Sevai Portal Submission', completed: step >= 1, timestamp: 'Received', note: 'Application submitted with citizen details.' },
          { step: 2, label: 'VAO / Field Verification', completed: step >= 2, timestamp: step >= 2 ? 'Completed' : 'In Progress', note: liveApp.admin_notes || 'Verification of documents and revenue records.' },
          { step: 3, label: 'Revenue Inspector (RI) Review', completed: step >= 3, timestamp: step >= 3 ? 'Completed' : 'Pending', note: 'Review and recommendation for final digital seal.' },
          { step: 4, label: 'Tahsildar Digital Sign & Watermark Print', completed: step >= 4, timestamp: step >= 4 ? 'Ready' : 'Pending', note: 'Signed certificate ready for download and physical handover.' }
        ]
      });
      setHasSearched(true);
      return;
    }

    if (SAMPLE_TICKETS[query]) {
      setTicketData(SAMPLE_TICKETS[query]);
      setHasSearched(true);
    } else {
      setTicketData(null);
      setHasSearched(true);
    }
  };

  const sampleCodes = ['TN-520241014', 'TNEPDS-84920', 'PAN-90214'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Live E-Sevai Application Status Tracker</h3>
              <p className="text-[11px] text-slate-500">Track TNeGA Revenue Certificate, Patta, Ration & PAN status</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-slate-800 font-bold text-xs">
              Enter Application Number / CAN Number:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="e.g. TN-520241014"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-emerald-600 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                Track Status
              </button>
            </div>

            {/* Quick Demo Chips */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500">
              <span>Try sample numbers:</span>
              {sampleCodes.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setTicketInput(code);
                    setTicketData(SAMPLE_TICKETS[code]);
                  }}
                  className={`px-2 py-0.5 rounded font-mono border text-[11px] transition-colors ${
                    ticketInput === code
                      ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </form>

          {/* Result view */}
          {ticketData ? (
            <div className="space-y-4">
              
              {/* Ticket Summary Card */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Application Type</span>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-700" />
                      {ticketData.device}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">{ticketData.issue}</p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Portal Stage</span>
                    <div className="inline-block mt-0.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {ticketData.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Application No</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">{ticketData.ticketId}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Applicant Name</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{ticketData.customerName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Date Submitted</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{ticketData.dateReceived}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Challan Fee</span>
                    <p className="font-bold text-emerald-700 mt-0.5">{ticketData.estimatedCost}</p>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-2.5">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Verification Pipeline:
                </h5>

                <div className="space-y-2 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                  {ticketData.history.map((h, i) => (
                    <div key={i} className="relative flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold ${
                          h.completed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {h.completed ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                      </div>

                      <div className="flex-1 p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5 shadow-sm">
                        <div className="flex justify-between items-center">
                          <h6 className="font-bold text-slate-900 text-xs">{h.label}</h6>
                          <span className="text-[10px] text-slate-400 font-medium">{h.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600">{h.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : hasSearched ? (
            <div className="p-6 text-center rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <AlertCircle className="w-7 h-7 text-amber-500 mx-auto" />
              <h5 className="font-bold text-slate-900 text-xs">Application Record Not Found</h5>
              <p className="text-xs text-slate-500">
                Please verify the application number printed on your TNeGA e-challan receipt, or message us on WhatsApp with your mobile number.
              </p>
            </div>
          ) : null}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            Certificates available for printout Monday to Saturday
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
