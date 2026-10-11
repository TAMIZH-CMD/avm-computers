export const PRICING_PLANS = [
  {
    service: "Revenue Certificate (Income / Caste / Nativity)",
    tamilService: "வருமானம் / சாதி / இருப்பிட சான்றிதழ்",
    price: "₹100",
    note: "Includes official ₹60 Govt portal fee + operator scanning & uploading",
    time: "3 - 7 Days",
    popular: true,
    badge: "Official e-District",
    includes: [
      "Official TNeGA application submission & e-challan payment",
      "Document scanning, cropping & size optimization",
      "SMS application tracking number to customer mobile",
      "Digitally signed certificate download & watermarked printout"
    ]
  },
  {
    service: "Patta / Chitta Online Copy & FMB Sketch",
    tamilService: "பட்டா / சிட்டா & புல வரைபடம் (FMB)",
    price: "₹40",
    note: "Instant verified revenue department printout",
    time: "Instant (5 Mins)",
    popular: false,
    badge: "Instant Print",
    includes: [
      "Survey & sub-division number verification on AnyROR/e-Services",
      "Land ownership & extent (Acres / Cents / Sq.Ft) record",
      "High-clarity printout with official Government QR Code",
      "A-Register & TSLR record verification included"
    ]
  },
  {
    service: "New PAN Card (NSDL / UTI)",
    tamilService: "புதிய பான் கார்டு விண்ணப்பம்",
    price: "₹150",
    note: "Includes official ₹107 Govt fee & physical card delivery",
    time: "ePAN: 3 Days, Physical: 10 Days",
    popular: true,
    badge: "Most Popular",
    includes: [
      "Online biometric/OTP Aadhaar-based Form 49A processing",
      "e-PAN delivered to email within 48 to 72 hours",
      "Original plastic PAN card dispatched via Speed Post to home",
      "Zero rejection guarantee with proof validation"
    ]
  },
  {
    service: "Smart Ration Card Corrections & Member Addition",
    tamilService: "ரேஷன் கார்டு பெயர் சேர்த்தல் / முகவரி மாற்றம்",
    price: "₹60",
    note: "Official TNEPDS Civil Supplies portal submission",
    time: "3 - 10 Days",
    popular: false,
    badge: "Essential",
    includes: [
      "New child birth certificate link or member deletion upon marriage",
      "Address modification & fair price shop (ration shop) transfer",
      "Family head photo & name rectification",
      "Application status tracking until Taluk Supply Officer (TSO) approval"
    ]
  },
  {
    service: "Encumbrance Certificate (EC - 30+ Years)",
    tamilService: "வில்லங்க சான்றிதழ் (EC) தேடல்",
    price: "₹50",
    note: "Official TNREGINET registration department copy",
    time: "Instant / 10 Mins",
    popular: false,
    badge: "Property Legal",
    includes: [
      "Comprehensive search of all registered deeds, mortgages & sales",
      "Verification across 1975 to current date registration records",
      "Official sub-registrar digitally signed PDF copy",
      "Direct advice on title verification for property purchases"
    ]
  },
  {
    service: "TNPSC / Police / Govt Exam Application",
    tamilService: "அரசு வேலை தேர்வு ஆன்லைன் விண்ணப்பம்",
    price: "₹80",
    note: "Excluding official exam fee (paid directly to govt)",
    time: "15 - 20 Mins",
    popular: true,
    badge: "Students",
    includes: [
      "One Time Registration (OTR) creation & renewal",
      "Precision photo & signature resizing to exact pixel specifications",
      "Payment gateway checkout & instant confirmation challan print",
      "Free hall ticket alert and WhatsApp reminder on release"
    ]
  }
];

export const COMMERCIAL_IT_PLANS = [
  {
    title: "MSME & Business Online Pack",
    price: "₹499",
    period: "one-time",
    target: "New shop owners, small traders & self-employed",
    features: [
      "Udyam (MSME) Central Govt Registration Certificate",
      "Food Safety FSSAI Registration Application",
      "GST New Registration Consultation & Document Filing",
      "Professional letterhead, seal & business card design",
      "Digital Signature Certificate (DSC) guidance"
    ]
  },
  {
    title: "Legal Documentation & Deed Drafting",
    price: "₹350",
    period: "per document",
    target: "Tenants, landlords, vehicle sales & affidavits",
    features: [
      "House & Commercial Shop Rental Agreement Drafting",
      "Stamp Paper (e-Stamp) procurement assistance",
      "Vehicle Sale Agreement (Form 29 & 30 preparation)",
      "Name Change Gazette Notification drafting",
      "Notary public attestation guidance"
    ]
  }
];
