-- ==============================================================================
-- AVM E-SEVAI & CSC KENDRA - SUPABASE DATABASE INITIALIZATION SCRIPT
-- Run this in: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create E-Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tamil_title TEXT,
    category TEXT DEFAULT 'Government Certificates',
    turnaround TEXT DEFAULT '3 - 7 Working Days',
    govt_fee TEXT DEFAULT '₹60 Govt Fee',
    price_starting TEXT DEFAULT '₹100',
    icon TEXT DEFAULT 'FileText',
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    documents_required TEXT,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Pricing Plans Table (Consumer & Business)
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'consumer', -- 'consumer' or 'business'
    title TEXT NOT NULL,
    tamil_title TEXT,
    price TEXT NOT NULL,
    note TEXT,
    time TEXT,
    badge TEXT,
    popular BOOLEAN DEFAULT false,
    features JSONB DEFAULT '[]'::jsonb,
    period TEXT DEFAULT 'one-time',
    target TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Public Circulars & Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Govt Scheme',
    priority TEXT DEFAULT 'normal',
    author TEXT DEFAULT 'CSC VLE Operator',
    date TEXT,
    image_url TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Citizen Bookings & Application Requests Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    ticket_id TEXT UNIQUE NOT NULL,
    applicant_type TEXT DEFAULT 'Individual / Citizen',
    selected_service TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    aadhaar TEXT,
    notes TEXT,
    status TEXT DEFAULT 'Submitted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Pricing" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public Read Alerts" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Public Read Bookings" ON public.bookings FOR SELECT USING (true);

