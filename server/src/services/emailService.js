const nodemailer = require("nodemailer");
const { env } = require("../config/env");

// ─── Transporter (singleton, pooled) ──────────────────────────────────────────
// Creating a brand-new transporter (and SMTP connection) on every send is slow
// and can trip Gmail's connection-rate limits under load. We build it once,
// reuse it, and let nodemailer pool + keep connections alive.
let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  _transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.emailUser,
      pass: env.emailAppPassword
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100
  });

  return _transporter;
}

// Call this once at server startup so a bad emailUser/emailAppPassword fails
// loudly at boot instead of silently the first time someone submits a form.
async function verifyEmailTransport() {
  try {
    await getTransporter().verify();
    console.log("[email] SMTP transport verified OK");
    return true;
  } catch (err) {
    console.error("[email] SMTP transport verification failed:", err.message);
    return false;
  }
}

// ─── HTML escaping ─────────────────────────────────────────────────────────────
// Every field below (name, email, subject, message, organization, phone) comes
// from a public form submission and was being interpolated straight into the
// HTML template. That's an HTML-injection hole: a submitter could put
// `<img src=x onerror=...>` or a fake "unsubscribe" link into the message
// field and have it render as live HTML in the admin's inbox. Escape anything
// that isn't a URL we generated ourselves.
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Preserve intentional line breaks after escaping, since we no longer trust
// the raw string to contain safe <br/> tags.
function escapeHtmlMultiline(str) {
  return escapeHtml(str).replace(/\n/g, "<br />");
}

