import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle, X } from 'lucide-react';
import { useReveal } from '../effects/useReveal';
import './LetsConnect.css';

type SendState = 'idle' | 'sending' | 'error';

export default function LetsConnect() {
  const ref = useReveal<HTMLElement>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendState, setSendState] = useState<SendState>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendState === 'sending') return;
    setSendState('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.error || 'Your message could not be sent right now. Please try again shortly.');

      setShowSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setSendState('idle');
    } catch (error) {
      setSendState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Your message could not be sent right now. Please try again shortly.');
    }
  };

  return (
    <section className="contact-section section-space" id="contact" ref={ref}>
      <div className="contact-decoration" aria-hidden="true"><span>✳</span><span>✳</span><span>✳</span></div>
      <div className="contact-inner section-wrap">
        <div className="section-kicker reveal-item">A CONVERSATION CAN START ANYWHERE <span>✳</span></div>
        <h2 className="reveal-item">Have a thought<br />you’d like to <em>share?</em></h2>
        <p className="contact-intro reveal-item">Whether it’s about psychology, learning, or simply a question sparked by something here, I’d love to hear from you.</p>
        <form className="contact-form reveal-item" onSubmit={submit}>
          <div className="form-row">
            <label>Your name<input value={name} onChange={event => setName(event.target.value)} name="name" placeholder="What should I call you?" autoComplete="name" maxLength={100} required /></label>
            <label>Your email<input value={email} onChange={event => setEmail(event.target.value)} name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={254} required /></label>
          </div>
          <label>Your message<textarea value={message} onChange={event => setMessage(event.target.value)} name="message" rows={4} placeholder="There's no right or wrong way to start - just take your time. I'm here to listen..." maxLength={5000} required /></label>
          <button className="button button-primary contact-submit" type="submit" disabled={sendState === 'sending'}>
            {sendState === 'sending' ? <>Sending message <LoaderCircle className="contact-spinner" size={16} /></> : <>Send message <ArrowRight size={16} /></>}
          </button>
          {sendState === 'error' && <p className="form-error" role="alert">{errorMessage}</p>}
          <p className="form-note">Your details will only be used to respond to your message.</p>
        </form>
      </div>

      {showSuccess && (
        <div className="contact-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setShowSuccess(false); }}>
          <div className="contact-success-modal" role="dialog" aria-modal="true" aria-labelledby="contact-success-title">
            <button className="contact-modal-close" type="button" aria-label="Close confirmation" onClick={() => setShowSuccess(false)}><X size={18} /></button>
            <span className="contact-success-icon"><Check size={25} /></span>
            <p className="section-kicker">MESSAGE SENT</p>
            <h3 id="contact-success-title">Your message is received.</h3>
            <p>Thank you for reaching out. Monika will get back to you as soon as she can.</p>
            <button className="button button-primary" type="button" onClick={() => setShowSuccess(false)}>Done <ArrowRight size={16} /></button>
          </div>
        </div>
      )}
    </section>
  );
}
