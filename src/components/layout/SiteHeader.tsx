import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import './SiteHeader.css';

type SiteHeaderProps = { theme: 'light' | 'dark'; onToggleTheme: () => void };

export default function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#home" onClick={close} aria-label="Monika Mittal — home">
        <span className="brand-mark">m.</span>
        <span className="brand-copy">Monika Mittal<small>PSYCHOLOGY · CURIOSITY · CARE</small></span>
      </a>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#about" onClick={close}>About me</a>
        <a href="#journey" onClick={close}>My journey</a>
        <a href="#explore" onClick={close}>Curious corner</a>
        <a href="#psychology-edit" onClick={close}>The Psychology Edit</a>
        <a href="#contact" className="nav-cta" onClick={close}>Let’s connect <ArrowRight size={15} /></a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
