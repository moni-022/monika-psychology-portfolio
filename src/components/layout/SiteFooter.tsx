import { Instagram, Linkedin, Palette } from "lucide-react";
import "./SiteFooter.css";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/xo.moniikaaa",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/monika-mittal-2b3738269/",
    Icon: Linkedin,
  },
  {
    label: "Painting portfolio",
    href: "https://www.instagram.com/paintwithmon",
    Icon: Palette,
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="footer-socials" aria-label="Social links">
        {socialLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
          >
            <Icon size={18} strokeWidth={1.7} />
          </a>
        ))}
      </nav>
      <div className="back-top" >
        <p>© 2026 Monika Mittal. All rights reserved.</p>
      </div>
    </footer>
  );
}
