import { PawMark } from "./Preloader";
import CatBackground from "./CatBackground";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Happenings", href: "#happenings" },
  { label: "Hours & Location", href: "#hours" },
  { label: "Book a Session", href: "#book" },
  { label: "Contact", href: "#contact" },
];

const utilityLinks = [
  { label: "Gift Cards", href: "#" },
  { label: "Merch", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Sitemap", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="cv-auto relative overflow-hidden border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-28 md:px-8 md:pt-20 md:pb-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="group inline-flex items-center gap-2.5">
              <PawMark className="h-7 w-7 text-ink transition-transform duration-300 group-hover:-rotate-12" />
              <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
                NEKO&nbsp;CAFE
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              A cat lounge and coffee room in Chicago. Slow coffee, warm laps,
              and a few dozen residents who would love to meet you.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <SocialLink href="https://www.instagram.com/" label="Instagram on Instagram">
                <InstagramIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/" label="NEKO CAFE on Facebook">
                <FacebookIcon className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-moss">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ochre"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-moss">Find us</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-ink-soft">
              1800 N Damen Ave
              <br />
              Chicago, IL 60647
              <br />
              <a href="tel:+17735550143" className="transition-colors hover:text-ochre">
                (773) 555-0143
              </a>
              <br />
              <a href="mailto:hello@nekocafe.example" className="transition-colors hover:text-ochre">
                hello@nekocafe.example
              </a>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {utilityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-taupe transition-colors hover:text-ochre"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-taupe/30 pt-8 sm:flex-row">
          <p className="text-xs text-taupe">
            © {new Date().getFullYear()} NEKO CAFE. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">
            Proudly cat-supervised
            <PawMark className="h-4 w-4 text-ochre" />
          </p>
        </div>
      </div>

      <CatBackground />
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ochre hover:bg-ochre hover:text-cream"
    >
      {children}
    </a>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5v7h3Z" />
    </svg>
  );
}