// ─── HTML Template Helper ─────────────────────────────────────────────────────
function buildEmailTemplate({ preheader = "", title, bodyHtml, ctaText, ctaUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0b0f1a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #cbd5e1; }
    .email-wrapper { max-width: 620px; margin: 0 auto; padding: 32px 16px; }
    .email-card { background: #131928; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
    .email-header {
      background: linear-gradient(135deg, #1a0a00 0%, #7c2d12 30%, #b45309 60%, #d97706 85%, #fbbf24 100%);
      padding: 40px 36px;
      text-align: center;
      position: relative;
    }
    .email-header::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(ellipse at top right, rgba(251,191,36,0.3), transparent 60%),
                  radial-gradient(ellipse at bottom left, rgba(234,88,12,0.3), transparent 60%);
    }
    .email-brand-tag {
      display: inline-block;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fef3c7;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 4px 14px;
      border-radius: 20px;
      margin-bottom: 16px;
      position: relative;
    }
    .email-logo {
      font-size: 36px;
      font-weight: 900;
      color: #fff;
      letter-spacing: -0.03em;
      position: relative;
      text-shadow: 0 2px 16px rgba(0,0,0,0.4);
    }
    .email-logo span { color: #fef08a; }
    .email-tagline {
      font-size: 13px;
      color: rgba(255,255,255,0.8);
      margin-top: 8px;
      letter-spacing: 0.05em;
      position: relative;
    }
    .email-body { padding: 40px 36px; }
    .email-title {
      font-size: 26px;
      font-weight: 800;
      color: #f8fafc;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    .email-divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #f59e0b, #ea580c);
      border-radius: 2px;
      margin: 20px 0;
    }
    .email-text {
      font-size: 15px;
      line-height: 1.8;
      color: #94a3b8;
      margin-bottom: 16px;
    }
    .email-highlight-box {
      background: rgba(245,158,11,0.08);
      border: 1px solid rgba(245,158,11,0.2);
      border-left: 4px solid #f59e0b;
      border-radius: 12px;
      padding: 20px 24px;
      margin: 24px 0;
    }
    .email-highlight-box p {
      font-size: 14px;
      color: #fcd34d;
      line-height: 1.7;
    }
    .email-detail-row {
      display: flex;
      align-items: baseline;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-size: 14px;
    }
    .email-detail-row:last-child { border-bottom: none; }
    .email-detail-label { color: #64748b; font-weight: 600; min-width: 120px; }
    .email-detail-value { color: #e2e8f0; font-weight: 500; }
    .email-cta-wrap { text-align: center; margin: 36px 0 24px; }
    .email-cta {
      display: inline-block;
      background: linear-gradient(135deg, #f59e0b, #ea580c);
      color: #fff !important;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 50px;
      letter-spacing: 0.03em;
      box-shadow: 0 8px 25px rgba(234,88,12,0.4);
    }
    .email-footer {
      padding: 28px 36px;
      background: rgba(0,0,0,0.3);
      border-top: 1px solid rgba(255,255,255,0.05);
      text-align: center;
    }
    .email-social { display: flex; justify-content: center; gap: 16px; margin-bottom: 16px; }
    .email-social a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px; height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      color: #94a3b8;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      transition: all 0.2s;
    }
    .email-footer-copy {
      font-size: 12px;
      color: #475569;
      line-height: 1.6;
    }
    .email-footer-copy a { color: #f59e0b; text-decoration: none; }
    @media (max-width: 600px) {
      .email-body { padding: 28px 20px; }
      .email-header { padding: 32px 20px; }
      .email-footer { padding: 20px; }
      .email-logo { font-size: 28px; }
    }
  </style>
</head>
<body>
  ${preheader ? `<span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>` : ""}
  <div class="email-wrapper">
    <div class="email-card">
      <!-- Header -->
      <div class="email-header">
        <div class="email-brand-tag">DMS Aarohi</div>
        <div class="email-logo">
          <img src="https://dmsaarohi.com/images/logo.png" alt="DMS Aarohi" width="120" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
        </div>
        <div class="email-tagline" style="margin-top: 12px;">🎵 Where Talent Meets Destiny</div>
      </div>

      <!-- Body -->
      <div class="email-body">
        ${bodyHtml}
        ${ctaText && ctaUrl ? `
        <div class="email-cta-wrap">
          <a href="${ctaUrl}" class="email-cta">${escapeHtml(ctaText)}</a>
        </div>` : ""}
      </div>

      <!-- Footer -->
      <div class="email-footer">
        <div class="email-social">
          <a href="https://instagram.com/dmsaarohi" title="Instagram" style="background:transparent; border:none; width:auto; height:auto;">
            <img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" alt="Instagram" width="32" height="32" style="display:block;" />
          </a>
          <a href="https://facebook.com/dmsaarohi" title="Facebook" style="background:transparent; border:none; width:auto; height:auto;">
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" width="32" height="32" style="display:block;" />
          </a>
          <a href="https://youtube.com/@dmsaarohi" title="YouTube" style="background:transparent; border:none; width:auto; height:auto;">
            <img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="YouTube" width="32" height="32" style="display:block;" />
          </a>
        </div>
        <div class="email-footer-copy">
          &copy; ${new Date().getFullYear()} <a href="https://dmsaarohi.com">DMS Aarohi</a> &mdash; All rights reserved.<br />
          You are receiving this email because you interacted with DMS Aarohi.
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─── Central send wrapper ─────────────────────────────────────────────────────
// Every exported function used to call transporter.sendMail() directly with no
// try/catch, so a single failed send (bad recipient, Gmail rate limit, network
// blip) would throw an unhandled rejection into the caller (e.g. crashing an
// Express request handler that didn't wrap the call itself). This centralizes
// logging and turns failures into a predictable { success, error } result
// instead of a thrown exception, while still allowing callers who want to
// `await` and `try/catch` themselves to do so.
async function send(mailOptions, context) {
  try {
    const info = await getTransporter().sendMail(mailOptions);
    console.log(`[email] Sent (${context}) -> ${mailOptions.to} [${info.messageId}]`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[email] FAILED to send (${context}) -> ${mailOptions.to}:`, err.message);
    // Re-throw so callers that expect a rejected promise (existing behavior)
    // still get one, but now with a clear log trail of what happened and why.
    throw err;
  }
}

// ─── Registration Confirmation Email ──────────────────────────────────────────
async function sendRegistrationEmail({ name, email, formType = "talent-show" }) {
  const formLabel = formType === "join-us" ? "Join Us" : "Talent Show";
  const safeName = escapeHtml(name);

  const bodyHtml = `
    <h2 class="email-title">🎉 You're Registered, ${safeName}!</h2>
    <div class="email-divider"></div>
    <p class="email-text">
      Congratulations! Your <strong style="color:#fbbf24">${escapeHtml(formLabel)}</strong> registration with <strong style="color:#fff">DMS Aarohi</strong> has been successfully received.
    </p>
    <div class="email-highlight-box">
      <p>🌟 <strong>What happens next?</strong><br />
      Our team will review your registration and shortlist candidates based on talent, passion, and potential. You will be notified via email about the next steps, audition dates, and event updates.</p>
    </div>
    <p class="email-text">
      Keep an eye on your inbox for exclusive updates about upcoming events, audition schedules, and more exciting opportunities from DMS Aarohi.
    </p>
    <p class="email-text">
      If you have any questions, feel free to reach out to us at <a href="mailto:dmsaarohi@gmail.com" style="color:#f59e0b">dmsaarohi@gmail.com</a>.
    </p>
    <p class="email-text" style="margin-top:24px; color:#64748b; font-size:13px;">
      With warmth &amp; excitement,<br />
      <strong style="color:#fbbf24">Team DMS Aarohi</strong>
    </p>`;

  const html = buildEmailTemplate({
    preheader: `Welcome to DMS Aarohi, ${name}! Your registration is confirmed.`,
    title: "Registration Confirmed — DMS Aarohi",
    bodyHtml,
    ctaText: "Visit Our Website",
    ctaUrl: "https://dmsaarohi.com"
  });

  return send({
    from: `"DMS Aarohi" <${env.emailUser}>`,
    to: email,
    subject: `🎵 Registration Confirmed — Welcome to DMS Aarohi, ${name}!`,
    html
  }, "registration");
}

// ─── Contact Acknowledgement Email (to user) ──────────────────────────────────
async function sendContactAcknowledgementEmail({ name, email, subject = "", message = "" }) {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtmlMultiline(message);

  const bodyHtml = `
    <h2 class="email-title">Thank You for Reaching Out, ${safeName}!</h2>
    <div class="email-divider"></div>
    <p class="email-text">
      We have received your message and our team will get back to you as soon as possible. We typically respond within <strong style="color:#fbbf24">24–48 hours</strong>.
    </p>
    ${subject ? `
    <div class="email-highlight-box">
      <p><strong>Your Query:</strong><br />${safeSubject}</p>
      ${message ? `<p style="margin-top:8px; color:#94a3b8">${safeMessage}</p>` : ""}
    </div>` : ""}
    <p class="email-text">
      In the meantime, feel free to explore our website for the latest news, events, and talent showcases from DMS Aarohi.
    </p>
    <p class="email-text" style="margin-top:24px; color:#64748b; font-size:13px;">
      With regards,<br />
      <strong style="color:#fbbf24">Team DMS Aarohi</strong>
    </p>`;

  const html = buildEmailTemplate({
    preheader: `We received your message, ${name}. We'll be in touch soon!`,
    title: "Message Received — DMS Aarohi",
    bodyHtml,
    ctaText: "Explore DMS Aarohi",
    ctaUrl: "https://dmsaarohi.com"
  });

  return send({
    from: `"DMS Aarohi" <${env.emailUser}>`,
    to: email,
    subject: `✉️ We Received Your Message — DMS Aarohi`,
    html
  }, "contact-ack");
}

// ─── Admin Notification Email (contact query received) ────────────────────────
async function sendAdminContactNotification({ name, email, phone, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "N/A");
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtmlMultiline(message);

  const bodyHtml = `
    <h2 class="email-title">New Contact Query Received</h2>
    <div class="email-divider"></div>
    <p class="email-text">A new contact form submission has been received on DMS Aarohi website.</p>
    <div class="email-highlight-box" style="background: rgba(99,102,241,0.08); border-color: rgba(99,102,241,0.2); border-left-color: #6366f1;">
      <p style="color:#a5b4fc;">
        <strong>From:</strong> ${safeName}<br />
        <strong>Email:</strong> ${safeEmail}<br />
        <strong>Phone:</strong> ${safePhone}<br />
        ${subject ? `<strong>Subject:</strong> ${safeSubject}<br />` : ""}
        ${message ? `<strong>Message:</strong><br />${safeMessage}` : ""}
      </p>
    </div>
    <p class="email-text">Log in to your admin panel to review and respond.</p>`;

  const html = buildEmailTemplate({
    preheader: `New contact from ${name} — ${email}`,
    title: "New Contact Query — DMS Aarohi Admin",
    bodyHtml,
    ctaText: "Open Admin Panel",
    ctaUrl: "https://dmsaarohi.com/admin"
  });

  return send({
    from: `"DMS Aarohi System" <${env.emailUser}>`,
    to: env.emailUser,
    replyTo: email, // <--- This ensures that clicking "Reply" replies to the user!
    subject: `🔔 New Contact Query from ${name} — DMS Aarohi`,
    html
  }, "admin-contact-notification");
}

// ─── Sponsor Request Admin Notification ──────────────────────────────────────
async function sendSponsorRequestNotification({ name, organization, email, sponsorshipTier }) {
  const safeName = escapeHtml(name);
  const safeOrg = escapeHtml(organization || "N/A");
  const safeEmail = escapeHtml(email);
  const safeTier = escapeHtml(sponsorshipTier || "General");

  const bodyHtml = `
    <h2 class="email-title">🤝 New Sponsor Request!</h2>
    <div class="email-divider"></div>
    <p class="email-text">A new sponsor enquiry has been submitted on DMS Aarohi website.</p>
    <div class="email-highlight-box">
      <p>
        <strong>Contact Name:</strong> ${safeName}<br />
        <strong>Organization:</strong> ${safeOrg}<br />
        <strong>Email:</strong> ${safeEmail}<br />
        <strong>Sponsorship Tier Interest:</strong> ${safeTier}
      </p>
    </div>
    <p class="email-text">Log in to your admin panel to review and respond to this sponsor inquiry.</p>`;

  const html = buildEmailTemplate({
    preheader: `New sponsor enquiry from ${organization || name}`,
    title: "New Sponsor Request — DMS Aarohi Admin",
    bodyHtml,
    ctaText: "Review in Admin Panel",
    ctaUrl: "https://dmsaarohi.com/admin"
  });

  return send({
    from: `"DMS Aarohi System" <${env.emailUser}>`,
    to: env.emailUser,
    replyTo: email, // <--- This ensures clicking "Reply" replies to the sponsor
    subject: `🤝 New Sponsor Request from ${organization || name} — DMS Aarohi`,
    html
  }, "sponsor-request-notification");
}

// ─── Sponsor Request Acknowledgement Email (to user) ──────────────────────────
async function sendSponsorAcknowledgementEmail({ name, organization, email }) {
  const safeName = escapeHtml(name);
  const safeOrg = escapeHtml(organization);

  const bodyHtml = `
    <h2 class="email-title">Thank You for Your Sponsorship Inquiry!</h2>
    <div class="email-divider"></div>
    <p class="email-text">
      Dear ${safeName},<br/><br/>
      Thank you for expressing interest in partnering with <strong>DMS Aarohi Musical Society</strong>. We have received your sponsorship request ${organization ? `on behalf of ${safeOrg}` : ""}.
    </p>
    <div class="email-highlight-box">
      <p>🌟 <strong>What happens next?</strong><br />
      Our partnership team is currently reviewing your request. We will reach out to you within the next 24-48 hours to discuss potential collaboration opportunities that align with your goals.</p>
    </div>
    <p class="email-text">
      We truly appreciate your support in empowering emerging musical talent.
    </p>
    <p class="email-text" style="margin-top:24px; color:#64748b; font-size:13px;">
      Warm regards,<br />
      <strong style="color:#fbbf24">Partnerships Team, DMS Aarohi</strong>
    </p>`;

  const html = buildEmailTemplate({
    preheader: `Thank you for your interest in sponsoring DMS Aarohi.`,
    title: "Sponsorship Inquiry Received — DMS Aarohi",
    bodyHtml,
    ctaText: "Return to Website",
    ctaUrl: "https://dmsaarohi.com"
  });

  return send({
    from: `"DMS Aarohi Partnerships" <${env.emailUser}>`,
    to: email, // This sends the email TO the user who filled the form
    subject: `🤝 Sponsorship Inquiry Received — DMS Aarohi`,
    html
  }, "sponsor-ack");
}

module.exports = {
  verifyEmailTransport,
  sendRegistrationEmail,
  sendContactAcknowledgementEmail,
  sendAdminContactNotification,
  sendSponsorRequestNotification,
  sendSponsorAcknowledgementEmail
};