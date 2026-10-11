export const FAQS = [
  {
    q: "What documents are required to apply for an Income or Community Certificate?",
    a: "You will need: (1) Applicant's Aadhaar Card, (2) Smart Ration Card, (3) Passport-size photo, (4) School TC or parents' Community Certificate (for Community), and (5) Salary slip, bank statement, or self-declaration of annual income (for Income Certificate)."
  },
  {
    q: "How many days does it take for Revenue Certificates to get approved?",
    a: "Standard e-District revenue certificates generally take 3 to 7 working days. The application is reviewed in sequence by the Village Administrative Officer (VAO), Revenue Inspector (RI), and finally approved digitally with the Zonal Deputy Tahsildar's cryptographic signature."
  },
  {
    q: "Can I download my certificate online with a digital signature and QR code?",
    a: "Yes! Once approved by the Tahsildar, we download your official certificate with the Government watermarked seal, digital cryptographic signature, and verification QR code. This is 100% legally valid for all college admissions, scholarships, and government applications."
  },
  {
    q: "How long does a new PAN Card application take?",
    a: "If applied using Aadhaar biometric or OTP verification, the electronic e-PAN card is generated and sent to your email within 48 to 72 hours. The physical plastic PAN card is printed and delivered directly to your doorstep by India Post within 7 to 10 working days."
  },
  {
    q: "How do I add my newborn baby to our Smart Ration Card?",
    a: "Bring the child's official municipal/panchayat Birth Certificate and both parents' Aadhaar cards. We will upload these to the TNEPDS Civil Supplies portal. Approval typically takes 5 to 10 days by the Taluk Supply Officer (TSO)."
  }
];

export const SAMPLE_TICKETS = {
  "TN-520241014": {
    ticketId: "TN-520241014",
    customerName: "Karthik Raja S.",
    device: "Income & Community Certificate",
    issue: "TNeGA e-District Certificate for College Scholarship",
    status: "Approved & Ready for Download",
    step: 4,
    estimatedCost: "₹100 (Paid)",
    dateReceived: "Oct 06, 2026",
    technician: "VAO / Tahsildar Portal Desk",
    history: [
      { step: 1, label: "E-Sevai Submission", completed: true, timestamp: "Oct 6, 11:20 AM", note: "Application submitted to TNeGA portal. e-Challan payment generated." },
      { step: 2, label: "VAO Verification", completed: true, timestamp: "Oct 7, 03:45 PM", note: "Village Administrative Officer (VAO) verified address & parent community." },
      { step: 3, label: "Revenue Inspector (RI) Review", completed: true, timestamp: "Oct 8, 01:10 PM", note: "RI recommended application for final Tahsildar approval." },
      { step: 4, label: "Tahsildar Digital Sign", completed: true, timestamp: "Oct 9, 05:20 PM", note: "Digitally signed with Government QR seal. Ready for watermark printout!" }
    ]
  },
  "TNEPDS-84920": {
    ticketId: "TNEPDS-84920",
    customerName: "Lakshmi Narayanan",
    device: "Smart Ration Card Service",
    issue: "Addition of Newborn Child & Address Update",
    status: "Verification In Progress",
    step: 2,
    estimatedCost: "₹60 (Paid)",
    dateReceived: "Oct 08, 2026",
    technician: "Civil Supplies Desk",
    history: [
      { step: 1, label: "TNEPDS Portal Upload", completed: true, timestamp: "Oct 8, 10:30 AM", note: "Uploaded child birth certificate & Aadhaar linking form." },
      { step: 2, label: "TSO Officer Inspection", completed: false, timestamp: "Pending Verification", note: "Taluk Supply Officer reviewing birth registration credentials." },
      { step: 3, label: "Card Update Approval", completed: false, timestamp: "Pending", note: "Pending approval." },
      { step: 4, label: "PVC Card Ready", completed: false, timestamp: "Pending", note: "New smart card printout." }
    ]
  },
  "PAN-90214": {
    ticketId: "PAN-90214",
    customerName: "Praveen Kumar V.",
    device: "New PAN Card (NSDL)",
    issue: "Form 49A Online Application with Instant Aadhaar eKYC",
    status: "Dispatched via India Post",
    step: 3,
    estimatedCost: "₹150 (Paid)",
    dateReceived: "Oct 05, 2026",
    technician: "NSDL / Income Tax Desk",
    history: [
      { step: 1, label: "NSDL Application Filed", completed: true, timestamp: "Oct 5, 02:00 PM", note: "Biometric eKYC successful. Acknowledgment number generated." },
      { step: 2, label: "e-PAN Generated", completed: true, timestamp: "Oct 7, 11:30 AM", note: "Official e-PAN card sent to applicant's email address." },
      { step: 3, label: "Dispatched via Speed Post", completed: true, timestamp: "Oct 9, 04:00 PM", note: "Physical plastic card printed. Dispatched under India Post Tracking." },
      { step: 4, label: "Delivered to Customer", completed: false, timestamp: "Out for Delivery", note: "Expected delivery within 48 hours." }
    ]
  }
};
