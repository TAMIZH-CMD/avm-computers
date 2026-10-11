import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ApplicationContext = createContext();

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    ticket_id: 'TN-202610482',
    name: 'Kavitha R.',
    phone: '9842156789',
    applicant_type: 'Individual / Citizen',
    selected_service: 'Income Certificate (வருமான சான்றிதழ்)',
    aadhaar: 'XXXX-XXXX-4512',
    notes: 'Urgent for college scholarship application before month end.',
    status: 'Submitted',
    step: 1,
    admin_notes: 'Application received. Pending VAO upload review.',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-2',
    ticket_id: 'TN-202610319',
    name: 'Senthil Kumar M.',
    phone: '9789456123',
    applicant_type: 'Student',
    selected_service: 'Community Certificate (சாதி சான்றிதழ்)',
    aadhaar: 'XXXX-XXXX-7890',
    notes: 'School 10th TC and parents community certificate copies attached.',
    status: 'In Verification',
    step: 2,
    admin_notes: 'VAO physical inspection completed. Forwarded to RI for review.',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-3',
    ticket_id: 'TN-202610190',
    name: 'Murugan P.',
    phone: '9443218765',
    applicant_type: 'Farmer / Land Owner',
    selected_service: 'Patta / Chitta Transfer (பட்டா மாறுதல்)',
    aadhaar: 'XXXX-XXXX-1234',
    notes: 'Survey number 142/3A, Kangeyam taluk registered sale deed.',
    status: 'Approved',
    step: 4,
    admin_notes: 'Digitally signed with Tahsildar QR seal. Ready for watermark printout.',
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-4',
    ticket_id: 'TN-202609845',
    name: 'Priya Dharshini K.',
    phone: '9876543210',
    applicant_type: 'Family Head',
    selected_service: 'Smart Ration Card Addition (குடும்ப அட்டை பெயர் சேர்த்தல்)',
    aadhaar: 'XXXX-XXXX-9988',
    notes: 'Child municipal birth certificate and father Aadhaar linked.',
    status: 'Completed',
    step: 4,
    admin_notes: 'Printed smart PVC card handed over to customer with receipt.',
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
  }
];

const LOCAL_STORAGE_KEY = 'avm_applications_list';

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading applications from localStorage:', e);
    }
    return INITIAL_APPLICATIONS;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load from Supabase on mount if configured
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    let isMounted = true;
    setIsLoading(true);

    supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!isMounted) return;
        setIsLoading(false);
        if (error) {
          console.warn('Supabase fetch bookings error (using local storage):', error.message);
          return;
        }
        if (data && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id || `app-${item.ticket_id}`,
            ticket_id: item.ticket_id,
            name: item.name || 'Citizen',
            phone: item.phone || '',
            applicant_type: item.applicant_type || 'Citizen',
            selected_service: item.selected_service || '',
            aadhaar: item.aadhaar || 'Not provided',
            notes: item.notes || '',
            status: item.status || 'Submitted',
            step: item.status === 'Approved' || item.status === 'Completed' ? 4 : item.status === 'In Verification' ? 2 : 1,
            admin_notes: item.admin_notes || '',
            created_at: item.created_at || new Date().toISOString()
          }));
          setApplications(formatted);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formatted));
          } catch (e) {
            console.error(e);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setIsLoading(false);
          console.warn('Supabase bookings connection failed:', err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Save changes to localStorage whenever applications change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to sync applications to localStorage:', e);
    }
  }, [applications]);

  // Add new application
  const addApplication = async (newAppData) => {
    const item = {
      id: `app-${Date.now()}`,
      ticket_id: newAppData.ticket_id || `TN-${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`,
      name: newAppData.name || 'Citizen',
      phone: newAppData.phone || '',
      applicant_type: newAppData.applicant_type || 'Individual / Citizen',
      selected_service: newAppData.selected_service || 'E-Sevai Service',
      aadhaar: newAppData.aadhaar || 'Not provided',
      notes: newAppData.notes || '',
      status: 'Submitted',
      step: 1,
      admin_notes: 'New online application received.',
      created_at: new Date().toISOString()
    };

    setApplications((prev) => [item, ...prev]);

    // Save to Supabase Cloud if connected
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('bookings').insert([
          {
            id: item.id,
            ticket_id: item.ticket_id,
            applicant_type: item.applicant_type,
            selected_service: item.selected_service,
            name: item.name,
            phone: item.phone,
            aadhaar: item.aadhaar,
            notes: item.notes,
            status: item.status,
            created_at: item.created_at
          }
        ]);
      } catch (err) {
        console.warn('Failed saving booking to Supabase cloud:', err);
      }
    }

    return item;
  };

  // Update application status & remarks
  const updateApplicationStatus = async (id, newStatus, adminNotes = '') => {
    let stepNum = 1;
    if (newStatus === 'In Verification' || newStatus === 'Under Review') stepNum = 2;
    else if (newStatus === 'Action Required') stepNum = 2;
    else if (newStatus === 'Approved' || newStatus === 'Ready for Download') stepNum = 3;
    else if (newStatus === 'Completed') stepNum = 4;
    else if (newStatus === 'Rejected') stepNum = 0;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              step: stepNum,
              admin_notes: adminNotes !== undefined ? adminNotes : app.admin_notes
            }
          : app
      )
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('bookings')
          .update({ status: newStatus })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase status update failed:', err);
      }
    }
  };

  // Delete application
  const deleteApplication = async (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('bookings').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase booking delete failed:', err);
      }
    }
  };

  // Reset to default sample applications
  const resetApplications = () => {
    setApplications(INITIAL_APPLICATIONS);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
    } catch (e) {
      console.error(e);
    }
  };

  const getApplicationByTicketId = (ticketId) => {
    if (!ticketId) return null;
    const clean = ticketId.trim().toUpperCase();
    return applications.find((app) => app.ticket_id.toUpperCase() === clean);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        isLoading,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        resetApplications,
        getApplicationByTicketId
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
