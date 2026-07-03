// Simple client-side validators used by forms
export function isEmail(v) {
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isPhone(v) {
  if (!v) return false;
  // Accepts digits, spaces, + and hyphens. For India, simple check: 10 digits
  const digits = v.replace(/[^0-9]/g, "");
  return digits.length >= 10 && digits.length <= 14;
}

export function validateContactForm(form) {
  if (!form.name || !String(form.name).trim()) return { ok: false, message: "Please enter your full name." };
  if (!form.email || !isEmail(form.email)) return { ok: false, message: "Please enter a valid email address." };
  if (!form.phone || !isPhone(form.phone)) return { ok: false, message: "Please enter a valid phone number." };
  if (!form.subject || !String(form.subject).trim()) return { ok: false, message: "Please enter a subject." };
  if (!form.message || !String(form.message).trim()) return { ok: false, message: "Please enter a message." };
  return { ok: true };
}

export function validateSponsorForm(form) {
  if (!form.companyName || !String(form.companyName).trim()) return { ok: false, message: "Please enter company/organization name." };
  if (!form.contactPerson || !String(form.contactPerson).trim()) return { ok: false, message: "Please enter contact person name." };
  if (!form.mobile || !isPhone(form.mobile)) return { ok: false, message: "Please enter a valid mobile number." };
  if (!form.email || !isEmail(form.email)) return { ok: false, message: "Please enter a valid email address." };
  if (!form.sponsorshipInterest) return { ok: false, message: "Please select a sponsorship interest." };
  if (!form.sponsorshipType) return { ok: false, message: "Please select a sponsorship type." };
  return { ok: true };
}
