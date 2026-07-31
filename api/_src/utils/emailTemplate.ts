// utils/emailTemplate.ts

// Helper: escape HTML special characters
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/[&<>]/g, (m) => {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    })
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (c) => c);
}

// Shared email template (black & blue theme)
export function generateEmailTemplate(title: string, content: string, isAdmin: boolean = false): string {
  const brandBlue = '#2563EB';
  const darkBg = '#0a0a0a';
  const cardBg = '#111111';
  const textLight = '#f3f4f6';
  const textMuted = '#9ca3af';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: ${darkBg};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: ${cardBg};
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #1f2937;
      box-shadow: 0 20px 35px -10px rgba(0,0,0,0.5);
    }
    .header {
      background: linear-gradient(135deg, ${brandBlue} 0%, #1E40AF 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .header p {
      color: rgba(255,255,255,0.8);
      margin: 8px 0 0;
      font-size: 14px;
    }
    .content {
      padding: 32px 24px;
      color: ${textLight};
    }
    .content h2 {
      font-size: 20px;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 20px;
      color: ${brandBlue};
    }
    .message-box {
      background-color: #1a1a1a;
      padding: 16px;
      border-radius: 16px;
      border-left: 4px solid ${brandBlue};
      margin: 20px 0;
      color: ${textLight};
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, ${brandBlue} 0%, #1E40AF 100%);
      color: white;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 40px;
      font-weight: 600;
      margin: 20px 0 10px;
      transition: transform 0.2s;
    }
    .footer {
      background-color: ${darkBg};
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: ${textMuted};
      border-top: 1px solid #1f2937;
    }
    .footer a {
      color: ${brandBlue};
      text-decoration: none;
    }
    hr {
      border: none;
      border-top: 1px solid #1f2937;
      margin: 20px 0;
    }
    .contact-info {
      font-size: 13px;
      margin: 16px 0;
    }
    .contact-info div {
      margin: 6px 0;
    }
    @media (max-width: 600px) {
      .content {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Mmuso Code</h1>
      <p>Software Development Company</p>
    </div>
    <div class="content">
      ${isAdmin ? '<h2>New Contact Message</h2>' : '<h2>Thank You for Reaching Out</h2>'}
      ${content}
    </div>
    <div class="footer">
      <div class="contact-info">
        <div>📧 info@mmusocode.co.za</div>
        <div>📞 +27 79 118 9866</div>
        <div>📍 Masia, Limpopo, South Africa</div>
        <div>🕒 Monday – Friday: 9:00 AM – 5:00 PM</div>
        <div>🌐 <a href="https://mmusocode.co.za" style="color:#2563EB; text-decoration:none;">mmusocode.co.za</a></div>
      </div>
      <hr>
      <p>© ${new Date().getFullYear()} Mmuso Code (Pty) Ltd. All rights reserved.</p>
      <p style="margin-top:8px;">Let’s Build The Future Together – we reply within 24 hours.</p>
    </div>
  </div>
</body>
</html>`;
}

// Admin notification content (with optional phone)
export function getAdminContent(name: string, email: string, title: string, message: string, phone?: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const phoneHtml = phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : '';
  return `
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#2563EB;">${safeEmail}</a></p>
    ${phoneHtml}
    <p><strong>Subject:</strong> ${safeTitle}</p>
    <div class="message-box">
      <strong>Message:</strong><br>
      ${safeMessage}
    </div>
    <div style="text-align: center;">
      <a href="mailto:${safeEmail}?subject=RE: ${safeTitle}" class="button">Reply to ${safeName}</a>
    </div>
  `;
}

// Auto-reply to client
export function getAutoReplyContent(name: string): string {
  const safeName = escapeHtml(name);
  return `
    <p>Hi ${safeName},</p>
    <p>Thank you for reaching out to <strong>Mmuso Code</strong>. This email confirms we have received your message.</p>
    <div class="message-box">
      <strong>What happens next?</strong><br>
      • One of our team members will review your inquiry<br>
      • You'll receive a personal response within <strong>24 hours</strong> (usually much sooner)<br>
      • We'll reply from <strong>info@mmusocode.co.za</strong> – please add us to your contacts
    </div>
    <p>If you need immediate assistance, feel free to call us at <strong>+27 79 118 9866</strong>.</p>
    <p>We look forward to building something great together!</p>
    <p>— The Mmuso Code Team </p>
  `;
}