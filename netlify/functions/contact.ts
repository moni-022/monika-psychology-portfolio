/** Netlify serverless function for the portfolio contact form. */
export default async (request: Request): Promise<Response> => {
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error('Contact function is missing RESEND_API_KEY, CONTACT_TO, or CONTACT_FROM.');
    return json({ error: 'The contact form is not configured yet. Please try again later.' }, 503);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!name || name.length > 100 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 5000) {
    return json({ error: 'Please provide a valid name, email address, and message (up to 5,000 characters).' }, 400);
  }

  try {
    const mailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `New message from the psychology portfolio\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!mailResponse.ok) {
      const detail = await mailResponse.text().catch(() => '');
      console.error('Resend rejected contact email:', mailResponse.status, detail.slice(0, 500));
      return json({ error: 'Your message could not be sent right now. Please try again shortly.' }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error('Contact email request failed:', error);
    return json({ error: 'Your message could not be sent right now. Please try again shortly.' }, 502);
  }
};
