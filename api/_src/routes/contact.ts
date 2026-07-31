import { Router } from 'express';
import { Resend } from 'resend';
import {
  generateEmailTemplate,
  getAdminContent,
  getAutoReplyContent,
} from '../utils/emailTemplate';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, title, message } = req.body;

  if (!name || !email || !title || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const adminHtml = generateEmailTemplate(
      `New message: ${title}`,
      getAdminContent(name, email, title, message, phone),
      true
    );

    const autoReplyHtml = generateEmailTemplate(
      'Thank you for contacting Mmuso Code',
      getAutoReplyContent(name),
      false
    );

    const [adminResult, autoReplyResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'Mmuso Code <noreply@mmusocode.co.za>',
        to: ['info@mmusocode.co.za'],
        replyTo: email,
        subject: `Contact form: ${title}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: 'Mmuso Code <noreply@mmusocode.co.za>',
        to: [email],
        subject: 'Thank you for contacting Mmuso Code',
        html: autoReplyHtml,
      }),
    ]);

    if (adminResult.status === 'rejected') {
      console.error('Admin email failed:', adminResult.reason);
      throw new Error('Failed to send admin notification');
    }

    if (autoReplyResult.status === 'rejected') {
      console.error('Auto-reply failed:', autoReplyResult.reason);
      // Don't throw, but log the error
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;