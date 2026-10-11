import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ALERTS } from '../data/initialAlerts';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('avm_tech_alerts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse alerts from localStorage:', e);
    }
    return INITIAL_ALERTS;
  });

  // Sync from Supabase on mount if configured
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            priority: d.priority,
            author: d.author,
            date: d.date,
            imageUrl: d.image_url,
            content: d.content
          }));
          setAlerts(mapped);
        }
      })
      .catch((err) => console.warn('Supabase alerts sync notice:', err));
  }, []);

  // Sync with localStorage whenever alerts change
  useEffect(() => {
    try {
      localStorage.setItem('avm_tech_alerts', JSON.stringify(alerts));
    } catch (e) {
      console.error('Failed to save alerts to localStorage:', e);
    }
  }, [alerts]);

  const addAlert = async (alertData) => {
    const newEntry = {
      ...alertData,
      id: `alert-${Date.now()}`,
      date: alertData.date || new Date().toISOString().split('T')[0],
      priority: alertData.priority || 'normal',
      category: alertData.category || 'Tech Tip',
      author: alertData.author || 'Service Desk'
    };
    setAlerts((prev) => [newEntry, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('alerts').insert([
          {
            id: newEntry.id,
            title: newEntry.title,
            category: newEntry.category,
            priority: newEntry.priority,
            author: newEntry.author,
            date: newEntry.date,
            image_url: newEntry.imageUrl,
            content: newEntry.content
          }
        ]);
      } catch (err) {
        console.warn('Supabase insert alert fallback:', err);
      }
    }

    return newEntry;
  };

  const updateAlert = async (id, updatedData) => {
    setAlerts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('alerts')
          .update({
            title: updatedData.title,
            category: updatedData.category,
            priority: updatedData.priority,
            author: updatedData.author,
            date: updatedData.date,
            image_url: updatedData.imageUrl,
            content: updatedData.content
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase update alert fallback:', err);
      }
    }
  };

  const deleteAlert = async (id) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('alerts').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete alert fallback:', err);
      }
    }
  };

  const resetAlerts = () => {
    setAlerts(INITIAL_ALERTS);
    localStorage.setItem('avm_tech_alerts', JSON.stringify(INITIAL_ALERTS));
  };

  const urgentCount = alerts.filter((a) => a.priority === 'high').length;

  return (
    <AlertContext.Provider
      value={{
        alerts,
        addAlert,
        updateAlert,
        deleteAlert,
        resetAlerts,
        urgentCount,
        isCloudSynced: isSupabaseConfigured()
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