-- Allow Admin / Client Operations (Insert, Update, Delete)
CREATE POLICY "Allow All Services Modify" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Pricing Modify" ON public.pricing_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Alerts Modify" ON public.alerts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow Citizen Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Manage Bookings" ON public.bookings FOR UPDATE USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Services
INSERT INTO public.services (id, title, tamil_title, category, turnaround, govt_fee, price_starting, icon, description, features, documents_required, popular)
VALUES
('revenue-certificates', 'Revenue & E-District Certificates', 'வருவாய் & இ-சேவை சான்றிதழ்கள்', 'Government Certificates', '3 - 7 Working Days', '₹60 Govt Fee', '₹100', 'FileText', 'Official government revenue department certificates signed digitally by VAO, RI, and Tahsildar.', '["Community Certificate (சாதி சான்றிதழ்)", "Income Certificate (வருமான சான்றிதழ்)", "Nativity & Residence Certificate (இருப்பிட சான்றிதழ்)", "First Graduate Certificate (முதல் பட்டதாரி)", "Legal Heir Certificate (வாரிசு சான்றிதழ்)"]'::jsonb, 'Aadhaar Card, Smart Ration Card, Photo, Salary slip/ITR', true),
('land-records-patta-chitta', 'Land Records & Patta / Chitta', 'பட்டா / சிட்டா & வில்லங்க சான்றிதழ் (EC)', 'Revenue & Land', 'Instant / 1 - 2 Days', '₹0 - ₹60', '₹50', 'Landmark', 'Instant online verification and download of official land revenue documents, ownership records, survey maps, and sub-registrar encumbrance certificates.', '["View & Download Patta / Chitta (பட்டா / சிட்டா நகல்)", "A-Register Extract & TSLR Town Survey copy", "FMB Field Measurement Sketch (புல வரைபடம்)", "Encumbrance Certificate (வில்லங்க சான்றிதழ் - EC search)"]'::jsonb, 'Survey Number, Sub-division, Village/Taluk name, Document Number', true),
('smart-ration-card', 'Smart Ration Card Services (TNEPDS)', 'ஸ்மார்ட் குடும்ப அட்டை சேவைகள்', 'Civil Supplies', '1 - 15 Days', '₹0 - ₹50', '₹60', 'CreditCard', 'Comprehensive public distribution system (TNEPDS) online operations for new families, updates, member alterations, and high-durability plastic PVC card printing.', '["New Smart Ration Card Application", "Addition of Family Member", "Deletion of Member upon Marriage", "Change of Family Head & Address Change"]'::jsonb, 'Aadhaar cards of all members, Gas bill, Birth certificate', true),
('identity-cards-pan-voter', 'PAN Card, Voter ID & Aadhaar Services', 'பான் கார்டு, வாக்காளர் அட்டை & ஆதார்', 'Citizen ID Services', 'Instant / 3 - 5 Days', 'Standard Govt Rates', '₹50', 'BadgeCheck', 'New card applications, biometric updates, online linking, and demographic corrections for all prime national identity documents.', '["New PAN Card Application (UTI / NSDL)", "PAN Card Name / DOB / Father Name Correction", "Aadhaar-PAN Mandatory Online Linking", "New Voter ID (Form 6)"]'::jsonb, 'Aadhaar Card, 2 Passport Photos, Mobile number with OTP', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Pricing Plans
INSERT INTO public.pricing_plans (id, type, title, tamil_title, price, note, time, badge, popular, features, period, target)
VALUES
('plan-revenue-cert', 'consumer', 'Revenue Certificate (Income / Caste / Nativity)', 'வருமானம் / சாதி / இருப்பிட சான்றிதழ்', '₹100', 'Includes official ₹60 Govt portal fee + operator scanning & uploading', '3 - 7 Days', 'Official e-District', true, '["Official TNeGA application submission & e-challan payment", "Document scanning, cropping & size optimization", "SMS application tracking number to customer mobile", "Digitally signed certificate download & watermarked printout"]'::jsonb, 'one-time', 'Citizens & Students'),
('plan-patta-chitta', 'consumer', 'Patta / Chitta Online Copy & FMB Sketch', 'பட்டா / சிட்டா & புல வரைபடம் (FMB)', '₹40', 'Instant verified revenue department printout', 'Instant (5 Mins)', 'Instant Print', false, '["Survey & sub-division number verification on AnyROR/e-Services", "Land ownership & extent record", "High-clarity printout with official Government QR Code", "A-Register & TSLR record verification included"]'::jsonb, 'one-time', 'Land Owners'),
('plan-new-pan', 'consumer', 'New PAN Card (NSDL / UTI)', 'புதிய பான் கார்டு விண்ணப்பம்', '₹150', 'Includes official ₹107 Govt fee & physical card delivery', 'ePAN: 3 Days, Physical: 10 Days', 'Most Popular', true, '["Online biometric/OTP Aadhaar-based Form 49A processing", "e-PAN delivered to email within 48 to 72 hours", "Original plastic PAN card dispatched via Speed Post to home", "Zero rejection guarantee with proof validation"]'::jsonb, 'one-time', 'All Citizens'),
('plan-biz-msme', 'business', 'MSME & Business Online Pack', 'MSME வணிகப் பதிவு & உரிமம்', '₹499', 'Comprehensive startup compliance pack', '2 - 3 Days', 'Business', false, '["Udyam (MSME) Central Govt Registration Certificate", "Food Safety FSSAI Registration Application", "GST New Registration Consultation & Document Filing", "Professional letterhead, seal & business card design"]'::jsonb, 'one-time', 'New shop owners, small traders & self-employed'),
('plan-biz-legal', 'business', 'Legal Documentation & Deed Drafting', 'சட்ட ஒப்பந்தங்கள் & பத்திரம் வரைவு', '₹350', 'Professional deed formatting & stamp paper assistance', '1 - 2 Days', 'Legal', false, '["House & Commercial Shop Rental Agreement Drafting", "Stamp Paper (e-Stamp) procurement assistance", "Vehicle Sale Agreement (Form 29 & 30 preparation)", "Name Change Gazette Notification drafting"]'::jsonb, 'per document', 'Tenants, landlords, vehicle sales & affidavits')
ON CONFLICT (id) DO NOTHING;

-- Seed Alerts
INSERT INTO public.alerts (id, title, category, priority, author, date, image_url, content)
VALUES
('alert-1', 'PM-KISAN 19th Installment eKYC Last Date Announced', 'Govt Scheme', 'high', 'CSC VLE Operator', '2026-10-10', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', 'All beneficiary farmers under PM-Kisan Samman Nidhi must complete mandatory biometric or OTP-based e-KYC before the deadline to receive the ₹2,000 credit directly in their bank accounts.'),
('alert-2', 'Tamil Nadu Revenue Certificates - VAO Verification Drive', 'Revenue & Land', 'normal', 'Mani Rathanam', '2026-10-09', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', 'Special verification camps for Community, Income, Nativity, and First Graduate certificates are currently in progress. Apply online at our Kendra with zero rejection guarantee.')
ON CONFLICT (id) DO NOTHING;
