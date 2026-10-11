import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES as INITIAL_SERVICES } from '../data/servicesData';
import { PRICING_PLANS as INITIAL_PRICING_PLANS, COMMERCIAL_IT_PLANS as INITIAL_BUSINESS_PLANS } from '../data/pricingData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ServicePriceContext = createContext(null);

const SERVICES_KEY = 'avm_services_catalog_v1';
const PRICING_KEY = 'avm_pricing_plans_v1';
const BUSINESS_PRICING_KEY = 'avm_business_plans_v1';

// Helper to normalize plans with reliable IDs
function normalizePlans(plans, prefix = 'plan') {
  return plans.map((p, idx) => ({
    ...p,
    id: p.id || `${prefix}-${idx}-${(p.service || p.title || 'item').toLowerCase().replace(/[^a-z0-9]/g, '-')}`
  }));
}

function getInitialServices() {
  if (typeof window === 'undefined') return INITIAL_SERVICES;
  try {
    const saved = localStorage.getItem(SERVICES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed reading services from localStorage:', e);
  }
  return INITIAL_SERVICES;
}

function getInitialPricingPlans() {
  if (typeof window === 'undefined') return normalizePlans(INITIAL_PRICING_PLANS, 'consumer');
  try {
    const saved = localStorage.getItem(PRICING_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return normalizePlans(parsed, 'consumer');
    }
  } catch (e) {
    console.error('Failed reading pricing plans from localStorage:', e);
  }
  return normalizePlans(INITIAL_PRICING_PLANS, 'consumer');
}

function getInitialBusinessPlans() {
  if (typeof window === 'undefined') return normalizePlans(INITIAL_BUSINESS_PLANS, 'business');
  try {
    const saved = localStorage.getItem(BUSINESS_PRICING_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return normalizePlans(parsed, 'business');
    }
  } catch (e) {
    console.error('Failed reading business plans from localStorage:', e);
  }
  return normalizePlans(INITIAL_BUSINESS_PLANS, 'business');
}

export const ServicePriceProvider = ({ children }) => {
  const [services, setServices] = useState(getInitialServices);
  const [pricingPlans, setPricingPlans] = useState(getInitialPricingPlans);
  const [businessPlans, setBusinessPlans] = useState(getInitialBusinessPlans);

  // Sync with Supabase on mount if configured
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    // 1. Fetch Cloud Services
    supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d) => ({
            id: d.id,
            title: d.title,
            tamilTitle: d.tamil_title || d.title,
            category: d.category,
            turnaround: d.turnaround,
            govtFee: d.govt_fee,
            priceStarting: d.price_starting,
            icon: d.icon || 'FileText',
            description: d.description,
            features: Array.isArray(d.features) ? d.features : [],
            documentsRequired: d.documents_required,
            popular: !!d.popular
          }));
          setServices(mapped);
        }
      })
      .catch((err) => console.warn('Supabase services sync notice:', err));

    // 2. Fetch Cloud Pricing Plans
    supabase
      .from('pricing_plans')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && Array.isArray(data) && data.length > 0) {
          const consumers = data
            .filter((p) => p.type === 'consumer')
            .map((p) => ({
              id: p.id,
              service: p.title,
              tamilService: p.tamil_title || p.title,
              price: p.price,
              note: p.note,
              time: p.time,
              badge: p.badge,
              popular: !!p.popular,
              includes: Array.isArray(p.features) ? p.features : []
            }));

          const businesses = data
            .filter((p) => p.type === 'business')
            .map((p) => ({
              id: p.id,
              title: p.title,
              price: p.price,
              period: p.period || 'one-time',
              target: p.target,
              features: Array.isArray(p.features) ? p.features : []
            }));

          if (consumers.length > 0) setPricingPlans(consumers);
          if (businesses.length > 0) setBusinessPlans(businesses);
        }
      })
      .catch((err) => console.warn('Supabase pricing sync notice:', err));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
    } catch (e) {
      console.error('Failed saving services:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(PRICING_KEY, JSON.stringify(pricingPlans));
    } catch (e) {
      console.error('Failed saving pricing plans:', e);
    }
  }, [pricingPlans]);

  useEffect(() => {
    try {
      localStorage.setItem(BUSINESS_PRICING_KEY, JSON.stringify(businessPlans));
    } catch (e) {
      console.error('Failed saving business plans:', e);
    }
  }, [businessPlans]);

  // SERVICES CRUD
  const addService = async (newService) => {
    const id = newService.id || `srv-${Date.now()}`;
    const entry = {
      ...newService,
      id,
      popular: !!newService.popular,
      features: Array.isArray(newService.features) 
        ? newService.features 
        : (newService.features || '').split('\n').map(s => s.trim()).filter(Boolean)
    };
    setServices((prev) => [entry, ...prev]);

    // Cloud insert
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('services').insert([
          {
            id: entry.id,
            title: entry.title,
            tamil_title: entry.tamilTitle,
            category: entry.category,
            turnaround: entry.turnaround,
            govt_fee: entry.govtFee,
            price_starting: entry.priceStarting,
            icon: entry.icon,
            description: entry.description,
            features: entry.features,
            documents_required: entry.documentsRequired,
            popular: entry.popular
          }
        ]);
      } catch (err) {
        console.warn('Supabase insert service fallback:', err);
      }
    }

    return entry;
  };

  const updateService = async (id, updatedFields) => {
    const normalizedFeatures = Array.isArray(updatedFields.features)
      ? updatedFields.features
      : (updatedFields.features || '').split('\n').map(s => s.trim()).filter(Boolean);

    setServices((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            features: normalizedFeatures
          };
        }
        return item;
      })
    );

    // Cloud update
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('services')
          .update({
            title: updatedFields.title,
            tamil_title: updatedFields.tamilTitle,
            category: updatedFields.category,
            turnaround: updatedFields.turnaround,
            govt_fee: updatedFields.govtFee,
            price_starting: updatedFields.priceStarting,
            icon: updatedFields.icon,
            description: updatedFields.description,
            features: normalizedFeatures,
            documents_required: updatedFields.documentsRequired,
            popular: updatedFields.popular
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase update service fallback:', err);
      }
    }
  };

  const deleteService = async (id) => {
    setServices((prev) => prev.filter((item) => item.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete service fallback:', err);
      }
    }
  };

  const resetServices = () => {
    setServices(INITIAL_SERVICES);
    try {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(INITIAL_SERVICES));
    } catch (e) {
      console.error(e);
    }
  };

  // CONSUMER PRICING PLANS CRUD
  const addPricingPlan = async (newPlan) => {
    const id = `plan-${Date.now()}`;
    const entry = {
      ...newPlan,
      id,
      popular: !!newPlan.popular,
      includes: Array.isArray(newPlan.includes)
        ? newPlan.includes
        : (newPlan.includes || '').split('\n').map(s => s.trim()).filter(Boolean)
    };
    setPricingPlans((prev) => [entry, ...prev]);

    // Cloud insert
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('pricing_plans').insert([
          {
            id: entry.id,
            type: 'consumer',
            title: entry.service,
            tamil_title: entry.tamilService,
            price: entry.price,
            note: entry.note,
            time: entry.time,
            badge: entry.badge,
            popular: entry.popular,
            features: entry.includes
          }
        ]);
      } catch (err) {
        console.warn('Supabase insert pricing fallback:', err);
      }
    }

    return entry;
  };

  const updatePricingPlan = async (id, updatedFields) => {
    const normalizedIncludes = Array.isArray(updatedFields.includes)
      ? updatedFields.includes
      : (updatedFields.includes || '').split('\n').map(s => s.trim()).filter(Boolean);

    setPricingPlans((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            includes: normalizedIncludes
          };
        }
        return item;
      })
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('pricing_plans')
          .update({
            title: updatedFields.service,
            tamil_title: updatedFields.tamilService,
            price: updatedFields.price,
            note: updatedFields.note,
            time: updatedFields.time,
            badge: updatedFields.badge,
            popular: updatedFields.popular,
            features: normalizedIncludes
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase update pricing fallback:', err);
      }
    }
  };

  const deletePricingPlan = async (id) => {
    setPricingPlans((prev) => prev.filter((item) => item.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('pricing_plans').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete pricing fallback:', err);
      }
    }
  };

  const resetPricingPlans = () => {
    const normalized = normalizePlans(INITIAL_PRICING_PLANS, 'consumer');
    setPricingPlans(normalized);
    try {
      localStorage.setItem(PRICING_KEY, JSON.stringify(normalized));
    } catch (e) {
      console.error(e);
    }
  };

  // BUSINESS PRICING PLANS CRUD
  const addBusinessPlan = async (newPlan) => {
    const id = `biz-plan-${Date.now()}`;
    const entry = {
      ...newPlan,
      id,
      features: Array.isArray(newPlan.features)
        ? newPlan.features
        : (newPlan.features || '').split('\n').map(s => s.trim()).filter(Boolean)
    };
    setBusinessPlans((prev) => [entry, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('pricing_plans').insert([
          {
            id: entry.id,
            type: 'business',
            title: entry.title,
            price: entry.price,
            period: entry.period,
            target: entry.target,
            features: entry.features
          }
        ]);
      } catch (err) {
        console.warn('Supabase insert business plan fallback:', err);
      }
    }

    return entry;
  };

  const updateBusinessPlan = async (id, updatedFields) => {
    const normalizedFeatures = Array.isArray(updatedFields.features)
      ? updatedFields.features
      : (updatedFields.features || '').split('\n').map(s => s.trim()).filter(Boolean);

    setBusinessPlans((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            features: normalizedFeatures
          };
        }
        return item;
      })
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('pricing_plans')
          .update({
            title: updatedFields.title,
            price: updatedFields.price,
            period: updatedFields.period,
            target: updatedFields.target,
            features: normalizedFeatures
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase update business plan fallback:', err);
      }
    }
  };

  const deleteBusinessPlan = async (id) => {
    setBusinessPlans((prev) => prev.filter((item) => item.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('pricing_plans').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete business plan fallback:', err);
      }
    }
  };

  const resetBusinessPlans = () => {
    const normalized = normalizePlans(INITIAL_BUSINESS_PLANS, 'business');
    setBusinessPlans(normalized);
    try {
      localStorage.setItem(BUSINESS_PRICING_KEY, JSON.stringify(normalized));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ServicePriceContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,
        resetServices,

        pricingPlans,
        addPricingPlan,
        updatePricingPlan,
        deletePricingPlan,
        resetPricingPlans,

        businessPlans,
        addBusinessPlan,
        updateBusinessPlan,
        deleteBusinessPlan,
        resetBusinessPlans,

        totalServices: services.length,
        totalPlans: pricingPlans.length + businessPlans.length,
        isCloudSynced: isSupabaseConfigured()
      }}
    >
      {children}
    </ServicePriceContext.Provider>
  );
};

export const useServicesAndPricing = () => {
  const context = useContext(ServicePriceContext);
  if (!context) {
    throw new Error('useServicesAndPricing must be used within a ServicePriceProvider');
  }
  return context;
};
