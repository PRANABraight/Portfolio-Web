import { Resend } from 'resend';

// In-memory limiter: per warm serverless instance only (resets on cold start,
// not shared across instances). Honeypot + Resend quotas are the real backstop.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
};

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100)
    return 'Please provide your name (max 100 characters).';
  if (typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email))
    return 'Please provide a valid email address.';
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000)
    return 'Message must be between 10 and 5000 characters.';
  return null;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message, company } = req.body || {};

  // Honeypot: bots fill the hidden "company" field — silently accept and drop
  if (company) {
    return res.status(200).json({ success: true });
  }

  const validationError = validate({ name, email, message });
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ success: false, error: 'Email service is not configured.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL || 'pranabrai137@gmail.com';
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `Portfolio message from ${escapeHtml(name.trim())}`,
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, error: 'Failed to send message.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
}
